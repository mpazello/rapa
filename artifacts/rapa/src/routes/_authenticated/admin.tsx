import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { adminResetUserPassword, adminListUsers } from "@/lib/admin.functions";
import { useAuth, type AppRole } from "@/hooks/use-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — RAPPAA" },
      { name: "description", content: "Gestão de usuários e papéis." },
    ],
  }),
  component: AdminPage,
});

type Row = {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  email: string | null;
  created_at: string;
  roles: AppRole[];
};

const ALL_ROLES: AppRole[] = ["admin", "mentor", "user"];

function AdminPage() {
  const { isAdmin, loading } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [busy, setBusy] = useState(true);
  // Reativado: agora temos a chave service_role verdadeira (Supabase próprio).
  const DIRECT_RESET_ENABLED = true;
  const [resetMode, setResetMode] = useState<"link" | "direct">("link");
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetBusy, setResetBusy] = useState(false);
  const fnResetPassword = useServerFn(adminResetUserPassword);
  const fnListUsers = useServerFn(adminListUsers);

  async function sendReset(e: React.FormEvent) {
    e.preventDefault();
    setResetBusy(true);
    try {
      if (resetMode === "direct") {
        await fnResetPassword({ data: { email: resetEmail.trim(), newPassword } });
        toast.success(`Senha de ${resetEmail.trim()} redefinida com sucesso.`);
        setResetEmail("");
        setNewPassword("");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(resetEmail.trim(), {
          redirectTo: `${window.location.origin}/redefinir-senha`,
        });
        // Mensagem genérica — não revela se o email tem conta.
        if (error) console.error("resetPasswordForEmail:", error.message);
        toast.success(`Se ${resetEmail.trim()} tiver conta, o link de redefinição foi enviado.`);
        setResetEmail("");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao redefinir a senha");
    } finally {
      setResetBusy(false);
    }
  }

  async function load() {
    setBusy(true);
    const [{ data: profiles }, { data: userRoles }, emailsResult] = await Promise.all([
      supabase.from("profiles").select("id, display_name, avatar_url, created_at").order("created_at", { ascending: false }),
      supabase.from("user_roles").select("user_id, role"),
      fnListUsers().catch((err: unknown) => {
        console.error("[admin] adminListUsers falhou:", err);
        return { emails: {} as Record<string, string> };
      }),
    ]);
    const emails = emailsResult.emails ?? {};
    const byUser = new Map<string, AppRole[]>();
    (userRoles ?? []).forEach((r) => {
      const arr = byUser.get(r.user_id) ?? [];
      arr.push(r.role as AppRole);
      byUser.set(r.user_id, arr);
    });
    setRows(
      (profiles ?? []).map((p) => ({
        ...p,
        email: emails[p.id] ?? null,
        roles: byUser.get(p.id) ?? [],
      })),
    );
    setBusy(false);
  }

  useEffect(() => {
    if (!loading && isAdmin) void load();
    else if (!loading) setBusy(false);
  }, [loading, isAdmin]);

  async function toggleRole(userId: string, role: AppRole, has: boolean) {
    if (has) {
      const { error } = await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", role);
      if (error) return toast.error(error.message);
    } else {
      const { error } = await supabase.from("user_roles").insert({ user_id: userId, role });
      if (error) return toast.error(error.message);
    }
    toast.success("Papel atualizado");
    void load();
  }

  if (loading || busy) {
    return (
      <main className="pt-24 pb-32 px-container-margin max-w-[900px] mx-auto min-h-screen">
        <p className="text-on-surface-variant text-center">Carregando…</p>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="pt-24 pb-32 px-container-margin max-w-[720px] mx-auto min-h-screen text-center">
        <span className="material-symbols-outlined text-[48px] text-on-surface-variant mb-4 block">lock</span>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile mb-2">Acesso restrito</h1>
        <p className="text-on-surface-variant mb-6">Apenas administradores podem acessar esta área.</p>
        <Link to="/perfil" className="inline-block rounded-full bg-primary text-on-primary px-6 py-2">
          Voltar ao perfil
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-32 px-container-margin max-w-[900px] mx-auto min-h-screen">
      <header className="mb-8">
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile mb-1">Gestão de usuários</h1>
        <p className="text-on-surface-variant text-sm">
          {rows.length} {rows.length === 1 ? "pessoa" : "pessoas"} na RAPPAA
        </p>
      </header>

      <section className="glass-card rounded-2xl p-4 mb-8">
        <h2 className="font-title-md mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-primary">lock_reset</span>
          Redefinir senha de usuário
        </h2>

        {DIRECT_RESET_ENABLED && (
        <div className="flex gap-1 bg-surface-container-low p-1 rounded-2xl border border-outline-variant/30 mb-3">
          {([
            { key: "link", label: "Enviar link por email" },
            { key: "direct", label: "Definir senha agora" },
          ] as const).map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setResetMode(opt.key)}
              className={`flex-1 py-2 px-2 rounded-xl text-xs sm:text-sm transition-all ${
                resetMode === opt.key
                  ? "bg-primary text-on-primary shadow-md shadow-primary/20"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        )}

        <p className="text-xs text-on-surface-variant mb-3">
          {resetMode === "link"
            ? "A pessoa recebe um email com um link seguro para escolher a nova senha."
            : "Você define a nova senha na hora. Avise o usuário do novo acesso por um canal seguro."}
        </p>

        <form onSubmit={sendReset} className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              placeholder="Email do usuário"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="flex-1 rounded-2xl bg-surface-container-low border border-outline-variant/40 px-4 py-2.5 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary"
            />
            {resetMode === "direct" && (
              <input
                type="text"
                required
                minLength={6}
                maxLength={72}
                placeholder="Nova senha (mín. 6)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="flex-1 rounded-2xl bg-surface-container-low border border-outline-variant/40 px-4 py-2.5 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary"
              />
            )}
          </div>
          <button
            type="submit"
            disabled={resetBusy}
            className="self-start rounded-full bg-primary text-on-primary px-6 py-2.5 font-title-md hover:opacity-90 disabled:opacity-50"
          >
            {resetBusy ? "Processando…" : resetMode === "link" ? "Enviar link" : "Definir nova senha"}
          </button>
        </form>
      </section>

      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.id} className="glass-card rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-11 h-11 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden shrink-0">
                {row.avatar_url ? (
                  <img src={row.avatar_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined text-primary">person</span>
                )}
              </div>
              <div className="min-w-0">
                <p className="font-title-md truncate">{row.display_name || "Sem nome"}</p>
                {row.email && (
                  <p className="text-xs text-cosmic-blue truncate">{row.email}</p>
                )}
                <p className="text-xs text-on-surface-variant truncate mt-0.5">
                  desde {new Date(row.created_at).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {ALL_ROLES.map((role) => {
                const has = row.roles.includes(role);
                return (
                  <button
                    key={role}
                    onClick={() => toggleRole(row.id, role, has)}
                    className={`text-xs px-3 py-1.5 rounded-full border uppercase tracking-wider transition-colors ${
                      has
                        ? "bg-primary text-on-primary border-primary"
                        : "bg-transparent text-on-surface-variant border-outline-variant/40 hover:bg-surface-container-high"
                    }`}
                  >
                    {role}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
