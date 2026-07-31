import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useMemo, useState, useRef, useEffect, Fragment, type KeyboardEvent } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getKinInfo, kinFromDate, SEALS, TONES, TONE_DETAILS, SEAL_DETAILS, PLASMAS, plasmaOfDay, EARTH_FAMILIES, CASTLE_DETAILS, getCastleOfKin, getEarthFamily, CUBE_DAYS, cubeDayOfMoon, sincronarioDate, type SealColor, type CubeDay } from "@/lib/tzolkin";
import { PlasmaSymbol } from "@/components/PlasmaSymbol";
import { SEAL_IMAGE } from "@/lib/seal-images";
import { ToneSymbol } from "@/components/ToneSymbol";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { DailyFlowCards } from "@/components/rapa/DailyRitualModal";



export const Route = createFileRoute("/ciclos")({
  head: () => {
    const todaySeal = SEAL_IMAGE[getKinInfo(kinFromDate(new Date())).seal.index];
    return {
      meta: [
        { title: "Ciclos — RAPPAA" },
        {
          name: "description",
          content:
            "Kin do dia, tom galáctico e selo maia: calculadora Tzolkin viva do Sincronário 13:20.",
        },
        { property: "og:title", content: "Ciclos — RAPPAA" },
        { property: "og:url", content: "/ciclos" },
      ],
      links: [
        { rel: "canonical", href: "/ciclos" },
        { rel: "preload", as: "image", href: todaySeal, fetchpriority: "high" },
      ],
    };
  },
  component: CiclosPage,
});


const COLOR_CLASS: Record<SealColor, { text: string; bg: string; border: string; ring: string }> = {
  vermelho: { text: "text-error", bg: "bg-error", border: "border-error/40", ring: "ring-error" },
  branco: { text: "text-on-surface", bg: "bg-on-surface", border: "border-on-surface/40", ring: "ring-on-surface" },
  azul: { text: "text-primary", bg: "bg-primary", border: "border-primary/40", ring: "ring-primary" },
  amarelo: { text: "text-tertiary", bg: "bg-tertiary", border: "border-tertiary/40", ring: "ring-tertiary" },
};

// 52 Portais de Ativação Galáctica (GAP) — Dreamspell / Sincronário 13:20
// Formam o "Tear do Tempo" (DNA duplo) que atravessa a Matriz Tzolkin
const PORTAL_KINS = new Set([
  1, 20, 22, 39, 43, 50, 51, 58, 64, 69, 72, 77,
  85, 88, 93, 96, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115,
  146, 147, 148, 149, 150, 151, 152, 153, 154, 155,
  165, 168, 173, 176, 184, 189, 192, 197, 203, 210, 211, 218,
  222, 239, 241, 260,
]);


const TABS = [
  { id: "matriz", label: "Matriz", icon: "grid_view" },
  { id: "selos", label: "Selos", icon: "brightness_5" },
  { id: "tons", label: "Tons", icon: "waves" },
  { id: "ciclos", label: "Ciclos", icon: "hub" },
  { id: "plasmas", label: "Plasmas", icon: "auto_awesome" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function CiclosPage() {
  const today = useMemo(() => kinFromDate(new Date()), []);
  const info = useMemo(() => getKinInfo(today), [today]);
  const colors = COLOR_CLASS[info.seal.color];
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabId>("matriz");
  const tabBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = tabBarRef.current;
    if (!bar) return;
    const btn = bar.querySelector<HTMLButtonElement>(`[data-tab="${tab}"]`);
    btn?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [tab]);

  return (
    <main className="pt-20 pb-32 min-h-screen relative">
      <div className="fixed inset-0 texture-overlay z-[-1]" aria-hidden />

      {/* sticky tab bar */}
      <div className="sticky top-[56px] z-30 bg-surface/90 backdrop-blur border-b border-on-surface/8">
        <div
          ref={tabBarRef}
          className="flex overflow-x-auto justify-center px-4 gap-1"
          style={{ scrollbarWidth: "none" }}
        >
          {TABS.map(({ id, label, icon }) => (
            <button
              key={id}
              data-tab={id}
              type="button"
              onClick={() => setTab(id)}
              className={[
                "flex items-center gap-1.5 px-3 py-3 whitespace-nowrap font-label-sm text-label-sm border-b-2 transition-colors flex-shrink-0",
                tab === id
                  ? "border-primary text-primary"
                  : "border-transparent text-on-surface-variant hover:text-on-surface",
              ].join(" ")}
            >
              <span
                className="material-symbols-outlined text-base"
                style={{ fontVariationSettings: tab === id ? "'FILL' 1" : "'FILL' 0" }}
              >
                {icon}
              </span>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-container-margin max-w-[720px] mx-auto pt-6">

        {/* MATRIZ */}
        {tab === "matriz" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-1">Estudo de Ciclos</h2>
              <p className="font-body-md text-on-surface-variant opacity-80">
                Toque um Kin da matriz para abrir a leitura completa.
              </p>
            </div>

            <div className="glass-panel p-4 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase">
                  Módulo 13:20
                </span>
                <Link
                  to="/ciclos/kin/$kin"
                  params={{ kin: String(today) }}
                  className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
                >
                  Kin de hoje: {today}
                  <span suppressHydrationWarning> · {new Date().toLocaleDateString("pt-BR", { day: "numeric", month: "short" })}</span>
                  {" →"}
                </Link>
              </div>
              <div className="tzolkin-matrix mb-2">
                {SEALS.map((seal) => (
                  <Fragment key={seal.index}>
                    <div className="tz-seal" title={`${seal.index}. ${seal.name}`}>
                      <img src={SEAL_IMAGE[seal.index]} alt={seal.name} className="w-full h-full object-contain" loading="lazy" />
                    </div>
                    {Array.from({ length: 13 }, (_, i) => {
                      const kin = seal.index + i * 20;
                      const tone = ((kin - 1) % 13) + 1;
                      const isPortal = PORTAL_KINS.has(kin);
                      const isToday = kin === today;
                      const cls = [
                        "tz-cell",
                        isPortal ? "tz-portal" : `tz-${seal.color}`,
                        isToday ? "tz-active" : "",
                      ].filter(Boolean).join(" ");
                      return (
                        <button
                          key={kin}
                          type="button"
                          aria-label={`Kin ${kin} — Tom ${tone} ${seal.name}`}
                          onClick={() => navigate({ to: "/ciclos/kin/$kin", params: { kin: String(kin) } })}
                          className={cls}
                        >
                          <ToneSymbol tone={tone} />
                          <span className="tz-num">{kin}</span>
                        </button>
                      );
                    })}
                  </Fragment>
                ))}
              </div>
              <div className="flex justify-between mt-4 items-center">
                <p className="font-label-sm text-label-sm text-on-surface-variant/60 italic">
                  {info.castle.name} · Kin {(info.castle.index - 1) * 52 + 1}–{info.castle.index * 52}
                </p>
                <div className="flex gap-3 items-center text-label-sm">
                  <span className="flex items-center gap-1 text-on-surface-variant/70">
                    <span className="w-2 h-2 rounded-full bg-error inline-block" /> hoje
                  </span>
                  <span className="flex items-center gap-1 text-on-surface-variant/70">
                    <span className="w-2 h-2 rounded-full bg-primary/40 inline-block" /> portal
                  </span>
                </div>
              </div>
            </div>

            <Link
              to="/ciclos/kin/$kin"
              params={{ kin: String(today) }}
              className="block glass-panel rounded-3xl p-6 hover:border-primary transition-colors border border-transparent"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 relative flex-shrink-0">
                  <div className={`absolute inset-0 ${colors.bg} rounded-full blur-lg opacity-30 soft-pulse`} />
                  <div className={`relative w-full h-full border-2 ${colors.border} rounded-full flex items-center justify-center p-2`}>
                    <img src={SEAL_IMAGE[info.seal.index]} alt={info.seal.name} className="w-full h-full object-contain" />
                  </div>
                </div>
                <div className="flex-1">
                  <span className={`font-label-sm text-label-sm ${colors.text} tracking-widest`} suppressHydrationWarning>KIN {info.kin} · HOJE · {new Date().toLocaleDateString("pt-BR", { day: "numeric", month: "short" })}</span>
                  <p className="font-title-lg text-title-lg text-on-surface">{info.fullName}</p>
                  <p className="font-body-sm text-on-surface-variant italic">Toque para abrir a leitura completa</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
              </div>
            </Link>

            <p className="text-center font-label-sm text-label-sm text-on-surface-variant/60">
              {SEALS.length} selos × {TONES.length} tons = 260 Kins · Sincronário 13:20
            </p>
          </div>
        )}

        {/* SELOS */}
        {tab === "selos" && (
          <div>
            <SealsSection todaySealIndex={info.seal.index} />
            <EarthFamiliesSection todaySealIndex={info.seal.index} />
          </div>
        )}

        {/* TONS */}
        {tab === "tons" && (
          <div>
            <TonesSection todayToneIndex={info.tone.index} />
            <CubicPatternSection />
          </div>
        )}

        {/* CICLOS */}
        {tab === "ciclos" && (
          <div className="space-y-6">
            <p className="font-body-md text-on-surface-variant/80">
              O <em>Tzolkin</em> é um calendário sagrado maia de 260 dias — a matriz do tempo natural
              que a tradição do Sincronário 13:20 (Dreamspell / José Argüelles) recupera como um
              instrumento vivo de sincronicidade. Cada Kin é um pulso único de consciência.
            </p>

            <div className="grid gap-3">
              <StudyCard icon="grid_view" title="Matriz de 260 Kins" body="20 selos solares × 13 tons galácticos geram 260 combinações irrepetíveis. Cada Kin é uma assinatura arquetípica do tempo — um dia, uma pessoa, um evento." />
              <StudyCard icon="waves" title="Onda Encantada · Trecena" body="Ciclo de 13 dias que começa em um selo com tom Magnético e completa uma jornada arquetípica. Cada Kin vive dentro de uma Onda — o contexto energético de 13 dias que dá sentido ao dia presente." />
              <StudyCard icon="hub" title="Oráculo dos 5 Kins" body="Cada Kin se relaciona com quatro outros: Guia (orienta), Analógico (apoia), Antípoda (desafia), Oculto (potência escondida — kin + oculto = 261). Juntos formam a Prancha do Destino do dia." />
              <StudyCard icon="auto_awesome" title="52 Portais Galácticos" body="Kins de ativação galáctica: dias em que o véu entre dimensões se afina. Aparecem em cinza-claro na matriz e convidam a rituais, sonhos lúcidos e escuta profunda." />
              <StudyCard icon="event" title="Ano Galáctico · 26 de julho" body="O ano do Sincronário começa em 26/07 (Kin do Ano) e é dividido em 13 luas de 28 dias + o Dia Fora do Tempo (25/07). O 29/02 é ignorado — o tempo Dreamspell é 13:20, não gregoriano." />
            </div>

            <CastlesSection todayKin={today} />

            <div className="glass-panel rounded-2xl p-5 border border-primary/20">
              <p className="font-label-sm text-label-sm mb-1 uppercase tracking-widest text-primary">
                Como usar no dia a dia
              </p>
              <p className="font-body-sm text-on-surface-variant/70 mb-4">
                Um ritual simples de poucos minutos — da manhã à noite.
              </p>
              <DailyFlowCards />
              <p className="font-body-sm text-on-surface-variant/70 mt-4 pt-3 border-t border-primary/10 flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-base flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <span>Em dias de <strong>Portal Galáctico</strong>, reserve um momento a mais de silêncio — são dias de escuta profunda.</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-label-sm">
              <a href="https://tzolkin.io/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-on-surface-variant/30 hover:border-primary hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-base">open_in_new</span>tzolkin.io
              </a>
              <a href="https://sincronariodapaz.org/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-on-surface-variant/30 hover:border-primary hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-base">open_in_new</span>sincronariodapaz.org
              </a>
            </div>
          </div>
        )}

        {/* PLASMAS */}
        {tab === "plasmas" && <PlasmasSection />}

      </div>
    </main>
  );
}

function StudyCard({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className="glass-panel rounded-2xl p-4 flex gap-3">
      <span className="material-symbols-outlined text-primary flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
        {icon}
      </span>
      <div>
        <p className="font-title-sm text-title-sm text-on-surface mb-1">{title}</p>
        <p className="font-body-sm text-on-surface-variant/80">{body}</p>
      </div>
    </div>
  );
}

function SealsSection({ todaySealIndex }: { todaySealIndex: number }) {
  return (
    <section className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="material-symbols-outlined text-primary">pets</span>
        <h4 className="font-title-lg text-title-lg text-on-surface">Os 20 Selos Solares</h4>
      </div>
      <p className="font-body-sm text-on-surface-variant/80 mb-4">
        Arquétipos-força do cosmos (Dragão, Vento, Noite… Sol). Cada selo carrega uma ação, uma essência e um poder. Agrupam-se em 4 famílias de cor: vermelho (iniciar), branco (refinar), azul (transformar), amarelo (amadurecer).
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SEALS.map((seal) => {
          const d = SEAL_DETAILS[seal.index];
          const c = COLOR_CLASS[seal.color];
          const firstKin = seal.index;
          const isToday = seal.index === todaySealIndex;
          return (
            <Link
              key={seal.index}
              to="/ciclos/kin/$kin"
              params={{ kin: String(firstKin) }}
              className={`group glass-panel rounded-xl p-4 border transition-all hover:border-primary ${
                isToday ? "border-primary" : "border-transparent"
              }`}
              title={`${seal.name} — ${seal.action}`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-full border-2 ${c.border} flex items-center justify-center bg-surface/40 flex-shrink-0 p-1.5 group-hover:scale-105 transition-transform`}>
                  <img src={SEAL_IMAGE[seal.index]} alt={seal.name} className="w-full h-full object-contain" loading="lazy" decoding="async" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-title-sm text-title-sm text-on-surface">
                    {seal.name} <span className="text-on-surface-variant font-normal">· {seal.maya}</span>
                  </p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant/70 mb-1">
                    {seal.action} · {seal.essence} · {seal.power}
                  </p>
                  {d && (
                    <p className="font-body-sm text-on-surface-variant/90 line-clamp-3">
                      {d.description}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <p className="font-label-sm text-label-sm text-on-surface-variant/60 mt-3 text-center italic">
        Arte dos selos: <a href="https://tzolkin.io" target="_blank" rel="noreferrer" className="underline hover:text-primary">tzolkin.io</a>
      </p>
    </section>
  );
}

function TonesSection({ todayToneIndex }: { todayToneIndex: number }) {
  const [open, setOpen] = useState<number | null>(todayToneIndex);
  return (
    <section className="mt-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="material-symbols-outlined text-primary">graphic_eq</span>
        <h4 className="font-title-lg text-title-lg text-on-surface">Os 13 Tons Galácticos</h4>
      </div>
      <p className="font-body-sm text-on-surface-variant/90 mb-2">
        Pulsações de criação (Magnético → Cósmico) que ditam o ritmo da manifestação:
        propósito, desafio, ativação, forma, radiância, equilíbrio, sintonização, harmonia,
        intenção, manifestação, libertação, cooperação, transcendência.
      </p>
      <p className="font-body-sm text-on-surface-variant/80 mb-4">
        Cada tom é uma vibração que modela o fluxo do dia. O tom de hoje aparece destacado —
        toque para abrir a descrição completa.
      </p>
      <div className="grid gap-2">
        {TONES.map((t) => {
          const d = TONE_DETAILS[t.index];
          const isToday = t.index === todayToneIndex;
          const isOpen = open === t.index;
          return (
            <div
              key={t.index}
              className={`glass-panel rounded-xl overflow-hidden border ${
                isToday ? "border-primary" : "border-transparent"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : t.index)}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-surface/40 transition"
                aria-expanded={isOpen}
              >
                <div className="w-10 h-10 rounded-full border-2 border-primary/40 flex items-center justify-center font-title-sm bg-surface/40 flex-shrink-0">
                  <ToneSymbol tone={t.index} size={20} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-title-sm text-title-sm text-on-surface">
                    {t.name} <span className="text-on-surface-variant font-normal">· {t.maya}</span>
                  </p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant/70 truncate">
                    {t.action} · {t.essence} · {t.power}
                  </p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">
                  {isOpen ? "expand_less" : "expand_more"}
                </span>
              </button>
              {isOpen && d && (
                <div className="px-4 pb-4 pt-1 border-t border-outline-variant/20">
                  <p className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-1">
                    {d.vibration}
                  </p>
                  <p className="font-body-md text-on-surface mb-2 italic">{d.summary}</p>
                  <p className="font-body-sm text-on-surface-variant/90">{d.guidance}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="font-label-sm text-label-sm text-on-surface-variant/60 mt-3 text-center italic">
        Fonte: EssênciaAlma — Modelando o Fluxo
      </p>
    </section>
  );
}

function CubicPatternSection() {
  const s = sincronarioDate(new Date());
  const activeToday = !s.dayOutOfTime ? cubeDayOfMoon(s.day) : null;
  const colorClass: Record<SealColor, string> = {
    vermelho: "text-error border-error/40 bg-error/5",
    branco: "text-on-surface border-on-surface/40 bg-on-surface/5",
    azul: "text-primary border-primary/40 bg-primary/5",
    amarelo: "text-tertiary border-tertiary/40 bg-tertiary/5",
  };
  return (
    <section className="mt-8 mb-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="material-symbols-outlined text-primary">deployed_code</span>
        <h4 className="font-title-lg text-title-lg text-on-surface">Pátron Cúbico Primário</h4>
      </div>
      <p className="font-body-sm text-on-surface-variant/80 mb-4">
        Os 16 dias centrais de cada Lua (dia 9 ao 24) formam o <strong>Cubo da Lei</strong> — meditação Telektonon.
        Dias 9–16 constroem o <em>Cubo do Chumbo</em> (transmutação da matéria); dias 17–24 revelam o
        <em> Cubo do Ouro</em> (profecia da consciência). Cada dia carrega um códon-tema, uma face do cubo e uma pulsação.
      </p>

      {activeToday && (
        <div className={`glass-panel rounded-2xl p-5 mb-4 border-2 ${colorClass[activeToday.color]}`}>
          <p className="font-label-sm text-label-sm uppercase tracking-widest mb-1 opacity-80">
            Dia {activeToday.moonDay} da lua · Cubo {activeToday.phase === "chumbo" ? "do Chumbo" : "do Ouro"} · Face {activeToday.face}
          </p>
          <p className="font-title-lg text-title-lg">
            {activeToday.index}. {activeToday.codon} — {activeToday.action}
          </p>
          <p className="font-body-md text-on-surface italic mt-2">"{activeToday.focus}"</p>
        </div>
      )}

      {!activeToday && (
        <div className="glass-panel rounded-2xl p-4 mb-4 border border-outline-variant/30">
          <p className="font-body-sm text-on-surface-variant">
            Hoje é dia {s.dayOutOfTime ? "Fora do Tempo" : s.day} — {s.dayOutOfTime ? "descanso do Cubo" : "fora dos 16 dias do Cubo"}.
            O Pátron desperta novamente no <strong>dia 9</strong> da próxima Lua.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        {CUBE_DAYS.map((c) => {
          const isToday = activeToday?.index === c.index;
          return (
            <div
              key={c.index}
              className={`glass-panel rounded-xl p-3 border ${
                isToday ? "border-primary" : "border-transparent"
              } ${colorClass[c.color].split(" ").slice(-1)[0]}`}
            >
              <div className="flex items-baseline justify-between mb-1">
                <span className={`font-title-sm text-title-sm ${colorClass[c.color].split(" ")[0]}`}>
                  {c.index}. {c.codon}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant/60">
                  L·{c.moonDay}
                </span>
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant/80">
                {c.face} · {c.action}
              </p>
              <p className="font-label-sm text-label-sm text-on-surface-variant/60 italic mt-1 line-clamp-2">
                {c.focus}
              </p>
            </div>
          );
        })}
      </div>
      <p className="font-label-sm text-label-sm text-on-surface-variant/60 mt-3 text-center italic">
        Meditação do Telektonon · 16 códons do Cubo da Lei
      </p>
    </section>
  );
}

function PlasmasSection() {
  const today = plasmaOfDay(new Date());
  const colorClass: Record<SealColor, string> = {
    vermelho: "text-error border-error/40",
    branco: "text-on-surface border-on-surface/40",
    azul: "text-primary border-primary/40",
    amarelo: "text-tertiary border-tertiary/40",
  };
  return (
    <section className="mt-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="material-symbols-outlined text-primary">blur_on</span>
        <h4 className="font-title-lg text-title-lg text-on-surface">Plasmas Radiais</h4>
      </div>
      <div className="glass-panel rounded-2xl p-4 mb-4 border border-outline-variant/30 space-y-3">
        <p className="font-body-sm text-on-surface-variant/90">
          Os 7 Plasmas Radiais vêm à Terra a partir de <strong>Hunab Ku</strong> — o centro da
          galáxia — e são reconhecidos também no magma do centro do planeta. A descoberta se dá
          em <em>Ciência Cósmica</em>, de <strong>Enrique Castillo Rincón</strong> (1986), texto
          que chegou às mãos de <strong>José Argüelles</strong> antes de <em>O Fator Maia</em> e
          serviu como âncora ao livro.
        </p>
        <p className="font-body-sm text-on-surface-variant/90">
          Na cosmologia dos PR, cada plasma deriva de <strong>12 linhas eletrônicas de força</strong>,
          formadas pela combinação de 2 dos <strong>6 tipos de eletricidade cósmica primária</strong>.
          Essas 12 linhas constituem o <strong>Pátron Cúbico Primário</strong> — a matriz elétrica que
          preenche o espaço interestelar em camadas ou estrias de plasma energético.
        </p>
        <p className="font-body-sm text-on-surface-variant/90">
          Os símbolos dos 7 plasmas lembram os 7 dias da criação. Substituem em nós a 2ª e 3ª leis
          por partículas elétricas carregadas que <strong>ativam nosso campo magnético</strong>,
          potencializam os 7 chakras principais e realizam a transferência de carga do centro
          da Terra para o corpo. É a interrelação com o <em>Budismo</em> (livro de Padma Sambhava):
          <span className="ml-1 font-title-sm text-primary">Alegria + Amor = Apreço</span>.
        </p>
        <p className="font-body-sm text-on-surface-variant/90 italic">
          Sentir as palavras a partir do coração, do sentir e do aplicar no dia a dia.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-2 mb-4">
        <div className="glass-panel rounded-xl p-3 border border-amarelo/30">
          <p className="font-label-sm text-label-sm uppercase tracking-widest text-tertiary mb-1">Quantum Sensorial</p>
          <p className="font-title-sm text-title-sm text-on-surface">Dali · Seli · Gamma</p>
          <p className="font-label-sm text-label-sm text-on-surface-variant/70 mt-1">
            Os 3 primeiros: percepção pelos órgãos dos sentidos e conexão com a matéria.
          </p>
        </div>
        <div className="glass-panel rounded-xl p-3 border border-primary/40">
          <p className="font-label-sm text-label-sm uppercase tracking-widest text-primary mb-1">Catalisador</p>
          <p className="font-title-sm text-title-sm text-primary">Kali (único azul)</p>
          <p className="font-label-sm text-label-sm text-on-surface-variant/70 mt-1">
            Liga os 3 primeiros aos 3 últimos — transmuta o quantum sensorial em telepático.
          </p>
        </div>
        <div className="glass-panel rounded-xl p-3 border border-outline-variant/40">
          <p className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface mb-1">Quantum Telepático</p>
          <p className="font-title-sm text-title-sm text-on-surface">Alpha · Limi · Silio</p>
          <p className="font-label-sm text-label-sm text-on-surface-variant/70 mt-1">
            Recebemos e transmitimos informação mental independente dos sentidos físicos —
            silenciar os sentidos e deixar os "outros" agirem.
          </p>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-5 mb-4 border border-primary/30">
        <div className="flex items-start gap-4 mb-3">
          <PlasmaSymbol index={today.index} color={today.color} size={64} />
          <div className="flex-1 min-w-0">
            <p className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-1">
              Plasma de hoje · {today.day}
            </p>
            <p className={`font-title-lg text-title-lg ${colorClass[today.color].split(" ")[0]}`}>
              {today.name} — {today.action}
            </p>
            <p className="font-body-sm text-on-surface-variant mt-1">
              {today.chakraSanskrit ? `${today.chakra} · ${today.chakraSanskrit}` : today.chakra}
            </p>
          </div>
        </div>
        <p className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant/70 mb-1">
          Qualidade
        </p>
        <p className="font-title-md text-title-md text-on-surface mb-2">{today.quality}</p>
        <p className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant/70 mb-1">
          Mantra
        </p>
        <p className="font-body-md text-on-surface italic mb-3">"{today.mantra}"</p>
        {today.essence && (
          <p className="font-body-sm text-on-surface-variant/85 mb-3">{today.essence}</p>
        )}
        <div className="flex flex-wrap gap-2 text-label-sm text-on-surface-variant/80 mb-3">
          {today.mantraSolar && (
            <span className="px-2 py-1 rounded-full bg-primary/20 text-primary font-mono tracking-widest">
              Mantra Solar · {today.mantraSolar}
            </span>
          )}
          <span className="px-2 py-1 rounded-full bg-surface-container-high">Chakra: {today.chakra}</span>
          {today.chakraIdentity && (
            <span className="px-2 py-1 rounded-full bg-surface-container-high">{today.chakraIdentity}</span>
          )}
          {today.element && (
            <span className="px-2 py-1 rounded-full bg-surface-container-high">Elemento: {today.element}</span>
          )}
          {today.frequency && (
            <span className="px-2 py-1 rounded-full bg-surface-container-high">Freq.: {today.frequency}</span>
          )}
        </div>
        {(today.center || today.balance || today.governs || today.ageCycle) && (
          <div className="grid gap-2 sm:grid-cols-2 text-sm text-on-surface-variant/85">
            {today.center && <p>{today.center}</p>}
            {today.balance && <p>{today.balance}</p>}
            {today.governs && <p>{today.governs}</p>}
            {today.ageCycle && <p>Ciclo biográfico: {today.ageCycle}</p>}
          </div>
        )}
      </div>

      <div className="grid gap-2">
        {PLASMAS.map((p) => {
          const isToday = p.index === today.index;
          return (
            <div
              key={p.index}
              className={`glass-panel rounded-xl p-3 border ${
                isToday ? "border-primary" : "border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <PlasmaSymbol index={p.index} color={p.color} size={44} />

                <div className="flex-1 min-w-0">
                  <p className="font-title-sm text-title-sm text-on-surface">
                    {p.name} · <span className="text-on-surface-variant font-normal">{p.quality}</span>
                  </p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant/70">
                    {p.day} · {p.chakraSanskrit ? `${p.chakra} (${p.chakraSanskrit})` : p.chakra}
                  </p>
                  {p.essence && (
                    <p className="font-label-sm text-label-sm text-on-surface-variant/60 mt-1">
                      {p.essence}
                    </p>
                  )}
                  <p className="font-body-sm text-on-surface/90 italic mt-2 sm:hidden">
                    "{p.mantra}"
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  {p.mantraSolar && (
                    <span className="font-mono text-primary text-sm tracking-widest">{p.mantraSolar}</span>
                  )}
                  <span className="font-label-sm text-label-sm text-on-surface-variant/70 italic hidden sm:block max-w-[240px] text-right">
                    "{p.mantra}"
                  </span>
                </div>
              </div>
              {(p.chakraIdentity || p.element || p.ageCycle || p.frequency) && (
                <div className="mt-3 flex flex-wrap gap-2 text-label-sm text-on-surface-variant/80">
                  {p.chakraIdentity && (
                    <span className="px-2 py-1 rounded-full bg-surface-container-high">{p.chakraIdentity}</span>
                  )}
                  {p.element && (
                    <span className="px-2 py-1 rounded-full bg-surface-container-high">Elemento: {p.element}</span>
                  )}
                  {p.frequency && (
                    <span className="px-2 py-1 rounded-full bg-surface-container-high">Freq.: {p.frequency}</span>
                  )}
                  {p.ageCycle && (
                    <span className="px-2 py-1 rounded-full bg-surface-container-high">{p.ageCycle}</span>
                  )}
                </div>
              )}
              {(p.center || p.balance || p.governs) && (
                <div className="mt-3 space-y-1 text-sm text-on-surface-variant/85">
                  {p.center && <p>{p.center}</p>}
                  {p.balance && <p>{p.balance}</p>}
                  {p.governs && <p>{p.governs}</p>}
                </div>
              )}
              <PlasmaWordsEditor plasmaIndex={p.index} color={p.color} />
            </div>
          );
        })}
      </div>

      <div className="glass-panel rounded-2xl p-5 mt-4 border border-outline-variant/30">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-primary">self_improvement</span>
          <h5 className="font-title-md text-title-md text-on-surface">A prática semanal</h5>
        </div>
        <p className="font-body-sm text-on-surface-variant/90 mb-3">
          No Sincronário da Paz cada dia é dedicado a um plasma. A ativação diária é uma preparação
          para a meditação do Kin:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-on-surface-variant/90 marker:text-primary">
          <li>Recitar o mantra do plasma do dia.</li>
          <li>Concentrar a atenção no chakra correspondente.</li>
          <li>Visualizar sua cor.</li>
          <li>Respirar profundamente.</li>
          <li>Perceber o fluxo da energia entre o corpo e a Terra.</li>
        </ul>
      </div>

      <div className="glass-panel rounded-2xl p-5 mt-4 border border-primary/30">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-primary">hub</span>
          <h5 className="font-title-md text-title-md text-on-surface">Correspondências avançadas</h5>
        </div>
        <p className="font-body-sm text-on-surface-variant/90 mb-3">
          Nas práticas do <em>Telektonon</em>, <em>Sincronotron</em> e da <em>Heptada</em>, os 7 Plasmas
          Radiais se articulam simultaneamente com múltiplas séries de 7 — a arquitetura simbólica
          desenvolvida por Valum Votan e Stephanie South:
        </p>
        <div className="grid sm:grid-cols-2 gap-2 text-sm text-on-surface-variant/85">
          <p>• 7 Chakras principais</p>
          <p>• 7 dias da semana</p>
          <p>• 7 anos da Profecia</p>
          <p>• 7 Bolontiku</p>
          <p>• 7 Tons da Heptada</p>
          <p>• 7 Selos ocultos</p>
          <p>• Circuito dos elétrons mentais</p>
          <p>• Tartaruga das Sete Placas</p>
        </div>
      </div>
    </section>
  );
}

const wordsColor: Record<SealColor, string> = {
  vermelho: "bg-error/15 text-error border-error/30",
  branco: "bg-on-surface/10 text-on-surface border-on-surface/30",
  azul: "bg-primary/15 text-primary border-primary/30",
  amarelo: "bg-tertiary/15 text-tertiary border-tertiary/30",
};

function PlasmaWordsEditor({ plasmaIndex, color }: { plasmaIndex: number; color: SealColor }) {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [draft, setDraft] = useState("");

  const { data: words = [] } = useQuery({
    queryKey: ["plasma_words", user?.id, plasmaIndex],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("plasma_words")
        .select("words")
        .eq("user_id", user!.id)
        .eq("plasma_index", plasmaIndex)
        .maybeSingle();
      if (error) throw error;
      return (data?.words as string[] | undefined) ?? [];
    },
  });

  const save = useMutation({
    mutationFn: async (next: string[]) => {
      const { error } = await supabase
        .from("plasma_words")
        .upsert(
          { user_id: user!.id, plasma_index: plasmaIndex, words: next, updated_at: new Date().toISOString() },
          { onConflict: "user_id,plasma_index" },
        );
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["plasma_words", user?.id, plasmaIndex] }),
  });

  if (!user) return null;

  const addWord = () => {
    const w = draft.trim();
    if (!w) return;
    if (words.includes(w)) {
      setDraft("");
      return;
    }
    const next = [...words, w].slice(0, 20);
    setDraft("");
    save.mutate(next);
  };

  const removeWord = (w: string) => {
    save.mutate(words.filter((x) => x !== w));
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addWord();
    }
  };

  return (
    <div className="mt-3 pt-3 border-t border-outline-variant/20">
      <div className="flex flex-wrap gap-1.5 mb-2 min-h-6">
        {words.length === 0 && (
          <span className="font-label-sm text-label-sm text-on-surface-variant/50 italic">
            Suas palavras para {PLASMAS[plasmaIndex - 1].name}…
          </span>
        )}
        {words.map((w) => (
          <button
            key={w}
            type="button"
            onClick={() => removeWord(w)}
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-label-sm ${wordsColor[color]} hover:opacity-70 transition`}
            title="Remover"
          >
            {w}
            <span className="material-symbols-outlined text-[14px] leading-none">close</span>
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKey}
          placeholder="ex: focaliza, ativa, flecha no alvo"
          maxLength={40}
          className="flex-1 bg-surface/60 border border-outline-variant/30 rounded-lg px-3 py-1.5 text-label-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary"
        />
        <button
          type="button"
          onClick={addWord}
          disabled={!draft.trim() || save.isPending}
          className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-label-sm font-medium disabled:opacity-40"
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}

function EarthFamiliesSection({ todaySealIndex }: { todaySealIndex: number }) {
  const todayFamily = getEarthFamily(todaySealIndex).index;
  const [open, setOpen] = useState<number | null>(todayFamily);
  return (
    <section className="mt-8 mb-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="material-symbols-outlined text-primary">groups</span>
        <h4 className="font-title-lg text-title-lg text-on-surface">Famílias Planetárias (Terrestres)</h4>
      </div>
      <p className="font-body-sm text-on-surface-variant/80 mb-4">
        Cada Família Planetária reúne 4 Selos Solares (um de cada cor) e forma uma região do Hólon
        Planetário — o corpo do planeta como ser vivo. Cinco famílias × quatro selos = os 20
        arquétipos, articulados como membros de um mesmo corpo.
      </p>
      <div className="grid gap-2">
        {EARTH_FAMILIES.map((fam) => {
          const isToday = fam.index === todayFamily;
          const isOpen = open === fam.index;
          return (
            <div
              key={fam.index}
              className={`glass-panel rounded-xl overflow-hidden border ${isToday ? "border-primary" : "border-transparent"}`}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : fam.index)}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-surface/40 transition"
                aria-expanded={isOpen}
              >
                <div className="w-10 h-10 rounded-full border-2 border-primary/40 flex items-center justify-center bg-surface/40 flex-shrink-0 text-primary font-semibold">
                  {fam.index}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-title-sm text-title-sm text-on-surface">{fam.name}</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant/70 truncate">
                    {fam.function} · {fam.bodyRegion}
                  </p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">
                  {isOpen ? "expand_less" : "expand_more"}
                </span>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-1 border-t border-outline-variant/20">
                  <p className="font-body-md text-on-surface mb-3">{fam.description}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {fam.seals.map((s) => {
                      const seal = SEALS[s - 1];
                      const c = COLOR_CLASS[seal.color];
                      const isSelf = s === todaySealIndex;
                      return (
                        <Link
                          key={s}
                          to="/ciclos/kin/$kin"
                          params={{ kin: String(s) }}
                          className={`flex items-center gap-2 px-2 py-1 rounded-full border text-label-sm ${c.border} ${c.text} bg-surface/40 hover:border-primary ${isSelf ? "ring-1 ring-primary" : ""}`}
                        >
                          <img src={SEAL_IMAGE[s]} alt={seal.name} className="w-5 h-5" />
                          {seal.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CastlesSection({ todayKin }: { todayKin: number }) {
  const todayCastle = getCastleOfKin(todayKin).index;
  return (
    <section className="mt-8 mb-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="material-symbols-outlined text-primary">castle</span>
        <h4 className="font-title-lg text-title-lg text-on-surface">Os 5 Castelos do Destino</h4>
      </div>
      <p className="font-body-sm text-on-surface-variant/80 mb-4">
        A matriz se divide em 5 castelos de 52 Kins (4 ondas cada): Vermelho do Girar (nascer), Branco do Cruzar (refinar), Azul do Queimar (transformar), Amarelo do Dar (amadurecer) e Verde do Encantar (sintetizar).
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[1, 2, 3, 4, 5].map((idx) => {
          const c = CASTLE_DETAILS[idx];
          const isToday = idx === todayCastle;
          return (
            <div
              key={idx}
              className={`glass-panel rounded-xl p-4 border transition-all hover:border-primary ${
                isToday ? "border-primary" : "border-transparent"
              }`}
              title={`${c.name} — Kin ${c.kinRange[0]}–${c.kinRange[1]}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl border-2 border-primary/40 flex items-center justify-center bg-surface/40 flex-shrink-0 text-primary font-semibold">
                  {idx}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-title-sm text-title-sm text-on-surface">
                    {c.name} <span className="text-on-surface-variant font-normal">· {c.color}</span>
                  </p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant/70 mb-1">
                    {c.action} · {c.power} · Kin {c.kinRange[0]}–{c.kinRange[1]}
                  </p>
                  <p className="font-body-sm text-on-surface-variant/90 line-clamp-3">
                    {c.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}