import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as getTodayKinInfo, c as TONES, g as getKinInfo, p as dateFromKin } from "./tzolkin-CeuRSgpU.mjs";
import { t as KinBadge } from "./KinBadge-dubxczgb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onda-encantada-BXXYfL_v.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COLOR_TEXT = {
	vermelho: "text-error",
	branco: "text-on-surface",
	azul: "text-primary",
	amarelo: "text-tertiary"
};
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
var WEEKDAYS_PT = [
	"dom",
	"seg",
	"ter",
	"qua",
	"qui",
	"sex",
	"sáb"
];
var MONTHS_PT = [
	"jan",
	"fev",
	"mar",
	"abr",
	"mai",
	"jun",
	"jul",
	"ago",
	"set",
	"out",
	"nov",
	"dez"
];
/** Formata uma data UTC como "qui, 14/08". Se isToday=true, prefixa com "Hoje · ". */
function formatKinDate(date, isToday) {
	const formatted = `${WEEKDAYS_PT[date.getUTCDay()]}, ${String(date.getUTCDate()).padStart(2, "0")}/${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
	return isToday ? `Hoje · ${formatted}` : formatted;
}
/** Formata o intervalo de datas da onda: "13–25 de ago." ou "28 de jul – 9 de ago." */
function formatDateRange(start, end) {
	const sd = start.getUTCDate();
	const ed = end.getUTCDate();
	const sm = MONTHS_PT[start.getUTCMonth()];
	const em = MONTHS_PT[end.getUTCMonth()];
	if (sm === em) return `${sd}–${ed} de ${sm}.`;
	return `${sd} de ${sm}. – ${ed} de ${em}.`;
}
/**
* Avança 1 dia Dreamspell a partir de uma data UTC, pulando 29/fev.
* Usado para calcular datas dos 13 Kins consecutivos da onda.
*/
function nextDreamspellDay(date) {
	let next = new Date(date.getTime() + 864e5);
	if (next.getUTCMonth() === 1 && next.getUTCDate() === 29) next = new Date(next.getTime() + 864e5);
	return next;
}
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
function OndaEncantadaPage() {
	const [data, setData] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const info = getTodayKinInfo();
		const { kinStart, seal } = info.trecena;
		const kins = Array.from({ length: 13 }, (_, i) => (kinStart - 1 + i) % 260 + 1);
		const dates = [];
		let current = dateFromKin(kinStart);
		for (let i = 0; i < 13; i++) {
			dates.push(current);
			current = nextDreamspellDay(current);
		}
		setData({
			todayKin: info.kin,
			kins,
			dates,
			sealName: seal.name,
			sealColor: seal.color,
			kinStart,
			kinEnd: kins[12]
		});
	}, []);
	const grid = data ? (() => {
		const g = Array.from({ length: 5 }, () => Array(6).fill(null));
		POSITIONS.forEach(([r, c], i) => {
			g[r][c] = data.kins[i];
		});
		return g;
	})() : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pt-20 pb-32 px-container-margin max-w-[520px] mx-auto space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-label-sm text-label-sm text-muted-stardust uppercase tracking-widest text-xs",
					children: "Onda Encantada"
				}), data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: `font-serif text-3xl ${COLOR_TEXT[data.sealColor]}`,
					children: data.sealName
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-muted-stardust/70 text-sm",
					children: [
						"Kin ",
						data.kinStart,
						" → ",
						data.kinEnd,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mx-2 opacity-40",
							children: "·"
						}),
						formatDateRange(data.dates[0], data.dates[12])
					]
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-9 w-40 bg-white/10 rounded animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-48 bg-white/8 rounded animate-pulse" })] })]
			}),
			grid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2",
				style: {
					gridTemplateColumns: "repeat(6, 1fr)",
					gridTemplateRows: "repeat(5, 1fr)"
				},
				children: grid.flatMap((row, rIdx) => row.map((kin, cIdx) => kin === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}, `${rIdx}-${cIdx}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					kin,
					toneNumber: data.kins.indexOf(kin) + 1,
					isToday: kin === data.todayKin
				}, kin)))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 bg-white/5 rounded-2xl animate-pulse" }),
			data && data.kins.includes(data.todayKin) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-center text-sm text-muted-stardust/70",
				children: [
					"Você está no tom",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-astral-violet",
						children: data.kins.indexOf(data.todayKin) + 1
					}),
					" ",
					"· Kin ",
					data.todayKin
				]
			}),
			data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "glass-card rounded-2xl divide-y divide-outline-variant/20 overflow-hidden",
				children: data.kins.map((kin, i) => {
					const info = getKinInfo(kin);
					const tone = TONES[i];
					const isToday = kin === data.todayKin;
					const kinDate = data.dates[i];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/ciclos/kin/$kin",
						params: { kin: String(kin) },
						className: `flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors ${isToday ? "bg-astral-violet/10" : ""}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-9 h-9 shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KinBadge, {
									kin,
									isToday,
									className: "w-full h-full"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: `text-sm font-medium truncate ${isToday ? "text-astral-violet" : "text-on-surface"}`,
									children: info.fullName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-stardust/60",
									children: [
										"Kin ",
										kin,
										" · Tom ",
										tone?.name ?? i + 1
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-xs shrink-0 ${isToday ? "bg-astral-violet/20 text-astral-violet px-2 py-0.5 rounded-full font-medium" : "text-muted-stardust/50"}`,
								children: formatKinDate(kinDate, isToday)
							})
						]
					}, kin);
				})
			})
		]
	});
}
//#endregion
export { OndaEncantadaPage as component };
