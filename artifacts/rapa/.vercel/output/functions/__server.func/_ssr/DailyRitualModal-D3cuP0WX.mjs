import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as getKinInfo, y as kinFromDate } from "./tzolkin-CeuRSgpU.mjs";
import { t as KinBadge } from "./KinBadge-dubxczgb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DailyRitualModal-D3cuP0WX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DAILY_FLOW_STEPS = [
	{
		icon: "wb_twilight",
		when: "Ao acordar",
		title: "Sintonize o Kin de hoje",
		body: "Leia a afirmação galáctica em voz alta e deixe que ela dê o tom da sua manhã."
	},
	{
		icon: "waves",
		when: "Durante o dia",
		title: "Situe-se na Onda",
		body: "Em qual dos 13 tons você está? Início, ápice ou fechamento do ciclo — cada fase pede um ritmo diferente."
	},
	{
		icon: "hub",
		when: "Nos encontros",
		title: "Consulte o Oráculo",
		body: "Perceba quem te guia, quem te apoia e quem te desafia hoje — inclusive nas pessoas que cruzam o seu caminho."
	},
	{
		icon: "edit_note",
		when: "Antes de dormir",
		title: "Registre no Diário",
		body: "Anote como a energia do dia se manifestou. Com o tempo, os padrões das suas Ondas ficam visíveis."
	}
];
function DailyFlowCards({ onClose }) {
	const [active, setActive] = (0, import_react.useState)(0);
	const touchStartX = (0, import_react.useRef)(null);
	const total = DAILY_FLOW_STEPS.length;
	const todayKin = (0, import_react.useMemo)(() => kinFromDate(/* @__PURE__ */ new Date()), []);
	const kinInfo = (0, import_react.useMemo)(() => getKinInfo(todayKin), [todayKin]);
	const todayTrecenaStart = (0, import_react.useMemo)(() => kinInfo.trecena.kinStart, [kinInfo]);
	const go = (dir) => setActive((a) => Math.min(total - 1, Math.max(0, a + dir)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative overflow-hidden",
		onTouchStart: (e) => {
			touchStartX.current = e.touches[0].clientX;
		},
		onTouchEnd: (e) => {
			if (touchStartX.current === null) return;
			const dx = e.changedTouches[0].clientX - touchStartX.current;
			if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
			touchStartX.current = null;
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "flex transition-transform duration-500 ease-out",
			style: { transform: `translateX(-${active * 100}%)` },
			children: DAILY_FLOW_STEPS.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "w-full flex-shrink-0 px-0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-primary/20 bg-primary/5 p-4 flex flex-col gap-2 min-h-[150px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "material-symbols-outlined text-lg",
									style: { fontVariationSettings: "'FILL' 1" },
									children: step.icon
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-label-sm text-label-sm text-primary/50",
								children: [
									i + 1,
									" / ",
									total
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-label-sm text-label-sm uppercase tracking-wider text-primary/70",
							children: step.when
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-body-sm font-semibold text-on-surface",
							children: step.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-body-sm text-on-surface-variant/90",
							children: step.body
						}),
						i === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4 my-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-shrink-0 w-14 h-14",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KinBadge, {
										kin: todayKin,
										eager: true,
										className: "w-full h-full"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-label-sm text-label-sm uppercase tracking-wider text-primary/60 mb-0.5",
										children: [
											"Kin ",
											todayKin,
											" · ",
											kinInfo.seal.name
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-body-sm text-on-surface-variant/90 italic leading-snug line-clamp-3",
										children: [
											"\"",
											kinInfo.affirmation,
											"\""
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-l-2 border-primary/30 pl-3 space-y-0.5 my-1",
								children: [kinInfo.mantra.slice(0, 4).map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: `font-body-sm leading-snug ${i === 0 ? "text-on-surface font-medium" : "text-on-surface-variant/80"}`,
									children: line
								}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-body-sm text-on-surface-variant/50 italic pt-1",
									children: kinInfo.mantra[4]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/ciclos/kin/$kin",
								params: { kin: String(todayKin) },
								onClick: onClose,
								className: "mt-1 self-start inline-flex items-center gap-1 text-primary font-label-sm text-label-sm hover:underline",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "material-symbols-outlined text-sm",
										children: "open_in_new"
									}),
									"Abrir Kin ",
									todayKin,
									" de hoje"
								]
							})
						] }),
						i === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/ciclos/kin/$kin",
							params: { kin: String(todayTrecenaStart) },
							onClick: onClose,
							className: "mt-1 self-start inline-flex items-center gap-1 text-primary font-label-sm text-label-sm hover:underline",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "material-symbols-outlined text-sm",
									children: "open_in_new"
								}),
								"Ver minha Onda atual (Kin ",
								todayTrecenaStart,
								")"
							]
						}),
						i === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/ciclos/kin/$kin",
							params: { kin: String(todayKin) },
							onClick: onClose,
							className: "mt-1 self-start inline-flex items-center gap-1 text-primary font-label-sm text-label-sm hover:underline",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "material-symbols-outlined text-sm",
								children: "open_in_new"
							}), "Abrir o Oráculo do dia"]
						}),
						i === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/jornada",
							onClick: onClose,
							className: "mt-1 self-start inline-flex items-center gap-1 text-primary font-label-sm text-label-sm hover:underline",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "material-symbols-outlined text-sm",
								children: "open_in_new"
							}), "Ir para o Diário"]
						})
					]
				})
			}, step.title))
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between mt-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => go(-1),
				disabled: active === 0,
				"aria-label": "Passo anterior",
				className: "w-9 h-9 rounded-full border border-primary/30 text-primary flex items-center justify-center disabled:opacity-30 hover:bg-primary/10 transition-colors",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "material-symbols-outlined text-base",
					children: "arrow_back"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2",
				children: DAILY_FLOW_STEPS.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": `Ir para o passo ${i + 1}`,
					onClick: () => setActive(i),
					className: `h-2 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-primary" : "w-2 bg-primary/25"}`
				}, step.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => go(1),
				disabled: active === total - 1,
				"aria-label": "Próximo passo",
				className: "w-9 h-9 rounded-full border border-primary/30 text-primary flex items-center justify-center disabled:opacity-30 hover:bg-primary/10 transition-colors",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "material-symbols-outlined text-base",
					children: "arrow_forward"
				})
			})
		]
	})] });
}
function DailyRitualModal({ open, onClose }) {
	const [dateLabel, setDateLabel] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setDateLabel((/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR", {
			weekday: "long",
			day: "numeric",
			month: "long"
		}));
	}, []);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center",
		onClick: onClose,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 bg-black/50 backdrop-blur-sm",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 w-full sm:max-w-sm mx-auto bg-surface rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-4 duration-300",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 h-1 rounded-full bg-on-surface/20 mx-auto mb-5 sm:hidden" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between mb-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined text-primary text-2xl",
							style: { fontVariationSettings: "'FILL' 1" },
							children: "self_improvement"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-title-lg text-title-lg text-on-surface leading-tight",
							children: "Ritual do dia"
						}), dateLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-label-sm text-label-sm text-primary/60 leading-tight",
							children: dateLabel
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						"aria-label": "Fechar",
						className: "w-8 h-8 rounded-full hover:bg-surface-container-low flex items-center justify-center text-on-surface-variant",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined text-base",
							children: "close"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-body-sm text-on-surface-variant/70 mb-4",
					children: "Um ritual simples de poucos minutos — da manhã à noite."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DailyFlowCards, { onClose }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-body-sm text-on-surface-variant/70 mt-4 pt-3 border-t border-primary/10 flex items-start gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "material-symbols-outlined text-primary text-base flex-shrink-0",
						style: { fontVariationSettings: "'FILL' 1" },
						children: "auto_awesome"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Em dias de ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Portal Galáctico" }),
						", reserve um momento extra de silêncio — são dias de escuta profunda."
					] })]
				})
			]
		})]
	});
}
//#endregion
export { DailyRitualModal as n, DailyFlowCards as t };
