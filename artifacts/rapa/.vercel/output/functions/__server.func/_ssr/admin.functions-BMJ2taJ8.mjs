import { c as createServerFn } from "./request-response-DE8FPPId.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-DJw85tyK.mjs";
import { a as stringType, i as objectType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-DSCWxzz5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.functions-BMJ2taJ8.js
/** Confirma que o usuário autenticado tem o papel de admin (via RLS user-scoped). */
async function assertAdmin(context) {
	const { data, error } = await context.supabase.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
	if (error) throw new Error(error.message);
	if (!data) throw new Error("Acesso restrito: apenas administradores.");
}
/** Lista todos os usuários com email (requer service role). */
var adminListUsers_createServerFn_handler = createServerRpc({
	id: "35cf6cc28f61c798a570ec39672552de8ed250f60706565e25b34a66f0c5b240",
	name: "adminListUsers",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminListUsers.__executeServer(opts));
var adminListUsers = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(adminListUsers_createServerFn_handler, async ({ context }) => {
	await assertAdmin(context);
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	const emails = {};
	for (let page = 1; page <= 50; page++) {
		const { data: list, error } = await supabaseAdmin.auth.admin.listUsers({
			page,
			perPage: 200
		});
		if (error) throw new Error(error.message);
		for (const u of list.users) if (u.email) emails[u.id] = u.email;
		if (list.users.length < 200) break;
	}
	return { emails };
});
var adminResetUserPassword_createServerFn_handler = createServerRpc({
	id: "e26d54fd4bb85730b3dd66f1b502cc31e7da8b91f4fd161a5b19ad2562e4d543",
	name: "adminResetUserPassword",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminResetUserPassword.__executeServer(opts));
var adminResetUserPassword = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
	userId: stringType().uuid().optional(),
	email: stringType().email().optional(),
	newPassword: stringType().min(6).max(72)
}).refine((v) => v.userId || v.email, { message: "Informe o usuário (id ou email)." }).parse(d)).handler(adminResetUserPassword_createServerFn_handler, async ({ data, context }) => {
	await assertAdmin(context);
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	let targetId = data.userId ?? null;
	if (!targetId && data.email) {
		const email = data.email.toLowerCase();
		for (let page = 1; page <= 50 && !targetId; page++) {
			const { data: list, error } = await supabaseAdmin.auth.admin.listUsers({
				page,
				perPage: 200
			});
			if (error) throw new Error(error.message);
			const found = list.users.find((u) => u.email?.toLowerCase() === email);
			if (found) targetId = found.id;
			if (list.users.length < 200) break;
		}
	}
	if (!targetId) throw new Error("Usuário não encontrado.");
	const { error } = await supabaseAdmin.auth.admin.updateUserById(targetId, { password: data.newPassword });
	if (error) throw new Error(error.message);
	return { ok: true };
});
//#endregion
export { adminListUsers_createServerFn_handler, adminResetUserPassword_createServerFn_handler };
