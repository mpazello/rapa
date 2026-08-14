import { c as createServerFn } from "./request-response-DE8FPPId.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-DJw85tyK.mjs";
import { a as stringType, i as objectType, n as enumType, r as numberType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-DSCWxzz5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/journal.functions-Cli33x8Y.js
var Mood = enumType([
	"calmo",
	"presente",
	"fluido",
	"vibrante",
	"reflexivo"
]);
var Kind = enumType([
	"marco",
	"reflexao",
	"humor",
	"meditacao",
	"conflito"
]);
var getTodayMood_createServerFn_handler = createServerRpc({
	id: "d32a32b6684e21c6d89f2158ac1d12684566857f7e53b5b6e5ffe10621fb22db",
	name: "getTodayMood",
	filename: "src/lib/journal.functions.ts"
}, (opts) => getTodayMood.__executeServer(opts));
var getTodayMood = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ date: stringType().regex(/^\d{4}-\d{2}-\d{2}$/).optional() }).parse(d ?? {})).handler(getTodayMood_createServerFn_handler, async ({ data: input, context }) => {
	const today = input.date ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const { data: row } = await context.supabase.from("mood_logs").select("mood").eq("user_id", context.userId).eq("logged_on", today).maybeSingle();
	return { mood: row?.mood ?? null };
});
var setTodayMood_createServerFn_handler = createServerRpc({
	id: "ba6714d1ec1906483af00dccc0896afe21c31bb29691a76e5119b5148bd32ee1",
	name: "setTodayMood",
	filename: "src/lib/journal.functions.ts"
}, (opts) => setTodayMood.__executeServer(opts));
var setTodayMood = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
	mood: Mood,
	date: stringType().regex(/^\d{4}-\d{2}-\d{2}$/).optional()
}).parse(d)).handler(setTodayMood_createServerFn_handler, async ({ data, context }) => {
	const today = data.date ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const { error } = await context.supabase.from("mood_logs").upsert({
		user_id: context.userId,
		mood: data.mood,
		logged_on: today
	}, { onConflict: "user_id,logged_on" });
	if (error) throw new Error(error.message);
	return { ok: true };
});
var listEntries_createServerFn_handler = createServerRpc({
	id: "31811178f44f2054bd38ae47ce947ecb1bf23f3c4030240358ccafbb423c140e",
	name: "listEntries",
	filename: "src/lib/journal.functions.ts"
}, (opts) => listEntries.__executeServer(opts));
var listEntries = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ limit: numberType().int().min(1).max(200).optional() }).parse(d ?? {})).handler(listEntries_createServerFn_handler, async ({ data, context }) => {
	const { data: rows, error } = await context.supabase.from("journal_entries").select("id, kind, title, content, entry_date, created_at, photo_path").eq("user_id", context.userId).order("entry_date", { ascending: false }).order("created_at", { ascending: false }).limit(data.limit ?? 100);
	if (error) throw new Error(error.message);
	return { entries: await Promise.all((rows ?? []).map(async (r) => {
		let photo_url = null;
		if (r.photo_path) {
			const { data: signed } = await context.supabase.storage.from("journal-photos").createSignedUrl(r.photo_path, 3600);
			photo_url = signed?.signedUrl ?? null;
		}
		return {
			...r,
			photo_url
		};
	})) };
});
var addEntry_createServerFn_handler = createServerRpc({
	id: "e14a2fcd55b1fb2b66a915bfbb4bd251eef77933461a56ef368af757c3caad4d",
	name: "addEntry",
	filename: "src/lib/journal.functions.ts"
}, (opts) => addEntry.__executeServer(opts));
var addEntry = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
	kind: Kind,
	title: stringType().max(200).optional(),
	content: stringType().min(1).max(5e3),
	entry_date: stringType().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
	photo_path: stringType().max(500).optional()
}).parse(d)).handler(addEntry_createServerFn_handler, async ({ data, context }) => {
	const { data: row, error } = await context.supabase.from("journal_entries").insert({
		user_id: context.userId,
		kind: data.kind,
		title: data.title || null,
		content: data.content,
		entry_date: data.entry_date ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		photo_path: data.photo_path || null
	}).select("id").single();
	if (error) throw new Error(error.message);
	return { id: row.id };
});
var updateEntry_createServerFn_handler = createServerRpc({
	id: "b5062999b8b83fd5f0f9ef860c47638733a57dda4fc3e6fe8b528b883639c718",
	name: "updateEntry",
	filename: "src/lib/journal.functions.ts"
}, (opts) => updateEntry.__executeServer(opts));
var updateEntry = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
	id: stringType().uuid(),
	kind: Kind,
	title: stringType().max(200).optional(),
	content: stringType().min(1).max(5e3),
	photo_path: stringType().max(500).nullable().optional()
}).parse(d)).handler(updateEntry_createServerFn_handler, async ({ data, context }) => {
	const patch = {
		kind: data.kind,
		title: data.title || null,
		content: data.content
	};
	if (data.photo_path !== void 0) patch.photo_path = data.photo_path;
	const { error } = await context.supabase.from("journal_entries").update(patch).eq("id", data.id).eq("user_id", context.userId);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var deleteEntry_createServerFn_handler = createServerRpc({
	id: "021b00f4fab2f0ecab5e116f7488d57ac646cfe87403e0fcffc048e8302563d7",
	name: "deleteEntry",
	filename: "src/lib/journal.functions.ts"
}, (opts) => deleteEntry.__executeServer(opts));
var deleteEntry = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(deleteEntry_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("journal_entries").delete().eq("id", data.id).eq("user_id", context.userId);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var updatePhilosophy_createServerFn_handler = createServerRpc({
	id: "7405ab528e7faf5f6643800603518ad41f64fd4fd10b81a3331a1a0376530366",
	name: "updatePhilosophy",
	filename: "src/lib/journal.functions.ts"
}, (opts) => updatePhilosophy.__executeServer(opts));
var updatePhilosophy = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ philosophy: enumType([
	"maia",
	"estoicismo",
	"zen",
	"hermetismo"
]) }).parse(d)).handler(updatePhilosophy_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("profiles").update({ philosophy: data.philosophy }).eq("id", context.userId);
	if (error) throw new Error(error.message);
	return { ok: true };
});
//#endregion
export { addEntry_createServerFn_handler, deleteEntry_createServerFn_handler, getTodayMood_createServerFn_handler, listEntries_createServerFn_handler, setTodayMood_createServerFn_handler, updateEntry_createServerFn_handler, updatePhilosophy_createServerFn_handler };
