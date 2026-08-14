import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { d as Link, f as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-CynC6nuD.mjs";
import { n as useAuth } from "./use-auth-C250R4UH.mjs";
import { S as plasmaOfDay, T as sincronarioDate, c as TONES, f as cubeDayOfMoon, g as getKinInfo, h as getEarthFamily, i as PLASMAS, l as TONE_DETAILS, m as getCastleOfKin, n as CUBE_DAYS, o as SEALS, r as EARTH_FAMILIES, s as SEAL_DETAILS, t as CASTLE_DETAILS, y as kinFromDate } from "./tzolkin-CeuRSgpU.mjs";
import { t as SEAL_IMAGE } from "./seal-images-Bln5NZxW.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as PlasmaSymbol } from "./PlasmaSymbol-CQiqqWdH.mjs";
import { t as DailyFlowCards } from "./DailyRitualModal-D3cuP0WX.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ciclos-FqMv39zR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Símbolo do tom galáctico no estilo numeral maia (Dreamspell):
* 1-4 pontos, 5-9 barra(s) + pontos, 10-13 duas barras + pontos.
*/
function ToneSymbol({ tone, size = 24, className }) {
	const t = (tone - 1) % 13 + 1;
	const bars = Math.floor(t / 5);
	const dots = t % 5;
	const elements = [];
	const barW = 18;
	const barH = 3.5;
	const dotR = 3.2;
	const gap = 3.5;
	let y = 2;
	if (dots === 4) {
		[
			{
				cx: 8,
				cy: 6
			},
			{
				cx: 16,
				cy: 6
			},
			{
				cx: 8,
				cy: 13
			},
			{
				cx: 16,
				cy: 13
			}
		].forEach((p, i) => elements.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: p.cx,
			cy: p.cy,
			r: dotR,
			className: "fill-current"
		}, `d${i}`)));
		y = 17;
	} else if (dots > 0) {
		const startX = (24 - (dots * dotR * 2 + (dots - 1) * gap)) / 2 + dotR;
		for (let i = 0; i < dots; i++) elements.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: startX + i * 9.9,
			cy: y + dotR,
			r: dotR,
			className: "fill-current"
		}, `d${i}`));
		y += 9.9;
	}
	if (bars > 0 && dots > 0) y += gap;
	for (let i = 0; i < bars; i++) elements.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		x: 6 / 2,
		y: y + i * 7,
		width: barW,
		height: barH,
		rx: 1.5,
		className: "fill-current"
	}, `b${i}`));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		className: cn("inline-block", className),
		"aria-label": `Tom ${t}`,
		role: "img",
		children: elements
	});
}
var COLOR_CLASS = {
	vermelho: {
		text: "text-error",
		bg: "bg-error",
		border: "border-error/40",
		ring: "ring-error"
	},
	branco: {
		text: "text-on-surface",
		bg: "bg-on-surface",
		border: "border-on-surface/40",
		ring: "ring-on-surface"
	},
	azul: {
		text: "text-primary",
		bg: "bg-primary",
		border: "border-primary/40",
		ring: "ring-primary"
	},
	amarelo: {
		text: "text-tertiary",
		bg: "bg-tertiary",
		border: "border-tertiary/40",
		ring: "ring-tertiary"
	}
};
var PORTAL_KINS = /* @__PURE__ */ new Set([
	1,
	20,
	22,
	39,
	43,
	50,
	51,
	58,
	64,
	69,
	72,
	77,
	85,
	88,
	93,
	96,
	106,
	107,
	108,
	109,
	110,
	111,
	112,
	113,
	114,
	115,
	146,
	147,
	148,
	149,
	150,
	151,
	152,
	153,
	154,
	155,
	165,
	168,
	173,
	176,
	184,
	189,
	192,
	197,
	203,
	210,
	211,
	218,
	222,
	239,
	241,
	260
]);
var TABS = [
	{
		id: "matriz",
		label: "Matriz",
		icon: "grid_view"
	},
	{
		id: "selos",
		label: "Selos",
		icon: "brightness_5"
	},
	{
		id: "tons",
		label: "Tons",
		icon: "waves"
	},
	{
		id: "ciclos",
		label: "Ciclos",
		icon: "hub"
	},
	{
		id: "plasmas",
		label: "Plasmas",
		icon: "auto_awesome"
	}
];
function CiclosPage() {
	const today = (0, import_react.useMemo)(() => kinFromDate(/* @__PURE__ */ new Date()), []);
	const info = (0, import_react.useMemo)(() => getKinInfo(today), [today]);
	const colors = COLOR_CLASS[info.seal.color];
	const navigate = useNavigate();
	const [tab, setTab] = (0, import_react.useState)("matriz");
	const tabBarRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const bar = tabBarRef.current;
		if (!bar) return;
		bar.querySelector(`[data-tab="${tab}"]`)?.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
			inline: "center"
		});
	}, [tab]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pt-20 pb-32 min-h-screen relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 texture-overlay z-[-1]",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky top-[56px] z-30 bg-surface/90 backdrop-blur border-b border-on-surface/8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: tabBarRef,
					className: "flex overflow-x-auto justify-center px-4 gap-1",
					style: { scrollbarWidth: "none" },
					children: TABS.map(({ id, label, icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						"data-tab": id,
						type: "button",
						onClick: () => setTab(id),
						className: ["flex items-center gap-1.5 px-3 py-3 whitespace-nowrap font-label-sm text-label-sm border-b-2 transition-colors flex-shrink-0", tab === id ? "border-primary text-primary" : "border-transparent text-on-surface-variant hover:text-on-surface"].join(" "),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined text-base",
							style: { fontVariationSettings: tab === id ? "'FILL' 1" : "'FILL' 0" },
							children: icon
						}), label]
					}, id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-container-margin max-w-[720px] mx-auto pt-6",
				children: [
					tab === "matriz" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-headline-lg text-headline-lg text-on-surface mb-1",
								children: "Estudo de Ciclos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-body-md text-on-surface-variant opacity-80",
								children: "Toque um Kin da matriz para abrir a leitura completa."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass-panel p-4 rounded-3xl shadow-2xl relative overflow-hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center mb-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-label-sm text-label-sm text-primary tracking-widest uppercase",
											children: "Módulo 13:20"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => navigate({
														to: "/ciclos/kin/$kin",
														params: { kin: String((today - 2 + 260) % 260 + 1) }
													}),
													className: "w-7 h-7 rounded-full border border-outline-variant/40 flex items-center justify-center hover:bg-surface-container-low transition-colors",
													"aria-label": "Kin anterior",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "material-symbols-outlined text-base",
														children: "chevron_left"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
													to: "/ciclos/kin/$kin",
													params: { kin: String(today) },
													className: "font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors px-1",
													children: [
														"Kin de hoje: ",
														today,
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															suppressHydrationWarning: true,
															children: [" · ", (/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR", {
																day: "numeric",
																month: "short"
															})]
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => navigate({
														to: "/ciclos/kin/$kin",
														params: { kin: String(today % 260 + 1) }
													}),
													className: "w-7 h-7 rounded-full border border-outline-variant/40 flex items-center justify-center hover:bg-surface-container-low transition-colors",
													"aria-label": "Próximo Kin",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "material-symbols-outlined text-base",
														children: "chevron_right"
													})
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "tzolkin-matrix mb-2",
										children: SEALS.map((seal) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "tz-seal",
											title: `${seal.index}. ${seal.name}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: SEAL_IMAGE[seal.index],
												alt: seal.name,
												className: "w-full h-full object-contain",
												loading: "lazy"
											})
										}), Array.from({ length: 13 }, (_, i) => {
											const kin = seal.index + i * 20;
											const tone = (kin - 1) % 13 + 1;
											const isPortal = PORTAL_KINS.has(kin);
											const isToday = kin === today;
											const cls = [
												"tz-cell",
												isPortal ? "tz-portal" : `tz-${seal.color}`,
												isToday ? "tz-active" : ""
											].filter(Boolean).join(" ");
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												"aria-label": `Kin ${kin} — Tom ${tone} ${seal.name}`,
												onClick: () => navigate({
													to: "/ciclos/kin/$kin",
													params: { kin: String(kin) }
												}),
												className: cls,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToneSymbol, { tone }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "tz-num",
													children: kin
												})]
											}, kin);
										})] }, seal.index))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between mt-4 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-label-sm text-label-sm text-on-surface-variant/60 italic",
											children: [
												info.castle.name,
												" · Kin ",
												(info.castle.index - 1) * 52 + 1,
												"–",
												info.castle.index * 52
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-3 items-center text-label-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1 text-on-surface-variant/70",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-error inline-block" }), " hoje"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1 text-on-surface-variant/70",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-primary/40 inline-block" }), " portal"]
											})]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/ciclos/kin/$kin",
								params: { kin: String(today) },
								className: "block glass-panel rounded-3xl p-6 hover:border-primary transition-colors border border-transparent",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "w-16 h-16 relative flex-shrink-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute inset-0 ${colors.bg} rounded-full blur-lg opacity-30 soft-pulse` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `relative w-full h-full border-2 ${colors.border} rounded-full flex items-center justify-center p-2`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: SEAL_IMAGE[info.seal.index],
													alt: info.seal.name,
													className: "w-full h-full object-contain"
												})
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: `font-label-sm text-label-sm ${colors.text} tracking-widest`,
													suppressHydrationWarning: true,
													children: [
														"KIN ",
														info.kin,
														" · HOJE · ",
														(/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR", {
															day: "numeric",
															month: "short"
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-title-lg text-title-lg text-on-surface",
													children: info.fullName
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-body-sm text-on-surface-variant italic",
													children: "Toque para abrir a leitura completa"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "material-symbols-outlined text-on-surface-variant",
											children: "chevron_right"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-center font-label-sm text-label-sm text-on-surface-variant/60",
								children: [
									SEALS.length,
									" selos × ",
									TONES.length,
									" tons = 260 Kins · Sincronário 13:20"
								]
							})
						]
					}),
					tab === "selos" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SealsSection, { todaySealIndex: info.seal.index }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EarthFamiliesSection, { todaySealIndex: info.seal.index })] }),
					tab === "tons" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TonesSection, { todayToneIndex: info.tone.index }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CubicPatternSection, {})] }),
					tab === "ciclos" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-body-md text-on-surface-variant/80",
								children: [
									"O ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Tzolkin" }),
									" é um calendário sagrado maia de 260 dias — a matriz do tempo natural que a tradição do Sincronário 13:20 (Dreamspell / José Argüelles) recupera como um instrumento vivo de sincronicidade. Cada Kin é um pulso único de consciência."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyCard, {
										icon: "grid_view",
										title: "Matriz de 260 Kins",
										body: "20 selos solares × 13 tons galácticos geram 260 combinações irrepetíveis. Cada Kin é uma assinatura arquetípica do tempo — um dia, uma pessoa, um evento."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyCard, {
										icon: "waves",
										title: "Onda Encantada · Trecena",
										body: "Ciclo de 13 dias que começa em um selo com tom Magnético e completa uma jornada arquetípica. Cada Kin vive dentro de uma Onda — o contexto energético de 13 dias que dá sentido ao dia presente."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyCard, {
										icon: "hub",
										title: "Oráculo dos 5 Kins",
										body: "Cada Kin se relaciona com quatro outros: Guia (orienta), Analógico (apoia), Antípoda (desafia), Oculto (potência escondida — kin + oculto = 261). Juntos formam a Prancha do Destino do dia."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyCard, {
										icon: "auto_awesome",
										title: "52 Portais Galácticos",
										body: "Kins de ativação galáctica: dias em que o véu entre dimensões se afina. Aparecem em cinza-claro na matriz e convidam a rituais, sonhos lúcidos e escuta profunda."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyCard, {
										icon: "event",
										title: "Ano Galáctico · 26 de julho",
										body: "O ano do Sincronário começa em 26/07 (Kin do Ano) e é dividido em 13 luas de 28 dias + o Dia Fora do Tempo (25/07). O 29/02 é ignorado — o tempo Dreamspell é 13:20, não gregoriano."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CastlesSection, { todayKin: today }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass-panel rounded-2xl p-5 border border-primary/20",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-label-sm text-label-sm mb-1 uppercase tracking-widest text-primary",
										children: "Como usar no dia a dia"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-body-sm text-on-surface-variant/70 mb-4",
										children: "Um ritual simples de poucos minutos — da manhã à noite."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DailyFlowCards, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-body-sm text-on-surface-variant/70 mt-4 pt-3 border-t border-primary/10 flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "material-symbols-outlined text-primary text-base flex-shrink-0",
											style: { fontVariationSettings: "'FILL' 1" },
											children: "auto_awesome"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											"Em dias de ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Portal Galáctico" }),
											", reserve um momento a mais de silêncio — são dias de escuta profunda."
										] })]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-3 text-label-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://tzolkin.io/",
									target: "_blank",
									rel: "noreferrer",
									className: "inline-flex items-center gap-2 px-3 py-2 rounded-full border border-on-surface-variant/30 hover:border-primary hover:text-primary transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "material-symbols-outlined text-base",
										children: "open_in_new"
									}), "tzolkin.io"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://sincronariodapaz.org/",
									target: "_blank",
									rel: "noreferrer",
									className: "inline-flex items-center gap-2 px-3 py-2 rounded-full border border-on-surface-variant/30 hover:border-primary hover:text-primary transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "material-symbols-outlined text-base",
										children: "open_in_new"
									}), "sincronariodapaz.org"]
								})]
							})
						]
					}),
					tab === "plasmas" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlasmasSection, {})
				]
			})
		]
	});
}
function StudyCard({ icon, title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-panel rounded-2xl p-4 flex gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "material-symbols-outlined text-primary flex-shrink-0",
			style: { fontVariationSettings: "'FILL' 1" },
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-title-sm text-title-sm text-on-surface mb-1",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-body-sm text-on-surface-variant/80",
			children: body
		})] })]
	});
}
function SealsSection({ todaySealIndex }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "material-symbols-outlined text-primary",
					children: "pets"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-title-lg text-title-lg text-on-surface",
					children: "Os 20 Selos Solares"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-body-sm text-on-surface-variant/80 mb-4",
				children: "Arquétipos-força do cosmos (Dragão, Vento, Noite… Sol). Cada selo carrega uma ação, uma essência e um poder. Agrupam-se em 4 famílias de cor: vermelho (iniciar), branco (refinar), azul (transformar), amarelo (amadurecer)."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
				children: SEALS.map((seal) => {
					const d = SEAL_DETAILS[seal.index];
					const c = COLOR_CLASS[seal.color];
					const firstKin = seal.index;
					const isToday = seal.index === todaySealIndex;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/ciclos/kin/$kin",
						params: { kin: String(firstKin) },
						className: `group glass-panel rounded-xl p-4 border transition-all hover:border-primary ${isToday ? "border-primary" : "border-transparent"}`,
						title: `${seal.name} — ${seal.action}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `w-12 h-12 rounded-full border-2 ${c.border} flex items-center justify-center bg-surface/40 flex-shrink-0 p-1.5 group-hover:scale-105 transition-transform`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: SEAL_IMAGE[seal.index],
									alt: seal.name,
									className: "w-full h-full object-contain",
									loading: "lazy",
									decoding: "async"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-title-sm text-title-sm text-on-surface",
										children: [
											seal.name,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-on-surface-variant font-normal",
												children: ["· ", seal.maya]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-label-sm text-label-sm text-on-surface-variant/70 mb-1",
										children: [
											seal.action,
											" · ",
											seal.essence,
											" · ",
											seal.power
										]
									}),
									d && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-body-sm text-on-surface-variant/90 line-clamp-3",
										children: d.description
									})
								]
							})]
						})
					}, seal.index);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-label-sm text-label-sm text-on-surface-variant/60 mt-3 text-center italic",
				children: ["Arte dos selos: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "https://tzolkin.io",
					target: "_blank",
					rel: "noreferrer",
					className: "underline hover:text-primary",
					children: "tzolkin.io"
				})]
			})
		]
	});
}
function TonesSection({ todayToneIndex }) {
	const [open, setOpen] = (0, import_react.useState)(todayToneIndex);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "material-symbols-outlined text-primary",
					children: "graphic_eq"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-title-lg text-title-lg text-on-surface",
					children: "Os 13 Tons Galácticos"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-body-sm text-on-surface-variant/90 mb-2",
				children: "Pulsações de criação (Magnético → Cósmico) que ditam o ritmo da manifestação: propósito, desafio, ativação, forma, radiância, equilíbrio, sintonização, harmonia, intenção, manifestação, libertação, cooperação, transcendência."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-body-sm text-on-surface-variant/80 mb-4",
				children: "Cada tom é uma vibração que modela o fluxo do dia. O tom de hoje aparece destacado — toque para abrir a descrição completa."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2",
				children: TONES.map((t) => {
					const d = TONE_DETAILS[t.index];
					const isToday = t.index === todayToneIndex;
					const isOpen = open === t.index;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `glass-panel rounded-xl overflow-hidden border ${isToday ? "border-primary" : "border-transparent"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setOpen(isOpen ? null : t.index),
							className: "w-full flex items-center gap-3 p-3 text-left hover:bg-surface/40 transition",
							"aria-expanded": isOpen,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-10 h-10 rounded-full border-2 border-primary/40 flex items-center justify-center font-title-sm bg-surface/40 flex-shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToneSymbol, {
										tone: t.index,
										size: 20,
										className: "text-primary"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-title-sm text-title-sm text-on-surface",
										children: [
											t.name,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-on-surface-variant font-normal",
												children: ["· ", t.maya]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-label-sm text-label-sm text-on-surface-variant/70 truncate",
										children: [
											t.action,
											" · ",
											t.essence,
											" · ",
											t.power
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "material-symbols-outlined text-on-surface-variant",
									children: isOpen ? "expand_less" : "expand_more"
								})
							]
						}), isOpen && d && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-4 pb-4 pt-1 border-t border-outline-variant/20",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-label-sm text-label-sm text-primary uppercase tracking-widest mb-1",
									children: d.vibration
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-body-md text-on-surface mb-2 italic",
									children: d.summary
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-body-sm text-on-surface-variant/90",
									children: d.guidance
								})
							]
						})]
					}, t.index);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-label-sm text-label-sm text-on-surface-variant/60 mt-3 text-center italic",
				children: "Fonte: EssênciaAlma — Modelando o Fluxo"
			})
		]
	});
}
function CubicPatternSection() {
	const s = sincronarioDate(/* @__PURE__ */ new Date());
	const activeToday = !s.dayOutOfTime ? cubeDayOfMoon(s.day) : null;
	const colorClass = {
		vermelho: "text-error border-error/40 bg-error/5",
		branco: "text-on-surface border-on-surface/40 bg-on-surface/5",
		azul: "text-primary border-primary/40 bg-primary/5",
		amarelo: "text-tertiary border-tertiary/40 bg-tertiary/5"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-8 mb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "material-symbols-outlined text-primary",
					children: "deployed_code"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-title-lg text-title-lg text-on-surface",
					children: "Pátron Cúbico Primário"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-body-sm text-on-surface-variant/80 mb-4",
				children: [
					"Os 16 dias centrais de cada Lua (dia 9 ao 24) formam o ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Cubo da Lei" }),
					" — meditação Telektonon. Dias 9–16 constroem o ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Cubo do Chumbo" }),
					" (transmutação da matéria); dias 17–24 revelam o",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: " Cubo do Ouro" }),
					" (profecia da consciência). Cada dia carrega um códon-tema, uma face do cubo e uma pulsação."
				]
			}),
			activeToday && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `glass-panel rounded-2xl p-5 mb-4 border-2 ${colorClass[activeToday.color]}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-label-sm text-label-sm uppercase tracking-widest mb-1 opacity-80",
						children: [
							"Dia ",
							activeToday.moonDay,
							" da lua · Cubo ",
							activeToday.phase === "chumbo" ? "do Chumbo" : "do Ouro",
							" · Face ",
							activeToday.face
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-title-lg text-title-lg",
						children: [
							activeToday.index,
							". ",
							activeToday.codon,
							" — ",
							activeToday.action
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-body-md text-on-surface italic mt-2",
						children: [
							"\"",
							activeToday.focus,
							"\""
						]
					})
				]
			}),
			!activeToday && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "glass-panel rounded-2xl p-4 mb-4 border border-outline-variant/30",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-body-sm text-on-surface-variant",
					children: [
						"Hoje é dia ",
						s.dayOutOfTime ? "Fora do Tempo" : s.day,
						" — ",
						s.dayOutOfTime ? "descanso do Cubo" : "fora dos 16 dias do Cubo",
						". O Pátron desperta novamente no ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "dia 9" }),
						" da próxima Lua."
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2",
				children: CUBE_DAYS.map((c) => {
					const isToday = activeToday?.index === c.index;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `glass-panel rounded-xl p-3 border ${isToday ? "border-primary" : "border-transparent"} ${colorClass[c.color].split(" ").slice(-1)[0]}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `font-title-sm text-title-sm ${colorClass[c.color].split(" ")[0]}`,
									children: [
										c.index,
										". ",
										c.codon
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-label-sm text-label-sm text-on-surface-variant/60",
									children: ["L·", c.moonDay]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-label-sm text-label-sm text-on-surface-variant/80",
								children: [
									c.face,
									" · ",
									c.action
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-label-sm text-label-sm text-on-surface-variant/60 italic mt-1 line-clamp-2",
								children: c.focus
							})
						]
					}, c.index);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-label-sm text-label-sm text-on-surface-variant/60 mt-3 text-center italic",
				children: "Meditação do Telektonon · 16 códons do Cubo da Lei"
			})
		]
	});
}
function PlasmasSection() {
	const today = plasmaOfDay(/* @__PURE__ */ new Date());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "material-symbols-outlined text-primary",
					children: "blur_on"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-title-lg text-title-lg text-on-surface",
					children: "Plasmas Radiais"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-panel rounded-2xl p-4 mb-4 border border-outline-variant/30 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-body-sm text-on-surface-variant/90",
						children: [
							"Os 7 Plasmas Radiais vêm à Terra a partir de ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Hunab Ku" }),
							" — o centro da galáxia — e são reconhecidos também no magma do centro do planeta. A descoberta se dá em ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Ciência Cósmica" }),
							", de ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Enrique Castillo Rincón" }),
							" (1986), texto que chegou às mãos de ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "José Argüelles" }),
							" antes de ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "O Fator Maia" }),
							" e serviu como âncora ao livro."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-body-sm text-on-surface-variant/90",
						children: [
							"Na cosmologia dos PR, cada plasma deriva de ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "12 linhas eletrônicas de força" }),
							", formadas pela combinação de 2 dos ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "6 tipos de eletricidade cósmica primária" }),
							". Essas 12 linhas constituem o ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Pátron Cúbico Primário" }),
							" — a matriz elétrica que preenche o espaço interestelar em camadas ou estrias de plasma energético."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-body-sm text-on-surface-variant/90",
						children: [
							"Os símbolos dos 7 plasmas lembram os 7 dias da criação. Substituem em nós a 2ª e 3ª leis por partículas elétricas carregadas que ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "ativam nosso campo magnético" }),
							", potencializam os 7 chakras principais e realizam a transferência de carga do centro da Terra para o corpo. É a interrelação com o ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Budismo" }),
							" (livro de Padma Sambhava):",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1 font-title-sm text-primary",
								children: "Alegria + Amor = Apreço"
							}),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-body-sm text-on-surface-variant/90 italic",
						children: "Sentir as palavras a partir do coração, do sentir e do aplicar no dia a dia."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid sm:grid-cols-3 gap-2 mb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-panel rounded-xl p-3 border border-amarelo/30",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-label-sm text-label-sm uppercase tracking-widest text-tertiary mb-1",
								children: "Quantum Sensorial"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-title-sm text-title-sm text-on-surface",
								children: "Dali · Seli · Gamma"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-label-sm text-label-sm text-on-surface-variant/70 mt-1",
								children: "Os 3 primeiros: percepção pelos órgãos dos sentidos e conexão com a matéria."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-panel rounded-xl p-3 border border-primary/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-label-sm text-label-sm uppercase tracking-widest text-primary mb-1",
								children: "Catalisador"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-title-sm text-title-sm text-primary",
								children: "Kali (único azul)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-label-sm text-label-sm text-on-surface-variant/70 mt-1",
								children: "Liga os 3 primeiros aos 3 últimos — transmuta o quantum sensorial em telepático."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-panel rounded-xl p-3 border border-outline-variant/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-label-sm text-label-sm uppercase tracking-widest text-on-surface mb-1",
								children: "Quantum Telepático"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-title-sm text-title-sm text-on-surface",
								children: "Alpha · Limi · Silio"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-label-sm text-label-sm text-on-surface-variant/70 mt-1",
								children: "Recebemos e transmitimos informação mental independente dos sentidos físicos — silenciar os sentidos e deixar os \"outros\" agirem."
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-panel rounded-2xl p-5 mb-4 border border-primary/30",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-4 mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlasmaSymbol, {
							index: today.index,
							color: today.color,
							size: 64
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-label-sm text-label-sm text-primary uppercase tracking-widest mb-1",
									children: ["Plasma de hoje · ", today.day]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: `font-title-lg text-title-lg ${{
										vermelho: "text-error border-error/40",
										branco: "text-on-surface border-on-surface/40",
										azul: "text-primary border-primary/40",
										amarelo: "text-tertiary border-tertiary/40"
									}[today.color].split(" ")[0]}`,
									children: [
										today.name,
										" — ",
										today.action
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-body-sm text-on-surface-variant mt-1",
									children: today.chakraSanskrit ? `${today.chakra} · ${today.chakraSanskrit}` : today.chakra
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant/70 mb-1",
						children: "Qualidade"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-title-md text-title-md text-on-surface mb-2",
						children: today.quality
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant/70 mb-1",
						children: "Mantra"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-body-md text-on-surface italic mb-3",
						children: [
							"\"",
							today.mantra,
							"\""
						]
					}),
					today.essence && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-body-sm text-on-surface-variant/85 mb-3",
						children: today.essence
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2 text-label-sm text-on-surface-variant/80 mb-3",
						children: [
							today.mantraSolar && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "px-2 py-1 rounded-full bg-primary/20 text-primary font-mono tracking-widest",
								children: ["Mantra Solar · ", today.mantraSolar]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "px-2 py-1 rounded-full bg-surface-container-high",
								children: ["Chakra: ", today.chakra]
							}),
							today.chakraIdentity && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-2 py-1 rounded-full bg-surface-container-high",
								children: today.chakraIdentity
							}),
							today.element && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "px-2 py-1 rounded-full bg-surface-container-high",
								children: ["Elemento: ", today.element]
							}),
							today.frequency && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "px-2 py-1 rounded-full bg-surface-container-high",
								children: ["Freq.: ", today.frequency]
							})
						]
					}),
					(today.center || today.balance || today.governs || today.ageCycle) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 sm:grid-cols-2 text-sm text-on-surface-variant/85",
						children: [
							today.center && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: today.center }),
							today.balance && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: today.balance }),
							today.governs && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: today.governs }),
							today.ageCycle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Ciclo biográfico: ", today.ageCycle] })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2",
				children: PLASMAS.map((p) => {
					const isToday = p.index === today.index;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `glass-panel rounded-xl p-3 border ${isToday ? "border-primary" : "border-transparent"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlasmaSymbol, {
										index: p.index,
										color: p.color,
										size: 44
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "font-title-sm text-title-sm text-on-surface",
												children: [
													p.name,
													" · ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-on-surface-variant font-normal",
														children: p.quality
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "font-label-sm text-label-sm text-on-surface-variant/70",
												children: [
													p.day,
													" · ",
													p.chakraSanskrit ? `${p.chakra} (${p.chakraSanskrit})` : p.chakra
												]
											}),
											p.essence && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-label-sm text-label-sm text-on-surface-variant/60 mt-1",
												children: p.essence
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "font-body-sm text-on-surface/90 italic mt-2 sm:hidden",
												children: [
													"\"",
													p.mantra,
													"\""
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col items-end gap-1 shrink-0",
										children: [p.mantraSolar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-primary text-sm tracking-widest",
											children: p.mantraSolar
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-label-sm text-label-sm text-on-surface-variant/70 italic hidden sm:block max-w-[240px] text-right",
											children: [
												"\"",
												p.mantra,
												"\""
											]
										})]
									})
								]
							}),
							(p.chakraIdentity || p.element || p.ageCycle || p.frequency) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap gap-2 text-label-sm text-on-surface-variant/80",
								children: [
									p.chakraIdentity && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "px-2 py-1 rounded-full bg-surface-container-high",
										children: p.chakraIdentity
									}),
									p.element && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "px-2 py-1 rounded-full bg-surface-container-high",
										children: ["Elemento: ", p.element]
									}),
									p.frequency && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "px-2 py-1 rounded-full bg-surface-container-high",
										children: ["Freq.: ", p.frequency]
									}),
									p.ageCycle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "px-2 py-1 rounded-full bg-surface-container-high",
										children: p.ageCycle
									})
								]
							}),
							(p.center || p.balance || p.governs) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 space-y-1 text-sm text-on-surface-variant/85",
								children: [
									p.center && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p.center }),
									p.balance && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p.balance }),
									p.governs && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p.governs })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlasmaWordsEditor, {
								plasmaIndex: p.index,
								color: p.color
							})
						]
					}, p.index);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-panel rounded-2xl p-5 mt-4 border border-outline-variant/30",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined text-primary",
							children: "self_improvement"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
							className: "font-title-md text-title-md text-on-surface",
							children: "A prática semanal"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-body-sm text-on-surface-variant/90 mb-3",
						children: "No Sincronário da Paz cada dia é dedicado a um plasma. A ativação diária é uma preparação para a meditação do Kin:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "list-disc list-inside space-y-1 text-sm text-on-surface-variant/90 marker:text-primary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Recitar o mantra do plasma do dia." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Concentrar a atenção no chakra correspondente." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Visualizar sua cor." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Respirar profundamente." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Perceber o fluxo da energia entre o corpo e a Terra." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-panel rounded-2xl p-5 mt-4 border border-primary/30",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined text-primary",
							children: "hub"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
							className: "font-title-md text-title-md text-on-surface",
							children: "Correspondências avançadas"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-body-sm text-on-surface-variant/90 mb-3",
						children: [
							"Nas práticas do ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Telektonon" }),
							", ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Sincronotron" }),
							" e da ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Heptada" }),
							", os 7 Plasmas Radiais se articulam simultaneamente com múltiplas séries de 7 — a arquitetura simbólica desenvolvida por Valum Votan e Stephanie South:"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid sm:grid-cols-2 gap-2 text-sm text-on-surface-variant/85",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "• 7 Chakras principais" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "• 7 dias da semana" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "• 7 anos da Profecia" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "• 7 Bolontiku" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "• 7 Tons da Heptada" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "• 7 Selos ocultos" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "• Circuito dos elétrons mentais" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "• Tartaruga das Sete Placas" })
						]
					})
				]
			})
		]
	});
}
var wordsColor = {
	vermelho: "bg-error/15 text-error border-error/30",
	branco: "bg-on-surface/10 text-on-surface border-on-surface/30",
	azul: "bg-primary/15 text-primary border-primary/30",
	amarelo: "bg-tertiary/15 text-tertiary border-tertiary/30"
};
function PlasmaWordsEditor({ plasmaIndex, color }) {
	const { user } = useAuth();
	const qc = useQueryClient();
	const [draft, setDraft] = (0, import_react.useState)("");
	const { data: words = [] } = useQuery({
		queryKey: [
			"plasma_words",
			user?.id,
			plasmaIndex
		],
		enabled: !!user,
		queryFn: async () => {
			const { data, error } = await supabase.from("plasma_words").select("words").eq("user_id", user.id).eq("plasma_index", plasmaIndex).maybeSingle();
			if (error) throw error;
			return data?.words ?? [];
		}
	});
	const save = useMutation({
		mutationFn: async (next) => {
			const { error } = await supabase.from("plasma_words").upsert({
				user_id: user.id,
				plasma_index: plasmaIndex,
				words: next,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}, { onConflict: "user_id,plasma_index" });
			if (error) throw error;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: [
			"plasma_words",
			user?.id,
			plasmaIndex
		] })
	});
	if (!user) return null;
	const addWord = () => {
		const w = draft.trim();
		if (!w) return;
		if (words.includes(w)) {
			setDraft("");
			return;
		}
		const next = [...words, w].slice(0, 20);
		setDraft("");
		save.mutate(next);
	};
	const removeWord = (w) => {
		save.mutate(words.filter((x) => x !== w));
	};
	const onKey = (e) => {
		if (e.key === "Enter" || e.key === ",") {
			e.preventDefault();
			addWord();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 pt-3 border-t border-outline-variant/20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-1.5 mb-2 min-h-6",
			children: [words.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-label-sm text-label-sm text-on-surface-variant/50 italic",
				children: [
					"Suas palavras para ",
					PLASMAS[plasmaIndex - 1].name,
					"…"
				]
			}), words.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => removeWord(w),
				className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-label-sm ${wordsColor[color]} hover:opacity-70 transition`,
				title: "Remover",
				children: [w, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "material-symbols-outlined text-[14px] leading-none",
					children: "close"
				})]
			}, w))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "text",
				value: draft,
				onChange: (e) => setDraft(e.target.value),
				onKeyDown: onKey,
				placeholder: "ex: focaliza, ativa, flecha no alvo",
				maxLength: 40,
				className: "flex-1 bg-surface/60 border border-outline-variant/30 rounded-lg px-3 py-1.5 text-label-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: addWord,
				disabled: !draft.trim() || save.isPending,
				className: "px-3 py-1.5 rounded-lg bg-primary text-on-primary text-label-sm font-medium disabled:opacity-40",
				children: "Adicionar"
			})]
		})]
	});
}
function EarthFamiliesSection({ todaySealIndex }) {
	const todayFamily = getEarthFamily(todaySealIndex).index;
	const [open, setOpen] = (0, import_react.useState)(todayFamily);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-8 mb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "material-symbols-outlined text-primary",
					children: "groups"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-title-lg text-title-lg text-on-surface",
					children: "Famílias Planetárias (Terrestres)"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-body-sm text-on-surface-variant/80 mb-4",
				children: "Cada Família Planetária reúne 4 Selos Solares (um de cada cor) e forma uma região do Hólon Planetário — o corpo do planeta como ser vivo. Cinco famílias × quatro selos = os 20 arquétipos, articulados como membros de um mesmo corpo."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2",
				children: EARTH_FAMILIES.map((fam) => {
					const isToday = fam.index === todayFamily;
					const isOpen = open === fam.index;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `glass-panel rounded-xl overflow-hidden border ${isToday ? "border-primary" : "border-transparent"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setOpen(isOpen ? null : fam.index),
							className: "w-full flex items-center gap-3 p-3 text-left hover:bg-surface/40 transition",
							"aria-expanded": isOpen,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-10 h-10 rounded-full border-2 border-primary/40 flex items-center justify-center bg-surface/40 flex-shrink-0 text-primary font-semibold",
									children: fam.index
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-title-sm text-title-sm text-on-surface",
										children: fam.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-label-sm text-label-sm text-on-surface-variant/70 truncate",
										children: [
											fam.function,
											" · ",
											fam.bodyRegion
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "material-symbols-outlined text-on-surface-variant",
									children: isOpen ? "expand_less" : "expand_more"
								})
							]
						}), isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-4 pb-4 pt-1 border-t border-outline-variant/20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-body-md text-on-surface mb-3",
								children: fam.description
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2 mb-2",
								children: fam.seals.map((s) => {
									const seal = SEALS[s - 1];
									const c = COLOR_CLASS[seal.color];
									const isSelf = s === todaySealIndex;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/ciclos/kin/$kin",
										params: { kin: String(s) },
										className: `flex items-center gap-2 px-2 py-1 rounded-full border text-label-sm ${c.border} ${c.text} bg-surface/40 hover:border-primary ${isSelf ? "ring-1 ring-primary" : ""}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: SEAL_IMAGE[s],
											alt: seal.name,
											className: "w-5 h-5"
										}), seal.name]
									}, s);
								})
							})]
						})]
					}, fam.index);
				})
			})
		]
	});
}
function CastlesSection({ todayKin }) {
	const todayCastle = getCastleOfKin(todayKin).index;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-8 mb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "material-symbols-outlined text-primary",
					children: "castle"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-title-lg text-title-lg text-on-surface",
					children: "Os 5 Castelos do Destino"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-body-sm text-on-surface-variant/80 mb-4",
				children: "A matriz se divide em 5 castelos de 52 Kins (4 ondas cada): Vermelho do Girar (nascer), Branco do Cruzar (refinar), Azul do Queimar (transformar), Amarelo do Dar (amadurecer) e Verde do Encantar (sintetizar)."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
				children: [
					1,
					2,
					3,
					4,
					5
				].map((idx) => {
					const c = CASTLE_DETAILS[idx];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `glass-panel rounded-xl p-4 border transition-all hover:border-primary ${idx === todayCastle ? "border-primary" : "border-transparent"}`,
						title: `${c.name} — Kin ${c.kinRange[0]}–${c.kinRange[1]}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-12 h-12 rounded-xl border-2 border-primary/40 flex items-center justify-center bg-surface/40 flex-shrink-0 text-primary font-semibold",
								children: idx
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-title-sm text-title-sm text-on-surface",
										children: [
											c.name,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-on-surface-variant font-normal",
												children: ["· ", c.color]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-label-sm text-label-sm text-on-surface-variant/70 mb-1",
										children: [
											c.action,
											" · ",
											c.power,
											" · Kin ",
											c.kinRange[0],
											"–",
											c.kinRange[1]
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-body-sm text-on-surface-variant/90 line-clamp-3",
										children: c.description
									})
								]
							})]
						})
					}, idx);
				})
			})
		]
	});
}
//#endregion
export { CiclosPage as component };
