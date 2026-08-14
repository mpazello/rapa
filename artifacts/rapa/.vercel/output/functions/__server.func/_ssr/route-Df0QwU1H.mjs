import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { s as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useServerFn } from "./createSsrRpc-DvRDvdGH.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { g as getKinInfo, y as kinFromDate } from "./tzolkin-CeuRSgpU.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as getNatal, r as setBirthDate } from "./tzolkin.functions-q7BRYnOx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-Df0QwU1H.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Bloqueia todas as páginas autenticadas até o usuário informar sua data de nascimento.
* O Kin natal é calculado no banco (trigger sync_natal_kin) assim que a data é salva.
*/
function OnboardingGate({ children }) {
	const qc = useQueryClient();
	const fnGetNatal = useServerFn(getNatal);
	const fnSetBirthDate = useServerFn(setBirthDate);
	const natalQuery = useQuery({
		queryKey: ["natal"],
		queryFn: () => fnGetNatal()
	});
	const [date, setDate] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	if (natalQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center text-on-surface-variant",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "material-symbols-outlined animate-spin",
			children: "progress_activity"
		})
	});
	if (natalQuery.data?.birth_date) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
	const preview = date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? getKinInfo(kinFromDate(/* @__PURE__ */ new Date(date + "T12:00:00Z"))) : null;
	async function handleSave(e) {
		e.preventDefault();
		if (!date) return;
		setSaving(true);
		try {
			await fnSetBirthDate({ data: { birth_date: date } });
			await qc.invalidateQueries({ queryKey: ["natal"] });
			toast.success(`Seu Kin natal foi selado: ${preview?.fullName ?? ""}`);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erro ao salvar");
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen pt-24 pb-16 px-container-margin max-w-[560px] mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 texture-overlay z-[-1]",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "material-symbols-outlined text-5xl text-primary",
						style: { fontVariationSettings: "'FILL' 1" },
						children: "hub"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-headline-lg text-headline-lg mt-4 mb-2",
						children: "Sele o seu Kin natal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-body-md text-on-surface-variant",
						children: "Sua data de nascimento revela o Kin que abriu a sua jornada — a bússola que orienta o Mapa de Ressonância."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSave,
				className: "glass-panel rounded-3xl p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-xs uppercase tracking-wider text-on-surface-variant mb-2",
						children: "Data de nascimento"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "date",
						required: true,
						max: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
						value: date,
						onChange: (e) => setDate(e.target.value),
						className: "w-full rounded-2xl bg-surface-container-low border border-outline-variant/40 px-4 py-3 focus:outline-none focus:border-primary text-on-surface"
					})] }),
					preview && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-primary/30 bg-primary/5 p-4 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs uppercase tracking-widest text-primary",
								children: "Prévia do seu Kin natal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-title-lg text-title-lg mt-1",
								children: ["Kin ", preview.kin]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-body-md text-on-surface-variant",
								children: preview.fullName
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: !date || saving,
						className: "w-full rounded-full bg-primary text-on-primary py-3 font-title-md hover:opacity-90 disabled:opacity-50",
						children: saving ? "Selando…" : "Selar meu Kin natal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-on-surface-variant/70 text-center",
						children: "Você pode ajustar depois na tela de Perfil."
					})
				]
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OnboardingGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
//#endregion
export { SplitComponent as component };
