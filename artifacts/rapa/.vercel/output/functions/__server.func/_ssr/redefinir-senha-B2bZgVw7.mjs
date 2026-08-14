import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { d as Link, f as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-CynC6nuD.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/redefinir-senha-B2bZgVw7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** O link de recuperação chega com `?code=` ou `#...type=recovery`. */
function hasRecoveryParams() {
	if (typeof window === "undefined") return false;
	if (new URLSearchParams(window.location.search).has("code")) return true;
	const hash = window.location.hash;
	return hash.includes("type=recovery") || hash.includes("access_token=");
}
function ResetPasswordPage() {
	const navigate = useNavigate();
	const [status, setStatus] = (0, import_react.useState)("checking");
	const [accountEmail, setAccountEmail] = (0, import_react.useState)(null);
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const cameFromRecoveryLink = hasRecoveryParams();
		const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
			if (event === "PASSWORD_RECOVERY" && session) {
				setAccountEmail(session.user.email ?? null);
				setStatus("recovery");
			}
		});
		supabase.auth.getSession().then(({ data }) => {
			setStatus((prev) => {
				if (prev === "recovery") return prev;
				if (data.session && cameFromRecoveryLink) {
					setAccountEmail(data.session.user.email ?? null);
					return "recovery";
				}
				if (data.session) {
					setAccountEmail(data.session.user.email ?? null);
					return "signedIn";
				}
				return "noSession";
			});
		});
		return () => sub.subscription.unsubscribe();
	}, []);
	const ready = status === "recovery";
	async function handleSubmit(e) {
		e.preventDefault();
		if (password !== confirm) {
			toast.error("As senhas não coincidem.");
			return;
		}
		setBusy(true);
		try {
			const { error } = await supabase.auth.updateUser({ password });
			if (error) throw error;
			toast.success("Senha redefinida com sucesso.");
			navigate({
				to: "/perfil",
				replace: true
			});
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erro ao redefinir a senha");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pt-24 pb-32 px-container-margin max-w-[440px] mx-auto min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif text-4xl mb-2",
					children: "Redefinir senha"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-body-md text-on-surface-variant",
					children: ready ? "Escolha uma nova senha para sua conta." : status === "signedIn" ? "Esta página é usada pelo link de redefinição enviado por email." : "Abra esta página pelo link enviado ao seu email para redefinir a senha."
				})]
			}),
			ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "glass-card rounded-3xl p-6 space-y-3",
				children: [
					accountEmail && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-center text-xs text-on-surface-variant bg-surface-container-low rounded-2xl px-4 py-2.5",
						children: ["Definindo nova senha para ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-on-surface",
							children: accountEmail
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "password",
						required: true,
						minLength: 6,
						placeholder: "Nova senha (mínimo 6 caracteres)",
						value: password,
						onChange: (e) => setPassword(e.target.value),
						className: "w-full rounded-2xl bg-surface-container-low border border-outline-variant/40 px-4 py-3 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "password",
						required: true,
						minLength: 6,
						placeholder: "Confirme a nova senha",
						value: confirm,
						onChange: (e) => setConfirm(e.target.value),
						className: "w-full rounded-2xl bg-surface-container-low border border-outline-variant/40 px-4 py-3 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: busy,
						className: "w-full rounded-full bg-primary text-on-primary py-3 font-title-md hover:opacity-90 disabled:opacity-50",
						children: busy ? "Aguarde…" : "Salvar nova senha"
					})
				]
			}) : status === "checking" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "glass-card rounded-3xl p-6 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-on-surface-variant text-sm",
					children: "Verificando…"
				})
			}) : status === "signedIn" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card rounded-3xl p-6 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "material-symbols-outlined text-[40px] text-on-surface-variant mb-3 block",
					children: "verified_user"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-on-surface-variant text-sm",
					children: [
						"Você já está conectado",
						accountEmail ? ` como ${accountEmail}` : "",
						". Para redefinir uma senha, abra o link de redefinição enviado por email — de preferência em uma janela anônima, se for de outra conta."
					]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card rounded-3xl p-6 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "material-symbols-outlined text-[40px] text-on-surface-variant mb-3 block",
					children: "mail"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-on-surface-variant text-sm",
					children: [
						"Solicite um link de redefinição na tela de",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							className: "text-primary hover:underline",
							children: "entrada"
						}),
						" ",
						"ou peça a um administrador."
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-sm text-on-surface-variant hover:text-on-surface",
					children: "← Voltar ao início"
				})
			})
		]
	});
}
//#endregion
export { ResetPasswordPage as component };
