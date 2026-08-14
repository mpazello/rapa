import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useServerFn } from "./createSsrRpc-DvRDvdGH.mjs";
import { n as useAuth } from "./use-auth-C250R4UH.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as askKai } from "./kai.functions-_z68ALqu.mjs";
import { i as History, n as Send, r as Lightbulb, t as Sparkles } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kai-I92Jdyqx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var QUICK_REPLIES = [
	{
		label: "Ver padrões",
		icon: History,
		prompt: "Ajude-me a perceber os padrões da minha energia nesta semana."
	},
	{
		label: "Sabedoria do dia",
		icon: Sparkles,
		prompt: "Traga uma reflexão profunda a partir da minha filosofia atual."
	},
	{
		label: "Aprofundar",
		icon: Lightbulb,
		prompt: "Vamos aprofundar. Me leve mais fundo no que estou vivendo agora."
	}
];
function nowLabel() {
	return "Agora";
}
function KaiPage() {
	const { user } = useAuth();
	const fn = useServerFn(askKai);
	const displayName = (user?.user_metadata?.display_name)?.split(" ")[0] || user?.email?.split("@")[0] || "peregrino";
	const [messages, setMessages] = (0, import_react.useState)(() => [{
		role: "assistant",
		content: `Bem-vindo de volta, ${displayName}. Sinto que sua energia hoje busca clareza. Por onde deseja iniciar nossa jornada de consciência?`,
		ts: nowLabel()
	}]);
	const [input, setInput] = (0, import_react.useState)("");
	const scrollRef = (0, import_react.useRef)(null);
	const askMut = useMutation({
		mutationFn: (msgs) => fn({ data: { messages: msgs.map(({ role, content }) => ({
			role,
			content
		})) } }),
		onSuccess: (res) => setMessages((m) => [...m, {
			role: "assistant",
			content: res.text,
			ts: nowLabel()
		}]),
		onError: (e) => {
			toast.error(e.message);
			setMessages((m) => m.slice(0, -1));
		}
	});
	(0, import_react.useEffect)(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [messages, askMut.isPending]);
	function send(text) {
		const q = text.trim();
		if (!q || askMut.isPending) return;
		const next = [...messages, {
			role: "user",
			content: q,
			ts: nowLabel()
		}];
		setMessages(next);
		setInput("");
		askMut.mutate(next);
	}
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pt-24 pb-32 px-container-margin max-w-[720px] mx-auto min-h-screen text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "kai-orb mb-8 mx-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "kai-orb-core" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display-lg text-display-lg text-primary mb-2",
				children: "KAI"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-on-surface-variant mb-6",
				children: "Entre para dialogar com seu mentor de consciência."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/auth",
				className: "btn-primary",
				children: "Entrar"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			ref: scrollRef,
			className: "flex-1 overflow-y-auto px-container-margin pt-20 pb-56 max-w-[720px] mx-auto w-full space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "flex flex-col items-center py-6 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `kai-orb transition-transform ${askMut.isPending ? "kai-orb-thinking" : input.trim() ? "kai-orb-typing" : ""}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "kai-orb-core" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display-lg text-display-lg text-primary tracking-widest",
							children: "KAI"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-on-surface-variant text-sm italic",
							children: "Mentor de Consciência"
						})]
					})]
				}),
				messages.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-500`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `max-w-[85%] p-4 rounded-3xl ${m.role === "user" ? "bg-primary-container/40 border border-primary/30 text-on-surface rounded-br-md" : "glass-card text-on-surface rounded-bl-md"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-body-md text-body-md leading-relaxed whitespace-pre-wrap",
							children: m.content
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] uppercase tracking-widest text-on-surface-variant/70 mt-2 block",
							children: [
								m.role === "assistant" ? "KAI" : "VOCÊ",
								" • ",
								m.ts
							]
						})]
					})
				}, i)),
				askMut.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "glass-card p-4 rounded-3xl rounded-bl-md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex space-x-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce [animation-delay:0.15s]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce [animation-delay:0.3s]" })
							]
						})
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
			className: "fixed bottom-20 left-0 right-0 z-20 px-container-margin pt-8 pb-3 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-[720px] mx-auto space-y-3 pointer-events-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1",
					children: QUICK_REPLIES.map((r) => {
						const Icon = r.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => send(r.prompt),
							disabled: askMut.isPending,
							className: "shrink-0 flex items-center gap-2 px-4 py-2 glass-card rounded-full text-sm text-on-surface hover:bg-surface-container-high transition-colors disabled:opacity-50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								size: 14,
								className: "text-tertiary"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.label })]
						}, r.label);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: input,
						onChange: (e) => setInput(e.target.value),
						onKeyDown: (e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								send(input);
							}
						},
						placeholder: "Refletir com KAI…",
						className: "w-full glass-card rounded-2xl py-4 pl-5 pr-14 text-body-lg focus:outline-none focus:border-primary transition-all placeholder:text-on-surface-variant/50"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => send(input),
						disabled: !input.trim() || askMut.isPending,
						"aria-label": "Enviar",
						className: "absolute right-2 top-1/2 -translate-y-1/2 btn-icon-primary rounded-xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { size: 16 })
					})]
				})]
			})
		})]
	});
}
//#endregion
export { KaiPage as component };
