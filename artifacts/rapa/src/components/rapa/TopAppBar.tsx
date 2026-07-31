import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { DailyRitualModal } from "./DailyRitualModal";

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
