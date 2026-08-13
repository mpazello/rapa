import { useState, useRef, useMemo, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { kinFromDate, getKinInfo } from "@/lib/tzolkin";
import { KinBadge } from "@/components/KinBadge";

const DAILY_FLOW_STEPS = [
  {
    icon: "wb_twilight",
    when: "Ao acordar",
    title: "Sintonize o Kin de hoje",
    body: "Leia a afirmação galáctica em voz alta e deixe que ela dê o tom da sua manhã.",
  },
  {
    icon: "waves",
    when: "Durante o dia",
    title: "Situe-se na Onda",
    body: "Em qual dos 13 tons você está? Início, ápice ou fechamento do ciclo — cada fase pede um ritmo diferente.",
  },
  {
    icon: "hub",
    when: "Nos encontros",
    title: "Consulte o Oráculo",
    body: "Perceba quem te guia, quem te apoia e quem te desafia hoje — inclusive nas pessoas que cruzam o seu caminho.",
  },
  {
    icon: "edit_note",
    when: "Antes de dormir",
    title: "Registre no Diário",
    body: "Anote como a energia do dia se manifestou. Com o tempo, os padrões das suas Ondas ficam visíveis.",
  },
];

export function DailyFlowCards({ onClose }: { onClose?: () => void }) {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const total = DAILY_FLOW_STEPS.length;
  const todayKin = useMemo(() => kinFromDate(new Date()), []);
  const kinInfo = useMemo(() => getKinInfo(todayKin), [todayKin]);
  const todayTrecenaStart = useMemo(() => kinInfo.trecena.kinStart, [kinInfo]);
  const go = (dir: number) => setActive((a) => Math.min(total - 1, Math.max(0, a + dir)));

  return (
    <div>
      <div
        className="relative overflow-hidden"
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchStartX.current = null;
        }}
      >
        <ol
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {DAILY_FLOW_STEPS.map((step, i) => (
            <li key={step.title} className="w-full flex-shrink-0 px-0.5">
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 flex flex-col gap-2 min-h-[150px]">
                <div className="flex items-center justify-between">
                  <span className="w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {step.icon}
                    </span>
                  </span>
                  <span className="font-label-sm text-label-sm text-primary/50">{i + 1} / {total}</span>
                </div>
                <p className="font-label-sm text-label-sm uppercase tracking-wider text-primary/70">{step.when}</p>
                <p className="font-body-sm font-semibold text-on-surface">{step.title}</p>
                <p className="font-body-sm text-on-surface-variant/90">{step.body}</p>
                {i === 0 && (
                  <>
                    <div className="flex items-center gap-4 my-1">
                      <div className="flex-shrink-0 w-14 h-14">
                        <KinBadge kin={todayKin} eager className="w-full h-full" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-label-sm text-label-sm uppercase tracking-wider text-primary/60 mb-0.5">
                          Kin {todayKin} · {kinInfo.seal.name}
                        </p>
                        <p className="font-body-sm text-on-surface-variant/90 italic leading-snug line-clamp-3">
                          "{kinInfo.affirmation}"
                        </p>
                      </div>
                    </div>
                    {/* Mantra galáctico */}
                    <div className="border-l-2 border-primary/30 pl-3 space-y-0.5 my-1">
                      {kinInfo.mantra.slice(0, 4).map((line, i) => (
                        <p key={i} className={`font-body-sm leading-snug ${i === 0 ? "text-on-surface font-medium" : "text-on-surface-variant/80"}`}>
                          {line}
                        </p>
                      ))}
                      <p className="font-body-sm text-on-surface-variant/50 italic pt-1">{kinInfo.mantra[4]}</p>
                    </div>
                    <Link
                      to="/ciclos/kin/$kin"
                      params={{ kin: String(todayKin) }}
                      onClick={onClose}
                      className="mt-1 self-start inline-flex items-center gap-1 text-primary font-label-sm text-label-sm hover:underline"
                    >
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                      Abrir Kin {todayKin} de hoje
                    </Link>
                  </>
                )}
                {i === 1 && (
                  <Link
                    to="/ciclos/kin/$kin"
                    params={{ kin: String(todayTrecenaStart) }}
                    onClick={onClose}
                    className="mt-1 self-start inline-flex items-center gap-1 text-primary font-label-sm text-label-sm hover:underline"
                  >
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                    Ver minha Onda atual (Kin {todayTrecenaStart})
                  </Link>
                )}
                {i === 2 && (
                  <Link
                    to="/ciclos/kin/$kin"
                    params={{ kin: String(todayKin) }}
                    onClick={onClose}
                    className="mt-1 self-start inline-flex items-center gap-1 text-primary font-label-sm text-label-sm hover:underline"
                  >
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                    Abrir o Oráculo do dia
                  </Link>
                )}
                {i === 3 && (
                  <Link
                    to="/jornada"
                    onClick={onClose}
                    className="mt-1 self-start inline-flex items-center gap-1 text-primary font-label-sm text-label-sm hover:underline"
                  >
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                    Ir para o Diário
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="flex items-center justify-between mt-3">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={active === 0}
          aria-label="Passo anterior"
          className="w-9 h-9 rounded-full border border-primary/30 text-primary flex items-center justify-center disabled:opacity-30 hover:bg-primary/10 transition-colors"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
        </button>
        <div className="flex gap-2">
          {DAILY_FLOW_STEPS.map((step, i) => (
            <button
              key={step.title}
              type="button"
              aria-label={`Ir para o passo ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-primary" : "w-2 bg-primary/25"}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={active === total - 1}
          aria-label="Próximo passo"
          className="w-9 h-9 rounded-full border border-primary/30 text-primary flex items-center justify-center disabled:opacity-30 hover:bg-primary/10 transition-colors"
        >
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}

export function DailyRitualModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [dateLabel, setDateLabel] = useState("");
  useEffect(() => {
    setDateLabel(
      new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })
    );
  }, []);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden />

      {/* sheet */}
      <div
        className="relative z-10 w-full sm:max-w-sm mx-auto bg-surface rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* drag handle (mobile) */}
        <div className="w-10 h-1 rounded-full bg-on-surface/20 mx-auto mb-5 sm:hidden" />

        <div className="flex items-start justify-between mb-1">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-primary text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              self_improvement
            </span>
            <div>
              <h2 className="font-title-lg text-title-lg text-on-surface leading-tight">Ritual do dia</h2>
              {dateLabel && (
                <p className="font-label-sm text-label-sm text-primary/60 leading-tight">
                  {dateLabel}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="w-8 h-8 rounded-full hover:bg-surface-container-low flex items-center justify-center text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        <p className="font-body-sm text-on-surface-variant/70 mb-4">
          Um ritual simples de poucos minutos — da manhã à noite.
        </p>

        <DailyFlowCards onClose={onClose} />

        <p className="font-body-sm text-on-surface-variant/70 mt-4 pt-3 border-t border-primary/10 flex items-start gap-2">
          <span
            className="material-symbols-outlined text-primary text-base flex-shrink-0"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            auto_awesome
          </span>
          <span>
            Em dias de <strong>Portal Galáctico</strong>, reserve um momento extra de silêncio — são dias de escuta profunda.
          </span>
        </p>
      </div>
    </div>
  );
}
