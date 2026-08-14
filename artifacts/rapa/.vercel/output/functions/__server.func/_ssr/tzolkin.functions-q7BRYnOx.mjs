import { c as createServerFn } from "./request-response-DE8FPPId.mjs";
import { t as createSsrRpc } from "./createSsrRpc-DvRDvdGH.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-DJw85tyK.mjs";
import { a as stringType, i as objectType, r as numberType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tzolkin.functions-q7BRYnOx.js
/** Estatísticas do usuário para um Kin específico: quantas entradas + snippets. */
var getKinJourneyStats = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ kin: numberType().int().min(1).max(260) }).parse(d)).handler(createSsrRpc("50e94408249371e03ed1e61f551da63d84134555e676b4602263afd72593d6eb"));
/** Atualiza a data de nascimento do usuário. O `natal_kin` é recomputado por trigger no banco. */
var setBirthDate = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ birth_date: stringType().regex(/^\d{4}-\d{2}-\d{2}$/) }).parse(d)).handler(createSsrRpc("508359195d7a2e109d55a6083a1a790f64b0b72fa3abb15c1d31040f5f357ccf"));
/** Retorna a data de nascimento + Kin natal do usuário atual. */
var getNatal = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("4c303d05ada7b477525e72d722f2a65010059b07d6fa66b04d1059f9f471fa34"));
//#endregion
export { getNatal as n, setBirthDate as r, getKinJourneyStats as t };
