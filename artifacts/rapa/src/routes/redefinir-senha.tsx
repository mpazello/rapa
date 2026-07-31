import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/redefinir-senha")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Redefinir senha — RAPPAA" },
      { name: "description", content: "Escolha uma nova senha para sua conta RAPPAA." },
    ],
  }),
  component: ResetPasswordPage,
});

/** O link de recuperação chega com `?code=` ou `#...type=recovery`. */
function hasRecoveryParams(): boolean {
  if (typeof window === "undefined") return false;
  const search = new URLSearchParams(window.location.search);
  if (search.has("code")) return true;
  const hash = window.location.hash;
  return hash.includes("type=recovery") || hash.includes("access_token=");
}

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"checking" | "recovery" | "signedIn" | "noSession">("checking");
  const [accountEmail, setAccountEmail] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const cameFromRecoveryLink = hasRecoveryParams();
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" && session) {
        setAccountEmail(session.user.email ?? null);
        setStatus("recovery");
      }
    });
    supabase.auth.getSession().then(({ data }) => {
      setStatus((prev) => {
        if (prev === "recovery") return prev;
        if (data.session && cameFromRecoveryLink) {
          setAccountEmail(data.session.user.email ?? null);
          return "recovery";
        }
        if (data.session) {
          setAccountEmail(data.session.user.email ?? null);
          return "signedIn";
        }
        return "noSession";
      });
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const ready = status === "recovery";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("As senhas não coincidem.");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("Senha redefinida com sucesso.");
      navigate({ to: "/perfil", replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao redefinir a senha");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="pt-24 pb-32 px-container-margin max-w-[440px] mx-auto min-h-screen">
      <div className="text-center mb-8">
        <h1 className="font-serif text-4xl mb-2">Redefinir senha</h1>
        <p className="font-body-md text-on-surface-variant">
          {ready
            ? "Escolha uma nova senha para sua conta."
            : status === "signedIn"
              ? "Esta página é usada pelo link de redefinição enviado por email."
              : "Abra esta página pelo link enviado ao seu email para redefinir a senha."}
        </p>
      </div>

      {ready ? (
        <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 space-y-3">
          {accountEmail && (
            <p className="text-center text-xs text-on-surface-variant bg-surface-container-low rounded-2xl px-4 py-2.5">
              Definindo nova senha para <strong className="text-on-surface">{accountEmail}</strong>
            </p>
          )}
          <input
            type="password"
            required
            minLength={6}
            placeholder="Nova senha (mínimo 6 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl bg-surface-container-low border border-outline-variant/40 px-4 py-3 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Confirme a nova senha"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full rounded-2xl bg-surface-container-low border border-outline-variant/40 px-4 py-3 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-primary text-on-primary py-3 font-title-md hover:opacity-90 disabled:opacity-50"
          >
            {busy ? "Aguarde…" : "Salvar nova senha"}
          </button>
        </form>
      ) : status === "checking" ? (
        <div className="glass-card rounded-3xl p-6 text-center">
          <p className="text-on-surface-variant text-sm">Verificando…</p>
        </div>
      ) : status === "signedIn" ? (
        <div className="glass-card rounded-3xl p-6 text-center">
          <span className="material-symbols-outlined text-[40px] text-on-surface-variant mb-3 block">verified_user</span>
          <p className="text-on-surface-variant text-sm">
            Você já está conectado{accountEmail ? ` como ${accountEmail}` : ""}. Para redefinir uma
            senha, abra o link de redefinição enviado por email — de preferência em uma janela
            anônima, se for de outra conta.
          </p>
        </div>
      ) : (
        <div className="glass-card rounded-3xl p-6 text-center">
          <span className="material-symbols-outlined text-[40px] text-on-surface-variant mb-3 block">mail</span>
          <p className="text-on-surface-variant text-sm">
            Solicite um link de redefinição na tela de{" "}
            <Link to="/auth" className="text-primary hover:underline">entrada</Link>{" "}
            ou peça a um administrador.
          </p>
        </div>
      )}

      <div className="text-center mt-6">
        <Link to="/" className="text-sm text-on-surface-variant hover:text-on-surface">
          ← Voltar ao início
        </Link>
      </div>
    </main>
  );
}
