# Threat Model

## Project Overview

RAPA is a personal wellness / inner-journey app (energy logging, Kin/Tzolkin cycles, KAI AI mentor). It runs as a TanStack Start SSR app (React 19, Vite, TypeScript) with Supabase as the auth + database backend and a companion Express 5 API server. Not currently deployed to production.

## Assets

- **User session tokens** — Supabase JWTs issued after email/password or Google OAuth sign-in. Compromise allows acting as the user.
- **Personal journal entries & mood logs** — private wellness data owned by each user.
- **User profiles & roles** — includes the `admin` / `mentor` / `user` role assignment that gates privileged admin functions.
- **LOVABLE_API_KEY** — server-side key for calling the AI gateway (`ai.gateway.lovable.dev`). Exposure allows billing abuse.
- **SUPABASE_SERVICE_ROLE_KEY** — server-side only; bypasses RLS. Exposure would grant full DB access. Loaded only from `process.env`; not committed.
- **Supabase anon/publishable key** — intentionally public (Supabase design); committed to `.replit` and `artifact.toml`. Enforces RLS; cannot access other users' data alone.

## Trust Boundaries

- **Browser → TanStack Start SSR layer** — client is untrusted. Server functions (`createServerFn`) validate auth via `requireSupabaseAuth` middleware before touching data.
- **SSR layer → Supabase (user-scoped)** — uses the user's Bearer JWT forwarded in the Authorization header. RLS enforced.
- **SSR layer → Supabase (service role)** — `supabaseAdmin` client, loaded dynamically only inside server functions after `assertAdmin()` check. Bypasses RLS; never sent to client.
- **SSR layer → AI gateway** — `LOVABLE_API_KEY` is server-side only; not exposed to client bundle.
- **Public vs Authenticated routes** — `/_authenticated` layout calls `supabase.auth.getUser()` server-side before rendering; unauthenticated users are redirected to `/auth`.
- **Authenticated vs Admin** — server functions (`adminListUsers`, `adminResetUserPassword`) call `assertAdmin()` which queries `user_roles` via the user's scoped client to confirm the `admin` role. Supabase RLS independently enforces this for direct client calls.

## Scan Anchors

- **Entry points:** `artifacts/rapa/src/routes/` (TanStack file-based routes), `artifacts/rapa/src/lib/*.functions.ts` (server functions), `packages/api-server/` (Express 5 API, port 5000)
- **Highest-risk areas:** `src/lib/admin.functions.ts` (service-role ops), `src/integrations/supabase/auth-middleware.ts` (JWT verification), `supabase/migrations/` (RLS policies)
- **Public surface:** `/auth`, `/`, `/dia-fora-do-tempo`, `/ciclos`, `/almanaque`, `/chakras`, `/kai` (SSR with `ssr: false` — all client-rendered)
- **Authenticated surface:** `/_authenticated/*` (perfil, admin) — guarded by `beforeLoad` auth check
- **Admin surface:** `/_authenticated/admin` — UI-gated + server-side `assertAdmin()` + Supabase RLS
- **Dev-only:** `artifacts/mockup-sandbox/` — Canvas/design artifact, not production

## Threat Categories

### Spoofing

Supabase issues JWTs for authenticated users. The `requireSupabaseAuth` middleware extracts and verifies the Bearer token via `supabase.auth.getClaims(token)` on every server function call. Google OAuth is supported via `signInWithOAuth` — requires Google provider to be enabled in Supabase dashboard (currently possibly misconfigured, causing login failures). Webhook/callback origin validation is not applicable (no inbound webhooks).

### Tampering

All sensitive writes go through server functions with Zod input validation. User IDs are taken from the verified JWT context (`context.userId`), never from client-supplied input — preventing IDOR on write paths. Supabase RLS `WITH CHECK` clauses independently enforce `auth.uid() = user_id` on insert/update. One concern: the `has_role()` RLS helper was downgraded from `SECURITY DEFINER` to `SECURITY INVOKER` (migration `20260707183401`), creating potential recursive RLS evaluation on `user_roles` write paths.

### Information Disclosure

All tables have RLS enabled with owner-scoped SELECT policies. Journal entries, mood logs, and profiles are only readable by their owner (or admins). The Supabase anon key is committed to version-controlled files (`.replit`, `artifact.toml`) but is intentionally public per Supabase architecture; it cannot read other users' data due to RLS. `SUPABASE_SERVICE_ROLE_KEY` and `LOVABLE_API_KEY` are accessed only via `process.env` and never appear in client bundles. Error messages from server functions are caught and returned as generic strings.

### Elevation of Privilege

Admin role management uses client-side Supabase calls (`supabase.from("user_roles").insert/delete`) from the admin page, but the `user_roles` table has RLS policies that block non-admin mutations (`has_role(auth.uid(), 'admin')` checked server-side in Supabase). The `toggleRole` UI check (`isAdmin`) is supplementary; the database-level enforcement is the actual control. Server-side admin functions additionally call `assertAdmin()` before using the service-role client. A hardcoded founder email (`mpazello@hotmail.com`) is auto-granted admin on signup/confirmation — this is a business decision but means compromise of that email account yields admin access.

### Denial of Service

No explicit rate limiting on server functions or Supabase calls beyond what Supabase's own platform enforces. The `askKai` AI function accepts up to 30 messages × 4000 chars per call; this is bounded by Zod validation. No file upload endpoints found in the codebase (photos reference `photo_path` strings pointing to Supabase Storage, uploads handled client-side to Supabase directly).
