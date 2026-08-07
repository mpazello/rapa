/**
 * KinDisplay — componente padrão para exibir o Kin maia (Tom + Selo).
 *
 * Substitui o uso manual de SEAL_IMAGE + TONE_IMAGE em todas as páginas.
 * Oferece dois layouts:
 *   "badge" — glifo do Tom sobreposto como badge no canto superior-esquerdo do Selo.
 *             Ideal para espaços compactos (células do almanaque, cards de lista).
 *   "duo"   — Tom e Selo exibidos lado a lado como elementos de igual destaque.
 *             Ideal para headers de detalhe e hero sections.
 *
 * Tamanhos predefinidos (base = diâmetro do Selo):
 *   xs = 28px · sm = 56px · md = 72px · lg = 92px · xl = 112px
 */

import { getKinInfo, type SealColor } from "@/lib/tzolkin";
import { SEAL_IMAGE } from "@/lib/seal-images";
import { TONE_IMAGE } from "@/lib/tone-images";

// ─── Tipos ──────────────────────────────────────────────────────────────────

export type KinDisplaySize = "xs" | "sm" | "md" | "lg" | "xl";
/**
 * Layouts disponíveis:
 *   "badge" — Tom sobreposto como badge no canto superior-esquerdo do Selo.
 *             Ideal para espaços compactos (células, cards de lista).
 *   "duo"   — Tom e Selo lado a lado, mesma altura.
 *             Ideal para menções secundárias em headers.
 *   "stack" — Tom acima, Selo abaixo com leve overlap (-mt-2).
 *             Tom em z-20, Selo em z-10. Layout canônico para hero/detail pages.
 *             Segue o KIN Composition Lib spec.
 */
export type KinDisplayLayout = "badge" | "duo" | "stack";

// ─── Configuração de tamanhos ────────────────────────────────────────────────

const SEAL_PX: Record<KinDisplaySize, number> = {
  xs:  28,   // almanaque cells
  sm:  56,   // ciclo do dia (index)
  md:  72,   // cards médios
  lg:  92,   // seções secundárias
  xl: 112,   // hero / detail header
};

/** Aspect ratio nativo dos SVGs do Selo (viewBox 95.8 × 101). */
const SEAL_ASPECT = 101 / 95.8;   // ≈ 1.054  (ligeiramente mais alto que largo)
/** Aspect ratio nativo dos SVGs do Tom (viewBox 96 × 32). */
const TONE_ASPECT = 32 / 96;      // ≈ 0.333  (flat, 3:1)

// ─── Classes de cor por família cromática ────────────────────────────────────

const RING: Record<SealColor, string> = {
  vermelho: "border-error/50",
  branco:   "border-on-surface/50",
  azul:     "border-primary/50",
  amarelo:  "border-tertiary/50",
};

const GLOW: Record<SealColor, string> = {
  vermelho: "bg-error",
  branco:   "bg-on-surface",
  azul:     "bg-primary",
  amarelo:  "bg-tertiary",
};

/** Cor de fundo do glifo do Tom — mesma família cromática do Selo. */
const TONE_BG: Record<SealColor, string> = {
  vermelho: "bg-error",
  branco:   "bg-on-surface",
  azul:     "bg-primary",
  amarelo:  "bg-tertiary",
};

// ─── Componente interno: círculo do Selo ─────────────────────────────────────

function SealCircle({
  sealIndex,
  sealName,
  color,
  sealPx,
  pulse,
  eager,
}: {
  sealIndex: number;
  sealName: string;
  color: SealColor;
  sealPx: number;
  pulse: boolean;
  eager: boolean;
}) {
  const sealH = Math.round(sealPx * SEAL_ASPECT);
  const imgPx = Math.round(sealPx * 0.7);
  return (
    <span
      className={`relative inline-flex items-center justify-center flex-shrink-0 rounded-full border-2 ${RING[color]} bg-surface-container-low overflow-hidden`}
      style={{ width: sealPx, height: sealH }}
    >
      {pulse && (
        <span
          className={`absolute inset-0 ${GLOW[color]} opacity-20 blur-md soft-pulse rounded-full`}
          aria-hidden
        />
      )}
      <img
        src={SEAL_IMAGE[sealIndex]}
        alt={sealName}
        width={imgPx}
        height={imgPx}
        className="relative w-[70%] h-[70%] object-contain"
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        {...(eager ? { fetchPriority: "high" as const } : {})}
      />
    </span>
  );
}

// ─── KinDisplay ─────────────────────────────────────────────────────────────

/**
 * Exibe o Kin maia com Tom e Selo.
 *
 * @param kin    Número do Kin (1–260).
 * @param size   Tamanho predefinido (xs | sm | md | lg | xl). Padrão: "md".
 * @param layout Layout visual ("badge" | "duo"). Padrão: "badge".
 * @param pulse  Animação de pulso no Selo (usar só 1 por página).
 * @param eager  Carregamento prioritário (usar só para o elemento above-the-fold).
 */
export function KinDisplay({
  kin,
  size = "md",
  layout = "badge",
  pulse = false,
  eager = false,
  className = "",
}: {
  kin: number;
  size?: KinDisplaySize;
  layout?: KinDisplayLayout;
  pulse?: boolean;
  eager?: boolean;
  className?: string;
}) {
  const info = getKinInfo(kin);
  const sealPx = SEAL_PX[size];

  // ── Layout "stack": Tom acima, Selo abaixo com leve overlap ─────────────
  // Segue o KIN Composition Lib spec:
  //   · flex-direction: column; align-items: center
  //   · Tone em z-20, Seal em z-10
  //   · -mt-2 no Seal para tightening visual lockup
  if (layout === "stack") {
    const toneH = Math.round(sealPx * TONE_ASPECT);
    const sealH = Math.round(sealPx * SEAL_ASPECT);
    const imgPx = Math.round(sealPx * 0.7);
    return (
      <div
        className={`inline-flex flex-col items-center ${className}`}
        title={info.fullName}
        aria-label={`${info.fullName} — Tom ${info.tone.index} ${info.tone.name}`}
      >
        {/* LAYER 01: TONE — proporção nativa 96×32 */}
        <span
          className={`relative z-20 flex-shrink-0 rounded-xl shadow-lg overflow-hidden ${TONE_BG[info.seal.color]}`}
          style={{ width: sealPx, height: toneH }}
        >
          <img
            src={TONE_IMAGE[info.tone.index]}
            alt={`Tom ${info.tone.index} · ${info.tone.name}`}
            title={`Tom ${info.tone.index} · ${info.tone.name}`}
            className="w-full h-full object-contain p-[10%]"
            loading={eager ? "eager" : "lazy"}
            draggable={false}
          />
        </span>
        {/* LAYER 00: SEAL — proporção nativa 95.8×101 */}
        <span
          className="relative z-10 -mt-2 inline-flex items-center justify-center flex-shrink-0 rounded-full"
          style={{ width: sealPx, height: sealH }}
        >
          <span
            className={`absolute inset-0 rounded-full border-2 ${RING[info.seal.color]} bg-surface-container-low overflow-hidden flex items-center justify-center`}
          >
            {pulse && (
              <span
                className={`absolute inset-0 ${GLOW[info.seal.color]} opacity-20 blur-md soft-pulse rounded-full`}
                aria-hidden
              />
            )}
            <img
              src={SEAL_IMAGE[info.seal.index]}
              alt={info.seal.name}
              width={imgPx}
              height={imgPx}
              className="relative w-[70%] h-[70%] object-contain"
              loading={eager ? "eager" : "lazy"}
              decoding="async"
              {...(eager ? { fetchPriority: "high" as const } : {})}
            />
          </span>
        </span>
      </div>
    );
  }

  // ── Layout "duo": Tom à esquerda, Selo à direita ─────────────────────────
  if (layout === "duo") {
    const toneH = Math.round(sealPx * TONE_ASPECT);
    return (
      <div
        className={`inline-flex items-center gap-3 ${className}`}
        title={info.fullName}
        aria-label={`${info.fullName} — Tom ${info.tone.index} ${info.tone.name}`}
      >
        {/* Glifo do Tom — proporção nativa 96×32 */}
        <span
          className={`flex-shrink-0 rounded-xl shadow-lg overflow-hidden ${TONE_BG[info.seal.color]}`}
          style={{ width: sealPx, height: toneH }}
        >
          <img
            src={TONE_IMAGE[info.tone.index]}
            alt={`Tom ${info.tone.index} · ${info.tone.name}`}
            title={`Tom ${info.tone.index} · ${info.tone.name}`}
            className="w-full h-full object-contain p-[10%]"
            loading={eager ? "eager" : "lazy"}
            draggable={false}
          />
        </span>
        {/* Círculo do Selo */}
        <SealCircle
          sealIndex={info.seal.index}
          sealName={info.seal.name}
          color={info.seal.color}
          sealPx={sealPx}
          pulse={pulse}
          eager={eager}
        />
      </div>
    );
  }

  // ── Layout "badge": mini-stack — Tom acima, Selo abaixo ────────────────────
  // Ambos com proporções nativas das imagens.
  const toneH = Math.round(sealPx * TONE_ASPECT); // 96×32 → ~33% da largura
  const sealH = Math.round(sealPx * SEAL_ASPECT);  // 95.8×101 → ~105% da largura
  const imgPx = Math.round(sealPx * 0.7);

  return (
    <div
      className={`inline-flex flex-col items-center flex-shrink-0 ${className}`}
      aria-label={`${info.fullName} — Tom ${info.tone.index} ${info.tone.name}`}
      title={info.fullName}
    >
      {/* LAYER 01: TONE — proporção nativa 96×32 */}
      <span
        className={`relative z-20 flex-shrink-0 rounded-md shadow-md overflow-hidden ${TONE_BG[info.seal.color]}`}
        style={{ width: sealPx, height: toneH }}
      >
        <img
          src={TONE_IMAGE[info.tone.index]}
          alt={`Tom ${info.tone.index}`}
          className="w-full h-full object-contain p-[8%]"
          draggable={false}
        />
      </span>

      {/* LAYER 00: SEAL — proporção nativa 95.8×101 */}
      <span
        className="relative z-10 -mt-1 inline-flex items-center justify-center flex-shrink-0"
        style={{ width: sealPx, height: sealH }}
      >
        <span
          className={`absolute inset-0 rounded-full border-2 ${RING[info.seal.color]} bg-surface-container-low overflow-hidden flex items-center justify-center`}
        >
          {pulse && (
            <span
              className={`absolute inset-0 ${GLOW[info.seal.color]} opacity-20 blur-md soft-pulse rounded-full`}
              aria-hidden
            />
          )}
          <img
            src={SEAL_IMAGE[info.seal.index]}
            alt=""
            width={imgPx}
            height={imgPx}
            className="relative w-[70%] h-[70%] object-contain"
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            {...(eager ? { fetchPriority: "high" as const } : {})}
          />
        </span>
      </span>
    </div>
  );
}
