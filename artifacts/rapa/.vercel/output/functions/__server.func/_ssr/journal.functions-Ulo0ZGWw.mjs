import { c as createServerFn } from "./request-response-DE8FPPId.mjs";
import { t as createSsrRpc } from "./createSsrRpc-DvRDvdGH.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-DJw85tyK.mjs";
import { a as stringType, i as objectType, n as enumType, r as numberType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/journal.functions-Ulo0ZGWw.js
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
var getTodayMood = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ date: stringType().regex(/^\d{4}-\d{2}-\d{2}$/).optional() }).parse(d ?? {})).handler(createSsrRpc("d32a32b6684e21c6d89f2158ac1d12684566857f7e53b5b6e5ffe10621fb22db"));
var setTodayMood = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
	mood: Mood,
	date: stringType().regex(/^\d{4}-\d{2}-\d{2}$/).optional()
}).parse(d)).handler(createSsrRpc("ba6714d1ec1906483af00dccc0896afe21c31bb29691a76e5119b5148bd32ee1"));
var listEntries = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ limit: numberType().int().min(1).max(200).optional() }).parse(d ?? {})).handler(createSsrRpc("31811178f44f2054bd38ae47ce947ecb1bf23f3c4030240358ccafbb423c140e"));
var addEntry = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
	kind: Kind,
	title: stringType().max(200).optional(),
	content: stringType().min(1).max(5e3),
	entry_date: stringType().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
	photo_path: stringType().max(500).optional()
}).parse(d)).handler(createSsrRpc("e14a2fcd55b1fb2b66a915bfbb4bd251eef77933461a56ef368af757c3caad4d"));
var updateEntry = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
	id: stringType().uuid(),
	kind: Kind,
	title: stringType().max(200).optional(),
	content: stringType().min(1).max(5e3),
	photo_path: stringType().max(500).nullable().optional()
}).parse(d)).handler(createSsrRpc("b5062999b8b83fd5f0f9ef860c47638733a57dda4fc3e6fe8b528b883639c718"));
var deleteEntry = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(createSsrRpc("021b00f4fab2f0ecab5e116f7488d57ac646cfe87403e0fcffc048e8302563d7"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ philosophy: enumType([
	"maia",
	"estoicismo",
	"zen",
	"hermetismo"
]) }).parse(d)).handler(createSsrRpc("7405ab528e7faf5f6643800603518ad41f64fd4fd10b81a3331a1a0376530366"));
//#endregion
export { setTodayMood as a, listEntries as i, deleteEntry as n, updateEntry as o, getTodayMood as r, addEntry as t };
