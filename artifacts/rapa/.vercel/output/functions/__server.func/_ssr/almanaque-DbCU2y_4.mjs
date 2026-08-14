import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as sincronarioDate, b as occultKin, d as antipodeKin, g as getKinInfo, h as getEarthFamily, i as PLASMAS, o as SEALS, u as analogKin, v as guideKin, y as kinFromDate } from "./tzolkin-CeuRSgpU.mjs";
import { t as KinDisplay } from "./KinDisplay-B1DBuien.mjs";
import { t as PlasmaSymbol } from "./PlasmaSymbol-CQiqqWdH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/almanaque-DbCU2y_4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Planeta galáctico de cada selo (índice 1-20). */
var SEAL_PLANET = {
	1: "Netuno [GK]",
	2: "Urano [GK]",
	3: "Saturno [GK]",
	4: "Júpiter [GK]",
	5: "Maldek [GK]",
	6: "Marte [GK]",
	7: "Terra [GK]",
	8: "Vénus [GK]",
	9: "Mercúrio [GK]",
	10: "Mercúrio [SP]",
	11: "Vénus [SP]",
	12: "Terra [SP]",
	13: "Marte [SP]",
	14: "Maldek [SP]",
	15: "Júpiter [SP]",
	16: "Saturno [SP]",
	17: "Urano [SP]",
	18: "Netuno [SP]",
	19: "Plutão [SP]",
	20: "Plutão [GK]"
};
/** Chakra + função por selo — segue ciclo (sealIndex-1)%5. */
var CHAKRA_CYCLE = [
	["Garganta", "Transmite"],
	["Coração", "Transduz"],
	["Plexo Solar", "Recebe"],
	["Raiz", "Transmite"],
	["Coroa", "Recebe"]
];
function sealChakra(sealIndex) {
	const [name, fn] = CHAKRA_CYCLE[(sealIndex - 1) % 5];
	return `${name} [${fn}]`;
}
/** Harmônica (1-65) e tipo por posição dentro da harmônica. */
function harmonicInfo(kin) {
	const number = Math.ceil(kin / 4);
	const pos = (kin - 1) % 4;
	return {
		number,
		type: pos < 3 ? [
			"Entrada Harmônica",
			"Processo Rítmico",
			"Saída Planetária",
			"Armazém"
		][pos] : `Armazém ${[
			"Magnético",
			"Lunar",
			"Solar",
			"Cristal"
		][(number - 1) % 4]}`
	};
}
/** Onda Encantada (trecena) — seal do portador e kin de início. */
function wavespellLabel(kin) {
	const info = getKinInfo(kin);
	return {
		sealIndex: info.trecena.seal.index,
		sealName: info.trecena.seal.name,
		kinStart: info.trecena.kinStart
	};
}
/** Kin do Psi (crono-psi de 28 dias na lua). Âncora: Lua 1 Dia 1 do ano galáctico = KIN 1
*  Formula: psiBanco = (diaNoAno) % 260, em que diaNoAno = (moon-1)*28+(day-1).
*  Usa o mesmo contagem Dreamspell.
*/
function psiKin(moonNumber, dayInMoon) {
	return (((moonNumber - 1) * 28 + (dayInMoon - 1)) % 260 + 260) % 260 + 1;
}
var MOONS = [
	{
		number: 1,
		tone: "Magnética",
		quality: "Propósito",
		animal: "Morcego",
		essence: "Unificar",
		question: "Qual é o meu propósito?"
	},
	{
		number: 2,
		tone: "Lunar",
		quality: "Desafio",
		animal: "Escorpião",
		essence: "Estabilizar",
		question: "Qual é o meu desafio?"
	},
	{
		number: 3,
		tone: "Elétrica",
		quality: "Serviço",
		animal: "Veado",
		essence: "Vincular",
		question: "Como sirvo melhor?"
	},
	{
		number: 4,
		tone: "Autoexistente",
		quality: "Forma",
		animal: "Coruja",
		essence: "Medir",
		question: "Qual é a forma do meu serviço?"
	},
	{
		number: 5,
		tone: "Harmônica",
		quality: "Radiância",
		animal: "Pavão",
		essence: "Enaltecer",
		question: "Como posso irradiar melhor?"
	},
	{
		number: 6,
		tone: "Rítmica",
		quality: "Equanimidade",
		animal: "Lagartixa",
		essence: "Equilibrar",
		question: "Como posso estender minha equanimidade?"
	},
	{
		number: 7,
		tone: "Ressonante",
		quality: "Sintonização",
		animal: "Macaco",
		essence: "Canalizar",
		question: "Como posso me sintonizar ao serviço?"
	},
	{
		number: 8,
		tone: "Galáctica",
		quality: "Integridade",
		animal: "Gavião",
		essence: "Harmonizar",
		question: "Estou vivendo meu juramento?"
	},
	{
		number: 9,
		tone: "Solar",
		quality: "Intenção",
		animal: "Jaguar",
		essence: "Realizar",
		question: "Como posso realizar minha intenção?"
	},
	{
		number: 10,
		tone: "Planetária",
		quality: "Manifestação",
		animal: "Cão",
		essence: "Produzir",
		question: "Como posso aperfeiçoar o que manifesto?"
	},
	{
		number: 11,
		tone: "Espectral",
		quality: "Libertação",
		animal: "Cobra",
		essence: "Liberar",
		question: "Como posso libertar para que eu possa me render?"
	},
	{
		number: 12,
		tone: "Cristal",
		quality: "Cooperação",
		animal: "Coelho",
		essence: "Universalizar",
		question: "Como posso dedicar-me ao Ser Supremo?"
	},
	{
		number: 13,
		tone: "Cósmica",
		quality: "Presença",
		animal: "Tartaruga",
		essence: "Transcender",
		question: "Como posso me expandir e transcender?"
	}
];
var HEPTAL_COLORS = [
	"text-red-400 border-red-400/40 bg-red-400/8",
	"text-slate-300 border-slate-300/40 bg-slate-300/8",
	"text-blue-400 border-blue-400/40 bg-blue-400/8",
	"text-yellow-400 border-yellow-400/40 bg-yellow-400/8"
];
var HEPTAL_NAMES = [
	"Heptal Vermelho",
	"Heptal Branco",
	"Heptal Azul",
	"Heptal Amarelo"
];
var HEPTAL_SUBTITLES = [
	"o conhecimento inicia a visão",
	"a humildade refina a meditação",
	"a paciência transforma a conduta",
	"o poder amadurece o fruto"
];
var PLASMA_DISPLAY = [
	"DALI",
	"SELI",
	"GAMA",
	"KALI",
	"ALFA",
	"LIMI",
	"SILIO"
];
var WEEKDAY_PT = [
	"DOM",
	"SEG",
	"TER",
	"QUA",
	"QUI",
	"SEX",
	"SÁB"
];
var PLASMA_COLORS = [
	"text-yellow-300",
	"text-red-400",
	"text-white",
	"text-blue-400",
	"text-yellow-400",
	"text-red-300",
	"text-white"
];
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
/** Returns UTC midnight of July 26 for a given galactic year. */
function galacticYearStart(galYear) {
	return new Date(Date.UTC(galYear, 6, 26));
}
/** Galactic year (July 26 → July 25 next year). July = month 6 (0-indexed). */
function galacticYear(date) {
	const y = date.getUTCFullYear();
	const m = date.getUTCMonth();
	const d = date.getUTCDate();
	return m > 6 || m === 6 && d >= 26 ? y : y - 1;
}
/**
* Convert Dreamspell moon/day to a gregorian Date.
* Iterates forward from year start, skipping Feb 29 (Dreamspell rule).
*/
function moonDayToDate(galYear, moonNumber, dayInMoon) {
	const offset = (moonNumber - 1) * 28 + (dayInMoon - 1);
	let cur = galacticYearStart(galYear);
	for (let i = 0; i < offset; i++) {
		cur = new Date(cur.getTime() + 864e5);
		if (cur.getUTCMonth() === 1 && cur.getUTCDate() === 29) cur = new Date(cur.getTime() + 864e5);
	}
	return cur;
}
/** All 28 gregorian dates for a given moon. */
function moonAllDates(galYear, moonNumber) {
	return Array.from({ length: 28 }, (_, i) => moonDayToDate(galYear, moonNumber, i + 1));
}
function formatDate(d, opts) {
	return d.toLocaleDateString("pt-BR", {
		timeZone: "UTC",
		...opts
	});
}
function AlmanaquePage() {
	const todayUTC = (0, import_react.useMemo)(() => {
		const n = /* @__PURE__ */ new Date();
		return new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()));
	}, []);
	const todaySync = (0, import_react.useMemo)(() => sincronarioDate(todayUTC), [todayUTC]);
	const todayGalYear = (0, import_react.useMemo)(() => galacticYear(todayUTC), [todayUTC]);
	const todayKin = (0, import_react.useMemo)(() => kinFromDate(todayUTC), [todayUTC]);
	const [viewGalYear, setViewGalYear] = (0, import_react.useState)(() => todayGalYear);
	const [viewMoon, setViewMoon] = (0, import_react.useState)(() => todaySync.dayOutOfTime ? 1 : todaySync.moon);
	const [selectedDay, setSelectedDay] = (0, import_react.useState)(null);
	const [slideDir, setSlideDir] = (0, import_react.useState)("right");
	const moon = MOONS[viewMoon - 1];
	const dates = (0, import_react.useMemo)(() => moonAllDates(viewGalYear, viewMoon), [viewGalYear, viewMoon]);
	function prevMoon() {
		if (viewMoon === 1) {
			setViewGalYear((y) => y - 1);
			setViewMoon(13);
		} else setViewMoon((m) => m - 1);
		setSelectedDay(null);
	}
	function nextMoon() {
		if (viewMoon === 13) {
			setViewGalYear((y) => y + 1);
			setViewMoon(1);
		} else setViewMoon((m) => m + 1);
		setSelectedDay(null);
	}
	function prevDay() {
		setSlideDir("left");
		if (selectedDay === 1) {
			if (viewMoon === 1) {
				setViewGalYear((y) => y - 1);
				setViewMoon(13);
			} else setViewMoon((m) => m - 1);
			setSelectedDay(28);
		} else if (typeof selectedDay === "number") setSelectedDay((d) => d - 1);
	}
	function nextDay() {
		setSlideDir("right");
		if (selectedDay === 28) {
			if (viewMoon === 13) {
				setViewGalYear((y) => y + 1);
				setViewMoon(1);
			} else setViewMoon((m) => m + 1);
			setSelectedDay(1);
		} else if (typeof selectedDay === "number") setSelectedDay((d) => d + 1);
	}
	const isCurrentMoon = viewGalYear === todayGalYear && viewMoon === (todaySync.dayOutOfTime ? 0 : todaySync.moon);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pt-24 pb-32 px-container-margin max-w-[760px] mx-auto min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 texture-overlay z-[-1]",
			"aria-hidden": true
		}), selectedDay === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarView, {
			galYear: viewGalYear,
			moon,
			moonNumber: viewMoon,
			dates,
			todayUTC,
			todayKin,
			isCurrentMoon,
			onSelectDay: setSelectedDay,
			onPrev: prevMoon,
			onNext: nextMoon
		}) : selectedDay === "dot" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayOutOfTimeDetail, {
			galYear: viewGalYear,
			todayUTC,
			onBack: () => setSelectedDay(null)
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayDetail, {
			galYear: viewGalYear,
			moonNumber: viewMoon,
			moon,
			dayInMoon: selectedDay,
			date: dates[selectedDay - 1],
			todayUTC,
			todayKin,
			slideDir,
			onBack: () => setSelectedDay(null),
			onPrevDay: prevDay,
			onNextDay: nextDay
		}, `${viewGalYear}-${viewMoon}-${selectedDay}`)]
	});
}
function CalendarView({ galYear, moon, moonNumber, dates, todayUTC, todayKin, isCurrentMoon, onSelectDay, onPrev, onNext }) {
	const startDate = dates[0];
	const endDate = dates[27];
	const startStr = formatDate(startDate, {
		day: "numeric",
		month: "short"
	});
	const endStr = formatDate(endDate, {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
	const todayDayInMoon = (0, import_react.useMemo)(() => {
		const sync = sincronarioDate(todayUTC);
		if (sync.dayOutOfTime || sync.moon !== moonNumber) return null;
		if (galacticYear(todayUTC) !== galYear) return null;
		return sync.day;
	}, [
		todayUTC,
		moonNumber,
		galYear
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-panel rounded-3xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onPrev,
							className: "w-9 h-9 rounded-full border border-outline-variant/40 flex items-center justify-center hover:bg-surface-container-low transition-colors",
							"aria-label": "Lua anterior",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "material-symbols-outlined text-lg",
								children: "chevron_left"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center flex-1 px-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-center gap-2 mb-0.5",
									children: [isCurrentMoon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-label-sm text-label-sm text-primary uppercase tracking-widest",
										children: "Agora"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-label-sm text-label-sm text-on-surface-variant/60 uppercase tracking-widest",
										children: [
											"Lua ",
											moonNumber,
											" de 13"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "font-serif text-xl text-astral-violet leading-tight",
									children: [
										"Lua ",
										moon.tone,
										" do ",
										moon.animal
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-label-sm text-label-sm text-on-surface-variant/70 mt-0.5",
									children: ["lua do ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-on-surface font-medium",
										children: moon.quality.toLowerCase()
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-body-sm text-on-surface-variant/50 text-xs mt-1",
									children: [
										startStr,
										" — ",
										endStr
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onNext,
							className: "w-9 h-9 rounded-full border border-outline-variant/40 flex items-center justify-center hover:bg-surface-container-low transition-colors",
							"aria-label": "Próxima lua",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "material-symbols-outlined text-lg",
								children: "chevron_right"
							})
						})
					]
				}), isCurrentMoon && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-center font-body-sm text-on-surface-variant/60 italic text-xs mt-2 pt-2 border-t border-white/5",
					children: [
						"\"",
						moon.question,
						"\""
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-panel rounded-3xl p-3 overflow-x-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-7 gap-1 mb-2",
					children: PLASMAS.map((p, i) => {
						const weekdayIdx = (dates[0].getUTCDay() + i) % 7;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center py-1.5 gap-0.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlasmaSymbol, {
									index: i + 1,
									size: 22
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `font-label-sm text-[9px] tracking-wider uppercase ${PLASMA_COLORS[i]}`,
									children: PLASMA_DISPLAY[i]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-label-sm text-[8px] text-on-surface-variant/50 tracking-wide",
									children: WEEKDAY_PT[weekdayIdx]
								})
							]
						}, p.name);
					})
				}), [
					0,
					1,
					2,
					3
				].map((week) => {
					const heptalColor = HEPTAL_COLORS[week];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `text-[9px] font-label-sm tracking-widest uppercase mb-1 pl-1 ${heptalColor.split(" ")[0]}`,
							children: [
								HEPTAL_NAMES[week],
								" · ",
								HEPTAL_SUBTITLES[week]
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-7 gap-1",
							children: Array.from({ length: 7 }, (_, col) => {
								const dayInMoon = week * 7 + col + 1;
								const date = dates[dayInMoon - 1];
								const kin = kinFromDate(date);
								const kinInfo = getKinInfo(kin);
								const isToday = dayInMoon === todayDayInMoon;
								const isPortal = PORTAL_KINS.has(kin);
								const colorCls = COLOR_CLASS[kinInfo.seal.color];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => onSelectDay(dayInMoon),
									className: `relative flex flex-col items-center rounded-xl p-1 transition-all active:scale-95 border ${isToday ? `border-primary bg-primary/15 shadow-[0_0_12px_rgba(99,102,241,0.3)]` : `border-transparent hover:border-outline-variant/40 hover:bg-surface-container-low`}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `font-headline-sm text-[15px] font-bold leading-none mb-0.5 ${isToday ? "text-primary" : "text-on-surface"}`,
											children: dayInMoon
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[8px] text-on-surface-variant/50 leading-none mb-1",
											children: formatDate(date, {
												day: "numeric",
												month: "numeric"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KinDisplay, {
											kin,
											size: "xs",
											layout: "badge",
											className: "mb-0.5"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `text-[8px] font-medium leading-none ${colorCls.text}`,
											children: [kin, isPortal ? " ✦" : ""]
										})
									]
								}, dayInMoon);
							})
						})]
					}, week);
				})]
			}),
			moonNumber === 13 && (() => {
				const dotDate = new Date(Date.UTC(galYear + 1, 6, 25));
				const dotKin = kinFromDate(dotDate);
				const dotInfo = getKinInfo(dotKin);
				COLOR_CLASS[dotInfo.seal.color];
				const isToday = dotDate.getTime() === todayUTC.getTime();
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onSelectDay("dot"),
					className: `w-full glass-panel rounded-2xl p-4 flex items-center gap-4 border transition-all active:scale-[0.98] hover:border-primary/40 ${isToday ? "border-primary/60 shadow-[0_0_16px_rgba(99,102,241,0.25)]" : "border-outline-variant/30"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-400/20 border border-yellow-400/40 flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "material-symbols-outlined text-yellow-300 text-lg",
								style: { fontVariationSettings: "'FILL' 1" },
								children: "star"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 flex-wrap mb-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-label-sm text-[9px] tracking-widest uppercase text-yellow-300",
										children: "Dia Fora do Tempo"
									}), isToday && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[9px] font-label-sm",
										children: "hoje"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-body-md text-on-surface font-medium text-sm",
									children: "25 de julho · dia 29"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-body-sm text-on-surface-variant/60 text-xs",
									children: [
										"KIN ",
										dotKin,
										" · ",
										dotInfo.fullName
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KinDisplay, {
							kin: dotKin,
							size: "xs",
							layout: "badge",
							className: "shrink-0"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined text-on-surface-variant/50 shrink-0",
							children: "chevron_right"
						})
					]
				});
			})(),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-4 justify-center text-label-sm text-on-surface-variant/60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-3 h-3 rounded-full bg-primary/60 inline-block" }), "hoje"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-label-sm text-[10px]",
						children: "PV"
					}), "portal galáctico"]
				})]
			})
		]
	});
}
/** Mini kin card used in the oracle section. */
function OracleKinCard({ kin, role, roleColor }) {
	const info = getKinInfo(kin);
	const colors = COLOR_CLASS[info.seal.color];
	const isPortal = PORTAL_KINS.has(kin);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/ciclos/kin/$kin",
		params: { kin: String(kin) },
		className: `flex flex-col items-center gap-1 p-2.5 rounded-2xl border ${colors.border}/40 bg-surface/40 hover:bg-surface-container-low transition-colors`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `font-label-sm text-[9px] tracking-widest uppercase ${roleColor}`,
				children: role
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KinDisplay, {
				kin,
				size: "xs",
				layout: "badge"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: `font-label-sm text-[10px] font-bold ${colors.text}`,
				children: [kin, isPortal ? " PV" : ""]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-body-sm text-[9px] text-on-surface-variant/70 text-center leading-tight line-clamp-2",
				children: [
					info.seal.name,
					" ",
					info.tone.name
				]
			})
		]
	});
}
function DayDetail({ galYear, moonNumber, moon, dayInMoon, date, todayUTC, todayKin, slideDir, onBack, onPrevDay, onNextDay }) {
	const kin = (0, import_react.useMemo)(() => kinFromDate(date), [date]);
	const info = (0, import_react.useMemo)(() => getKinInfo(kin), [kin]);
	const colors = COLOR_CLASS[info.seal.color];
	const fam = (0, import_react.useMemo)(() => getEarthFamily(info.seal.index), [info.seal.index]);
	const plasmaIndex = (dayInMoon - 1) % 7;
	const plasma = PLASMAS[plasmaIndex];
	const weekNumber = Math.floor((dayInMoon - 1) / 7) + 1;
	const heptalColor = HEPTAL_COLORS[weekNumber - 1];
	const isToday = date.getTime() === todayUTC.getTime();
	const isPortal = PORTAL_KINS.has(kin);
	const harmonic = (0, import_react.useMemo)(() => harmonicInfo(kin), [kin]);
	const wavespell = (0, import_react.useMemo)(() => wavespellLabel(kin), [kin]);
	const psi = (0, import_react.useMemo)(() => psiKin(moonNumber, dayInMoon), [moonNumber, dayInMoon]);
	const psiInfo = (0, import_react.useMemo)(() => getKinInfo(psi), [psi]);
	const oGuide = (0, import_react.useMemo)(() => guideKin(kin), [kin]);
	const oAnalog = (0, import_react.useMemo)(() => analogKin(kin), [kin]);
	const oAntipode = (0, import_react.useMemo)(() => antipodeKin(kin), [kin]);
	const oOccult = (0, import_react.useMemo)(() => occultKin(kin), [kin]);
	const colorLabel = {
		vermelho: "Vermelho [Inicia]",
		branco: "Branco [Refina]",
		azul: "Azul [Transforma]",
		amarelo: "Amarelo [Amadurece]"
	};
	const weekdayDate = formatDate(date, { weekday: "long" });
	const shortDate = formatDate(date, {
		day: "numeric",
		month: "numeric"
	});
	formatDate(date, {
		day: "numeric",
		month: "long",
		year: "numeric"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `space-y-3 ${slideDir === "right" ? "animate-slide-in-right" : "animate-slide-in-left"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onBack,
						className: "flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors shrink-0",
						"aria-label": "Voltar ao calendário",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined text-[20px]",
							children: "arrow_back"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-label-sm text-label-sm",
							children: "Calendário"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `flex-1 flex justify-center`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-label-sm tracking-widest uppercase ${heptalColor}`,
							children: [
								"Lua ",
								moonNumber,
								" · Dia ",
								dayInMoon
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onPrevDay,
							className: "w-8 h-8 rounded-full border border-outline-variant/40 flex items-center justify-center hover:bg-surface-container-low hover:text-primary transition-colors",
							"aria-label": "Dia anterior",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "material-symbols-outlined text-[18px]",
								children: "chevron_left"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onNextDay,
							className: "w-8 h-8 rounded-full border border-outline-variant/40 flex items-center justify-center hover:bg-surface-container-low hover:text-primary transition-colors",
							"aria-label": "Próximo dia",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "material-symbols-outlined text-[18px]",
								children: "chevron_right"
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-panel rounded-3xl overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `flex items-center justify-between px-5 py-3 border-b border-white/8 bg-surface-container-low`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlasmaSymbol, {
							index: plasmaIndex + 1,
							size: 42
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `font-label-sm text-label-sm uppercase tracking-[0.15em] font-bold ${PLASMA_COLORS[plasmaIndex]}`,
								children: PLASMA_DISPLAY[plasmaIndex]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[10px] text-on-surface-variant/60 uppercase tracking-wider",
								children: [
									plasma.action,
									" · ",
									plasma.chakra
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[9px] text-on-surface-variant/40 font-mono mt-0.5",
								children: plasma.mantraSolar
							})
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `font-headline-sm text-2xl font-bold ${isToday ? "text-primary" : "text-on-surface"}`,
								children: shortDate
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-label-sm text-[10px] text-on-surface-variant/60 uppercase tracking-wider capitalize",
								children: weekdayDate
							}),
							isPortal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-block mt-1 px-2 py-0.5 rounded-full bg-error/20 text-error text-[9px] font-label-sm tracking-wide uppercase",
								children: "Portal PV"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `flex items-center justify-between px-5 py-2 text-[10px] font-label-sm tracking-widest uppercase ${heptalColor.split(" ")[0]}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: HEPTAL_NAMES[weekNumber - 1] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "opacity-70",
						children: HEPTAL_SUBTITLES[weekNumber - 1]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `relative glass-panel rounded-3xl overflow-hidden border-l-4 ${colors.border}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute inset-0 ${colors.bg}/4 pointer-events-none` }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex items-start gap-4 p-5 pb-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KinDisplay, {
								kin,
								size: "sm",
								layout: "stack",
								eager: true,
								className: "shrink-0"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 flex-wrap mb-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `font-label-sm text-label-sm ${colors.text} tracking-widest uppercase font-bold`,
											children: ["KIN ", kin]
										}), isToday && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[9px] font-label-sm",
											children: "hoje"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-headline-md text-on-surface leading-tight mb-0.5",
										children: info.fullName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-body-sm text-on-surface-variant/60 italic text-xs",
										children: [
											info.seal.maya,
											" · ",
											info.tone.maya
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `shrink-0 flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl border ${colors.border}/50 bg-surface/30`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-label-sm text-[8px] text-on-surface-variant/60 uppercase tracking-wider",
										children: "Onda"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: `font-headline-sm text-lg font-bold ${colors.text} leading-none`,
										children: info.tone.index
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-label-sm text-[8px] text-on-surface-variant/60 text-center leading-tight",
										children: info.tone.name
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `mx-5 mb-3 border-l-2 pl-4 space-y-0.5 ${colors.border}`,
						children: info.mantra.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `leading-relaxed ${i === 0 ? "font-body-md text-on-surface font-medium" : i === 4 ? "font-body-sm text-on-surface-variant/70 italic mt-1" : "font-body-sm text-on-surface-variant"}`,
							children: line
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `mx-5 mb-5 rounded-xl px-4 py-2.5 ${colors.bg}/10 border ${colors.border}/50`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `font-label-sm text-[9px] uppercase tracking-widest mb-0.5 ${colors.text}`,
							children: "Afirmação"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-body-sm italic text-on-surface text-sm",
							children: [
								"\"",
								info.affirmation,
								"\""
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-panel rounded-3xl p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-label-sm text-[10px] text-on-surface-variant/50 uppercase tracking-widest mb-3",
					children: "Assinatura Galáctica"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `rounded-2xl p-3 ${colors.bg}/8 border ${colors.border}/50`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-label-sm text-[9px] text-on-surface-variant/55 uppercase tracking-widest mb-0.5",
								children: "Cor"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `font-body-sm font-semibold ${colors.text} text-sm`,
								children: colorLabel[info.seal.color]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `rounded-2xl p-3 ${colors.bg}/8 border ${colors.border}/50`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-label-sm text-[9px] text-on-surface-variant/55 uppercase tracking-widest mb-0.5",
								children: "Planeta"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-body-sm font-semibold text-on-surface text-sm",
								children: SEAL_PLANET[info.seal.index]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `rounded-2xl p-3 ${colors.bg}/8 border ${colors.border}/50`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-label-sm text-[9px] text-on-surface-variant/55 uppercase tracking-widest mb-0.5",
								children: "Chakra"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-body-sm font-semibold text-on-surface text-sm",
								children: sealChakra(info.seal.index)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `rounded-2xl p-3 ${colors.bg}/8 border ${colors.border}/50`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-label-sm text-[9px] text-on-surface-variant/55 uppercase tracking-widest mb-0.5",
								children: "Família Terrestre"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-body-sm font-semibold text-on-surface text-sm",
								children: fam.name.replace("Família ", "")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `rounded-2xl p-3 col-span-2 bg-surface-container-low border border-outline-variant/30`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-label-sm text-[9px] text-on-surface-variant/55 uppercase tracking-widest mb-0.5",
									children: "Harmônica"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-body-sm font-semibold text-on-surface text-sm",
									children: [
										harmonic.number,
										" · ",
										harmonic.type
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-label-sm text-[9px] text-on-surface-variant/55 uppercase tracking-widest mb-0.5",
										children: "Ação · Essência"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-body-sm text-on-surface text-xs",
										children: [
											info.seal.action,
											" · ",
											info.seal.essence
										]
									})]
								})]
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-panel rounded-3xl p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-label-sm text-[10px] text-on-surface-variant/50 uppercase tracking-widest mb-3",
					children: ["Onda Encantada ", info.tone.index]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KinDisplay, {
							kin: wavespell.kinStart,
							size: "xs",
							layout: "badge",
							className: "shrink-0"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `font-label-sm text-[10px] uppercase tracking-widest ${COLOR_CLASS[SEALS[wavespell.sealIndex - 1].color].text}`,
								children: "portador"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-body-md text-on-surface font-medium",
								children: wavespell.sealName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-body-sm text-on-surface-variant/60 text-xs",
								children: [
									"Kin ",
									wavespell.kinStart,
									" → ",
									wavespell.kinStart + 12
								]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-label-sm text-[9px] text-on-surface-variant/50 uppercase tracking-widest",
								children: [
									"Dia ",
									info.tone.index,
									" de 13"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-0.5 mt-1 justify-end",
								children: Array.from({ length: 13 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `w-1.5 h-1.5 rounded-full ${i < info.tone.index ? colors.bg.replace("bg-", "bg-") + " opacity-80" : "bg-on-surface/15"}` }, i))
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-panel rounded-3xl p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-label-sm text-[10px] text-on-surface-variant/50 uppercase tracking-widest mb-3",
					children: "Oráculo · Família de 5"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-5 gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `flex flex-col items-center gap-1 p-2 rounded-2xl border-2 ${colors.border} ${colors.bg}/10`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `font-label-sm text-[8px] tracking-widest uppercase ${colors.text}`,
									children: "Eu"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KinDisplay, {
									kin,
									size: "xs",
									layout: "badge"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `font-label-sm text-[10px] font-bold ${colors.text}`,
									children: kin
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-body-sm text-[8px] text-on-surface-variant/70 text-center leading-tight",
									children: info.seal.name
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OracleKinCard, {
							kin: oGuide,
							role: "Guia",
							roleColor: "text-tertiary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OracleKinCard, {
							kin: oAnalog,
							role: "Analógico",
							roleColor: "text-primary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OracleKinCard, {
							kin: oAntipode,
							role: "Antípoda",
							roleColor: "text-error"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OracleKinCard, {
							kin: oOccult,
							role: "Oculto",
							roleColor: "text-on-surface-variant"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-panel rounded-3xl p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-label-sm text-[10px] text-on-surface-variant/50 uppercase tracking-widest mb-3",
					children: "Plasma Radial"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-1 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlasmaSymbol, {
							index: plasmaIndex + 1,
							size: 48
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `font-label-sm text-[9px] font-mono tracking-wider ${PLASMA_COLORS[plasmaIndex]}`,
							children: plasma.mantraSolar
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: `font-label-sm text-label-sm uppercase tracking-widest font-bold ${PLASMA_COLORS[plasmaIndex]} mb-0.5`,
								children: [
									PLASMA_DISPLAY[plasmaIndex],
									" · ",
									plasma.action
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-body-sm text-on-surface-variant/70 text-xs mb-2",
								children: [
									plasma.chakra,
									" · ",
									plasma.element
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: `font-body-sm italic text-on-surface text-sm border-l-2 pl-3 ${PLASMA_COLORS[plasmaIndex].replace("text-", "border-")}`,
								children: [
									"\"",
									plasma.mantra,
									"\""
								]
							}),
							plasma.center && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-body-sm text-on-surface-variant/55 text-xs mt-2 leading-relaxed",
								children: plasma.center
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "glass-panel rounded-3xl p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KinDisplay, {
							kin: psi,
							size: "xs",
							layout: "badge"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-label-sm text-[9px] text-on-surface-variant/50 uppercase tracking-widest",
							children: "KIN PSI do dia"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: `font-body-sm font-semibold ${COLOR_CLASS[psiInfo.seal.color].text}`,
							children: [
								"KIN ",
								psi,
								" · ",
								psiInfo.fullName
							]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/ciclos/kin/$kin",
						params: { kin: String(psi) },
						className: "text-on-surface-variant hover:text-primary transition-colors",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined text-[20px]",
							children: "arrow_forward"
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-panel rounded-3xl p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined text-base text-astral-violet",
							style: { fontVariationSettings: "'FILL' 1" },
							children: "dark_mode"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-label-sm text-[10px] text-on-surface-variant/50 uppercase tracking-widest",
							children: [
								"Lua ",
								moonNumber,
								" · ",
								moon.tone,
								" do ",
								moon.animal
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-body-sm text-on-surface-variant/70 italic text-sm mb-1",
						children: [
							"\"",
							moon.question,
							"\""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-body-sm text-on-surface-variant/50 text-xs",
						children: [
							"Essência: ",
							moon.essence,
							" · Qualidade: ",
							moon.quality
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/ciclos/kin/$kin",
				params: { kin: String(kin) },
				className: "block glass-panel rounded-3xl p-4 hover:border-primary transition-colors border border-transparent",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-label-sm text-label-sm text-on-surface-variant/70",
						children: "Leitura completa"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-body-md text-on-surface font-medium",
						children: [
							"KIN ",
							kin,
							" · ",
							info.fullName
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "material-symbols-outlined text-on-surface-variant",
						children: "arrow_forward"
					})]
				})
			})
		]
	});
}
function DayOutOfTimeDetail({ galYear, todayUTC, onBack }) {
	const dotDate = (0, import_react.useMemo)(() => new Date(Date.UTC(galYear + 1, 6, 25)), [galYear]);
	const kin = (0, import_react.useMemo)(() => kinFromDate(dotDate), [dotDate]);
	const info = (0, import_react.useMemo)(() => getKinInfo(kin), [kin]);
	const colors = COLOR_CLASS[info.seal.color];
	const isToday = dotDate.getTime() === todayUTC.getTime();
	const isPortal = PORTAL_KINS.has(kin);
	const longDate = formatDate(dotDate, {
		day: "numeric",
		month: "long",
		year: "numeric"
	});
	const weekdayDate = formatDate(dotDate, { weekday: "long" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onBack,
					className: "flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "material-symbols-outlined",
						children: "arrow_back"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-label-sm text-label-sm",
						children: "Calendário"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-1.5 px-3 py-1 rounded-full border border-yellow-400/40 text-yellow-300 text-[10px] font-label-sm tracking-widest uppercase",
					children: "Lua 13 · Dia 29"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-panel rounded-3xl overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 px-5 py-4 bg-gradient-to-r from-yellow-400/10 to-orange-400/5 border-b border-yellow-400/20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-400/20 border border-yellow-400/50 flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "material-symbols-outlined text-yellow-300 text-2xl",
								style: { fontVariationSettings: "'FILL' 1" },
								children: "star"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 flex-wrap mb-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-label-sm text-[9px] tracking-widest uppercase text-yellow-300",
										children: "Dia Fora do Tempo"
									}), isToday && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[9px] font-label-sm",
										children: "hoje"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-serif text-xl text-on-surface leading-tight",
									children: "25 de julho"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-body-sm text-on-surface-variant/60 text-xs capitalize",
									children: [
										weekdayDate,
										" · ",
										longDate
									]
								})
							]
						}),
						isPortal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 px-2 py-0.5 rounded-full bg-error/20 text-error text-[9px] font-label-sm tracking-wide uppercase",
							children: "Portal PV"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-5 py-4 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-body-md text-on-surface text-sm leading-relaxed",
						children: "O Dia Fora do Tempo não pertence a nenhuma das 13 Luas. É o 365º dia do calendário das 13 Luas — um dia sagrado de celebração, arte, perdão e renovação espiritual."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-body-sm text-on-surface-variant/70 text-xs leading-relaxed",
						children: "Neste dia, o tempo linear é suspenso. É dedicado à paz, à expressão criativa e à preparação para o novo Ano Galáctico que começa em 26 de julho."
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `relative glass-panel rounded-3xl overflow-hidden border-l-4 ${colors.border}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute inset-0 ${colors.bg}/4 pointer-events-none` }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex items-start gap-4 p-5 pb-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KinDisplay, {
								kin,
								size: "sm",
								layout: "stack",
								eager: true,
								className: "shrink-0"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 flex-wrap mb-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `font-label-sm text-label-sm ${colors.text} tracking-widest uppercase font-bold`,
											children: ["KIN ", kin]
										}), isToday && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[9px] font-label-sm",
											children: "hoje"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-headline-md text-on-surface leading-tight mb-0.5",
										children: info.fullName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-body-sm text-on-surface-variant/60 italic text-xs",
										children: [
											info.seal.maya,
											" · ",
											info.tone.maya
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `shrink-0 flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl border ${colors.border}/50 bg-surface/30`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-label-sm text-[8px] text-on-surface-variant/60 uppercase tracking-wider",
										children: "Tom"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: `font-headline-sm text-lg font-bold ${colors.text} leading-none`,
										children: info.tone.index
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-label-sm text-[8px] text-on-surface-variant/60 text-center leading-tight",
										children: info.tone.name
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `mx-5 mb-3 border-l-2 pl-4 space-y-0.5 ${colors.border}`,
						children: info.mantra.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `leading-relaxed ${i === 0 ? "font-body-md text-on-surface font-medium" : i === 4 ? "font-body-sm text-on-surface-variant/70 italic mt-1" : "font-body-sm text-on-surface-variant"}`,
							children: line
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `mx-5 mb-5 rounded-xl px-4 py-2.5 ${colors.bg}/10 border ${colors.border}/50`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `font-label-sm text-[9px] uppercase tracking-widest mb-0.5 ${colors.text}`,
							children: "Afirmação"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-body-sm italic text-on-surface text-sm",
							children: [
								"\"",
								info.affirmation,
								"\""
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-panel rounded-3xl p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined text-base text-primary",
							style: { fontVariationSettings: "'FILL' 1" },
							children: "sunny"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-label-sm text-[10px] text-on-surface-variant/50 uppercase tracking-widest",
							children: "Próximo Ano Galáctico"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-body-md text-on-surface font-medium text-sm",
						children: ["26 de julho de ", galYear + 1]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-body-sm text-on-surface-variant/60 text-xs mt-0.5",
						children: [
							"Lua 1 · Dia 1 · início do Ano Galáctico ",
							galYear + 1,
							"–",
							galYear + 2
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/ciclos/kin/$kin",
				params: { kin: String(kin) },
				className: "block glass-panel rounded-3xl p-4 hover:border-primary transition-colors border border-transparent",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-label-sm text-label-sm text-on-surface-variant/70",
						children: "Leitura completa do KIN"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-body-md text-on-surface font-medium",
						children: [
							"KIN ",
							kin,
							" · ",
							info.fullName
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "material-symbols-outlined text-on-surface-variant",
						children: "arrow_forward"
					})]
				})
			})
		]
	});
}
//#endregion
export { AlmanaquePage as component };
