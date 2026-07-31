import { useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getNatal, setBirthDate } from "@/lib/tzolkin.functions";
import { kinFromDate, getKinInfo } from "@/lib/tzolkin";

/**
 * Bloqueia todas as páginas autenticadas até o usuário informar sua data de nascimento.
 * O Kin natal é calculado no banco (trigger sync_natal_kin) assim que a data é salva.
 */
export function OnboardingGate({ children }: { children: ReactNode }) {
  const qc = useQueryClient();
  const fnGetNatal = useServerFn(getNatal);
  const fnSetBirthDate = useServerFn(setBirthDate);
  const natalQuery = useQuery({ queryKey: ["natal"], queryFn: () => fnGetNatal() });
  const [date, setDate] = useState("");
  const [saving, setSaving] = useState(false);

  if (natalQuery.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-on-surface-variant">
        <span className="material-symbols-outlined animate-spin">progress_activity</span>
      </div>
    );
  }

  if (natalQuery.data?.birth_date) return <>{children}</>;

  const preview = date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? getKinInfo(kinFromDate(new Date(date + "T12:00:00Z"))) : null;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!date) return;
    setSaving(true);
    try {
      await fnSetBirthDate({ data: { birth_date: date } });
      await qc.invalidateQueries({ queryKey: ["natal"] });
      toast.success(`Seu Kin natal foi selado: ${preview?.fullName ?? ""}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen pt-24 pb-16 px-container-margin max-w-[560px] mx-auto">
      <div className="fixed inset-0 texture-overlay z-[-1]" aria-hidden />
      <div className="text-center mb-8">
        <span className="material-symbols-outlined text-5xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
          hub
        </span>
        <h1 className="font-headline-lg text-headline-lg mt-4 mb-2">Sele o seu Kin natal</h1>
        <p className="font-body-md text-on-surface-variant">
          Sua data de nascimento revela o Kin que abriu a sua jornada — a bússola que orienta o Mapa de Ressonância.
        </p>
      </div>

      <form onSubmit={handleSave} className="glass-panel rounded-3xl p-6 space-y-5">
        <div>
          <label className="block text-xs uppercase tracking-wider text-on-surface-variant mb-2">
            Data de nascimento
          </label>
          <input
            type="date"
            required
            max={new Date().toISOString().slice(0, 10)}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-2xl bg-surface-container-low border border-outline-variant/40 px-4 py-3 focus:outline-none focus:border-primary text-on-surface"
          />
        </div>

        {preview && (
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 text-center">
            <span className="text-xs uppercase tracking-widest text-primary">Prévia do seu Kin natal</span>
            <p className="font-title-lg text-title-lg mt-1">Kin {preview.kin}</p>
            <p className="font-body-md text-on-surface-variant">{preview.fullName}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={!date || saving}
          className="w-full rounded-full bg-primary text-on-primary py-3 font-title-md hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Selando…" : "Selar meu Kin natal"}
        </button>
        <p className="text-xs text-on-surface-variant/70 text-center">
          Você pode ajustar depois na tela de Perfil.
        </p>
      </form>
    </main>
  );
}
