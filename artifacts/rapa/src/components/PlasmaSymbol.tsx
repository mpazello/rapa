import { cn } from "@/lib/utils";
import daliUrl from "@/assets/plasmas/dali.svg";
import seliUrl from "@/assets/plasmas/seli.svg";
import gamaUrl from "@/assets/plasmas/gama.svg";
import kaliUrl from "@/assets/plasmas/kali.svg";
import alfaUrl from "@/assets/plasmas/alfa.svg";
import limiUrl from "@/assets/plasmas/limi.svg";
import silioUrl from "@/assets/plasmas/silio.svg";

const SRC: Record<number, string> = {
  1: daliUrl,
  2: seliUrl,
  3: gamaUrl,
  4: kaliUrl,
  5: alfaUrl,
  6: limiUrl,
  7: silioUrl,
};

const NAME: Record<number, string> = {
  1: "Dali",
  2: "Seli",
  3: "Gama",
  4: "Kali",
  5: "Alfa",
  6: "Limi",
  7: "Silio",
};

interface Props {
  index: number; // 1..7
  color?: string; // kept for backwards compatibility (unused — SVG carries its own color)
  size?: number;
  className?: string;
}

/**
 * Símbolos oficiais dos 7 Plasmas Radiais (tzolkin.io).
 */
export function PlasmaSymbol({ index, size = 48, className }: Props) {
  const src = SRC[index];
  if (!src) return null;
  return (
    <img
      src={src}
      width={size}
      height={size}
      alt={`Plasma ${NAME[index]}`}
      className={cn("inline-block", className)}
      loading="lazy"
      decoding="async"
    />
  );
}
