import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { d as Link, f as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-CynC6nuD.mjs";
import { n as useAuth } from "./use-auth-C250R4UH.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-DxkEFqa5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const navigate = useNavigate();
	const { session, loading } = useAuth();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [displayName, setDisplayName] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!loading && session) navigate({
			to: "/perfil",
			replace: true
		});
	}, [
		loading,
		session,
		navigate
	]);
	async function handleEmail(e) {
		e.preventDefault();
		setBusy(true);
		try {
			if (mode === "forgot") {
				const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/redefinir-senha` });
				if (error) console.error("resetPasswordForEmail:", error.message);
				toast.success("Se este email tiver conta, o link de redefinição foi enviado.");
				setMode("signin");
				return;
			}
			if (mode === "signup") {
				const { error } = await supabase.auth.signUp({
					email,
					password,
					options: {
						emailRedirectTo: window.location.origin,
						data: { display_name: displayName || email.split("@")[0] }
					}
				});
				if (error) throw error;
				toast.success("Conta criada. Bem-vindo(a) à RAPPAA.");
			} else {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (error) throw error;
			}
			navigate({
				to: "/perfil",
				replace: true
			});
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erro ao autenticar");
		} finally {
			setBusy(false);
		}
	}
	async function handleGoogle() {
		setBusy(true);
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: { redirectTo: window.location.origin }
		});
		if (error) {
			toast.error(error.message ?? "Erro ao entrar com Google");
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
					children: mode === "signin" ? "Bem-vindo(a) de volta" : mode === "forgot" ? "Recuperar acesso" : "Comece sua jornada"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-body-md text-on-surface-variant",
					children: mode === "signin" ? "Entre para continuar sua jornada RAPPAA" : mode === "forgot" ? "Informe seu email e enviaremos um link para redefinir a senha" : "Crie sua conta e registre seus ciclos"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card rounded-3xl p-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: handleGoogle,
						disabled: busy,
						className: "btn-secondary w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined text-[20px]",
							children: "login"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-title-md",
							children: "Continuar com Google"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 text-on-surface-variant/60 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px bg-outline-variant/40 flex-1" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ou" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px bg-outline-variant/40 flex-1" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleEmail,
						className: "space-y-3",
						children: [
							mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Como podemos te chamar?",
								value: displayName,
								onChange: (e) => setDisplayName(e.target.value),
								className: "w-full rounded-2xl bg-surface-container-low border border-outline-variant/40 px-4 py-3 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								required: true,
								placeholder: "Seu email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								className: "w-full rounded-2xl bg-surface-container-low border border-outline-variant/40 px-4 py-3 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary"
							}),
							mode !== "forgot" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								required: true,
								minLength: 6,
								placeholder: "Senha (mínimo 6 caracteres)",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								className: "w-full rounded-2xl bg-surface-container-low border border-outline-variant/40 px-4 py-3 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: busy,
								className: "btn-primary w-full",
								children: busy ? "Aguarde…" : mode === "signin" ? "Entrar" : mode === "forgot" ? "Enviar link" : "Criar conta"
							})
						]
					}),
					mode === "signin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setMode("forgot"),
							className: "btn-ghost text-sm",
							children: "Esqueci minha senha"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-center text-sm text-on-surface-variant",
						children: [
							mode === "signin" ? "Ainda não tem conta?" : mode === "forgot" ? "Lembrou a senha?" : "Já tem conta?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setMode(mode === "signin" ? "signup" : "signin"),
								className: "text-primary hover:underline",
								children: mode === "signin" ? "Criar agora" : "Entrar"
							})
						]
					})
				]
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
export { AuthPage as component };
