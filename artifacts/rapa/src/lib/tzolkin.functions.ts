import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Estatísticas do usuário para um Kin específico: quantas entradas + snippets. */
export const getKinJourneyStats = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ kin: z.number().int().min(1).max(260) }).parse(d))
  .handler(async ({ data, context }) => {
    const { data: rows, error } = await context.supabase
      .from("journal_entries")
      .select("id, kind, title, content, entry_date, created_at")
      .eq("user_id", context.userId)
      .eq("kin", data.kin)
      .order("entry_date", { ascending: false })
      .limit(50);
    if (error) throw new Error(error.message);

    const entries = (rows ?? []).map((r) => ({
      id: r.id as string,
      kind: r.kind as string,
      title: (r.title as string | null) ?? null,
      snippet: ((r.content as string) ?? "").slice(0, 240),
      entry_date: r.entry_date as string,
    }));

    // moods dos dias em que aparecem essas entradas
    const dates = Array.from(new Set(entries.map((e) => e.entry_date)));
    let moodDistribution: Record<string, number> = {};
    if (dates.length > 0) {
      const { data: moods } = await context.supabase
        .from("mood_logs")
        .select("mood")
        .eq("user_id", context.userId)
        .in("logged_on", dates);
      for (const m of moods ?? []) {
        const k = (m.mood as string) ?? "?";
        moodDistribution[k] = (moodDistribution[k] ?? 0) + 1;
      }
    }

    // contagem por tipo
    const kindCounts: Record<string, number> = {};
    for (const e of entries) kindCounts[e.kind] = (kindCounts[e.kind] ?? 0) + 1;

    return {
      count: entries.length,
      entries,
      moodDistribution,
      kindCounts,
    };
  });

/** Atualiza a data de nascimento do usuário. O `natal_kin` é recomputado por trigger no banco. */
export const setBirthDate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({ birth_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("profiles")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .update({ birth_date: data.birth_date } as any)
      .eq("id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Retorna a data de nascimento + Kin natal do usuário atual. */
export const getNatal = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase
      .from("profiles")
      .select("birth_date, natal_kin")
      .eq("id", context.userId)
      .maybeSingle();
    return {
      birth_date: ((data as unknown as { birth_date?: string | null })?.birth_date) ?? null,
      natal_kin: ((data as unknown as { natal_kin?: number | null })?.natal_kin) ?? null,
    };
  });
