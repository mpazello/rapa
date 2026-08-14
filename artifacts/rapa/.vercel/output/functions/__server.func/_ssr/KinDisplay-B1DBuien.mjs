import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { g as getKinInfo } from "./tzolkin-CeuRSgpU.mjs";
import { t as SEAL_IMAGE } from "./seal-images-Bln5NZxW.mjs";
import { t as TONE_IMAGE } from "./tone-images-C0GIxTBZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/KinDisplay-B1DBuien.js
var import_jsx_runtime = require_jsx_runtime();
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
var SEAL_PX = {
	xs: 28,
	sm: 56,
	md: 72,
	lg: 92,
	xl: 112
};
/** Aspect ratio nativo dos SVGs do Selo (viewBox 95.8 × 101). */
var SEAL_ASPECT = 101 / 95.8;
/** Aspect ratio nativo dos SVGs do Tom (viewBox 96 × 32). */
var TONE_ASPECT = 32 / 96;
var RING = {
	vermelho: "border-error/50",
	branco: "border-on-surface/50",
	azul: "border-primary/50",
	amarelo: "border-tertiary/50"
};
var GLOW = {
	vermelho: "bg-error",
	branco: "bg-on-surface",
	azul: "bg-primary",
	amarelo: "bg-tertiary"
};
/** Cor de fundo do glifo do Tom — mesma família cromática do Selo. */
var TONE_BG = {
	vermelho: "bg-error",
	branco: "bg-on-surface",
	azul: "bg-primary",
	amarelo: "bg-tertiary"
};
function SealCircle({ sealIndex, sealName, color, sealPx, pulse, eager }) {
	const sealH = Math.round(sealPx * SEAL_ASPECT);
	const imgPx = Math.round(sealPx * .7);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `relative inline-flex items-center justify-center flex-shrink-0 rounded-full border-2 ${RING[color]} bg-surface-container-low overflow-hidden`,
		style: {
			width: sealPx,
			height: sealH
		},
		children: [pulse && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `absolute inset-0 ${GLOW[color]} opacity-20 blur-md soft-pulse rounded-full`,
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: SEAL_IMAGE[sealIndex],
			alt: sealName,
			width: imgPx,
			height: imgPx,
			className: "relative w-[70%] h-[70%] object-contain",
			loading: eager ? "eager" : "lazy",
			decoding: "async",
			...eager ? { fetchPriority: "high" } : {}
		})]
	});
}
/**
* Exibe o Kin maia com Tom e Selo.
*
* @param kin    Número do Kin (1–260).
* @param size   Tamanho predefinido (xs | sm | md | lg | xl). Padrão: "md".
* @param layout Layout visual ("badge" | "duo"). Padrão: "badge".
* @param pulse  Animação de pulso no Selo (usar só 1 por página).
* @param eager  Carregamento prioritário (usar só para o elemento above-the-fold).
*/
function KinDisplay({ kin, size = "md", layout = "badge", pulse = false, eager = false, className = "" }) {
	const info = getKinInfo(kin);
	const sealPx = SEAL_PX[size];
	if (layout === "stack") {
		const toneH = Math.round(sealPx * TONE_ASPECT);
		const sealH = Math.round(sealPx * SEAL_ASPECT);
		const imgPx = Math.round(sealPx * .7);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `inline-flex flex-col items-center ${className}`,
			title: info.fullName,
			"aria-label": `${info.fullName} — Tom ${info.tone.index} ${info.tone.name}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `relative z-20 flex-shrink-0 rounded-xl shadow-lg overflow-hidden ${TONE_BG[info.seal.color]}`,
				style: {
					width: sealPx,
					height: toneH
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: TONE_IMAGE[info.tone.index],
					alt: `Tom ${info.tone.index} · ${info.tone.name}`,
					title: `Tom ${info.tone.index} · ${info.tone.name}`,
					className: "w-full h-full object-contain p-[10%]",
					loading: eager ? "eager" : "lazy",
					draggable: false
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "relative z-10 -mt-2 inline-flex items-center justify-center flex-shrink-0 rounded-full",
				style: {
					width: sealPx,
					height: sealH
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `absolute inset-0 rounded-full border-2 ${RING[info.seal.color]} bg-surface-container-low overflow-hidden flex items-center justify-center`,
					children: [pulse && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `absolute inset-0 ${GLOW[info.seal.color]} opacity-20 blur-md soft-pulse rounded-full`,
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: SEAL_IMAGE[info.seal.index],
						alt: info.seal.name,
						width: imgPx,
						height: imgPx,
						className: "relative w-[70%] h-[70%] object-contain",
						loading: eager ? "eager" : "lazy",
						decoding: "async",
						...eager ? { fetchPriority: "high" } : {}
					})]
				})
			})]
		});
	}
	if (layout === "duo") {
		const toneH = Math.round(sealPx * TONE_ASPECT);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `inline-flex items-center gap-3 ${className}`,
			title: info.fullName,
			"aria-label": `${info.fullName} — Tom ${info.tone.index} ${info.tone.name}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `flex-shrink-0 rounded-xl shadow-lg overflow-hidden ${TONE_BG[info.seal.color]}`,
				style: {
					width: sealPx,
					height: toneH
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: TONE_IMAGE[info.tone.index],
					alt: `Tom ${info.tone.index} · ${info.tone.name}`,
					title: `Tom ${info.tone.index} · ${info.tone.name}`,
					className: "w-full h-full object-contain p-[10%]",
					loading: eager ? "eager" : "lazy",
					draggable: false
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SealCircle, {
				sealIndex: info.seal.index,
				sealName: info.seal.name,
				color: info.seal.color,
				sealPx,
				pulse,
				eager
			})]
		});
	}
	const toneH = Math.round(sealPx * TONE_ASPECT);
	const sealH = Math.round(sealPx * SEAL_ASPECT);
	const imgPx = Math.round(sealPx * .7);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `inline-flex flex-col items-center flex-shrink-0 ${className}`,
		"aria-label": `${info.fullName} — Tom ${info.tone.index} ${info.tone.name}`,
		title: info.fullName,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `relative z-20 flex-shrink-0 rounded-md shadow-md overflow-hidden ${TONE_BG[info.seal.color]}`,
			style: {
				width: sealPx,
				height: toneH
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: TONE_IMAGE[info.tone.index],
				alt: `Tom ${info.tone.index}`,
				className: "w-full h-full object-contain p-[8%]",
				draggable: false
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "relative z-10 -mt-1 inline-flex items-center justify-center flex-shrink-0",
			style: {
				width: sealPx,
				height: sealH
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: `absolute inset-0 rounded-full border-2 ${RING[info.seal.color]} bg-surface-container-low overflow-hidden flex items-center justify-center`,
				children: [pulse && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `absolute inset-0 ${GLOW[info.seal.color]} opacity-20 blur-md soft-pulse rounded-full`,
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: SEAL_IMAGE[info.seal.index],
					alt: "",
					width: imgPx,
					height: imgPx,
					className: "relative w-[70%] h-[70%] object-contain",
					loading: eager ? "eager" : "lazy",
					decoding: "async",
					...eager ? { fetchPriority: "high" } : {}
				})]
			})
		})]
	});
}
//#endregion
export { KinDisplay as t };
