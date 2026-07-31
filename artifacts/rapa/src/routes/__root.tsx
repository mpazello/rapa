import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { TopAppBar } from "../components/rapa/TopAppBar";
import { BottomNav } from "../components/rapa/BottomNav";
import { AuthProvider } from "../hooks/use-auth";
import { supabase } from "../integrations/supabase/client";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl text-on-surface">404</h1>
        <h2 className="mt-4 text-xl text-on-surface">Página não encontrada</h2>
        <p className="mt-2 text-sm text-on-surface-variant">
          Esta página não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-on-primary hover:opacity-90"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl text-on-surface">Algo interrompeu esta página</h1>
        <p className="mt-2 text-sm text-on-surface-variant">
          Você pode tentar novamente ou voltar ao início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-on-primary hover:opacity-90"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-outline px-5 py-2 text-sm font-medium text-on-surface hover:bg-surface-container-low"
          >
            Início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0e1116" },
      { title: "Hoje — RAPA" },
      {
        name: "description",
        content:
          "RAPA é um espaço para registrar sua jornada, compreender seus ciclos e refletir com KAI, seu mentor de consciência.",
      },
      { property: "og:site_name", content: "RAPA" },
      { property: "og:title", content: "Hoje — RAPA" },
      {
        property: "og:description",
        content:
          "Registre sua jornada, compreenda seus ciclos e reflita com KAI, seu mentor de consciência.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Hoje — RAPA" },
      { name: "description", content: "Registre sua energia, veja o ciclo do dia e retome sua jornada." },
      { property: "og:description", content: "Registre sua energia, veja o ciclo do dia e retome sua jornada." },
      { name: "twitter:description", content: "Registre sua energia, veja o ciclo do dia e retome sua jornada." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6fbe2a9e-0810-4066-9fa8-409f7433fbd6/id-preview-6535571a--5792654b-2413-48d3-9ae4-608ff3821322.lovable.app-1783448200371.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6fbe2a9e-0810-4066-9fa8-409f7433fbd6/id-preview-6535571a--5792654b-2413-48d3-9ae4-608ff3821322.lovable.app-1783448200371.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon", sizes: "any" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        void queryClient.cancelQueries();
        queryClient.clear();
        router.invalidate();
      } else if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        queryClient.clear();
        router.invalidate();
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [router, queryClient]);


  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* Atmospheric aura glows — Stitch Ethereal Ritual spec (15% opacity, 100px blur) */}
        <div className="aura-bg" aria-hidden>
          <div
            className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(circle at center, rgba(188,155,255,0.15) 0%, transparent 70%)", filter: "blur(100px)" }}
          />
          <div
            className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(circle at center, rgba(168,199,255,0.15) 0%, transparent 70%)", filter: "blur(100px)" }}
          />
        </div>
        <div className="noise-overlay" aria-hidden />
        <TopAppBar />
        <Outlet />
        <BottomNav />
        <Toaster theme="dark" position="top-center" />
      </AuthProvider>
    </QueryClientProvider>
  );
}
