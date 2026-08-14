import { r as __toESM } from "../_runtime.mjs";
import { c as createServerFn } from "./request-response-DE8FPPId.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useServerFn, t as createSsrRpc } from "./createSsrRpc-DvRDvdGH.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-DJw85tyK.mjs";
import { t as supabase } from "./client-CynC6nuD.mjs";
import { n as useAuth } from "./use-auth-C250R4UH.mjs";
import { a as stringType, i as objectType } from "../_libs/zod.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-BkzsUVzR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Confirma que o usuário autenticado tem o papel de admin (via RLS user-scoped). */
/** Lista todos os usuários com email (requer service role). */
var adminListUsers = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("35cf6cc28f61c798a570ec39672552de8ed250f60706565e25b34a66f0c5b240"));
/** Admin define diretamente uma nova senha para um usuário (por ID ou email). */
var adminResetUserPassword = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
	userId: stringType().uuid().optional(),
	email: stringType().email().optional(),
	newPassword: stringType().min(6).max(72)
}).refine((v) => v.userId || v.email, { message: "Informe o usuário (id ou email)." }).parse(d)).handler(createSsrRpc("e26d54fd4bb85730b3dd66f1b502cc31e7da8b91f4fd161a5b19ad2562e4d543"));
var ALL_ROLES = [
	"admin",
	"mentor",
	"user"
];
function AdminPage() {
	const { isAdmin, loading } = useAuth();
	const [rows, setRows] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(true);
	const [resetMode, setResetMode] = (0, import_react.useState)("link");
	const [resetEmail, setResetEmail] = (0, import_react.useState)("");
	const [newPassword, setNewPassword] = (0, import_react.useState)("");
	const [resetBusy, setResetBusy] = (0, import_react.useState)(false);
	const fnResetPassword = useServerFn(adminResetUserPassword);
	const fnListUsers = useServerFn(adminListUsers);
	async function sendReset(e) {
		e.preventDefault();
		setResetBusy(true);
		try {
			if (resetMode === "direct") {
				await fnResetPassword({ data: {
					email: resetEmail.trim(),
					newPassword
				} });
				toast.success(`Senha de ${resetEmail.trim()} redefinida com sucesso.`);
				setResetEmail("");
				setNewPassword("");
			} else {
				const { error } = await supabase.auth.resetPasswordForEmail(resetEmail.trim(), { redirectTo: `${window.location.origin}/redefinir-senha` });
				if (error) console.error("resetPasswordForEmail:", error.message);
				toast.success(`Se ${resetEmail.trim()} tiver conta, o link de redefinição foi enviado.`);
				setResetEmail("");
			}
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erro ao redefinir a senha");
		} finally {
			setResetBusy(false);
		}
	}
	async function load() {
		setBusy(true);
		const [{ data: profiles }, { data: userRoles }, emailsResult] = await Promise.all([
			supabase.from("profiles").select("id, display_name, avatar_url, created_at").order("created_at", { ascending: false }),
			supabase.from("user_roles").select("user_id, role"),
			fnListUsers().catch((err) => {
				console.error("[admin] adminListUsers falhou:", err);
				return { emails: {} };
			})
		]);
		const emails = emailsResult.emails ?? {};
		const byUser = /* @__PURE__ */ new Map();
		(userRoles ?? []).forEach((r) => {
			const arr = byUser.get(r.user_id) ?? [];
			arr.push(r.role);
			byUser.set(r.user_id, arr);
		});
		setRows((profiles ?? []).map((p) => ({
			...p,
			email: emails[p.id] ?? null,
			roles: byUser.get(p.id) ?? []
		})));
		setBusy(false);
	}
	(0, import_react.useEffect)(() => {
		if (!loading && isAdmin) load();
		else if (!loading) setBusy(false);
	}, [loading, isAdmin]);
	async function toggleRole(userId, role, has) {
		if (has) {
			const { error } = await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", role);
			if (error) return toast.error(error.message);
		} else {
			const { error } = await supabase.from("user_roles").insert({
				user_id: userId,
				role
			});
			if (error) return toast.error(error.message);
		}
		toast.success("Papel atualizado");
		load();
	}
	if (loading || busy) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "pt-24 pb-32 px-container-margin max-w-[900px] mx-auto min-h-screen",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-on-surface-variant text-center",
			children: "Carregando…"
		})
	});
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pt-24 pb-32 px-container-margin max-w-[720px] mx-auto min-h-screen text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "material-symbols-outlined text-[48px] text-on-surface-variant mb-4 block",
				children: "lock"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-headline-lg-mobile text-headline-lg-mobile mb-2",
				children: "Acesso restrito"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-on-surface-variant mb-6",
				children: "Apenas administradores podem acessar esta área."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/perfil",
				className: "inline-block rounded-full bg-primary text-on-primary px-6 py-2",
				children: "Voltar ao perfil"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pt-24 pb-32 px-container-margin max-w-[900px] mx-auto min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-headline-lg-mobile text-headline-lg-mobile mb-1",
					children: "Gestão de usuários"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-on-surface-variant text-sm",
					children: [
						rows.length,
						" ",
						rows.length === 1 ? "pessoa" : "pessoas",
						" na RAPPAA"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass-card rounded-2xl p-4 mb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-title-md mb-3 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined text-[20px] text-primary",
							children: "lock_reset"
						}), "Redefinir senha de usuário"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-1 bg-surface-container-low p-1 rounded-2xl border border-outline-variant/30 mb-3",
						children: [{
							key: "link",
							label: "Enviar link por email"
						}, {
							key: "direct",
							label: "Definir senha agora"
						}].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setResetMode(opt.key),
							className: `flex-1 py-2 px-2 rounded-xl text-xs sm:text-sm transition-all ${resetMode === opt.key ? "bg-primary text-on-primary shadow-md shadow-primary/20" : "text-on-surface-variant hover:bg-surface-container-high"}`,
							children: opt.label
						}, opt.key))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-on-surface-variant mb-3",
						children: resetMode === "link" ? "A pessoa recebe um email com um link seguro para escolher a nova senha." : "Você define a nova senha na hora. Avise o usuário do novo acesso por um canal seguro."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: sendReset,
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								required: true,
								placeholder: "Email do usuário",
								value: resetEmail,
								onChange: (e) => setResetEmail(e.target.value),
								className: "flex-1 rounded-2xl bg-surface-container-low border border-outline-variant/40 px-4 py-2.5 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary"
							}), resetMode === "direct" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								minLength: 6,
								maxLength: 72,
								placeholder: "Nova senha (mín. 6)",
								value: newPassword,
								onChange: (e) => setNewPassword(e.target.value),
								className: "flex-1 rounded-2xl bg-surface-container-low border border-outline-variant/40 px-4 py-2.5 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: resetBusy,
							className: "self-start rounded-full bg-primary text-on-primary px-6 py-2.5 font-title-md hover:opacity-90 disabled:opacity-50",
							children: resetBusy ? "Processando…" : resetMode === "link" ? "Enviar link" : "Definir nova senha"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-card rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 flex-1 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-11 h-11 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden shrink-0",
							children: row.avatar_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: row.avatar_url,
								alt: "",
								className: "w-full h-full object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "material-symbols-outlined text-primary",
								children: "person"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-title-md truncate",
									children: row.display_name || "Sem nome"
								}),
								row.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-cosmic-blue truncate",
									children: row.email
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-on-surface-variant truncate mt-0.5",
									children: ["desde ", new Date(row.created_at).toLocaleDateString("pt-BR")]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2 flex-wrap",
						children: ALL_ROLES.map((role) => {
							const has = row.roles.includes(role);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => toggleRole(row.id, role, has),
								className: `text-xs px-3 py-1.5 rounded-full border uppercase tracking-wider transition-colors ${has ? "bg-primary text-on-primary border-primary" : "bg-transparent text-on-surface-variant border-outline-variant/40 hover:bg-surface-container-high"}`,
								children: role
							}, role);
						})
					})]
				}, row.id))
			})
		]
	});
}
//#endregion
export { AdminPage as component };
