import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react_dom } from "../_libs/@radix-ui/react-primitive+[...].mjs";
import { n as useServerFn } from "./createSsrRpc-DvRDvdGH.mjs";
import { t as supabase } from "./client-CynC6nuD.mjs";
import { n as useAuth } from "./use-auth-C250R4UH.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { i as listEntries, n as deleteEntry, o as updateEntry, t as addEntry } from "./journal.functions-Ulo0ZGWw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/jornada-BmggGeJj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var KIND_META = {
	marco: {
		icon: "star",
		label: "Marco",
		borderClass: "border-l-ritual-gold",
		chipClass: "bg-ritual-gold/10 text-ritual-gold border-ritual-gold/25",
		iconClass: "text-ritual-gold"
	},
	reflexao: {
		icon: "psychology_alt",
		label: "Reflexão",
		borderClass: "border-l-astral-violet",
		chipClass: "bg-astral-violet/10 text-astral-violet border-astral-violet/25",
		iconClass: "text-astral-violet"
	},
	humor: {
		icon: "mood",
		label: "Humor",
		borderClass: "border-l-cosmic-blue",
		chipClass: "bg-cosmic-blue/10 text-cosmic-blue border-cosmic-blue/25",
		iconClass: "text-cosmic-blue"
	},
	meditacao: {
		icon: "self_improvement",
		label: "Meditação",
		borderClass: "border-l-[#6FBEDA]",
		chipClass: "bg-[#6FBEDA]/10 text-[#6FBEDA] border-[#6FBEDA]/25",
		iconClass: "text-[#6FBEDA]"
	},
	conflito: {
		icon: "bolt",
		label: "Conflito",
		borderClass: "border-l-[#F87171]",
		chipClass: "bg-[#F87171]/10 text-[#F87171] border-[#F87171]/25",
		iconClass: "text-[#F87171]"
	}
};
function relativeDateLabel(dateStr) {
	const d = /* @__PURE__ */ new Date(dateStr + "T00:00:00");
	const diff = Math.floor(((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0) - d.setHours(0, 0, 0, 0)) / 864e5);
	if (diff === 0) return "Hoje";
	if (diff === 1) return "Ontem";
	if (diff < 7) return d.toLocaleDateString("pt-BR", { weekday: "long" });
	return d.toLocaleDateString("pt-BR", {
		day: "numeric",
		month: "long",
		year: diff > 365 ? "numeric" : void 0
	});
}
function groupByDate(entries) {
	const map = /* @__PURE__ */ new Map();
	for (const e of entries) {
		const key = e.entry_date.slice(0, 10);
		if (!map.has(key)) map.set(key, []);
		map.get(key).push(e);
	}
	return map;
}
function computeStreak(entries) {
	if (!entries.length) return 0;
	const days = [...new Set(entries.map((e) => e.entry_date.slice(0, 10)))].sort().reverse();
	const now = /* @__PURE__ */ new Date();
	const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
	let streak = 0;
	let cursor = today;
	for (const day of days) if (day === cursor) {
		streak++;
		const prev = new Date(cursor);
		prev.setDate(prev.getDate() - 1);
		cursor = prev.toISOString().slice(0, 10);
	} else break;
	return streak;
}
function GuestState() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pt-24 pb-32 px-5 max-w-[520px] mx-auto min-h-screen flex flex-col items-center justify-center text-center gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-24 h-24 rounded-full glass-panel flex items-center justify-center mx-auto shadow-[0_0_48px_rgba(188,155,255,0.15)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "material-symbols-outlined text-5xl text-astral-violet",
						style: { fontVariationSettings: "'FILL' 1" },
						children: "auto_stories"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute -right-1 -bottom-1 w-8 h-8 rounded-full bg-ritual-gold/20 border border-ritual-gold/40 flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "material-symbols-outlined text-base text-ritual-gold",
						style: { fontVariationSettings: "'FILL' 1" },
						children: "star"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-3xl text-ethereal-white",
					children: "Sua jornada aguarda"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-on-surface-variant leading-relaxed max-w-xs mx-auto",
					children: "Registre marcos, reflexões e estados de energia. Cada entrada tece sua história cósmica."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/auth",
				className: "btn-primary",
				children: "Começar a jornada"
			})
		]
	});
}
function useVoiceInput(onTranscript) {
	const [listening, setListening] = (0, import_react.useState)(false);
	const recRef = (0, import_react.useRef)(null);
	return {
		listening,
		toggle: (0, import_react.useCallback)(() => {
			const SpeechRecognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
			if (!SpeechRecognition) {
				toast.error("Seu navegador não suporta entrada de voz.");
				return;
			}
			if (listening) {
				recRef.current?.stop();
				return;
			}
			const rec = new SpeechRecognition();
			rec.lang = "pt-BR";
			rec.continuous = true;
			rec.interimResults = false;
			rec.onresult = (e) => {
				const transcript = Array.from(e.results).slice(e.resultIndex).map((r) => r[0].transcript).join(" ").trim();
				if (transcript) onTranscript(transcript);
			};
			rec.onerror = (e) => {
				if (e.error !== "aborted") toast.error("Erro no microfone: " + e.error);
				setListening(false);
			};
			rec.onend = () => setListening(false);
			recRef.current = rec;
			rec.start();
			setListening(true);
		}, [listening, onTranscript])
	};
}
function todayISO() {
	const n = /* @__PURE__ */ new Date();
	return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
}
var WEEKDAYS = [
	"D",
	"S",
	"T",
	"Q",
	"Q",
	"S",
	"S"
];
var MONTHS_PT = [
	"Janeiro",
	"Fevereiro",
	"Março",
	"Abril",
	"Maio",
	"Junho",
	"Julho",
	"Agosto",
	"Setembro",
	"Outubro",
	"Novembro",
	"Dezembro"
];
function DatePickerPopup({ value, maxIso, onSelect, onClose }) {
	const init = /* @__PURE__ */ new Date(value + "T00:00:00");
	const [year, setYear] = (0, import_react.useState)(init.getFullYear());
	const [month, setMonth] = (0, import_react.useState)(init.getMonth());
	const panelRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		function onPointerDown(e) {
			if (panelRef.current && !panelRef.current.contains(e.target)) onClose();
		}
		const t = setTimeout(() => document.addEventListener("pointerdown", onPointerDown), 50);
		return () => {
			clearTimeout(t);
			document.removeEventListener("pointerdown", onPointerDown);
		};
	}, [onClose]);
	const maxDate = /* @__PURE__ */ new Date(maxIso + "T00:00:00");
	function prevMonth() {
		if (month === 0) {
			setMonth(11);
			setYear((y) => y - 1);
		} else setMonth((m) => m - 1);
	}
	function nextMonth() {
		const nm = month === 11 ? 0 : month + 1;
		const ny = month === 11 ? year + 1 : year;
		if (new Date(ny, nm, 1) <= maxDate) {
			setMonth(nm);
			if (month === 11) setYear((y) => y + 1);
		}
	}
	const firstDay = new Date(year, month, 1).getDay();
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
	while (cells.length % 7 !== 0) cells.push(null);
	const canGoNext = (() => {
		const nm = month === 11 ? 0 : month + 1;
		const ny = month === 11 ? year + 1 : year;
		return new Date(ny, nm, 1) <= maxDate;
	})();
	const calendarPanel = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: panelRef,
		className: "bg-[#1a1625] border border-white/15 rounded-2xl shadow-2xl p-4 w-full max-w-[320px]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onPointerDown: (e) => {
							e.stopPropagation();
							prevMonth();
						},
						className: "w-11 h-11 flex items-center justify-center rounded-full active:bg-white/20 text-on-surface-variant",
						"aria-label": "Mês anterior",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined text-[22px]",
							children: "chevron_left"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm font-semibold text-ethereal-white",
						children: [
							MONTHS_PT[month],
							" ",
							year
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onPointerDown: (e) => {
							e.stopPropagation();
							nextMonth();
						},
						disabled: !canGoNext,
						className: "w-11 h-11 flex items-center justify-center rounded-full active:bg-white/20 text-on-surface-variant disabled:opacity-30",
						"aria-label": "Próximo mês",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined text-[22px]",
							children: "chevron_right"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-7 mb-1",
				children: WEEKDAYS.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center text-[11px] font-medium text-muted-stardust py-1",
					children: d
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-7 gap-y-1",
				children: cells.map((day, i) => {
					if (!day) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}, i);
					const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
					const isSelected = iso === value;
					const isToday = iso === todayISO();
					const disabled = /* @__PURE__ */ new Date(iso + "T00:00:00") > maxDate;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled,
						onPointerDown: (e) => {
							e.stopPropagation();
							if (!disabled) {
								onSelect(iso);
								onClose();
							}
						},
						className: `h-10 w-full rounded-xl text-sm font-medium transition-colors
                ${disabled ? "text-white/20 cursor-not-allowed" : "active:bg-astral-violet/40 cursor-pointer"}
                ${isSelected ? "bg-astral-violet text-white" : isToday ? "text-astral-violet font-bold" : "text-on-surface-variant"}
              `,
						children: day
					}, i);
				})
			})
		]
	});
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "sm:hidden fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex flex-col justify-end",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 pb-10 pt-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 h-1 rounded-full bg-white/25 mx-auto mb-5" }), calendarPanel]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "hidden sm:flex fixed inset-0 z-[200] items-start justify-center pt-32 bg-black/30 backdrop-blur-sm",
		children: calendarPanel
	})] }), document.body);
}
function formatDateLabel(iso) {
	const t = todayISO();
	if (iso === t) return "Hoje";
	const y = /* @__PURE__ */ new Date(t + "T00:00:00");
	const d = /* @__PURE__ */ new Date(iso + "T00:00:00");
	const diff = Math.round((y.getTime() - d.getTime()) / 864e5);
	if (diff === 1) return "Ontem";
	return d.toLocaleDateString("pt-BR", {
		day: "numeric",
		month: "short",
		year: diff > 300 ? "numeric" : void 0
	});
}
function EntryComposer({ onSave }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [kind, setKind] = (0, import_react.useState)("reflexao");
	const [title, setTitle] = (0, import_react.useState)("");
	const [content, setContent] = (0, import_react.useState)("");
	const [entryDate, setEntryDate] = (0, import_react.useState)(todayISO);
	const [photoFile, setPhotoFile] = (0, import_react.useState)(null);
	const [photoPreview, setPhotoPreview] = (0, import_react.useState)(null);
	const [showDatePicker, setShowDatePicker] = (0, import_react.useState)(false);
	const textareaRef = (0, import_react.useRef)(null);
	const { listening, toggle: toggleVoice } = useVoiceInput((0, import_react.useCallback)((transcript) => {
		setContent((prev) => prev ? prev + " " + transcript : transcript);
	}, []));
	function handleOpen() {
		setOpen(true);
		setTimeout(() => textareaRef.current?.focus(), 60);
	}
	function handleCancel() {
		setOpen(false);
		setKind("reflexao");
		setTitle("");
		setContent("");
		setEntryDate(todayISO());
		setPhotoFile(null);
		setPhotoPreview(null);
		setShowDatePicker(false);
	}
	async function handleSave() {
		if (!content.trim()) return;
		setBusy(true);
		try {
			await onSave({
				kind,
				title,
				content,
				photoFile,
				entryDate
			});
			handleCancel();
		} catch {} finally {
			setBusy(false);
		}
	}
	const isToday = entryDate === todayISO();
	if (!open) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full glass-panel rounded-2xl flex items-center gap-3 border border-white/8 hover:border-astral-violet/30 active:border-astral-violet/40 transition-all group overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: handleOpen,
			className: "flex-1 flex items-center gap-3 text-left px-5 py-4 min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "w-9 h-9 rounded-full bg-astral-violet/15 flex items-center justify-center shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "material-symbols-outlined text-[20px] text-astral-violet",
					style: { fontVariationSettings: "'FILL' 1" },
					children: "edit_note"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-on-surface-variant group-hover:text-on-surface transition-colors",
					children: "O que aconteceu hoje?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-stardust/60 mt-0.5",
					children: [formatDateLabel(todayISO()), " · toque para registrar"]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onPointerDown: (e) => {
				e.stopPropagation();
				setShowDatePicker((p) => !p);
			},
			className: "w-10 h-10 mr-2 flex items-center justify-center rounded-full text-muted-stardust hover:text-astral-violet hover:bg-astral-violet/10 active:bg-astral-violet/20 transition-all shrink-0",
			title: "Registrar em outro dia",
			"aria-label": "Escolher data",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "material-symbols-outlined text-[20px]",
				style: { fontVariationSettings: "'FILL' 1" },
				children: "calendar_month"
			})
		})]
	}), showDatePicker && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePickerPopup, {
		value: entryDate,
		maxIso: todayISO(),
		onSelect: (iso) => {
			setEntryDate(iso);
			setShowDatePicker(false);
			setOpen(true);
			setTimeout(() => textareaRef.current?.focus(), 80);
		},
		onClose: () => setShowDatePicker(false)
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-panel rounded-2xl p-4 space-y-4 border border-white/15",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onPointerDown: (e) => {
						e.preventDefault();
						setShowDatePicker((p) => !p);
					},
					className: `flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${isToday ? "border-astral-violet/40 text-astral-violet bg-astral-violet/10 active:bg-astral-violet/20" : "border-ritual-gold/40 text-ritual-gold bg-ritual-gold/10 active:bg-ritual-gold/20"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined text-[14px]",
							style: { fontVariationSettings: "'FILL' 1" },
							children: isToday ? "today" : "event"
						}),
						formatDateLabel(entryDate),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined text-[14px] opacity-60",
							children: "expand_more"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: handleCancel,
					className: "w-9 h-9 flex items-center justify-center rounded-full text-muted-stardust hover:text-on-surface hover:bg-white/8 active:bg-white/12 transition-all",
					"aria-label": "Cancelar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "material-symbols-outlined text-[20px]",
						children: "close"
					})
				})]
			}),
			showDatePicker && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePickerPopup, {
				value: entryDate,
				maxIso: todayISO(),
				onSelect: (iso) => {
					setEntryDate(iso);
					setShowDatePicker(false);
				},
				onClose: () => setShowDatePicker(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1 pb-0.5",
				children: Object.keys(KIND_META).map((k) => {
					const m = KIND_META[k];
					const active = kind === k;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setKind(k),
						className: `shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border transition-all ${active ? m.chipClass : "border-white/10 text-on-surface-variant active:border-white/25"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `material-symbols-outlined text-[14px] ${active ? m.iconClass : ""}`,
							style: { fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" },
							children: m.icon
						}), m.label]
					}, k);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "text",
				placeholder: "Título (opcional)",
				value: title,
				onChange: (e) => setTitle(e.target.value),
				className: "w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-muted-stardust/40 focus:outline-none focus:border-astral-violet/50 transition-colors"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					ref: textareaRef,
					placeholder: "Descreva este momento…",
					value: content,
					onChange: (e) => setContent(e.target.value),
					rows: 4,
					className: "w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 pr-12 text-sm text-on-surface placeholder:text-muted-stardust/40 focus:outline-none focus:border-astral-violet/50 transition-colors resize-none"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: toggleVoice,
					"aria-label": listening ? "Parar gravação" : "Gravar voz",
					className: `absolute right-2 bottom-2 w-9 h-9 rounded-full flex items-center justify-center transition-all ${listening ? "bg-error/20 text-error border border-error/40 animate-pulse" : "bg-white/5 text-muted-stardust hover:bg-astral-violet/15 hover:text-astral-violet border border-white/10"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "material-symbols-outlined text-[18px]",
						style: { fontVariationSettings: listening ? "'FILL' 1" : "'FILL' 0" },
						children: listening ? "mic" : "mic_none"
					})
				})]
			}),
			listening && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[11px] text-error/80 flex items-center gap-1.5 -mt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-error animate-pulse" }), "Gravando… fale agora. Toque no microfone para parar."]
			}),
			photoPreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative rounded-xl overflow-hidden border border-white/10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: photoPreview,
					alt: "Prévia",
					className: "w-full max-h-48 object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setPhotoFile(null);
						setPhotoPreview(null);
					},
					className: "absolute top-2 right-2 bg-obsidian-deep/80 backdrop-blur rounded-full w-9 h-9 flex items-center justify-center text-on-surface",
					"aria-label": "Remover foto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "material-symbols-outlined text-[16px]",
						children: "close"
					})
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed border-white/10 text-muted-stardust hover:border-white/20 cursor-pointer text-xs transition-colors",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "material-symbols-outlined text-[16px]",
						children: "add_a_photo"
					}),
					"Adicionar foto (opcional)",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						accept: "image/*",
						className: "hidden",
						onChange: (e) => {
							const f = e.target.files?.[0];
							if (!f) return;
							if (f.size > 8388608) {
								toast.error("Máximo 8MB.");
								return;
							}
							setPhotoFile(f);
							setPhotoPreview(URL.createObjectURL(f));
						}
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: handleSave,
				disabled: !content.trim() || busy,
				className: "w-full btn-primary disabled:opacity-40 disabled:cursor-not-allowed",
				children: busy ? "Salvando…" : "Registrar momento"
			})
		]
	});
}
function EntryCard({ entry, onDelete, onEdit, deleting, saving }) {
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [confirmDelete, setConfirmDelete] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [editKind, setEditKind] = (0, import_react.useState)(entry.kind ?? "reflexao");
	const [editTitle, setEditTitle] = (0, import_react.useState)(entry.title ?? "");
	const [editContent, setEditContent] = (0, import_react.useState)(entry.content);
	const [editPhotoFile, setEditPhotoFile] = (0, import_react.useState)(null);
	const [editPhotoPreview, setEditPhotoPreview] = (0, import_react.useState)(null);
	const [removePhoto, setRemovePhoto] = (0, import_react.useState)(false);
	const textareaRef = (0, import_react.useRef)(null);
	const meta = KIND_META[entry.kind] ?? KIND_META.reflexao;
	const time = (/* @__PURE__ */ new Date(entry.entry_date + "T00:00:00")).toLocaleDateString("pt-BR", {
		day: "numeric",
		month: "short"
	});
	function startEdit() {
		setEditKind(entry.kind ?? "reflexao");
		setEditTitle(entry.title ?? "");
		setEditContent(entry.content);
		setEditPhotoFile(null);
		setEditPhotoPreview(null);
		setRemovePhoto(false);
		setConfirmDelete(false);
		setMenuOpen(false);
		setEditing(true);
		setTimeout(() => textareaRef.current?.focus(), 60);
	}
	function cancelEdit() {
		setEditing(false);
		setEditPhotoFile(null);
		setEditPhotoPreview(null);
		setRemovePhoto(false);
	}
	async function saveEdit() {
		if (!editContent.trim()) return;
		await onEdit(entry.id, {
			kind: editKind,
			title: editTitle,
			content: editContent,
			photoFile: editPhotoFile,
			removePhoto
		});
		setEditing(false);
	}
	const currentPhotoInEdit = removePhoto ? null : editPhotoPreview ?? entry.photo_url ?? null;
	if (editing) {
		const em = KIND_META[editKind];
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: `glass-panel rounded-2xl p-4 border-l-4 ${em.borderClass} space-y-3`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1 pb-0.5",
					children: Object.keys(KIND_META).map((k) => {
						const m = KIND_META[k];
						const active = editKind === k;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setEditKind(k),
							className: `shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border transition-all ${active ? m.chipClass : "border-white/10 text-on-surface-variant"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `material-symbols-outlined text-[13px] ${active ? m.iconClass : ""}`,
								style: { fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" },
								children: m.icon
							}), m.label]
						}, k);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					placeholder: "Título (opcional)",
					value: editTitle,
					onChange: (e) => setEditTitle(e.target.value),
					className: "w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-muted-stardust/40 focus:outline-none focus:border-astral-violet/50 transition-colors"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					ref: textareaRef,
					value: editContent,
					onChange: (e) => setEditContent(e.target.value),
					rows: 4,
					className: "w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-muted-stardust/40 focus:outline-none focus:border-astral-violet/50 transition-colors resize-none"
				}),
				currentPhotoInEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative rounded-xl overflow-hidden border border-white/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: currentPhotoInEdit,
						alt: "Foto",
						className: "w-full max-h-48 object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							if (editPhotoFile) {
								setEditPhotoFile(null);
								setEditPhotoPreview(null);
							} else setRemovePhoto(true);
						},
						className: "absolute top-2 right-2 bg-obsidian-deep/80 backdrop-blur rounded-full w-9 h-9 flex items-center justify-center text-on-surface",
						"aria-label": "Remover foto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined text-[16px]",
							children: "close"
						})
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed border-white/10 text-muted-stardust hover:border-white/20 cursor-pointer text-xs transition-colors",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "material-symbols-outlined text-[16px]",
							children: "add_a_photo"
						}),
						removePhoto ? "Adicionar nova foto" : "Adicionar foto (opcional)",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: "image/*",
							className: "hidden",
							onChange: (ev) => {
								const f = ev.target.files?.[0];
								if (!f) return;
								if (f.size > 8388608) {
									toast.error("Máximo 8MB.");
									return;
								}
								setEditPhotoFile(f);
								setEditPhotoPreview(URL.createObjectURL(f));
								setRemovePhoto(false);
							}
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: cancelEdit,
						className: "btn-ghost flex-1 text-sm",
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: saveEdit,
						disabled: !editContent.trim() || saving,
						className: "btn-primary flex-[2] text-sm",
						children: saving ? "Salvando…" : "Salvar"
					})]
				})
			]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: `glass-panel rounded-2xl p-4 border-l-4 ${meta.borderClass}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-2 mb-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${meta.chipClass} shrink-0`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `material-symbols-outlined text-[12px] ${meta.iconClass}`,
							style: { fontVariationSettings: "'FILL' 1" },
							children: meta.icon
						}), meta.label]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-stardust ml-auto shrink-0 mt-0.5",
						children: time
					}),
					!confirmDelete ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setMenuOpen((p) => !p),
							className: "w-8 h-8 flex items-center justify-center rounded-full text-muted-stardust hover:text-on-surface hover:bg-white/8 active:bg-white/12 transition-all",
							"aria-label": "Opções",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "material-symbols-outlined text-[18px]",
								children: "more_vert"
							})
						}), menuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "fixed inset-0 z-10",
							onClick: () => setMenuOpen(false)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute right-0 top-9 z-20 bg-[#1e2533] border border-white/10 rounded-xl shadow-2xl overflow-hidden min-w-[130px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: startEdit,
									className: "w-full flex items-center gap-2.5 px-4 py-3 text-sm text-on-surface hover:bg-white/5 active:bg-white/8 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "material-symbols-outlined text-[16px] text-astral-violet",
										children: "edit"
									}), "Editar"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px bg-white/5" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setMenuOpen(false);
										setConfirmDelete(true);
									},
									className: "w-full flex items-center gap-2.5 px-4 py-3 text-sm text-error hover:bg-error/5 active:bg-error/10 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "material-symbols-outlined text-[16px]",
										children: "delete"
									}), "Remover"]
								})
							]
						})] })]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setConfirmDelete(false),
							className: "text-xs text-muted-stardust hover:text-on-surface px-2 py-1.5 rounded-full hover:bg-white/5 transition-colors",
							children: "cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								onDelete(entry.id);
								setConfirmDelete(false);
							},
							disabled: deleting,
							className: "text-xs text-error border border-error/30 px-2 py-1.5 rounded-full hover:bg-error/10 transition-colors disabled:opacity-50",
							children: "remover"
						})]
					})
				]
			}),
			entry.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-serif text-lg text-ethereal-white mb-1 leading-snug",
				children: entry.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-on-surface-variant leading-relaxed whitespace-pre-wrap",
				children: entry.content
			}),
			entry.photo_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: entry.photo_url,
				alt: entry.title ?? "Foto do registro",
				loading: "lazy",
				className: "mt-3 w-full max-h-64 object-cover rounded-xl border border-white/8"
			})
		]
	});
}
function JornadaPage() {
	const { user } = useAuth();
	const qc = useQueryClient();
	const fnList = useServerFn(listEntries);
	const fnAdd = useServerFn(addEntry);
	const fnDelete = useServerFn(deleteEntry);
	const fnUpdate = useServerFn(updateEntry);
	const [filter, setFilter] = (0, import_react.useState)("todos");
	const [search, setSearch] = (0, import_react.useState)("");
	const entriesQuery = useQuery({
		queryKey: ["entries", "all"],
		queryFn: () => fnList({ data: { limit: 200 } }),
		enabled: !!user
	});
	const addMut = useMutation({
		mutationFn: async ({ kind, title, content, photoFile, entryDate }) => {
			let photo_path;
			if (photoFile && user) {
				const ext = photoFile.name.split(".").pop()?.toLowerCase() || "jpg";
				const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
				const { error: upErr } = await supabase.storage.from("journal-photos").upload(path, photoFile, {
					contentType: photoFile.type,
					upsert: false
				});
				if (upErr) throw new Error(upErr.message);
				photo_path = path;
			}
			return fnAdd({ data: {
				kind,
				title: title || void 0,
				content: content.trim(),
				entry_date: entryDate,
				photo_path
			} });
		},
		onSuccess: () => {
			toast.success("Momento adicionado à sua jornada.");
			qc.invalidateQueries({ queryKey: ["entries"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const delMut = useMutation({
		mutationFn: (id) => fnDelete({ data: { id } }),
		onSuccess: () => {
			toast.success("Registro removido.");
			qc.invalidateQueries({ queryKey: ["entries"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const editMut = useMutation({
		mutationFn: async ({ id, kind, title, content, photoFile, removePhoto }) => {
			let photo_path = void 0;
			if (removePhoto) photo_path = null;
			else if (photoFile && user) {
				const ext = photoFile.name.split(".").pop()?.toLowerCase() || "jpg";
				const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
				const { error: upErr } = await supabase.storage.from("journal-photos").upload(path, photoFile, {
					contentType: photoFile.type,
					upsert: false
				});
				if (upErr) throw new Error(upErr.message);
				photo_path = path;
			}
			return fnUpdate({ data: {
				id,
				kind,
				title: title || void 0,
				content: content.trim(),
				photo_path
			} });
		},
		onSuccess: () => {
			toast.success("Registro atualizado.");
			qc.invalidateQueries({ queryKey: ["entries"] });
		},
		onError: (e) => toast.error(e.message)
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuestState, {});
	const allEntries = entriesQuery.data?.entries ?? [];
	const streak = computeStreak(allEntries);
	const uniqueDays = allEntries.length ? new Set(allEntries.map((e) => e.entry_date.slice(0, 10))).size : 0;
	const filtered = allEntries.filter((e) => filter === "todos" || e.kind === filter).filter((e) => !search || (e.title ?? "").toLowerCase().includes(search.toLowerCase()) || e.content.toLowerCase().includes(search.toLowerCase()));
	const grouped = groupByDate(filtered);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pt-20 pb-32 px-4 sm:px-5 max-w-[680px] mx-auto min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif text-2xl sm:text-3xl text-ethereal-white",
					children: "Minha Jornada"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-on-surface-variant mt-1",
					children: "Marcos, reflexões e ciclos de energia."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-6 grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-panel rounded-2xl px-3 py-3 flex flex-col items-center gap-1 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "material-symbols-outlined text-[20px] text-ritual-gold",
								style: { fontVariationSettings: "'FILL' 1" },
								children: "auto_stories"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xl font-semibold text-ethereal-white leading-none",
								children: allEntries.length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-stardust",
								children: "registros"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-panel rounded-2xl px-3 py-3 flex flex-col items-center gap-1 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "material-symbols-outlined text-[20px] text-astral-violet",
								style: { fontVariationSettings: "'FILL' 1" },
								children: "local_fire_department"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xl font-semibold text-ethereal-white leading-none",
								children: streak
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-stardust",
								children: "sequência"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-panel rounded-2xl px-3 py-3 flex flex-col items-center gap-1 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "material-symbols-outlined text-[20px] text-cosmic-blue",
								style: { fontVariationSettings: "'FILL' 1" },
								children: "calendar_month"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xl font-semibold text-ethereal-white leading-none",
								children: uniqueDays
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-stardust",
								children: "dias únicos"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mb-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntryComposer, { onSave: (data) => addMut.mutateAsync(data).then(() => {}) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-5 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[18px] text-muted-stardust pointer-events-none",
						children: "search"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "search",
						placeholder: "Buscar na jornada…",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						className: "w-full glass-panel rounded-full pl-11 pr-5 py-3 text-sm text-on-surface placeholder:text-muted-stardust/50 focus:outline-none focus:border-astral-violet/40 transition-colors"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 overflow-x-auto no-scrollbar -mx-4 sm:mx-0 px-4 sm:px-0 pb-1",
					children: ["todos", ...Object.keys(KIND_META)].map((k) => {
						const active = filter === k;
						const meta = k !== "todos" ? KIND_META[k] : null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setFilter(k),
							className: `shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border transition-all ${active ? meta ? meta.chipClass : "bg-white/10 text-ethereal-white border-white/20" : "border-white/10 text-muted-stardust active:border-white/25 active:text-on-surface"}`,
							children: [meta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `material-symbols-outlined text-[13px] ${active ? meta.iconClass : ""}`,
								style: { fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" },
								children: meta.icon
							}), k === "todos" ? "Todos" : meta.label]
						}, k);
					})
				})]
			}),
			entriesQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: [
					1,
					2,
					3
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "glass-panel rounded-2xl h-24 animate-pulse border-l-4 border-l-white/5" }, i))
			}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center py-16 text-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-14 h-14 rounded-full glass-panel flex items-center justify-center opacity-40",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "material-symbols-outlined text-2xl text-on-surface-variant",
						children: "timeline"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-on-surface-variant text-sm",
					children: search ? "Nenhum registro encontrado." : "Nenhum registro ainda. Comece agora ↑"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-6",
				children: [...grouped.entries()].map(([dateKey, dayEntries]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium text-muted-stardust uppercase tracking-widest",
						children: relativeDateLabel(dateKey)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 h-px bg-white/5" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: dayEntries.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntryCard, {
						entry: e,
						onDelete: (id) => delMut.mutate(id),
						onEdit: (id, fields) => editMut.mutateAsync({
							id,
							...fields
						}).then(() => {}),
						deleting: delMut.isPending,
						saving: editMut.isPending
					}, String(e.id)))
				})] }, dateKey))
			})
		]
	});
}
//#endregion
export { JornadaPage as component };
