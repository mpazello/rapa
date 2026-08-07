import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { kinFromDate, getKinInfo, sincronarioDate, PLASMAS, getEarthFamily, analogKin, antipodeKin, guideKin, occultKin, SEALS } from "@/lib/tzolkin";
import { KinDisplay } from "@/components/KinDisplay";
import { PlasmaSymbol } from "@/components/PlasmaSymbol";

// ─── Dados fixos por Selo (Dreamspell) ──────────────────────────────────────

/** Planeta galáctico de cada selo (índice 1-20). */
const SEAL_PLANET: Record<number, string> = {
  1: "Netuno [GK]",  2: "Urano [GK]",   3: "Saturno [GK]",  4: "Júpiter [GK]",
  5: "Maldek [GK]",  6: "Marte [GK]",   7: "Terra [GK]",    8: "Vénus [GK]",
  9: "Mercúrio [GK]",10:"Mercúrio [SP]",11:"Vénus [SP]",    12:"Terra [SP]",
 13: "Marte [SP]",  14:"Maldek [SP]",  15:"Júpiter [SP]",  16:"Saturno [SP]",
 17: "Urano [SP]",  18:"Netuno [SP]",  19:"Plutão [SP]",   20:"Plutão [GK]",
};

/** Chakra + função por selo — segue ciclo (sealIndex-1)%5. */
const CHAKRA_CYCLE: [string, string][] = [
  ["Garganta", "Transmite"],
  ["Coração",  "Transduz"],
  ["Plexo Solar", "Recebe"],
  ["Raiz",     "Transmite"],
  ["Coroa",    "Recebe"],
];
function sealChakra(sealIndex: number): string {
  const [name, fn] = CHAKRA_CYCLE[(sealIndex - 1) % 5];
  return `${name} [${fn}]`;
}

/** Harmônica (1-65) e tipo por posição dentro da harmônica. */
function harmonicInfo(kin: number): { number: number; type: string } {
  const number = Math.ceil(kin / 4);
  const pos = ((kin - 1) % 4); // 0-3
  const types = ["Entrada Harmônica", "Processo Rítmico", "Saída Planetária", "Armazém"];
  const storeColors = ["Magnético", "Lunar", "Solar", "Cristal"];
  const type = pos < 3 ? types[pos] : `Armazém ${storeColors[(number - 1) % 4]}`;
  return { number, type };
}

/** Onda Encantada (trecena) — seal do portador e kin de início. */
function wavespellLabel(kin: number): { sealIndex: number; sealName: string; kinStart: number } {
  const info = getKinInfo(kin);
  return {
    sealIndex: info.trecena.seal.index,
    sealName:  info.trecena.seal.name,
    kinStart:  info.trecena.kinStart,
  };
}

/** Kin do Psi (crono-psi de 28 dias na lua). Âncora: Lua 1 Dia 1 do ano galáctico = KIN 1
 *  Formula: psiBanco = (diaNoAno) % 260, em que diaNoAno = (moon-1)*28+(day-1).
 *  Usa o mesmo contagem Dreamspell.
 */
function psiKin(moonNumber: number, dayInMoon: number): number {
  const offset = (moonNumber - 1) * 28 + (dayInMoon - 1);
  return ((offset % 260) + 260) % 260 + 1;
}

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
// Weekday abbreviations PT (indexed by getUTCDay(): 0=Dom, 1=Seg, ...)
const WEEKDAY_PT = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"] as const;
// Accent colours kept for text/border — SVGs already carry their own fill colours
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
  // All Dreamspell dates are stored as UTC midnight — always format in UTC
  // so that e.g. 2026-07-26T00:00Z shows as "26/07" even in UTC-3 (Brazil).
  return d.toLocaleDateString("pt-BR", { timeZone: "UTC", ...opts });
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

  // Selected day detail (dayInMoon 1-28, "dot" for Dia Fora do Tempo, or null for calendar view)
  const [selectedDay, setSelectedDay] = useState<number | "dot" | null>(null);
  // Animation direction for day-to-day navigation
  const [slideDir, setSlideDir] = useState<"left" | "right">("right");

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

  function prevDay() {
    setSlideDir("left");
    if (selectedDay === 1) {
      // cross into the last day of the previous moon
      if (viewMoon === 1) {
        setViewGalYear(y => y - 1);
        setViewMoon(13);
      } else {
        setViewMoon(m => m - 1);
      }
      setSelectedDay(28);
    } else if (typeof selectedDay === "number") {
      setSelectedDay(d => (d as number) - 1);
    }
  }
  function nextDay() {
    setSlideDir("right");
    if (selectedDay === 28) {
      // cross into the first day of the next moon
      if (viewMoon === 13) {
        setViewGalYear(y => y + 1);
        setViewMoon(1);
      } else {
        setViewMoon(m => m + 1);
      }
      setSelectedDay(1);
    } else if (typeof selectedDay === "number") {
      setSelectedDay(d => (d as number) + 1);
    }
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
      ) : selectedDay === "dot" ? (
        <DayOutOfTimeDetail
          galYear={viewGalYear}
          todayUTC={todayUTC}
          onBack={() => setSelectedDay(null)}
        />
      ) : (
        <DayDetail
          key={`${viewGalYear}-${viewMoon}-${selectedDay}`}
          galYear={viewGalYear}
          moonNumber={viewMoon}
          moon={moon}
          dayInMoon={selectedDay}
          date={dates[selectedDay - 1]}
          todayUTC={todayUTC}
          todayKin={todayKin}
          slideDir={slideDir}
          onBack={() => setSelectedDay(null)}
          onPrevDay={prevDay}
          onNextDay={nextDay}
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
  onSelectDay: (d: number | "dot") => void;
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
        {/* Plasma + weekday header
            All 13 moons are exactly 28 days = 4 × 7, so the plasma→weekday
            mapping is the same for every week of every moon in a given year.
            We only need the weekday of Day 1 of this moon. */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {PLASMAS.map((p, i) => {
            const weekdayIdx = (dates[0].getUTCDay() + i) % 7;
            return (
              <div key={p.name} className="flex flex-col items-center py-1.5 gap-0.5">
                <PlasmaSymbol index={i + 1} size={22} />
                <span className={`font-label-sm text-[9px] tracking-wider uppercase ${PLASMA_COLORS[i]}`}>
                  {PLASMA_DISPLAY[i]}
                </span>
                <span className="font-label-sm text-[8px] text-on-surface-variant/50 tracking-wide">
                  {WEEKDAY_PT[weekdayIdx]}
                </span>
              </div>
            );
          })}
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
                      {/* Kin seal + glifo do tom (KinDisplay padrão) */}
                      <KinDisplay kin={kin} size="xs" layout="badge" className="mb-0.5" />
                      {/* Kin number */}
                      <span className={`text-[8px] font-medium leading-none ${colorCls.text}`}>
                        {kin}{isPortal ? " ✦" : ""}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dia Fora do Tempo card — only on Lua 13 */}
      {moonNumber === 13 && (() => {
        const dotDate = new Date(Date.UTC(galYear + 1, 6, 25));
        const dotKin = kinFromDate(dotDate);
        const dotInfo = getKinInfo(dotKin);
        const dotColors = COLOR_CLASS[dotInfo.seal.color];
        const isToday = dotDate.getTime() === todayUTC.getTime();
        return (
          <button
            type="button"
            onClick={() => onSelectDay("dot")}
            className={`w-full glass-panel rounded-2xl p-4 flex items-center gap-4 border transition-all active:scale-[0.98] hover:border-primary/40 ${
              isToday
                ? "border-primary/60 shadow-[0_0_16px_rgba(99,102,241,0.25)]"
                : "border-outline-variant/30"
            }`}
          >
            {/* Star icon */}
            <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-400/20 border border-yellow-400/40 flex items-center justify-center">
              <span className="material-symbols-outlined text-yellow-300 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            {/* Text */}
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <span className="font-label-sm text-[9px] tracking-widest uppercase text-yellow-300">Dia Fora do Tempo</span>
                {isToday && <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[9px] font-label-sm">hoje</span>}
              </div>
              <p className="font-body-md text-on-surface font-medium text-sm">25 de julho · dia 29</p>
              <p className="font-body-sm text-on-surface-variant/60 text-xs">
                KIN {dotKin} · {dotInfo.fullName}
              </p>
            </div>
            {/* Seal */}
            <div className={`shrink-0 w-9 h-9 rounded-full border ${dotColors.border} flex items-center justify-center p-1.5 bg-surface/40`}>
              <img src={SEAL_IMAGE[dotInfo.seal.index]} alt={dotInfo.seal.name} className="w-full h-full object-contain" />
            </div>
            <span className="material-symbols-outlined text-on-surface-variant/50 shrink-0">chevron_right</span>
          </button>
        );
      })()}

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

/** Mini kin card used in the oracle section. */
function OracleKinCard({ kin, role, roleColor }: { kin: number; role: string; roleColor: string }) {
  const info = getKinInfo(kin);
  const colors = COLOR_CLASS[info.seal.color];
  const isPortal = PORTAL_KINS.has(kin);
  return (
    <Link
      to="/ciclos/kin/$kin"
      params={{ kin: String(kin) }}
      className={`flex flex-col items-center gap-1 p-2.5 rounded-2xl border ${colors.border}/40 bg-surface/40 hover:bg-surface-container-low transition-colors`}
    >
      <span className={`font-label-sm text-[9px] tracking-widest uppercase ${roleColor}`}>{role}</span>
      <div className={`w-9 h-9 rounded-full border ${colors.border} flex items-center justify-center p-1 bg-surface/60`}>
        <img src={SEAL_IMAGE[info.seal.index]} alt={info.seal.name} className="w-full h-full object-contain" />
      </div>
      <span className={`font-label-sm text-[10px] font-bold ${colors.text}`}>
        {kin}{isPortal ? " PV" : ""}
      </span>
      <span className="font-body-sm text-[9px] text-on-surface-variant/70 text-center leading-tight line-clamp-2">
        {info.seal.name} {info.tone.name}
      </span>
    </Link>
  );
}

function DayDetail({
  galYear, moonNumber, moon, dayInMoon, date, todayUTC, todayKin, slideDir, onBack, onPrevDay, onNextDay,
}: {
  galYear: number;
  moonNumber: number;
  moon: (typeof MOONS)[number];
  dayInMoon: number;
  date: Date;
  todayUTC: Date;
  todayKin: number;
  slideDir: "left" | "right";
  onBack: () => void;
  onPrevDay: () => void;
  onNextDay: () => void;
}) {
  const kin = useMemo(() => kinFromDate(date), [date]);
  const info = useMemo(() => getKinInfo(kin), [kin]);
  const colors = COLOR_CLASS[info.seal.color];
  const fam = useMemo(() => getEarthFamily(info.seal.index), [info.seal.index]);

  const plasmaIndex = (dayInMoon - 1) % 7; // 0-6
  const plasma = PLASMAS[plasmaIndex];

  const weekNumber = Math.floor((dayInMoon - 1) / 7) + 1;
  const heptalColor = HEPTAL_COLORS[weekNumber - 1];

  const isToday = date.getTime() === todayUTC.getTime();
  const isPortal = PORTAL_KINS.has(kin);

  // Computed data
  const harmonic = useMemo(() => harmonicInfo(kin), [kin]);
  const wavespell = useMemo(() => wavespellLabel(kin), [kin]);
  const psi = useMemo(() => psiKin(moonNumber, dayInMoon), [moonNumber, dayInMoon]);
  const psiInfo = useMemo(() => getKinInfo(psi), [psi]);

  // Oracle kins
  const oGuide    = useMemo(() => guideKin(kin),    [kin]);
  const oAnalog   = useMemo(() => analogKin(kin),   [kin]);
  const oAntipode = useMemo(() => antipodeKin(kin), [kin]);
  const oOccult   = useMemo(() => occultKin(kin),   [kin]);

  const colorLabel: Record<string, string> = {
    vermelho: "Vermelho [Inicia]",
    branco:   "Branco [Refina]",
    azul:     "Azul [Transforma]",
    amarelo:  "Amarelo [Amadurece]",
  };

  const weekdayDate = formatDate(date, { weekday: "long" });
  const shortDate   = formatDate(date, { day: "numeric", month: "numeric" });
  const longDate    = formatDate(date, { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className={`space-y-3 ${slideDir === "right" ? "animate-slide-in-right" : "animate-slide-in-left"}`}>
      {/* ── Back bar ── */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors shrink-0"
          aria-label="Voltar ao calendário"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          <span className="font-label-sm text-label-sm">Calendário</span>
        </button>

        {/* Day badge */}
        <div className={`flex-1 flex justify-center`}>
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-label-sm tracking-widest uppercase ${heptalColor}`}>
            Lua {moonNumber} · Dia {dayInMoon}
          </div>
        </div>

        {/* Prev / Next day buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={onPrevDay}
            className="w-8 h-8 rounded-full border border-outline-variant/40 flex items-center justify-center hover:bg-surface-container-low hover:text-primary transition-colors"
            aria-label="Dia anterior"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <button
            type="button"
            onClick={onNextDay}
            className="w-8 h-8 rounded-full border border-outline-variant/40 flex items-center justify-center hover:bg-surface-container-low hover:text-primary transition-colors"
            aria-label="Próximo dia"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* ── Date + Plasma header (like almanaque top strip) ── */}
      <div className="glass-panel rounded-3xl overflow-hidden">
        {/* Plasma strip */}
        <div className={`flex items-center justify-between px-5 py-3 border-b border-white/8 bg-surface-container-low`}>
          <div className="flex items-center gap-3">
            <PlasmaSymbol index={plasmaIndex + 1} size={42} />
            <div>
              <p className={`font-label-sm text-label-sm uppercase tracking-[0.15em] font-bold ${PLASMA_COLORS[plasmaIndex]}`}>
                {PLASMA_DISPLAY[plasmaIndex]}
              </p>
              <p className="text-[10px] text-on-surface-variant/60 uppercase tracking-wider">{plasma.action} · {plasma.chakra}</p>
              <p className="text-[9px] text-on-surface-variant/40 font-mono mt-0.5">{plasma.mantraSolar}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`font-headline-sm text-2xl font-bold ${isToday ? "text-primary" : "text-on-surface"}`}>
              {shortDate}
            </p>
            <p className="font-label-sm text-[10px] text-on-surface-variant/60 uppercase tracking-wider capitalize">{weekdayDate}</p>
            {isPortal && (
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-error/20 text-error text-[9px] font-label-sm tracking-wide uppercase">Portal PV</span>
            )}
          </div>
        </div>

        {/* Heptal week strip */}
        <div className={`flex items-center justify-between px-5 py-2 text-[10px] font-label-sm tracking-widest uppercase ${heptalColor.split(" ")[0]}`}>
          <span>{HEPTAL_NAMES[weekNumber - 1]}</span>
          <span className="opacity-70">{HEPTAL_SUBTITLES[weekNumber - 1]}</span>
        </div>
      </div>

      {/* ── KIN identity + mantra (main almanaque card) ── */}
      <div className={`relative glass-panel rounded-3xl overflow-hidden border-l-4 ${colors.border}`}>
        <div className={`absolute inset-0 ${colors.bg}/4 pointer-events-none`} />

        {/* KIN header */}
        <div className="relative flex items-start gap-4 p-5 pb-3">
          <div className={`shrink-0 w-16 h-16 rounded-full border-2 ${colors.border} flex items-center justify-center bg-surface/40 p-2`}>
            <div className={`absolute w-16 h-16 rounded-full ${colors.bg} blur-2xl opacity-15`} />
            <img src={SEAL_IMAGE[info.seal.index]} alt={info.seal.name} className="w-full h-full object-contain relative" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <span className={`font-label-sm text-label-sm ${colors.text} tracking-widest uppercase font-bold`}>KIN {kin}</span>
              {isToday && <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[9px] font-label-sm">hoje</span>}
            </div>
            <h2 className="font-headline-md text-on-surface leading-tight mb-0.5">{info.fullName}</h2>
            <p className="font-body-sm text-on-surface-variant/60 italic text-xs">{info.seal.maya} · {info.tone.maya}</p>
          </div>
          {/* Onda Encantada badge top-right */}
          <div className={`shrink-0 flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl border ${colors.border}/50 bg-surface/30`}>
            <p className="font-label-sm text-[8px] text-on-surface-variant/60 uppercase tracking-wider">Onda</p>
            <p className={`font-headline-sm text-lg font-bold ${colors.text} leading-none`}>{info.tone.index}</p>
            <p className="font-label-sm text-[8px] text-on-surface-variant/60 text-center leading-tight">{info.tone.name}</p>
          </div>
        </div>

        {/* Mantra */}
        <div className={`mx-5 mb-3 border-l-2 pl-4 space-y-0.5 ${colors.border}`}>
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

        {/* Affirmation */}
        <div className={`mx-5 mb-5 rounded-xl px-4 py-2.5 ${colors.bg}/10 border ${colors.border}/50`}>
          <p className={`font-label-sm text-[9px] uppercase tracking-widest mb-0.5 ${colors.text}`}>Afirmação</p>
          <p className="font-body-sm italic text-on-surface text-sm">"{info.affirmation}"</p>
        </div>
      </div>

      {/* ── Atributos grid (like almanaque info boxes) ── */}
      <div className="glass-panel rounded-3xl p-4">
        <p className="font-label-sm text-[10px] text-on-surface-variant/50 uppercase tracking-widest mb-3">Assinatura Galáctica</p>
        <div className="grid grid-cols-2 gap-2">
          {/* Cor */}
          <div className={`rounded-2xl p-3 ${colors.bg}/8 border ${colors.border}/50`}>
            <p className="font-label-sm text-[9px] text-on-surface-variant/55 uppercase tracking-widest mb-0.5">Cor</p>
            <p className={`font-body-sm font-semibold ${colors.text} text-sm`}>{colorLabel[info.seal.color]}</p>
          </div>
          {/* Planeta */}
          <div className={`rounded-2xl p-3 ${colors.bg}/8 border ${colors.border}/50`}>
            <p className="font-label-sm text-[9px] text-on-surface-variant/55 uppercase tracking-widest mb-0.5">Planeta</p>
            <p className="font-body-sm font-semibold text-on-surface text-sm">{SEAL_PLANET[info.seal.index]}</p>
          </div>
          {/* Chakra */}
          <div className={`rounded-2xl p-3 ${colors.bg}/8 border ${colors.border}/50`}>
            <p className="font-label-sm text-[9px] text-on-surface-variant/55 uppercase tracking-widest mb-0.5">Chakra</p>
            <p className="font-body-sm font-semibold text-on-surface text-sm">{sealChakra(info.seal.index)}</p>
          </div>
          {/* Família */}
          <div className={`rounded-2xl p-3 ${colors.bg}/8 border ${colors.border}/50`}>
            <p className="font-label-sm text-[9px] text-on-surface-variant/55 uppercase tracking-widest mb-0.5">Família Terrestre</p>
            <p className="font-body-sm font-semibold text-on-surface text-sm">{fam.name.replace("Família ", "")}</p>
          </div>
          {/* Harmônica */}
          <div className={`rounded-2xl p-3 col-span-2 bg-surface-container-low border border-outline-variant/30`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-label-sm text-[9px] text-on-surface-variant/55 uppercase tracking-widest mb-0.5">Harmônica</p>
                <p className="font-body-sm font-semibold text-on-surface text-sm">{harmonic.number} · {harmonic.type}</p>
              </div>
              <div className="text-right">
                <p className="font-label-sm text-[9px] text-on-surface-variant/55 uppercase tracking-widest mb-0.5">Ação · Essência</p>
                <p className="font-body-sm text-on-surface text-xs">{info.seal.action} · {info.seal.essence}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Onda Encantada (wavespell/trecena) ── */}
      <div className="glass-panel rounded-3xl p-4">
        <p className="font-label-sm text-[10px] text-on-surface-variant/50 uppercase tracking-widest mb-3">Onda Encantada {info.tone.index}</p>
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 shrink-0 rounded-full border ${COLOR_CLASS[SEALS[wavespell.sealIndex - 1].color].border} flex items-center justify-center p-1.5 bg-surface/40`}>
            <img src={SEAL_IMAGE[wavespell.sealIndex]} alt={wavespell.sealName} className="w-full h-full object-contain" />
          </div>
          <div>
            <p className={`font-label-sm text-[10px] uppercase tracking-widest ${COLOR_CLASS[SEALS[wavespell.sealIndex - 1].color].text}`}>
              portador
            </p>
            <p className="font-body-md text-on-surface font-medium">{wavespell.sealName}</p>
            <p className="font-body-sm text-on-surface-variant/60 text-xs">Kin {wavespell.kinStart} → {wavespell.kinStart + 12}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="font-label-sm text-[9px] text-on-surface-variant/50 uppercase tracking-widest">Dia {info.tone.index} de 13</p>
            <div className="flex gap-0.5 mt-1 justify-end">
              {Array.from({ length: 13 }, (_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${i < info.tone.index ? colors.bg.replace("bg-", "bg-") + " opacity-80" : "bg-on-surface/15"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Oráculo dos 5 Kins ── */}
      <div className="glass-panel rounded-3xl p-4">
        <p className="font-label-sm text-[10px] text-on-surface-variant/50 uppercase tracking-widest mb-3">Oráculo · Família de 5</p>
        <div className="grid grid-cols-5 gap-1.5">
          {/* Self */}
          <div className={`flex flex-col items-center gap-1 p-2 rounded-2xl border-2 ${colors.border} ${colors.bg}/10`}>
            <span className={`font-label-sm text-[8px] tracking-widest uppercase ${colors.text}`}>Eu</span>
            <div className={`w-9 h-9 rounded-full border-2 ${colors.border} flex items-center justify-center p-1 bg-surface/60`}>
              <img src={SEAL_IMAGE[info.seal.index]} alt={info.seal.name} className="w-full h-full object-contain" />
            </div>
            <span className={`font-label-sm text-[10px] font-bold ${colors.text}`}>{kin}</span>
            <span className="font-body-sm text-[8px] text-on-surface-variant/70 text-center leading-tight">{info.seal.name}</span>
          </div>
          <OracleKinCard kin={oGuide}    role="Guia"      roleColor="text-tertiary" />
          <OracleKinCard kin={oAnalog}   role="Analógico" roleColor="text-primary" />
          <OracleKinCard kin={oAntipode} role="Antípoda"  roleColor="text-error" />
          <OracleKinCard kin={oOccult}   role="Oculto"    roleColor="text-on-surface-variant" />
        </div>
      </div>

      {/* ── Plasma radial detalhado ── */}
      <div className="glass-panel rounded-3xl p-4">
        <p className="font-label-sm text-[10px] text-on-surface-variant/50 uppercase tracking-widest mb-3">Plasma Radial</p>
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center gap-1 shrink-0">
            <PlasmaSymbol index={plasmaIndex + 1} size={48} />
            <span className={`font-label-sm text-[9px] font-mono tracking-wider ${PLASMA_COLORS[plasmaIndex]}`}>
              {plasma.mantraSolar}
            </span>
          </div>
          <div className="flex-1">
            <p className={`font-label-sm text-label-sm uppercase tracking-widest font-bold ${PLASMA_COLORS[plasmaIndex]} mb-0.5`}>
              {PLASMA_DISPLAY[plasmaIndex]} · {plasma.action}
            </p>
            <p className="font-body-sm text-on-surface-variant/70 text-xs mb-2">{plasma.chakra} · {plasma.element}</p>
            <p className={`font-body-sm italic text-on-surface text-sm border-l-2 pl-3 ${PLASMA_COLORS[plasmaIndex].replace("text-", "border-")}`}>
              "{plasma.mantra}"
            </p>
            {plasma.center && (
              <p className="font-body-sm text-on-surface-variant/55 text-xs mt-2 leading-relaxed">{plasma.center}</p>
            )}
          </div>
        </div>
      </div>

      {/* ── PSI Kin do dia ── */}
      <div className="glass-panel rounded-3xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full border ${COLOR_CLASS[psiInfo.seal.color].border} flex items-center justify-center p-1.5 bg-surface/40`}>
              <img src={SEAL_IMAGE[psiInfo.seal.index]} alt={psiInfo.seal.name} className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="font-label-sm text-[9px] text-on-surface-variant/50 uppercase tracking-widest">KIN PSI do dia</p>
              <p className={`font-body-sm font-semibold ${COLOR_CLASS[psiInfo.seal.color].text}`}>KIN {psi} · {psiInfo.fullName}</p>
            </div>
          </div>
          <Link
            to="/ciclos/kin/$kin"
            params={{ kin: String(psi) }}
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Link>
        </div>
      </div>

      {/* ── Lua info + pergunta ── */}
      <div className="glass-panel rounded-3xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-base text-astral-violet" style={{ fontVariationSettings: "'FILL' 1" }}>dark_mode</span>
          <p className="font-label-sm text-[10px] text-on-surface-variant/50 uppercase tracking-widest">Lua {moonNumber} · {moon.tone} do {moon.animal}</p>
        </div>
        <p className="font-body-sm text-on-surface-variant/70 italic text-sm mb-1">"{moon.question}"</p>
        <p className="font-body-sm text-on-surface-variant/50 text-xs">Essência: {moon.essence} · Qualidade: {moon.quality}</p>
      </div>

      {/* ── Link to full kin detail ── */}
      <Link
        to="/ciclos/kin/$kin"
        params={{ kin: String(kin) }}
        className="block glass-panel rounded-3xl p-4 hover:border-primary transition-colors border border-transparent"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant/70">Leitura completa</p>
            <p className="font-body-md text-on-surface font-medium">KIN {kin} · {info.fullName}</p>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant">arrow_forward</span>
        </div>
      </Link>
    </div>
  );
}

function DayOutOfTimeDetail({
  galYear,
  todayUTC,
  onBack,
}: {
  galYear: number;
  todayUTC: Date;
  onBack: () => void;
}) {
  // Dia Fora do Tempo = July 25 of the Gregorian year after galactic year starts
  const dotDate = useMemo(() => new Date(Date.UTC(galYear + 1, 6, 25)), [galYear]);
  const kin = useMemo(() => kinFromDate(dotDate), [dotDate]);
  const info = useMemo(() => getKinInfo(kin), [kin]);
  const colors = COLOR_CLASS[info.seal.color];
  const isToday = dotDate.getTime() === todayUTC.getTime();
  const isPortal = PORTAL_KINS.has(kin);
  const longDate = formatDate(dotDate, { day: "numeric", month: "long", year: "numeric" });
  const weekdayDate = formatDate(dotDate, { weekday: "long" });

  return (
    <div className="space-y-3">
      {/* ── Back bar ── */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span className="font-label-sm text-label-sm">Calendário</span>
        </button>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-yellow-400/40 text-yellow-300 text-[10px] font-label-sm tracking-widest uppercase">
          Lua 13 · Dia 29
        </div>
      </div>

      {/* ── Header ── */}
      <div className="glass-panel rounded-3xl overflow-hidden">
        {/* Gold banner */}
        <div className="flex items-center gap-4 px-5 py-4 bg-gradient-to-r from-yellow-400/10 to-orange-400/5 border-b border-yellow-400/20">
          <div className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-400/20 border border-yellow-400/50 flex items-center justify-center">
            <span className="material-symbols-outlined text-yellow-300 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <span className="font-label-sm text-[9px] tracking-widest uppercase text-yellow-300">Dia Fora do Tempo</span>
              {isToday && <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[9px] font-label-sm">hoje</span>}
            </div>
            <h1 className="font-serif text-xl text-on-surface leading-tight">25 de julho</h1>
            <p className="font-body-sm text-on-surface-variant/60 text-xs capitalize">{weekdayDate} · {longDate}</p>
          </div>
          {isPortal && (
            <span className="shrink-0 px-2 py-0.5 rounded-full bg-error/20 text-error text-[9px] font-label-sm tracking-wide uppercase">Portal PV</span>
          )}
        </div>

        {/* Explanation text */}
        <div className="px-5 py-4 space-y-2">
          <p className="font-body-md text-on-surface text-sm leading-relaxed">
            O Dia Fora do Tempo não pertence a nenhuma das 13 Luas. É o 365º dia do calendário das 13 Luas — um dia sagrado de celebração, arte, perdão e renovação espiritual.
          </p>
          <p className="font-body-sm text-on-surface-variant/70 text-xs leading-relaxed">
            Neste dia, o tempo linear é suspenso. É dedicado à paz, à expressão criativa e à preparação para o novo Ano Galáctico que começa em 26 de julho.
          </p>
        </div>
      </div>

      {/* ── KIN do dia ── */}
      <div className={`relative glass-panel rounded-3xl overflow-hidden border-l-4 ${colors.border}`}>
        <div className={`absolute inset-0 ${colors.bg}/4 pointer-events-none`} />

        <div className="relative flex items-start gap-4 p-5 pb-3">
          <div className={`shrink-0 w-16 h-16 rounded-full border-2 ${colors.border} flex items-center justify-center bg-surface/40 p-2`}>
            <div className={`absolute w-16 h-16 rounded-full ${colors.bg} blur-2xl opacity-15`} />
            <img src={SEAL_IMAGE[info.seal.index]} alt={info.seal.name} className="w-full h-full object-contain relative" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <span className={`font-label-sm text-label-sm ${colors.text} tracking-widest uppercase font-bold`}>KIN {kin}</span>
              {isToday && <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[9px] font-label-sm">hoje</span>}
            </div>
            <h2 className="font-headline-md text-on-surface leading-tight mb-0.5">{info.fullName}</h2>
            <p className="font-body-sm text-on-surface-variant/60 italic text-xs">{info.seal.maya} · {info.tone.maya}</p>
          </div>
          <div className={`shrink-0 flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl border ${colors.border}/50 bg-surface/30`}>
            <p className="font-label-sm text-[8px] text-on-surface-variant/60 uppercase tracking-wider">Tom</p>
            <p className={`font-headline-sm text-lg font-bold ${colors.text} leading-none`}>{info.tone.index}</p>
            <p className="font-label-sm text-[8px] text-on-surface-variant/60 text-center leading-tight">{info.tone.name}</p>
          </div>
        </div>

        {/* Mantra */}
        <div className={`mx-5 mb-3 border-l-2 pl-4 space-y-0.5 ${colors.border}`}>
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

        {/* Affirmation */}
        <div className={`mx-5 mb-5 rounded-xl px-4 py-2.5 ${colors.bg}/10 border ${colors.border}/50`}>
          <p className={`font-label-sm text-[9px] uppercase tracking-widest mb-0.5 ${colors.text}`}>Afirmação</p>
          <p className="font-body-sm italic text-on-surface text-sm">"{info.affirmation}"</p>
        </div>
      </div>

      {/* ── Ano Galáctico note ── */}
      <div className="glass-panel rounded-3xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-base text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>sunny</span>
          <p className="font-label-sm text-[10px] text-on-surface-variant/50 uppercase tracking-widest">Próximo Ano Galáctico</p>
        </div>
        <p className="font-body-md text-on-surface font-medium text-sm">
          26 de julho de {galYear + 1}
        </p>
        <p className="font-body-sm text-on-surface-variant/60 text-xs mt-0.5">
          Lua 1 · Dia 1 · início do Ano Galáctico {galYear + 1}–{galYear + 2}
        </p>
      </div>

      {/* ── Link to full kin detail ── */}
      <Link
        to="/ciclos/kin/$kin"
        params={{ kin: String(kin) }}
        className="block glass-panel rounded-3xl p-4 hover:border-primary transition-colors border border-transparent"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant/70">Leitura completa do KIN</p>
            <p className="font-body-md text-on-surface font-medium">KIN {kin} · {info.fullName}</p>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant">arrow_forward</span>
        </div>
      </Link>
    </div>
  );
}
