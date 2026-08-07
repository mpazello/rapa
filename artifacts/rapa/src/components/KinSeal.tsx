import { getKinInfo, type SealColor } from "@/lib/tzolkin";
import { SEAL_IMAGE } from "@/lib/seal-images";

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
  /** Se true, exibe o número do Tom sobreposto no canto superior-esquerdo do selo. */
  showTone?: boolean;
  pulse?: boolean;
  /** Se true, carrega imediatamente com prioridade alta (usar apenas para o Kin acima da dobra / LCP). */
  eager?: boolean;
  className?: string;
}) {
  const info = getKinInfo(kin);
  const src = SEAL_IMAGE[info.seal.index];
  const imgSize = Math.round(size * 0.7);
  return (
    <span
      className={`relative inline-flex items-center justify-center rounded-full border-2 ${RING[info.seal.color]} bg-surface-container-low overflow-hidden ${className}`}
      style={{ width: size, height: size }}
      aria-label={`${info.fullName}`}
      title={info.fullName}
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
      {showTone && (
        <span className="absolute -top-1 -left-1 text-[9px] font-bold leading-none w-4 h-4 flex items-center justify-center rounded-full bg-surface-container-high border border-outline-variant/60 text-on-surface">
          {info.tone.index}
        </span>
      )}
      {showKin && (
        <span className="absolute -bottom-1 -right-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-surface-container-high border border-outline-variant/60 text-on-surface">
          {kin}
        </span>
      )}
    </span>
  );
}
