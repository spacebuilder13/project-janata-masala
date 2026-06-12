# BUILD — Janata Masala M1

Status: **M2.2 full UI/UX revamp — deployed**

**Live:** https://project-janata-masala.vercel.app  
**Deploy:** Vercel (`vercel.json` at repo root)  
**Handoff:** `docs/SESSION-HANDOFF.md`

## Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Login | S&A × JM co-branding, passcode gate |
| `/home` | Home | Hub — Adventure + Explorations cards |
| `/home/adventure` | Adventure | Meetings, decisions, scope tracker |
| `/home/explorations` | ExplorationsIndex | Explorations hub |
| `/home/explorations/whatsapp` | ExplorationsWhatsapp | WA campaigns + ChatAgent |
| `/home/explorations/voice` | ExplorationsVoice | VoiceAgent + system flow |
| `/home/explorations/architecture` | ExplorationsArchitecture | Agentic commerce diagram |
| `/home/explorations/brand` | ExplorationsBrand | Brand & content direction |

## Offline mode (default)

ChatAgent uses `chat-memory.ts` keyword router. Voice uses `ConversationSimulator` + hardcoded JSON. Set `VITE_ENABLE_LIVE_CHAT=true` + `ANTHROPIC_API_KEY` for live Claude.

## Stack

- Vite 7 + React 19 + TypeScript + TanStack Router
- Tailwind CSS v4 + Sandy design tokens
- Framer Motion
- Vercel API: `api/chat.ts`, `api/voice-token.ts`, `api/auth.ts`

## Design

See `knowledge/brand_guidelines.md`. Graph paper background with vignette, JM spice accent on Sandy base.

Design system CSS: `apps/web/src/styles/tokens.css`, `apps/web/src/styles/auth.css`.

## Pre-deploy (blocking for UI changes)

Run the checklist in [`docs/VISUAL_QA.md`](docs/VISUAL_QA.md) before every UI deploy:

1. `cd apps/web && npm run build`
2. Screenshot `/`, `/home`, `/home/adventure`, `/home/explorations` at 375px + 1280px
3. Log pass/fail in `docs/VISUAL_QA.md`
4. Deploy only on PASS

## Knowledge

- NLM notebook: `b5db93de-0a0e-49ea-9cd9-6009beabf6ed`
- Source index: `knowledge/jm_source_index.md`

## Env

```
DEMO_PASSWORD=masala2026
ANTHROPIC_API_KEY=
ELEVENLABS_API_KEY=
ELEVENLABS_AGENT_ID=
NOTEBOOKLM_NOTEBOOK_ID=b5db93de-0a0e-49ea-9cd9-6009beabf6ed
```

## Build commands

```bash
cd apps/web && npm install && npm run build
```

## Deploy

Vercel root: repo root. Build command in `vercel.json`.
