# RAPA

App de bem-estar/jornada pessoal (registro de energia diária, ciclos Kin/Tzolkin, KAI) importado do Lovable (repo mpazello/rapa-57c2f292).

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/rapa` — app importado (TanStack Start + Vite + React 19, Tailwind 4, shadcn). Rotas em `src/routes/`.
- Supabase: cliente em `artifacts/rapa/src/integrations/supabase/`; env vars `VITE_SUPABASE_*` no `.env` do artifact (chave publishable, é pública por design).

## Architecture decisions

- O app roda como veio do Lovable: TanStack Start SSR via `@lovable.dev/vite-tanstack-config`, com auth e dados no Supabase (não migrado para o stack Replit por decisão do usuário).
- Dev script adaptado para Node/pnpm: `vite dev --port $PORT --host 0.0.0.0`; `allowedHosts: true` adicionado no `vite.config.ts` para o proxy do preview.
- Bun não é usado; `bun.lock`/`bunfig.toml` removidos, deps gerenciadas pelo pnpm workspace.

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
