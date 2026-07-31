import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";

type NavItem = {
  to: "/" | "/jornada" | "/ciclos" | "/chakras" | "/kai" | "/perfil";
  label: string;
  icon: string;
};

const items: NavItem[] = [
  { to: "/", label: "Hoje", icon: "wb_twilight" },
  { to: "/jornada", label: "Jornada", icon: "timeline" },
  { to: "/ciclos", label: "Ciclos", icon: "cyclone" },
  { to: "/chakras", label: "Chakras", icon: "self_improvement" },
  { to: "/kai", label: "KAI", icon: "auto_awesome" },
  { to: "/perfil", label: "Perfil", icon: "person" },
];

export function BottomNav() {
  const [day, setDay] = useState("");
  useEffect(() => {
    setDay(String(new Date().getDate()));
  }, []);

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 backdrop-blur-2xl bg-obsidian-surface/90 border-t border-white/10 shadow-2xl">
      <div className="max-w-[720px] mx-auto px-2 flex items-stretch justify-between h-20 pb-3 pt-2">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: item.to === "/" }}
            className="flex-1 flex flex-col items-center justify-center gap-1 rounded-2xl text-muted-stardust transition-all [&.active]:text-ritual-gold [&.active]:drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]"
            activeProps={{ className: "active" }}
          >
            {({ isActive }) => (
              <>
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0, 'wght' 400" }}
                >
                  {item.icon}
                </span>
                <span className="font-label-sm text-[11px] tracking-wide">
                  {item.to === "/" && day ? `Hoje · ${day}` : item.label}
                </span>
              </>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}
