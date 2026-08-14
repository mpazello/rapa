import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as lazyRouteComponent, d as Link, h as redirect, i as HeadContent, l as createFileRoute, o as createRouter, p as useRouter, r as Scripts, s as Outlet, u as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-CynC6nuD.mjs";
import { n as useAuth, t as AuthProvider } from "./use-auth-C250R4UH.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { _ as getTodayKinInfo, g as getKinInfo, y as kinFromDate } from "./tzolkin-CeuRSgpU.mjs";
import { t as SEAL_IMAGE } from "./seal-images-Bln5NZxW.mjs";
import { n as DailyRitualModal } from "./DailyRitualModal-D3cuP0WX.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Route$14 } from "./ciclos.kin._kin-CAjM7w_r.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CnZ9K4YS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-Vr1SslF7.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var TILE_BG = {
	vermelho: "bg-[#CC2222]",
	branco: "bg-[#E8E8E8]",
	azul: "bg-[#1A4FCC]",
	amarelo: "bg-[#D4A500]"
};
var TILE_BORDER = {
	vermelho: "border-[#991111]",
	branco: "border-[#AAAAAA]",
	azul: "border-[#0F3399]",
	amarelo: "border-[#A07800]"
};
function WavespellTile() {
	const [info, setInfo] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setInfo(getTodayKinInfo());
	}, []);
	if (!info) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-8 h-8 rounded-lg bg-surface-container animate-pulse" });
	const { trecena } = info;
	const src = SEAL_IMAGE[trecena.seal.index];
	const bg = TILE_BG[trecena.seal.color];
	const border = TILE_BORDER[trecena.seal.color];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex items-center justify-center w-8 h-8 rounded-lg border-2 ${bg} ${border} shadow-inner overflow-hidden`,
		style: { boxShadow: "inset 0 1px 2px rgba(255,255,255,0.25), inset 0 -1px 2px rgba(0,0,0,0.3)" },
		title: `Onda Encantada do ${trecena.seal.name} (Kin ${trecena.kinStart})`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt: trecena.seal.name,
			className: "w-[75%] h-[75%] object-contain",
			style: { filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.4))" },
			loading: "eager"
		})
	});
}
function Avatar({ userId, displayName }) {
	const [avatarUrl, setAvatarUrl] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.from("profiles").select("avatar_url, display_name").eq("id", userId).maybeSingle().then(({ data }) => {
			setAvatarUrl(data?.avatar_url ?? null);
		});
	}, [userId]);
	const initials = (displayName ?? "U").trim().charAt(0).toUpperCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "w-9 h-9 rounded-full overflow-hidden border border-astral-violet/30 bg-surface-container flex items-center justify-center shrink-0",
		children: avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: avatarUrl,
			alt: "Foto do perfil",
			className: "w-full h-full object-cover",
			onError: () => setAvatarUrl(null)
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-semibold text-astral-violet",
			children: initials
		})
	});
}
function TopAppBar() {
	const { user, loading } = useAuth();
	const [ritualOpen, setRitualOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "fixed top-0 inset-x-0 z-40 backdrop-blur-xl bg-background/70 border-b border-outline-variant/30",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-[720px] mx-auto px-container-margin h-16 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-2 mr-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined text-astral-violet text-[22px]",
							style: { fontVariationSettings: "'FILL' 1" },
							children: "all_inclusive"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-serif text-xl tracking-wide text-astral-violet",
							children: "RAPPAA"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setRitualOpen(true),
						"aria-label": "Como usar no dia a dia",
						title: "Ritual do dia",
						className: "flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-astral-violet/30 text-astral-violet hover:bg-astral-violet/10 transition-colors group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform",
							style: { fontVariationSettings: "'FILL' 1" },
							children: "self_improvement"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-label-sm text-label-sm hidden sm:inline",
							children: "Ritual do dia"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/almanaque",
						"aria-label": "Almanaque — Calendário das 13 Luas",
						title: "Almanaque",
						className: "flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-astral-violet/30 text-astral-violet hover:bg-astral-violet/10 transition-colors group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform",
							style: { fontVariationSettings: "'FILL' 1" },
							children: "auto_stories"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-label-sm text-label-sm hidden sm:inline",
							children: "Almanaque"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						hash: "onda-encantada",
						"aria-label": "Onda Encantada",
						className: "flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-astral-violet/30 hover:bg-astral-violet/10 transition-colors group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WavespellTile, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-label-sm text-label-sm hidden sm:inline text-astral-violet",
							children: "Onda Encantada"
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-9 h-9 rounded-full bg-surface-container animate-pulse" }) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/perfil",
					"aria-label": "Meu perfil",
					className: "hover:opacity-80 transition-opacity active:scale-95",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
						userId: user.id,
						displayName: user.user_metadata?.display_name ?? user.email
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/auth",
					className: "btn-outlined",
					children: "Entrar"
				})
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DailyRitualModal, {
		open: ritualOpen,
		onClose: () => setRitualOpen(false)
	})] });
}
var items = [
	{
		to: "/",
		label: "Hoje",
		icon: "wb_twilight"
	},
	{
		to: "/jornada",
		label: "Jornada",
		icon: "timeline"
	},
	{
		to: "/ciclos",
		label: "Ciclos",
		icon: "cyclone"
	},
	{
		to: "/chakras",
		label: "Chakras",
		icon: "self_improvement"
	},
	{
		to: "/kai",
		label: "KAI",
		icon: "auto_awesome"
	},
	{
		to: "/perfil",
		label: "Perfil",
		icon: "person"
	}
];
function BottomNav() {
	const [day, setDay] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setDay(String((/* @__PURE__ */ new Date()).getDate()));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "fixed bottom-0 inset-x-0 z-40 backdrop-blur-2xl bg-obsidian-surface/90 border-t border-white/10 shadow-2xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "max-w-[720px] mx-auto px-2 flex items-stretch justify-between h-20 pb-3 pt-2",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: item.to,
				activeOptions: { exact: item.to === "/" },
				className: "flex-1 flex flex-col items-center justify-center gap-1 rounded-2xl text-muted-stardust transition-all [&.active]:text-ritual-gold [&.active]:drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]",
				activeProps: { className: "active" },
				children: ({ isActive }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "material-symbols-outlined text-[24px]",
					style: { fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0, 'wght' 400" },
					children: item.icon
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-label-sm text-[11px] tracking-wide",
					children: item.to === "/" && day ? `Hoje · ${day}` : item.label
				})] })
			}, item.to))
		})
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif text-7xl text-on-surface",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl text-on-surface",
					children: "Página não encontrada"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-on-surface-variant",
					children: "Esta página não existe ou foi movida."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-on-primary hover:opacity-90",
						children: "Voltar ao início"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl text-on-surface",
					children: "Algo interrompeu esta página"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-on-surface-variant",
					children: "Você pode tentar novamente ou voltar ao início."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-on-primary hover:opacity-90",
						children: "Tentar novamente"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-full border border-outline px-5 py-2 text-sm font-medium text-on-surface hover:bg-surface-container-low",
						children: "Início"
					})]
				})
			]
		})
	});
}
var Route$13 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				name: "theme-color",
				content: "#0e1116"
			},
			{ title: "Hoje — RAPPAA" },
			{
				name: "description",
				content: "RAPPAA é um espaço para registrar sua jornada, compreender seus ciclos e refletir com KAI, seu mentor de consciência."
			},
			{
				property: "og:site_name",
				content: "RAPPAA"
			},
			{
				property: "og:title",
				content: "Hoje — RAPPAA"
			},
			{
				property: "og:description",
				content: "Registre sua jornada, compreenda seus ciclos e reflita com KAI, seu mentor de consciência."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "Hoje — RAPPAA"
			},
			{
				name: "description",
				content: "Registre sua energia, veja o ciclo do dia e retome sua jornada."
			},
			{
				property: "og:description",
				content: "Registre sua energia, veja o ciclo do dia e retome sua jornada."
			},
			{
				name: "twitter:description",
				content: "Registre sua energia, veja o ciclo do dia e retome sua jornada."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6fbe2a9e-0810-4066-9fa8-409f7433fbd6/id-preview-6535571a--5792654b-2413-48d3-9ae4-608ff3821322.lovable.app-1783448200371.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6fbe2a9e-0810-4066-9fa8-409f7433fbd6/id-preview-6535571a--5792654b-2413-48d3-9ae4-608ff3821322.lovable.app-1783448200371.png"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon",
				sizes: "any"
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "pt-BR",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$13.useRouteContext();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((event) => {
			if (event === "SIGNED_OUT") {
				queryClient.cancelQueries();
				queryClient.clear();
				router.invalidate();
			} else if (event === "SIGNED_IN" || event === "USER_UPDATED") {
				queryClient.clear();
				router.invalidate();
			}
		});
		return () => sub.subscription.unsubscribe();
	}, [router, queryClient]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "aura-bg",
				"aria-hidden": true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full",
					style: {
						background: "radial-gradient(circle at center, rgba(188,155,255,0.15) 0%, transparent 70%)",
						filter: "blur(100px)"
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full",
					style: {
						background: "radial-gradient(circle at center, rgba(168,199,255,0.15) 0%, transparent 70%)",
						filter: "blur(100px)"
					}
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "noise-overlay",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopAppBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme: "dark",
				position: "top-center"
			})
		] })
	});
}
var $$splitComponentImporter$12 = () => import("./routes-BGyLBNFu.mjs");
var Route$12 = createFileRoute("/")({
	head: () => {
		return {
			meta: [
				{ title: "Hoje — RAPPAA" },
				{
					name: "description",
					content: "Registre sua energia, veja o ciclo do dia e retome sua jornada."
				},
				{
					property: "og:title",
					content: "Hoje — RAPPAA"
				}
			],
			links: [{
				rel: "canonical",
				href: "/"
			}, {
				rel: "preload",
				as: "image",
				href: SEAL_IMAGE[getTodayKinInfo().seal.index],
				fetchpriority: "high"
			}]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./route-Df0QwU1H.mjs");
var Route$11 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./almanaque-DbCU2y_4.mjs");
/** Planeta galáctico de cada selo (índice 1-20). */
/** Chakra + função por selo — segue ciclo (sealIndex-1)%5. */
/** Harmônica (1-65) e tipo por posição dentro da harmônica. */
/** Onda Encantada (trecena) — seal do portador e kin de início. */
/** Kin do Psi (crono-psi de 28 dias na lua). Âncora: Lua 1 Dia 1 do ano galáctico = KIN 1
*  Formula: psiBanco = (diaNoAno) % 260, em que diaNoAno = (moon-1)*28+(day-1).
*  Usa o mesmo contagem Dreamspell.
*/
var Route$10 = createFileRoute("/almanaque")({
	head: () => ({ meta: [{ title: "Almanaque — RAPPAA" }, {
		name: "description",
		content: "Calendário das 13 Luas — Sincronário 13:20 Dreamspell."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
/** Returns UTC midnight of July 26 for a given galactic year. */
/** Galactic year (July 26 → July 25 next year). July = month 6 (0-indexed). */
/**
* Convert Dreamspell moon/day to a gregorian Date.
* Iterates forward from year start, skipping Feb 29 (Dreamspell rule).
*/
/** All 28 gregorian dates for a given moon. */
/** Mini kin card used in the oracle section. */
var $$splitComponentImporter$9 = () => import("./auth-DxkEFqa5.mjs");
var Route$9 = createFileRoute("/auth")({
	ssr: false,
	head: () => ({ meta: [{ title: "Entrar — RAPPAA" }, {
		name: "description",
		content: "Entre ou crie sua conta na RAPPAA para iniciar sua jornada."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./chakras-Ny0gL6QN.mjs");
var Route$8 = createFileRoute("/chakras")({
	head: () => ({
		meta: [
			{ title: "7 Chakras — RAPPAA" },
			{
				name: "description",
				content: "Explore seu mapa energético através da sincronicidade do tempo: os 7 Chakras e suas correspondências galácticas no Sincronário 13:20."
			},
			{
				property: "og:title",
				content: "7 Chakras — RAPPAA"
			},
			{
				property: "og:url",
				content: "/chakras"
			}
		],
		links: [{
			rel: "canonical",
			href: "/chakras"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./ciclos-FqMv39zR.mjs");
var Route$7 = createFileRoute("/ciclos")({
	head: () => {
		return {
			meta: [
				{ title: "Ciclos — RAPPAA" },
				{
					name: "description",
					content: "Kin do dia, tom galáctico e selo maia: calculadora Tzolkin viva do Sincronário 13:20."
				},
				{
					property: "og:title",
					content: "Ciclos — RAPPAA"
				},
				{
					property: "og:url",
					content: "/ciclos"
				}
			],
			links: [{
				rel: "canonical",
				href: "/ciclos"
			}, {
				rel: "preload",
				as: "image",
				href: SEAL_IMAGE[getKinInfo(kinFromDate(/* @__PURE__ */ new Date())).seal.index],
				fetchpriority: "high"
			}]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./dia-fora-do-tempo-YvqjGF1j.mjs");
var Route$6 = createFileRoute("/dia-fora-do-tempo")({
	head: () => ({ meta: [{ title: "Dia Fora do Tempo — RAPPAA" }, {
		name: "description",
		content: "25 de julho — o espaço entre dois ciclos. Uma jornada de 7 portais para encerrar, liberar e renovar."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./jornada-BmggGeJj.mjs");
var Route$5 = createFileRoute("/jornada")({
	head: () => ({
		meta: [
			{ title: "Jornada — RAPPAA" },
			{
				name: "description",
				content: "Sua linha da vida: marcos, reflexões diárias e ciclos de energia."
			},
			{
				property: "og:title",
				content: "Jornada — RAPPAA"
			}
		],
		links: [{
			rel: "canonical",
			href: "/jornada"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./kai-I92Jdyqx.mjs");
var Route$4 = createFileRoute("/kai")({
	head: () => ({
		meta: [
			{ title: "KAI — RAPPAA" },
			{
				name: "description",
				content: "KAI, seu mentor de consciência. Diálogo contextual guiado pelo seu humor e filosofia."
			},
			{
				property: "og:title",
				content: "KAI — Mentor de Consciência"
			}
		],
		links: [{
			rel: "canonical",
			href: "/kai"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./onda-encantada-BXXYfL_v.mjs");
var Route$3 = createFileRoute("/onda-encantada")({
	head: () => ({ meta: [{ title: "Onda Encantada — RAPPAA" }, {
		name: "description",
		content: "Os 13 Kins da Onda Encantada atual no Tzolkin Dreamspell."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
/** Formata uma data UTC como "qui, 14/08". Se isToday=true, prefixa com "Hoje · ". */
/** Formata o intervalo de datas da onda: "13–25 de ago." ou "28 de jul – 9 de ago." */
/**
* Avança 1 dia Dreamspell a partir de uma data UTC, pulando 29/fev.
* Usado para calcular datas dos 13 Kins consecutivos da onda.
*/
var $$splitComponentImporter$2 = () => import("./redefinir-senha-B2bZgVw7.mjs");
var Route$2 = createFileRoute("/redefinir-senha")({
	ssr: false,
	head: () => ({ meta: [{ title: "Redefinir senha — RAPPAA" }, {
		name: "description",
		content: "Escolha uma nova senha para sua conta RAPPAA."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
/** O link de recuperação chega com `?code=` ou `#...type=recovery`. */
var $$splitComponentImporter$1 = () => import("./admin-BkzsUVzR.mjs");
var Route$1 = createFileRoute("/_authenticated/admin")({
	head: () => ({ meta: [{ title: "Admin — RAPPAA" }, {
		name: "description",
		content: "Gestão de usuários e papéis."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./perfil-VXtODaUK.mjs");
var Route = createFileRoute("/_authenticated/perfil")({
	head: () => ({ meta: [{ title: "Perfil — RAPPAA" }, {
		name: "description",
		content: "Seu perfil, Kin natal e configurações."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$12.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$13
});
var AuthenticatedRouteRoute = Route$11.update({
	id: "/_authenticated",
	getParentRoute: () => Route$13
});
var AlmanaqueRoute = Route$10.update({
	id: "/almanaque",
	path: "/almanaque",
	getParentRoute: () => Route$13
});
var AuthRoute = Route$9.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$13
});
var ChakrasRoute = Route$8.update({
	id: "/chakras",
	path: "/chakras",
	getParentRoute: () => Route$13
});
var CiclosRoute = Route$7.update({
	id: "/ciclos",
	path: "/ciclos",
	getParentRoute: () => Route$13
});
var DiaForaDoTempoRoute = Route$6.update({
	id: "/dia-fora-do-tempo",
	path: "/dia-fora-do-tempo",
	getParentRoute: () => Route$13
});
var JornadaRoute = Route$5.update({
	id: "/jornada",
	path: "/jornada",
	getParentRoute: () => Route$13
});
var KaiRoute = Route$4.update({
	id: "/kai",
	path: "/kai",
	getParentRoute: () => Route$13
});
var OndaEncantadaRoute = Route$3.update({
	id: "/onda-encantada",
	path: "/onda-encantada",
	getParentRoute: () => Route$13
});
var RedefinirSenhaRoute = Route$2.update({
	id: "/redefinir-senha",
	path: "/redefinir-senha",
	getParentRoute: () => Route$13
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAdminRoute: Route$1.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedPerfilRoute: Route.update({
		id: "/perfil",
		path: "/perfil",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedCiclosKinKinRoute: Route$14.update({
		id: "/ciclos/kin/$kin",
		path: "/ciclos/kin/$kin",
		getParentRoute: () => AuthenticatedRouteRoute
	})
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AlmanaqueRoute,
	AuthRoute,
	ChakrasRoute,
	CiclosRoute,
	DiaForaDoTempoRoute,
	JornadaRoute,
	KaiRoute,
	OndaEncantadaRoute,
	RedefinirSenhaRoute
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
