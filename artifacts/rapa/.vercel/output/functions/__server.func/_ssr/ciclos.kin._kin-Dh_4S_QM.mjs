import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { d as Link, f as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useServerFn } from "./createSsrRpc-DvRDvdGH.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as relationBetween, a as RELATION_LABEL, b as occultKin, d as antipodeKin, g as getKinInfo, h as getEarthFamily, l as TONE_DETAILS, m as getCastleOfKin, o as SEALS, s as SEAL_DETAILS, u as analogKin, v as guideKin, y as kinFromDate } from "./tzolkin-CeuRSgpU.mjs";
import { t as SEAL_IMAGE } from "./seal-images-Bln5NZxW.mjs";
import { t as TONE_IMAGE } from "./tone-images-C0GIxTBZ.mjs";
import { t as KinDisplay } from "./KinDisplay-B1DBuien.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as KinBadge } from "./KinBadge-dubxczgb.mjs";
import { n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as Route } from "./ciclos.kin._kin-CAjM7w_r.mjs";
import { n as getNatal, t as getKinJourneyStats } from "./tzolkin.functions-q7BRYnOx.mjs";
import { t as askKai } from "./kai.functions-_z68ALqu.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ciclos.kin._kin-Dh_4S_QM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
var COLOR_CLASS = {
	vermelho: {
		text: "text-error",
		bg: "bg-error",
		border: "border-error/40"
	},
	branco: {
		text: "text-on-surface",
		bg: "bg-on-surface",
		border: "border-on-surface/40"
	},
	azul: {
		text: "text-primary",
		bg: "bg-primary",
		border: "border-primary/40"
	},
	amarelo: {
		text: "text-tertiary",
		bg: "bg-tertiary",
		border: "border-tertiary/40"
	}
};
/** Retorna a data mais próxima de hoje (passado ou futuro) em que o Kin ocorre. */
function dateFromKin(targetKin) {
	const today = /* @__PURE__ */ new Date();
	let diff = (targetKin - kinFromDate(today) + 260) % 260;
	if (diff > 130) diff -= 260;
	const result = new Date(today);
	result.setDate(result.getDate() + diff);
	for (let i = 0; i < 4 && kinFromDate(result) !== targetKin; i++) {
		const actual = kinFromDate(result);
		result.setDate(result.getDate() + ((targetKin - actual + 260) % 260 <= 130 ? 1 : -1));
	}
	return result;
}
function formatKinDate(d) {
	return d.toLocaleDateString("pt-BR", {
		weekday: "short",
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
function kinDateRelation(d) {
	const today = /* @__PURE__ */ new Date();
	const dStr = d.toDateString();
	if (dStr === today.toDateString()) return "today";
	const tomorrow = new Date(today);
	tomorrow.setDate(today.getDate() + 1);
	if (dStr === tomorrow.toDateString()) return "tomorrow";
	const yesterday = new Date(today);
	yesterday.setDate(today.getDate() - 1);
	if (dStr === yesterday.toDateString()) return "yesterday";
	return "other";
}
function KinDetailPage() {
	const params = Route.useParams();
	const navigate = useNavigate();
	const kin = Math.max(1, Math.min(260, Number(params.kin) || 1));
	const info = (0, import_react.useMemo)(() => getKinInfo(kin), [kin]);
	const today = (0, import_react.useMemo)(() => kinFromDate(/* @__PURE__ */ new Date()), []);
	const todayInfo = (0, import_react.useMemo)(() => getKinInfo(today), [today]);
	const colors = COLOR_CLASS[info.seal.color];
	const fnGetNatal = useServerFn(getNatal);
	const fnStats = useServerFn(getKinJourneyStats);
	const fnAskKai = useServerFn(askKai);
	const natalQuery = useQuery({
		queryKey: ["natal"],
		queryFn: () => fnGetNatal()
	});
	const statsQuery = useQuery({
		queryKey: ["kinStats", kin],
		queryFn: () => fnStats({ data: { kin } })
	});
	const natalKin = natalQuery.data?.natal_kin ?? null;
	const relToToday = relationBetween(kin, today);
	const relToNatal = natalKin ? relationBetween(kin, natalKin) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pt-24 pb-32 px-container-margin max-w-[760px] mx-auto min-h-screen relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 texture-overlay z-[-1]",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/ciclos",
					className: "flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "material-symbols-outlined",
						children: "arrow_back"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-label-sm text-label-sm",
						children: "Voltar à matriz"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => navigate({
							to: "/ciclos/kin/$kin",
							params: { kin: String((kin - 2 + 260) % 260 + 1) }
						}),
						className: "w-9 h-9 rounded-full border border-outline-variant/40 flex items-center justify-center hover:bg-surface-container-low",
						"aria-label": "Kin anterior",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined text-lg",
							children: "chevron_left"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => navigate({
							to: "/ciclos/kin/$kin",
							params: { kin: String(kin % 260 + 1) }
						}),
						className: "w-9 h-9 rounded-full border border-outline-variant/40 flex items-center justify-center hover:bg-surface-container-low",
						"aria-label": "Próximo Kin",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined text-lg",
							children: "chevron_right"
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative mb-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative glass-panel rounded-3xl p-8 flex flex-col items-center text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KinBadge, {
							kin,
							size: 156,
							pulse: true,
							eager: true,
							className: "mb-5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `font-label-sm text-label-sm ${colors.text} mb-1 tracking-widest`,
							suppressHydrationWarning: true,
							children: ["KIN ", kin]
						}),
						(() => {
							const kinDate = dateFromKin(kin);
							const rel = kinDateRelation(kinDate);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-center gap-2 mb-1 flex-wrap",
								suppressHydrationWarning: true,
								children: [
									rel === "today" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "material-symbols-outlined text-[14px]",
											style: { fontVariationSettings: "'FILL' 1" },
											children: "today"
										}), "Hoje"]
									}),
									rel === "tomorrow" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-outline-variant/50 text-on-surface-variant font-label-sm text-label-sm",
										children: "amanhã"
									}),
									rel === "yesterday" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-outline-variant/50 text-on-surface-variant font-label-sm text-label-sm",
										children: "ontem"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-label-sm text-label-sm text-on-surface-variant/60 normal-case tracking-normal",
										children: formatKinDate(kinDate)
									})
								]
							});
						})(),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-headline-lg text-headline-lg text-on-surface mb-4",
							children: info.fullName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl ${colors.bg}/15 border ${colors.border} mb-3 w-full max-w-xs`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${colors.bg}/30`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: TONE_IMAGE[info.tone.index],
									alt: `Tom ${info.tone.index} · ${info.tone.name}`,
									className: "w-7 h-7 object-contain",
									style: { filter: "brightness(0) invert(1) opacity(0.92)" },
									loading: "eager",
									decoding: "async",
									draggable: false
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-left min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: `font-title-md text-title-md ${colors.text}`,
									children: [
										"Tom ",
										info.tone.index,
										" · ",
										info.tone.name
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-body-sm text-on-surface-variant truncate",
									children: [
										info.tone.essence,
										" · ",
										info.tone.power
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-body-sm text-on-surface-variant/70 italic",
							children: [
								info.seal.maya,
								" · ",
								info.tone.maya
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "conhecimento",
				className: "w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "w-full grid grid-cols-4 mb-6 bg-surface-container-low",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "conhecimento",
								children: "Conhecimento"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "hoje",
								children: "Hoje"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "jornada",
								children: "Jornada"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "kai",
								children: "KAI"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "conhecimento",
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass-panel rounded-3xl p-6 space-y-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "font-title-md text-title-md flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `material-symbols-outlined ${colors.text}`,
											style: { fontVariationSettings: "'FILL' 1" },
											children: "auto_awesome"
										}), "Mantra Galáctico"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `border-l-2 pl-4 space-y-0.5 ${colors.border}`,
										children: info.mantra.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: `leading-relaxed ${i === 4 ? "font-body-sm text-on-surface-variant/70 italic mt-2 pt-2 border-t border-white/8" : i === 0 ? "font-body-lg text-on-surface font-medium" : "font-body-md text-on-surface-variant"}`,
											children: line
										}, i))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `rounded-2xl px-4 py-3 ${colors.bg}/12 border ${colors.border}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: `font-label-sm text-label-sm uppercase tracking-widest mb-1.5 ${colors.text}`,
											children: "Frase do dia"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-body-md italic leading-relaxed text-on-surface",
											children: [
												"\"",
												info.affirmation,
												"\""
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap gap-3 text-label-sm pt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: `https://sincronariodapaz.org/calcula-kin/?kin=${kin}`,
											target: "_blank",
											rel: "noreferrer",
											className: "inline-flex items-center gap-1 text-primary hover:underline",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "material-symbols-outlined text-[16px]",
												children: "open_in_new"
											}), "Sincronário da Paz"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: `https://tzolkin.io/en/kin/${kin}`,
											target: "_blank",
											rel: "noreferrer",
											className: "inline-flex items-center gap-1 text-primary hover:underline",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "material-symbols-outlined text-[16px]",
												children: "open_in_new"
											}), "tzolkin.io"]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid md:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass-panel rounded-3xl p-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
											className: "font-title-md text-title-md mb-2 flex items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: SEAL_IMAGE[info.seal.index],
													alt: info.seal.name,
													className: "w-7 h-7 object-contain",
													loading: "lazy",
													decoding: "async"
												}),
												"Selo · ",
												info.seal.name
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-label-sm text-label-sm text-primary uppercase tracking-widest mb-2",
											children: SEAL_DETAILS[info.seal.index].meaning
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-body-md text-on-surface-variant mb-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-on-surface",
													children: info.seal.action
												}),
												" a força de ",
												info.seal.power.toLowerCase(),
												"; essência de ",
												info.seal.essence.toLowerCase(),
												"."
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-body-sm text-on-surface-variant/90 mb-3",
											children: SEAL_DETAILS[info.seal.index].description
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-wrap gap-1.5 mb-3",
											children: SEAL_DETAILS[info.seal.index].keywords.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "px-2 py-0.5 rounded-full text-label-sm border border-outline-variant/40 text-on-surface-variant bg-surface/40",
												children: k
											}, k))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-3 font-label-sm text-label-sm text-on-surface-variant/70",
											children: [
												"Nome maia: ",
												info.seal.maya,
												" · Cor ",
												info.seal.color
											]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass-panel rounded-3xl p-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3 mb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center ${colors.bg}/20 border ${colors.border}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: TONE_IMAGE[info.tone.index],
													alt: `Tom ${info.tone.index} · ${info.tone.name}`,
													className: "w-9 h-9 object-contain",
													style: { filter: "brightness(0) invert(1) opacity(0.9)" },
													loading: "lazy",
													decoding: "async",
													draggable: false
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
													className: "font-title-md text-title-md",
													children: [
														"Tom ",
														info.tone.index,
														" · ",
														info.tone.name
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: `font-label-sm text-label-sm ${colors.text} uppercase tracking-wide`,
													children: TONE_DETAILS[info.tone.index].vibration
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-body-md text-on-surface-variant mb-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-on-surface",
													children: info.tone.action
												}),
												" — ",
												info.tone.essence.toLowerCase(),
												" através de",
												" ",
												info.tone.power.toLowerCase(),
												"."
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-body-sm text-on-surface-variant/90 mb-3",
											children: TONE_DETAILS[info.tone.index].summary
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `rounded-2xl px-4 py-3 ${colors.bg}/12 border ${colors.border} mb-3`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: `font-label-sm text-label-sm uppercase tracking-widest mb-1.5 ${colors.text}`,
												children: "Orientação"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-body-sm italic leading-relaxed text-on-surface-variant",
												children: TONE_DETAILS[info.tone.index].guidance
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-label-sm text-label-sm text-on-surface-variant/70",
											children: ["Nome maia: ", info.tone.maya]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass-panel rounded-3xl p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
										className: "font-title-md text-title-md mb-2 flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: SEAL_IMAGE[info.trecena.seal.index],
												alt: info.trecena.seal.name,
												className: "w-7 h-7 object-contain",
												loading: "lazy",
												decoding: "async"
											}),
											"Trecena do ",
											info.trecena.seal.name
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-body-md text-on-surface-variant",
										children: [
											"Este Kin pertence à onda encantada iniciada pelo ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-on-surface",
												children: info.trecena.seal.name
											}),
											" ",
											"(Kin ",
											info.trecena.kinStart,
											"). Durante 13 dias, o campo cultiva a arte de",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: info.trecena.seal.action.toLowerCase() }),
											"."
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 font-label-sm text-label-sm text-on-surface-variant/70",
										children: [
											info.castle.name,
											" · Kin ",
											(info.castle.index - 1) * 52 + 1,
											"–",
											info.castle.index * 52
										]
									})
								]
							}),
							(() => {
								const fam = getEarthFamily(info.seal.index);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass-panel rounded-3xl p-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-label-sm text-label-sm text-primary uppercase tracking-widest mb-1",
											children: ["Família Planetária · ", fam.function]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-title-md text-title-md mb-2",
											children: fam.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-body-md text-on-surface-variant mb-3",
											children: fam.description
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-wrap gap-2 mb-2",
											children: fam.seals.map((s) => {
												const seal = SEALS[s - 1];
												const isSelf = s === info.seal.index;
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: `inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-label-sm border ${isSelf ? "border-primary text-primary bg-primary/10" : "border-outline-variant/40 text-on-surface-variant"}`,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: SEAL_IMAGE[s],
														alt: seal.name,
														className: "w-4 h-4 object-contain",
														loading: "lazy",
														decoding: "async"
													}), seal.name]
												}, s);
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-label-sm text-label-sm text-on-surface-variant/70",
											children: ["Região do corpo planetário: ", fam.bodyRegion]
										})
									]
								});
							})(),
							(() => {
								const c = getCastleOfKin(kin);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass-panel rounded-3xl p-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-label-sm text-label-sm text-primary uppercase tracking-widest mb-1",
											children: ["Castelo do Destino · ", c.direction]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-title-md text-title-md mb-2",
											children: c.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-body-md text-on-surface-variant mb-3",
											children: c.description
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-2 gap-2 text-label-sm",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-xl border border-outline-variant/30 p-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-on-surface-variant/70",
														children: "Totem"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-on-surface",
														children: c.totem
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-xl border border-outline-variant/30 p-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-on-surface-variant/70",
														children: "Ação"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-on-surface",
														children: [
															c.action,
															" · ",
															c.power
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-xl border border-outline-variant/30 p-2 col-span-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-on-surface-variant/70",
														children: "Faixa de Kins"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-on-surface",
														children: [
															c.kinRange[0],
															"–",
															c.kinRange[1]
														]
													})]
												})
											]
										})
									]
								});
							})()
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "hoje",
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass-panel rounded-3xl p-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-title-md text-title-md mb-3",
									children: "Kin de hoje"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/ciclos/kin/$kin",
									params: { kin: String(today) },
									className: "flex items-center gap-4 group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KinDisplay, {
										kin: today,
										size: "md",
										layout: "badge",
										pulse: true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-2xl font-headline-lg text-primary group-hover:opacity-80",
											children: ["Kin ", today]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-title-md text-title-md",
											children: todayInfo.fullName
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-body-sm text-on-surface-variant italic",
											children: [
												todayInfo.seal.maya,
												" · ",
												todayInfo.tone.maya
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-label-sm text-label-sm text-on-surface-variant/60 mt-0.5",
											suppressHydrationWarning: true,
											children: (/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR", {
												weekday: "long",
												day: "numeric",
												month: "long"
											})
										})
									] })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelationCard, {
								label: "Kin explorado × Hoje",
								from: kin,
								to: today,
								relation: relToToday
							}),
							natalKin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelationCard, {
								label: "Kin explorado × Kin natal",
								from: kin,
								to: natalKin,
								relation: relToNatal
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResonanceMap, {
								kin,
								today,
								natal: natalKin
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "jornada",
						className: "space-y-4",
						children: statsQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-on-surface-variant",
							children: "Carregando sua jornada…"
						}) : statsQuery.data && statsQuery.data.count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass-panel rounded-3xl p-6 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-5xl font-headline-lg text-primary",
									children: statsQuery.data.count
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-body-md text-on-surface-variant mt-1",
									children: [statsQuery.data.count === 1 ? "registro" : "registros", " sob este Kin"]
								}),
								Object.keys(statsQuery.data.moodDistribution).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 flex justify-center gap-2 flex-wrap",
									children: Object.entries(statsQuery.data.moodDistribution).map(([mood, n]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs px-3 py-1 rounded-full border border-outline-variant/40",
										children: [
											mood,
											" · ",
											n
										]
									}, mood))
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-3",
							children: statsQuery.data.entries.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "glass-panel rounded-2xl p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-xs text-on-surface-variant mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "uppercase tracking-widest",
											children: e.kind
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", { children: new Date(e.entry_date).toLocaleDateString("pt-BR") })]
									}),
									e.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-title-md text-title-md mb-1",
										children: e.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-body-md text-on-surface-variant leading-relaxed",
										children: e.snippet
									})
								]
							}, e.id))
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass-panel rounded-3xl p-8 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "material-symbols-outlined text-4xl text-on-surface-variant/50 mb-2",
									children: "history_edu"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-body-md text-on-surface-variant",
									children: "Você ainda não tem registros neste Kin. Quando escrever na jornada num dia deste Kin, ele aparecerá aqui e alimentará o Mapa de Ressonância."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/jornada",
									className: "inline-block mt-4 rounded-full bg-primary text-on-primary px-5 py-2 font-label-sm text-label-sm",
									children: "Ir para a Jornada"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "kai",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KaiResonanceChat, {
							kin,
							askFn: fnAskKai
						})
					})
				]
			})
		]
	});
}
function RelationCard({ label, from, to, relation }) {
	const fromInfo = getKinInfo(from);
	const toInfo = getKinInfo(to);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-panel rounded-3xl p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-label-sm text-label-sm text-on-surface-variant/70 uppercase tracking-widest mb-2",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-title-md text-title-md text-primary mb-3",
				children: RELATION_LABEL[relation]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 text-sm text-on-surface-variant",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KinDisplay, {
							kin: from,
							size: "xs",
							layout: "badge"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: fromInfo.fullName
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "opacity-40",
						children: "↔"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 min-w-0 justify-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-right",
							children: toInfo.fullName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KinDisplay, {
							kin: to,
							size: "xs",
							layout: "badge"
						})]
					})
				]
			})
		]
	});
}
/** SVG puro: 3 nós (Explorado · Hoje · Natal) + 4 relações oraculares do Kin explorado. */
function ResonanceMap({ kin, today, natal }) {
	const oracle = {
		guide: guideKin(kin),
		analog: analogKin(kin),
		antipode: antipodeKin(kin),
		occult: occultKin(kin)
	};
	const nodes = [
		{
			id: "kin",
			label: "Explorado",
			kin,
			x: 160,
			y: 80
		},
		{
			id: "today",
			label: "Hoje",
			kin: today,
			x: 60,
			y: 220
		},
		...natal ? [{
			id: "natal",
			label: "Natal",
			kin: natal,
			x: 260,
			y: 220
		}] : []
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-panel rounded-3xl p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "font-title-md text-title-md mb-3 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "material-symbols-outlined text-tertiary",
					children: "hub"
				}), "Mapa de Ressonância"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 320 300",
				className: "w-full h-auto max-h-[280px]",
				children: [nodes.map((a, i) => nodes.slice(i + 1).map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: a.x,
					y1: a.y,
					x2: b.x,
					y2: b.y,
					stroke: "currentColor",
					strokeOpacity: .25,
					strokeWidth: 1,
					className: "text-on-surface-variant"
				}, `${a.id}-${b.id}`))), nodes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: n.x,
						cy: n.y,
						r: 28,
						className: "fill-surface-container-high stroke-primary",
						strokeWidth: 1.5
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: n.x,
						y: n.y + 4,
						textAnchor: "middle",
						className: "fill-primary text-sm font-semibold",
						children: n.kin
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: n.x,
						y: n.y + 46,
						textAnchor: "middle",
						className: "fill-on-surface-variant text-[10px] uppercase tracking-widest",
						children: n.label
					})
				] }, n.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-2 gap-2",
				children: [
					{
						key: "guide",
						label: "Guia",
						kin: oracle.guide
					},
					{
						key: "analog",
						label: "Analógico",
						kin: oracle.analog
					},
					{
						key: "antipode",
						label: "Antípoda",
						kin: oracle.antipode
					},
					{
						key: "occult",
						label: "Oculto",
						kin: oracle.occult
					}
				].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/ciclos/kin/$kin",
					params: { kin: String(r.kin) },
					className: "rounded-2xl border border-outline-variant/40 px-3 py-2 flex items-center gap-3 hover:border-primary/60 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KinDisplay, {
						kin: r.kin,
						size: "xs",
						layout: "badge"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-[10px] uppercase tracking-widest text-on-surface-variant",
							children: r.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-title-md text-title-md text-primary",
							children: ["Kin ", r.kin]
						})]
					})]
				}, r.key))
			})
		]
	});
}
function KaiResonanceChat({ kin, askFn }) {
	const [messages, setMessages] = (0, import_react.useState)([{
		role: "assistant",
		content: "Olá. Quando olha este Kin ao lado do ciclo de hoje e dos seus registros, o que primeiro chama a sua atenção? Traga uma palavra, uma imagem, um estranhamento — eu ouço."
	}]);
	const [input, setInput] = (0, import_react.useState)("");
	const scrollRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [messages]);
	const mutation = useMutation({
		mutationFn: (msgs) => askFn({ data: {
			messages: msgs,
			resonance: { kin }
		} }),
		onSuccess: (r) => setMessages((prev) => [...prev, {
			role: "assistant",
			content: r.text
		}]),
		onError: (e) => {
			toast.error(e.message);
			setMessages((prev) => prev.slice(0, -1));
		}
	});
	function send() {
		const trimmed = input.trim();
		if (!trimmed || mutation.isPending) return;
		const next = [...messages, {
			role: "user",
			content: trimmed
		}];
		setMessages(next);
		setInput("");
		mutation.mutate(next);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-panel rounded-3xl p-4 flex flex-col h-[520px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: scrollRef,
			className: "flex-1 overflow-y-auto space-y-3 pr-1",
			children: [messages.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `rounded-2xl px-4 py-3 max-w-[85%] font-body-md ${m.role === "user" ? "bg-primary text-on-primary ml-auto" : "bg-surface-container-high text-on-surface"}`,
				children: m.content
			}, i)), mutation.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl px-4 py-3 bg-surface-container-high text-on-surface-variant italic max-w-[85%]",
				children: "KAI está contemplando…"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2 mt-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: input,
				onChange: (e) => setInput(e.target.value),
				onKeyDown: (e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send()),
				placeholder: "Compartilhe com KAI…",
				className: "flex-1 rounded-full bg-surface-container-low border border-outline-variant/40 px-4 py-2 focus:outline-none focus:border-primary"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: send,
				disabled: !input.trim() || mutation.isPending,
				className: "rounded-full bg-primary text-on-primary px-5 disabled:opacity-50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "material-symbols-outlined",
					children: "send"
				})
			})]
		})]
	});
}
//#endregion
export { KinDetailPage as component };
