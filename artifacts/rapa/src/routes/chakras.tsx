import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  CHAKRAS,
  CHAKRAS_ASCENDENTE,
  activeModel,
  chakraDayReading,
  plasmaOfChakra,
  type Chakra,
} from "@/lib/chakras";
import { PlasmaSymbol } from "@/components/PlasmaSymbol";
import { SEAL_IMAGE } from "@/lib/seal-images";

export const Route = createFileRoute("/chakras")({
  head: () => ({
    meta: [
      { title: "7 Chakras — RAPA" },
      {
        name: "description",
        content:
          "Explore seu mapa energético através da sincronicidade do tempo: os 7 Chakras e suas correspondências galácticas no Sincronário 13:20.",
      },
      { property: "og:title", content: "7 Chakras — RAPA" },
      { property: "og:url", content: "/chakras" },
    ],
    links: [{ rel: "canonical", href: "/chakras" }],
  }),
  component: ChakrasPage,
});

type View = "corporal" | "mapa" | "correspondencias";

const VIEWS: { key: View; label: string; icon: string }[] = [
  { key: "corporal", label: "Visualização Corporal", icon: "accessibility_new" },
  { key: "mapa", label: "Mapa Energético", icon: "table_rows" },
  { key: "correspondencias", label: "Correspondências", icon: "hub" },
];

function addDays(d: Date, n: number): Date {
  const out = new Date(d);
  out.setDate(out.getDate() + n);
  return out;
}

function toInputValue(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function ChakrasPage() {
  const [view, setView] = useState<View>("corporal");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [date, setDate] = useState<Date>(() => new Date());

  const reading = useMemo(() => chakraDayReading(date), [date]);
  const selected = selectedId ? CHAKRAS.find((c) => c.id === selectedId) ?? null : null;
  const model = activeModel();
  const today = new Date();

  return (
    <main className="pt-24 pb-32 px-container-margin max-w-[720px] mx-auto min-h-screen relative">
      <div className="fixed inset-0 texture-overlay z-[-1]" aria-hidden />

      <section className="mb-6">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">7 Chakras</h2>
        <p className="font-body-md text-on-surface-variant opacity-80">
          Explore seu mapa energético através da sincronicidade do tempo.
        </p>
      </section>

      {/* Navegação temporal */}
      <section className="mb-6 flex flex-wrap items-center gap-2">
        {[
          { label: "Ontem", d: addDays(today, -1) },
          { label: "Hoje", d: today },
          { label: "Amanhã", d: addDays(today, 1) },
        ].map(({ label, d }) => (
          <button
            key={label}
            onClick={() => setDate(d)}
            className={`px-4 py-2 rounded-full font-label-sm text-label-sm transition-all border ${
              sameDay(date, d)
                ? "bg-primary text-on-primary border-primary shadow-md shadow-primary/20"
                : "border-outline-variant/40 text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            {label}
          </button>
        ))}
        <label className="ml-auto flex items-center gap-2 px-3 py-2 rounded-full border border-outline-variant/40 text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer">
          <span className="material-symbols-outlined text-[18px]">calendar_month</span>
          <input
            type="date"
            value={toInputValue(date)}
            onChange={(e) => {
              const [y, m, d] = e.target.value.split("-").map(Number);
              if (y && m && d) setDate(new Date(y, m - 1, d));
            }}
            className="bg-transparent font-label-sm text-label-sm focus:outline-none [color-scheme:dark]"
          />
        </label>
      </section>

      {/* Chakra em sintonia com o Kin do dia */}
      <section className="mb-6">
        <div
          className="glass-card rounded-3xl p-5 relative overflow-hidden"
          style={{
            boxShadow: `0 0 60px -20px ${reading.chakra.cor}55, inset 0 0 80px -60px ${reading.chakra.cor}66`,
          }}
        >
          <p className="font-label-sm text-label-sm tracking-widest uppercase text-on-surface-variant mb-2">
            Chakra em Sintonia com o Kin {sameDay(date, today) ? "de Hoje" : "do Dia"}
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setSelectedId(reading.chakra.id);
              }}
              className="relative shrink-0 w-16 h-16 rounded-full flex items-center justify-center transition-transform hover:scale-105"
              style={{
                background: `radial-gradient(circle, ${reading.chakra.cor}66, transparent 70%)`,
              }}
              aria-label={`Abrir chakra ${reading.chakra.nome}`}
            >
              <span
                className="w-8 h-8 rounded-full chakra-pulse"
                style={{ backgroundColor: reading.chakra.cor, boxShadow: `0 0 24px ${reading.chakra.cor}` }}
              />
            </button>
            <div className="min-w-0">
              <h3 className="font-headline-md text-headline-md text-on-surface">
                Chakra {reading.chakra.nome}
              </h3>
              <p className="font-body-md text-on-surface-variant">
                Plasma {reading.plasma.name} · Kin {reading.kin} — {reading.kinInfo.fullName}
              </p>
            </div>
          </div>
          <p className="font-body-md text-on-surface-variant mt-4 leading-relaxed">
            {reading.interpretacao}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              `Selo: ${reading.kinInfo.seal.name}`,
              `Tom: ${reading.kinInfo.tone.name}`,
              `Onda: ${reading.kinInfo.trecena.seal.name}`,
              `Castelo ${reading.castle.index}`,
              reading.sincronario.dayOutOfTime
                ? "Dia Fora do Tempo"
                : `Lua ${reading.sincronario.moon} · Dia ${reading.sincronario.day}`,
            ].map((chip) => (
              <span
                key={chip}
                className="px-3 py-1 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface-variant"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Alternância de visualizações */}
      <section className="mb-6">
        <div className="flex gap-1 bg-surface-container-low p-1 rounded-2xl border border-outline-variant/30">
          {VIEWS.map((v) => (
            <button
              key={v.key}
              onClick={() => setView(v.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl font-label-sm text-[11px] sm:text-label-sm transition-all ${
                view === v.key
                  ? "bg-primary text-on-primary shadow-md shadow-primary/20"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{v.icon}</span>
              <span className="truncate">{v.label}</span>
            </button>
          ))}
        </div>
      </section>

      {view === "corporal" && (
        <BodyView
          highlightedId={reading.chakra.id}
          selectedId={selectedId}
          hoverId={hoverId}
          onHover={setHoverId}
          onSelect={(id) => setSelectedId(id === selectedId ? null : id)}
        />
      )}

      {view === "mapa" && (
        <section className="space-y-3 mb-6">
          {CHAKRAS.map((c) => {
            const plasma = plasmaOfChakra(c);
            const isDay = c.id === reading.chakra.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={`w-full text-left glass-card rounded-2xl p-4 flex items-center gap-4 transition-all hover:scale-[1.01] ${
                  isDay ? "ring-1" : ""
                }`}
                style={isDay ? { boxShadow: `0 0 40px -14px ${c.cor}`, borderColor: `${c.cor}66` } : undefined}
              >
                <span
                  className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ background: `radial-gradient(circle, ${c.cor}44, transparent 75%)` }}
                >
                  <span className="material-symbols-outlined text-[22px]" style={{ color: c.cor }}>
                    {c.simbolo}
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline gap-2">
                    <span className="font-headline-sm text-on-surface">{c.numero}. {c.nome}</span>
                    <span className="font-label-sm text-label-sm" style={{ color: c.cor }}>{c.corNome}</span>
                  </span>
                  <span className="block font-body-sm text-on-surface-variant truncate">
                    {c.localizacao} · Plasma {plasma.name} · {c.mantra} · {c.palavraChave}
                  </span>
                </span>
                <span className="material-symbols-outlined text-on-surface-variant/60">chevron_right</span>
              </button>
            );
          })}
        </section>
      )}

      {view === "correspondencias" && (
        <CorrespondencesView
          chakra={selected ?? reading.chakra}
          reading={reading}
          onPick={(id) => setSelectedId(id)}
        />
      )}

      {/* Nota sobre o modelo de correspondência */}
      <p className="font-body-sm text-on-surface-variant/70 leading-relaxed mb-6">
        <span className="material-symbols-outlined text-[14px] align-middle mr-1">info</span>
        Modelo ativo: <strong>{model.nome}</strong>. Chakra ↔ Plasma Radial segue o sistema
        contemporâneo do Sincronário/Dreamspell; cores, símbolos e elementos são associações
        complementares deste projeto. Selo, Tom, Kin, Onda, Castelo e Lua são calculados a partir da data.
      </p>

      {selected && (
        <ChakraPanel chakra={selected} reading={reading} onClose={() => setSelectedId(null)} />
      )}

      <style>{`
        @keyframes chakraPulse {
          0%, 100% { transform: scale(1); opacity: 0.95; }
          50% { transform: scale(1.18); opacity: 1; }
        }
        .chakra-pulse { animation: chakraPulse 3s ease-in-out infinite; display: inline-block; }
      `}</style>
    </main>
  );
}

// ─── Visualização corporal ──────────────────────────────────────────────────

function BodyView({
  highlightedId,
  selectedId,
  hoverId,
  onHover,
  onSelect,
}: {
  highlightedId: string;
  selectedId: string | null;
  hoverId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}) {
  const hovered = hoverId ? CHAKRAS.find((c) => c.id === hoverId) : null;
  return (
    <section className="mb-6">
      <div className="glass-card rounded-3xl relative overflow-hidden px-4 py-8">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 35%, rgba(182,199,235,0.06), transparent 70%)",
          }}
        />
        <div className="relative mx-auto" style={{ width: "min(320px, 80vw)", aspectRatio: "320/520" }}>
          {/* Silhueta humana anatômica */}
          <svg viewBox="0 0 320 520" className="absolute inset-0 w-full h-full" aria-hidden>
            <defs>
              <linearGradient id="fluxGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#b98ed6" />
                <stop offset="50%" stopColor="#6fc98b" />
                <stop offset="100%" stopColor="#e0524d" />
              </linearGradient>
              <linearGradient id="bodyFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(210,220,245,0.10)" />
                <stop offset="100%" stopColor="rgba(210,220,245,0.04)" />
              </linearGradient>
            </defs>

            <g
              fill="url(#bodyFill)"
              stroke="rgba(210,222,248,0.30)"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            >
              {/* Cabeça — oval com queixo levemente afilado */}
              <path d="
                M 160 8
                C 192 8, 194 36, 192 52
                C 190 65, 180 80, 168 84
                C 164 86, 156 86, 152 84
                C 140 80, 130 65, 128 52
                C 126 36, 128 8, 160 8 Z
              "/>

              {/* Pescoço */}
              <path d="
                M 151 82
                C 149 90, 147 97, 145 106
                L 175 106
                C 173 97, 171 90, 169 82 Z
              "/>

              {/* Tronco — ombros, clavícula, cintura, quadril */}
              <path d="
                M 145 106
                C 122 108, 94 118, 86 132
                C 81 144, 98 157, 106 162
                C 102 190, 116 238, 120 258
                C 118 278, 102 308, 104 324
                C 106 342, 130 356, 152 358
                L 168 358
                C 190 356, 214 342, 216 324
                C 218 308, 202 278, 200 258
                C 204 238, 218 190, 214 162
                C 222 157, 239 144, 234 132
                C 226 118, 198 108, 175 106 Z
              "/>

              {/* Braço esquerdo — pose natural, leve abertura */}
              <path d="
                M 88 134
                C 72 155, 62 222, 62 258
                C 62 298, 66 332, 66 362
                C 66 372, 64 384, 66 392
                C 70 400, 82 398, 88 390
                C 92 381, 92 368, 90 358
                C 90 330, 96 298, 98 260
                C 100 222, 100 157, 96 138 Z
              "/>

              {/* Braço direito — espelho */}
              <path d="
                M 232 134
                C 248 157, 260 222, 262 260
                C 264 298, 270 330, 270 358
                C 268 368, 268 381, 272 390
                C 278 398, 290 400, 294 392
                C 296 384, 294 372, 294 362
                C 294 332, 298 298, 298 258
                C 298 222, 288 155, 272 134 Z
              "/>

              {/* Perna esquerda */}
              <path d="
                M 104 326
                C 102 340, 116 354, 148 360
                L 158 360 158 432
                C 157 456, 153 476, 150 492
                L 90 492 90 510 90 516
                L 164 516 164 492
                C 164 476, 164 456, 164 432
                L 164 360 152 358
              "/>

              {/* Perna direita */}
              <path d="
                M 216 326
                C 218 340, 204 354, 172 360
                L 164 360 164 432
                C 164 456, 164 476, 164 492
                L 164 516 230 516 230 510 230 492
                L 210 492
                C 207 476, 203 456, 202 432
                L 202 360 168 358
              "/>
            </g>

            {/* Canal central de energia */}
            <line
              x1="160" y1="10" x2="160" y2="362"
              stroke="url(#fluxGradient)"
              strokeWidth="1.5"
              strokeDasharray="3 8"
              strokeLinecap="round"
            />
          </svg>

          {/* Chakras */}
          {CHAKRAS.map((c) => {
            const isSelected = selectedId === c.id;
            const isDay = highlightedId === c.id;
            const dim = selectedId !== null && !isSelected;
            const size = isSelected ? 34 : 26;
            return (
              <button
                key={c.id}
                onMouseEnter={() => onHover(c.id)}
                onMouseLeave={() => onHover(null)}
                onFocus={() => onHover(c.id)}
                onBlur={() => onHover(null)}
                onClick={() => onSelect(c.id)}
                aria-label={`Chakra ${c.nome} — ${c.localizacao}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500"
                style={{
                  left: "50%",
                  top: `${c.posY * 100}%`,
                  width: size,
                  height: size,
                  backgroundColor: c.cor,
                  opacity: dim ? 0.35 : 1,
                  boxShadow: isSelected
                    ? `0 0 34px 6px ${c.cor}, 0 0 90px ${c.cor}88`
                    : isDay
                      ? `0 0 26px 3px ${c.cor}, 0 0 60px ${c.cor}66`
                      : `0 0 16px ${c.cor}aa`,
                  animation: `chakraPulse ${2.4 + c.numero * 0.25}s ease-in-out infinite`,
                }}
              />
            );
          })}

          {/* Tooltip */}
          {hovered && (
            <div
              className="absolute z-20 pointer-events-none px-4 py-3 rounded-2xl bg-surface-container-high/95 backdrop-blur-md border border-outline-variant/40 shadow-xl w-52"
              style={{
                left: "62%",
                top: `${Math.min(Math.max(hovered.posY * 100 - 6, 2), 72)}%`,
              }}
            >
              <p className="font-headline-sm text-on-surface flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: hovered.cor }} />
                {hovered.nome}
              </p>
              <p className="font-body-sm text-on-surface-variant mt-1">
                {hovered.corNome} · {hovered.localizacao}
              </p>
              <p className="font-label-sm text-label-sm mt-1" style={{ color: hovered.cor }}>
                {hovered.palavraChave}
              </p>
            </div>
          )}
        </div>
        <p className="text-center font-body-sm text-on-surface-variant/60 mt-4">
          Toque em um chakra para revelar sua rede de correspondências.
        </p>
      </div>
    </section>
  );
}

// ─── Correspondências galácticas ────────────────────────────────────────────

function CorrespondencesView({
  chakra,
  reading,
  onPick,
}: {
  chakra: Chakra;
  reading: ReturnType<typeof chakraDayReading>;
  onPick: (id: string) => void;
}) {
  const plasma = plasmaOfChakra(chakra);
  const isDayChakra = chakra.id === reading.chakra.id;

  const flow: { titulo: string; valor: string; detalhe?: string; cor?: string; icon?: React.ReactNode }[] = [
    {
      titulo: "Chakra",
      valor: `${chakra.nome} · ${chakra.identidade}`,
      detalhe: chakra.localizacao,
      cor: chakra.cor,
    },
    {
      titulo: "Plasma Radial",
      valor: `${plasma.name} — ${plasma.action}`,
      detalhe: `${plasma.day} · ${plasma.quality}`,
      icon: <PlasmaSymbol index={plasma.index} size={28} />,
    },
    ...(isDayChakra
      ? [
          {
            titulo: "Selo Solar (do dia)",
            valor: reading.kinInfo.seal.name,
            detalhe: `${reading.kinInfo.seal.action} · ${reading.kinInfo.seal.power}`,
            icon: (
              <img
                src={SEAL_IMAGE[reading.kinInfo.seal.index]}
                alt=""
                className="w-8 h-8 rounded-md object-contain"
              />
            ),
          },
          {
            titulo: "Tom Galáctico (do dia)",
            valor: `${reading.kinInfo.tone.index} · ${reading.kinInfo.tone.name}`,
            detalhe: reading.kinInfo.tone.essence,
          },
          {
            titulo: "Kin (do dia)",
            valor: `Kin ${reading.kin}`,
            detalhe: reading.kinInfo.fullName,
          },
          {
            titulo: "Onda Encantada",
            valor: `Onda do ${reading.kinInfo.trecena.seal.name}`,
            detalhe: `Início no Kin ${reading.kinInfo.trecena.kinStart}`,
          },
          {
            titulo: "Castelo",
            valor: `Castelo ${reading.castle.index}`,
            detalhe: reading.castle.power,
          },
          {
            titulo: "Lua (13 Luas × 28 dias)",
            valor: reading.sincronario.dayOutOfTime
              ? "Dia Fora do Tempo"
              : `Lua ${reading.sincronario.moon} — ${reading.sincronario.moonName}`,
            detalhe: reading.sincronario.dayOutOfTime
              ? undefined
              : `Dia ${reading.sincronario.day} de 28`,
          },
        ]
      : []),
  ];

  return (
    <section className="mb-6">
      <div className="glass-card rounded-3xl p-5">
        <div className="flex items-center justify-between mb-4 gap-3">
          <h3 className="font-headline-sm text-on-surface">Correspondências Galácticas</h3>
          <select
            value={chakra.id}
            onChange={(e) => onPick(e.target.value)}
            className="bg-surface-container-high rounded-full px-3 py-1.5 font-label-sm text-label-sm text-on-surface focus:outline-none"
            aria-label="Escolher chakra"
          >
            {CHAKRAS_ASCENDENTE.map((c) => (
              <option key={c.id} value={c.id}>
                {c.numero}. {c.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col items-stretch">
          {flow.map((step, i) => (
            <div key={step.titulo}>
              {i > 0 && (
                <div className="flex justify-center py-1">
                  <span
                    className="w-px h-5"
                    style={{ background: `linear-gradient(${chakra.cor}88, transparent)` }}
                  />
                </div>
              )}
              <div
                className="rounded-2xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 flex items-center gap-3"
                style={i === 0 ? { borderColor: `${step.cor}55`, boxShadow: `0 0 30px -14px ${step.cor}` } : undefined}
              >
                {step.icon ?? (
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: step.cor ?? chakra.cor }}
                  />
                )}
                <div className="min-w-0">
                  <p className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant/70">
                    {step.titulo}
                  </p>
                  <p className="font-body-md text-on-surface">{step.valor}</p>
                  {step.detalhe && (
                    <p className="font-body-sm text-on-surface-variant">{step.detalhe}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {!isDayChakra && (
          <p className="font-body-sm text-on-surface-variant/70 mt-4 leading-relaxed">
            Selo, Tom, Kin, Onda, Castelo e Lua são correspondências do <em>dia</em> — elas se
            revelam quando este chakra está em sintonia com a data ({chakra.diaSemana}). Use a
            navegação temporal acima para visitar um {chakra.diaSemana.toLowerCase()} e ver a rede completa.
          </p>
        )}
      </div>
    </section>
  );
}

// ─── Painel detalhado ───────────────────────────────────────────────────────

function ChakraPanel({
  chakra,
  reading,
  onClose,
}: {
  chakra: Chakra;
  reading: ReturnType<typeof chakraDayReading>;
  onClose: () => void;
}) {
  const plasma = plasmaOfChakra(chakra);
  const isDayChakra = chakra.id === reading.chakra.id;

  const rows: { label: string; value: string }[] = [
    { label: "Cor", value: `${chakra.corNome} (${chakra.cor})` },
    { label: "Localização", value: chakra.localizacao },
    { label: "Elemento", value: chakra.elemento },
    { label: "Função energética", value: chakra.funcaoEnergetica },
    { label: "Órgãos relacionados", value: chakra.orgaos },
    { label: "Mantra", value: `${chakra.mantra} — “${plasma.mantra}”` },
    { label: "Dia da semana", value: chakra.diaSemana },
    { label: "Ciclo de desenvolvimento", value: chakra.idadeCiclo },
    { label: "Plasma Radial", value: `${plasma.name} — ${plasma.action} (${plasma.quality})` },
    ...(isDayChakra
      ? [
          { label: "Selo Solar (hoje)", value: reading.kinInfo.seal.name },
          { label: "Tom Galáctico (hoje)", value: `${reading.kinInfo.tone.index} · ${reading.kinInfo.tone.name}` },
          { label: "Kin (hoje)", value: `Kin ${reading.kin} — ${reading.kinInfo.fullName}` },
          { label: "Onda Encantada (hoje)", value: `Onda do ${reading.kinInfo.trecena.seal.name}` },
          { label: "Afirmação Galáctica", value: reading.kinInfo.affirmation },
        ]
      : []),
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={`Detalhes do chakra ${chakra.nome}`}
    >
      <button
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Fechar"
      />
      <div
        className="relative w-full sm:max-w-lg max-h-[85vh] overflow-y-auto bg-surface-container-low border border-outline-variant/40 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-[panelIn_.35s_cubic-bezier(.16,1,.3,1)]"
        style={{ boxShadow: `0 -10px 80px -30px ${chakra.cor}` }}
      >
        <div className="flex items-start gap-4 mb-5">
          <span
            className="shrink-0 w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: `radial-gradient(circle, ${chakra.cor}55, transparent 75%)` }}
          >
            <span
              className="material-symbols-outlined text-[28px] chakra-pulse"
              style={{ color: chakra.cor }}
            >
              {chakra.simbolo}
            </span>
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-headline-md text-headline-md text-on-surface">
              {chakra.numero}. Chakra {chakra.nome}
            </h3>
            <p className="font-body-md text-on-surface-variant">
              {chakra.nomeSanskrito} · {chakra.identidade}
            </p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
            aria-label="Fechar painel"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-3">
          {rows.map((r) => (
            <div key={r.label} className="flex gap-3">
              <span className="w-40 shrink-0 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant/70 pt-0.5">
                {r.label}
              </span>
              <span className="font-body-md text-on-surface leading-relaxed">{r.value}</span>
            </div>
          ))}
        </div>

        {!isDayChakra && (
          <p className="font-body-sm text-on-surface-variant/70 mt-5 leading-relaxed">
            Kin, Selo, Tom e Onda são revelados quando este chakra rege o dia ({chakra.diaSemana}).
          </p>
        )}

        <style>{`
          @keyframes panelIn {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
}
