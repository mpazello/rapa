import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useRef, useState, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getKinInfo,
  kinFromDate,
  relationBetween,
  RELATION_LABEL,
  guideKin,
  analogKin,
  antipodeKin,
  occultKin,
  SEAL_DETAILS,
  getEarthFamily,
  getCastleOfKin,
  SEALS,
  type SealColor,
  type KinRelation,
} from "@/lib/tzolkin";
import { getKinJourneyStats, getNatal } from "@/lib/tzolkin.functions";
import { askKai } from "@/lib/kai.functions";
import { KinSeal } from "@/components/KinSeal";
import { ToneSymbol } from "@/components/ToneSymbol";
import { SEAL_IMAGE } from "@/lib/seal-images";

export const Route = createFileRoute("/_authenticated/ciclos/kin/$kin")({
  head: ({ params }) => {
    const k = Number(params.kin);
    const info = k >= 1 && k <= 260 ? getKinInfo(k) : null;
    const title = info ? `Kin ${k} — ${info.fullName} — RAPPAA` : `Kin ${params.kin} — RAPPAA`;
    const description = info
      ? `${info.fullName}: ${info.affirmation}`
      : "Explore o Kin, seu Selo, Tom e a ressonância com sua jornada.";
    return {
      meta: [
        { title },
        { name: "description", content: description.slice(0, 160) },
        { property: "og:title", content: title },
        { property: "og:description", content: description.slice(0, 160) },
      ],
    };
  },
  component: KinDetailPage,
});

const COLOR_CLASS: Record<SealColor, { text: string; bg: string; border: string }> = {
  vermelho: { text: "text-error", bg: "bg-error", border: "border-error/40" },
  branco: { text: "text-on-surface", bg: "bg-on-surface", border: "border-on-surface/40" },
  azul: { text: "text-primary", bg: "bg-primary", border: "border-primary/40" },
  amarelo: { text: "text-tertiary", bg: "bg-tertiary", border: "border-tertiary/40" },
};

/** Retorna a data mais próxima de hoje (passado ou futuro) em que o Kin ocorre. */
function dateFromKin(targetKin: number): Date {
  const today = new Date();
  const todayKin = kinFromDate(today);
  let diff = (targetKin - todayKin + 260) % 260;
  // Prefer the nearest occurrence: past if more than half-cycle away
  if (diff > 130) diff -= 260;
  const result = new Date(today);
  result.setDate(result.getDate() + diff);
  // Fine-tune for Dreamspell Feb-29 skips (at most 1-2 days off)
  for (let i = 0; i < 4 && kinFromDate(result) !== targetKin; i++) {
    const actual = kinFromDate(result);
    result.setDate(result.getDate() + ((targetKin - actual + 260) % 260 <= 130 ? 1 : -1));
  }
  return result;
}

function formatKinDate(d: Date): string {
  const today = new Date();
  const todayStr = today.toDateString();
  const dStr = d.toDateString();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (dStr === todayStr) return "hoje";
  if (dStr === tomorrow.toDateString()) return "amanhã";
  if (dStr === yesterday.toDateString()) return "ontem";
  return d.toLocaleDateString("pt-BR", { day: "numeric", month: "short" });
}

function KinDetailPage() {
  const params = Route.useParams();
  const navigate = useNavigate();
  const kin = Math.max(1, Math.min(260, Number(params.kin) || 1));

  const info = useMemo(() => getKinInfo(kin), [kin]);
  const today = useMemo(() => kinFromDate(new Date()), []);
  const todayInfo = useMemo(() => getKinInfo(today), [today]);
  const colors = COLOR_CLASS[info.seal.color];

  const fnGetNatal = useServerFn(getNatal);
  const fnStats = useServerFn(getKinJourneyStats);
  const fnAskKai = useServerFn(askKai);

  const natalQuery = useQuery({ queryKey: ["natal"], queryFn: () => fnGetNatal() });
  const statsQuery = useQuery({
    queryKey: ["kinStats", kin],
    queryFn: () => fnStats({ data: { kin } }),
  });

  const natalKin = natalQuery.data?.natal_kin ?? null;
  const relToToday = relationBetween(kin, today);
  const relToNatal = natalKin ? relationBetween(kin, natalKin) : null;

  return (
    <main className="pt-24 pb-32 px-container-margin max-w-[760px] mx-auto min-h-screen relative">
      <div className="fixed inset-0 texture-overlay z-[-1]" aria-hidden />

      <div className="flex items-center justify-between mb-6">
        <Link to="/ciclos" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
          <span className="font-label-sm text-label-sm">Voltar à matriz</span>
        </Link>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() =>
              navigate({ to: "/ciclos/kin/$kin", params: { kin: String(((kin - 2 + 260) % 260) + 1) } })
            }
            className="w-9 h-9 rounded-full border border-outline-variant/40 flex items-center justify-center hover:bg-surface-container-low"
            aria-label="Kin anterior"
          >
            <span className="material-symbols-outlined text-lg">chevron_left</span>
          </button>
          <button
            type="button"
            onClick={() =>
              navigate({ to: "/ciclos/kin/$kin", params: { kin: String((kin % 260) + 1) } })
            }
            className="w-9 h-9 rounded-full border border-outline-variant/40 flex items-center justify-center hover:bg-surface-container-low"
            aria-label="Próximo Kin"
          >
            <span className="material-symbols-outlined text-lg">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Header identity */}
      <section className="relative mb-8">
        <div className="relative glass-panel rounded-3xl p-8 flex flex-col items-center text-center">
          <KinSeal kin={kin} size={112} pulse eager className="mb-4" />
          <span className={`font-label-sm text-label-sm ${colors.text} mb-1 tracking-widest`}>
            KIN {kin}
            <span className="text-on-surface-variant/60 normal-case tracking-normal"> · {formatKinDate(dateFromKin(kin))}</span>
          </span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-1">{info.fullName}</h1>
          <p className="font-body-md text-on-surface-variant italic">
            {info.seal.maya} · {info.tone.maya}
          </p>
        </div>
      </section>

      <Tabs defaultValue="conhecimento" className="w-full">
        <TabsList className="w-full grid grid-cols-4 mb-6 bg-surface-container-low">
          <TabsTrigger value="conhecimento">Conhecimento</TabsTrigger>
          <TabsTrigger value="hoje">Hoje</TabsTrigger>
          <TabsTrigger value="jornada">Jornada</TabsTrigger>
          <TabsTrigger value="kai">KAI</TabsTrigger>
        </TabsList>

        {/* ─── Conhecimento ────────────────────────────────────────── */}
        <TabsContent value="conhecimento" className="space-y-4">
          <div className="glass-panel rounded-3xl p-6 space-y-5">
            <h3 className="font-title-md text-title-md flex items-center gap-2">
              <span className={`material-symbols-outlined ${colors.text}`} style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              Mantra Galáctico
            </h3>

            {/* 5-line mantra */}
            <div className={`border-l-2 pl-4 space-y-0.5 ${colors.border}`}>
              {info.mantra.map((line, i) => (
                <p
                  key={i}
                  className={`leading-relaxed ${
                    i === 4
                      ? "font-body-sm text-on-surface-variant/70 italic mt-2 pt-2 border-t border-white/8"
                      : i === 0
                      ? "font-body-lg text-on-surface font-medium"
                      : "font-body-md text-on-surface-variant"
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Personal frase */}
            <div className={`rounded-2xl px-4 py-3 ${colors.bg}/12 border ${colors.border}`}>
              <p className={`font-label-sm text-label-sm uppercase tracking-widest mb-1.5 ${colors.text}`}>Frase do dia</p>
              <p className="font-body-md italic leading-relaxed text-on-surface">"{info.affirmation}"</p>
            </div>

            <div className="flex flex-wrap gap-3 text-label-sm pt-1">
              <a
                href={`https://sincronariodapaz.org/calcula-kin/?kin=${kin}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                Sincronário da Paz
              </a>
              <a
                href={`https://tzolkin.io/en/kin/${kin}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                tzolkin.io
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-panel rounded-3xl p-6">
              <h4 className="font-title-md text-title-md mb-2 flex items-center gap-2">
                <img src={SEAL_IMAGE[info.seal.index]} alt={info.seal.name} className="w-7 h-7 object-contain" loading="lazy" decoding="async" />
                Selo · {info.seal.name}
              </h4>
              <p className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-2">
                {SEAL_DETAILS[info.seal.index].meaning}
              </p>
              <p className="font-body-md text-on-surface-variant mb-3">
                <strong className="text-on-surface">{info.seal.action}</strong> a força de {info.seal.power.toLowerCase()};
                essência de {info.seal.essence.toLowerCase()}.
              </p>
              <p className="font-body-sm text-on-surface-variant/90 mb-3">
                {SEAL_DETAILS[info.seal.index].description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {SEAL_DETAILS[info.seal.index].keywords.map((k) => (
                  <span key={k} className="px-2 py-0.5 rounded-full text-label-sm border border-outline-variant/40 text-on-surface-variant bg-surface/40">
                    {k}
                  </span>
                ))}
              </div>
              <p className="mt-3 font-label-sm text-label-sm text-on-surface-variant/70">
                Nome maia: {info.seal.maya} · Cor {info.seal.color}
              </p>
            </div>
            <div className="glass-panel rounded-3xl p-6">
              <h4 className="font-title-md text-title-md mb-2 flex items-center gap-2">
                <ToneSymbol tone={info.tone.index} size={22} className="text-primary" />
                Tom {info.tone.index} · {info.tone.name}
              </h4>
              <p className="font-body-md text-on-surface-variant">
                <strong className="text-on-surface">{info.tone.action}</strong> — {info.tone.essence.toLowerCase()} através de{" "}
                {info.tone.power.toLowerCase()}.
              </p>
              <p className="mt-3 font-label-sm text-label-sm text-on-surface-variant/70">Nome maia: {info.tone.maya}</p>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6">
            <h4 className="font-title-md text-title-md mb-2 flex items-center gap-2">
              <img src={SEAL_IMAGE[info.trecena.seal.index]} alt={info.trecena.seal.name} className="w-7 h-7 object-contain" loading="lazy" decoding="async" />
              Trecena do {info.trecena.seal.name}
            </h4>
            <p className="font-body-md text-on-surface-variant">
              Este Kin pertence à onda encantada iniciada pelo <strong className="text-on-surface">{info.trecena.seal.name}</strong>{" "}
              (Kin {info.trecena.kinStart}). Durante 13 dias, o campo cultiva a arte de{" "}
              <em>{info.trecena.seal.action.toLowerCase()}</em>.
            </p>
            <p className="mt-2 font-label-sm text-label-sm text-on-surface-variant/70">
              {info.castle.name} · Kin {(info.castle.index - 1) * 52 + 1}–{info.castle.index * 52}
            </p>
          </div>

          {/* Família Planetária (Terrestre) */}
          {(() => {
            const fam = getEarthFamily(info.seal.index);
            return (
              <div className="glass-panel rounded-3xl p-6">
                <p className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-1">
                  Família Planetária · {fam.function}
                </p>
                <h4 className="font-title-md text-title-md mb-2">{fam.name}</h4>
                <p className="font-body-md text-on-surface-variant mb-3">{fam.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {fam.seals.map((s) => {
                    const seal = SEALS[s - 1];
                    const isSelf = s === info.seal.index;
                    return (
                      <span
                        key={s}
                        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-label-sm border ${
                          isSelf ? "border-primary text-primary bg-primary/10" : "border-outline-variant/40 text-on-surface-variant"
                        }`}
                      >
                        <img src={SEAL_IMAGE[s]} alt={seal.name} className="w-4 h-4 object-contain" loading="lazy" decoding="async" />
                        {seal.name}
                      </span>
                    );
                  })}
                </div>
                <p className="font-label-sm text-label-sm text-on-surface-variant/70">
                  Região do corpo planetário: {fam.bodyRegion}
                </p>
              </div>
            );
          })()}

          {/* Castelo do Destino */}
          {(() => {
            const c = getCastleOfKin(kin);
            return (
              <div className="glass-panel rounded-3xl p-6">
                <p className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-1">
                  Castelo do Destino · {c.direction}
                </p>
                <h4 className="font-title-md text-title-md mb-2">{c.name}</h4>
                <p className="font-body-md text-on-surface-variant mb-3">{c.description}</p>
                <div className="grid grid-cols-2 gap-2 text-label-sm">
                  <div className="rounded-xl border border-outline-variant/30 p-2">
                    <span className="text-on-surface-variant/70">Totem</span>
                    <p className="text-on-surface">{c.totem}</p>
                  </div>
                  <div className="rounded-xl border border-outline-variant/30 p-2">
                    <span className="text-on-surface-variant/70">Ação</span>
                    <p className="text-on-surface">{c.action} · {c.power}</p>
                  </div>
                  <div className="rounded-xl border border-outline-variant/30 p-2 col-span-2">
                    <span className="text-on-surface-variant/70">Faixa de Kins</span>
                    <p className="text-on-surface">{c.kinRange[0]}–{c.kinRange[1]}</p>
                  </div>
                </div>
              </div>
            );
          })()}

        </TabsContent>

        {/* ─── Hoje ─────────────────────────────────────────────────── */}
        <TabsContent value="hoje" className="space-y-4">
          <div className="glass-panel rounded-3xl p-6">
            <h3 className="font-title-md text-title-md mb-3">Kin de hoje</h3>
            <Link
              to="/ciclos/kin/$kin"
              params={{ kin: String(today) }}
              className="flex items-center gap-4 group"
            >
              <KinSeal kin={today} size={64} pulse />
              <div>
                <p className="text-2xl font-headline-lg text-primary group-hover:opacity-80">Kin {today}</p>
                <p className="font-title-md text-title-md">{todayInfo.fullName}</p>
                <p className="font-body-sm text-on-surface-variant italic">{todayInfo.seal.maya} · {todayInfo.tone.maya}</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant/60 mt-0.5">
                  {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
                </p>
              </div>
            </Link>
          </div>

          <RelationCard label="Kin explorado × Hoje" from={kin} to={today} relation={relToToday} />
          {natalKin && <RelationCard label="Kin explorado × Kin natal" from={kin} to={natalKin} relation={relToNatal!} />}

          <ResonanceMap kin={kin} today={today} natal={natalKin} />
        </TabsContent>

        {/* ─── Jornada ──────────────────────────────────────────────── */}
        <TabsContent value="jornada" className="space-y-4">
          {statsQuery.isLoading ? (
            <p className="text-on-surface-variant">Carregando sua jornada…</p>
          ) : statsQuery.data && statsQuery.data.count > 0 ? (
            <>
              <div className="glass-panel rounded-3xl p-6 text-center">
                <p className="text-5xl font-headline-lg text-primary">{statsQuery.data.count}</p>
                <p className="font-body-md text-on-surface-variant mt-1">
                  {statsQuery.data.count === 1 ? "registro" : "registros"} sob este Kin
                </p>
                {Object.keys(statsQuery.data.moodDistribution).length > 0 && (
                  <div className="mt-4 flex justify-center gap-2 flex-wrap">
                    {Object.entries(statsQuery.data.moodDistribution).map(([mood, n]) => (
                      <span key={mood} className="text-xs px-3 py-1 rounded-full border border-outline-variant/40">
                        {mood} · {n}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <ul className="space-y-3">
                {statsQuery.data.entries.map((e) => (
                  <li key={e.id} className="glass-panel rounded-2xl p-4">
                    <div className="flex justify-between text-xs text-on-surface-variant mb-1">
                      <span className="uppercase tracking-widest">{e.kind}</span>
                      <time>{new Date(e.entry_date).toLocaleDateString("pt-BR")}</time>
                    </div>
                    {e.title && <p className="font-title-md text-title-md mb-1">{e.title}</p>}
                    <p className="font-body-md text-on-surface-variant leading-relaxed">{e.snippet}</p>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="glass-panel rounded-3xl p-8 text-center">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant/50 mb-2">history_edu</span>
              <p className="font-body-md text-on-surface-variant">
                Você ainda não tem registros neste Kin. Quando escrever na jornada num dia deste Kin, ele aparecerá aqui e alimentará o Mapa de Ressonância.
              </p>
              <Link
                to="/jornada"
                className="inline-block mt-4 rounded-full bg-primary text-on-primary px-5 py-2 font-label-sm text-label-sm"
              >
                Ir para a Jornada
              </Link>
            </div>
          )}
        </TabsContent>

        {/* ─── KAI ──────────────────────────────────────────────────── */}
        <TabsContent value="kai">
          <KaiResonanceChat kin={kin} askFn={fnAskKai} />
        </TabsContent>
      </Tabs>
    </main>
  );
}

function RelationCard({ label, from, to, relation }: { label: string; from: number; to: number; relation: KinRelation }) {
  const fromInfo = getKinInfo(from);
  const toInfo = getKinInfo(to);
  return (
    <div className="glass-panel rounded-3xl p-6">
      <p className="font-label-sm text-label-sm text-on-surface-variant/70 uppercase tracking-widest mb-2">{label}</p>
      <p className="font-title-md text-title-md text-primary mb-3">{RELATION_LABEL[relation]}</p>
      <div className="flex items-center justify-between gap-3 text-sm text-on-surface-variant">
        <div className="flex items-center gap-2 min-w-0">
          <KinSeal kin={from} size={36} />
          <span className="truncate">{fromInfo.fullName}</span>
        </div>
        <span className="opacity-40">↔</span>
        <div className="flex items-center gap-2 min-w-0 justify-end">
          <span className="truncate text-right">{toInfo.fullName}</span>
          <KinSeal kin={to} size={36} />
        </div>
      </div>
    </div>
  );
}

/** SVG puro: 3 nós (Explorado · Hoje · Natal) + 4 relações oraculares do Kin explorado. */
function ResonanceMap({ kin, today, natal }: { kin: number; today: number; natal: number | null }) {
  const oracle = {
    guide: guideKin(kin),
    analog: analogKin(kin),
    antipode: antipodeKin(kin),
    occult: occultKin(kin),
  };
  const nodes = [
    { id: "kin", label: "Explorado", kin, x: 160, y: 80 },
    { id: "today", label: "Hoje", kin: today, x: 60, y: 220 },
    ...(natal ? [{ id: "natal", label: "Natal", kin: natal, x: 260, y: 220 }] : []),
  ];

  return (
    <div className="glass-panel rounded-3xl p-6">
      <h3 className="font-title-md text-title-md mb-3 flex items-center gap-2">
        <span className="material-symbols-outlined text-tertiary">hub</span>
        Mapa de Ressonância
      </h3>
      <svg viewBox="0 0 320 300" className="w-full h-auto max-h-[280px]">
        {/* arestas entre os nós principais */}
        {nodes.map((a, i) =>
          nodes.slice(i + 1).map((b) => (
            <line
              key={`${a.id}-${b.id}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="currentColor"
              strokeOpacity={0.25}
              strokeWidth={1}
              className="text-on-surface-variant"
            />
          )),
        )}
        {/* nós */}
        {nodes.map((n) => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={28} className="fill-surface-container-high stroke-primary" strokeWidth={1.5} />
            <text x={n.x} y={n.y + 4} textAnchor="middle" className="fill-primary text-sm font-semibold">
              {n.kin}
            </text>
            <text x={n.x} y={n.y + 46} textAnchor="middle" className="fill-on-surface-variant text-[10px] uppercase tracking-widest">
              {n.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {[
          { key: "guide", label: "Guia", kin: oracle.guide },
          { key: "analog", label: "Analógico", kin: oracle.analog },
          { key: "antipode", label: "Antípoda", kin: oracle.antipode },
          { key: "occult", label: "Oculto", kin: oracle.occult },
        ].map((r) => (
          <Link
            key={r.key}
            to="/ciclos/kin/$kin"
            params={{ kin: String(r.kin) }}
            className="rounded-2xl border border-outline-variant/40 px-3 py-2 flex items-center gap-3 hover:border-primary/60 transition-colors"
          >
            <KinSeal kin={r.kin} size={36} />
            <div className="flex-1 min-w-0">
              <span className="block text-[10px] uppercase tracking-widest text-on-surface-variant">{r.label}</span>
              <span className="font-title-md text-title-md text-primary">Kin {r.kin}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function KaiResonanceChat({
  kin,
  askFn,
}: {
  kin: number;
  askFn: ReturnType<typeof useServerFn<typeof askKai>>;
}) {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content:
        "Olá. Quando olha este Kin ao lado do ciclo de hoje e dos seus registros, o que primeiro chama a sua atenção? Traga uma palavra, uma imagem, um estranhamento — eu ouço.",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const mutation = useMutation({
    mutationFn: (msgs: typeof messages) => askFn({ data: { messages: msgs, resonance: { kin } } }),
    onSuccess: (r) => setMessages((prev) => [...prev, { role: "assistant", content: r.text }]),
    onError: (e: Error) => {
      toast.error(e.message);
      setMessages((prev) => prev.slice(0, -1));
    },
  });

  function send() {
    const trimmed = input.trim();
    if (!trimmed || mutation.isPending) return;
    const next = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(next);
    setInput("");
    mutation.mutate(next);
  }

  return (
    <div className="glass-panel rounded-3xl p-4 flex flex-col h-[520px]">
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`rounded-2xl px-4 py-3 max-w-[85%] font-body-md ${
              m.role === "user"
                ? "bg-primary text-on-primary ml-auto"
                : "bg-surface-container-high text-on-surface"
            }`}
          >
            {m.content}
          </div>
        ))}
        {mutation.isPending && (
          <div className="rounded-2xl px-4 py-3 bg-surface-container-high text-on-surface-variant italic max-w-[85%]">
            KAI está contemplando…
          </div>
        )}
      </div>
      <div className="flex gap-2 mt-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())}
          placeholder="Compartilhe com KAI…"
          className="flex-1 rounded-full bg-surface-container-low border border-outline-variant/40 px-4 py-2 focus:outline-none focus:border-primary"
        />
        <button
          onClick={send}
          disabled={!input.trim() || mutation.isPending}
          className="rounded-full bg-primary text-on-primary px-5 disabled:opacity-50"
        >
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </div>
  );
}
