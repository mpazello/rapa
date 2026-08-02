import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { SealColoringModal, SEAL_STORAGE_KEY } from "@/components/rapa/SealColoringModal";
import { getTodayMood, setTodayMood, listEntries, addEntry } from "@/lib/journal.functions";
import { getTodayKinInfo, sincronarioDate, cubeDayOfMoon } from "@/lib/tzolkin";
import { SEAL_IMAGE } from "@/lib/seal-images";
import { KinSeal } from "@/components/KinSeal";

function useDFTDTState() {
  // Always use UTC so SSR and client agree regardless of local timezone.
  const now = new Date();
  const m = now.getUTCMonth(); // 0-based
  const d = now.getUTCDate();
  const isDFTDT = m === 6 && d === 25;
  const isNewCycle = m === 6 && d === 26;
  const y = now.getUTCFullYear();
  let next = new Date(Date.UTC(y, 6, 25));
  if (now > next) next = new Date(Date.UTC(y + 1, 6, 25));
  const daysUntil = Math.ceil((next.getTime() - now.getTime()) / 86400000);
  return { isDFTDT, isNewCycle, daysUntil };
}

export const Route = createFileRoute("/")({
  head: () => {
    const todaySeal = SEAL_IMAGE[getTodayKinInfo().seal.index];
    return {
      meta: [
        { title: "Hoje — RAPPAA" },
        { name: "description", content: "Registre sua energia, veja o ciclo do dia e retome sua jornada." },
        { property: "og:title", content: "Hoje — RAPPAA" },
      ],
      links: [
        { rel: "canonical", href: "/" },
        { rel: "preload", as: "image", href: todaySeal, fetchpriority: "high" },
      ],
    };
  },
  component: HojePage,
});

const moods = [
  {
    key: "calmo",
    icon: "clear_night",
    label: "Calmo",
    activeBg: "bg-cosmic-blue/15",
    activeBorder: "border-cosmic-blue/60",
    activeText: "text-cosmic-blue",
    activeGlow: "shadow-[0_0_20px_rgba(168,199,255,0.25)]",
    dot: "bg-cosmic-blue",
  },
  {
    key: "presente",
    icon: "self_improvement",
    label: "Presente",
    activeBg: "bg-astral-violet/15",
    activeBorder: "border-astral-violet/60",
    activeText: "text-astral-violet",
    activeGlow: "shadow-[0_0_20px_rgba(188,155,255,0.25)]",
    dot: "bg-astral-violet",
  },
  {
    key: "fluido",
    icon: "waves",
    label: "Fluido",
    activeBg: "bg-cosmic-blue/10",
    activeBorder: "border-cosmic-blue/50",
    activeText: "text-cosmic-blue",
    activeGlow: "shadow-[0_0_20px_rgba(168,199,255,0.2)]",
    dot: "bg-cosmic-blue",
  },
  {
    key: "vibrante",
    icon: "bolt",
    label: "Vibrante",
    activeBg: "bg-ritual-gold/12",
    activeBorder: "border-ritual-gold/55",
    activeText: "text-ritual-gold",
    activeGlow: "shadow-[0_0_20px_rgba(255,214,113,0.2)]",
    dot: "bg-ritual-gold",
  },
  {
    key: "reflexivo",
    icon: "cloud",
    label: "Reflexivo",
    activeBg: "bg-white/8",
    activeBorder: "border-white/30",
    activeText: "text-muted-stardust",
    activeGlow: "shadow-[0_0_20px_rgba(200,200,220,0.15)]",
    dot: "bg-muted-stardust",
  },
] as const;

const WEEK_DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

function WeekProgress({ mood }: { mood: string | null }) {
  const today = (new Date().getUTCDay() + 6) % 7; // Mon=0 … Sun=6, always UTC
  const registered = mood !== null;
  const pct = Math.round(((today + (registered ? 1 : 0.5)) / 7) * 100);

  return (
    <div className="glass-card rounded-3xl p-6 space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h4 className="font-headline-lg-mobile text-base text-ethereal-white">Progresso da Jornada</h4>
          <p className="font-label-sm text-label-sm text-muted-stardust mt-0.5">Seu ritmo espiritual nesta semana</p>
        </div>
        <span className="font-serif text-3xl text-astral-violet leading-none">{pct}%</span>
      </div>

      {/* Gradient bar */}
      <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
        <div
          className="h-full rounded-full shadow-[0_0_10px_rgba(188,155,255,0.4)] transition-all duration-700"
          style={{ width: `${pct}%`, background: "linear-gradient(to right, #A8C7FF, #BC9BFF)" }}
        />
      </div>

      {/* Day dots */}
      <div className="grid grid-cols-7 gap-1">
        {WEEK_DAYS.map((d, i) => {
          const isPast = i < today;
          const isToday = i === today;
          const isFuture = i > today;
          return (
            <div key={d} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-2 h-2 rounded-full transition-all ${
                  isToday
                    ? registered
                      ? "bg-astral-violet shadow-[0_0_8px_rgba(188,155,255,0.9)]"
                      : "bg-cosmic-blue shadow-[0_0_8px_rgba(168,199,255,0.6)]"
                    : isPast
                    ? "bg-cosmic-blue/60"
                    : "bg-muted-stardust/30"
                }`}
              />
              <span
                className={`font-label-sm text-[10px] uppercase ${
                  isToday ? "text-astral-violet font-bold" : isFuture ? "text-muted-stardust/40" : "text-muted-stardust"
                }`}
              >
                {d}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HojePage() {
  const { user, loading } = useAuth();
  const qc = useQueryClient();
  const { isDFTDT, isNewCycle, daysUntil } = useDFTDTState();
  const todayKin = useMemo(() => getTodayKinInfo(), []);
  const cubeToday = useMemo(() => {
    const s = sincronarioDate(new Date());
    return s.dayOutOfTime ? null : cubeDayOfMoon(s.day);
  }, []);
  const fnGetMood = useServerFn(getTodayMood);
  const fnSetMood = useServerFn(setTodayMood);
  const fnListEntries = useServerFn(listEntries);
  const fnAddEntry = useServerFn(addEntry);

  // Data local do dispositivo — calculada só no cliente para evitar mismatch SSR/UTC
  const [localToday, setLocalToday] = useState("");
  useEffect(() => {
    const d = new Date();
    setLocalToday(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
    );
  }, []);

  const moodQuery = useQuery({
    queryKey: ["todayMood", localToday],
    queryFn: () => fnGetMood({ data: { date: localToday } }),
    enabled: !!user,
  });
  const entriesQuery = useQuery({
    queryKey: ["entries", "preview"],
    queryFn: () => fnListEntries({ data: { limit: 2 } }),
    enabled: !!user,
  });

  const mood = moodQuery.data?.mood ?? null;

  const [showJournal, setShowJournal] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [journalText, setJournalText] = useState("");
  const [showColoring, setShowColoring] = useState(false);
  const [paintedSeal, setPaintedSeal] = useState<string | null>(null);

  // Carrega pintura salva do selo de hoje
  useEffect(() => {
    const stored = localStorage.getItem(SEAL_STORAGE_KEY(todayKin.seal.index));
    setPaintedSeal(stored ?? null);
  }, [todayKin.seal.index]);

  const moodMutation = useMutation({
    mutationFn: (m: string) => fnSetMood({ data: { mood: m as never, date: localToday } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todayMood"] }),
    onError: (e: Error) => toast.error(e.message),
  });

  const addMutation = useMutation({
    mutationFn: () => fnAddEntry({ data: { kind: "reflexao", content: journalText.trim(), entry_date: localToday } }),
    onSuccess: () => {
      setJournalText("");
      setShowJournal(false);
      toast.success("Registro salvo na sua jornada.");
      qc.invalidateQueries({ queryKey: ["entries"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <main className="pt-24 pb-32 px-container-margin max-w-[720px] mx-auto min-h-screen relative">
      <section className="mb-section-gap">
        <h2 className="font-serif text-[2rem] leading-tight mb-2 text-ethereal-white">
          {user ? "Bem-vindo de volta." : "Bem-vindo à RAPPAA."}
        </h2>
        <p className="text-on-surface-variant font-body-md mb-6">
          {user ? "Sintonize-se com o ritmo universal." : (
            <>
              <Link
                to="/auth"
                className="text-astral-violet underline decoration-ritual-gold/40 underline-offset-4 hover:text-ritual-gold transition-colors"
              >Entre</Link> para registrar sua energia e retomar sua jornada.
            </>
          )}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-label-sm text-label-sm text-astral-violet uppercase tracking-widest">
              Como você se sente?
            </p>
            <p className="text-xs text-muted-stardust/60 mt-0.5">
              {mood ? "Sua energia de hoje está registrada" : "Escolha a energia que define o seu dia"}
            </p>
          </div>
          {mood && (
            <span className="text-xs text-astral-violet/70 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              Registrado
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2.5">
          {moods.map((m) => {
            const active = mood === m.key;
            return (
              <button
                key={m.key}
                disabled={!user || moodMutation.isPending}
                onClick={() => moodMutation.mutate(m.key)}
                aria-pressed={active}
                className={`group relative flex items-center gap-2.5 px-4 py-3 rounded-2xl border transition-all duration-200 active:scale-95 disabled:opacity-40 select-none ${
                  active
                    ? `${m.activeBg} ${m.activeBorder} ${m.activeGlow}`
                    : "bg-white/3 border-white/8 hover:bg-white/7 hover:border-white/18"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] transition-all duration-200 ${
                    active ? m.activeText : "text-muted-stardust/50 group-hover:text-muted-stardust"
                  }`}
                  style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {m.icon}
                </span>
                <span
                  className={`text-[13px] font-medium tracking-wide transition-colors duration-200 ${
                    active ? m.activeText : "text-muted-stardust/70 group-hover:text-on-surface-variant"
                  }`}
                >
                  {m.label}
                </span>
                {active && (
                  <span className={`w-1.5 h-1.5 rounded-full ${m.dot} ml-0.5 shadow-[0_0_6px_currentColor]`} />
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setShowVideo(true)}
          className="mt-4 w-full flex items-center gap-3 rounded-2xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-on-surface-variant transition-all hover:bg-surface-container-high hover:text-on-surface"
        >
          <span className="material-symbols-outlined text-[24px] text-primary">play_circle</span>
          <span className="font-label-lg">Assista à apresentação da RAPPAA</span>
          <span className="material-symbols-outlined ml-auto text-[18px]">play_arrow</span>
        </button>

        {showVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Apresentação da RAPPAA"
          >
            <button
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowVideo(false)}
              aria-label="Fechar vídeo"
            />
            <div className="relative w-full max-w-3xl">
              <video
                src="/videos/apresentacao-rapa.mp4"
                controls
                autoPlay
                playsInline
                className="w-full rounded-2xl shadow-2xl bg-black"
              />
              <button
                onClick={() => setShowVideo(false)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Fechar"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>
        )}

      </section>

      <section className="mb-section-gap">
        {showJournal ? (
          <div className="glass-card rounded-3xl p-4 space-y-3">
            <textarea
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              autoFocus
              rows={4}
              placeholder="O que quer registrar sobre hoje?"
              className="w-full bg-transparent focus:outline-none resize-none font-body-md"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowJournal(false)} className="btn-ghost">
                Cancelar
              </button>
              <button
                onClick={() => addMutation.mutate()}
                disabled={!journalText.trim() || addMutation.isPending}
                className="px-5 py-2 rounded-full gradient-ritual font-semibold disabled:opacity-50"
              >
                {addMutation.isPending ? "Salvando…" : "Salvar"}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              disabled={!user}
              onClick={() => setShowJournal(true)}
              className="flex-1 gradient-ritual py-5 px-8 rounded-full font-title-md text-title-md flex items-center justify-center gap-3 active:scale-[0.98] transition-transform shadow-lg shadow-astral-violet/20 disabled:opacity-50"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                edit_note
              </span>
              Registrar hoje
            </button>
            <Link
              to="/jornada"
              aria-label="Registrar em outro dia"
              className={`aspect-square py-5 px-4 gradient-ritual rounded-full flex items-center justify-center active:scale-[0.98] transition-transform shadow-lg shadow-astral-violet/20 ${!user ? "pointer-events-none opacity-50" : ""}`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                calendar_month
              </span>
            </Link>
          </div>
        )}
      </section>

      {/* Dia Fora do Tempo banner */}
      {(isDFTDT || isNewCycle || daysUntil <= 7) && (
        <section className="mb-section-gap">
          <Link
            to="/dia-fora-do-tempo"
            className="group relative overflow-hidden rounded-2xl glass-panel block p-1 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-ritual-gold/20 via-transparent to-astral-violet/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            <div className="relative p-6 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ritual-gold/10 border border-ritual-gold/20 text-ritual-gold font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[14px]">hourglass_empty</span>
                    <span suppressHydrationWarning>
                      {isDFTDT ? "HOJE" : isNewCycle ? "AGORA" : `EM ${daysUntil} DIA${daysUntil === 1 ? "" : "S"}`}
                    </span>
                  </span>
                  <h3 className="font-serif text-2xl text-ethereal-white pt-1" suppressHydrationWarning>
                    {isDFTDT ? "Dia Fora do Tempo" : isNewCycle ? "O novo ciclo começou" : "Dia Fora do Tempo"}
                  </h3>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform mt-1">chevron_right</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant" suppressHydrationWarning>
                {isDFTDT
                  ? "O espaço entre dois ciclos — 7 portais de reflexão."
                  : isNewCycle
                  ? "Veja suas intenções para este ciclo galáctico."
                  : "Prepare-se para a travessia de ciclo. Um momento de pausa e realinhamento cósmico."}
              </p>
            </div>
          </Link>
        </section>
      )}

      <section className="mb-section-gap">
        <div className="glass-card rounded-3xl p-6 relative overflow-hidden border-l-4 border-l-cosmic-blue/60">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-[160px] text-cosmic-blue">cyclone</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            {/* Selo: mostra pintura se existir, senão o selo oficial */}
            <button
              onClick={() => setShowColoring(true)}
              className="relative group shrink-0 rounded-full active:scale-95 transition-transform"
              title="Pintar este selo"
              aria-label="Abrir editor de pintura do selo"
            >
              {paintedSeal ? (
                <img
                  src={paintedSeal}
                  alt={todayKin.seal.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-cosmic-blue/50"
                />
              ) : (
                <KinSeal kin={todayKin.kin} size={56} pulse eager />
              )}
              {/* Ícone de pincel no hover */}
              <span className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-[20px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>brush</span>
              </span>
            </button>

            <div className="flex-1 min-w-0">
              <span className="font-label-sm text-label-sm text-muted-stardust uppercase tracking-widest">
                Ciclo do Dia
                <span className="normal-case tracking-normal"> · {new Date().toLocaleDateString("pt-BR", { timeZone: "UTC", day: "numeric", month: "short" })}</span>
              </span>
              <Link
                to="/ciclos/kin/$kin"
                params={{ kin: String(todayKin.kin) }}
                className="block font-serif text-xl text-cosmic-blue hover:opacity-80 transition-opacity truncate"
              >
                Kin {todayKin.kin}: {todayKin.fullName}
              </Link>
            </div>

            {/* Botão pintar compacto */}
            <button
              onClick={() => setShowColoring(true)}
              className="shrink-0 flex flex-col items-center gap-0.5 px-2 py-2 rounded-2xl border border-white/10 hover:border-astral-violet/40 hover:bg-astral-violet/8 transition-all active:scale-95"
              title="Pintar o selo de hoje"
            >
              <span className="material-symbols-outlined text-[20px] text-muted-stardust" style={{ fontVariationSettings: "'FILL' 1" }}>brush</span>
              <span className="text-[9px] text-muted-stardust/60 uppercase tracking-wide leading-none">Pintar</span>
            </button>
          </div>

          <p className="text-on-surface-variant font-body-md leading-relaxed mb-4 relative z-10 italic">
            "A energia de hoje convida a {todayKin.seal.action.toLowerCase()} através de {todayKin.seal.power.toLowerCase()},
            no tom {todayKin.tone.name.toLowerCase()} de {todayKin.tone.essence.toLowerCase()}."
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="chip-blue px-3 py-1 rounded-full text-xs font-medium">{todayKin.seal.action}</span>
            <span className="chip-violet px-3 py-1 rounded-full text-xs font-medium">{todayKin.seal.power}</span>
            <span className="chip-gold px-3 py-1 rounded-full text-xs font-medium">{todayKin.tone.essence}</span>
          </div>
        </div>
      </section>

      {/* Progresso da Jornada */}
      {user && (
        <section className="mb-section-gap">
          <WeekProgress mood={mood} />
        </section>
      )}

      {cubeToday && (
        <section className="mb-section-gap">
          <Link
            to="/ciclos"
            className="glass-card rounded-3xl p-5 flex items-start gap-4 border border-transparent hover:border-primary transition-colors"
          >
            <span
              className="material-symbols-outlined text-primary text-[40px] flex-shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              deployed_code
            </span>
            <div className="min-w-0">
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
                Pátron Cúbico · Cubo {cubeToday.phase === "chumbo" ? "do Chumbo" : "do Ouro"}
              </span>
              <p className="font-title-md text-title-md mt-1">
                {cubeToday.index}. {cubeToday.codon} — {cubeToday.action}
              </p>
              <p className="font-body-sm text-on-surface-variant italic mt-1">"{cubeToday.focus}"</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant/60 mt-1">
                Face {cubeToday.face} · dia {cubeToday.moonDay} da Lua
              </p>
            </div>
          </Link>
        </section>
      )}

      {user && (
        <section className="mb-8">
          <div className="flex justify-between items-end mb-4">
            <h3 className="font-title-md text-title-md">Minha Jornada</h3>
            <Link to="/jornada" className="font-label-sm text-label-sm text-primary flex items-center gap-1">
              Ver tudo <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          {entriesQuery.data?.entries.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {entriesQuery.data.entries.map((e) => (
                <div key={e.id} className="glass-card rounded-3xl p-4">
                  <span className="font-label-sm text-[10px] text-primary uppercase tracking-widest">
                    {new Date(e.entry_date + "T00:00:00").toLocaleDateString("pt-BR", { day: "numeric", month: "short" })} · {e.kind}
                  </span>
                  <p className="font-body-md mt-2 line-clamp-4">{e.title ?? e.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-on-surface-variant text-sm">Nenhum registro ainda. Comece por "Registrar hoje" acima.</p>
          )}
        </section>
      )}
      {/* Modal de pintura do selo — fixed, posição no DOM não importa */}
      {showColoring && (
        <SealColoringModal
          kinInfo={todayKin}
          onClose={() => setShowColoring(false)}
          onSaved={(dataUrl) => {
            setPaintedSeal(dataUrl);
            setShowColoring(false);
          }}
        />
      )}
    </main>
  );
}
