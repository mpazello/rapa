import { r as __toESM } from "../_runtime.mjs";
import { c as createServerFn } from "./request-response-DE8FPPId.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { d as Link, f as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useServerFn, t as createSsrRpc } from "./createSsrRpc-DvRDvdGH.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-DJw85tyK.mjs";
import { n as useAuth } from "./use-auth-C250R4UH.mjs";
import { a as stringType, i as objectType, r as numberType, t as arrayType } from "../_libs/zod.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as yearBearer, g as getKinInfo, y as kinFromDate } from "./tzolkin-CeuRSgpU.mjs";
import { n as CHAKRAS_ASCENDENTE } from "./chakras-CSq1nmXv.mjs";
import { n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dia-fora-do-tempo-YvqjGF1j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Get the current galactic year's experience (year = calendar year of July 26 start). */
var getDFTDTExperience = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("45043b0f5cbdfd3044451af20093e2a2efe181b779c72ecef0c4ecee3d023226"));
var saveDFTDTPortal = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
	year: numberType().int(),
	current_portal: numberType().int().min(0).max(7),
	portal_1_closing: stringType().max(3e3).optional(),
	portal_2_release: stringType().max(3e3).optional(),
	portal_3_gratitude: arrayType(stringType().max(500)).max(3).optional(),
	portal_4_forgiveness: stringType().max(3e3).optional(),
	portal_5_celebration: stringType().max(3e3).optional(),
	portal_6_intentions: arrayType(stringType().max(200)).max(4).optional(),
	portal_7_renewal: stringType().max(3e3).optional()
}).parse(d)).handler(createSsrRpc("774ddde3d3820594b6b6c159b10ea8d66eb47e32eaba25c06808a1dab571e711"));
var completeDFTDT = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ year: numberType().int() }).parse(d)).handler(createSsrRpc("7e4e00f5cb0896adfb5d6926102355d50545fad6e33fafa14171335c4cf5689a"));
var getYearStats = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("22eb1f172653b5f7d59ce5be820b5d986c6bfc1ab86ae0c0c0445b70200b7bac"));
var PORTAL_CONFIG = [
	{
		num: 1,
		key: "portal_1_closing",
		verb: "ENCERRAR",
		title: "O que terminou?",
		prompt: "Quais ciclos, situações ou experiências chegaram ao fim neste ano que passou?",
		msg: "Todo fim é um início disfarçado.",
		inputType: "textarea"
	},
	{
		num: 2,
		key: "portal_2_release",
		verb: "LIBERAR",
		title: "O que você não quer carregar?",
		prompt: "O que você escolhe deixar para trás? Escreva sem julgamento.",
		msg: "Você não precisa levar tudo com você.",
		inputType: "dissolve"
	},
	{
		num: 3,
		key: "portal_3_gratitude",
		verb: "AGRADECER",
		title: "Pelo que você é grato?",
		prompt: "Registre até três coisas pelas quais você é grato neste ciclo.",
		msg: "A gratidão transforma o que temos.",
		inputType: "triple"
	},
	{
		num: 4,
		key: "portal_4_forgiveness",
		verb: "PERDOAR",
		title: "O que precisa ser perdoado?",
		prompt: "Uma reflexão pessoal e privada. Ninguém além de você verá esta resposta.",
		msg: "Perdoar não apaga o passado. Apenas muda o que você escolhe carregar.",
		inputType: "textarea",
		isPrivate: true
	},
	{
		num: 5,
		key: "portal_5_celebration",
		verb: "CELEBRAR",
		title: "O que você realizou?",
		prompt: "Reconheça suas conquistas, grandes e pequenas. Seu ciclo em retrospectiva.",
		msg: "Cada passo importa. Cada dia registrado é um traço de presença.",
		inputType: "celebration"
	},
	{
		num: 6,
		key: "portal_6_intentions",
		verb: "INTENCIONAR",
		title: "O que você deseja cultivar?",
		prompt: "Escolha até 3 intenções para o novo ciclo.",
		msg: "Uma intenção clara é a primeira forma de criação.",
		inputType: "intentions"
	},
	{
		num: 7,
		key: "portal_7_renewal",
		verb: "RENOVAR",
		title: "O espaço foi criado.",
		prompt: "",
		msg: "O ciclo terminou. O espaço foi criado. Agora você pode escolher como entrar no próximo.",
		inputType: "renewal"
	}
];
var INTENTION_OPTIONS = [
	{
		emoji: "🌱",
		label: "Crescimento"
	},
	{
		emoji: "💧",
		label: "Fluidez"
	},
	{
		emoji: "🔥",
		label: "Coragem"
	},
	{
		emoji: "💚",
		label: "Harmonia"
	},
	{
		emoji: "🌬️",
		label: "Liberdade"
	},
	{
		emoji: "🌙",
		label: "Intuição"
	},
	{
		emoji: "☀️",
		label: "Clareza"
	},
	{
		emoji: "✨",
		label: "Presença"
	},
	{
		emoji: "❤️",
		label: "Amor"
	},
	{
		emoji: "🌀",
		label: "Transformação"
	}
];
function daysUntilDFTDT() {
	const now = /* @__PURE__ */ new Date();
	const y = now.getFullYear();
	let next = new Date(y, 6, 25);
	if (now > next) next = new Date(y + 1, 6, 25);
	return Math.ceil((next.getTime() - now.getTime()) / 864e5);
}
function isToday(month, day) {
	const n = /* @__PURE__ */ new Date();
	return n.getMonth() === month && n.getDate() === day;
}
var isDFTDT = isToday(6, 25);
var isNewCycle = isToday(6, 26);
var currentYear = (/* @__PURE__ */ new Date()).getFullYear();
var defaultForm = {
	portal_1_closing: "",
	portal_2_release: "",
	portal_3_gratitude: [
		"",
		"",
		""
	],
	portal_4_forgiveness: "",
	portal_5_celebration: "",
	portal_6_intentions: [],
	portal_7_renewal: ""
};
function DiaForaDoTempoPage() {
	const { user, loading: authLoading } = useAuth();
	const navigate = useNavigate();
	const [phase, setPhase] = (0, import_react.useState)("loading");
	const [portalIdx, setPortalIdx] = (0, import_react.useState)(0);
	const [form, setForm] = (0, import_react.useState)(defaultForm);
	const [dissolved, setDissolved] = (0, import_react.useState)(false);
	const [chakrasLit, setChakrasLit] = (0, import_react.useState)(0);
	const [customIntention, setCustomIntention] = (0, import_react.useState)("");
	const fnGet = useServerFn(getDFTDTExperience);
	const fnSave = useServerFn(saveDFTDTPortal);
	const fnComplete = useServerFn(completeDFTDT);
	const fnStats = useServerFn(getYearStats);
	const expQuery = useQuery({
		queryKey: ["dftdt", currentYear],
		queryFn: () => fnGet(),
		enabled: !!user
	});
	const statsQuery = useQuery({
		queryKey: ["dftdt-stats"],
		queryFn: () => fnStats(),
		enabled: !!user && portalIdx === 4
	});
	const saveMut = useMutation({
		mutationFn: (d) => fnSave({ data: d }),
		onError: (e) => toast.error("Erro ao salvar: " + e.message)
	});
	const completeMut = useMutation({ mutationFn: () => fnComplete({ data: { year: currentYear } }) });
	(0, import_react.useEffect)(() => {
		if (authLoading) return;
		if (!user) {
			setPhase("hero");
			return;
		}
		if (expQuery.isPending) return;
		const exp = expQuery.data?.experience;
		if (!exp) {
			setPhase("hero");
			return;
		}
		if (exp.completed) {
			setPhase("carta");
			return;
		}
		setForm({
			portal_1_closing: exp.portal_1_closing ?? "",
			portal_2_release: exp.portal_2_release ?? "",
			portal_3_gratitude: Array.isArray(exp.portal_3_gratitude) ? exp.portal_3_gratitude.concat([
				"",
				"",
				""
			]).slice(0, 3) : [
				"",
				"",
				""
			],
			portal_4_forgiveness: exp.portal_4_forgiveness ?? "",
			portal_5_celebration: exp.portal_5_celebration ?? "",
			portal_6_intentions: Array.isArray(exp.portal_6_intentions) ? exp.portal_6_intentions : [],
			portal_7_renewal: exp.portal_7_renewal ?? ""
		});
		setPortalIdx(Math.min(exp.current_portal, 6));
		setPhase("portal");
	}, [
		authLoading,
		user,
		expQuery.isPending,
		expQuery.data
	]);
	const galacticEnding = (0, import_react.useMemo)(() => yearBearer(new Date(currentYear, 6, 24)), []);
	const galacticNew = (0, import_react.useMemo)(() => yearBearer(new Date(currentYear, 6, 26)), []);
	const todayKin = (0, import_react.useMemo)(() => {
		const k = kinFromDate(new Date(currentYear, 6, 25));
		return getKinInfo(k);
	}, []);
	const chakra = CHAKRAS_ASCENDENTE[portalIdx];
	const save = (0, import_react.useCallback)(async (nextPortal, extraFields) => {
		if (!user) return;
		const merged = {
			...form,
			...extraFields
		};
		await saveMut.mutateAsync({
			year: currentYear,
			current_portal: nextPortal,
			portal_1_closing: merged.portal_1_closing || void 0,
			portal_2_release: merged.portal_2_release || void 0,
			portal_3_gratitude: merged.portal_3_gratitude.filter(Boolean),
			portal_4_forgiveness: merged.portal_4_forgiveness || void 0,
			portal_5_celebration: merged.portal_5_celebration || void 0,
			portal_6_intentions: merged.portal_6_intentions,
			portal_7_renewal: merged.portal_7_renewal || void 0
		});
	}, [
		user,
		form,
		saveMut
	]);
	async function advance() {
		if (!user) {
			navigate({ to: "/auth" });
			return;
		}
		const next = portalIdx + 1;
		await save(next);
		if (next >= PORTAL_CONFIG.length) {
			await completeMut.mutateAsync();
			setPhase("carta");
		} else {
			setPortalIdx(next);
			setDissolved(false);
		}
	}
	(0, import_react.useEffect)(() => {
		if (portalIdx !== 6) return;
		setChakrasLit(0);
		const t = setInterval(() => {
			setChakrasLit((n) => {
				if (n >= 7) {
					clearInterval(t);
					return n;
				}
				return n + 1;
			});
		}, 400);
		return () => clearInterval(t);
	}, [portalIdx]);
	if (phase === "loading") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "material-symbols-outlined text-primary text-4xl animate-spin",
			children: "progress_activity"
		})
	});
	if (phase === "hero") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroSection, {
		isDFTDT,
		isNewCycle,
		galacticEnding,
		galacticNew,
		todayKin,
		user: !!user,
		resumePortal: expQuery.data?.experience?.current_portal ?? -1,
		onStart: () => {
			if (!user) {
				navigate({ to: "/auth" });
				return;
			}
			setPhase("portal");
			setPortalIdx(0);
		},
		onResume: () => setPhase("portal"),
		onCarta: () => setPhase("carta")
	});
	if (phase === "carta") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartaSection, {
		form,
		galacticEnding,
		galacticNew,
		todayKin,
		onRestart: () => setPhase("hero")
	});
	const portal = PORTAL_CONFIG[portalIdx];
	const isPending = saveMut.isPending || completeMut.isPending;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen pb-32 relative",
		style: { background: `radial-gradient(ellipse at 50% 0%, ${chakra.cor}22 0%, transparent 60%), #0e1116` },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 texture-overlay z-[-1]",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 z-40 backdrop-blur-xl border-b border-white/5 px-4 py-3 flex items-center justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setPhase("hero"),
						className: "flex items-center gap-1 text-on-surface-variant hover:text-on-surface text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined text-base",
							children: "arrow_back"
						}), "Dia Fora do Tempo"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-1.5 items-center",
						children: PORTAL_CONFIG.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-2 h-2 rounded-full transition-all duration-500",
							style: { background: i <= portalIdx ? chakra.cor : "rgba(255,255,255,0.15)" }
						}, p.num))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-label-sm text-label-sm text-on-surface-variant",
						children: [
							"Portal ",
							portalIdx + 1,
							" / 7"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-container-margin max-w-[560px] mx-auto pt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center mb-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative w-20 h-20 mb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0 rounded-full blur-xl opacity-40 animate-pulse",
									style: { background: chakra.cor }
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative w-full h-full rounded-full border-2 flex items-center justify-center",
									style: {
										borderColor: chakra.cor,
										background: `${chakra.cor}22`
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "material-symbols-outlined text-3xl",
										style: {
											color: chakra.cor,
											fontVariationSettings: "'FILL' 1"
										},
										children: chakra.simbolo
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-label-sm text-label-sm uppercase tracking-widest mb-1",
								style: { color: chakra.cor },
								children: [
									chakra.nome,
									" · ",
									chakra.identidade
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-label-sm text-label-sm uppercase tracking-[0.2em] text-on-surface-variant/60",
								children: portal.verb
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-panel rounded-3xl p-6 mb-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-headline-lg text-headline-lg text-on-surface mb-2",
								children: portal.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-body-md text-on-surface-variant/80 mb-6",
								children: portal.prompt
							}),
							(portal.inputType === "textarea" || portal.inputType === "dissolve") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									portal.isPrivate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-on-surface-variant/70 text-sm mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "material-symbols-outlined text-base",
											children: "lock"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Esta reflexão é completamente privada." })]
									}),
									portal.inputType === "dissolve" && dissolved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-white/10 bg-white/5 p-4 text-center space-y-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-4xl",
											children: "🌬️"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-body-md text-on-surface-variant italic",
											children: [
												"\"",
												portal.msg,
												"\""
											]
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 5,
										value: portal.key === "portal_1_closing" ? form.portal_1_closing : portal.key === "portal_2_release" ? form.portal_2_release : portal.key === "portal_4_forgiveness" ? form.portal_4_forgiveness : "",
										onChange: (e) => {
											const v = e.target.value;
											if (portal.key === "portal_1_closing") setForm((f) => ({
												...f,
												portal_1_closing: v
											}));
											else if (portal.key === "portal_2_release") setForm((f) => ({
												...f,
												portal_2_release: v
											}));
											else if (portal.key === "portal_4_forgiveness") setForm((f) => ({
												...f,
												portal_4_forgiveness: v
											}));
										},
										placeholder: "Escreva livremente…",
										className: "w-full bg-white/5 rounded-2xl border border-white/10 p-4 focus:outline-none focus:border-white/30 resize-none font-body-md text-on-surface placeholder:text-on-surface-variant/40"
									}),
									portal.inputType === "dissolve" && !dissolved && form.portal_2_release && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setDissolved(true),
										className: "w-full py-3 rounded-full border text-sm font-medium transition-all",
										style: {
											borderColor: chakra.cor,
											color: chakra.cor
										},
										children: "🌬️ Liberar e dissolver"
									})
								]
							}),
							portal.inputType === "triple" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [[
									0,
									1,
									2
								].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xl",
										children: "⭐✨🌟"[i]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: form.portal_3_gratitude[i],
										onChange: (e) => {
											const v = e.target.value;
											setForm((f) => {
												const g = [...f.portal_3_gratitude];
												g[i] = v;
												return {
													...f,
													portal_3_gratitude: g
												};
											});
										},
										placeholder: `Gratidão ${i + 1}…`,
										className: "flex-1 bg-white/5 rounded-2xl border border-white/10 px-4 py-3 focus:outline-none focus:border-white/30 font-body-md text-on-surface placeholder:text-on-surface-variant/40"
									})]
								}, i)), form.portal_3_gratitude.some(Boolean) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-3 justify-center pt-2",
									children: form.portal_3_gratitude.filter(Boolean).map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl",
										title: g,
										children: "⭐✨🌟"[i]
									}, i))
								})]
							}),
							portal.inputType === "celebration" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [statsQuery.data && (statsQuery.data.journalEntries > 0 || statsQuery.data.moodDays > 0) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3 mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl bg-white/5 border border-white/10 p-4 text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-2xl font-bold",
											style: { color: chakra.cor },
											children: statsQuery.data.journalEntries
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-label-sm text-label-sm text-on-surface-variant mt-1",
											children: "reflexões registradas"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl bg-white/5 border border-white/10 p-4 text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-2xl font-bold",
											style: { color: chakra.cor },
											children: statsQuery.data.moodDays
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-label-sm text-label-sm text-on-surface-variant mt-1",
											children: "dias de presença"
										})]
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-2xl bg-white/5 border border-white/10 p-4 text-center italic text-on-surface-variant/70 mb-4",
									children: "\"Todo ciclo deixa marcas. Comece registrando o que você viveu.\""
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									rows: 4,
									value: form.portal_5_celebration,
									onChange: (e) => setForm((f) => ({
										...f,
										portal_5_celebration: e.target.value
									})),
									placeholder: "O que você realizou neste ciclo? Escreva com orgulho…",
									className: "w-full bg-white/5 rounded-2xl border border-white/10 p-4 focus:outline-none focus:border-white/30 resize-none font-body-md text-on-surface placeholder:text-on-surface-variant/40"
								})]
							}),
							portal.inputType === "intentions" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-2 gap-2",
										children: INTENTION_OPTIONS.map((opt) => {
											const label = `${opt.emoji} ${opt.label}`;
											const selected = form.portal_6_intentions.includes(label);
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => {
													setForm((f) => {
														const cur = f.portal_6_intentions;
														if (selected) return {
															...f,
															portal_6_intentions: cur.filter((x) => x !== label)
														};
														if (cur.length >= 3) {
															toast.error("Escolha até 3 intenções.");
															return f;
														}
														return {
															...f,
															portal_6_intentions: [...cur, label]
														};
													});
												},
												className: ["flex items-center gap-2 px-3 py-2.5 rounded-2xl border text-sm font-medium transition-all text-left", selected ? "border-opacity-100 text-on-surface" : "border-white/10 text-on-surface-variant hover:border-white/30"].join(" "),
												style: selected ? {
													borderColor: chakra.cor,
													background: `${chakra.cor}22`
												} : void 0,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: opt.emoji }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: opt.label }),
													selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "material-symbols-outlined text-xs ml-auto",
														style: { color: chakra.cor },
														children: "check"
													})
												]
											}, opt.label);
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: customIntention,
											onChange: (e) => setCustomIntention(e.target.value),
											placeholder: "Intenção personalizada…",
											maxLength: 80,
											className: "flex-1 bg-white/5 rounded-2xl border border-white/10 px-4 py-3 focus:outline-none focus:border-white/30 font-body-md text-on-surface placeholder:text-on-surface-variant/40",
											onKeyDown: (e) => {
												if (e.key === "Enter" && customIntention.trim()) {
													const v = `✏️ ${customIntention.trim()}`;
													if (form.portal_6_intentions.length >= 3) {
														toast.error("Máximo 3 intenções.");
														return;
													}
													setForm((f) => ({
														...f,
														portal_6_intentions: [...f.portal_6_intentions, v]
													}));
													setCustomIntention("");
												}
											}
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: !customIntention.trim() || form.portal_6_intentions.length >= 3,
											onClick: () => {
												const v = `✏️ ${customIntention.trim()}`;
												if (form.portal_6_intentions.length >= 3) {
													toast.error("Máximo 3 intenções.");
													return;
												}
												setForm((f) => ({
													...f,
													portal_6_intentions: [...f.portal_6_intentions, v]
												}));
												setCustomIntention("");
											},
											className: "px-4 py-3 rounded-2xl border border-white/10 text-on-surface-variant hover:border-white/30 disabled:opacity-40",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "material-symbols-outlined text-base",
												children: "add"
											})
										})]
									}),
									form.portal_6_intentions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-2 pt-1",
										children: form.portal_6_intentions.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium",
											style: {
												background: `${chakra.cor}33`,
												color: chakra.cor,
												border: `1px solid ${chakra.cor}66`
											},
											children: [v, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setForm((f) => ({
													...f,
													portal_6_intentions: f.portal_6_intentions.filter((x) => x !== v)
												})),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "material-symbols-outlined text-xs",
													children: "close"
												})
											})]
										}, v))
									})
								]
							}),
							portal.inputType === "renewal" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-center font-body-lg text-on-surface/80 leading-relaxed italic",
										children: [
											"\"",
											portal.msg,
											"\""
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex justify-center gap-2 flex-wrap",
										children: CHAKRAS_ASCENDENTE.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col items-center gap-1 transition-all duration-700",
											style: { opacity: i < chakrasLit ? 1 : .15 },
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-700",
												style: {
													background: i < chakrasLit ? `${c.cor}44` : "transparent",
													border: `2px solid ${c.cor}`,
													boxShadow: i < chakrasLit ? `0 0 12px ${c.cor}88` : "none"
												},
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "material-symbols-outlined text-xs",
													style: {
														color: c.cor,
														fontVariationSettings: "'FILL' 1"
													},
													children: c.simbolo
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-label-sm text-label-sm text-on-surface-variant/60",
												style: { fontSize: "9px" },
												children: c.nome
											})]
										}, c.id))
									}),
									chakrasLit >= 7 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-center font-title-md text-on-surface animate-in fade-in duration-1000",
										children: "✨ Você atravessou o ciclo."
									})
								]
							}),
							portal.inputType !== "renewal" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-6 font-body-sm italic text-on-surface-variant/60 text-center border-t border-white/5 pt-4",
								children: [
									"\"",
									portal.msg,
									"\""
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [portalIdx > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setPortalIdx((n) => n - 1);
								setDissolved(false);
							},
							className: "btn-secondary flex-1 py-4",
							children: "← Voltar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: advance,
							disabled: isPending,
							className: "flex-[2] py-4 rounded-full font-label-lg font-semibold transition-all active:scale-[0.98] disabled:opacity-50",
							style: {
								background: chakra.cor,
								color: "#0e1116"
							},
							children: isPending ? "Salvando…" : portalIdx === 6 ? "✨ Gerar minha Carta de Transição" : `Avançar para o Portal ${portalIdx + 2}`
						})]
					})
				]
			})
		]
	});
}
function HeroSection({ isDFTDT, isNewCycle, galacticEnding, galacticNew, todayKin, user, resumePortal, onStart, onResume, onCarta }) {
	const daysLeft = daysUntilDFTDT();
	const isCompleted = resumePortal === 7;
	const inProgress = resumePortal > 0 && resumePortal < 7;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen relative flex flex-col",
		style: { background: "radial-gradient(ellipse at 50% 30%, #3b1a6622 0%, transparent 70%), radial-gradient(ellipse at 80% 80%, #1a0a3322 0%, transparent 50%), #0e1116" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 texture-overlay z-[-1]",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-1 w-full",
				style: { background: "linear-gradient(to right, #e0524d, #e58b4e, #e8c95a, #6fc98b, #6FBEDA, #8489e0, #b98ed6)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 flex flex-col items-center justify-center px-6 py-16 text-center max-w-[600px] mx-auto w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-4xl mb-4 animate-pulse",
						children: "🌈"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-label-sm text-label-sm uppercase tracking-[0.3em] text-primary/80",
							children: isDFTDT ? "Hoje é" : isNewCycle ? "Ontem foi" : `em ${daysLeft} ${daysLeft === 1 ? "dia" : "dias"}`
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-serif text-7xl font-bold text-on-surface leading-none mb-1",
						children: "25"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-serif text-2xl text-on-surface/70 mb-4",
						children: "JULHO"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-headline-lg text-headline-lg text-on-surface mb-2",
						children: "Dia Fora do Tempo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-body-lg text-on-surface-variant/80 mb-8 leading-relaxed",
						children: [
							"Um dia entre dois ciclos.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic",
								children: "O espaço onde tudo é possível."
							})
						]
					}),
					isDFTDT && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "glass-panel rounded-3xl p-5 w-full mb-8 text-left space-y-1.5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-body-md text-on-surface/80 leading-relaxed",
							children: "Hoje você não precisa correr. Não precisa chegar. Este é um espaço para olhar para o ciclo que termina, liberar o que não precisa continuar e escolher conscientemente o que deseja cultivar."
						})
					}),
					isDFTDT && (isCompleted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onCarta,
						className: "w-full max-w-xs py-4 rounded-full font-title-md font-semibold text-lg transition-all hover:scale-[1.02] active:scale-[0.98]",
						style: {
							background: "linear-gradient(135deg, #8489e0, #b98ed6)",
							color: "white"
						},
						children: "🌈 Ver minha Carta de Transição"
					}) : inProgress ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 w-full max-w-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: onResume,
							className: "w-full py-4 rounded-full font-title-md font-semibold transition-all hover:scale-[1.02]",
							style: {
								background: "linear-gradient(135deg, #8489e0, #b98ed6)",
								color: "white"
							},
							children: [
								"Continuar minha jornada — Portal ",
								resumePortal + 1,
								" de 7"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onStart,
							className: "w-full py-3 rounded-full border border-white/20 text-on-surface-variant hover:border-white/40 text-sm",
							children: "Recomeçar do início"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onStart,
						className: "w-full max-w-xs py-4 rounded-full font-title-md font-semibold text-lg transition-all hover:scale-[1.02] active:scale-[0.98]",
						style: {
							background: "linear-gradient(135deg, #8489e0, #b98ed6)",
							color: "white"
						},
						children: "✨ Entrar no Dia Fora do Tempo"
					})),
					!isDFTDT && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-panel rounded-3xl p-5 w-full mb-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-label-sm text-label-sm uppercase tracking-widest text-primary/70 mb-2",
								children: isNewCycle ? "Novo ciclo iniciado · 26 de julho" : "Próximo Dia Fora do Tempo"
							}),
							!isNewCycle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-headline-lg text-headline-lg text-on-surface",
								children: [
									daysLeft,
									" ",
									daysLeft === 1 ? "dia" : "dias"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-body-md text-on-surface-variant/70 mt-1",
								children: isNewCycle ? "O novo ciclo galáctico começou. Cada dia é um novo Kin." : "Use este tempo para se preparar. O Dia Fora do Tempo convida à reflexão."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full max-w-sm mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-stretch gap-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 glass-panel rounded-l-2xl p-3 text-center border-r-0 rounded-r-none",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-label-sm text-[10px] text-on-surface-variant/60 uppercase tracking-widest mb-1",
											children: "Ciclo que termina"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-label-sm text-xs text-on-surface font-semibold",
											children: galacticEnding.label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-label-sm text-[10px] text-on-surface-variant/50",
											children: ["Kin ", galacticEnding.kin]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center px-2 glass-panel border-x-0",
									style: { borderRadius: 0 },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-lg",
											children: "🌈"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-label-sm text-[9px] text-on-surface-variant/50 mt-0.5",
											children: "25/07"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 glass-panel rounded-r-2xl p-3 text-center border-l-0 rounded-l-none",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-label-sm text-[10px] text-on-surface-variant/60 uppercase tracking-widest mb-1",
											children: "Novo ciclo"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-label-sm text-xs text-on-surface font-semibold",
											children: galacticNew.label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-label-sm text-[10px] text-on-surface-variant/50",
											children: ["Kin ", galacticNew.kin]
										})
									]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "w-full max-w-sm mt-4 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
							className: "font-label-sm text-label-sm text-on-surface-variant/60 cursor-pointer hover:text-on-surface-variant text-center",
							children: "Contexto galáctico do dia ↓"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass-panel rounded-2xl p-4 mt-2 space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-label-sm text-label-sm text-on-surface-variant/70",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-primary",
											children: "Kin 25/07:"
										}),
										" ",
										todayKin.kin,
										" — ",
										todayKin.fullName
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-label-sm text-label-sm text-on-surface-variant/70",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-primary",
											children: "Selo:"
										}),
										" ",
										todayKin.seal.name,
										" · ",
										todayKin.seal.action
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-label-sm text-label-sm text-on-surface-variant/70",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-primary",
											children: "Tom:"
										}),
										" ",
										todayKin.tone.name,
										" · ",
										todayKin.tone.essence
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-label-sm text-label-sm text-on-surface-variant/50 italic pt-1 text-xs",
									children: "* 25/07 não é um dia das 13 Luas. É o Dia Fora do Tempo do Sincronário — o espaço de transição entre os ciclos anuais."
								})
							]
						})]
					}),
					!user && isDFTDT && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-body-sm text-on-surface-variant/60 mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							className: "text-primary underline",
							children: "Entre na RAPPAA"
						}), " para salvar sua jornada."]
					})
				]
			})
		]
	});
}
function CartaSection({ form, galacticEnding, galacticNew, todayKin, onRestart }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen pb-32",
		style: { background: "radial-gradient(ellipse at 50% 0%, #b98ed622 0%, transparent 60%), #0e1116" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 texture-overlay z-[-1]",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-1 w-full",
				style: { background: "linear-gradient(to right, #e0524d, #e58b4e, #e8c95a, #6fc98b, #6FBEDA, #8489e0, #b98ed6)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-container-margin max-w-[600px] mx-auto pt-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mb-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-5xl mb-3",
								children: "🌈"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-headline-lg text-headline-lg text-on-surface mb-1",
								children: "Sua Carta de Transição"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-body-md text-on-surface-variant/70",
								children: "25 de julho · Dia Fora do Tempo"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "glass-panel rounded-2xl p-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-label-sm text-label-sm text-on-surface-variant/60 uppercase tracking-wider",
											children: "Ciclo encerrado"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-body-md font-semibold",
											children: galacticEnding.label
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-2xl",
											children: "→"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-right",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-label-sm text-label-sm text-on-surface-variant/60 uppercase tracking-wider",
												children: "Novo ciclo"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-body-md font-semibold",
												children: galacticNew.label
											})]
										})
									]
								})
							}),
							form.portal_1_closing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartaBlock, {
								icon: "wb_twilight",
								color: "#e0524d",
								title: "O que encerrei",
								content: form.portal_1_closing
							}),
							form.portal_2_release && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartaBlock, {
								icon: "air",
								color: "#e58b4e",
								title: "O que liberei",
								content: form.portal_2_release
							}),
							form.portal_3_gratitude.some(Boolean) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass-panel rounded-2xl p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-label-sm text-label-sm uppercase tracking-wider mb-3",
									style: { color: "#e8c95a" },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "material-symbols-outlined text-base align-middle mr-1",
										style: { fontVariationSettings: "'FILL' 1" },
										children: "wb_sunny"
									}), "Gratidão"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-1.5",
									children: form.portal_3_gratitude.filter(Boolean).map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-body-md text-on-surface/90",
										children: [
											"⭐✨🌟"[i],
											" ",
											g
										]
									}, i))
								})]
							}),
							form.portal_5_celebration && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartaBlock, {
								icon: "emoji_events",
								color: "#6FBEDA",
								title: "O que realizei",
								content: form.portal_5_celebration
							}),
							form.portal_6_intentions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass-panel rounded-2xl p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-label-sm text-label-sm uppercase tracking-wider mb-3",
									style: { color: "#8489e0" },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "material-symbols-outlined text-base align-middle mr-1",
										style: { fontVariationSettings: "'FILL' 1" },
										children: "visibility"
									}), "Intenções para o novo ciclo"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-2",
									children: form.portal_6_intentions.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "px-3 py-1 rounded-full text-sm font-medium",
										style: {
											background: "#8489e033",
											color: "#8489e0",
											border: "1px solid #8489e066"
										},
										children: v
									}, v))
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 glass-panel rounded-3xl p-6 text-center space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-3xl",
							children: "✨"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
							className: "font-body-lg text-on-surface/80 leading-relaxed italic",
							children: [
								"\"Você encerrou um ciclo.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Você criou espaço.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Agora existe uma escolha.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"O próximo ciclo ainda não foi escrito.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Entre o que foi e o que será,",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"existe você.\""
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "w-full py-4 rounded-full text-center font-title-md font-semibold transition-all hover:scale-[1.01]",
							style: {
								background: "linear-gradient(135deg, #8489e0, #b98ed6)",
								color: "white"
							},
							children: "🌅 Entrar no Novo Ciclo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onRestart,
							className: "w-full py-3 rounded-full border border-white/20 text-on-surface-variant hover:border-white/40 text-sm",
							children: "Ver a experiência novamente"
						})]
					})
				]
			})
		]
	});
}
function CartaBlock({ icon, color, title, content }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-panel rounded-2xl p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "font-label-sm text-label-sm uppercase tracking-wider mb-2",
			style: { color },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "material-symbols-outlined text-base align-middle mr-1",
				style: { fontVariationSettings: "'FILL' 1" },
				children: icon
			}), title]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-body-md text-on-surface/90 leading-relaxed",
			children: content
		})]
	});
}
//#endregion
export { DiaForaDoTempoPage as component };
