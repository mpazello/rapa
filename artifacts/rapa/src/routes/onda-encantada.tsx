import { useState, useEffect, useCallback } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  getTodayKinInfo,
  getKinInfo,
  dateFromKin,
  TONES,
  guideKin,
  analogKin,
  antipodeKin,
  occultKin,
  type SealColor,
} from "@/lib/tzolkin";
import { KinBadge } from "@/components/KinBadge";

export const Route = createFileRoute("/onda-encantada")({
  head: () => ({
    meta: [
      { title: "Onda Encantada — RAPPAA" },
      { name: "description", content: "Os 13 Kins da Onda Encantada atual no Tzolkin Dreamspell." },
    ],
  }),
  component: OndaEncantadaPage,
});

const COLOR_CLASS: Record<SealColor, { text: string; bg: string; border: string }> = {
  vermelho: { text: "text-error",       bg: "bg-error",       border: "border-error/40" },
  branco:   { text: "text-on-surface",  bg: "bg-on-surface",  border: "border-on-surface/40" },
  azul:     { text: "text-primary",     bg: "bg-primary",     border: "border-primary/40" },
  amarelo:  { text: "text-tertiary",    bg: "bg-tertiary",    border: "border-tertiary/40" },
};

// ─── Layout em L (row, col) para os 13 Kins ──────────────────────────────────
const POSITIONS: [number, number][] = [
  [0,0],[1,0],[2,0],[3,0],[4,0],
  [4,1],[4,2],[4,3],[4,4],[4,5],
  [3,5],[2,5],[1,5],
];

// ─── Formatação de datas ──────────────────────────────────────────────────────

const WEEKDAYS_PT = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
const MONTHS_PT   = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

function formatKinDate(date: Date, isToday: boolean): string {
  const wd  = WEEKDAYS_PT[date.getUTCDay()];
  const dd  = String(date.getUTCDate()).padStart(2, "0");
  const mm  = String(date.getUTCMonth() + 1).padStart(2, "0");
  return isToday ? `Hoje · ${wd}, ${dd}/${mm}` : `${wd}, ${dd}/${mm}`;
}

function formatDateRange(start: Date, end: Date): string {
  const sd = start.getUTCDate();
  const ed = end.getUTCDate();
  const sm = MONTHS_PT[start.getUTCMonth()];
  const em = MONTHS_PT[end.getUTCMonth()];
  if (sm === em) return `${sd}–${ed} de ${sm}.`;
  return `${sd} de ${sm}. – ${ed} de ${em}.`;
}

function nextDreamspellDay(date: Date): Date {
  let next = new Date(date.getTime() + 86400000);
  if (next.getUTCMonth() === 1 && next.getUTCDate() === 29) {
    next = new Date(next.getTime() + 86400000);
  }
  return next;
}

// ─── Tile ─────────────────────────────────────────────────────────────────────

function Tile({
  kin,
  toneNumber,
  isToday,
  date,
  onSelect,
}: {
  kin: number;
  toneNumber: number;
  isToday: boolean;
  date: Date;
  onSelect: (kin: number, date: Date) => void;
}) {
  const info      = getKinInfo(kin);
  const colorText = COLOR_CLASS[info.seal.color].text;
  const dd        = String(date.getUTCDate()).padStart(2, "0");
  const mm        = String(date.getUTCMonth() + 1).padStart(2, "0");

  return (
    <button
      type="button"
      onClick={() => onSelect(kin, date)}
      className={`flex flex-col items-center rounded-xl p-1 transition-all active:scale-95 border ${
        isToday
          ? "border-primary bg-primary/15 shadow-[0_0_12px_rgba(99,102,241,0.3)]"
          : "border-transparent hover:border-white/20 hover:bg-white/5"
      }`}
    >
      <div className="flex items-center gap-[3px] mb-1 leading-none flex-wrap justify-center">
        <span className={`text-[9px] font-bold ${isToday ? "text-primary" : "text-on-surface"}`}>
          {toneNumber}
        </span>
        <span className="text-[8px] text-on-surface-variant/30">·</span>
        <span className="text-[8px] text-on-surface-variant/50">{dd}/{mm}</span>
        <span className="text-[8px] text-on-surface-variant/30">·</span>
        <span className={`text-[8px] font-semibold ${colorText}`}>{kin}</span>
      </div>
      <KinBadge kin={kin} isToday={isToday} size={52} />
    </button>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function KinModal({
  kin,
  date,
  onClose,
}: {
  kin: number;
  date: Date;
  onClose: () => void;
}) {
  const info     = getKinInfo(kin);
  const colors   = COLOR_CLASS[info.seal.color];
  const isToday  = date.toDateString() === new Date().toDateString();
  const weekday  = WEEKDAYS_PT[date.getUTCDay()];
  const dd       = String(date.getUTCDate()).padStart(2, "0");
  const mm       = String(date.getUTCMonth() + 1).padStart(2, "0");

  const oGuide    = guideKin(kin);
  const oAnalog   = analogKin(kin);
  const oAntipode = antipodeKin(kin);
  const oOccult   = occultKin(kin);

  // fechar com Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // travar scroll do body
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden />

      {/* Card */}
      <div
        className="relative glass-panel rounded-3xl border border-outline-variant/30 w-full max-w-[360px] max-h-[88vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Barra de fechar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 pt-4 pb-2 bg-surface/80 backdrop-blur-md rounded-t-3xl">
          <span className={`font-label-sm text-label-sm ${colors.text} tracking-widest uppercase`}>
            KIN {kin}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-outline-variant/40 flex items-center justify-center hover:bg-surface-container-low transition-colors"
            aria-label="Fechar"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Hero */}
        <div className="flex flex-col items-center px-6 pt-2 pb-5">
          <KinBadge kin={kin} size={128} pulse eager isToday={isToday} className="mb-4" />
          <p className={`font-label-sm text-[10px] ${isToday ? "text-primary" : "text-on-surface-variant/60"} mb-1`}>
            {isToday ? "Hoje · " : ""}{weekday}, {dd}/{mm}
          </p>
          <h2 className="font-headline-md text-on-surface text-center leading-tight mb-1">
            {info.fullName}
          </h2>
          <p className="font-body-sm text-on-surface-variant/50 text-xs italic">
            {info.seal.maya} · {info.tone.maya}
          </p>
        </div>

        {/* Tom */}
        <div className={`mx-4 mb-3 rounded-2xl px-4 py-3 ${colors.bg}/10 border ${colors.border}`}>
          <p className={`font-label-sm text-[9px] uppercase tracking-widest mb-0.5 ${colors.text}`}>
            Tom {info.tone.index}
          </p>
          <p className="font-body-md font-medium text-on-surface">{info.tone.name}</p>
          <p className="font-body-sm text-on-surface-variant/70 text-xs">
            {info.tone.essence} · {info.tone.power}
          </p>
        </div>

        {/* Mantra */}
        <div className={`mx-4 mb-3 border-l-2 pl-4 space-y-0.5 ${colors.border}`}>
          {info.mantra.map((line, i) => (
            <p
              key={i}
              className={`leading-relaxed ${
                i === 0 ? "font-body-md text-on-surface font-medium" :
                i === 4 ? "font-body-sm text-on-surface-variant/70 italic mt-1" :
                           "font-body-sm text-on-surface-variant"
              }`}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Afirmação */}
        <div className={`mx-4 mb-4 rounded-xl px-4 py-2.5 ${colors.bg}/8 border ${colors.border}/50`}>
          <p className={`font-label-sm text-[9px] uppercase tracking-widest mb-0.5 ${colors.text}`}>
            Afirmação
          </p>
          <p className="font-body-sm italic text-on-surface text-sm">"{info.affirmation}"</p>
        </div>

        {/* Oráculo */}
        <div className="mx-4 mb-4">
          <p className="font-label-sm text-[9px] text-on-surface-variant/50 uppercase tracking-widest mb-2">
            Oráculo · Família de 5
          </p>
          <div className="grid grid-cols-5 gap-1.5">
            {/* Self */}
            <div className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 ${colors.border} ${colors.bg}/10`}>
              <span className={`font-label-sm text-[7px] tracking-widest uppercase ${colors.text}`}>Eu</span>
              <KinBadge kin={kin} size={40} />
              <span className={`font-label-sm text-[9px] font-bold ${colors.text}`}>{kin}</span>
            </div>
            {([
              { k: oGuide,    label: "Guia" },
              { k: oAnalog,   label: "Análogo" },
              { k: oAntipode, label: "Antípoda" },
              { k: oOccult,   label: "Oculto" },
            ] as const).map(({ k, label }) => {
              const ki = getKinInfo(k);
              const kc = COLOR_CLASS[ki.seal.color];
              return (
                <div key={k} className="flex flex-col items-center gap-1 p-2 rounded-xl border border-outline-variant/30 bg-surface/30">
                  <span className="font-label-sm text-[7px] text-on-surface-variant/50 uppercase tracking-wide leading-tight text-center">{label}</span>
                  <KinBadge kin={k} size={40} />
                  <span className={`font-label-sm text-[9px] font-bold ${kc.text}`}>{k}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Link para página completa */}
        <div className="mx-4 mb-5">
          <Link
            to="/ciclos/kin/$kin"
            params={{ kin: String(kin) }}
            className="flex items-center justify-between w-full px-4 py-3 rounded-2xl border border-outline-variant/30 hover:border-primary/40 transition-colors"
            onClick={onClose}
          >
            <span className="font-body-sm text-on-surface-variant">Ver página completa</span>
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Página ───────────────────────────────────────────────────────────────────

function OndaEncantadaPage() {
  const [data, setData] = useState<{
    todayKin: number;
    kins: number[];
    dates: Date[];
    sealName: string;
    sealColor: SealColor;
    kinStart: number;
    kinEnd: number;
  } | null>(null);

  const [selected, setSelected] = useState<{ kin: number; date: Date } | null>(null);
  const openModal  = useCallback((kin: number, date: Date) => setSelected({ kin, date }), []);
  const closeModal = useCallback(() => setSelected(null), []);

  useEffect(() => {
    const info = getTodayKinInfo();
    const { kinStart, seal } = info.trecena;
    const kins = Array.from({ length: 13 }, (_, i) => ((kinStart - 1 + i) % 260) + 1);

    const dates: Date[] = [];
    let current = dateFromKin(kinStart);
    for (let i = 0; i < 13; i++) {
      dates.push(current);
      current = nextDreamspellDay(current);
    }

    setData({ todayKin: info.kin, kins, dates, sealName: seal.name, sealColor: seal.color, kinStart, kinEnd: kins[12] });
  }, []);

  const grid = data
    ? (() => {
        const g: (number | null)[][] = Array.from({ length: 5 }, () => Array(6).fill(null));
        POSITIONS.forEach(([r, c], i) => { g[r][c] = data.kins[i]; });
        return g;
      })()
    : null;

  return (
    <main className="pt-20 pb-32 px-container-margin max-w-[520px] mx-auto space-y-6">

      {/* Cabeçalho */}
      <div className="space-y-1">
        <p className="font-label-sm text-label-sm text-muted-stardust uppercase tracking-widest text-xs">
          Onda Encantada
        </p>
        {data ? (
          <>
            <h1 className={`font-serif text-3xl ${COLOR_CLASS[data.sealColor].text}`}>
              {data.sealName}
            </h1>
            <p className="text-muted-stardust/70 text-sm">
              Kin {data.kinStart} → {data.kinEnd}
              <span className="mx-2 opacity-40">·</span>
              {formatDateRange(data.dates[0], data.dates[12])}
            </p>
          </>
        ) : (
          <>
            <div className="h-9 w-40 bg-white/10 rounded animate-pulse" />
            <div className="h-4 w-48 bg-white/8 rounded animate-pulse" />
          </>
        )}
      </div>

      {/* Grade de tiles em L */}
      {grid ? (
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: "repeat(6, 1fr)", gridTemplateRows: "repeat(5, auto)" }}
        >
          {grid.flatMap((row, rIdx) =>
            row.map((kin, cIdx) =>
              kin === null ? (
                <div key={`${rIdx}-${cIdx}`} />
              ) : (
                <Tile
                  key={kin}
                  kin={kin}
                  toneNumber={data!.kins.indexOf(kin) + 1}
                  isToday={kin === data!.todayKin}
                  date={data!.dates[data!.kins.indexOf(kin)]}
                  onSelect={openModal}
                />
              )
            )
          )}
        </div>
      ) : (
        <div className="h-64 bg-white/5 rounded-2xl animate-pulse" />
      )}

      {/* Posição de hoje */}
      {data && data.kins.includes(data.todayKin) && (
        <p className="text-center text-sm text-muted-stardust/70">
          Você está no tom{" "}
          <span className="font-semibold text-astral-violet">
            {data.kins.indexOf(data.todayKin) + 1}
          </span>{" "}
          · Kin {data.todayKin}
        </p>
      )}

      {/* Lista dos 13 Kins */}
      {data && (
        <section className="glass-card rounded-2xl divide-y divide-outline-variant/20 overflow-hidden">
          {data.kins.map((kin, i) => {
            const info    = getKinInfo(kin);
            const tone    = TONES[i];
            const isToday = kin === data.todayKin;
            const kinDate = data.dates[i];
            return (
              <button
                key={kin}
                type="button"
                onClick={() => openModal(kin, kinDate)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left ${isToday ? "bg-astral-violet/10" : ""}`}
              >
                <span className="w-9 h-9 shrink-0">
                  <KinBadge kin={kin} isToday={isToday} className="w-full h-full" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isToday ? "text-astral-violet" : "text-on-surface"}`}>
                    {info.fullName}
                  </p>
                  <p className="text-xs text-muted-stardust/60">
                    Kin {kin} · Tom {tone?.name ?? i + 1}
                  </p>
                </div>
                <span className={`text-xs shrink-0 ${isToday ? "bg-astral-violet/20 text-astral-violet px-2 py-0.5 rounded-full font-medium" : "text-muted-stardust/50"}`}>
                  {formatKinDate(kinDate, isToday)}
                </span>
              </button>
            );
          })}
        </section>
      )}

      {/* Modal */}
      {selected && (
        <KinModal kin={selected.kin} date={selected.date} onClose={closeModal} />
      )}
    </main>
  );
}
