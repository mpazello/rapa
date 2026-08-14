//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-VV3C3_qm.js
var manifest = {
	"021b00f4fab2f0ecab5e116f7488d57ac646cfe87403e0fcffc048e8302563d7": {
		functionName: "deleteEntry_createServerFn_handler",
		importer: () => import("./_ssr/journal.functions-Cli33x8Y.mjs")
	},
	"22eb1f172653b5f7d59ce5be820b5d986c6bfc1ab86ae0c0c0445b70200b7bac": {
		functionName: "getYearStats_createServerFn_handler",
		importer: () => import("./_ssr/dftdt.functions-BlhLrS0m.mjs")
	},
	"31811178f44f2054bd38ae47ce947ecb1bf23f3c4030240358ccafbb423c140e": {
		functionName: "listEntries_createServerFn_handler",
		importer: () => import("./_ssr/journal.functions-Cli33x8Y.mjs")
	},
	"35cf6cc28f61c798a570ec39672552de8ed250f60706565e25b34a66f0c5b240": {
		functionName: "adminListUsers_createServerFn_handler",
		importer: () => import("./_ssr/admin.functions-BMJ2taJ8.mjs")
	},
	"4488a0c8d72944ecd3fba11b8da9f531a5a7f7ae883bd360ff38c0ac830cb3ce": {
		functionName: "askKai_createServerFn_handler",
		importer: () => import("./_ssr/kai.functions-BhL9yIER.mjs")
	},
	"45043b0f5cbdfd3044451af20093e2a2efe181b779c72ecef0c4ecee3d023226": {
		functionName: "getDFTDTExperience_createServerFn_handler",
		importer: () => import("./_ssr/dftdt.functions-BlhLrS0m.mjs")
	},
	"4c303d05ada7b477525e72d722f2a65010059b07d6fa66b04d1059f9f471fa34": {
		functionName: "getNatal_createServerFn_handler",
		importer: () => import("./_ssr/tzolkin.functions-BpMhCWO6.mjs")
	},
	"508359195d7a2e109d55a6083a1a790f64b0b72fa3abb15c1d31040f5f357ccf": {
		functionName: "setBirthDate_createServerFn_handler",
		importer: () => import("./_ssr/tzolkin.functions-BpMhCWO6.mjs")
	},
	"50e94408249371e03ed1e61f551da63d84134555e676b4602263afd72593d6eb": {
		functionName: "getKinJourneyStats_createServerFn_handler",
		importer: () => import("./_ssr/tzolkin.functions-BpMhCWO6.mjs")
	},
	"7405ab528e7faf5f6643800603518ad41f64fd4fd10b81a3331a1a0376530366": {
		functionName: "updatePhilosophy_createServerFn_handler",
		importer: () => import("./_ssr/journal.functions-Cli33x8Y.mjs")
	},
	"774ddde3d3820594b6b6c159b10ea8d66eb47e32eaba25c06808a1dab571e711": {
		functionName: "saveDFTDTPortal_createServerFn_handler",
		importer: () => import("./_ssr/dftdt.functions-BlhLrS0m.mjs")
	},
	"7e4e00f5cb0896adfb5d6926102355d50545fad6e33fafa14171335c4cf5689a": {
		functionName: "completeDFTDT_createServerFn_handler",
		importer: () => import("./_ssr/dftdt.functions-BlhLrS0m.mjs")
	},
	"b5062999b8b83fd5f0f9ef860c47638733a57dda4fc3e6fe8b528b883639c718": {
		functionName: "updateEntry_createServerFn_handler",
		importer: () => import("./_ssr/journal.functions-Cli33x8Y.mjs")
	},
	"ba6714d1ec1906483af00dccc0896afe21c31bb29691a76e5119b5148bd32ee1": {
		functionName: "setTodayMood_createServerFn_handler",
		importer: () => import("./_ssr/journal.functions-Cli33x8Y.mjs")
	},
	"d32a32b6684e21c6d89f2158ac1d12684566857f7e53b5b6e5ffe10621fb22db": {
		functionName: "getTodayMood_createServerFn_handler",
		importer: () => import("./_ssr/journal.functions-Cli33x8Y.mjs")
	},
	"e14a2fcd55b1fb2b66a915bfbb4bd251eef77933461a56ef368af757c3caad4d": {
		functionName: "addEntry_createServerFn_handler",
		importer: () => import("./_ssr/journal.functions-Cli33x8Y.mjs")
	},
	"e26d54fd4bb85730b3dd66f1b502cc31e7da8b91f4fd161a5b19ad2562e4d543": {
		functionName: "adminResetUserPassword_createServerFn_handler",
		importer: () => import("./_ssr/admin.functions-BMJ2taJ8.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
