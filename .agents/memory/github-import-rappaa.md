---
name: GitHub import of Rappaa repo
description: How the mpazello/Rappaa repo was imported and quirks of the GitHub connector proxy
---

- The GitHub connector proxy blocks tarball/zipball downloads (403, no redirect). To download a repo, list files via `GET /repos/{o}/{r}/git/trees/{branch}?recursive=1`, then fetch each blob with `Accept: application/vnd.github.raw+json`.
- **Why:** proxy doesn't follow/expose codeload redirects; per-blob is the only working path.
- **How to apply:** throttle blob downloads (~1 req/150ms with backoff) — the proxy rate-limits hard (429) at ~10 concurrent.
- The imported RAPA app keeps its Lovable stack (TanStack Start + Supabase) by prior user decision — see replit.md. Dev needs `artifacts/rapa/.env` with `VITE_SUPABASE_URL`/`VITE_SUPABASE_PUBLISHABLE_KEY` (public anon key, values also in artifact.toml prod env).
- Copied artifact dirs are not auto-registered; running `verifyAndReplaceArtifactToml` on their existing artifact.toml registers them and creates managed workflows.
