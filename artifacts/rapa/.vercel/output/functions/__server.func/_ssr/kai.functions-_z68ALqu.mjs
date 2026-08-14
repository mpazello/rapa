import { c as createServerFn } from "./request-response-DE8FPPId.mjs";
import { t as createSsrRpc } from "./createSsrRpc-DvRDvdGH.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-DJw85tyK.mjs";
import { a as stringType, i as objectType, n as enumType, r as numberType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kai.functions-_z68ALqu.js
var Input = objectType({
	messages: arrayType(objectType({
		role: enumType(["user", "assistant"]),
		content: stringType().min(1).max(4e3)
	})).min(1).max(30),
	resonance: objectType({ kin: numberType().int().min(1).max(260) }).optional()
});
var askKai = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => Input.parse(data)).handler(createSsrRpc("4488a0c8d72944ecd3fba11b8da9f531a5a7f7ae883bd360ff38c0ac830cb3ce"));
//#endregion
export { askKai as t };
