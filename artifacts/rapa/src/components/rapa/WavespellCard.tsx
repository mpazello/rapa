import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { getTodayKinInfo, getKinInfo, type SealColor } from "@/lib/tzolkin";
import { SEAL_IMAGE } from "@/lib/seal-images";

// ─── Cores dos tiles (replicando o estilo da imagem de referência) ────────────

const TILE_BG: Record<SealColor, string> = {
  vermelho: "#CC2222",
  branco:   "#E0E0E0",
  azul:     "#1A4FCC",
  amarelo:  "#D4A500",
};

const TILE_BORDER: Record<SealColor, string> = {
  vermelho: "#991111",
  branco:   "#AAAAAA",
  azul:     "#0F3399",
  amarelo:  "#A07800",
};

const TILE_SHADOW: Record<SealColor, string> = {
  vermelho: "rgba(200,0,0,0.5)",
  branco:   "rgba(150,150,150,0.4)",
  azul:     "rgba(0,50,200,0.5)",
  amarelo:  "rgba(180,130,0,0.5)",
};

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
function Tile({ kin, isToday, toneNumber }: { kin: number; isToday: boolean; toneNumber: number }) {
  const info = getKinInfo(kin);
  const bg = TILE_BG[info.seal.color];
  const border = TILE_BORDER[info.seal.color];
  const shadow = TILE_SHADOW[info.seal.color];
  const src = SEAL_IMAGE[info.seal.index];

  return (
    <Link
      to="/ciclos/kin/$kin"
      params={{ kin: String(kin) }}
      title={`Kin ${kin}: ${info.fullName}`}
      className="relative flex flex-col items-center justify-center rounded-xl overflow-hidden select-none transition-transform active:scale-95 hover:scale-105"
      style={{
        backgroundColor: bg,
        border: `2px solid ${border}`,
        boxShadow: isToday
          ? `0 0 0 3px #fff, 0 0 12px 4px ${shadow}, inset 0 1px 2px rgba(255,255,255,0.3), inset 0 -1px 2px rgba(0,0,0,0.3)`
          : `inset 0 1px 2px rgba(255,255,255,0.25), inset 0 -1px 2px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.4)`,
        aspectRatio: "1",
      }}
    >
      <img
        src={src}
        alt={info.seal.name}
        className="w-[68%] h-[68%] object-contain"
        style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.5))" }}
        loading="lazy"
      />
      {/* Número do tom (pequeno, no canto) */}
      <span
        className="absolute bottom-0.5 right-1 text-[9px] font-bold leading-none"
        style={{ color: info.seal.color === "branco" ? "#333" : "rgba(255,255,255,0.85)" }}
      >
        {toneNumber}
      </span>
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
