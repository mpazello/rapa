import { i as toRequest, n as HTTPError } from "../_libs/h3+rou3+srvx.mjs";
//#region ../../node_modules/.pnpm/nitro@3.0.260603-beta_chokidar@5.0.0_drizzle-orm@0.45.2_@types+pg@8.20.0_pg@8.22.0__jit_7047aef44c52c87eec0dabc6e07f25bc/node_modules/nitro/dist/runtime/vite.mjs
function fetchViteEnv(viteEnvName, input, init) {
	const viteEnv = (globalThis.__nitro_vite_envs__ || {})[viteEnvName];
	if (!viteEnv) throw HTTPError.status(404);
	return Promise.resolve(viteEnv.fetch(toRequest(input, init)));
}
//#endregion
//#region ../../node_modules/.pnpm/nitro@3.0.260603-beta_chokidar@5.0.0_drizzle-orm@0.45.2_@types+pg@8.20.0_pg@8.22.0__jit_7047aef44c52c87eec0dabc6e07f25bc/node_modules/nitro/dist/runtime/internal/vite/ssr-renderer.mjs
/** @param {{ req: Request }} HTTPEvent */
function ssrRenderer({ req }) {
	return fetchViteEnv("ssr", req);
}
//#endregion
export { ssrRenderer as default };
