import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { DailyRitualModal } from "./DailyRitualModal";
import { getTodayKinInfo, type SealColor } from "@/lib/tzolkin";
import { SEAL_IMAGE } from "@/lib/seal-images";

const TILE_BG: Record<SealColor, string> = {
  vermelho: "bg-[#CC2222]",
  branco:   "bg-[#E8E8E8]",
  azul:     "bg-[#1A4FCC]",
  amarelo:  "bg-[#D4A500]",
};

const TILE_BORDER: Record<SealColor, string> = {
  vermelho: "border-[#991111]",
  branco:   "border-[#AAAAAA]",
  azul:     "border-[#0F3399]",
  amarelo:  "border-[#A07800]",
};

function WavespellTile() {
  const [info, setInfo] = useState<ReturnType<typeof getTodayKinInfo> | null>(null);

  useEffect(() => {
    setInfo(getTodayKinInfo());
  }, []);

  if (!info) {
    // placeholder que não causa hydration mismatch
    return <div className="w-8 h-8 rounded-lg bg-surface-container animate-pulse" />;
  }

  const { trecena } = info;
  const src = SEAL_IMAGE[trecena.seal.index];
  const bg = TILE_BG[trecena.seal.color];
  const border = TILE_BORDER[trecena.seal.color];

  return (
    <span
      className={`inline-flex items-center justify-center w-8 h-8 rounded-lg border-2 ${bg} ${border} shadow-inner overflow-hidden`}
      style={{ boxShadow: "inset 0 1px 2px rgba(255,255,255,0.25), inset 0 -1px 2px rgba(0,0,0,0.3)" }}
      title={`Onda Encantada do ${trecena.seal.name} (Kin ${trecena.kinStart})`}
    >
      <img
        src={src}
        alt={trecena.seal.name}
        className="w-[75%] h-[75%] object-contain"
        style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.4))" }}
        loading="eager"
      />
    </span>
  );
}

function Avatar({ userId, displayName }: { userId: string; displayName?: string | null }) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    void supabase
      .from("profiles")
      .select("avatar_url, display_name")
      .eq("id", userId)
      .maybeSingle()
      .then(({ data }) => {
        const p = data as { avatar_url?: string | null; display_name?: string | null } | null;
        setAvatarUrl(p?.avatar_url ?? null);
      });
  }, [userId]);

  const initials = (displayName ?? "U").trim().charAt(0).toUpperCase();

  return (
    <div className="w-9 h-9 rounded-full overflow-hidden border border-astral-violet/30 bg-surface-container flex items-center justify-center shrink-0">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Foto do perfil"
          className="w-full h-full object-cover"
          onError={() => setAvatarUrl(null)}
        />
      ) : (
        <span className="text-sm font-semibold text-astral-violet">{initials}</span>
      )}
    </div>
  );
}

export function TopAppBar() {
  const { user, loading } = useAuth();
  const [ritualOpen, setRitualOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-xl bg-background/70 border-b border-outline-variant/30">
        <div className="max-w-[720px] mx-auto px-container-margin h-16 flex items-center justify-between">
          {/* Logo + ritual button */}
          <div className="flex items-center gap-1">
            <Link to="/" className="flex items-center gap-2 mr-1">
              <span className="material-symbols-outlined text-astral-violet text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                all_inclusive
              </span>
              <span className="font-serif text-xl tracking-wide text-astral-violet">RAPPAA</span>
            </Link>

            <button
              type="button"
              onClick={() => setRitualOpen(true)}
              aria-label="Como usar no dia a dia"
              title="Ritual do dia"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-astral-violet/30 text-astral-violet hover:bg-astral-violet/10 transition-colors group"
            >
              <span
                className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                self_improvement
              </span>
              <span className="font-label-sm text-label-sm hidden sm:inline">Ritual do dia</span>
            </button>

            <Link
              to="/almanaque"
              aria-label="Almanaque — Calendário das 13 Luas"
              title="Almanaque"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-astral-violet/30 text-astral-violet hover:bg-astral-violet/10 transition-colors group"
            >
              <span
                className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_stories
              </span>
              <span className="font-label-sm text-label-sm hidden sm:inline">Almanaque</span>
            </Link>

            {/* Onda Encantada — tile colorido com o selo da trecena atual */}
            <Link
              to="/ciclos"
              aria-label="Onda Encantada"
              className="hover:opacity-80 active:scale-95 transition-all"
            >
              <WavespellTile />
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {loading ? (
              <div className="w-9 h-9 rounded-full bg-surface-container animate-pulse" />
            ) : user ? (
              <Link to="/perfil" aria-label="Meu perfil" className="hover:opacity-80 transition-opacity active:scale-95">
                <Avatar
                  userId={user.id}
                  displayName={user.user_metadata?.display_name ?? user.email}
                />
              </Link>
            ) : (
              <Link to="/auth" className="btn-outlined">
                Entrar
              </Link>
            )}
          </div>
        </div>
      </header>

      <DailyRitualModal open={ritualOpen} onClose={() => setRitualOpen(false)} />
    </>
  );
}
