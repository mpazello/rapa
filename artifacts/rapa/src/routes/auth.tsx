import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Entrar — RAPPAA" },
      { name: "description", content: "Entre ou crie sua conta na RAPPAA para iniciar sua jornada." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && session) navigate({ to: "/perfil", replace: true });
  }, [loading, session, navigate]);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/redefinir-senha`,
        });
        // Mensagem genérica sempre — não revela se o email tem conta.
        if (error) console.error("resetPasswordForEmail:", error.message);
        toast.success("Se este email tiver conta, o link de redefinição foi enviado.");
        setMode("signin");
        return;
      }
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: displayName || email.split("@")[0] },
          },
        });
        if (error) throw error;
        toast.success("Conta criada. Bem-vindo(a) à RAPPAA.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate({ to: "/perfil", replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao autenticar");
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setBusy(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      toast.error(error.message ?? "Erro ao entrar com Google");
      setBusy(false);
    }
    // on success the browser navigates away — no need to setBusy(false)
  }

  return (
    <main className="pt-24 pb-32 px-container-margin max-w-[440px] mx-auto min-h-screen">
      <div className="text-center mb-8">
        <h1 className="font-serif text-4xl mb-2">
          {mode === "signin" ? "Bem-vindo(a) de volta" : mode === "forgot" ? "Recuperar acesso" : "Comece sua jornada"}
        </h1>
        <p className="font-body-md text-on-surface-variant">
          {mode === "signin"
            ? "Entre para continuar sua jornada RAPPAA"
            : mode === "forgot"
              ? "Informe seu email e enviaremos um link para redefinir a senha"
              : "Crie sua conta e registre seus ciclos"}
        </p>
      </div>

      <div className="glass-card rounded-3xl p-6 space-y-4">
        <button
          type="button"
          onClick={handleGoogle}
          disabled={busy}
          className="btn-secondary w-full"
        >
          <span className="material-symbols-outlined text-[20px]">login</span>
          <span className="font-title-md">Continuar com Google</span>
        </button>

        <div className="flex items-center gap-3 text-on-surface-variant/60 text-xs">
          <div className="h-px bg-outline-variant/40 flex-1" />
          <span>ou</span>
          <div className="h-px bg-outline-variant/40 flex-1" />
        </div>

        <form onSubmit={handleEmail} className="space-y-3">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Como podemos te chamar?"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full rounded-2xl bg-surface-container-low border border-outline-variant/40 px-4 py-3 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary"
            />
          )}
          <input
            type="email"
            required
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl bg-surface-container-low border border-outline-variant/40 px-4 py-3 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary"
          />
          {mode !== "forgot" && (
            <input
              type="password"
              required
              minLength={6}
              placeholder="Senha (mínimo 6 caracteres)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl bg-surface-container-low border border-outline-variant/40 px-4 py-3 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary"
            />
          )}
          <button
            type="submit"
            disabled={busy}
            className="btn-primary w-full"
          >
            {busy ? "Aguarde…" : mode === "signin" ? "Entrar" : mode === "forgot" ? "Enviar link" : "Criar conta"}
          </button>
        </form>

        {mode === "signin" && (
          <p className="text-center text-sm">
            <button
              type="button"
              onClick={() => setMode("forgot")}
              className="btn-ghost text-sm"
            >
              Esqueci minha senha
            </button>
          </p>
        )}

        <p className="text-center text-sm text-on-surface-variant">
          {mode === "signin" ? "Ainda não tem conta?" : mode === "forgot" ? "Lembrou a senha?" : "Já tem conta?"}{" "}
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="text-primary hover:underline"
          >
            {mode === "signin" ? "Criar agora" : "Entrar"}
          </button>
        </p>
      </div>

      <div className="text-center mt-6">
        <Link to="/" className="text-sm text-on-surface-variant hover:text-on-surface">
          ← Voltar ao início
        </Link>
      </div>
    </main>
  );
}
