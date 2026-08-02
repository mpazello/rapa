import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { listEntries, addEntry, deleteEntry, updateEntry } from "@/lib/journal.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/jornada")({
  head: () => ({
    meta: [
      { title: "Jornada — RAPPAA" },
      { name: "description", content: "Sua linha da vida: marcos, reflexões diárias e ciclos de energia." },
      { property: "og:title", content: "Jornada — RAPPAA" },
    ],
    links: [{ rel: "canonical", href: "/jornada" }],
  }),
  component: JornadaPage,
});

const KIND_META = {
  marco:     { icon: "star",              label: "Marco",     borderClass: "border-l-ritual-gold",    chipClass: "bg-ritual-gold/10 text-ritual-gold border-ritual-gold/25",       iconClass: "text-ritual-gold"    },
  reflexao:  { icon: "psychology_alt",    label: "Reflexão",  borderClass: "border-l-astral-violet",  chipClass: "bg-astral-violet/10 text-astral-violet border-astral-violet/25",  iconClass: "text-astral-violet"  },
  humor:     { icon: "mood",              label: "Humor",     borderClass: "border-l-cosmic-blue",    chipClass: "bg-cosmic-blue/10 text-cosmic-blue border-cosmic-blue/25",       iconClass: "text-cosmic-blue"    },
  meditacao: { icon: "self_improvement",  label: "Meditação", borderClass: "border-l-[#6FBEDA]",     chipClass: "bg-[#6FBEDA]/10 text-[#6FBEDA] border-[#6FBEDA]/25",             iconClass: "text-[#6FBEDA]"      },
  conflito:  { icon: "bolt",              label: "Conflito",  borderClass: "border-l-[#F87171]",     chipClass: "bg-[#F87171]/10 text-[#F87171] border-[#F87171]/25",             iconClass: "text-[#F87171]"      },
} as const;
type KindKey = keyof typeof KIND_META;

function relativeDateLabel(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  const today = new Date();
  const diff = Math.floor((today.setHours(0,0,0,0) - d.setHours(0,0,0,0)) / 86400000);
  if (diff === 0) return "Hoje";
  if (diff === 1) return "Ontem";
  if (diff < 7) return d.toLocaleDateString("pt-BR", { weekday: "long" });
  return d.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: diff > 365 ? "numeric" : undefined });
}

function groupByDate(entries: { entry_date: string; [k: string]: unknown }[]) {
  const map = new Map<string, typeof entries>();
  for (const e of entries) {
    const key = e.entry_date.slice(0, 10);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(e);
  }
  return map;
}

function computeStreak(entries: { entry_date: string }[]): number {
  if (!entries.length) return 0;
  const days = [...new Set(entries.map((e) => e.entry_date.slice(0, 10)))].sort().reverse();
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  let streak = 0;
  let cursor = today;
  for (const day of days) {
    if (day === cursor) {
      streak++;
      const prev = new Date(cursor);
      prev.setDate(prev.getDate() - 1);
      cursor = prev.toISOString().slice(0, 10);
    } else {
      break;
    }
  }
  return streak;
}

// ─── Empty state (logged out) ────────────────────────────────────────────────

function GuestState() {
  return (
    <main className="pt-24 pb-32 px-5 max-w-[520px] mx-auto min-h-screen flex flex-col items-center justify-center text-center gap-6">
      <div className="relative">
        <div className="w-24 h-24 rounded-full glass-panel flex items-center justify-center mx-auto shadow-[0_0_48px_rgba(188,155,255,0.15)]">
          <span className="material-symbols-outlined text-5xl text-astral-violet" style={{ fontVariationSettings: "'FILL' 1" }}>auto_stories</span>
        </div>
        <div className="absolute -right-1 -bottom-1 w-8 h-8 rounded-full bg-ritual-gold/20 border border-ritual-gold/40 flex items-center justify-center">
          <span className="material-symbols-outlined text-base text-ritual-gold" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="font-serif text-3xl text-ethereal-white">Sua jornada aguarda</h2>
        <p className="text-on-surface-variant leading-relaxed max-w-xs mx-auto">
          Registre marcos, reflexões e estados de energia. Cada entrada tece sua história cósmica.
        </p>
      </div>
      <Link to="/auth" className="btn-primary">Começar a jornada</Link>
    </main>
  );
}

// ─── Voice-to-text hook ───────────────────────────────────────────────────────
function useVoiceInput(onTranscript: (text: string) => void) {
  const [listening, setListening] = useState(false);
  const recRef = useRef<InstanceType<typeof window.SpeechRecognition> | null>(null);

  const toggle = useCallback(() => {
    const SpeechRecognition =
      (window as typeof window & { SpeechRecognition?: typeof window.SpeechRecognition; webkitSpeechRecognition?: typeof window.SpeechRecognition })
        .SpeechRecognition ??
      (window as typeof window & { webkitSpeechRecognition?: typeof window.SpeechRecognition }).webkitSpeechRecognition;

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

    rec.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = Array.from(e.results)
        .slice(e.resultIndex)
        .map((r) => r[0].transcript)
        .join(" ")
        .trim();
      if (transcript) onTranscript(transcript);
    };

    rec.onerror = (e: SpeechRecognitionErrorEvent) => {
      if (e.error !== "aborted") toast.error("Erro no microfone: " + e.error);
      setListening(false);
    };

    rec.onend = () => setListening(false);

    recRef.current = rec;
    rec.start();
    setListening(true);
  }, [listening, onTranscript]);

  return { listening, toggle };
}

function todayISO() {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
}

// ─── Custom Date Picker ───────────────────────────────────────────────────────
const WEEKDAYS = ["D", "S", "T", "Q", "Q", "S", "S"];
const MONTHS_PT = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

function DatePickerPopup({ value, maxIso, onSelect, onClose }: {
  value: string;
  maxIso: string;
  onSelect: (iso: string) => void;
  onClose: () => void;
}) {
  const init = new Date(value + "T00:00:00");
  const [year, setYear] = useState(init.getFullYear());
  const [month, setMonth] = useState(init.getMonth());
  const panelRef = useRef<HTMLDivElement>(null);

  // Fecha ao clicar/tocar fora do painel — usa pointerdown (funciona em mouse e touch)
  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    // pequeno delay para não fechar imediatamente ao abrir
    const t = setTimeout(() => document.addEventListener("pointerdown", onPointerDown), 50);
    return () => {
      clearTimeout(t);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [onClose]);

  const maxDate = new Date(maxIso + "T00:00:00");

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    const nm = month === 11 ? 0 : month + 1;
    const ny = month === 11 ? year + 1 : year;
    if (new Date(ny, nm, 1) <= maxDate) {
      setMonth(nm);
      if (month === 11) setYear(y => y + 1);
    }
  }

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const canGoNext = (() => {
    const nm = month === 11 ? 0 : month + 1;
    const ny = month === 11 ? year + 1 : year;
    return new Date(ny, nm, 1) <= maxDate;
  })();

  const calendarPanel = (
    <div
      ref={panelRef}
      className="bg-[#1a1625] border border-white/15 rounded-2xl shadow-2xl p-4 w-full max-w-[320px]"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onPointerDown={(e) => { e.stopPropagation(); prevMonth(); }}
          className="w-11 h-11 flex items-center justify-center rounded-full active:bg-white/20 text-on-surface-variant"
          aria-label="Mês anterior"
        >
          <span className="material-symbols-outlined text-[22px]">chevron_left</span>
        </button>
        <span className="text-sm font-semibold text-ethereal-white">
          {MONTHS_PT[month]} {year}
        </span>
        <button
          onPointerDown={(e) => { e.stopPropagation(); nextMonth(); }}
          disabled={!canGoNext}
          className="w-11 h-11 flex items-center justify-center rounded-full active:bg-white/20 text-on-surface-variant disabled:opacity-30"
          aria-label="Próximo mês"
        >
          <span className="material-symbols-outlined text-[22px]">chevron_right</span>
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((d, i) => (
          <div key={i} className="text-center text-[11px] font-medium text-muted-stardust py-1">{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isSelected = iso === value;
          const isToday = iso === todayISO();
          const disabled = new Date(iso + "T00:00:00") > maxDate;
          return (
            <button
              key={i}
              disabled={disabled}
              onPointerDown={(e) => {
                e.stopPropagation();
                if (!disabled) { onSelect(iso); onClose(); }
              }}
              className={`h-10 w-full rounded-xl text-sm font-medium transition-colors
                ${disabled ? "text-white/20 cursor-not-allowed" : "active:bg-astral-violet/40 cursor-pointer"}
                ${isSelected ? "bg-astral-violet text-white" : isToday ? "text-astral-violet font-bold" : "text-on-surface-variant"}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );

  // Renderiza via portal no body — sem conflito de z-index ou overflow
  return createPortal(
    <>
      {/* Fundo escuro — mobile full screen bottom sheet */}
      <div className="sm:hidden fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex flex-col justify-end">
        <div className="px-4 pb-10 pt-3">
          {/* drag handle */}
          <div className="w-10 h-1 rounded-full bg-white/25 mx-auto mb-5" />
          {calendarPanel}
        </div>
      </div>

      {/* Desktop: dropdown flutuante — posicionado pelo pai via portal não funciona,
          então usamos fixed com posição calculada ou simplesmente centralizamos */}
      <div className="hidden sm:flex fixed inset-0 z-[200] items-start justify-center pt-32 bg-black/30 backdrop-blur-sm">
        {calendarPanel}
      </div>
    </>,
    document.body
  );
}

function formatDateLabel(iso: string): string {
  const t = todayISO();
  if (iso === t) return "Hoje";
  const y = new Date(t + "T00:00:00");
  const d = new Date(iso + "T00:00:00");
  const diff = Math.round((y.getTime() - d.getTime()) / 86400000);
  if (diff === 1) return "Ontem";
  return d.toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: diff > 300 ? "numeric" : undefined });
}

// ─── Entry Composer ───────────────────────────────────────────────────────────

function EntryComposer({ onSave }: { onSave: (data: { kind: KindKey; title: string; content: string; photoFile: File | null; entryDate: string }) => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [kind, setKind] = useState<KindKey>("reflexao");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [entryDate, setEntryDate] = useState(todayISO);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { listening, toggle: toggleVoice } = useVoiceInput(
    useCallback((transcript: string) => {
      setContent((prev) => (prev ? prev + " " + transcript : transcript));
    }, [])
  );

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
      await onSave({ kind, title, content, photoFile, entryDate });
      handleCancel();
    } catch {
      // error toasted upstream
    } finally {
      setBusy(false);
    }
  }

  const isToday = entryDate === todayISO();

  // ── Collapsed: botão de registro ──────────────────────────────────────
  if (!open) {
    return (
      <div>
        <button
          onClick={handleOpen}
          className="w-full glass-panel rounded-2xl px-5 py-4 flex items-center gap-3 text-left border border-white/8 hover:border-astral-violet/30 active:border-astral-violet/40 transition-all group"
        >
          <span className="w-9 h-9 rounded-full bg-astral-violet/15 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px] text-astral-violet" style={{ fontVariationSettings: "'FILL' 1" }}>edit_note</span>
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">O que aconteceu hoje?</p>
            <p className="text-xs text-muted-stardust/60 mt-0.5">{formatDateLabel(todayISO())} · toque para registrar</p>
          </div>
          <button
            type="button"
            onPointerDown={(e) => {
              e.stopPropagation();
              setShowDatePicker(p => !p);
            }}
            className="w-10 h-10 flex items-center justify-center rounded-full text-muted-stardust hover:text-astral-violet hover:bg-astral-violet/10 active:bg-astral-violet/20 transition-all shrink-0"
            title="Registrar em outro dia"
            aria-label="Escolher data"
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
          </button>
        </button>

        {showDatePicker && (
          <DatePickerPopup
            value={entryDate}
            maxIso={todayISO()}
            onSelect={(iso) => {
              setEntryDate(iso);
              setShowDatePicker(false);
              setOpen(true);
              setTimeout(() => textareaRef.current?.focus(), 80);
            }}
            onClose={() => setShowDatePicker(false)}
          />
        )}
      </div>
    );
  }

  // ── Expanded: formulário completo ────────────────────────────────────
  return (
    <div className="glass-panel rounded-2xl p-4 space-y-4 border border-white/15">

      {/* Cabeçalho: data + fechar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onPointerDown={(e) => { e.preventDefault(); setShowDatePicker(p => !p); }}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
            isToday
              ? "border-astral-violet/40 text-astral-violet bg-astral-violet/10 active:bg-astral-violet/20"
              : "border-ritual-gold/40 text-ritual-gold bg-ritual-gold/10 active:bg-ritual-gold/20"
          }`}
        >
          <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            {isToday ? "today" : "event"}
          </span>
          {formatDateLabel(entryDate)}
          <span className="material-symbols-outlined text-[14px] opacity-60">expand_more</span>
        </button>

        <button
          type="button"
          onClick={handleCancel}
          className="w-9 h-9 flex items-center justify-center rounded-full text-muted-stardust hover:text-on-surface hover:bg-white/8 active:bg-white/12 transition-all"
          aria-label="Cancelar"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {showDatePicker && (
        <DatePickerPopup
          value={entryDate}
          maxIso={todayISO()}
          onSelect={(iso) => { setEntryDate(iso); setShowDatePicker(false); }}
          onClose={() => setShowDatePicker(false)}
        />
      )}

      {/* Tipo de entrada */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1 pb-0.5">
        {(Object.keys(KIND_META) as KindKey[]).map((k) => {
          const m = KIND_META[k];
          const active = kind === k;
          return (
            <button
              key={k}
              onClick={() => setKind(k)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border transition-all ${active ? m.chipClass : "border-white/10 text-on-surface-variant active:border-white/25"}`}
            >
              <span className={`material-symbols-outlined text-[14px] ${active ? m.iconClass : ""}`} style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}>{m.icon}</span>
              {m.label}
            </button>
          );
        })}
      </div>

      {/* Título */}
      <input
        type="text"
        placeholder="Título (opcional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-muted-stardust/40 focus:outline-none focus:border-astral-violet/50 transition-colors"
      />

      {/* Conteúdo + microfone */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          placeholder="Descreva este momento…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 pr-12 text-sm text-on-surface placeholder:text-muted-stardust/40 focus:outline-none focus:border-astral-violet/50 transition-colors resize-none"
        />
        <button
          type="button"
          onClick={toggleVoice}
          aria-label={listening ? "Parar gravação" : "Gravar voz"}
          className={`absolute right-2 bottom-2 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            listening
              ? "bg-error/20 text-error border border-error/40 animate-pulse"
              : "bg-white/5 text-muted-stardust hover:bg-astral-violet/15 hover:text-astral-violet border border-white/10"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: listening ? "'FILL' 1" : "'FILL' 0" }}>
            {listening ? "mic" : "mic_none"}
          </span>
        </button>
      </div>

      {listening && (
        <p className="text-[11px] text-error/80 flex items-center gap-1.5 -mt-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-error animate-pulse" />
          Gravando… fale agora. Toque no microfone para parar.
        </p>
      )}

      {/* Foto */}
      {photoPreview ? (
        <div className="relative rounded-xl overflow-hidden border border-white/10">
          <img src={photoPreview} alt="Prévia" className="w-full max-h-48 object-cover" />
          <button
            type="button"
            onClick={() => { setPhotoFile(null); setPhotoPreview(null); }}
            className="absolute top-2 right-2 bg-obsidian-deep/80 backdrop-blur rounded-full w-9 h-9 flex items-center justify-center text-on-surface"
            aria-label="Remover foto"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      ) : (
        <label className="flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed border-white/10 text-muted-stardust hover:border-white/20 cursor-pointer text-xs transition-colors">
          <span className="material-symbols-outlined text-[16px]">add_a_photo</span>
          Adicionar foto (opcional)
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              if (f.size > 8 * 1024 * 1024) { toast.error("Máximo 8MB."); return; }
              setPhotoFile(f);
              setPhotoPreview(URL.createObjectURL(f));
            }}
          />
        </label>
      )}

      {/* Ações */}
      <button
        onClick={handleSave}
        disabled={!content.trim() || busy}
        className="w-full btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {busy ? "Salvando…" : "Registrar momento"}
      </button>
    </div>
  );
}

// ─── Entry Card ───────────────────────────────────────────────────────────────

type EntryData = { id: string; kind: string; title?: string | null; content: string; entry_date: string; photo_url?: string | null };

function EntryCard({ entry, onDelete, onEdit, deleting, saving }: {
  entry: EntryData;
  onDelete: (id: string) => void;
  onEdit: (id: string, fields: { kind: KindKey; title: string; content: string }) => Promise<void>;
  deleting: boolean;
  saving: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editKind, setEditKind] = useState<KindKey>((entry.kind as KindKey) ?? "reflexao");
  const [editTitle, setEditTitle] = useState(entry.title ?? "");
  const [editContent, setEditContent] = useState(entry.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const meta = KIND_META[entry.kind as KindKey] ?? KIND_META.reflexao;
  const time = new Date(entry.entry_date + "T00:00:00").toLocaleDateString("pt-BR", { day: "numeric", month: "short" });

  function startEdit() {
    setEditKind((entry.kind as KindKey) ?? "reflexao");
    setEditTitle(entry.title ?? "");
    setEditContent(entry.content);
    setConfirmDelete(false);
    setMenuOpen(false);
    setEditing(true);
    setTimeout(() => textareaRef.current?.focus(), 60);
  }

  function cancelEdit() {
    setEditing(false);
  }

  async function saveEdit() {
    if (!editContent.trim()) return;
    await onEdit(entry.id, { kind: editKind, title: editTitle, content: editContent });
    setEditing(false);
  }

  /* ── Modo edição ── */
  if (editing) {
    const em = KIND_META[editKind];
    return (
      <article className={`glass-panel rounded-2xl p-4 border-l-4 ${em.borderClass} space-y-3`}>
        {/* Seletor de tipo */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1 pb-0.5">
          {(Object.keys(KIND_META) as KindKey[]).map((k) => {
            const m = KIND_META[k];
            const active = editKind === k;
            return (
              <button
                key={k}
                type="button"
                onClick={() => setEditKind(k)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border transition-all ${active ? m.chipClass : "border-white/10 text-on-surface-variant"}`}
              >
                <span className={`material-symbols-outlined text-[13px] ${active ? m.iconClass : ""}`} style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}>{m.icon}</span>
                {m.label}
              </button>
            );
          })}
        </div>

        <input
          type="text"
          placeholder="Título (opcional)"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-muted-stardust/40 focus:outline-none focus:border-astral-violet/50 transition-colors"
        />

        <textarea
          ref={textareaRef}
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          rows={4}
          className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-muted-stardust/40 focus:outline-none focus:border-astral-violet/50 transition-colors resize-none"
        />

        <div className="flex gap-2">
          <button type="button" onClick={cancelEdit} className="btn-ghost flex-1 text-sm">Cancelar</button>
          <button
            type="button"
            onClick={saveEdit}
            disabled={!editContent.trim() || saving}
            className="btn-primary flex-[2] text-sm"
          >
            {saving ? "Salvando…" : "Salvar"}
          </button>
        </div>
      </article>
    );
  }

  /* ── Modo visualização ── */
  return (
    <article className={`glass-panel rounded-2xl p-4 border-l-4 ${meta.borderClass}`}>
      {/* Cabeçalho */}
      <div className="flex items-start gap-2 mb-3">
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${meta.chipClass} shrink-0`}>
          <span className={`material-symbols-outlined text-[12px] ${meta.iconClass}`} style={{ fontVariationSettings: "'FILL' 1" }}>{meta.icon}</span>
          {meta.label}
        </span>
        <span className="text-xs text-muted-stardust ml-auto shrink-0 mt-0.5">{time}</span>

        {/* Menu ações — sempre visível no mobile */}
        {!confirmDelete ? (
          <div className="relative shrink-0">
            <button
              onClick={() => setMenuOpen(p => !p)}
              className="w-8 h-8 flex items-center justify-center rounded-full text-muted-stardust hover:text-on-surface hover:bg-white/8 active:bg-white/12 transition-all"
              aria-label="Opções"
            >
              <span className="material-symbols-outlined text-[18px]">more_vert</span>
            </button>

            {menuOpen && (
              <>
                {/* Backdrop do menu */}
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-9 z-20 bg-[#1e2533] border border-white/10 rounded-xl shadow-2xl overflow-hidden min-w-[130px]">
                  <button
                    onClick={startEdit}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-on-surface hover:bg-white/5 active:bg-white/8 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px] text-astral-violet">edit</span>
                    Editar
                  </button>
                  <div className="h-px bg-white/5" />
                  <button
                    onClick={() => { setMenuOpen(false); setConfirmDelete(true); }}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-error hover:bg-error/5 active:bg-error/10 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                    Remover
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setConfirmDelete(false)}
              className="text-xs text-muted-stardust hover:text-on-surface px-2 py-1.5 rounded-full hover:bg-white/5 transition-colors"
            >
              cancelar
            </button>
            <button
              onClick={() => { onDelete(entry.id); setConfirmDelete(false); }}
              disabled={deleting}
              className="text-xs text-error border border-error/30 px-2 py-1.5 rounded-full hover:bg-error/10 transition-colors disabled:opacity-50"
            >
              remover
            </button>
          </div>
        )}
      </div>

      {/* Conteúdo */}
      {entry.title && <h3 className="font-serif text-lg text-ethereal-white mb-1 leading-snug">{entry.title}</h3>}
      <p className="text-sm text-on-surface-variant leading-relaxed whitespace-pre-wrap">{entry.content}</p>

      {entry.photo_url && (
        <img
          src={entry.photo_url}
          alt={entry.title ?? "Foto do registro"}
          loading="lazy"
          className="mt-3 w-full max-h-64 object-cover rounded-xl border border-white/8"
        />
      )}
    </article>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

function JornadaPage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const fnList = useServerFn(listEntries);
  const fnAdd = useServerFn(addEntry);
  const fnDelete = useServerFn(deleteEntry);
  const fnUpdate = useServerFn(updateEntry);

  const [filter, setFilter] = useState<"todos" | KindKey>("todos");
  const [search, setSearch] = useState("");

  const entriesQuery = useQuery({
    queryKey: ["entries", "all"],
    queryFn: () => fnList({ data: { limit: 200 } }),
    enabled: !!user,
  });

  const addMut = useMutation({
    mutationFn: async ({ kind, title, content, photoFile, entryDate }: { kind: KindKey; title: string; content: string; photoFile: File | null; entryDate: string }) => {
      let photo_path: string | undefined;
      if (photoFile && user) {
        const ext = photoFile.name.split(".").pop()?.toLowerCase() || "jpg";
        const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("journal-photos")
          .upload(path, photoFile, { contentType: photoFile.type, upsert: false });
        if (upErr) throw new Error(upErr.message);
        photo_path = path;
      }
      return fnAdd({ data: { kind, title: title || undefined, content: content.trim(), entry_date: entryDate, photo_path } });
    },
    onSuccess: () => {
      toast.success("Momento adicionado à sua jornada.");
      qc.invalidateQueries({ queryKey: ["entries"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const delMut = useMutation({
    mutationFn: (id: string) => fnDelete({ data: { id } }),
    onSuccess: () => {
      toast.success("Registro removido.");
      qc.invalidateQueries({ queryKey: ["entries"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const editMut = useMutation({
    mutationFn: ({ id, kind, title, content }: { id: string; kind: KindKey; title: string; content: string }) =>
      fnUpdate({ data: { id, kind, title: title || undefined, content: content.trim() } }),
    onSuccess: () => {
      toast.success("Registro atualizado.");
      qc.invalidateQueries({ queryKey: ["entries"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (!user) return <GuestState />;

  const allEntries = entriesQuery.data?.entries ?? [];
  const streak = computeStreak(allEntries);
  const uniqueDays = allEntries.length ? new Set(allEntries.map((e) => e.entry_date.slice(0, 10))).size : 0;

  const filtered = allEntries
    .filter((e) => filter === "todos" || e.kind === filter)
    .filter((e) => !search || (e.title ?? "").toLowerCase().includes(search.toLowerCase()) || e.content.toLowerCase().includes(search.toLowerCase()));

  const grouped = groupByDate(filtered);

  return (
    <main className="pt-20 pb-32 px-4 sm:px-5 max-w-[680px] mx-auto min-h-screen">

      {/* ── Cabeçalho ── */}
      <section className="mb-6">
        <h1 className="font-serif text-2xl sm:text-3xl text-ethereal-white">Minha Jornada</h1>
        <p className="text-sm text-on-surface-variant mt-1">Marcos, reflexões e ciclos de energia.</p>
      </section>

      {/* ── Stats ── */}
      <section className="mb-6 grid grid-cols-3 gap-2">
        <div className="glass-panel rounded-2xl px-3 py-3 flex flex-col items-center gap-1 text-center">
          <span className="material-symbols-outlined text-[20px] text-ritual-gold" style={{ fontVariationSettings: "'FILL' 1" }}>auto_stories</span>
          <p className="text-xl font-semibold text-ethereal-white leading-none">{allEntries.length}</p>
          <p className="text-[10px] text-muted-stardust">registros</p>
        </div>
        <div className="glass-panel rounded-2xl px-3 py-3 flex flex-col items-center gap-1 text-center">
          <span className="material-symbols-outlined text-[20px] text-astral-violet" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
          <p className="text-xl font-semibold text-ethereal-white leading-none">{streak}</p>
          <p className="text-[10px] text-muted-stardust">sequência</p>
        </div>
        <div className="glass-panel rounded-2xl px-3 py-3 flex flex-col items-center gap-1 text-center">
          <span className="material-symbols-outlined text-[20px] text-cosmic-blue" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
          <p className="text-xl font-semibold text-ethereal-white leading-none">{uniqueDays}</p>
          <p className="text-[10px] text-muted-stardust">dias únicos</p>
        </div>
      </section>

      {/* ── Composer ── */}
      <section className="mb-5">
        <EntryComposer onSave={(data) => addMut.mutateAsync(data).then(() => {})} />
      </section>

      {/* ── Filtros ── */}
      <section className="mb-5 space-y-3">
        {/* Busca */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[18px] text-muted-stardust pointer-events-none">search</span>
          <input
            type="search"
            placeholder="Buscar na jornada…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full glass-panel rounded-full pl-11 pr-5 py-3 text-sm text-on-surface placeholder:text-muted-stardust/50 focus:outline-none focus:border-astral-violet/40 transition-colors"
          />
        </div>

        {/* Filtro por tipo */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 sm:mx-0 px-4 sm:px-0 pb-1">
          {(["todos", ...(Object.keys(KIND_META) as KindKey[])] as const).map((k) => {
            const active = filter === k;
            const meta = k !== "todos" ? KIND_META[k as KindKey] : null;
            return (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border transition-all ${
                  active
                    ? (meta ? meta.chipClass : "bg-white/10 text-ethereal-white border-white/20")
                    : "border-white/10 text-muted-stardust active:border-white/25 active:text-on-surface"
                }`}
              >
                {meta && (
                  <span className={`material-symbols-outlined text-[13px] ${active ? meta.iconClass : ""}`} style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}>
                    {meta.icon}
                  </span>
                )}
                {k === "todos" ? "Todos" : meta!.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Timeline ── */}
      {entriesQuery.isLoading ? (
        <div className="space-y-3">
          {[1,2,3].map((i) => (
            <div key={i} className="glass-panel rounded-2xl h-24 animate-pulse border-l-4 border-l-white/5" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
          <div className="w-14 h-14 rounded-full glass-panel flex items-center justify-center opacity-40">
            <span className="material-symbols-outlined text-2xl text-on-surface-variant">timeline</span>
          </div>
          <p className="text-on-surface-variant text-sm">
            {search ? "Nenhum registro encontrado." : "Nenhum registro ainda. Comece agora ↑"}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {[...grouped.entries()].map(([dateKey, dayEntries]) => (
            <div key={dateKey}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-medium text-muted-stardust uppercase tracking-widest">
                  {relativeDateLabel(dateKey)}
                </span>
                <div className="flex-1 h-px bg-white/5" />
              </div>
              <div className="space-y-3">
                {dayEntries.map((e) => (
                  <EntryCard
                    key={String(e.id)}
                    entry={e as EntryData}
                    onDelete={(id) => delMut.mutate(id)}
                    onEdit={(id, fields) => editMut.mutateAsync({ id, ...fields }).then(() => {})}
                    deleting={delMut.isPending}
                    saving={editMut.isPending}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
