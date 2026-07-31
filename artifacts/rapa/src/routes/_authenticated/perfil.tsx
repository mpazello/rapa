import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { KinSeal } from "@/components/KinSeal";
import { sincronarioDate, yearBearer, sincronarioCoordinate, personalCubicPattern, CUBE_DAYS, getKinInfo, type SealColor } from "@/lib/tzolkin";

export const Route = createFileRoute("/_authenticated/perfil")({
  head: () => ({
    meta: [
      { title: "Perfil — RAPA" },
      { name: "description", content: "Seu perfil, Kin natal e configurações." },
    ],
  }),
  component: PerfilPage,
});

function PerfilPage() {
  const { user, roles, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [philosophy, setPhilosophy] = useState("maia");
  const [birthDate, setBirthDate] = useState("");
  const [natalKin, setNatalKin] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /** Redimensiona e comprime a imagem no navegador (256×256, JPEG). */
  async function processPhoto(file: File): Promise<string> {
    const bitmap = await createImageBitmap(file);
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    // recorte central quadrado
    const side = Math.min(bitmap.width, bitmap.height);
    const sx = (bitmap.width - side) / 2;
    const sy = (bitmap.height - side) / 2;
    ctx.drawImage(bitmap, sx, sy, side, side, 0, 0, size, size);
    bitmap.close();
    return canvas.toDataURL("image/jpeg", 0.85);
  }

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !user) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Escolha um arquivo de imagem.");
      return;
    }
    setUploadingPhoto(true);
    try {
      const dataUrl = await processPhoto(file);
      const { error } = await supabase
        .from("profiles")
        .update({ avatar_url: dataUrl } as never)
        .eq("id", user.id);
      if (error) throw new Error(error.message);
      setAvatarUrl(dataUrl);
      toast.success("Foto de perfil atualizada");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao enviar a foto");
    } finally {
      setUploadingPhoto(false);
    }
  }

  async function handleRemovePhoto() {
    if (!user) return;
    const { error } = await supabase
      .from("profiles")
      .update({ avatar_url: null } as never)
      .eq("id", user.id);
    if (error) return toast.error(error.message);
    setAvatarUrl("");
    toast.success("Foto removida");
  }

  useEffect(() => {
    if (!user) return;
    void supabase
      .from("profiles")
      .select("display_name, avatar_url, philosophy, birth_date, natal_kin")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        const p = data as {
          display_name?: string | null;
          avatar_url?: string | null;
          philosophy?: string | null;
          birth_date?: string | null;
          natal_kin?: number | null;
        } | null;
        setDisplayName(p?.display_name ?? "");
        setAvatarUrl(p?.avatar_url ?? "");
        setPhilosophy(p?.philosophy ?? "maia");
        setBirthDate(p?.birth_date ?? "");
        setNatalKin(p?.natal_kin ?? null);
        setLoading(false);
      });
  }, [user]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: displayName,
        avatar_url: avatarUrl || null,
        philosophy,
        birth_date: birthDate || null,
      } as never)
      .eq("id", user.id);
    setSaving(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Perfil atualizado");
      // recarrega natal_kin, que o trigger recomputa
      const { data } = await supabase
        .from("profiles")
        .select("natal_kin")
        .eq("id", user.id)
        .maybeSingle();
      setNatalKin((data as { natal_kin?: number | null } | null)?.natal_kin ?? null);
    }
  }


  async function handleSignOut() {
    await signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <main className="pt-24 pb-32 px-container-margin max-w-[720px] mx-auto min-h-screen">
      <section className="text-center mb-10">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingPhoto}
            aria-label="Trocar foto de perfil"
            className="w-24 h-24 rounded-full bg-surface-container-high border border-outline-variant/40 flex items-center justify-center overflow-hidden hover:border-primary transition-colors disabled:opacity-60"
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="material-symbols-outlined text-[40px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                person
              </span>
            )}
          </button>
          <span className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center border-2 border-background pointer-events-none">
            <span className="material-symbols-outlined text-[16px]">
              {uploadingPhoto ? "hourglass_top" : "photo_camera"}
            </span>
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
        </div>
        {avatarUrl && (
          <button
            type="button"
            onClick={handleRemovePhoto}
            className="text-xs text-on-surface-variant hover:text-error underline underline-offset-2 mb-4 -mt-2"
          >
            Remover foto
          </button>
        )}
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile mb-1">
          {displayName || "Sua jornada"}
        </h2>
        <p className="font-body-md text-on-surface-variant">{user?.email}</p>
        <div className="mt-3 flex justify-center gap-2 flex-wrap">
          {roles.map((r) => (
            <span key={r} className="text-xs px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/40 uppercase tracking-wider">
              {r}
            </span>
          ))}
        </div>
      </section>
      {(() => {
        const today = sincronarioDate();
        const year = yearBearer();
        const coord = sincronarioCoordinate();
        const birthD = birthDate ? new Date(birthDate + "T12:00:00Z") : null;
        const birth = birthD ? sincronarioDate(birthD) : null;
        const birthYear = birthD ? yearBearer(birthD) : null;
        const birthCoord = birthD ? sincronarioCoordinate(birthD) : null;
        return (
          <section className="glass-card rounded-3xl p-5 mb-6 space-y-4">
            <div className="flex items-baseline justify-between">
              <h3 className="font-title-lg text-title-lg">Sincronário 13:20</h3>
              <span className="text-xs uppercase tracking-widest text-on-surface-variant">Bússola</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-surface-container-low border border-outline-variant/40 p-3">
                <span className="text-xs uppercase tracking-widest text-primary">Hoje</span>
                <p className="font-mono text-headline-sm text-primary mt-1 tracking-wider">{coord}</p>
                <p className="font-body-sm text-on-surface-variant">ano.lua.dia</p>
                <p className="font-title-md mt-2">
                  {today.dayOutOfTime ? "Dia Fora do Tempo" : `Lua ${today.moon} · Dia ${today.day}`}
                </p>
                <p className="font-body-sm text-on-surface-variant">{today.moonName}</p>
                <p className="font-body-sm text-on-surface-variant mt-2">Ano: {year.label} · Kin {year.kin}</p>
              </div>
              {birth && birthYear && birthCoord && (
                <div className="rounded-2xl bg-surface-container-low border border-outline-variant/40 p-3">
                  <span className="text-xs uppercase tracking-widest text-primary">Nascimento</span>
                  <p className="font-mono text-headline-sm text-primary mt-1 tracking-wider">{birthCoord}</p>
                  <p className="font-body-sm text-on-surface-variant">ano.lua.dia</p>
                  <p className="font-title-md mt-2">
                    {birth.dayOutOfTime ? "Dia Fora do Tempo" : `Lua ${birth.moon} · Dia ${birth.day}`}
                  </p>
                  <p className="font-body-sm text-on-surface-variant">{birth.moonName}</p>
                  <p className="font-body-sm text-on-surface-variant mt-2">Ano: {birthYear.label} · Kin {birthYear.kin}</p>
                </div>
              )}
            </div>
            <p className="text-xs text-on-surface-variant">
              Coordenada da Bússola: <span className="font-mono">ano.lua.dia</span> — ano = Kin do portador (Tormenta/Semente/Lua/Mago), lua 1-13, dia 1-28. Ano galáctico inicia em 26/jul; 25/jul é o Dia Fora do Tempo; 29/fev não é contado.
            </p>
          </section>
        );
      })()}



      {natalKin && (
        <Link
          to="/ciclos/kin/$kin"
          params={{ kin: String(natalKin) }}
          className="glass-card rounded-3xl p-5 mb-6 hover:border-primary border border-transparent transition-colors flex items-center gap-4"
        >
          <KinSeal kin={natalKin} size={64} pulse />
          <div>
            <span className="text-xs uppercase tracking-widest text-primary">Seu Kin natal</span>
            <p className="font-title-lg text-title-lg mt-1">Kin {natalKin}</p>
            <p className="font-body-sm text-on-surface-variant">Toque para abrir sua leitura completa →</p>
          </div>
        </Link>
      )}

      {natalKin && <CubicPatternCard natalKin={natalKin} />}



      <form onSubmit={handleSave} className="glass-card rounded-3xl p-6 space-y-4 mb-6">
        <h3 className="font-title-lg text-title-lg">Suas informações</h3>
        <div>
          <label className="block text-xs uppercase tracking-wider text-on-surface-variant mb-1">
            Nome de exibição
          </label>
          <input
            type="text"
            value={displayName}
            disabled={loading}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full rounded-2xl bg-surface-container-low border border-outline-variant/40 px-4 py-3 focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-on-surface-variant mb-1">
            Data de nascimento (Kin natal)
          </label>
          <input
            type="date"
            value={birthDate}
            disabled={loading}
            max={new Date().toISOString().slice(0, 10)}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full rounded-2xl bg-surface-container-low border border-outline-variant/40 px-4 py-3 focus:outline-none focus:border-primary"
          />
        </div>
        <div>

          <label className="block text-xs uppercase tracking-wider text-on-surface-variant mb-2">
            Bússola filosófica (guia o KAI)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { k: "maia", label: "Sabedoria Maia" },
              { k: "estoicismo", label: "Estoicismo" },
              { k: "zen", label: "Zen Budismo" },
              { k: "hermetismo", label: "Hermetismo" },
            ].map((p) => (
              <button
                key={p.k}
                type="button"
                onClick={() => setPhilosophy(p.k)}
                className={`px-3 py-2 rounded-2xl text-sm border ${philosophy === p.k ? "bg-primary text-on-primary border-primary" : "border-outline-variant/40 text-on-surface-variant"}`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={saving || loading}
          className="w-full rounded-full bg-primary text-on-primary py-3 font-title-md hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Salvando…" : "Salvar alterações"}
        </button>
      </form>

      <section className="space-y-3">
        {isAdmin && (
          <Link
            to="/admin"
            className="w-full glass-card rounded-2xl p-4 flex items-center gap-4 text-left hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-primary">shield_person</span>
            <span className="font-title-md text-title-md flex-1">Área administrativa</span>
            <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
          </Link>
        )}
        <button
          onClick={handleSignOut}
          className="w-full glass-card rounded-2xl p-4 flex items-center gap-4 text-left hover:bg-surface-container-high transition-colors"
        >
          <span className="material-symbols-outlined text-error">logout</span>
          <span className="font-title-md text-title-md flex-1">Sair</span>
        </button>
      </section>
    </main>
  );
}

function CubicPatternCard({ natalKin }: { natalKin: number }) {
  const pattern = personalCubicPattern(natalKin);
  const colorTone: Record<SealColor, string> = {
    vermelho: "text-error",
    branco: "text-on-surface",
    azul: "text-primary",
    amarelo: "text-tertiary",
  };
  return (
    <section className="glass-card rounded-3xl p-5 mb-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="material-symbols-outlined text-primary">deployed_code</span>
        <h3 className="font-title-lg text-title-lg">Seu Pátron Cúbico</h3>
      </div>
      <p className="font-body-sm text-on-surface-variant/80 mb-4">
        Os 16 Kins que compõem o seu Cubo de Destino a partir do Kin natal <strong>{natalKin}</strong> —
        um por cada dia central da Lua (9 → 24). Meditação Telektonon do Cubo da Lei.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {pattern.map(({ day, kin }) => {
          const info = getKinInfo(kin);
          return (
            <Link
              key={day.index}
              to="/ciclos/kin/$kin"
              params={{ kin: String(kin) }}
              className="glass-panel rounded-xl p-2 flex flex-col items-center gap-1 border border-transparent hover:border-primary transition-colors"
            >
              <KinSeal kin={kin} size={40} />
              <span className={`font-title-sm text-xs ${colorTone[day.color]}`}>
                {day.index}. {day.codon}
              </span>
              <span className="font-label-sm text-[10px] text-on-surface-variant/70">
                Kin {kin} · L·{day.moonDay}
              </span>
              <span className="font-label-sm text-[10px] text-on-surface-variant/60 line-clamp-1">
                {info.seal.name}
              </span>
            </Link>
          );
        })}
      </div>
      <p className="font-label-sm text-label-sm text-on-surface-variant/60 mt-3 italic text-center">
        Fórmula: natal + (n−1)·17 mod 260 · saltos helicoidais do Tzolkin
      </p>
    </section>
  );
}
