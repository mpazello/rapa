/**
 * KinBadge — único bloco visual unificado do Kin maia (Tom + Selo).
 *
 * Tom e Selo são exibidos dentro de um único container retangular com fundo
 * colorido (família cromática do Selo):
 *   · Faixa superior (~28% da altura): glifo maia do Tom
 *   · Corpo principal (~72% da altura): glifo do Selo centralizado
 *
 * Dois modos de dimensionamento:
 *   · `size` (px) — badge quadrado de tamanho fixo (ideal para badges inline)
 *   · sem `size`  — preenche o container pai (usar com className="w-full h-full")
 *
 * Props:
 *   kin       — número do Kin (1–260)
 *   size      — largura/altura em px (badge fixo). Omitir para preencher o pai.
 *   pulse     — animação de pulso de fundo (usar 1 por página)
 *   isToday   — anel branco de destaque (Kin de hoje)
 *   eager     — fetchPriority="high" para o LCP
 *   className — classes extras no container
 */

import type { CSSProperties } from "react";
import { getKinInfo, type SealColor } from "@/lib/tzolkin";
import { SEAL_IMAGE } from "@/lib/seal-images";
import { TONE_IMAGE } from "@/lib/tone-images";

// ─── Paleta cromática ────────────────────────────────────────────────────────

const TILE_BG: Record<SealColor, string> = {
  vermelho: "#CC2222",
  branco:   "#DEDEDE",
  azul:     "#1A4FCC",
  amarelo:  "#D4A500",
};

const TILE_BORDER: Record<SealColor, string> = {
  vermelho: "#991111",
  branco:   "#AAAAAA",
  azul:     "#0F3399",
  amarelo:  "#A07800",
};

const TILE_GLOW: Record<SealColor, string> = {
  vermelho: "rgba(204,34,34,0.60)",
  branco:   "rgba(180,180,180,0.45)",
  azul:     "rgba(26,79,204,0.60)",
  amarelo:  "rgba(212,165,0,0.60)",
};

const DIVIDER: Record<SealColor, string> = {
  vermelho: "rgba(0,0,0,0.28)",
  branco:   "rgba(0,0,0,0.16)",
  azul:     "rgba(0,0,0,0.28)",
  amarelo:  "rgba(0,0,0,0.28)",
};


// ─── Componente ──────────────────────────────────────────────────────────────

export function KinBadge({
  kin,
  size,
  pulse = false,
  isToday = false,
  eager = false,
  className = "",
  title: customTitle,
}: {
  kin: number;
  size?: number;
  pulse?: boolean;
  isToday?: boolean;
  eager?: boolean;
  className?: string;
  title?: string;
}) {
  const info  = getKinInfo(kin);
  const color = info.seal.color;
  const titleText = customTitle ?? `Kin ${kin}: ${info.fullName}`;

  // Quando `size` é omitido, preenche o container pai.
  const fixedStyle: CSSProperties = size
    ? { width: size, height: size }
    : {};

  const containerStyle: CSSProperties = {
    ...fixedStyle,
    backgroundColor: TILE_BG[color],
    border:    `2px solid ${TILE_BORDER[color]}`,
    boxShadow: isToday
      ? `0 0 0 3px #fff, 0 0 14px 5px ${TILE_GLOW[color]}, inset 0 1px 2px rgba(255,255,255,0.20)`
      : `inset 0 1px 2px rgba(255,255,255,0.20), inset 0 -1px 2px rgba(0,0,0,0.25), 0 2px 5px rgba(0,0,0,0.35)`,
    // border-radius proporcional: se tiver size usa px, senão usa %
    borderRadius: size ? Math.round(size * 0.18) : "16%",
  };

  const fillMode = !size;

  return (
    <span
      className={`relative inline-flex flex-col overflow-hidden select-none flex-shrink-0 ${fillMode ? "w-full h-full" : ""} ${className}`}
      style={containerStyle}
      aria-label={titleText}
      title={titleText}
    >
      {/* Pulse glow */}
      {pulse && (
        <span
          className="absolute inset-0 opacity-20 blur-lg soft-pulse pointer-events-none"
          style={{ backgroundColor: TILE_BG[color] }}
          aria-hidden
        />
      )}

      {/* Faixa superior: glifo do Tom (~28% da altura) */}
      <span
        className="relative flex-none flex items-center justify-center overflow-hidden"
        style={{
          height:       "28%",
          borderBottom: `1px solid ${DIVIDER[color]}`,
        }}
      >
        <img
          src={TONE_IMAGE[info.tone.index]}
          alt={`Tom ${info.tone.index} · ${info.tone.name}`}
          className="object-contain"
          style={{
            width:  "76%",
            height: "74%",
          }}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          {...(eager ? { fetchPriority: "high" as const } : {})}
        />
      </span>

      {/* Corpo: glifo do Selo (restante ~72%) */}
      <span className="relative flex flex-1 items-center justify-center overflow-hidden">
        <img
          src={SEAL_IMAGE[info.seal.index]}
          alt={info.seal.name}
          className="object-contain"
          style={{
            width:  "72%",
            height: "72%",
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))",
          }}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          {...(eager ? { fetchPriority: "high" as const } : {})}
        />
      </span>
    </span>
  );
}
