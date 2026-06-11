# Janata Masala × Spaceships & Atoms

Login-gated engagement workspace for modernizing Janata Masala through agentic commerce.

## Live

Deploy target: `https://project-janata-masala.vercel.app` (after Vercel link)

## Quick start

```bash
cp .env.example .env.local   # set DEMO_PASSWORD, API keys
cd apps/web && npm install && npm run dev
```

## Structure

| Path | Role |
|------|------|
| `AGENTS.md` | Agent entry, NLM ID, routing |
| `PROGRAM.md` | Engagement brief |
| `BUILD.md` | Routes, stack, deploy |
| `knowledge/` | Brand, stakeholders, NLM index |
| `apps/web/` | Vite + React + TanStack Router SPA |
| `api/` | Vercel serverless (chat, voice, auth) |

## Knowledge

- NLM: https://notebooklm.google.com/notebook/b5db93de-0a0e-49ea-9cd9-6009beabf6ed
- Design system: Sandy tokens from `zen-money-manager-d8a17b9e`
