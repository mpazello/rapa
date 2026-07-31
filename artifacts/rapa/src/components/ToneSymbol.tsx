import { cn } from "@/lib/utils";

export interface ToneSymbolProps {
  tone: number;
  size?: number;
  className?: string;
}

/**
 * Símbolo do tom galáctico no estilo numeral maia (Dreamspell):
 * 1-4 pontos, 5-9 barra(s) + pontos, 10-13 duas barras + pontos.
 */
export function ToneSymbol({ tone, size = 24, className }: ToneSymbolProps) {
  const t = ((tone - 1) % 13) + 1;
  const bars = Math.floor(t / 5);
  const dots = t % 5;

  const elements: React.ReactNode[] = [];
  const barW = 18;
  const barH = 3.5;
  const dotR = 3.2;
  const gap = 3.5;

  let y = 2;

  if (dots === 4) {
    // 4 pontos em grade 2×2
    const positions = [
      { cx: 8, cy: 6 },
      { cx: 16, cy: 6 },
      { cx: 8, cy: 13 },
      { cx: 16, cy: 13 },
    ];
    positions.forEach((p, i) =>
      elements.push(<circle key={`d${i}`} cx={p.cx} cy={p.cy} r={dotR} className="fill-current" />)
    );
    y = 17;
  } else if (dots > 0) {
    const totalWidth = dots * dotR * 2 + (dots - 1) * gap;
    const startX = (24 - totalWidth) / 2 + dotR;
    for (let i = 0; i < dots; i++) {
      elements.push(
        <circle
          key={`d${i}`}
          cx={startX + i * (dotR * 2 + gap)}
          cy={y + dotR}
          r={dotR}
          className="fill-current"
        />
      );
    }
    y += dotR * 2 + gap;
  }

  if (bars > 0 && dots > 0) y += gap;

  for (let i = 0; i < bars; i++) {
    elements.push(
      <rect
        key={`b${i}`}
        x={(24 - barW) / 2}
        y={y + i * (barH + gap)}
        width={barW}
        height={barH}
        rx={1.5}
        className="fill-current"
      />
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn("inline-block", className)}
      aria-label={`Tom ${t}`}
      role="img"
    >
      {elements}
    </svg>
  );
}
