import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useServerFn } from "./createSsrRpc-DvRDvdGH.mjs";
import { n as useAuth } from "./use-auth-C250R4UH.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { T as sincronarioDate, _ as getTodayKinInfo, f as cubeDayOfMoon } from "./tzolkin-CeuRSgpU.mjs";
import { t as SEAL_IMAGE } from "./seal-images-Bln5NZxW.mjs";
import { t as KinBadge } from "./KinBadge-dubxczgb.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as setTodayMood, i as listEntries, r as getTodayMood, t as addEntry } from "./journal.functions-Ulo0ZGWw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BGyLBNFu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Modal de coloração de selos — Dreamspell / Tzolkin
*
* Estratégia de renderização:
*   - Adiciona style="fill:COR" diretamente em cada elemento SVG pela classe.
*   - Inline style tem prioridade máxima sobre qualquer CSS de classe → sem conflitos.
*   - SVG exibido via dangerouslySetInnerHTML (sem blob URL, sem fetch externo de cores).
*/
var PALETTE = [
	{
		hex: "#FABD45",
		name: "Amarelo"
	},
	{
		hex: "#E52D30",
		name: "Vermelho"
	},
	{
		hex: "#4086C4",
		name: "Azul"
	},
	{
		hex: "#F5F5F5",
		name: "Branco"
	},
	{
		hex: "#191919",
		name: "Preto"
	}
];
var SEAL_STORAGE_KEY = (sealIndex) => `rapa-seal-art-v1-${sealIndex}`;
/**
* Adiciona `style="fill:COR"` a todos os elementos SVG com class="cls".
* Inline style supera CSS de classe — garante que a cor é aplicada.
*/
function addFillStyle(svgText, cls, color) {
	let result = svgText.replace(new RegExp(`(class="${cls}"[^>]*?style=")`, "g"), `$1fill:${color};`);
	result = result.replace(new RegExp(`(class="${cls}")(?![^>]*style=)`, "g"), `$1 style="fill:${color}"`);
	return result;
}
/** Extrai a cor fill original de uma classe no bloco <style> do SVG */
function extractOriginalFill(svgText, cls) {
	return ((svgText.match(/<style[^>]*>([\s\S]*?)<\/style>/i)?.[1] ?? "").match(new RegExp(`\\.${cls}\\s*\\{([^}]+)\\}`))?.[1] ?? "").match(/fill\s*:\s*([^;}\s]+)/)?.[1] ?? null;
}
var REGION_CLASS = {
	fundo: "st0",
	simbolo: "st2"
};
function SealColoringModal({ kinInfo, onClose, onSaved }) {
	const sealIndex = kinInfo.seal.index;
	const sealSrc = SEAL_IMAGE[sealIndex];
	const [rawSvg, setRawSvg] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(false);
	/** { st0: "#hex", st2: "#hex" } */
	const [colors, setColors] = (0, import_react.useState)({});
	const [pickedColor, setPickedColor] = (0, import_react.useState)(PALETTE[0].hex);
	const [activeRegion, setActiveRegion] = (0, import_react.useState)(null);
	const [saved, setSaved] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setLoading(true);
		setError(false);
		fetch(sealSrc).then((r) => {
			if (!r.ok) throw new Error("fetch");
			return r.text();
		}).then((text) => {
			const init = {};
			for (const cls of ["st0", "st2"]) {
				const f = extractOriginalFill(text, cls);
				if (f) init[cls] = f;
			}
			try {
				const stored = localStorage.getItem(`${SEAL_STORAGE_KEY(sealIndex)}-colors`);
				if (stored) Object.assign(init, JSON.parse(stored));
			} catch {}
			setColors(init);
			setRawSvg(text);
			setLoading(false);
		}).catch(() => {
			setLoading(false);
			setError(true);
		});
	}, [sealSrc, sealIndex]);
	const paintedSvg = (0, import_react.useMemo)(() => {
		if (!rawSvg) return "";
		let svg = rawSvg;
		for (const [cls, color] of Object.entries(colors)) svg = addFillStyle(svg, cls, color);
		return svg.replace(/<svg\b/, "<svg style=\"width:100%;height:100%;display:block;\" preserveAspectRatio=\"xMidYMid meet\"");
	}, [rawSvg, colors]);
	const paintRegion = (0, import_react.useCallback)((region, hex) => {
		setColors((prev) => ({
			...prev,
			[REGION_CLASS[region]]: hex
		}));
		setSaved(false);
	}, []);
	const handleRegionPress = (0, import_react.useCallback)((region) => {
		setActiveRegion(region);
		paintRegion(region, pickedColor);
	}, [pickedColor, paintRegion]);
	const handleColorPick = (0, import_react.useCallback)((hex) => {
		setPickedColor(hex);
		if (activeRegion) paintRegion(activeRegion, hex);
	}, [activeRegion, paintRegion]);
	const reset = (0, import_react.useCallback)(() => {
		if (!rawSvg) return;
		const init = {};
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
	const save = (0, import_react.useCallback)(() => {
		if (!paintedSvg) return;
		localStorage.setItem(`${SEAL_STORAGE_KEY(sealIndex)}-colors`, JSON.stringify(colors));
		const blob = new Blob([paintedSvg], { type: "image/svg+xml;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const img = new Image();
		img.onload = () => {
			const canvas = document.createElement("canvas");
			canvas.width = canvas.height = 512;
			canvas.getContext("2d").drawImage(img, 0, 0, 512, 512);
			URL.revokeObjectURL(url);
			const dataUrl = canvas.toDataURL("image/png");
			localStorage.setItem(SEAL_STORAGE_KEY(sealIndex), dataUrl);
			onSaved(dataUrl);
			setSaved(true);
			setTimeout(() => setSaved(false), 2500);
		};
		img.onerror = () => URL.revokeObjectURL(url);
		img.src = url;
	}, [
		paintedSvg,
		colors,
		sealIndex,
		onSaved
	]);
	const corFundo = colors[REGION_CLASS.fundo] ?? "#444";
	const corSimbolo = colors[REGION_CLASS.simbolo] ?? "#111";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 bg-[#08080F] flex flex-col",
		style: {
			paddingTop: "env(safe-area-inset-top, 0px)",
			paddingBottom: "env(safe-area-inset-bottom, 0px)"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-4 py-3 border-b border-white/8",
				style: { flexShrink: 0 },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "w-10 h-10 rounded-full flex items-center justify-center text-muted-stardust hover:bg-white/8 transition-colors",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined text-[22px]",
							children: "close"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] uppercase tracking-widest text-muted-stardust",
							children: "Colorir Selo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-serif text-sm text-ethereal-white leading-tight",
							children: kinInfo.seal.name
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: save,
						disabled: loading || error,
						className: `px-4 py-1.5 rounded-full text-sm font-medium border transition-all disabled:opacity-40 ${saved ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" : "bg-astral-violet/15 text-astral-violet border-astral-violet/40 active:scale-95"}`,
						children: saved ? "✓ Salvo" : "Salvar"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-center p-6",
				style: {
					flexShrink: 0,
					height: "44vh"
				},
				children: [
					loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "material-symbols-outlined animate-spin text-muted-stardust text-[32px]",
						children: "progress_activity"
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-red-400",
						children: "Não foi possível carregar o selo."
					}),
					!loading && !error && paintedSvg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl overflow-hidden select-none",
						style: {
							width: "min(44vh, 78vw)",
							height: "min(44vh, 78vw)",
							pointerEvents: "none"
						},
						dangerouslySetInnerHTML: { __html: paintedSvg }
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-white/8 px-4 pt-4 pb-4 space-y-4",
				style: { flexShrink: 0 },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-3 justify-center",
						children: PALETTE.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => handleColorPick(c.hex),
							title: c.name,
							className: `rounded-full transition-all shrink-0 ${pickedColor === c.hex ? "ring-2 ring-white ring-offset-2 ring-offset-[#08080F] scale-110" : "opacity-75 active:scale-105"}`,
							style: {
								width: 40,
								height: 40,
								background: c.hex,
								border: c.hex === "#F5F5F5" ? "1px solid rgba(255,255,255,0.2)" : "none"
							}
						}, c.hex))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-xs text-muted-stardust -mt-1",
						children: PALETTE.find((c) => c.hex === pickedColor)?.name ?? ""
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => handleRegionPress("fundo"),
							className: `relative flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all active:scale-[0.97] ${activeRegion === "fundo" ? "border-astral-violet/60 bg-astral-violet/10" : "border-white/15 bg-white/4"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 w-9 h-9 rounded-full border-2 border-white/25",
									style: { background: corFundo }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex flex-col items-start",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-semibold text-ethereal-white",
										children: "Fundo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-stardust",
										children: "Toque para pintar"
									})]
								}),
								activeRegion === "fundo" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-2 right-2 w-2 h-2 rounded-full bg-astral-violet" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => handleRegionPress("simbolo"),
							className: `relative flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all active:scale-[0.97] ${activeRegion === "simbolo" ? "border-astral-violet/60 bg-astral-violet/10" : "border-white/15 bg-white/4"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 w-9 h-9 rounded-full border-2 border-white/25",
									style: { background: corSimbolo }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex flex-col items-start",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-semibold text-ethereal-white",
										children: "Símbolo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-stardust",
										children: "Toque para pintar"
									})]
								}),
								activeRegion === "simbolo" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-2 right-2 w-2 h-2 rounded-full bg-astral-violet" })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between px-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-stardust/60",
							children: activeRegion ? `Cor aplicada ao ${activeRegion === "fundo" ? "fundo" : "símbolo"}` : "Toque em Fundo ou Símbolo para pintar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: reset,
							className: "flex items-center gap-1 text-[11px] text-muted-stardust/60 active:text-muted-stardust",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "material-symbols-outlined text-[14px]",
								children: "restart_alt"
							}), "Resetar"]
						})]
					})
				]
			})
		]
	});
}
var POSITIONS = [
	[0, 0],
	[1, 0],
	[2, 0],
	[3, 0],
	[4, 0],
	[4, 1],
	[4, 2],
	[4, 3],
	[4, 4],
	[4, 5],
	[3, 5],
	[2, 5],
	[1, 5]
];
function Tile({ kin, isToday }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/ciclos/kin/$kin",
		params: { kin: String(kin) },
		className: "block w-full aspect-square transition-transform active:scale-95 hover:scale-105",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KinBadge, {
			kin,
			isToday,
			className: "w-full h-full"
		})
	});
}
function WavespellCard() {
	const [data, setData] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const info = getTodayKinInfo();
		const { kinStart } = info.trecena;
		const wavespellKins = Array.from({ length: 13 }, (_, i) => (kinStart - 1 + i) % 260 + 1);
		setData({
			todayKin: info.kin,
			wavespellKins,
			wavespellName: info.trecena.seal.name,
			kinStart
		});
	}, []);
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-card rounded-3xl p-5 space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-40 bg-white/10 rounded animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-48 bg-white/5 rounded-2xl animate-pulse" })]
	});
	const { todayKin, wavespellKins, wavespellName, kinStart } = data;
	const grid = Array.from({ length: 5 }, () => Array(6).fill(null));
	POSITIONS.forEach(([row, col], idx) => {
		grid[row][col] = wavespellKins[idx];
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-card rounded-3xl p-5 space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-label-sm text-label-sm text-muted-stardust uppercase tracking-widest text-xs",
						children: "Onda Encantada"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-serif text-lg text-ethereal-white",
						children: wavespellName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-stardust/70 mt-0.5",
						children: [
							"Kin ",
							kinStart,
							" → ",
							(kinStart - 1 + 12) % 260 + 1
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/onda-encantada",
					className: "text-xs text-astral-violet hover:underline",
					children: "Ver tudo →"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-1.5",
				style: {
					gridTemplateColumns: "repeat(6, 1fr)",
					gridTemplateRows: "repeat(5, 1fr)"
				},
				children: grid.flatMap((row, rIdx) => row.map((kin, cIdx) => {
					if (kin === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}, `${rIdx}-${cIdx}`);
					const toneNumber = wavespellKins.indexOf(kin) + 1;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						kin,
						isToday: kin === todayKin,
						toneNumber
					}, kin);
				}))
			}),
			wavespellKins.includes(todayKin) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-stardust/70 text-center",
				children: [
					"Você está no tom",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-astral-violet font-semibold",
						children: wavespellKins.indexOf(todayKin) + 1
					}),
					" ",
					"da onda · Kin ",
					todayKin
				]
			})
		]
	});
}
function useDFTDTState() {
	const now = /* @__PURE__ */ new Date();
	const m = now.getUTCMonth();
	const d = now.getUTCDate();
	const isDFTDT = m === 6 && d === 25;
	const isNewCycle = m === 6 && d === 26;
	const y = now.getUTCFullYear();
	let next = new Date(Date.UTC(y, 6, 25));
	if (now > next) next = new Date(Date.UTC(y + 1, 6, 25));
	return {
		isDFTDT,
		isNewCycle,
		daysUntil: Math.ceil((next.getTime() - now.getTime()) / 864e5)
	};
}
var moods = [
	{
		key: "calmo",
		icon: "clear_night",
		label: "Calmo",
		activeBg: "bg-cosmic-blue/15",
		activeBorder: "border-cosmic-blue/60",
		activeText: "text-cosmic-blue",
		activeGlow: "shadow-[0_0_20px_rgba(168,199,255,0.25)]",
		dot: "bg-cosmic-blue"
	},
	{
		key: "presente",
		icon: "self_improvement",
		label: "Presente",
		activeBg: "bg-astral-violet/15",
		activeBorder: "border-astral-violet/60",
		activeText: "text-astral-violet",
		activeGlow: "shadow-[0_0_20px_rgba(188,155,255,0.25)]",
		dot: "bg-astral-violet"
	},
	{
		key: "fluido",
		icon: "waves",
		label: "Fluido",
		activeBg: "bg-cosmic-blue/10",
		activeBorder: "border-cosmic-blue/50",
		activeText: "text-cosmic-blue",
		activeGlow: "shadow-[0_0_20px_rgba(168,199,255,0.2)]",
		dot: "bg-cosmic-blue"
	},
	{
		key: "vibrante",
		icon: "bolt",
		label: "Vibrante",
		activeBg: "bg-ritual-gold/12",
		activeBorder: "border-ritual-gold/55",
		activeText: "text-ritual-gold",
		activeGlow: "shadow-[0_0_20px_rgba(255,214,113,0.2)]",
		dot: "bg-ritual-gold"
	},
	{
		key: "reflexivo",
		icon: "cloud",
		label: "Reflexivo",
		activeBg: "bg-white/8",
		activeBorder: "border-white/30",
		activeText: "text-muted-stardust",
		activeGlow: "shadow-[0_0_20px_rgba(200,200,220,0.15)]",
		dot: "bg-muted-stardust"
	}
];
var WEEK_DAYS = [
	"Seg",
	"Ter",
	"Qua",
	"Qui",
	"Sex",
	"Sáb",
	"Dom"
];
function WeekProgress({ mood }) {
	const today = ((/* @__PURE__ */ new Date()).getUTCDay() + 6) % 7;
	const registered = mood !== null;
	const pct = Math.round((today + (registered ? 1 : .5)) / 7 * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-card rounded-3xl p-6 space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-headline-lg-mobile text-base text-ethereal-white",
					children: "Progresso da Jornada"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-label-sm text-label-sm text-muted-stardust mt-0.5",
					children: "Seu ritmo espiritual nesta semana"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-serif text-3xl text-astral-violet leading-none",
					children: [pct, "%"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-1.5 w-full bg-surface-container rounded-full overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full shadow-[0_0_10px_rgba(188,155,255,0.4)] transition-all duration-700",
					style: {
						width: `${pct}%`,
						background: "linear-gradient(to right, #A8C7FF, #BC9BFF)"
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-7 gap-1",
				children: WEEK_DAYS.map((d, i) => {
					const isPast = i < today;
					const isToday = i === today;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `w-2 h-2 rounded-full transition-all ${isToday ? registered ? "bg-astral-violet shadow-[0_0_8px_rgba(188,155,255,0.9)]" : "bg-cosmic-blue shadow-[0_0_8px_rgba(168,199,255,0.6)]" : isPast ? "bg-cosmic-blue/60" : "bg-muted-stardust/30"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `font-label-sm text-[10px] uppercase ${isToday ? "text-astral-violet font-bold" : i > today ? "text-muted-stardust/40" : "text-muted-stardust"}`,
							children: d
						})]
					}, d);
				})
			})
		]
	});
}
function HojePage() {
	const { user, loading } = useAuth();
	const qc = useQueryClient();
	const { isDFTDT, isNewCycle, daysUntil } = useDFTDTState();
	const todayKin = (0, import_react.useMemo)(() => getTodayKinInfo(), []);
	const cubeToday = (0, import_react.useMemo)(() => {
		const s = sincronarioDate(/* @__PURE__ */ new Date());
		return s.dayOutOfTime ? null : cubeDayOfMoon(s.day);
	}, []);
	const fnGetMood = useServerFn(getTodayMood);
	const fnSetMood = useServerFn(setTodayMood);
	const fnListEntries = useServerFn(listEntries);
	const fnAddEntry = useServerFn(addEntry);
	const [localToday, setLocalToday] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const d = /* @__PURE__ */ new Date();
		setLocalToday(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
	}, []);
	const moodQuery = useQuery({
		queryKey: ["todayMood", localToday],
		queryFn: () => fnGetMood({ data: { date: localToday } }),
		enabled: !!user
	});
	const entriesQuery = useQuery({
		queryKey: ["entries", "preview"],
		queryFn: () => fnListEntries({ data: { limit: 2 } }),
		enabled: !!user
	});
	const mood = moodQuery.data?.mood ?? null;
	const [showJournal, setShowJournal] = (0, import_react.useState)(false);
	const [showVideo, setShowVideo] = (0, import_react.useState)(false);
	const [journalText, setJournalText] = (0, import_react.useState)("");
	const [showColoring, setShowColoring] = (0, import_react.useState)(false);
	const [paintedSeal, setPaintedSeal] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const stored = localStorage.getItem(SEAL_STORAGE_KEY(todayKin.seal.index));
		setPaintedSeal(stored ?? null);
	}, [todayKin.seal.index]);
	const moodMutation = useMutation({
		mutationFn: (m) => fnSetMood({ data: {
			mood: m,
			date: localToday
		} }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["todayMood"] }),
		onError: (e) => toast.error(e.message)
	});
	const addMutation = useMutation({
		mutationFn: () => fnAddEntry({ data: {
			kind: "reflexao",
			content: journalText.trim(),
			entry_date: localToday
		} }),
		onSuccess: () => {
			setJournalText("");
			setShowJournal(false);
			toast.success("Registro salvo na sua jornada.");
			qc.invalidateQueries({ queryKey: ["entries"] });
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pt-24 pb-32 px-container-margin max-w-[720px] mx-auto min-h-screen relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-section-gap",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-[2rem] leading-tight mb-2 text-ethereal-white",
						children: user ? "Bem-vindo de volta." : "Bem-vindo à RAPPAA."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-on-surface-variant font-body-md mb-6",
						children: user ? "Sintonize-se com o ritmo universal." : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							className: "text-astral-violet underline decoration-ritual-gold/40 underline-offset-4 hover:text-ritual-gold transition-colors",
							children: "Entre"
						}), " para registrar sua energia e retomar sua jornada."] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-label-sm text-label-sm text-astral-violet uppercase tracking-widest",
							children: "Como você se sente?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-stardust/60 mt-0.5",
							children: mood ? "Sua energia de hoje está registrada" : "Escolha a energia que define o seu dia"
						})] }), mood && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-astral-violet/70 flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "material-symbols-outlined text-[14px]",
								style: { fontVariationSettings: "'FILL' 1" },
								children: "check_circle"
							}), "Registrado"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2.5",
						children: moods.map((m) => {
							const active = mood === m.key;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								disabled: !user || moodMutation.isPending,
								onClick: () => moodMutation.mutate(m.key),
								"aria-pressed": active,
								className: `group relative flex items-center gap-2.5 px-4 py-3 rounded-2xl border transition-all duration-200 active:scale-95 disabled:opacity-40 select-none ${active ? `${m.activeBg} ${m.activeBorder} ${m.activeGlow}` : "bg-white/3 border-white/8 hover:bg-white/7 hover:border-white/18"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `material-symbols-outlined text-[20px] transition-all duration-200 ${active ? m.activeText : "text-muted-stardust/50 group-hover:text-muted-stardust"}`,
										style: { fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" },
										children: m.icon
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-[13px] font-medium tracking-wide transition-colors duration-200 ${active ? m.activeText : "text-muted-stardust/70 group-hover:text-on-surface-variant"}`,
										children: m.label
									}),
									active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1.5 h-1.5 rounded-full ${m.dot} ml-0.5 shadow-[0_0_6px_currentColor]` })
								]
							}, m.key);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setShowVideo(true),
						className: "mt-4 w-full flex items-center gap-3 rounded-2xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-on-surface-variant transition-all hover:bg-surface-container-high hover:text-on-surface",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "material-symbols-outlined text-[24px] text-primary",
								children: "play_circle"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-label-lg",
								children: "Assista à apresentação da RAPPAA"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "material-symbols-outlined ml-auto text-[18px]",
								children: "play_arrow"
							})
						]
					}),
					showVideo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "fixed inset-0 z-50 flex items-center justify-center p-4",
						role: "dialog",
						"aria-modal": "true",
						"aria-label": "Apresentação da RAPPAA",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "absolute inset-0 bg-black/80 backdrop-blur-sm",
							onClick: () => setShowVideo(false),
							"aria-label": "Fechar vídeo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-full max-w-3xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
								src: "/videos/apresentacao-rapa.mp4",
								controls: true,
								autoPlay: true,
								playsInline: true,
								className: "w-full rounded-2xl shadow-2xl bg-black"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowVideo(false),
								className: "absolute -top-12 right-0 w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors",
								"aria-label": "Fechar",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "material-symbols-outlined",
									children: "close"
								})
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mb-section-gap",
				children: showJournal ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-card rounded-3xl p-4 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: journalText,
						onChange: (e) => setJournalText(e.target.value),
						autoFocus: true,
						rows: 4,
						placeholder: "O que quer registrar sobre hoje?",
						className: "w-full bg-transparent focus:outline-none resize-none font-body-md"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowJournal(false),
							className: "btn-ghost",
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => addMutation.mutate(),
							disabled: !journalText.trim() || addMutation.isPending,
							className: "px-5 py-2 rounded-full gradient-ritual font-semibold disabled:opacity-50",
							children: addMutation.isPending ? "Salvando…" : "Salvar"
						})]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						disabled: !user,
						onClick: () => setShowJournal(true),
						className: "flex-1 gradient-ritual py-5 px-8 rounded-full font-title-md text-title-md flex items-center justify-center gap-3 active:scale-[0.98] transition-transform shadow-lg shadow-astral-violet/20 disabled:opacity-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined",
							style: { fontVariationSettings: "'FILL' 1" },
							children: "edit_note"
						}), "Registrar hoje"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/jornada",
						"aria-label": "Registrar em outro dia",
						className: "aspect-square py-5 px-4 gradient-ritual rounded-full flex items-center justify-center active:scale-[0.98] transition-transform shadow-lg shadow-astral-violet/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined",
							style: { fontVariationSettings: "'FILL' 1" },
							children: "calendar_month"
						})
					})]
				})
			}),
			(isDFTDT || isNewCycle || daysUntil <= 7) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mb-section-gap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/dia-fora-do-tempo",
					className: "group relative overflow-hidden rounded-2xl glass-panel block p-1 cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-ritual-gold/20 via-transparent to-astral-violet/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative p-6 flex flex-col gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ritual-gold/10 border border-ritual-gold/20 text-ritual-gold font-label-sm text-label-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "material-symbols-outlined text-[14px]",
										children: "hourglass_empty"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										suppressHydrationWarning: true,
										children: isDFTDT ? "HOJE" : isNewCycle ? "AGORA" : `EM ${daysUntil} DIA${daysUntil === 1 ? "" : "S"}`
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-serif text-2xl text-ethereal-white pt-1",
									suppressHydrationWarning: true,
									children: isDFTDT ? "Dia Fora do Tempo" : isNewCycle ? "O novo ciclo começou" : "Dia Fora do Tempo"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform mt-1",
								children: "chevron_right"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-body-md text-body-md text-on-surface-variant",
							suppressHydrationWarning: true,
							children: isDFTDT ? "O espaço entre dois ciclos — 7 portais de reflexão." : isNewCycle ? "Veja suas intenções para este ciclo galáctico." : "Prepare-se para a travessia de ciclo. Um momento de pausa e realinhamento cósmico."
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mb-section-gap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-card rounded-3xl p-6 relative overflow-hidden border-l-4 border-l-cosmic-blue/60",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute top-0 right-0 -mt-8 -mr-8 opacity-10 pointer-events-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "material-symbols-outlined text-[160px] text-cosmic-blue",
								children: "cyclone"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 mb-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setShowColoring(true),
									className: "relative group shrink-0 rounded-full active:scale-95 transition-transform",
									title: "Pintar este selo",
									"aria-label": "Abrir editor de pintura do selo",
									children: [paintedSeal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: paintedSeal,
										alt: todayKin.seal.name,
										className: "w-14 h-14 rounded-full object-cover border-2 border-cosmic-blue/50"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KinBadge, {
										kin: todayKin.kin,
										size: 56,
										pulse: true,
										eager: true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "material-symbols-outlined text-[20px] text-white",
											style: { fontVariationSettings: "'FILL' 1" },
											children: "brush"
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-label-sm text-label-sm text-muted-stardust uppercase tracking-widest",
										children: ["Ciclo do Dia", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "normal-case tracking-normal",
											children: [" · ", (/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR", {
												timeZone: "UTC",
												day: "numeric",
												month: "short"
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/ciclos/kin/$kin",
										params: { kin: String(todayKin.kin) },
										className: "block font-serif text-xl text-cosmic-blue hover:opacity-80 transition-opacity truncate",
										children: [
											"Kin ",
											todayKin.kin,
											": ",
											todayKin.fullName
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setShowColoring(true),
									className: "shrink-0 flex flex-col items-center gap-0.5 px-2 py-2 rounded-2xl border border-white/10 hover:border-astral-violet/40 hover:bg-astral-violet/8 transition-all active:scale-95",
									title: "Pintar o selo de hoje",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "material-symbols-outlined text-[20px] text-muted-stardust",
										style: { fontVariationSettings: "'FILL' 1" },
										children: "brush"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] text-muted-stardust/60 uppercase tracking-wide leading-none",
										children: "Pintar"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-on-surface-variant font-body-md leading-relaxed mb-4 relative z-10 italic",
							children: [
								"\"A energia de hoje convida a ",
								todayKin.seal.action.toLowerCase(),
								" através de ",
								todayKin.seal.power.toLowerCase(),
								", no tom ",
								todayKin.tone.name.toLowerCase(),
								" de ",
								todayKin.tone.essence.toLowerCase(),
								".\""
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "chip-blue px-3 py-1 rounded-full text-xs font-medium",
									children: todayKin.seal.action
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "chip-violet px-3 py-1 rounded-full text-xs font-medium",
									children: todayKin.seal.power
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "chip-gold px-3 py-1 rounded-full text-xs font-medium",
									children: todayKin.tone.essence
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "onda-encantada",
				className: "mb-section-gap scroll-mt-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WavespellCard, {})
			}),
			user && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mb-section-gap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeekProgress, { mood })
			}),
			cubeToday && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mb-section-gap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/ciclos",
					className: "glass-card rounded-3xl p-5 flex items-start gap-4 border border-transparent hover:border-primary transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "material-symbols-outlined text-primary text-[40px] flex-shrink-0",
						style: { fontVariationSettings: "'FILL' 1" },
						children: "deployed_code"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-label-sm text-label-sm text-primary uppercase tracking-widest",
								children: ["Pátron Cúbico · Cubo ", cubeToday.phase === "chumbo" ? "do Chumbo" : "do Ouro"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-title-md text-title-md mt-1",
								children: [
									cubeToday.index,
									". ",
									cubeToday.codon,
									" — ",
									cubeToday.action
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-body-sm text-on-surface-variant italic mt-1",
								children: [
									"\"",
									cubeToday.focus,
									"\""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-label-sm text-label-sm text-on-surface-variant/60 mt-1",
								children: [
									"Face ",
									cubeToday.face,
									" · dia ",
									cubeToday.moonDay,
									" da Lua"
								]
							})
						]
					})]
				})
			}),
			user && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-end mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-title-md text-title-md",
						children: "Minha Jornada"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/jornada",
						className: "font-label-sm text-label-sm text-primary flex items-center gap-1",
						children: ["Ver tudo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined text-sm",
							children: "arrow_forward"
						})]
					})]
				}), entriesQuery.data?.entries.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-4",
					children: entriesQuery.data.entries.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-card rounded-3xl p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-label-sm text-[10px] text-primary uppercase tracking-widest",
							children: [
								(/* @__PURE__ */ new Date(e.entry_date + "T00:00:00")).toLocaleDateString("pt-BR", {
									day: "numeric",
									month: "short"
								}),
								" · ",
								e.kind
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-body-md mt-2 line-clamp-4",
							children: e.title ?? e.content
						})]
					}, e.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-on-surface-variant text-sm",
					children: "Nenhum registro ainda. Comece por \"Registrar hoje\" acima."
				})]
			}),
			showColoring && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SealColoringModal, {
				kinInfo: todayKin,
				onClose: () => setShowColoring(false),
				onSaved: (dataUrl) => {
					setPaintedSeal(dataUrl);
					setShowColoring(false);
				}
			})
		]
	});
}
//#endregion
export { HojePage as component };
