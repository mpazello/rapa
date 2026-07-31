---
name: Lovable import via GitHub connector
description: How the private repo was pulled in and adapted to run here; what to keep in mind on future syncs.
---

- GitHub connector proxy blocks `/tarball` (403) and `git clone` tokens aren't exposed via `listConnections("github")` (returns null). Working path: fetch `git/trees/{branch}?recursive=1` + each `git/blobs/{sha}` through `connectors.proxy("github", ...)` and write files locally.
- **Why:** repo mpazello/rapa-57c2f292 is private; only the API proxy path succeeded.
- **How to apply:** for future pulls/syncs of this repo, reuse the tree+blobs approach (or set up a proper git remote if the platform later exposes credentials).
- User explicitly chose to keep Supabase (auth + data) instead of migrating to the Replit stack; `VITE_SUPABASE_*` live in `artifacts/rapa/.env` (publishable key, public by design).
- App is TanStack Start SSR (Lovable config). Bun removed; dev runs `vite dev --port $PORT --host 0.0.0.0` with `allowedHosts: true` passed via `defineConfig({ vite: { server: ... } })`.
- Admin password reset: email-link mode is live; "direct set" mode is built but HIDDEN (DIRECT_RESET_ENABLED=false in admin route) because the key stored as SUPABASE_SERVICE_ROLE_KEY is actually the ANON key (user has no Supabase dashboard access — project belongs to Lovable org). Re-enable only after verifying jwt role=service_role. Server fn imports client.server dynamically inside handler and re-verifies admin role server-side.
- Jul 2026: migrated to user-owned Supabase project `hzjmivuaxqlhwxbjbsht` (region us-east-2; psql via pooler aws-0-us-east-2.pooler.supabase.com:5432, user postgres.<ref>, password in SUPABASE_DB_PASSWORD). Schema applied from artifacts/rapa/supabase/migrations; buckets journal-photos (private) + avatars (public) created manually (migrations only had policies). Real service_role key now in SUPABASE_SERVICE_ROLE_KEY; anon in SUPABASE_ANON_KEY. Old Lovable .env backed up at /tmp/env-backup-old-supabase. Prod runtime needs SUPABASE_URL/SUPABASE_PUBLISHABLE_KEY in artifact.toml run env (nitro doesn't read .env). Old-DB data import still pending user export.
