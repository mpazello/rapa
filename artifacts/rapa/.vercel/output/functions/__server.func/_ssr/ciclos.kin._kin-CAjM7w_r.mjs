import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as getKinInfo } from "./tzolkin-CeuRSgpU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ciclos.kin._kin-CAjM7w_r.js
var $$splitComponentImporter = () => import("./ciclos.kin._kin-Dh_4S_QM.mjs");
var Route = createFileRoute("/_authenticated/ciclos/kin/$kin")({
	head: ({ params }) => {
		const k = Number(params.kin);
		const info = k >= 1 && k <= 260 ? getKinInfo(k) : null;
		const title = info ? `Kin ${k} — ${info.fullName} — RAPPAA` : `Kin ${params.kin} — RAPPAA`;
		const description = info ? `${info.fullName}: ${info.affirmation}` : "Explore o Kin, seu Selo, Tom e a ressonância com sua jornada.";
		return { meta: [
			{ title },
			{
				name: "description",
				content: description.slice(0, 160)
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: description.slice(0, 160)
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
