import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { g as getKinInfo } from "./tzolkin-CeuRSgpU.mjs";
import { t as SEAL_IMAGE } from "./seal-images-Bln5NZxW.mjs";
import { t as TONE_IMAGE } from "./tone-images-C0GIxTBZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/KinBadge-dubxczgb.js
var import_jsx_runtime = require_jsx_runtime();
var TILE_BG = {
	vermelho: "#CC2222",
	branco: "#DEDEDE",
	azul: "#1A4FCC",
	amarelo: "#D4A500"
};
var TILE_BORDER = {
	vermelho: "#991111",
	branco: "#AAAAAA",
	azul: "#0F3399",
	amarelo: "#A07800"
};
var TILE_GLOW = {
	vermelho: "rgba(204,34,34,0.60)",
	branco: "rgba(180,180,180,0.45)",
	azul: "rgba(26,79,204,0.60)",
	amarelo: "rgba(212,165,0,0.60)"
};
var DIVIDER = {
	vermelho: "rgba(0,0,0,0.28)",
	branco: "rgba(0,0,0,0.16)",
	azul: "rgba(0,0,0,0.28)",
	amarelo: "rgba(0,0,0,0.28)"
};
function KinBadge({ kin, size, pulse = false, isToday = false, eager = false, className = "" }) {
	const info = getKinInfo(kin);
	const color = info.seal.color;
	const containerStyle = {
		...size ? {
			width: size,
			height: size
		} : {},
		backgroundColor: TILE_BG[color],
		border: `2px solid ${TILE_BORDER[color]}`,
		boxShadow: isToday ? `0 0 0 3px #fff, 0 0 14px 5px ${TILE_GLOW[color]}, inset 0 1px 2px rgba(255,255,255,0.20)` : `inset 0 1px 2px rgba(255,255,255,0.20), inset 0 -1px 2px rgba(0,0,0,0.25), 0 2px 5px rgba(0,0,0,0.35)`,
		borderRadius: size ? Math.round(size * .18) : "16%"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `relative inline-flex flex-col overflow-hidden select-none flex-shrink-0 ${!size ? "w-full h-full" : ""} ${className}`,
		style: containerStyle,
		"aria-label": `Kin ${kin}: ${info.fullName}`,
		title: `Kin ${kin}: ${info.fullName}`,
		children: [
			pulse && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute inset-0 opacity-20 blur-lg soft-pulse pointer-events-none",
				style: { backgroundColor: TILE_BG[color] },
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "relative flex-none flex items-center justify-center overflow-hidden",
				style: {
					height: "28%",
					borderBottom: `1px solid ${DIVIDER[color]}`
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: TONE_IMAGE[info.tone.index],
					alt: `Tom ${info.tone.index} · ${info.tone.name}`,
					className: "object-contain",
					style: {
						width: "76%",
						height: "74%"
					},
					loading: eager ? "eager" : "lazy",
					decoding: "async",
					draggable: false,
					...eager ? { fetchPriority: "high" } : {}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "relative flex flex-1 items-center justify-center overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: SEAL_IMAGE[info.seal.index],
					alt: info.seal.name,
					className: "object-contain",
					style: {
						width: "72%",
						height: "72%",
						filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))"
					},
					loading: eager ? "eager" : "lazy",
					decoding: "async",
					draggable: false,
					...eager ? { fetchPriority: "high" } : {}
				})
			})
		]
	});
}
//#endregion
export { KinBadge as t };
