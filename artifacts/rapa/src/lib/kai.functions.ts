import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { getKinInfo, relationBetween, RELATION_LABEL, kinFromDate } from "@/lib/tzolkin";

const PHILOSOPHIES: Record<string, string> = {
  maia: "Sabedoria Maia — cosmovisão cíclica do Tzolkin, atenção aos Kins, tons galácticos e sincronicidade.",
  estoicismo: "Estoicismo — dicotomia do controle, virtude como bem supremo, aceitação serena do que não depende de nós.",
  zen: "Zen Budismo — presença, vazio fértil, silêncio como resposta, a mente iniciante.",
  hermetismo: "Filosofia Hermética — os sete princípios (mentalismo, correspondência, vibração, polaridade, ritmo, causa e efeito, gênero).",
};

const MOOD_HINTS: Record<string, string> = {
  calmo: "está em um estado calmo",
  presente: "está presente e enraizado",
  fluido: "está em fluxo",
  vibrante: "está vibrante e expansivo",
  reflexivo: "está reflexivo e introspectivo",
};

const Input = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .min(1)
    .max(30),
  resonance: z
    .object({
      kin: z.number().int().min(1).max(260),
    })
    .optional(),
});

async function callGateway(apiKey: string, messages: Array<{ role: string; content: string }>) {
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model: "google/gemini-3-flash-preview", messages }),
  });
  if (!res.ok) {
    const body = await res.text();
    if (res.status === 429) throw new Error("Muitas requisições. Respire e tente novamente em instantes.");
    if (res.status === 402) throw new Error("Créditos de IA esgotados no workspace.");
    throw new Error(`Erro do KAI [${res.status}]: ${body.slice(0, 200)}`);
  }
  const json = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
  return json.choices?.[0]?.message?.content?.trim() ?? "";
}

export const askKai = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => Input.parse(data))
  .handler(async ({ data, context }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("Missing LOVABLE_API_KEY");

    const [{ data: profile }, { data: mood }] = await Promise.all([
      context.supabase
        .from("profiles")
        .select("display_name, philosophy, natal_kin")
        .eq("id", context.userId)
        .maybeSingle(),
      context.supabase
        .from("mood_logs")
        .select("mood")
        .eq("user_id", context.userId)
        .order("logged_on", { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]);

    const p = profile as unknown as {
      display_name?: string | null;
      philosophy?: string | null;
      natal_kin?: number | null;
    } | null;

    const philosophyKey = p?.philosophy ?? "maia";
    const philosophyDesc = PHILOSOPHIES[philosophyKey] ?? PHILOSOPHIES.maia;
    const name = p?.display_name || "peregrino";
    const moodHint = mood?.mood ? MOOD_HINTS[mood.mood as string] : null;

    let system = `Você é KAI, um mentor de consciência da plataforma RAPPAA. Fale em português do Brasil, com tom profundo, poético, sereno e acolhedor. Seja breve (máx. 6 parágrafos curtos), evite jargão terapêutico, use metáforas naturais. Nunca dê conselhos médicos.

Bússola filosófica do buscador: ${philosophyDesc}
${moodHint ? `Hoje ${name} ${moodHint}. Considere esse estado ao responder.` : `Interlocutor: ${name}.`}`;

    // Modo Ressonância: KAI faz perguntas socráticas em vez de respostas prontas
    if (data.resonance) {
      const kin = data.resonance.kin;
      const today = kinFromDate(new Date());
      const info = getKinInfo(kin);
      const todayInfo = getKinInfo(today);
      const natal = p?.natal_kin ?? null;
      const relToToday = relationBetween(kin, today);
      const relToNatal = natal ? relationBetween(kin, natal) : null;

      // Últimas entradas do usuário nesse Kin
      const { data: entries } = await context.supabase
        .from("journal_entries")
        .select("entry_date, kind, title, content")
        .eq("user_id", context.userId)
        .eq("kin", kin)
        .order("entry_date", { ascending: false })
        .limit(3);

      const journalSnippets = (entries ?? [])
        .map((e) => `- ${e.entry_date} [${e.kind}] ${(e.title as string) ?? ""} — ${((e.content as string) ?? "").slice(0, 160)}`)
        .join("\n");

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
Relação Kin explorado ↔ natal: ${RELATION_LABEL[relToNatal!]}.` : "Kin natal ainda não informado."}

Registros do buscador nesse mesmo Kin (${entries?.length ?? 0}):
${journalSnippets || "— nenhum registro anterior neste Kin."}`;
    }

    const text = await callGateway(apiKey, [{ role: "system", content: system }, ...data.messages]);
    return { text };
  });
