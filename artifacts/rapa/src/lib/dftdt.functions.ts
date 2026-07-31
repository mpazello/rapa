import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DFTDTExperience {
  id: string;
  user_id: string;
  year: number;
  current_portal: number;
  portal_1_closing: string | null;
  portal_2_release: string | null;
  portal_3_gratitude: string[];
  portal_4_forgiveness: string | null;
  portal_5_celebration: string | null;
  portal_6_intentions: string[];
  portal_7_renewal: string | null;
  completed: boolean;
  started_at: string;
  completed_at: string | null;
}

// ─── Server Functions ─────────────────────────────────────────────────────────

/** Get the current galactic year's experience (year = calendar year of July 26 start). */
export const getDFTDTExperience = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const year = new Date().getFullYear();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = context.supabase as any;
    const { data: row, error } = await sb
      .from("time_out_of_time_experience")
      .select("*")
      .eq("user_id", context.userId)
      .eq("year", year)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return { experience: row as DFTDTExperience | null };
  });

export const saveDFTDTPortal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({
      year: z.number().int(),
      current_portal: z.number().int().min(0).max(7),
      portal_1_closing: z.string().max(3000).optional(),
      portal_2_release: z.string().max(3000).optional(),
      portal_3_gratitude: z.array(z.string().max(500)).max(3).optional(),
      portal_4_forgiveness: z.string().max(3000).optional(),
      portal_5_celebration: z.string().max(3000).optional(),
      portal_6_intentions: z.array(z.string().max(200)).max(4).optional(),
      portal_7_renewal: z.string().max(3000).optional(),
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { year, ...fields } = data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = context.supabase as any;
    const { error } = await sb
      .from("time_out_of_time_experience")
      .upsert(
        {
          user_id: context.userId,
          year,
          ...fields,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,year" },
      );
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const completeDFTDT = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ year: z.number().int() }).parse(d))
  .handler(async ({ data, context }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = context.supabase as any;
    const { error } = await sb
      .from("time_out_of_time_experience")
      .update({
        completed: true,
        completed_at: new Date().toISOString(),
        current_portal: 7,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", context.userId)
      .eq("year", data.year);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getYearStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const [{ count: journalCount }, { count: moodCount }] = await Promise.all([
      context.supabase
        .from("journal_entries")
        .select("id", { count: "exact", head: true })
        .eq("user_id", context.userId),
      context.supabase
        .from("mood_logs")
        .select("id", { count: "exact", head: true })
        .eq("user_id", context.userId),
    ]);
    return {
      journalEntries: journalCount ?? 0,
      moodDays: moodCount ?? 0,
    };
  });
