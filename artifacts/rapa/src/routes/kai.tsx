import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { History, Sparkles, Lightbulb, Send } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { askKai } from "@/lib/kai.functions";

export const Route = createFileRoute("/kai")({
  head: () => ({
    meta: [
      { title: "KAI — RAPA" },
      { name: "description", content: "KAI, seu mentor de consciência. Diálogo contextual guiado pelo seu humor e filosofia." },
      { property: "og:title", content: "KAI — Mentor de Consciência" },
    ],
    links: [{ rel: "canonical", href: "/kai" }],
  }),
  component: KaiPage,
});

type Msg = { role: "user" | "assistant"; content: string; ts: string };

const QUICK_REPLIES = [
  { label: "Ver padrões", icon: History, prompt: "Ajude-me a perceber os padrões da minha energia nesta semana." },
  { label: "Sabedoria do dia", icon: Sparkles, prompt: "Traga uma reflexão profunda a partir da minha filosofia atual." },
  { label: "Aprofundar", icon: Lightbulb, prompt: "Vamos aprofundar. Me leve mais fundo no que estou vivendo agora." },
];

function nowLabel() {
  return "Agora";
}

function KaiPage() {
  const { user } = useAuth();
  const fn = useServerFn(askKai);
  const displayName =
    (user?.user_metadata?.display_name as string | undefined)?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "peregrino";

  const [messages, setMessages] = useState<Msg[]>(() => [
    {
      role: "assistant",
      content: `Bem-vindo de volta, ${displayName}. Sinto que sua energia hoje busca clareza. Por onde deseja iniciar nossa jornada de consciência?`,
      ts: nowLabel(),
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const askMut = useMutation({
    mutationFn: (msgs: Msg[]) =>
      fn({ data: { messages: msgs.map(({ role, content }) => ({ role, content })) } }),
    onSuccess: (res) =>
      setMessages((m) => [...m, { role: "assistant", content: res.text, ts: nowLabel() }]),
    onError: (e: Error) => {
      toast.error(e.message);
      setMessages((m) => m.slice(0, -1));
    },
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, askMut.isPending]);

  function send(text: string) {
    const q = text.trim();
    if (!q || askMut.isPending) return;
    const next: Msg[] = [...messages, { role: "user", content: q, ts: nowLabel() }];
    setMessages(next);
    setInput("");
    askMut.mutate(next);
  }

  if (!user) {
    return (
      <main className="pt-24 pb-32 px-container-margin max-w-[720px] mx-auto min-h-screen text-center">
        <div className="kai-orb mb-8 mx-auto"><div className="kai-orb-core" /></div>
        <h2 className="font-display-lg text-display-lg text-primary mb-2">KAI</h2>
        <p className="text-on-surface-variant mb-6">Entre para dialogar com seu mentor de consciência.</p>
        <Link to="/auth" className="btn-primary">Entrar</Link>
      </main>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Chat area */}
      <main
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-container-margin pt-20 pb-56 max-w-[720px] mx-auto w-full space-y-5"
      >
        {/* KAI identity */}
        <section className="flex flex-col items-center py-6 space-y-4">
          <div
            className={`kai-orb transition-transform ${
              askMut.isPending ? "kai-orb-thinking" : input.trim() ? "kai-orb-typing" : ""
            }`}
          >
            <div className="kai-orb-core" />
          </div>
          <div className="text-center">
            <h2 className="font-display-lg text-display-lg text-primary tracking-widest">KAI</h2>
            <p className="text-on-surface-variant text-sm italic">Mentor de Consciência</p>
          </div>
        </section>

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-500`}
          >
            <div
              className={`max-w-[85%] p-4 rounded-3xl ${
                m.role === "user"
                  ? "bg-primary-container/40 border border-primary/30 text-on-surface rounded-br-md"
                  : "glass-card text-on-surface rounded-bl-md"
              }`}
            >
              <p className="font-body-md text-body-md leading-relaxed whitespace-pre-wrap">{m.content}</p>
              <span className="text-[10px] uppercase tracking-widest text-on-surface-variant/70 mt-2 block">
                {m.role === "assistant" ? "KAI" : "VOCÊ"} • {m.ts}
              </span>
            </div>
          </div>
        ))}

        {askMut.isPending && (
          <div className="flex justify-start">
            <div className="glass-card p-4 rounded-3xl rounded-bl-md">
              <div className="flex space-x-1.5">
                <span className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Fixed composer */}
      <footer className="fixed bottom-20 left-0 right-0 z-20 px-container-margin pt-8 pb-3 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none">
        <div className="max-w-[720px] mx-auto space-y-3 pointer-events-auto">
          {/* Quick replies */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
            {QUICK_REPLIES.map((r) => {
              const Icon = r.icon;
              return (
                <button
                  key={r.label}
                  onClick={() => send(r.prompt)}
                  disabled={askMut.isPending}
                  className="shrink-0 flex items-center gap-2 px-4 py-2 glass-card rounded-full text-sm text-on-surface hover:bg-surface-container-high transition-colors disabled:opacity-50"
                >
                  <Icon size={14} className="text-tertiary" />
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>

          {/* Input */}
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Refletir com KAI…"
              className="w-full glass-card rounded-2xl py-4 pl-5 pr-14 text-body-lg focus:outline-none focus:border-primary transition-all placeholder:text-on-surface-variant/50"
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || askMut.isPending}
              aria-label="Enviar"
              className="absolute right-2 top-1/2 -translate-y-1/2 btn-icon-primary rounded-xl"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
