/**
 * KinBadge regression tests
 *
 * Garante que o glifo do Selo e do Tom são visíveis em tiles de todas as
 * 4 famílias cromáticas (vermelho, branco, azul, amarelo).
 *
 * O principal risco de regressão é um filtro CSS (invert, brightness(0),
 * grayscale, etc.) ser re-aplicado nas imagens, tornando os glifos
 * invisíveis contra o fundo colorido.
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { KinBadge } from "./KinBadge";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Converte hex (#RRGGBB) para rgb(r, g, b) que o jsdom retorna. */
function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

/** Obtém o span container do KinBadge via aria-label. */
function getContainer(kinLabel: string | RegExp): HTMLElement {
  return screen.getByLabelText(kinLabel) as HTMLElement;
}

/** CSS filter patterns that would make glyphs invisible against a colored tile. */
const HARMFUL_FILTER_PATTERNS = [
  /\binvert\b/,
  /brightness\(\s*0\.?0*\s*\)/,
  /\bgrayscale\b/,
  /opacity\(\s*0\.?0*\s*\)/,
];

function hasHarmfulFilter(filterValue: string | null | undefined): boolean {
  if (!filterValue) return false;
  return HARMFUL_FILTER_PATTERNS.some((re) => re.test(filterValue));
}

// ─── Um Kin representativo para cada cor de Selo ──────────────────────────────
// Seal index 1 = Dragão (vermelho), 2 = Vento (branco), 3 = Noite (azul), 4 = Semente (amarelo)
const COLOR_SAMPLES: Array<{ kin: number; color: string; bgHex: string }> = [
  { kin: 1,  color: "vermelho", bgHex: "#CC2222" },
  { kin: 2,  color: "branco",   bgHex: "#DEDEDE" },
  { kin: 3,  color: "azul",     bgHex: "#1A4FCC" },
  { kin: 4,  color: "amarelo",  bgHex: "#D4A500" },
];

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("KinBadge — glifos visíveis nas 4 cores de Selo", () => {
  for (const { kin, color, bgHex } of COLOR_SAMPLES) {
    describe(`Kin ${kin} (${color})`, () => {
      it("renderiza dois elementos <img> (Tom e Selo)", () => {
        const { container } = render(<KinBadge kin={kin} size={64} />);
        const imgs = container.querySelectorAll("img");
        expect(imgs.length).toBeGreaterThanOrEqual(2);
      });

      it("o img do Selo tem src definido (glifo carregável)", () => {
        const { container } = render(<KinBadge kin={kin} size={64} />);
        const imgs = container.querySelectorAll("img");
        // Seal is the second img per component structure (tone first, seal second).
        const sealImg = imgs[1] as HTMLImageElement;
        expect(sealImg.src).toBeTruthy();
        expect(sealImg.src).not.toBe("");
      });

      it("o img do Tom tem src definido (glifo carregável)", () => {
        const { container } = render(<KinBadge kin={kin} size={64} />);
        const imgs = container.querySelectorAll("img");
        const toneImg = imgs[0] as HTMLImageElement;
        expect(toneImg.src).toBeTruthy();
        expect(toneImg.src).not.toBe("");
      });

      it("o filtro CSS do Selo NÃO contém invert/brightness(0)/grayscale", () => {
        const { container } = render(<KinBadge kin={kin} size={64} />);
        const imgs = container.querySelectorAll("img");
        const sealImg = imgs[1] as HTMLElement;
        expect(hasHarmfulFilter(sealImg.style.filter)).toBe(false);
      });

      it("o filtro CSS do Tom NÃO contém invert/brightness(0)/grayscale", () => {
        const { container } = render(<KinBadge kin={kin} size={64} />);
        const imgs = container.querySelectorAll("img");
        const toneImg = imgs[0] as HTMLElement;
        expect(hasHarmfulFilter(toneImg.style.filter)).toBe(false);
      });

      it(`o container tem background-color correspondente à cor ${color} (${bgHex})`, () => {
        render(<KinBadge kin={kin} size={64} />);
        // span[aria-label] is the outermost container of KinBadge.
        const badge = getContainer(/Kin \d+/);
        // jsdom represents hex colors as rgb(), so we convert before comparing.
        expect(badge.style.backgroundColor).toBe(hexToRgb(bgHex));
      });
    });
  }
});

describe("KinBadge — modo fill (sem prop size)", () => {
  it("renderiza sem erros quando size é omitido", () => {
    const { container } = render(
      <div style={{ width: 80, height: 80 }}>
        <KinBadge kin={1} />
      </div>
    );
    const imgs = container.querySelectorAll("img");
    expect(imgs.length).toBeGreaterThanOrEqual(2);
  });
});

describe("KinBadge — prop isToday", () => {
  it("adiciona box-shadow de destaque quando isToday=true", () => {
    render(<KinBadge kin={1} size={64} isToday />);
    const badge = getContainer(/Kin 1/);
    // The isToday ring includes a white outline: "0 0 0 3px #fff"
    expect(badge.style.boxShadow).toMatch(/0 0 0 3px #fff/);
  });

  it("não tem anel branco quando isToday=false", () => {
    render(<KinBadge kin={1} size={64} isToday={false} />);
    const badge = getContainer(/Kin 1/);
    expect(badge.style.boxShadow).not.toMatch(/0 0 0 3px #fff/);
  });
});

describe("KinBadge — aria-label", () => {
  it("container tem aria-label com número e nome do Kin", () => {
    render(<KinBadge kin={1} size={64} />);
    const badge = screen.getByLabelText(/Kin 1/i);
    expect(badge).toBeInTheDocument();
  });
});
