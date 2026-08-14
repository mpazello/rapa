import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as supabase } from "./client-CynC6nuD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-auth-C250R4UH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AuthContext = (0, import_react.createContext)(void 0);
function AuthProvider({ children }) {
	const [session, setSession] = (0, import_react.useState)(null);
	const [roles, setRoles] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
			setSession(s);
			if (s?.user) setTimeout(() => {
				supabase.from("user_roles").select("role").eq("user_id", s.user.id).then(({ data }) => setRoles((data ?? []).map((r) => r.role)));
			}, 0);
			else setRoles([]);
		});
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			if (data.session?.user) supabase.from("user_roles").select("role").eq("user_id", data.session.user.id).then(({ data: r }) => setRoles((r ?? []).map((x) => x.role)));
			setLoading(false);
		});
		return () => sub.subscription.unsubscribe();
	}, []);
	const value = {
		session,
		user: session?.user ?? null,
		roles,
		loading,
		isAdmin: roles.includes("admin"),
		isMentor: roles.includes("mentor"),
		signOut: async () => {
			await supabase.auth.signOut();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value,
		children
	});
}
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}
//#endregion
export { useAuth as n, AuthProvider as t };
