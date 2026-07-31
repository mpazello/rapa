import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { kinFromDate, getKinInfo, sincronarioDate, PLASMAS, getEarthFamily } from "@/lib/tzolkin";
import { SEAL_IMAGE } from "@/lib/seal-images";

export const Route = createFileRoute("/almanaque")({
  head: () => ({
    meta: [
      { title: "Almanaque — RAPPAA" },
      { name: "description", content: "Calendário das 13 Luas — Sincronário 13:20 Dreamspell." },
    ],
  }),
  component: AlmanaquePage,
});

// ─── 13 Luas ────────────────────────────────────────────────────────────────
const MOONS = [
  { number: 1,  tone: "Magnética",     quality: "Propósito",    animal: "Morcego",    essence: "Unificar",     question: "Qual é o meu propósito?" },
  { number: 2,  tone: "Lunar",         quality: "Desafio",      animal: "Escorpião",  essence: "Estabilizar",  question: "Qual é o meu desafio?" },
  { number: 3,  tone: "Elétrica",      quality: "Serviço",      animal: "Veado",      essence: "Vincular",     question: "Como sirvo melhor?" },
  { number: 4,  tone: "Autoexistente", quality: "Forma",        animal: "Coruja",     essence: "Medir",        question: "Qual é a forma do meu serviço?" },
  { number: 5,  tone: "Harmônica",     quality: "Radiância",    animal: "Pavão",      essence: "Enaltecer",    question: "Como posso irradiar melhor?" },
  { number: 6,  tone: "Rítmica",       quality: "Equanimidade", animal: "Lagartixa",  essence: "Equilibrar",   question: "Como posso estender minha equanimidade?" },
  { number: 7,  tone: "Ressonante",    quality: "Sintonização", animal: "Macaco",     essence: "Canalizar",    question: "Como posso me sintonizar ao serviço?" },
  { number: 8,  tone: "Galáctica",     quality: "Integridade",  animal: "Gavião",     essence: "Harmonizar",   question: "Estou vivendo meu juramento?" },
  { number: 9,  tone: "Solar",         quality: "Intenção",     animal: "Jaguar",     essence: "Realizar",     question: "Como posso realizar minha intenção?" },
  { number: 10, tone: "Planetária",    quality: "Manifestação", animal: "Cão",        essence: "Produzir",     question: "Como posso aperfeiçoar o que manifesto?" },
  { number: 11, tone: "Espectral",     quality: "Libertação",   animal: "Cobra",      essence: "Liberar",      question: "Como posso libertar para que eu possa me render?" },
  { number: 12, tone: "Cristal",       quality: "Cooperação",   animal: "Coelho",     essence: "Universalizar",question: "Como posso dedicar-me ao Ser Supremo?" },
  { number: 13, tone: "Cósmica",       quality: "Presença",     animal: "Tartaruga",  essence: "Transcender",  question: "Como posso me expandir e transcender?" },
] as const;

const HEPTAL_COLORS = [
  "text-red-400 border-red-400/40 bg-red-400/8",
  "text-slate-300 border-slate-300/40 bg-slate-300/8",
  "text-blue-400 border-blue-400/40 bg-blue-400/8",
  "text-yellow-400 border-yellow-400/40 bg-yellow-400/8",
] as const;

const HEPTAL_NAMES = ["Heptal Vermelho", "Heptal Branco", "Heptal Azul", "Heptal Amarelo"] as const;
const HEPTAL_SUBTITLES = [
  "o conhecimento inicia a visão",
  "a humildade refina a meditação",
  "a paciência transforma a conduta",
  "o poder amadurece o fruto",
] as const;

// Display names (tzolkin.ts uses "Gamma"/"Alpha" — almanaque usa "GAMA"/"ALFA")
const PLASMA_DISPLAY = ["DALI", "SELI", "GAMA", "KALI", "ALFA", "LIMI", "SILIO"] as const;
const PLASMA_ICONS = ["wb_sunny", "water_drop", "spa", "bolt", "air", "brightness_5", "favorite"] as const;
const PLASMA_COLORS = [
  "text-yellow-300",
  "text-red-400",
  "text-white",
  "text-blue-400",
  "text-yellow-400",
  "text-red-300",
  "text-white",
] as const;

const PORTAL_KINS = new Set([
  1, 20, 22, 39, 43, 50, 51, 58, 64, 69, 72, 77,
  85, 88, 93, 96, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115,
  146, 147, 148, 149, 150, 151, 152, 153, 154, 155,
  165, 168, 173, 176, 184, 189, 192, 197, 203, 210, 211, 218,
  222, 239, 241, 260,
]);

const COLOR_CLASS: Record<string, { text: string; bg: string; border: string }> = {
  vermelho: { text: "text-error", bg: "bg-error", border: "border-error/40" },
  branco: { text: "text-on-surface", bg: "bg-on-surface", border: "border-on-surface/40" },
  azul: { text: "text-primary", bg: "bg-primary", border: "border-primary/40" },
  amarelo: { text: "text-tertiary", bg: "bg-tertiary", border: "border-tertiary/40" },
};

// ─── Calendário helpers ──────────────────────────────────────────────────────

/** Returns UTC midnight of July 26 for a given galactic year. */
function galacticYearStart(galYear: number): Date {
  return new Date(Date.UTC(galYear, 6, 26));
}

/** Galactic year (July 26 → July 25 next year). July = month 6 (0-indexed). */
function galacticYear(date: Date): number {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth(); // 0-indexed: 6 = July
  const d = date.getUTCDate();
  return (m > 6 || (m === 6 && d >= 26)) ? y : y - 1;
}

/**
 * Convert Dreamspell moon/day to a gregorian Date.
 * Iterates forward from year start, skipping Feb 29 (Dreamspell rule).
 */
function moonDayToDate(galYear: number, moonNumber: number, dayInMoon: number): Date {
  const offset = (moonNumber - 1) * 28 + (dayInMoon - 1);
  let cur = galacticYearStart(galYear);
  for (let i = 0; i < offset; i++) {
    cur = new Date(cur.getTime() + 86400000);
    if (cur.getUTCMonth() === 1 && cur.getUTCDate() === 29) {
      cur = new Date(cur.getTime() + 86400000); // skip Feb 29
    }
  }
  return cur;
}

/** All 28 gregorian dates for a given moon. */
function moonAllDates(galYear: number, moonNumber: number): Date[] {
  return Array.from({ length: 28 }, (_, i) => moonDayToDate(galYear, moonNumber, i + 1));
}

function formatDate(d: Date, opts: Intl.DateTimeFormatOptions): string {
  return d.toLocaleDateString("pt-BR", opts);
}

// ─── Page component ──────────────────────────────────────────────────────────

function AlmanaquePage() {
  const todayUTC = useMemo(() => {
    const n = new Date();
    return new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()));
  }, []);

  const todaySync = useMemo(() => sincronarioDate(todayUTC), [todayUTC]);
  const todayGalYear = useMemo(() => galacticYear(todayUTC), [todayUTC]);
  const todayKin = useMemo(() => kinFromDate(todayUTC), [todayUTC]);

  // Currently viewed moon/year
  const [viewGalYear, setViewGalYear] = useState(() => todayGalYear);
  const [viewMoon, setViewMoon] = useState(() => todaySync.dayOutOfTime ? 1 : todaySync.moon);

  // Selected day detail (dayInMoon 1-28, or null for calendar view)
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const moon = MOONS[viewMoon - 1];
  const dates = useMemo(() => moonAllDates(viewGalYear, viewMoon), [viewGalYear, viewMoon]);

  function prevMoon() {
    if (viewMoon === 1) {
      setViewGalYear(y => y - 1);
      setViewMoon(13);
    } else {
      setViewMoon(m => m - 1);
    }
    setSelectedDay(null);
  }
  function nextMoon() {
    if (viewMoon === 13) {
      setViewGalYear(y => y + 1);
      setViewMoon(1);
    } else {
      setViewMoon(m => m + 1);
    }
    setSelectedDay(null);
  }

  const isCurrentMoon = viewGalYear === todayGalYear && viewMoon === (todaySync.dayOutOfTime ? 0 : todaySync.moon);

  return (
    <main className="pt-24 pb-32 px-container-margin max-w-[760px] mx-auto min-h-screen">
      <div className="fixed inset-0 texture-overlay z-[-1]" aria-hidden />

      {selectedDay === null ? (
        <CalendarView
          galYear={viewGalYear}
          moon={moon}
          moonNumber={viewMoon}
          dates={dates}
          todayUTC={todayUTC}
          todayKin={todayKin}
          isCurrentMoon={isCurrentMoon}
          onSelectDay={setSelectedDay}
          onPrev={prevMoon}
          onNext={nextMoon}
        />
      ) : (
        <DayDetail
          galYear={viewGalYear}
          moonNumber={viewMoon}
          moon={moon}
          dayInMoon={selectedDay}
          date={dates[selectedDay - 1]}
          todayUTC={todayUTC}
          todayKin={todayKin}
          onBack={() => setSelectedDay(null)}
        />
      )}
    </main>
  );
}

// ─── Calendar view ───────────────────────────────────────────────────────────

function CalendarView({
  galYear, moon, moonNumber, dates, todayUTC, todayKin, isCurrentMoon, onSelectDay, onPrev, onNext,
}: {
  galYear: number;
  moon: (typeof MOONS)[number];
  moonNumber: number;
  dates: Date[];
  todayUTC: Date;
  todayKin: number;
  isCurrentMoon: boolean;
  onSelectDay: (d: number) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const startDate = dates[0];
  const endDate = dates[27];

  const startStr = formatDate(startDate, { day: "numeric", month: "short" });
  const endStr = formatDate(endDate, { day: "numeric", month: "short", year: "numeric" });

  // Today's day in this moon (1-28) or null
  const todayDayInMoon = useMemo(() => {
    const sync = sincronarioDate(todayUTC);
    if (sync.dayOutOfTime || sync.moon !== moonNumber) return null;
    // check galactic year
    const todayGY = galacticYear(todayUTC);
    if (todayGY !== galYear) return null;
    return sync.day;
  }, [todayUTC, moonNumber, galYear]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-panel rounded-3xl p-5">
        <div className="flex items-center justify-between mb-1">
          <button
            type="button"
            onClick={onPrev}
            className="w-9 h-9 rounded-full border border-outline-variant/40 flex items-center justify-center hover:bg-surface-container-low transition-colors"
            aria-label="Lua anterior"
          >
            <span className="material-symbols-outlined text-lg">chevron_left</span>
          </button>
          <div className="text-center flex-1 px-3">
            <div className="flex items-center justify-center gap-2 mb-0.5">
              {isCurrentMoon && (
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">Agora</span>
              )}
              <span className="font-label-sm text-label-sm text-on-surface-variant/60 uppercase tracking-widest">
                Lua {moonNumber} de 13
              </span>
            </div>
            <h1 className="font-serif text-xl text-astral-violet leading-tight">
              Lua {moon.tone} do {moon.animal}
            </h1>
            <p className="font-label-sm text-label-sm text-on-surface-variant/70 mt-0.5">
              lua do <span className="text-on-surface font-medium">{moon.quality.toLowerCase()}</span>
            </p>
            <p className="font-body-sm text-on-surface-variant/50 text-xs mt-1">
              {startStr} — {endStr}
            </p>
          </div>
          <button
            type="button"
            onClick={onNext}
            className="w-9 h-9 rounded-full border border-outline-variant/40 flex items-center justify-center hover:bg-surface-container-low transition-colors"
            aria-label="Próxima lua"
          >
            <span className="material-symbols-outlined text-lg">chevron_right</span>
          </button>
        </div>
        {isCurrentMoon && (
          <p className="text-center font-body-sm text-on-surface-variant/60 italic text-xs mt-2 pt-2 border-t border-white/5">
            "{moon.question}"
          </p>
        )}
      </div>

      {/* Grid */}
      <div className="glass-panel rounded-3xl p-3 overflow-x-auto">
        {/* Plasma header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {PLASMAS.map((p, i) => (
            <div key={p.name} className="flex flex-col items-center py-1.5">
              <span className={`material-symbols-outlined text-[16px] ${PLASMA_COLORS[i]}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                {PLASMA_ICONS[i]}
              </span>
              <span className={`font-label-sm text-[9px] tracking-wider uppercase mt-0.5 ${PLASMA_COLORS[i]}`}>
                {PLASMA_DISPLAY[i]}
              </span>
            </div>
          ))}
        </div>

        {/* 4 weeks */}
        {[0, 1, 2, 3].map((week) => {
          const heptalColor = HEPTAL_COLORS[week];
          return (
            <div key={week} className="mb-2">
              <div className={`text-[9px] font-label-sm tracking-widest uppercase mb-1 pl-1 ${heptalColor.split(" ")[0]}`}>
                {HEPTAL_NAMES[week]} · {HEPTAL_SUBTITLES[week]}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 7 }, (_, col) => {
                  const dayInMoon = week * 7 + col + 1; // 1-28
                  const date = dates[dayInMoon - 1];
                  const kin = kinFromDate(date);
                  const kinInfo = getKinInfo(kin);
                  const isToday = dayInMoon === todayDayInMoon;
                  const isPortal = PORTAL_KINS.has(kin);
                  const colorCls = COLOR_CLASS[kinInfo.seal.color];

                  return (
                    <button
                      key={dayInMoon}
                      type="button"
                      onClick={() => onSelectDay(dayInMoon)}
                      className={`relative flex flex-col items-center rounded-xl p-1 transition-all active:scale-95 border ${
                        isToday
                          ? `border-primary bg-primary/15 shadow-[0_0_12px_rgba(99,102,241,0.3)]`
                          : `border-transparent hover:border-outline-variant/40 hover:bg-surface-container-low`
                      }`}
                    >
                      {/* Day number */}
                      <span className={`font-headline-sm text-[15px] font-bold leading-none mb-0.5 ${isToday ? "text-primary" : "text-on-surface"}`}>
                        {dayInMoon}
                      </span>
                      {/* Gregorian date */}
                      <span className="text-[8px] text-on-surface-variant/50 leading-none mb-1">
                        {formatDate(date, { day: "numeric", month: "numeric" })}
                      </span>
                      {/* Kin seal */}
                      <div className={`w-7 h-7 rounded-full border ${colorCls.border} bg-surface/40 flex items-center justify-center p-1 mb-0.5`}>
                        <img
                          src={SEAL_IMAGE[kinInfo.seal.index]}
                          alt={kinInfo.seal.name}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      {/* Kin number */}
                      <span className={`text-[8px] font-medium leading-none ${colorCls.text}`}>
                        {kin}{isPortal ? " PV" : ""}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-4 justify-center text-label-sm text-on-surface-variant/60">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-primary/60 inline-block" />
          hoje
        </span>
        <span className="flex items-center gap-1.5">
          <span className="font-label-sm text-[10px]">PV</span>
          portal galáctico
        </span>
      </div>
    </div>
  );
}

// ─── Day detail ──────────────────────────────────────────────────────────────

function DayDetail({
  galYear, moonNumber, moon, dayInMoon, date, todayUTC, todayKin, onBack,
}: {
  galYear: number;
  moonNumber: number;
  moon: (typeof MOONS)[number];
  dayInMoon: number;
  date: Date;
  todayUTC: Date;
  todayKin: number;
  onBack: () => void;
}) {
  const kin = useMemo(() => kinFromDate(date), [date]);
  const info = useMemo(() => getKinInfo(kin), [kin]);
  const colors = COLOR_CLASS[info.seal.color];
  const fam = useMemo(() => getEarthFamily(info.seal.index), [info.seal.index]);

  const plasmaIndex = (dayInMoon - 1) % 7; // 0-6
  const plasma = PLASMAS[plasmaIndex]; // PLASMAS[0]=Dali, [1]=Seli, ...

  const weekNumber = Math.floor((dayInMoon - 1) / 7) + 1;
  const heptalColor = HEPTAL_COLORS[weekNumber - 1];

  const isToday = date.getTime() === todayUTC.getTime();
  const isPortal = PORTAL_KINS.has(kin);

  const colorLabel: Record<string, string> = {
    vermelho: "Vermelho [Inicia]",
    branco: "Branco [Refina]",
    azul: "Azul [Transforma]",
    amarelo: "Amarelo [Amadurece]",
  };

  const gregDate = formatDate(date, { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="space-y-4">
      {/* Back + meta */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span className="font-label-sm text-label-sm">Voltar ao calendário</span>
        </button>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-label-sm tracking-widest uppercase ${heptalColor}`}>
          Lua {moonNumber} · Dia {dayInMoon}
        </div>
      </div>

      {/* Plasma + date header */}
      <div className="glass-panel rounded-3xl p-5 flex flex-col items-center text-center gap-3">
        {/* Plasma */}
        <div className="flex items-center gap-2">
          <span className={`material-symbols-outlined text-[28px] ${PLASMA_COLORS[plasmaIndex]}`} style={{ fontVariationSettings: "'FILL' 1" }}>
            {PLASMA_ICONS[plasmaIndex]}
          </span>
          <div className="text-left">
            <p className={`font-label-sm text-label-sm uppercase tracking-widest font-bold ${PLASMA_COLORS[plasmaIndex]}`}>
              {PLASMA_DISPLAY[plasmaIndex]}
            </p>
            <p className="text-[11px] text-on-surface-variant/70">{plasma.action} · {plasma.chakra}</p>
          </div>
        </div>

        <div className="w-full border-t border-white/8 pt-3">
          <p className="font-body-sm text-on-surface-variant/70 capitalize">{gregDate}</p>
          <p className={`font-label-sm text-label-sm tracking-widest mt-1 ${heptalColor.split(" ")[0]}`}>
            {HEPTAL_NAMES[weekNumber - 1]} · {HEPTAL_SUBTITLES[weekNumber - 1]}
          </p>
        </div>
      </div>

      {/* KIN identity */}
      <div className={`relative glass-panel rounded-3xl p-6 flex flex-col items-center text-center border-l-4 ${colors.border}`}>
        <div className={`absolute inset-0 rounded-3xl ${colors.bg}/5 pointer-events-none`} />
        <div className={`w-20 h-20 rounded-full border-2 ${colors.border} flex items-center justify-center bg-surface/40 p-3 mb-4 relative`}>
          <div className={`absolute inset-0 rounded-full ${colors.bg} blur-xl opacity-20`} />
          <img
            src={SEAL_IMAGE[info.seal.index]}
            alt={info.seal.name}
            className="w-full h-full object-contain relative"
          />
        </div>

        <div className="flex items-center gap-2 mb-1">
          <span className={`font-label-sm text-label-sm ${colors.text} tracking-widest uppercase`}>
            KIN {kin}
          </span>
          {isToday && (
            <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-label-sm tracking-wide">hoje</span>
          )}
          {isPortal && (
            <span className="px-2 py-0.5 rounded-full bg-error/20 text-error text-[10px] font-label-sm tracking-wide">portal</span>
          )}
        </div>
        <h2 className="font-headline-md text-headline-md text-on-surface mb-1">{info.fullName}</h2>
        <p className="font-body-sm text-on-surface-variant/70 italic">{info.seal.maya} · {info.tone.maya}</p>
      </div>

      {/* Mantra */}
      <div className="glass-panel rounded-3xl p-5 space-y-3">
        <h3 className="font-title-sm text-title-sm flex items-center gap-2">
          <span className={`material-symbols-outlined text-base ${colors.text}`} style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          Mantra Galáctico
        </h3>
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
        <div className={`rounded-2xl px-4 py-3 ${colors.bg}/10 border ${colors.border}`}>
          <p className={`font-label-sm text-label-sm uppercase tracking-widest mb-1 ${colors.text}`}>Frase do dia</p>
          <p className="font-body-sm italic text-on-surface">"{info.affirmation}"</p>
        </div>
      </div>

      {/* Attributes grid */}
      <div className="glass-panel rounded-3xl p-5">
        <h3 className="font-title-sm text-title-sm mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
          Atributos do Kin
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className={`rounded-2xl p-3 ${colors.bg}/8 border ${colors.border}`}>
            <p className="font-label-sm text-[10px] text-on-surface-variant/60 uppercase tracking-widest mb-0.5">Cor</p>
            <p className={`font-body-sm font-medium ${colors.text}`}>{colorLabel[info.seal.color]}</p>
          </div>
          <div className={`rounded-2xl p-3 ${colors.bg}/8 border ${colors.border}`}>
            <p className="font-label-sm text-[10px] text-on-surface-variant/60 uppercase tracking-widest mb-0.5">Família Terrestre</p>
            <p className="font-body-sm font-medium text-on-surface">{fam.name.replace("Família ", "")}</p>
          </div>
          <div className={`rounded-2xl p-3 ${colors.bg}/8 border ${colors.border}`}>
            <p className="font-label-sm text-[10px] text-on-surface-variant/60 uppercase tracking-widest mb-0.5">Ação · Essência</p>
            <p className="font-body-sm font-medium text-on-surface">{info.seal.action} · {info.seal.essence}</p>
          </div>
          <div className={`rounded-2xl p-3 ${colors.bg}/8 border ${colors.border}`}>
            <p className="font-label-sm text-[10px] text-on-surface-variant/60 uppercase tracking-widest mb-0.5">Tom · Poder</p>
            <p className="font-body-sm font-medium text-on-surface">{info.tone.name} · {info.tone.power}</p>
          </div>
        </div>

        {/* Plasma detail */}
        <div className="mt-3 rounded-2xl p-3 bg-surface-container-low border border-outline-variant/30">
          <p className="font-label-sm text-[10px] text-on-surface-variant/60 uppercase tracking-widest mb-1">Plasma radial do dia</p>
          <p className={`font-body-sm font-medium ${PLASMA_COLORS[plasmaIndex]}`}>{plasma.name} · {plasma.action}</p>
          <p className="font-body-sm text-on-surface-variant/70 text-xs mt-0.5">{plasma.mantra}</p>
        </div>
      </div>

      {/* Link to full kin detail */}
      <Link
        to="/ciclos/kin/$kin"
        params={{ kin: String(kin) }}
        className="block glass-panel rounded-3xl p-4 hover:border-primary transition-colors border border-transparent"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant/70">Leitura completa</p>
            <p className="font-body-md text-on-surface font-medium">Abrir KIN {kin} · {info.fullName}</p>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant">arrow_forward</span>
        </div>
      </Link>
    </div>
  );
}
