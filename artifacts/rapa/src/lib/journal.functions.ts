import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const Mood = z.enum(["calmo", "presente", "fluido", "vibrante", "reflexivo"]);
const Kind = z.enum(["marco", "reflexao", "humor", "meditacao", "conflito"]);

export const getTodayMood = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional() }).parse(d ?? {}))
  .handler(async ({ data: input, context }) => {
    const today = input.date ?? new Date().toISOString().slice(0, 10);
    const { data: row } = await context.supabase
      .from("mood_logs")
      .select("mood")
      .eq("user_id", context.userId)
      .eq("logged_on", today)
      .maybeSingle();
    return { mood: (row?.mood as string | null) ?? null };
  });

export const setTodayMood = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ mood: Mood, date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional() }).parse(d))
  .handler(async ({ data, context }) => {
    const today = data.date ?? new Date().toISOString().slice(0, 10);
    const { error } = await context.supabase
      .from("mood_logs")
      .upsert({ user_id: context.userId, mood: data.mood, logged_on: today }, { onConflict: "user_id,logged_on" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const listEntries = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ limit: z.number().int().min(1).max(200).optional() }).parse(d ?? {}))
  .handler(async ({ data, context }) => {
    const { data: rows, error } = await context.supabase
      .from("journal_entries")
      .select("id, kind, title, content, entry_date, created_at, photo_path")
      .eq("user_id", context.userId)
      .order("entry_date", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(data.limit ?? 100);
    if (error) throw new Error(error.message);

    const withPhotos = await Promise.all(
      (rows ?? []).map(async (r) => {
        let photo_url: string | null = null;
        if (r.photo_path) {
          const { data: signed } = await context.supabase.storage
            .from("journal-photos")
            .createSignedUrl(r.photo_path, 60 * 60);
          photo_url = signed?.signedUrl ?? null;
        }
        return { ...r, photo_url };
      }),
    );
    return { entries: withPhotos };
  });

export const addEntry = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z
      .object({
        kind: Kind,
        title: z.string().max(200).optional(),
        content: z.string().min(1).max(5000),
        entry_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        photo_path: z.string().max(500).optional(),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("journal_entries")
      .insert({
        user_id: context.userId,
        kind: data.kind,
        title: data.title || null,
        content: data.content,
        entry_date: data.entry_date ?? new Date().toISOString().slice(0, 10), // client always passes entry_date
        photo_path: data.photo_path || null,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: row.id };
  });


export const updateEntry = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        kind: Kind,
        title: z.string().max(200).optional(),
        content: z.string().min(1).max(5000),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("journal_entries")
      .update({
        kind: data.kind,
        title: data.title || null,
        content: data.content,
      })
      .eq("id", data.id)
      .eq("user_id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteEntry = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("journal_entries")
      .delete()
      .eq("id", data.id)
      .eq("user_id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const updatePhilosophy = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({ philosophy: z.enum(["maia", "estoicismo", "zen", "hermetismo"]) }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("profiles")
      .update({ philosophy: data.philosophy })
      .eq("id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
