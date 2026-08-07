import { getKinInfo, type SealColor } from "@/lib/tzolkin";
import { SEAL_IMAGE } from "@/lib/seal-images";
import { TONE_IMAGE } from "@/lib/tone-images";

const RING: Record<SealColor, string> = {
  vermelho: "border-error/50",
  branco: "border-on-surface/50",
  azul: "border-primary/50",
  amarelo: "border-tertiary/50",
};

const GLOW: Record<SealColor, string> = {
  vermelho: "bg-error",
  branco: "bg-on-surface",
  azul: "bg-primary",
  amarelo: "bg-tertiary",
};

/** Selo maia oficial do Kin, com anel colorido segundo a família cromática. */
export function KinSeal({
  kin,
  size = 48,
  showKin = false,
  showTone = false,
  pulse = false,
  eager = false,
  className = "",
}: {
  kin: number;
  size?: number;
  showKin?: boolean;
  /** Se true, exibe o glifo maia do Tom sobreposto no canto superior-esquerdo do selo. */
  showTone?: boolean;
  pulse?: boolean;
  /** Se true, carrega imediatamente com prioridade alta (usar apenas para o Kin acima da dobra / LCP). */
  eager?: boolean;
  className?: string;
}) {
  const info = getKinInfo(kin);
  const src = SEAL_IMAGE[info.seal.index];
  const imgSize = Math.round(size * 0.7);
  const toneSize = Math.round(size * 0.46);

  return (
    /**
     * Wrapper externo: overflow-visible para o badge do tom não ser cortado.
     * Mantém as mesmas dimensões do selo — o badge é posicionado fora via margin negativa.
     */
    <span
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-label={`${info.fullName}`}
      title={info.fullName}
    >
      {/* Círculo do selo com overflow-hidden próprio */}
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
          src={src}
          alt=""
          width={imgSize}
          height={imgSize}
          className="relative w-[70%] h-[70%] object-contain"
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          {...(eager ? { fetchPriority: "high" as const } : {})}
        />
      </span>

      {/* Glifo do tom — canto superior-esquerdo, dentro dos bounds do KinSeal */}
      {showTone && (
        <img
          src={TONE_IMAGE[info.tone.index]}
          alt={`Tom ${info.tone.index}`}
          className="absolute top-0 left-0 rounded-md shadow-lg z-10"
          style={{ width: toneSize, height: toneSize }}
          draggable={false}
        />
      )}

      {showKin && (
        <span className="absolute -bottom-1 -right-1 z-10 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-surface-container-high border border-outline-variant/60 text-on-surface">
          {kin}
        </span>
      )}
    </span>
  );
}
