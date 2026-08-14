import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as SEAL_IMAGE } from "./seal-images-Bln5NZxW.mjs";
import { t as PlasmaSymbol } from "./PlasmaSymbol-CQiqqWdH.mjs";
import { a as plasmaOfChakra, i as chakraDayReading, n as CHAKRAS_ASCENDENTE, r as activeModel, t as CHAKRAS } from "./chakras-CSq1nmXv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chakras-Ny0gL6QN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var VIEWS = [
	{
		key: "corporal",
		label: "Visualização Corporal",
		icon: "accessibility_new"
	},
	{
		key: "mapa",
		label: "Mapa Energético",
		icon: "table_rows"
	},
	{
		key: "correspondencias",
		label: "Correspondências",
		icon: "hub"
	}
];
function addDays(d, n) {
	const out = new Date(d);
	out.setDate(out.getDate() + n);
	return out;
}
function toInputValue(d) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function sameDay(a, b) {
	return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function ChakrasPage() {
	const [view, setView] = (0, import_react.useState)("corporal");
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const [hoverId, setHoverId] = (0, import_react.useState)(null);
	const [date, setDate] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	const reading = (0, import_react.useMemo)(() => chakraDayReading(date), [date]);
	const selected = selectedId ? CHAKRAS.find((c) => c.id === selectedId) ?? null : null;
	const model = activeModel();
	const today = /* @__PURE__ */ new Date();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pt-24 pb-32 px-container-margin max-w-[720px] mx-auto min-h-screen relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 texture-overlay z-[-1]",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-headline-lg text-headline-lg text-on-surface mb-2",
					children: "7 Chakras"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-body-md text-on-surface-variant opacity-80",
					children: "Explore seu mapa energético através da sincronicidade do tempo."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-6 flex flex-wrap items-center gap-2",
				children: [[
					{
						label: "Ontem",
						d: addDays(today, -1)
					},
					{
						label: "Hoje",
						d: today
					},
					{
						label: "Amanhã",
						d: addDays(today, 1)
					}
				].map(({ label, d }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setDate(d),
					className: `px-4 py-2 rounded-full font-label-sm text-label-sm transition-all border ${sameDay(date, d) ? "bg-primary text-on-primary border-primary shadow-md shadow-primary/20" : "border-outline-variant/40 text-on-surface-variant hover:bg-surface-container-high"}`,
					children: label
				}, label)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "ml-auto flex items-center gap-2 px-3 py-2 rounded-full border border-outline-variant/40 text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "material-symbols-outlined text-[18px]",
						children: "calendar_month"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "date",
						value: toInputValue(date),
						onChange: (e) => {
							const [y, m, d] = e.target.value.split("-").map(Number);
							if (y && m && d) setDate(new Date(y, m - 1, d));
						},
						className: "bg-transparent font-label-sm text-label-sm focus:outline-none [color-scheme:dark]"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-card rounded-3xl p-5 relative overflow-hidden",
					style: { boxShadow: `0 0 60px -20px ${reading.chakra.cor}55, inset 0 0 80px -60px ${reading.chakra.cor}66` },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-label-sm text-label-sm tracking-widest uppercase text-on-surface-variant mb-2",
							children: ["Chakra em Sintonia com o Kin ", sameDay(date, today) ? "de Hoje" : "do Dia"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setSelectedId(reading.chakra.id);
								},
								className: "relative shrink-0 w-16 h-16 rounded-full flex items-center justify-center transition-transform hover:scale-105",
								style: { background: `radial-gradient(circle, ${reading.chakra.cor}66, transparent 70%)` },
								"aria-label": `Abrir chakra ${reading.chakra.nome}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-8 h-8 rounded-full chakra-pulse",
									style: {
										backgroundColor: reading.chakra.cor,
										boxShadow: `0 0 24px ${reading.chakra.cor}`
									}
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-headline-md text-headline-md text-on-surface",
									children: ["Chakra ", reading.chakra.nome]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-body-md text-on-surface-variant",
									children: [
										"Plasma ",
										reading.plasma.name,
										" · Kin ",
										reading.kin,
										" — ",
										reading.kinInfo.fullName
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-body-md text-on-surface-variant mt-4 leading-relaxed",
							children: reading.interpretacao
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2 mt-4",
							children: [
								`Selo: ${reading.kinInfo.seal.name}`,
								`Tom: ${reading.kinInfo.tone.name}`,
								`Onda: ${reading.kinInfo.trecena.seal.name}`,
								`Castelo ${reading.castle.index}`,
								reading.sincronario.dayOutOfTime ? "Dia Fora do Tempo" : `Lua ${reading.sincronario.moon} · Dia ${reading.sincronario.day}`
							].map((chip) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-3 py-1 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface-variant",
								children: chip
							}, chip))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1 bg-surface-container-low p-1 rounded-2xl border border-outline-variant/30",
					children: VIEWS.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setView(v.key),
						className: `flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl font-label-sm text-[11px] sm:text-label-sm transition-all ${view === v.key ? "bg-primary text-on-primary shadow-md shadow-primary/20" : "text-on-surface-variant hover:bg-surface-container-high"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined text-[18px]",
							children: v.icon
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: v.label
						})]
					}, v.key))
				})
			}),
			view === "corporal" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BodyView, {
				highlightedId: reading.chakra.id,
				selectedId,
				hoverId,
				onHover: setHoverId,
				onSelect: (id) => setSelectedId(id === selectedId ? null : id)
			}),
			view === "mapa" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "space-y-3 mb-6",
				children: CHAKRAS.map((c) => {
					const plasma = plasmaOfChakra(c);
					const isDay = c.id === reading.chakra.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setSelectedId(c.id),
						className: `w-full text-left glass-card rounded-2xl p-4 flex items-center gap-4 transition-all hover:scale-[1.01] ${isDay ? "ring-1" : ""}`,
						style: isDay ? {
							boxShadow: `0 0 40px -14px ${c.cor}`,
							borderColor: `${c.cor}66`
						} : void 0,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 w-11 h-11 rounded-full flex items-center justify-center",
								style: { background: `radial-gradient(circle, ${c.cor}44, transparent 75%)` },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "material-symbols-outlined text-[22px]",
									style: { color: c.cor },
									children: c.simbolo
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-baseline gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-headline-sm text-on-surface",
										children: [
											c.numero,
											". ",
											c.nome
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-label-sm text-label-sm",
										style: { color: c.cor },
										children: c.corNome
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block font-body-sm text-on-surface-variant truncate",
									children: [
										c.localizacao,
										" · Plasma ",
										plasma.name,
										" · ",
										c.mantra,
										" · ",
										c.palavraChave
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "material-symbols-outlined text-on-surface-variant/60",
								children: "chevron_right"
							})
						]
					}, c.id);
				})
			}),
			view === "correspondencias" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CorrespondencesView, {
				chakra: selected ?? reading.chakra,
				reading,
				onPick: (id) => setSelectedId(id)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-body-sm text-on-surface-variant/70 leading-relaxed mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "material-symbols-outlined text-[14px] align-middle mr-1",
						children: "info"
					}),
					"Modelo ativo: ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: model.nome }),
					". Chakra ↔ Plasma Radial segue o sistema contemporâneo do Sincronário/Dreamspell; cores, símbolos e elementos são associações complementares deste projeto. Selo, Tom, Kin, Onda, Castelo e Lua são calculados a partir da data."
				]
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChakraPanel, {
				chakra: selected,
				reading,
				onClose: () => setSelectedId(null)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @keyframes chakraPulse {
          0%, 100% { transform: scale(1); opacity: 0.95; }
          50% { transform: scale(1.18); opacity: 1; }
        }
        .chakra-pulse { animation: chakraPulse 3s ease-in-out infinite; display: inline-block; }
      ` })
		]
	});
}
function BodyView({ highlightedId, selectedId, hoverId, onHover, onSelect }) {
	const hovered = hoverId ? CHAKRAS.find((c) => c.id === hoverId) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mb-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-card rounded-3xl relative overflow-hidden px-4 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 pointer-events-none",
					style: { background: "radial-gradient(ellipse 60% 50% at 50% 35%, rgba(182,199,235,0.06), transparent 70%)" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto",
					style: {
						width: "min(320px, 80vw)",
						aspectRatio: "1/1"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/chakra-silhouette.png",
							alt: "Silhueta em meditação com os 7 chakras",
							className: "absolute inset-0 w-full h-full object-cover rounded-2xl",
							draggable: false
						}),
						CHAKRAS.map((c) => {
							const isSelected = selectedId === c.id;
							const isDay = highlightedId === c.id;
							const dim = selectedId !== null && !isSelected;
							const size = isSelected ? 34 : 26;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onMouseEnter: () => onHover(c.id),
								onMouseLeave: () => onHover(null),
								onFocus: () => onHover(c.id),
								onBlur: () => onHover(null),
								onClick: () => onSelect(c.id),
								"aria-label": `Chakra ${c.nome} — ${c.localizacao}`,
								className: "absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500",
								style: {
									left: "50%",
									top: `${c.posY * 100}%`,
									width: size,
									height: size,
									backgroundColor: c.cor,
									opacity: dim ? .35 : 1,
									boxShadow: isSelected ? `0 0 34px 6px ${c.cor}, 0 0 90px ${c.cor}88` : isDay ? `0 0 26px 3px ${c.cor}, 0 0 60px ${c.cor}66` : `0 0 16px ${c.cor}aa`,
									animation: `chakraPulse ${2.4 + c.numero * .25}s ease-in-out infinite`
								}
							}, c.id);
						}),
						hovered && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute z-20 pointer-events-none px-4 py-3 rounded-2xl bg-surface-container-high/95 backdrop-blur-md border border-outline-variant/40 shadow-xl w-52",
							style: {
								left: "62%",
								top: `${Math.min(Math.max(hovered.posY * 100 - 6, 2), 82)}%`
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-headline-sm text-on-surface flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-2.5 h-2.5 rounded-full inline-block",
										style: { backgroundColor: hovered.cor }
									}), hovered.nome]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-body-sm text-on-surface-variant mt-1",
									children: [
										hovered.corNome,
										" · ",
										hovered.localizacao
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-label-sm text-label-sm mt-1",
									style: { color: hovered.cor },
									children: hovered.palavraChave
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center font-body-sm text-on-surface-variant/60 mt-4",
					children: "Toque em um chakra para revelar sua rede de correspondências."
				})
			]
		})
	});
}
function CorrespondencesView({ chakra, reading, onPick }) {
	const plasma = plasmaOfChakra(chakra);
	const isDayChakra = chakra.id === reading.chakra.id;
	const flow = [
		{
			titulo: "Chakra",
			valor: `${chakra.nome} · ${chakra.identidade}`,
			detalhe: chakra.localizacao,
			cor: chakra.cor
		},
		{
			titulo: "Plasma Radial",
			valor: `${plasma.name} — ${plasma.action}`,
			detalhe: `${plasma.day} · ${plasma.quality}`,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlasmaSymbol, {
				index: plasma.index,
				size: 28
			})
		},
		...isDayChakra ? [
			{
				titulo: "Selo Solar (do dia)",
				valor: reading.kinInfo.seal.name,
				detalhe: `${reading.kinInfo.seal.action} · ${reading.kinInfo.seal.power}`,
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: SEAL_IMAGE[reading.kinInfo.seal.index],
					alt: "",
					className: "w-8 h-8 rounded-md object-contain"
				})
			},
			{
				titulo: "Tom Galáctico (do dia)",
				valor: `${reading.kinInfo.tone.index} · ${reading.kinInfo.tone.name}`,
				detalhe: reading.kinInfo.tone.essence
			},
			{
				titulo: "Kin (do dia)",
				valor: `Kin ${reading.kin}`,
				detalhe: reading.kinInfo.fullName
			},
			{
				titulo: "Onda Encantada",
				valor: `Onda do ${reading.kinInfo.trecena.seal.name}`,
				detalhe: `Início no Kin ${reading.kinInfo.trecena.kinStart}`
			},
			{
				titulo: "Castelo",
				valor: `Castelo ${reading.castle.index}`,
				detalhe: reading.castle.power
			},
			{
				titulo: "Lua (13 Luas × 28 dias)",
				valor: reading.sincronario.dayOutOfTime ? "Dia Fora do Tempo" : `Lua ${reading.sincronario.moon} — ${reading.sincronario.moonName}`,
				detalhe: reading.sincronario.dayOutOfTime ? void 0 : `Dia ${reading.sincronario.day} de 28`
			}
		] : []
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mb-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-card rounded-3xl p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-4 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-headline-sm text-on-surface",
						children: "Correspondências Galácticas"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: chakra.id,
						onChange: (e) => onPick(e.target.value),
						className: "bg-surface-container-high rounded-full px-3 py-1.5 font-label-sm text-label-sm text-on-surface focus:outline-none",
						"aria-label": "Escolher chakra",
						children: CHAKRAS_ASCENDENTE.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: c.id,
							children: [
								c.numero,
								". ",
								c.nome
							]
						}, c.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col items-stretch",
					children: flow.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [i > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center py-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-px h-5",
							style: { background: `linear-gradient(${chakra.cor}88, transparent)` }
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 flex items-center gap-3",
						style: i === 0 ? {
							borderColor: `${step.cor}55`,
							boxShadow: `0 0 30px -14px ${step.cor}`
						} : void 0,
						children: [step.icon ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-2.5 h-2.5 rounded-full shrink-0",
							style: { backgroundColor: step.cor ?? chakra.cor }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant/70",
									children: step.titulo
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-body-md text-on-surface",
									children: step.valor
								}),
								step.detalhe && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-body-sm text-on-surface-variant",
									children: step.detalhe
								})
							]
						})]
					})] }, step.titulo))
				}),
				!isDayChakra && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-body-sm text-on-surface-variant/70 mt-4 leading-relaxed",
					children: [
						"Selo, Tom, Kin, Onda, Castelo e Lua são correspondências do ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "dia" }),
						" — elas se revelam quando este chakra está em sintonia com a data (",
						chakra.diaSemana,
						"). Use a navegação temporal acima para visitar um ",
						chakra.diaSemana.toLowerCase(),
						" e ver a rede completa."
					]
				})
			]
		})
	});
}
function ChakraPanel({ chakra, reading, onClose }) {
	const plasma = plasmaOfChakra(chakra);
	const isDayChakra = chakra.id === reading.chakra.id;
	const rows = [
		{
			label: "Cor",
			value: `${chakra.corNome} (${chakra.cor})`
		},
		{
			label: "Localização",
			value: chakra.localizacao
		},
		{
			label: "Elemento",
			value: chakra.elemento
		},
		{
			label: "Função energética",
			value: chakra.funcaoEnergetica
		},
		{
			label: "Órgãos relacionados",
			value: chakra.orgaos
		},
		{
			label: "Mantra",
			value: `${chakra.mantra} — “${plasma.mantra}”`
		},
		{
			label: "Dia da semana",
			value: chakra.diaSemana
		},
		{
			label: "Ciclo de desenvolvimento",
			value: chakra.idadeCiclo
		},
		{
			label: "Plasma Radial",
			value: `${plasma.name} — ${plasma.action} (${plasma.quality})`
		},
		...isDayChakra ? [
			{
				label: "Selo Solar (hoje)",
				value: reading.kinInfo.seal.name
			},
			{
				label: "Tom Galáctico (hoje)",
				value: `${reading.kinInfo.tone.index} · ${reading.kinInfo.tone.name}`
			},
			{
				label: "Kin (hoje)",
				value: `Kin ${reading.kin} — ${reading.kinInfo.fullName}`
			},
			{
				label: "Onda Encantada (hoje)",
				value: `Onda do ${reading.kinInfo.trecena.seal.name}`
			},
			{
				label: "Afirmação Galáctica",
				value: reading.kinInfo.affirmation
			}
		] : []
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": `Detalhes do chakra ${chakra.nome}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
			onClick: onClose,
			"aria-label": "Fechar"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full sm:max-w-lg max-h-[85vh] overflow-y-auto bg-surface-container-low border border-outline-variant/40 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-[panelIn_.35s_cubic-bezier(.16,1,.3,1)]",
			style: { boxShadow: `0 -10px 80px -30px ${chakra.cor}` },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4 mb-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 w-14 h-14 rounded-full flex items-center justify-center",
							style: { background: `radial-gradient(circle, ${chakra.cor}55, transparent 75%)` },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "material-symbols-outlined text-[28px] chakra-pulse",
								style: { color: chakra.cor },
								children: chakra.simbolo
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-headline-md text-headline-md text-on-surface",
								children: [
									chakra.numero,
									". Chakra ",
									chakra.nome
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-body-md text-on-surface-variant",
								children: [
									chakra.nomeSanskrito,
									" · ",
									chakra.identidade
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onClose,
							className: "shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors",
							"aria-label": "Fechar painel",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "material-symbols-outlined",
								children: "close"
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-40 shrink-0 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant/70 pt-0.5",
							children: r.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-body-md text-on-surface leading-relaxed",
							children: r.value
						})]
					}, r.label))
				}),
				!isDayChakra && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-body-sm text-on-surface-variant/70 mt-5 leading-relaxed",
					children: [
						"Kin, Selo, Tom e Onda são revelados quando este chakra rege o dia (",
						chakra.diaSemana,
						")."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
          @keyframes panelIn {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
        ` })
			]
		})]
	});
}
//#endregion
export { ChakrasPage as component };
