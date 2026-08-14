import { c as createServerFn } from "./request-response-DE8FPPId.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-DJw85tyK.mjs";
import { a as stringType, i as objectType, n as enumType, r as numberType, t as arrayType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-DSCWxzz5.mjs";
import { C as relationBetween, a as RELATION_LABEL, g as getKinInfo, y as kinFromDate } from "./tzolkin-CeuRSgpU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kai.functions-BhL9yIER.js
var PHILOSOPHIES = {
	maia: "Sabedoria Maia — cosmovisão cíclica do Tzolkin, atenção aos Kins, tons galácticos e sincronicidade.",
	estoicismo: "Estoicismo — dicotomia do controle, virtude como bem supremo, aceitação serena do que não depende de nós.",
	zen: "Zen Budismo — presença, vazio fértil, silêncio como resposta, a mente iniciante.",
	hermetismo: "Filosofia Hermética — os sete princípios (mentalismo, correspondência, vibração, polaridade, ritmo, causa e efeito, gênero)."
};
var MOOD_HINTS = {
	calmo: "está em um estado calmo",
	presente: "está presente e enraizado",
	fluido: "está em fluxo",
	vibrante: "está vibrante e expansivo",
	reflexivo: "está reflexivo e introspectivo"
};
var Input = objectType({
	messages: arrayType(objectType({
		role: enumType(["user", "assistant"]),
		content: stringType().min(1).max(4e3)
	})).min(1).max(30),
	resonance: objectType({ kin: numberType().int().min(1).max(260) }).optional()
});
async function callGateway(apiKey, messages) {
	const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "google/gemini-3-flash-preview",
			messages
		})
	});
	if (!res.ok) {
		const body = await res.text();
		if (res.status === 429) throw new Error("Muitas requisições. Respire e tente novamente em instantes.");
		if (res.status === 402) throw new Error("Créditos de IA esgotados no workspace.");
		throw new Error(`Erro do KAI [${res.status}]: ${body.slice(0, 200)}`);
	}
	return (await res.json()).choices?.[0]?.message?.content?.trim() ?? "";
}
var askKai_createServerFn_handler = createServerRpc({
	id: "4488a0c8d72944ecd3fba11b8da9f531a5a7f7ae883bd360ff38c0ac830cb3ce",
	name: "askKai",
	filename: "src/lib/kai.functions.ts"
}, (opts) => askKai.__executeServer(opts));
var askKai = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => Input.parse(data)).handler(askKai_createServerFn_handler, async ({ data, context }) => {
	const apiKey = process.env.LOVABLE_API_KEY;
	if (!apiKey) throw new Error("Missing LOVABLE_API_KEY");
	const [{ data: profile }, { data: mood }] = await Promise.all([context.supabase.from("profiles").select("display_name, philosophy, natal_kin").eq("id", context.userId).maybeSingle(), context.supabase.from("mood_logs").select("mood").eq("user_id", context.userId).order("logged_on", { ascending: false }).limit(1).maybeSingle()]);
	const p = profile;
	const philosophyDesc = PHILOSOPHIES[p?.philosophy ?? "maia"] ?? PHILOSOPHIES.maia;
	const name = p?.display_name || "peregrino";
	const moodHint = mood?.mood ? MOOD_HINTS[mood.mood] : null;
	let system = `Você é KAI, um mentor de consciência da plataforma RAPPAA. Fale em português do Brasil, com tom profundo, poético, sereno e acolhedor. Seja breve (máx. 6 parágrafos curtos), evite jargão terapêutico, use metáforas naturais. Nunca dê conselhos médicos.

Bússola filosófica do buscador: ${philosophyDesc}
${moodHint ? `Hoje ${name} ${moodHint}. Considere esse estado ao responder.` : `Interlocutor: ${name}.`}`;
	if (data.resonance) {
		const kin = data.resonance.kin;
		const today = kinFromDate(/* @__PURE__ */ new Date());
		const info = getKinInfo(kin);
		const todayInfo = getKinInfo(today);
		const natal = p?.natal_kin ?? null;
		const relToToday = relationBetween(kin, today);
		const relToNatal = natal ? relationBetween(kin, natal) : null;
		const { data: entries } = await context.supabase.from("journal_entries").select("entry_date, kind, title, content").eq("user_id", context.userId).eq("kin", kin).order("entry_date", { ascending: false }).limit(3);
		const journalSnippets = (entries ?? []).map((e) => `- ${e.entry_date} [${e.kind}] ${e.title ?? ""} — ${(e.content ?? "").slice(0, 160)}`).join("\n");
		system += `

MODO RESSONÂNCIA — regras absolutas:
1. NÃO entregue respostas prontas ou interpretações fechadas.
2. Termine SEMPRE com 1 ou 2 perguntas abertas, socráticas, que convidem o buscador a explorar padrões.
3. Cite os dados abaixo com sutileza, sem parecer relatório.

Kin explorado: ${kin} — ${info.fullName} (Selo ${info.seal.name}, Tom ${info.tone.name}).
Afirmação: "${info.affirmation}"

Kin de hoje: ${today} — ${todayInfo.fullName}.
Relação Kin explorado ↔ hoje: ${RELATION_LABEL[relToToday]}.

${natal ? `Kin natal do buscador: ${natal} — ${getKinInfo(natal).fullName}.
Relação Kin explorado ↔ natal: ${RELATION_LABEL[relToNatal]}.` : "Kin natal ainda não informado."}

Registros do buscador nesse mesmo Kin (${entries?.length ?? 0}):
${journalSnippets || "— nenhum registro anterior neste Kin."}`;
	}
	return { text: await callGateway(apiKey, [{
		role: "system",
		content: system
	}, ...data.messages]) };
});
//#endregion
export { askKai_createServerFn_handler };
