import { c as createServerFn } from "./request-response-DE8FPPId.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-DJw85tyK.mjs";
import { a as stringType, i as objectType, r as numberType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-DSCWxzz5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tzolkin.functions-BpMhCWO6.js
/** Estatísticas do usuário para um Kin específico: quantas entradas + snippets. */
var getKinJourneyStats_createServerFn_handler = createServerRpc({
	id: "50e94408249371e03ed1e61f551da63d84134555e676b4602263afd72593d6eb",
	name: "getKinJourneyStats",
	filename: "src/lib/tzolkin.functions.ts"
}, (opts) => getKinJourneyStats.__executeServer(opts));
var getKinJourneyStats = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ kin: numberType().int().min(1).max(260) }).parse(d)).handler(getKinJourneyStats_createServerFn_handler, async ({ data, context }) => {
	const { data: rows, error } = await context.supabase.from("journal_entries").select("id, kind, title, content, entry_date, created_at").eq("user_id", context.userId).eq("kin", data.kin).order("entry_date", { ascending: false }).limit(50);
	if (error) throw new Error(error.message);
	const entries = (rows ?? []).map((r) => ({
		id: r.id,
		kind: r.kind,
		title: r.title ?? null,
		snippet: (r.content ?? "").slice(0, 240),
		entry_date: r.entry_date
	}));
	const dates = Array.from(new Set(entries.map((e) => e.entry_date)));
	let moodDistribution = {};
	if (dates.length > 0) {
		const { data: moods } = await context.supabase.from("mood_logs").select("mood").eq("user_id", context.userId).in("logged_on", dates);
		for (const m of moods ?? []) {
			const k = m.mood ?? "?";
			moodDistribution[k] = (moodDistribution[k] ?? 0) + 1;
		}
	}
	const kindCounts = {};
	for (const e of entries) kindCounts[e.kind] = (kindCounts[e.kind] ?? 0) + 1;
	return {
		count: entries.length,
		entries,
		moodDistribution,
		kindCounts
	};
});
var setBirthDate_createServerFn_handler = createServerRpc({
	id: "508359195d7a2e109d55a6083a1a790f64b0b72fa3abb15c1d31040f5f357ccf",
	name: "setBirthDate",
	filename: "src/lib/tzolkin.functions.ts"
}, (opts) => setBirthDate.__executeServer(opts));
var setBirthDate = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ birth_date: stringType().regex(/^\d{4}-\d{2}-\d{2}$/) }).parse(d)).handler(setBirthDate_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("profiles").update({ birth_date: data.birth_date }).eq("id", context.userId);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var getNatal_createServerFn_handler = createServerRpc({
	id: "4c303d05ada7b477525e72d722f2a65010059b07d6fa66b04d1059f9f471fa34",
	name: "getNatal",
	filename: "src/lib/tzolkin.functions.ts"
}, (opts) => getNatal.__executeServer(opts));
var getNatal = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getNatal_createServerFn_handler, async ({ context }) => {
	const { data } = await context.supabase.from("profiles").select("birth_date, natal_kin").eq("id", context.userId).maybeSingle();
	return {
		birth_date: data?.birth_date ?? null,
		natal_kin: data?.natal_kin ?? null
	};
});
//#endregion
export { getKinJourneyStats_createServerFn_handler, getNatal_createServerFn_handler, setBirthDate_createServerFn_handler };
