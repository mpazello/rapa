import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  getTodayKinInfo,
  getKinInfo,
  dateFromKin,
  TONES,
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

const COLOR_TEXT: Record<SealColor, string> = {
  vermelho: "text-error",
  branco:   "text-on-surface",
  azul:     "text-primary",
  amarelo:  "text-tertiary",
};

// ─── Layout em L (row, col) para os 13 Kins ──────────────────────────────────
// Grade 5 × 6:
//   Coluna esquerda: rows 0-4, col 0  → Kins 1-5
//   Linha inferior : row 4, cols 1-5  → Kins 6-10
//   Coluna direita : rows 2-0, col 5  → Kins 11-13
const POSITIONS: [number, number][] = [
  [0,0],[1,0],[2,0],[3,0],[4,0],
  [4,1],[4,2],[4,3],[4,4],[4,5],
  [3,5],[2,5],[1,5],
];

// ─── Formatação de datas ──────────────────────────────────────────────────────

const WEEKDAYS_PT = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
const MONTHS_PT   = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

/** Formata uma data UTC como "qui, 14/08". Se isToday=true, prefixa com "Hoje · ". */
function formatKinDate(date: Date, isToday: boolean): string {
  const wd  = WEEKDAYS_PT[date.getUTCDay()];
  const dd  = String(date.getUTCDate()).padStart(2, "0");
  const mm  = String(date.getUTCMonth() + 1).padStart(2, "0");
  const formatted = `${wd}, ${dd}/${mm}`;
  return isToday ? `Hoje · ${formatted}` : formatted;
}

/** Formata o intervalo de datas da onda: "13–25 de ago." ou "28 de jul – 9 de ago." */
function formatDateRange(start: Date, end: Date): string {
  const sd = start.getUTCDate();
  const ed = end.getUTCDate();
  const sm = MONTHS_PT[start.getUTCMonth()];
  const em = MONTHS_PT[end.getUTCMonth()];
  if (sm === em) return `${sd}–${ed} de ${sm}.`;
  return `${sd} de ${sm}. – ${ed} de ${em}.`;
}

/**
 * Avança 1 dia Dreamspell a partir de uma data UTC, pulando 29/fev.
 * Usado para calcular datas dos 13 Kins consecutivos da onda.
 */
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
}: {
  kin: number;
  toneNumber: number;
  isToday: boolean;
  date: Date;
}) {
  const info = getKinInfo(kin);
  const colorText = COLOR_TEXT[info.seal.color];
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");

  return (
    <Link
      to="/ciclos/kin/$kin"
      params={{ kin: String(kin) }}
      className={`flex flex-col items-center rounded-xl p-1 transition-all active:scale-95 border ${
        isToday
          ? "border-primary bg-primary/15 shadow-[0_0_12px_rgba(99,102,241,0.3)]"
          : "border-transparent hover:border-white/20 hover:bg-white/5"
      }`}
    >
      {/* Tom · data · kin — mesma linha */}
      <div className="flex items-center gap-[3px] mb-1 leading-none flex-wrap justify-center">
        <span className={`text-[9px] font-bold ${isToday ? "text-primary" : "text-on-surface"}`}>
          {toneNumber}
        </span>
        <span className="text-[8px] text-on-surface-variant/30">·</span>
        <span className="text-[8px] text-on-surface-variant/50">
          {dd}/{mm}
        </span>
        <span className="text-[8px] text-on-surface-variant/30">·</span>
        <span className={`text-[8px] font-semibold ${colorText}`}>
          {kin}
        </span>
      </div>
      <KinBadge kin={kin} isToday={isToday} size={52} />
    </Link>
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

  useEffect(() => {
    const info = getTodayKinInfo();
    const { kinStart, seal } = info.trecena;
    const kins = Array.from({ length: 13 }, (_, i) => ((kinStart - 1 + i) % 260) + 1);

    // Calcular as 13 datas gregorianas consecutivas (pulando 29/fev)
    const dates: Date[] = [];
    let current = dateFromKin(kinStart);
    for (let i = 0; i < 13; i++) {
      dates.push(current);
      current = nextDreamspellDay(current);
    }

    setData({
      todayKin: info.kin,
      kins,
      dates,
      sealName: seal.name,
      sealColor: seal.color,
      kinStart,
      kinEnd: kins[12],
    });
  }, []);

  // ─── Grade ────────────────────────────────────────────────────────────────
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
            <h1 className={`font-serif text-3xl ${COLOR_TEXT[data.sealColor]}`}>
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
            const tone    = TONES[i]; // tons 1-13
            const isToday = kin === data.todayKin;
            const kinDate = data.dates[i];
            return (
              <Link
                key={kin}
                to="/ciclos/kin/$kin"
                params={{ kin: String(kin) }}
                className={`flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors ${isToday ? "bg-astral-violet/10" : ""}`}
              >
                {/* Tile pequeno */}
                <span className="w-9 h-9 shrink-0">
                  <KinBadge kin={kin} isToday={isToday} className="w-full h-full" />
                </span>

                {/* Texto */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isToday ? "text-astral-violet" : "text-on-surface"}`}>
                    {info.fullName}
                  </p>
                  <p className="text-xs text-muted-stardust/60">
                    Kin {kin} · Tom {tone?.name ?? i + 1}
                  </p>
                </div>

                {/* Data gregoriana / Hoje */}
                <span className={`text-xs shrink-0 ${isToday ? "bg-astral-violet/20 text-astral-violet px-2 py-0.5 rounded-full font-medium" : "text-muted-stardust/50"}`}>
                  {formatKinDate(kinDate, isToday)}
                </span>
              </Link>
            );
          })}
        </section>
      )}
    </main>
  );
}
