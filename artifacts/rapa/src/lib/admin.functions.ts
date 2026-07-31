import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Confirma que o usuário autenticado tem o papel de admin (via RLS user-scoped). */
async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", context.userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Acesso restrito: apenas administradores.");
}

/** Lista todos os usuários com email (requer service role). */
export const adminListUsers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const emails: Record<string, string> = {};
    for (let page = 1; page <= 50; page++) {
      const { data: list, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 200 });
      if (error) throw new Error(error.message);
      for (const u of list.users) {
        if (u.email) emails[u.id] = u.email;
      }
      if (list.users.length < 200) break;
    }
    return { emails };
  });

/** Admin define diretamente uma nova senha para um usuário (por ID ou email). */
export const adminResetUserPassword = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z
      .object({
        userId: z.string().uuid().optional(),
        email: z.string().email().optional(),
        newPassword: z.string().min(6).max(72),
      })
      .refine((v) => v.userId || v.email, {
        message: "Informe o usuário (id ou email).",
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);

    // Import dinâmico: o client admin (service role) só existe no servidor.
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Resolve o ID do usuário a partir do email, se necessário.
    let targetId = data.userId ?? null;
    if (!targetId && data.email) {
      const email = data.email.toLowerCase();
      // Percorre as páginas de usuários procurando o email.
      for (let page = 1; page <= 50 && !targetId; page++) {
        const { data: list, error } = await supabaseAdmin.auth.admin.listUsers({
          page,
          perPage: 200,
        });
        if (error) throw new Error(error.message);
        const found = list.users.find((u) => u.email?.toLowerCase() === email);
        if (found) targetId = found.id;
        if (list.users.length < 200) break; // última página
      }
    }

    if (!targetId) throw new Error("Usuário não encontrado.");

    const { error } = await supabaseAdmin.auth.admin.updateUserById(targetId, {
      password: data.newPassword,
    });
    if (error) throw new Error(error.message);

    return { ok: true };
  });
