import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import {
  getDFTDTExperience,
  saveDFTDTPortal,
  completeDFTDT,
  getYearStats,
} from "@/lib/dftdt.functions";
import { yearBearer, kinFromDate, getKinInfo, sincronarioDate } from "@/lib/tzolkin";
import { CHAKRAS_ASCENDENTE } from "@/lib/chakras";
import { SEAL_IMAGE } from "@/lib/seal-images";

export const Route = createFileRoute("/dia-fora-do-tempo")({
  head: () => ({
    meta: [
      { title: "Dia Fora do Tempo — RAPA" },
      { name: "description", content: "25 de julho — o espaço entre dois ciclos. Uma jornada de 7 portais para encerrar, liberar e renovar." },
    ],
  }),
  component: DiaForaDoTempoPage,
});

// ─── Constants ────────────────────────────────────────────────────────────────

const PORTAL_CONFIG = [
  {
    num: 1, key: "portal_1_closing" as const,
    verb: "ENCERRAR", title: "O que terminou?",
    prompt: "Quais ciclos, situações ou experiências chegaram ao fim neste ano que passou?",
    msg: "Todo fim é um início disfarçado.",
    inputType: "textarea" as const,
  },
  {
    num: 2, key: "portal_2_release" as const,
    verb: "LIBERAR", title: "O que você não quer carregar?",
    prompt: "O que você escolhe deixar para trás? Escreva sem julgamento.",
    msg: "Você não precisa levar tudo com você.",
    inputType: "dissolve" as const,
  },
  {
    num: 3, key: "portal_3_gratitude" as const,
    verb: "AGRADECER", title: "Pelo que você é grato?",
    prompt: "Registre até três coisas pelas quais você é grato neste ciclo.",
    msg: "A gratidão transforma o que temos.",
    inputType: "triple" as const,
  },
  {
    num: 4, key: "portal_4_forgiveness" as const,
    verb: "PERDOAR", title: "O que precisa ser perdoado?",
    prompt: "Uma reflexão pessoal e privada. Ninguém além de você verá esta resposta.",
    msg: "Perdoar não apaga o passado. Apenas muda o que você escolhe carregar.",
    inputType: "textarea" as const,
    isPrivate: true,
  },
  {
    num: 5, key: "portal_5_celebration" as const,
    verb: "CELEBRAR", title: "O que você realizou?",
    prompt: "Reconheça suas conquistas, grandes e pequenas. Seu ciclo em retrospectiva.",
    msg: "Cada passo importa. Cada dia registrado é um traço de presença.",
    inputType: "celebration" as const,
  },
  {
    num: 6, key: "portal_6_intentions" as const,
    verb: "INTENCIONAR", title: "O que você deseja cultivar?",
    prompt: "Escolha até 3 intenções para o novo ciclo.",
    msg: "Uma intenção clara é a primeira forma de criação.",
    inputType: "intentions" as const,
  },
  {
    num: 7, key: "portal_7_renewal" as const,
    verb: "RENOVAR", title: "O espaço foi criado.",
    prompt: "",
    msg: "O ciclo terminou. O espaço foi criado. Agora você pode escolher como entrar no próximo.",
    inputType: "renewal" as const,
  },
];

const INTENTION_OPTIONS = [
  { emoji: "🌱", label: "Crescimento" },
  { emoji: "💧", label: "Fluidez" },
  { emoji: "🔥", label: "Coragem" },
  { emoji: "💚", label: "Harmonia" },
  { emoji: "🌬️", label: "Liberdade" },
  { emoji: "🌙", label: "Intuição" },
  { emoji: "☀️", label: "Clareza" },
  { emoji: "✨", label: "Presença" },
  { emoji: "❤️", label: "Amor" },
  { emoji: "🌀", label: "Transformação" },
];

function daysUntilDFTDT(): number {
  const now = new Date();
  const y = now.getFullYear();
  let next = new Date(y, 6, 25); // July 25 this year
  if (now > next) next = new Date(y + 1, 6, 25);
  return Math.ceil((next.getTime() - now.getTime()) / 86400000);
}

function isToday(month: number, day: number): boolean {
  const n = new Date();
  return n.getMonth() === month && n.getDate() === day;
}

const isDFTDT = isToday(6, 25);   // July = month 6
const isNewCycle = isToday(6, 26); // July 26
const currentYear = new Date().getFullYear();

// ─── Main Component ───────────────────────────────────────────────────────────

type Phase = "loading" | "hero" | "portal" | "carta";

interface FormData {
  portal_1_closing: string;
  portal_2_release: string;
  portal_3_gratitude: [string, string, string];
  portal_4_forgiveness: string;
  portal_5_celebration: string;
  portal_6_intentions: string[];
  portal_7_renewal: string;
}

const defaultForm: FormData = {
  portal_1_closing: "",
  portal_2_release: "",
  portal_3_gratitude: ["", "", ""],
  portal_4_forgiveness: "",
  portal_5_celebration: "",
  portal_6_intentions: [],
  portal_7_renewal: "",
};

function DiaForaDoTempoPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("loading");
  const [portalIdx, setPortalIdx] = useState(0); // 0-6
  const [form, setForm] = useState<FormData>(defaultForm);
  const [dissolved, setDissolved] = useState(false);
  const [chakrasLit, setChakrasLit] = useState(0);
  const [customIntention, setCustomIntention] = useState("");

  const fnGet = useServerFn(getDFTDTExperience);
  const fnSave = useServerFn(saveDFTDTPortal);
  const fnComplete = useServerFn(completeDFTDT);
  const fnStats = useServerFn(getYearStats);

  const expQuery = useQuery({
    queryKey: ["dftdt", currentYear],
    queryFn: () => fnGet(),
    enabled: !!user,
  });

  const statsQuery = useQuery({
    queryKey: ["dftdt-stats"],
    queryFn: () => fnStats(),
    enabled: !!user && portalIdx === 4,
  });

  type SavePayload = {
    year: number; current_portal: number;
    portal_1_closing?: string; portal_2_release?: string;
    portal_3_gratitude?: string[]; portal_4_forgiveness?: string;
    portal_5_celebration?: string; portal_6_intentions?: string[];
    portal_7_renewal?: string;
  };
  const saveMut = useMutation({
    mutationFn: (d: SavePayload) => fnSave({ data: d }),
    onError: (e: Error) => toast.error("Erro ao salvar: " + e.message),
  });

  const completeMut = useMutation({
    mutationFn: () => fnComplete({ data: { year: currentYear } }),
  });

  // Init phase from saved state
  useEffect(() => {
    if (authLoading) return;
    if (!user) { setPhase("hero"); return; }
    if (expQuery.isPending) return;
    const exp = expQuery.data?.experience;
    if (!exp) { setPhase("hero"); return; }
    if (exp.completed) { setPhase("carta"); return; }
    // Resume at saved portal
    setForm({
      portal_1_closing: exp.portal_1_closing ?? "",
      portal_2_release: exp.portal_2_release ?? "",
      portal_3_gratitude: Array.isArray(exp.portal_3_gratitude)
        ? (exp.portal_3_gratitude as string[]).concat(["", "", ""]).slice(0, 3) as [string, string, string]
        : ["", "", ""],
      portal_4_forgiveness: exp.portal_4_forgiveness ?? "",
      portal_5_celebration: exp.portal_5_celebration ?? "",
      portal_6_intentions: Array.isArray(exp.portal_6_intentions) ? exp.portal_6_intentions : [],
      portal_7_renewal: exp.portal_7_renewal ?? "",
    });
    setPortalIdx(Math.min(exp.current_portal, 6));
    setPhase("portal");
  }, [authLoading, user, expQuery.isPending, expQuery.data]);

  const galacticEnding = useMemo(() => yearBearer(new Date(currentYear, 6, 24)), []);
  const galacticNew = useMemo(() => yearBearer(new Date(currentYear, 6, 26)), []);
  const todayKin = useMemo(() => {
    const k = kinFromDate(new Date(currentYear, 6, 25));
    return getKinInfo(k);
  }, []);

  const chakra = CHAKRAS_ASCENDENTE[portalIdx]; // portal 0→chakra 1 (Raiz) … portal 6→chakra 7

  const save = useCallback(async (nextPortal: number, extraFields?: Partial<FormData>) => {
    if (!user) return;
    const merged = { ...form, ...extraFields };
    await saveMut.mutateAsync({
      year: currentYear,
      current_portal: nextPortal,
      portal_1_closing: merged.portal_1_closing || undefined,
      portal_2_release: merged.portal_2_release || undefined,
      portal_3_gratitude: merged.portal_3_gratitude.filter(Boolean),
      portal_4_forgiveness: merged.portal_4_forgiveness || undefined,
      portal_5_celebration: merged.portal_5_celebration || undefined,
      portal_6_intentions: merged.portal_6_intentions,
      portal_7_renewal: merged.portal_7_renewal || undefined,
    });
  }, [user, form, saveMut]);

  async function advance() {
    if (!user) { navigate({ to: "/auth" }); return; }
    const next = portalIdx + 1;
    await save(next);
    if (next >= PORTAL_CONFIG.length) {
      await completeMut.mutateAsync();
      setPhase("carta");
    } else {
      setPortalIdx(next);
      setDissolved(false);
    }
  }

  // Portal 7: animate chakras lighting up
  useEffect(() => {
    if (portalIdx !== 6) return;
    setChakrasLit(0);
    const t = setInterval(() => {
      setChakrasLit((n) => {
        if (n >= 7) { clearInterval(t); return n; }
        return n + 1;
      });
    }, 400);
    return () => clearInterval(t);
  }, [portalIdx]);

  // ── Loading
  if (phase === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-4xl animate-spin">progress_activity</span>
      </div>
    );
  }

  // ── Hero (countdown or main)
  if (phase === "hero") {
    return <HeroSection
      isDFTDT={isDFTDT}
      isNewCycle={isNewCycle}
      galacticEnding={galacticEnding}
      galacticNew={galacticNew}
      todayKin={todayKin}
      user={!!user}
      resumePortal={expQuery.data?.experience?.current_portal ?? -1}
      onStart={() => {
        if (!user) { navigate({ to: "/auth" }); return; }
        setPhase("portal");
        setPortalIdx(0);
      }}
      onResume={() => setPhase("portal")}
      onCarta={() => setPhase("carta")}
    />;
  }

  // ── Carta
  if (phase === "carta") {
    return <CartaSection
      form={form}
      galacticEnding={galacticEnding}
      galacticNew={galacticNew}
      todayKin={todayKin}
      onRestart={() => setPhase("hero")}
    />;
  }

  // ── Portal journey
  const portal = PORTAL_CONFIG[portalIdx];
  const isPending = saveMut.isPending || completeMut.isPending;

  return (
    <div
      className="min-h-screen pb-32 relative"
      style={{ background: `radial-gradient(ellipse at 50% 0%, ${chakra.cor}22 0%, transparent 60%), #0e1116` }}
    >
      <div className="fixed inset-0 texture-overlay z-[-1]" aria-hidden />

      {/* Top bar */}
      <div className="sticky top-0 z-40 backdrop-blur-xl border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setPhase("hero")}
          className="flex items-center gap-1 text-on-surface-variant hover:text-on-surface text-sm"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Dia Fora do Tempo
        </button>
        {/* Portal dots */}
        <div className="flex gap-1.5 items-center">
          {PORTAL_CONFIG.map((p, i) => (
            <span
              key={p.num}
              className="w-2 h-2 rounded-full transition-all duration-500"
              style={{ background: i <= portalIdx ? chakra.cor : "rgba(255,255,255,0.15)" }}
            />
          ))}
        </div>
        <span className="font-label-sm text-label-sm text-on-surface-variant">
          Portal {portalIdx + 1} / 7
        </span>
      </div>

      <div className="px-container-margin max-w-[560px] mx-auto pt-8">
        {/* Chakra glow orb */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-20 h-20 mb-3">
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-40 animate-pulse"
              style={{ background: chakra.cor }}
            />
            <div
              className="relative w-full h-full rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: chakra.cor, background: `${chakra.cor}22` }}
            >
              <span
                className="material-symbols-outlined text-3xl"
                style={{ color: chakra.cor, fontVariationSettings: "'FILL' 1" }}
              >
                {chakra.simbolo}
              </span>
            </div>
          </div>
          <p className="font-label-sm text-label-sm uppercase tracking-widest mb-1" style={{ color: chakra.cor }}>
            {chakra.nome} · {chakra.identidade}
          </p>
          <p className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-on-surface-variant/60">
            {portal.verb}
          </p>
        </div>

        {/* Portal content */}
        <div className="glass-panel rounded-3xl p-6 mb-6">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">{portal.title}</h2>
          <p className="font-body-md text-on-surface-variant/80 mb-6">{portal.prompt}</p>

          {/* INPUT: textarea */}
          {(portal.inputType === "textarea" || portal.inputType === "dissolve") && (
            <div className="space-y-4">
              {portal.isPrivate && (
                <div className="flex items-center gap-2 text-on-surface-variant/70 text-sm mb-2">
                  <span className="material-symbols-outlined text-base">lock</span>
                  <span>Esta reflexão é completamente privada.</span>
                </div>
              )}
              {portal.inputType === "dissolve" && dissolved ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center space-y-3">
                  <p className="text-4xl">🌬️</p>
                  <p className="font-body-md text-on-surface-variant italic">"{portal.msg}"</p>
                </div>
              ) : (
                <textarea
                  rows={5}
                  value={portal.key === "portal_1_closing" ? form.portal_1_closing
                    : portal.key === "portal_2_release" ? form.portal_2_release
                    : portal.key === "portal_4_forgiveness" ? form.portal_4_forgiveness
                    : ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (portal.key === "portal_1_closing") setForm((f) => ({ ...f, portal_1_closing: v }));
                    else if (portal.key === "portal_2_release") setForm((f) => ({ ...f, portal_2_release: v }));
                    else if (portal.key === "portal_4_forgiveness") setForm((f) => ({ ...f, portal_4_forgiveness: v }));
                  }}
                  placeholder="Escreva livremente…"
                  className="w-full bg-white/5 rounded-2xl border border-white/10 p-4 focus:outline-none focus:border-white/30 resize-none font-body-md text-on-surface placeholder:text-on-surface-variant/40"
                />
              )}
              {portal.inputType === "dissolve" && !dissolved && form.portal_2_release && (
                <button
                  type="button"
                  onClick={() => setDissolved(true)}
                  className="w-full py-3 rounded-full border text-sm font-medium transition-all"
                  style={{ borderColor: chakra.cor, color: chakra.cor }}
                >
                  🌬️ Liberar e dissolver
                </button>
              )}
            </div>
          )}

          {/* INPUT: triple gratitude */}
          {portal.inputType === "triple" && (
            <div className="space-y-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xl">{"⭐✨🌟"[i]}</span>
                  <input
                    type="text"
                    value={form.portal_3_gratitude[i]}
                    onChange={(e) => {
                      const v = e.target.value;
                      setForm((f) => {
                        const g = [...f.portal_3_gratitude] as [string, string, string];
                        g[i] = v;
                        return { ...f, portal_3_gratitude: g };
                      });
                    }}
                    placeholder={`Gratidão ${i + 1}…`}
                    className="flex-1 bg-white/5 rounded-2xl border border-white/10 px-4 py-3 focus:outline-none focus:border-white/30 font-body-md text-on-surface placeholder:text-on-surface-variant/40"
                  />
                </div>
              ))}
              {form.portal_3_gratitude.some(Boolean) && (
                <div className="flex gap-3 justify-center pt-2">
                  {form.portal_3_gratitude.filter(Boolean).map((g, i) => (
                    <span key={i} className="text-2xl" title={g}>{"⭐✨🌟"[i]}</span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* INPUT: celebration / retrospective */}
          {portal.inputType === "celebration" && (
            <div className="space-y-4">
              {statsQuery.data && (statsQuery.data.journalEntries > 0 || statsQuery.data.moodDays > 0) ? (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
                    <p className="text-2xl font-bold" style={{ color: chakra.cor }}>{statsQuery.data.journalEntries}</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">reflexões registradas</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
                    <p className="text-2xl font-bold" style={{ color: chakra.cor }}>{statsQuery.data.moodDays}</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">dias de presença</p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center italic text-on-surface-variant/70 mb-4">
                  "Todo ciclo deixa marcas. Comece registrando o que você viveu."
                </div>
              )}
              <textarea
                rows={4}
                value={form.portal_5_celebration}
                onChange={(e) => setForm((f) => ({ ...f, portal_5_celebration: e.target.value }))}
                placeholder="O que você realizou neste ciclo? Escreva com orgulho…"
                className="w-full bg-white/5 rounded-2xl border border-white/10 p-4 focus:outline-none focus:border-white/30 resize-none font-body-md text-on-surface placeholder:text-on-surface-variant/40"
              />
            </div>
          )}

          {/* INPUT: intentions */}
          {portal.inputType === "intentions" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {INTENTION_OPTIONS.map((opt) => {
                  const label = `${opt.emoji} ${opt.label}`;
                  const selected = form.portal_6_intentions.includes(label);
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => {
                        setForm((f) => {
                          const cur = f.portal_6_intentions;
                          if (selected) return { ...f, portal_6_intentions: cur.filter((x) => x !== label) };
                          if (cur.length >= 3) { toast.error("Escolha até 3 intenções."); return f; }
                          return { ...f, portal_6_intentions: [...cur, label] };
                        });
                      }}
                      className={[
                        "flex items-center gap-2 px-3 py-2.5 rounded-2xl border text-sm font-medium transition-all text-left",
                        selected
                          ? "border-opacity-100 text-on-surface"
                          : "border-white/10 text-on-surface-variant hover:border-white/30",
                      ].join(" ")}
                      style={selected ? { borderColor: chakra.cor, background: `${chakra.cor}22` } : undefined}
                    >
                      <span>{opt.emoji}</span>
                      <span>{opt.label}</span>
                      {selected && <span className="material-symbols-outlined text-xs ml-auto" style={{ color: chakra.cor }}>check</span>}
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customIntention}
                  onChange={(e) => setCustomIntention(e.target.value)}
                  placeholder="Intenção personalizada…"
                  maxLength={80}
                  className="flex-1 bg-white/5 rounded-2xl border border-white/10 px-4 py-3 focus:outline-none focus:border-white/30 font-body-md text-on-surface placeholder:text-on-surface-variant/40"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && customIntention.trim()) {
                      const v = `✏️ ${customIntention.trim()}`;
                      if (form.portal_6_intentions.length >= 3) { toast.error("Máximo 3 intenções."); return; }
                      setForm((f) => ({ ...f, portal_6_intentions: [...f.portal_6_intentions, v] }));
                      setCustomIntention("");
                    }
                  }}
                />
                <button
                  type="button"
                  disabled={!customIntention.trim() || form.portal_6_intentions.length >= 3}
                  onClick={() => {
                    const v = `✏️ ${customIntention.trim()}`;
                    if (form.portal_6_intentions.length >= 3) { toast.error("Máximo 3 intenções."); return; }
                    setForm((f) => ({ ...f, portal_6_intentions: [...f.portal_6_intentions, v] }));
                    setCustomIntention("");
                  }}
                  className="px-4 py-3 rounded-2xl border border-white/10 text-on-surface-variant hover:border-white/30 disabled:opacity-40"
                >
                  <span className="material-symbols-outlined text-base">add</span>
                </button>
              </div>
              {form.portal_6_intentions.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {form.portal_6_intentions.map((v) => (
                    <span
                      key={v}
                      className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium"
                      style={{ background: `${chakra.cor}33`, color: chakra.cor, border: `1px solid ${chakra.cor}66` }}
                    >
                      {v}
                      <button type="button" onClick={() => setForm((f) => ({ ...f, portal_6_intentions: f.portal_6_intentions.filter((x) => x !== v) }))}>
                        <span className="material-symbols-outlined text-xs">close</span>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Portal 7 — renewal animation */}
          {portal.inputType === "renewal" && (
            <div className="space-y-6">
              <p className="text-center font-body-lg text-on-surface/80 leading-relaxed italic">
                "{portal.msg}"
              </p>
              <div className="flex justify-center gap-2 flex-wrap">
                {CHAKRAS_ASCENDENTE.map((c, i) => (
                  <div
                    key={c.id}
                    className="flex flex-col items-center gap-1 transition-all duration-700"
                    style={{ opacity: i < chakrasLit ? 1 : 0.15 }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-700"
                      style={{
                        background: i < chakrasLit ? `${c.cor}44` : "transparent",
                        border: `2px solid ${c.cor}`,
                        boxShadow: i < chakrasLit ? `0 0 12px ${c.cor}88` : "none",
                      }}
                    >
                      <span className="material-symbols-outlined text-xs" style={{ color: c.cor, fontVariationSettings: "'FILL' 1" }}>
                        {c.simbolo}
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant/60" style={{ fontSize: "9px" }}>{c.nome}</span>
                  </div>
                ))}
              </div>
              {chakrasLit >= 7 && (
                <p className="text-center font-title-md text-on-surface animate-in fade-in duration-1000">
                  ✨ Você atravessou o ciclo.
                </p>
              )}
            </div>
          )}

          {/* Inspirational message */}
          {portal.inputType !== "renewal" && (
            <p className="mt-6 font-body-sm italic text-on-surface-variant/60 text-center border-t border-white/5 pt-4">
              "{portal.msg}"
            </p>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {portalIdx > 0 && (
            <button
              type="button"
              onClick={() => { setPortalIdx((n) => n - 1); setDissolved(false); }}
              className="btn-secondary flex-1 py-4"
            >
              ← Voltar
            </button>
          )}
          <button
            type="button"
            onClick={advance}
            disabled={isPending}
            className="flex-[2] py-4 rounded-full font-label-lg font-semibold transition-all active:scale-[0.98] disabled:opacity-50"
            style={{ background: chakra.cor, color: "#0e1116" }}
          >
            {isPending ? "Salvando…"
              : portalIdx === 6 ? "✨ Gerar minha Carta de Transição"
              : `Avançar para o Portal ${portalIdx + 2}`}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection({
  isDFTDT, isNewCycle, galacticEnding, galacticNew, todayKin, user, resumePortal, onStart, onResume, onCarta,
}: {
  isDFTDT: boolean; isNewCycle: boolean;
  galacticEnding: ReturnType<typeof yearBearer>;
  galacticNew: ReturnType<typeof yearBearer>;
  todayKin: ReturnType<typeof getKinInfo>;
  user: boolean; resumePortal: number;
  onStart: () => void; onResume: () => void; onCarta: () => void;
}) {
  const daysLeft = daysUntilDFTDT();
  const isCompleted = resumePortal === 7;
  const inProgress = resumePortal > 0 && resumePortal < 7;

  return (
    <div
      className="min-h-screen relative flex flex-col"
      style={{ background: "radial-gradient(ellipse at 50% 30%, #3b1a6622 0%, transparent 70%), radial-gradient(ellipse at 80% 80%, #1a0a3322 0%, transparent 50%), #0e1116" }}
    >
      <div className="fixed inset-0 texture-overlay z-[-1]" aria-hidden />

      {/* Rainbow gradient top bar */}
      <div
        className="h-1 w-full"
        style={{
          background: "linear-gradient(to right, #e0524d, #e58b4e, #e8c95a, #6fc98b, #6FBEDA, #8489e0, #b98ed6)",
        }}
      />

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center max-w-[600px] mx-auto w-full">
        {/* Sparkle decoration */}
        <div className="text-4xl mb-4 animate-pulse">🌈</div>

        {/* Date */}
        <div className="mb-2">
          <span className="font-label-sm text-label-sm uppercase tracking-[0.3em] text-primary/80">
            {isDFTDT ? "Hoje é" : isNewCycle ? "Ontem foi" : `em ${daysLeft} ${daysLeft === 1 ? "dia" : "dias"}`}
          </span>
        </div>
        <h1 className="font-serif text-7xl font-bold text-on-surface leading-none mb-1">25</h1>
        <p className="font-serif text-2xl text-on-surface/70 mb-4">JULHO</p>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Dia Fora do Tempo</h2>
        <p className="font-body-lg text-on-surface-variant/80 mb-8 leading-relaxed">
          Um dia entre dois ciclos.
          <br />
          <span className="italic">O espaço onde tudo é possível.</span>
        </p>

        {isDFTDT && (
          <div className="glass-panel rounded-3xl p-5 w-full mb-8 text-left space-y-1.5">
            <p className="font-body-md text-on-surface/80 leading-relaxed">
              Hoje você não precisa correr. Não precisa chegar.
              Este é um espaço para olhar para o ciclo que termina,
              liberar o que não precisa continuar
              e escolher conscientemente o que deseja cultivar.
            </p>
          </div>
        )}

        {/* CTA */}
        {isDFTDT && (
          isCompleted ? (
            <button
              type="button"
              onClick={onCarta}
              className="w-full max-w-xs py-4 rounded-full font-title-md font-semibold text-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "linear-gradient(135deg, #8489e0, #b98ed6)", color: "white" }}
            >
              🌈 Ver minha Carta de Transição
            </button>
          ) : inProgress ? (
            <div className="space-y-3 w-full max-w-xs">
              <button
                type="button"
                onClick={onResume}
                className="w-full py-4 rounded-full font-title-md font-semibold transition-all hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #8489e0, #b98ed6)", color: "white" }}
              >
                Continuar minha jornada — Portal {resumePortal + 1} de 7
              </button>
              <button type="button" onClick={onStart} className="w-full py-3 rounded-full border border-white/20 text-on-surface-variant hover:border-white/40 text-sm">
                Recomeçar do início
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onStart}
              className="w-full max-w-xs py-4 rounded-full font-title-md font-semibold text-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "linear-gradient(135deg, #8489e0, #b98ed6)", color: "white" }}
            >
              ✨ Entrar no Dia Fora do Tempo
            </button>
          )
        )}

        {!isDFTDT && (
          <div className="glass-panel rounded-3xl p-5 w-full mb-6">
            <p className="font-label-sm text-label-sm uppercase tracking-widest text-primary/70 mb-2">
              {isNewCycle ? "Novo ciclo iniciado · 26 de julho" : "Próximo Dia Fora do Tempo"}
            </p>
            {!isNewCycle && (
              <p className="font-headline-lg text-headline-lg text-on-surface">{daysLeft} {daysLeft === 1 ? "dia" : "dias"}</p>
            )}
            <p className="font-body-md text-on-surface-variant/70 mt-1">
              {isNewCycle
                ? "O novo ciclo galáctico começou. Cada dia é um novo Kin."
                : "Use este tempo para se preparar. O Dia Fora do Tempo convida à reflexão."}
            </p>
          </div>
        )}

        {/* Galactic year bridge */}
        <div className="w-full max-w-sm mt-6">
          <div className="flex items-stretch gap-0">
            <div className="flex-1 glass-panel rounded-l-2xl p-3 text-center border-r-0 rounded-r-none">
              <p className="font-label-sm text-[10px] text-on-surface-variant/60 uppercase tracking-widest mb-1">Ciclo que termina</p>
              <p className="font-label-sm text-xs text-on-surface font-semibold">{galacticEnding.label}</p>
              <p className="font-label-sm text-[10px] text-on-surface-variant/50">Kin {galacticEnding.kin}</p>
            </div>
            <div className="flex items-center px-2 glass-panel border-x-0" style={{ borderRadius: 0 }}>
              <div className="flex flex-col items-center">
                <span className="text-lg">🌈</span>
                <span className="font-label-sm text-[9px] text-on-surface-variant/50 mt-0.5">25/07</span>
              </div>
            </div>
            <div className="flex-1 glass-panel rounded-r-2xl p-3 text-center border-l-0 rounded-l-none">
              <p className="font-label-sm text-[10px] text-on-surface-variant/60 uppercase tracking-widest mb-1">Novo ciclo</p>
              <p className="font-label-sm text-xs text-on-surface font-semibold">{galacticNew.label}</p>
              <p className="font-label-sm text-[10px] text-on-surface-variant/50">Kin {galacticNew.kin}</p>
            </div>
          </div>
        </div>

        {/* Galactic context */}
        <details className="w-full max-w-sm mt-4 text-left">
          <summary className="font-label-sm text-label-sm text-on-surface-variant/60 cursor-pointer hover:text-on-surface-variant text-center">
            Contexto galáctico do dia ↓
          </summary>
          <div className="glass-panel rounded-2xl p-4 mt-2 space-y-1">
            <p className="font-label-sm text-label-sm text-on-surface-variant/70">
              <span className="text-primary">Kin 25/07:</span> {todayKin.kin} — {todayKin.fullName}
            </p>
            <p className="font-label-sm text-label-sm text-on-surface-variant/70">
              <span className="text-primary">Selo:</span> {todayKin.seal.name} · {todayKin.seal.action}
            </p>
            <p className="font-label-sm text-label-sm text-on-surface-variant/70">
              <span className="text-primary">Tom:</span> {todayKin.tone.name} · {todayKin.tone.essence}
            </p>
            <p className="font-label-sm text-label-sm text-on-surface-variant/50 italic pt-1 text-xs">
              * 25/07 não é um dia das 13 Luas. É o Dia Fora do Tempo do Sincronário — o espaço de transição entre os ciclos anuais.
            </p>
          </div>
        </details>

        {!user && isDFTDT && (
          <p className="font-body-sm text-on-surface-variant/60 mt-6">
            <Link to="/auth" className="text-primary underline">Entre na RAPA</Link> para salvar sua jornada.
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Carta de Transição ───────────────────────────────────────────────────────

function CartaSection({
  form, galacticEnding, galacticNew, todayKin, onRestart,
}: {
  form: FormData;
  galacticEnding: ReturnType<typeof yearBearer>;
  galacticNew: ReturnType<typeof yearBearer>;
  todayKin: ReturnType<typeof getKinInfo>;
  onRestart: () => void;
}) {
  return (
    <div
      className="min-h-screen pb-32"
      style={{ background: "radial-gradient(ellipse at 50% 0%, #b98ed622 0%, transparent 60%), #0e1116" }}
    >
      <div className="fixed inset-0 texture-overlay z-[-1]" aria-hidden />
      <div
        className="h-1 w-full"
        style={{ background: "linear-gradient(to right, #e0524d, #e58b4e, #e8c95a, #6fc98b, #6FBEDA, #8489e0, #b98ed6)" }}
      />

      <div className="px-container-margin max-w-[600px] mx-auto pt-10">
        <div className="text-center mb-8">
          <p className="text-5xl mb-3">🌈</p>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-1">Sua Carta de Transição</h1>
          <p className="font-body-md text-on-surface-variant/70">25 de julho · Dia Fora do Tempo</p>
        </div>

        <div className="space-y-4">
          {/* Cycle info */}
          <div className="glass-panel rounded-2xl p-4">
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant/60 uppercase tracking-wider">Ciclo encerrado</p>
                <p className="font-body-md font-semibold">{galacticEnding.label}</p>
              </div>
              <span className="text-2xl">→</span>
              <div className="text-right">
                <p className="font-label-sm text-label-sm text-on-surface-variant/60 uppercase tracking-wider">Novo ciclo</p>
                <p className="font-body-md font-semibold">{galacticNew.label}</p>
              </div>
            </div>
          </div>

          {form.portal_1_closing && (
            <CartaBlock icon="wb_twilight" color="#e0524d" title="O que encerrei" content={form.portal_1_closing} />
          )}
          {form.portal_2_release && (
            <CartaBlock icon="air" color="#e58b4e" title="O que liberei" content={form.portal_2_release} />
          )}
          {form.portal_3_gratitude.some(Boolean) && (
            <div className="glass-panel rounded-2xl p-4">
              <p className="font-label-sm text-label-sm uppercase tracking-wider mb-3" style={{ color: "#e8c95a" }}>
                <span className="material-symbols-outlined text-base align-middle mr-1" style={{ fontVariationSettings: "'FILL' 1" }}>wb_sunny</span>
                Gratidão
              </p>
              <div className="space-y-1.5">
                {form.portal_3_gratitude.filter(Boolean).map((g, i) => (
                  <p key={i} className="font-body-md text-on-surface/90">{"⭐✨🌟"[i]} {g}</p>
                ))}
              </div>
            </div>
          )}
          {form.portal_5_celebration && (
            <CartaBlock icon="emoji_events" color="#6FBEDA" title="O que realizei" content={form.portal_5_celebration} />
          )}
          {form.portal_6_intentions.length > 0 && (
            <div className="glass-panel rounded-2xl p-4">
              <p className="font-label-sm text-label-sm uppercase tracking-wider mb-3" style={{ color: "#8489e0" }}>
                <span className="material-symbols-outlined text-base align-middle mr-1" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
                Intenções para o novo ciclo
              </p>
              <div className="flex flex-wrap gap-2">
                {form.portal_6_intentions.map((v) => (
                  <span
                    key={v}
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ background: "#8489e033", color: "#8489e0", border: "1px solid #8489e066" }}
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Closing message */}
        <div className="mt-8 glass-panel rounded-3xl p-6 text-center space-y-2">
          <p className="text-3xl">✨</p>
          <blockquote className="font-body-lg text-on-surface/80 leading-relaxed italic">
            "Você encerrou um ciclo.<br />
            Você criou espaço.<br />
            Agora existe uma escolha.<br />
            <br />
            O próximo ciclo ainda não foi escrito.<br />
            <br />
            Entre o que foi e o que será,<br />
            existe você."
          </blockquote>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3">
          <Link
            to="/"
            className="w-full py-4 rounded-full text-center font-title-md font-semibold transition-all hover:scale-[1.01]"
            style={{ background: "linear-gradient(135deg, #8489e0, #b98ed6)", color: "white" }}
          >
            🌅 Entrar no Novo Ciclo
          </Link>
          <button
            type="button"
            onClick={onRestart}
            className="w-full py-3 rounded-full border border-white/20 text-on-surface-variant hover:border-white/40 text-sm"
          >
            Ver a experiência novamente
          </button>
        </div>
      </div>
    </div>
  );
}

function CartaBlock({ icon, color, title, content }: { icon: string; color: string; title: string; content: string }) {
  return (
    <div className="glass-panel rounded-2xl p-4">
      <p className="font-label-sm text-label-sm uppercase tracking-wider mb-2" style={{ color }}>
        <span className="material-symbols-outlined text-base align-middle mr-1" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
        {title}
      </p>
      <p className="font-body-md text-on-surface/90 leading-relaxed">{content}</p>
    </div>
  );
}
