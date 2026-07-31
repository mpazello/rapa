/**
 * Modal de coloração de selos — Dreamspell / Tzolkin
 *
 * Estratégia de renderização:
 *   - Adiciona style="fill:COR" diretamente em cada elemento SVG pela classe.
 *   - Inline style tem prioridade máxima sobre qualquer CSS de classe → sem conflitos.
 *   - SVG exibido via dangerouslySetInnerHTML (sem blob URL, sem fetch externo de cores).
 */

import { useState, useEffect, useCallback, useMemo } from "react";
import { SEAL_IMAGE } from "@/lib/seal-images";
import type { KinInfo } from "@/lib/tzolkin";

// ─── Cores cromáticas do Dreamspell ───────────────────────────────────────────

const PALETTE = [
  { hex: "#FABD45", name: "Amarelo"  },
  { hex: "#E52D30", name: "Vermelho" },
  { hex: "#4086C4", name: "Azul"    },
  { hex: "#F5F5F5", name: "Branco"  },
  { hex: "#191919", name: "Preto"   },
];

export const SEAL_STORAGE_KEY = (sealIndex: number) =>
  `rapa-seal-art-v1-${sealIndex}`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Adiciona `style="fill:COR"` a todos os elementos SVG com class="cls".
 * Inline style supera CSS de classe — garante que a cor é aplicada.
 */
function addFillStyle(svgText: string, cls: string, color: string): string {
  // Elementos que já têm style= → insere fill: no início do style
  let result = svgText.replace(
    new RegExp(`(class="${cls}"[^>]*?style=")`, "g"),
    `$1fill:${color};`
  );
  // Elementos sem style= → adiciona style="fill:COR"
  result = result.replace(
    new RegExp(`(class="${cls}")(?![^>]*style=)`, "g"),
    `$1 style="fill:${color}"`
  );
  return result;
}

/** Extrai a cor fill original de uma classe no bloco <style> do SVG */
function extractOriginalFill(svgText: string, cls: string): string | null {
  const block = svgText.match(/<style[^>]*>([\s\S]*?)<\/style>/i)?.[1] ?? "";
  const rule  = block.match(new RegExp(`\\.${cls}\\s*\\{([^}]+)\\}`))?.[1] ?? "";
  return rule.match(/fill\s*:\s*([^;}\s]+)/)?.[1] ?? null;
}

// ─── Componente ───────────────────────────────────────────────────────────────

type RegionKey = "fundo" | "simbolo";
const REGION_CLASS: Record<RegionKey, string> = { fundo: "st0", simbolo: "st2" };

export function SealColoringModal({
  kinInfo,
  onClose,
  onSaved,
}: {
  kinInfo: KinInfo;
  onClose: () => void;
  onSaved: (dataUrl: string) => void;
}) {
  const sealIndex = kinInfo.seal.index;
  const sealSrc   = SEAL_IMAGE[sealIndex];

  const [rawSvg,  setRawSvg]  = useState("");
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);

  /** { st0: "#hex", st2: "#hex" } */
  const [colors, setColors] = useState<Record<string, string>>({});

  const [pickedColor,  setPickedColor]  = useState(PALETTE[0].hex);
  const [activeRegion, setActiveRegion] = useState<RegionKey | null>(null);
  const [saved,        setSaved]        = useState(false);

  // ── Carrega SVG ───────────────────────────────────────────────────────────
  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(sealSrc)
      .then(r => { if (!r.ok) throw new Error("fetch"); return r.text(); })
      .then(text => {
        const init: Record<string, string> = {};
        for (const cls of ["st0", "st2"]) {
          const f = extractOriginalFill(text, cls);
          if (f) init[cls] = f;
        }
        // Restaura pintura salva
        try {
          const stored = localStorage.getItem(`${SEAL_STORAGE_KEY(sealIndex)}-colors`);
          if (stored) Object.assign(init, JSON.parse(stored));
        } catch { /* ignore */ }
        setColors(init);
        setRawSvg(text);
        setLoading(false);
      })
      .catch(() => { setLoading(false); setError(true); });
  }, [sealSrc, sealIndex]);

  // ── SVG pintado ───────────────────────────────────────────────────────────
  const paintedSvg = useMemo(() => {
    if (!rawSvg) return "";
    let svg = rawSvg;
    // Aplica inline style em cada classe mapeada
    for (const [cls, color] of Object.entries(colors)) {
      svg = addFillStyle(svg, cls, color);
    }
    // Ajusta o elemento <svg>
    return svg.replace(
      /<svg\b/,
      '<svg style="width:100%;height:100%;display:block;" preserveAspectRatio="xMidYMid meet"'
    );
  }, [rawSvg, colors]);

  // ── Ações ─────────────────────────────────────────────────────────────────
  const paintRegion = useCallback((region: RegionKey, hex: string) => {
    setColors(prev => ({ ...prev, [REGION_CLASS[region]]: hex }));
    setSaved(false);
  }, []);

  const handleRegionPress = useCallback((region: RegionKey) => {
    setActiveRegion(region);
    paintRegion(region, pickedColor);
  }, [pickedColor, paintRegion]);

  const handleColorPick = useCallback((hex: string) => {
    setPickedColor(hex);
    if (activeRegion) paintRegion(activeRegion, hex);
  }, [activeRegion, paintRegion]);

  const reset = useCallback(() => {
    if (!rawSvg) return;
    const init: Record<string, string> = {};
    for (const cls of ["st0", "st2"]) {
      const f = extractOriginalFill(rawSvg, cls);
      if (f) init[cls] = f;
    }
    setColors(init);
    setActiveRegion(null);
    setSaved(false);
    localStorage.removeItem(SEAL_STORAGE_KEY(sealIndex));
    localStorage.removeItem(`${SEAL_STORAGE_KEY(sealIndex)}-colors`);
  }, [rawSvg, sealIndex]);

  const save = useCallback(() => {
    if (!paintedSvg) return;
    localStorage.setItem(
      `${SEAL_STORAGE_KEY(sealIndex)}-colors`,
      JSON.stringify(colors)
    );
    const blob = new Blob([paintedSvg], { type: "image/svg+xml;charset=utf-8" });
    const url  = URL.createObjectURL(blob);
    const img  = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 512;
      canvas.getContext("2d")!.drawImage(img, 0, 0, 512, 512);
      URL.revokeObjectURL(url);
      const dataUrl = canvas.toDataURL("image/png");
      localStorage.setItem(SEAL_STORAGE_KEY(sealIndex), dataUrl);
      onSaved(dataUrl);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    };
    img.onerror = () => URL.revokeObjectURL(url);
    img.src = url;
  }, [paintedSvg, colors, sealIndex, onSaved]);

  const corFundo   = colors[REGION_CLASS.fundo]   ?? "#444";
  const corSimbolo = colors[REGION_CLASS.simbolo] ?? "#111";

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      className="fixed inset-0 z-50 bg-[#08080F] flex flex-col"
      style={{
        paddingTop:    "env(safe-area-inset-top, 0px)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/8" style={{ flexShrink: 0 }}>
        <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center text-muted-stardust hover:bg-white/8 transition-colors">
          <span className="material-symbols-outlined text-[22px]">close</span>
        </button>
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-widest text-muted-stardust">Colorir Selo</p>
          <p className="font-serif text-sm text-ethereal-white leading-tight">{kinInfo.seal.name}</p>
        </div>
        <button
          onClick={save}
          disabled={loading || error}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all disabled:opacity-40 ${
            saved
              ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
              : "bg-astral-violet/15 text-astral-violet border-astral-violet/40 active:scale-95"
          }`}
        >
          {saved ? "✓ Salvo" : "Salvar"}
        </button>
      </div>

      {/* Preview */}
      <div className="flex items-center justify-center p-6" style={{ flexShrink: 0, height: "44vh" }}>
        {loading && (
          <span className="material-symbols-outlined animate-spin text-muted-stardust text-[32px]">progress_activity</span>
        )}
        {error && (
          <p className="text-sm text-red-400">Não foi possível carregar o selo.</p>
        )}
        {!loading && !error && paintedSvg && (
          <div
            className="rounded-2xl overflow-hidden select-none"
            style={{ width: "min(44vh, 78vw)", height: "min(44vh, 78vw)", pointerEvents: "none" }}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: paintedSvg }}
          />
        )}
      </div>

      {/* Controles */}
      <div className="border-t border-white/8 px-4 pt-4 pb-4 space-y-4" style={{ flexShrink: 0 }}>

        {/* Paleta */}
        <div className="flex items-center gap-3 justify-center">
          {PALETTE.map(c => (
            <button
              key={c.hex}
              onClick={() => handleColorPick(c.hex)}
              title={c.name}
              className={`rounded-full transition-all shrink-0 ${
                pickedColor === c.hex
                  ? "ring-2 ring-white ring-offset-2 ring-offset-[#08080F] scale-110"
                  : "opacity-75 active:scale-105"
              }`}
              style={{
                width: 40,
                height: 40,
                background: c.hex,
                border: c.hex === "#F5F5F5" ? "1px solid rgba(255,255,255,0.2)" : "none",
              }}
            />
          ))}
        </div>

        {/* Nome da cor selecionada */}
        <p className="text-center text-xs text-muted-stardust -mt-1">
          {PALETTE.find(c => c.hex === pickedColor)?.name ?? ""}
        </p>

        {/* Botões de região */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleRegionPress("fundo")}
            className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all active:scale-[0.97] ${
              activeRegion === "fundo"
                ? "border-astral-violet/60 bg-astral-violet/10"
                : "border-white/15 bg-white/4"
            }`}
          >
            <span
              className="shrink-0 w-9 h-9 rounded-full border-2 border-white/25"
              style={{ background: corFundo }}
            />
            <span className="flex flex-col items-start">
              <span className="text-sm font-semibold text-ethereal-white">Fundo</span>
              <span className="text-[10px] text-muted-stardust">Toque para pintar</span>
            </span>
            {activeRegion === "fundo" && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-astral-violet" />
            )}
          </button>

          <button
            onClick={() => handleRegionPress("simbolo")}
            className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all active:scale-[0.97] ${
              activeRegion === "simbolo"
                ? "border-astral-violet/60 bg-astral-violet/10"
                : "border-white/15 bg-white/4"
            }`}
          >
            <span
              className="shrink-0 w-9 h-9 rounded-full border-2 border-white/25"
              style={{ background: corSimbolo }}
            />
            <span className="flex flex-col items-start">
              <span className="text-sm font-semibold text-ethereal-white">Símbolo</span>
              <span className="text-[10px] text-muted-stardust">Toque para pintar</span>
            </span>
            {activeRegion === "simbolo" && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-astral-violet" />
            )}
          </button>
        </div>

        {/* Dica + Reset */}
        <div className="flex items-center justify-between px-1">
          <p className="text-[11px] text-muted-stardust/60">
            {activeRegion
              ? `Cor aplicada ao ${activeRegion === "fundo" ? "fundo" : "símbolo"}`
              : "Toque em Fundo ou Símbolo para pintar"}
          </p>
          <button onClick={reset} className="flex items-center gap-1 text-[11px] text-muted-stardust/60 active:text-muted-stardust">
            <span className="material-symbols-outlined text-[14px]">restart_alt</span>
            Resetar
          </button>
        </div>

      </div>
    </div>
  );
}
