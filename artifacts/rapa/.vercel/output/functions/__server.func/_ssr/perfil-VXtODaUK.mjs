import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { d as Link, f as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-CynC6nuD.mjs";
import { n as useAuth } from "./use-auth-C250R4UH.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as yearBearer, T as sincronarioDate, g as getKinInfo, w as sincronarioCoordinate, x as personalCubicPattern } from "./tzolkin-CeuRSgpU.mjs";
import { t as KinBadge } from "./KinBadge-dubxczgb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/perfil-VXtODaUK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PerfilPage() {
	const { user, roles, isAdmin, signOut } = useAuth();
	const navigate = useNavigate();
	const [displayName, setDisplayName] = (0, import_react.useState)("");
	const [avatarUrl, setAvatarUrl] = (0, import_react.useState)("");
	const [philosophy, setPhilosophy] = (0, import_react.useState)("maia");
	const [birthDate, setBirthDate] = (0, import_react.useState)("");
	const [natalKin, setNatalKin] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [uploadingPhoto, setUploadingPhoto] = (0, import_react.useState)(false);
	const fileInputRef = (0, import_react.useRef)(null);
	/** Redimensiona e comprime a imagem no navegador (256×256, JPEG). */
	async function processPhoto(file) {
		const bitmap = await createImageBitmap(file);
		const size = 256;
		const canvas = document.createElement("canvas");
		canvas.width = size;
		canvas.height = size;
		const ctx = canvas.getContext("2d");
		const side = Math.min(bitmap.width, bitmap.height);
		const sx = (bitmap.width - side) / 2;
		const sy = (bitmap.height - side) / 2;
		ctx.drawImage(bitmap, sx, sy, side, side, 0, 0, size, size);
		bitmap.close();
		return canvas.toDataURL("image/jpeg", .85);
	}
	async function handlePhotoChange(e) {
		const file = e.target.files?.[0];
		e.target.value = "";
		if (!file || !user) return;
		if (!file.type.startsWith("image/")) {
			toast.error("Escolha um arquivo de imagem.");
			return;
		}
		setUploadingPhoto(true);
		try {
			const dataUrl = await processPhoto(file);
			const { error } = await supabase.from("profiles").update({ avatar_url: dataUrl }).eq("id", user.id);
			if (error) throw new Error(error.message);
			setAvatarUrl(dataUrl);
			toast.success("Foto de perfil atualizada");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erro ao enviar a foto");
		} finally {
			setUploadingPhoto(false);
		}
	}
	async function handleRemovePhoto() {
		if (!user) return;
		const { error } = await supabase.from("profiles").update({ avatar_url: null }).eq("id", user.id);
		if (error) return toast.error(error.message);
		setAvatarUrl("");
		toast.success("Foto removida");
	}
	(0, import_react.useEffect)(() => {
		if (!user) return;
		supabase.from("profiles").select("display_name, avatar_url, philosophy, birth_date, natal_kin").eq("id", user.id).maybeSingle().then(({ data }) => {
			const p = data;
			setDisplayName(p?.display_name ?? "");
			setAvatarUrl(p?.avatar_url ?? "");
			setPhilosophy(p?.philosophy ?? "maia");
			setBirthDate(p?.birth_date ?? "");
			setNatalKin(p?.natal_kin ?? null);
			setLoading(false);
		});
	}, [user]);
	async function handleSave(e) {
		e.preventDefault();
		if (!user) return;
		setSaving(true);
		const { error } = await supabase.from("profiles").update({
			display_name: displayName,
			avatar_url: avatarUrl || null,
			philosophy,
			birth_date: birthDate || null
		}).eq("id", user.id);
		setSaving(false);
		if (error) toast.error(error.message);
		else {
			toast.success("Perfil atualizado");
			const { data } = await supabase.from("profiles").select("natal_kin").eq("id", user.id).maybeSingle();
			setNatalKin(data?.natal_kin ?? null);
		}
	}
	async function handleSignOut() {
		await signOut();
		navigate({
			to: "/auth",
			replace: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pt-24 pb-32 px-container-margin max-w-[720px] mx-auto min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "text-center mb-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-24 h-24 mx-auto mb-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => fileInputRef.current?.click(),
								disabled: uploadingPhoto,
								"aria-label": "Trocar foto de perfil",
								className: "w-24 h-24 rounded-full bg-surface-container-high border border-outline-variant/40 flex items-center justify-center overflow-hidden hover:border-primary transition-colors disabled:opacity-60",
								children: avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: avatarUrl,
									alt: "",
									className: "w-full h-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "material-symbols-outlined text-[40px] text-primary",
									style: { fontVariationSettings: "'FILL' 1" },
									children: "person"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center border-2 border-background pointer-events-none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "material-symbols-outlined text-[16px]",
									children: uploadingPhoto ? "hourglass_top" : "photo_camera"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileInputRef,
								type: "file",
								accept: "image/*",
								className: "hidden",
								onChange: handlePhotoChange
							})
						]
					}),
					avatarUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: handleRemovePhoto,
						className: "text-xs text-on-surface-variant hover:text-error underline underline-offset-2 mb-4 -mt-2",
						children: "Remover foto"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-headline-lg-mobile text-headline-lg-mobile mb-1",
						children: displayName || "Sua jornada"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-body-md text-on-surface-variant",
						children: user?.email
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex justify-center gap-2 flex-wrap",
						children: roles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/40 uppercase tracking-wider",
							children: r
						}, r))
					})
				]
			}),
			(() => {
				const today = sincronarioDate();
				const year = yearBearer();
				const coord = sincronarioCoordinate();
				const birthD = birthDate ? /* @__PURE__ */ new Date(birthDate + "T12:00:00Z") : null;
				const birth = birthD ? sincronarioDate(birthD) : null;
				const birthYear = birthD ? yearBearer(birthD) : null;
				const birthCoord = birthD ? sincronarioCoordinate(birthD) : null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "glass-card rounded-3xl p-5 mb-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-title-lg text-title-lg",
								children: "Sincronário 13:20"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs uppercase tracking-widest text-on-surface-variant",
								children: "Bússola"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-surface-container-low border border-outline-variant/40 p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs uppercase tracking-widest text-primary",
										children: "Hoje"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-headline-sm text-primary mt-1 tracking-wider",
										children: coord
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-body-sm text-on-surface-variant",
										children: "ano.lua.dia"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-title-md mt-2",
										children: today.dayOutOfTime ? "Dia Fora do Tempo" : `Lua ${today.moon} · Dia ${today.day}`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-body-sm text-on-surface-variant",
										children: today.moonName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-body-sm text-on-surface-variant mt-2",
										children: [
											"Ano: ",
											year.label,
											" · Kin ",
											year.kin
										]
									})
								]
							}), birth && birthYear && birthCoord && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-surface-container-low border border-outline-variant/40 p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs uppercase tracking-widest text-primary",
										children: "Nascimento"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-headline-sm text-primary mt-1 tracking-wider",
										children: birthCoord
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-body-sm text-on-surface-variant",
										children: "ano.lua.dia"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-title-md mt-2",
										children: birth.dayOutOfTime ? "Dia Fora do Tempo" : `Lua ${birth.moon} · Dia ${birth.day}`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-body-sm text-on-surface-variant",
										children: birth.moonName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-body-sm text-on-surface-variant mt-2",
										children: [
											"Ano: ",
											birthYear.label,
											" · Kin ",
											birthYear.kin
										]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-on-surface-variant",
							children: [
								"Coordenada da Bússola: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono",
									children: "ano.lua.dia"
								}),
								" — ano = Kin do portador (Tormenta/Semente/Lua/Mago), lua 1-13, dia 1-28. Ano galáctico inicia em 26/jul; 25/jul é o Dia Fora do Tempo; 29/fev não é contado."
							]
						})
					]
				});
			})(),
			natalKin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/ciclos/kin/$kin",
				params: { kin: String(natalKin) },
				className: "glass-card rounded-3xl p-5 mb-6 hover:border-primary border border-transparent transition-colors flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KinBadge, {
					kin: natalKin,
					size: 64,
					pulse: true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs uppercase tracking-widest text-primary",
						children: "Seu Kin natal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-title-lg text-title-lg mt-1",
						children: ["Kin ", natalKin]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-body-sm text-on-surface-variant",
						children: "Toque para abrir sua leitura completa →"
					})
				] })]
			}),
			natalKin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CubicPatternCard, { natalKin }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSave,
				className: "glass-card rounded-3xl p-6 space-y-4 mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-title-lg text-title-lg",
						children: "Suas informações"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-xs uppercase tracking-wider text-on-surface-variant mb-1",
						children: "Nome de exibição"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: displayName,
						disabled: loading,
						onChange: (e) => setDisplayName(e.target.value),
						className: "w-full rounded-2xl bg-surface-container-low border border-outline-variant/40 px-4 py-3 focus:outline-none focus:border-primary"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-xs uppercase tracking-wider text-on-surface-variant mb-1",
						children: "Data de nascimento (Kin natal)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "date",
						value: birthDate,
						disabled: loading,
						max: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
						onChange: (e) => setBirthDate(e.target.value),
						className: "w-full rounded-2xl bg-surface-container-low border border-outline-variant/40 px-4 py-3 focus:outline-none focus:border-primary"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-xs uppercase tracking-wider text-on-surface-variant mb-2",
						children: "Bússola filosófica (guia o KAI)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [
							{
								k: "maia",
								label: "Sabedoria Maia"
							},
							{
								k: "estoicismo",
								label: "Estoicismo"
							},
							{
								k: "zen",
								label: "Zen Budismo"
							},
							{
								k: "hermetismo",
								label: "Hermetismo"
							}
						].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setPhilosophy(p.k),
							className: `px-3 py-2 rounded-2xl text-sm border ${philosophy === p.k ? "bg-primary text-on-primary border-primary" : "border-outline-variant/40 text-on-surface-variant"}`,
							children: p.label
						}, p.k))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: saving || loading,
						className: "w-full rounded-full bg-primary text-on-primary py-3 font-title-md hover:opacity-90 disabled:opacity-50",
						children: saving ? "Salvando…" : "Salvar alterações"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin",
					className: "w-full glass-card rounded-2xl p-4 flex items-center gap-4 text-left hover:bg-surface-container-high transition-colors",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined text-primary",
							children: "shield_person"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-title-md text-title-md flex-1",
							children: "Área administrativa"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined text-on-surface-variant",
							children: "chevron_right"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleSignOut,
					className: "w-full glass-card rounded-2xl p-4 flex items-center gap-4 text-left hover:bg-surface-container-high transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "material-symbols-outlined text-error",
						children: "logout"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-title-md text-title-md flex-1",
						children: "Sair"
					})]
				})]
			})
		]
	});
}
function CubicPatternCard({ natalKin }) {
	const pattern = personalCubicPattern(natalKin);
	const colorTone = {
		vermelho: "text-error",
		branco: "text-on-surface",
		azul: "text-primary",
		amarelo: "text-tertiary"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "glass-card rounded-3xl p-5 mb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 mb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "material-symbols-outlined text-primary",
					children: "deployed_code"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-title-lg text-title-lg",
					children: "Seu Pátron Cúbico"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-body-sm text-on-surface-variant/80 mb-4",
				children: [
					"Os 16 Kins que compõem o seu Cubo de Destino a partir do Kin natal ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: natalKin }),
					" — um por cada dia central da Lua (9 → 24). Meditação Telektonon do Cubo da Lei."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-2",
				children: pattern.map(({ day, kin }) => {
					const info = getKinInfo(kin);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/ciclos/kin/$kin",
						params: { kin: String(kin) },
						className: "glass-panel rounded-xl p-2 flex flex-col items-center gap-1 border border-transparent hover:border-primary transition-colors",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KinBadge, {
								kin,
								size: 40
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `font-title-sm text-xs ${colorTone[day.color]}`,
								children: [
									day.index,
									". ",
									day.codon
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-label-sm text-[10px] text-on-surface-variant/70",
								children: [
									"Kin ",
									kin,
									" · L·",
									day.moonDay
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-label-sm text-[10px] text-on-surface-variant/60 line-clamp-1",
								children: info.seal.name
							})
						]
					}, day.index);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-label-sm text-label-sm text-on-surface-variant/60 mt-3 italic text-center",
				children: "Fórmula: natal + (n−1)·17 mod 260 · saltos helicoidais do Tzolkin"
			})
		]
	});
}
//#endregion
export { PerfilPage as component };
