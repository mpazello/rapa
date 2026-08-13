import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { getTodayKinInfo, getKinInfo } from "@/lib/tzolkin";
import { KinBadge } from "@/components/KinBadge";

// ─── Layout em L: (row, col) para cada um dos 13 KINs da onda ────────────────
// Grade 5 linhas × 6 colunas:
//   Coluna esquerda  : rows 0-4, col 0  → KINs 1-5
//   Linha inferior   : row 4,  cols 1-5 → KINs 6-10
//   Coluna direita   : rows 2-0, col 5  → KINs 11-13
const POSITIONS: [number, number][] = [
  [0, 0], [1, 0], [2, 0], [3, 0], [4, 0],   // KINs 1–5  (coluna esquerda)
  [4, 1], [4, 2], [4, 3], [4, 4], [4, 5],   // KINs 6–10 (linha inferior)
  [2, 5], [1, 5], [0, 5],                    // KINs 11–13 (coluna direita, subindo)
];

// ─── Tile individual ──────────────────────────────────────────────────────────
function Tile({ kin, isToday }: { kin: number; isToday: boolean; toneNumber: number }) {
  return (
    <Link
      to="/ciclos/kin/$kin"
      params={{ kin: String(kin) }}
      className="block w-full aspect-square transition-transform active:scale-95 hover:scale-105"
    >
      <KinBadge kin={kin} isToday={isToday} className="w-full h-full" />
    </Link>
  );
}

// ─── Card principal da Onda Encantada ─────────────────────────────────────────
export function WavespellCard() {
  const [data, setData] = useState<{
    todayKin: number;
    wavespellKins: number[];
    wavespellName: string;
    kinStart: number;
  } | null>(null);

  useEffect(() => {
    const info = getTodayKinInfo();
    const { kinStart } = info.trecena;
    const wavespellKins = Array.from({ length: 13 }, (_, i) => ((kinStart - 1 + i) % 260) + 1);
    setData({
      todayKin: info.kin,
      wavespellKins,
      wavespellName: info.trecena.seal.name,
      kinStart,
    });
  }, []);

  if (!data) {
    // placeholder sem hydration mismatch
    return (
      <div className="glass-card rounded-3xl p-5 space-y-3">
        <div className="h-4 w-40 bg-white/10 rounded animate-pulse" />
        <div className="h-48 bg-white/5 rounded-2xl animate-pulse" />
      </div>
    );
  }

  const { todayKin, wavespellKins, wavespellName, kinStart } = data;

  // Monta a grade 5×6 (row 0-4, col 0-5)
  const grid: (number | null)[][] = Array.from({ length: 5 }, () => Array(6).fill(null));
  POSITIONS.forEach(([row, col], idx) => {
    grid[row][col] = wavespellKins[idx];
  });

  return (
    <div className="glass-card rounded-3xl p-5 space-y-4">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-label-sm text-label-sm text-muted-stardust uppercase tracking-widest text-xs">
            Onda Encantada
          </p>
          <h3 className="font-serif text-lg text-ethereal-white">
            {wavespellName}
          </h3>
          <p className="text-xs text-muted-stardust/70 mt-0.5">
            Kin {kinStart} → {((kinStart - 1 + 12) % 260) + 1}
          </p>
        </div>
        <Link
          to="/onda-encantada"
          className="text-xs text-astral-violet hover:underline"
        >
          Ver tudo →
        </Link>
      </div>

      {/* Grade de tiles em L */}
      <div
        className="grid gap-1.5"
        style={{
          gridTemplateColumns: "repeat(6, 1fr)",
          gridTemplateRows: "repeat(5, 1fr)",
        }}
      >
        {grid.flatMap((row, rIdx) =>
          row.map((kin, cIdx) => {
            if (kin === null) {
              return <div key={`${rIdx}-${cIdx}`} />;
            }
            const toneNumber = wavespellKins.indexOf(kin) + 1;
            return (
              <Tile
                key={kin}
                kin={kin}
                isToday={kin === todayKin}
                toneNumber={toneNumber}
              />
            );
          })
        )}
      </div>

      {/* Kin de hoje dentro da onda */}
      {wavespellKins.includes(todayKin) && (
        <p className="text-xs text-muted-stardust/70 text-center">
          Você está no tom{" "}
          <span className="text-astral-violet font-semibold">
            {wavespellKins.indexOf(todayKin) + 1}
          </span>{" "}
          da onda · Kin {todayKin}
        </p>
      )}
    </div>
  );
}
