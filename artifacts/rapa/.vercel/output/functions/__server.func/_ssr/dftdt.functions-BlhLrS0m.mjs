import { c as createServerFn } from "./request-response-DE8FPPId.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-DJw85tyK.mjs";
import { a as stringType, i as objectType, r as numberType, t as arrayType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-DSCWxzz5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dftdt.functions-BlhLrS0m.js
var getDFTDTExperience_createServerFn_handler = createServerRpc({
	id: "45043b0f5cbdfd3044451af20093e2a2efe181b779c72ecef0c4ecee3d023226",
	name: "getDFTDTExperience",
	filename: "src/lib/dftdt.functions.ts"
}, (opts) => getDFTDTExperience.__executeServer(opts));
var getDFTDTExperience = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getDFTDTExperience_createServerFn_handler, async ({ context }) => {
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	const { data: row, error } = await context.supabase.from("time_out_of_time_experience").select("*").eq("user_id", context.userId).eq("year", year).maybeSingle();
	if (error) throw new Error(error.message);
	return { experience: row };
});
var saveDFTDTPortal_createServerFn_handler = createServerRpc({
	id: "774ddde3d3820594b6b6c159b10ea8d66eb47e32eaba25c06808a1dab571e711",
	name: "saveDFTDTPortal",
	filename: "src/lib/dftdt.functions.ts"
}, (opts) => saveDFTDTPortal.__executeServer(opts));
var saveDFTDTPortal = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
	year: numberType().int(),
	current_portal: numberType().int().min(0).max(7),
	portal_1_closing: stringType().max(3e3).optional(),
	portal_2_release: stringType().max(3e3).optional(),
	portal_3_gratitude: arrayType(stringType().max(500)).max(3).optional(),
	portal_4_forgiveness: stringType().max(3e3).optional(),
	portal_5_celebration: stringType().max(3e3).optional(),
	portal_6_intentions: arrayType(stringType().max(200)).max(4).optional(),
	portal_7_renewal: stringType().max(3e3).optional()
}).parse(d)).handler(saveDFTDTPortal_createServerFn_handler, async ({ data, context }) => {
	const { year, ...fields } = data;
	const { error } = await context.supabase.from("time_out_of_time_experience").upsert({
		user_id: context.userId,
		year,
		...fields,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}, { onConflict: "user_id,year" });
	if (error) throw new Error(error.message);
	return { ok: true };
});
var completeDFTDT_createServerFn_handler = createServerRpc({
	id: "7e4e00f5cb0896adfb5d6926102355d50545fad6e33fafa14171335c4cf5689a",
	name: "completeDFTDT",
	filename: "src/lib/dftdt.functions.ts"
}, (opts) => completeDFTDT.__executeServer(opts));
var completeDFTDT = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ year: numberType().int() }).parse(d)).handler(completeDFTDT_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("time_out_of_time_experience").update({
		completed: true,
		completed_at: (/* @__PURE__ */ new Date()).toISOString(),
		current_portal: 7,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("user_id", context.userId).eq("year", data.year);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var getYearStats_createServerFn_handler = createServerRpc({
	id: "22eb1f172653b5f7d59ce5be820b5d986c6bfc1ab86ae0c0c0445b70200b7bac",
	name: "getYearStats",
	filename: "src/lib/dftdt.functions.ts"
}, (opts) => getYearStats.__executeServer(opts));
var getYearStats = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getYearStats_createServerFn_handler, async ({ context }) => {
	const [{ count: journalCount }, { count: moodCount }] = await Promise.all([context.supabase.from("journal_entries").select("id", {
		count: "exact",
		head: true
	}).eq("user_id", context.userId), context.supabase.from("mood_logs").select("id", {
		count: "exact",
		head: true
	}).eq("user_id", context.userId)]);
	return {
		journalEntries: journalCount ?? 0,
		moodDays: moodCount ?? 0
	};
});
//#endregion
export { completeDFTDT_createServerFn_handler, getDFTDTExperience_createServerFn_handler, getYearStats_createServerFn_handler, saveDFTDTPortal_createServerFn_handler };
