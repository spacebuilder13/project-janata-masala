# BUILD — Janata Masala

Status: **M2.5 Live voice — deployed**

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
| `/home/explorations/whatsapp` | ExplorationsWhatsapp | WA gallery (wa-kit) + ChatAgent |
| `/home/explorations/voice` | ExplorationsVoice | VoiceAgent + system flow |
| `/home/explorations/architecture` | ExplorationsArchitecture | Agentic commerce diagram |
| `/home/explorations/brand` | ExplorationsBrand | Brand & content direction |

## Offline mode (default)

ChatAgent uses `chat-memory.ts` keyword router. Voice uses live ElevenLabs + Claude post-call extraction when `VITE_ENABLE_LIVE_VOICE=true` + ElevenLabs/Anthropic keys are set. Set `VITE_ENABLE_LIVE_CHAT=true` + `ANTHROPIC_API_KEY` for live Claude chat.

## Stack

- Vite 7 + React 19 + TypeScript + TanStack Router
- Tailwind CSS v4 + Sandy design tokens
- Framer Motion
- Vercel API: `api/chat.ts`, `api/voice-token.ts`, `api/post-call-extract.ts`, `api/usage-snapshot.ts`, `api/auth.ts`
- ElevenLabs browser SDK (`@elevenlabs/client`) for live voice

## Design

See `knowledge/brand_guidelines.md`. Graph paper background with vignette, JM spice accent on Sandy base.

| Layer | Path |
|-------|------|
| Sandy tokens | `apps/web/src/styles/tokens.css`, `shell.css`, `slides.css` |
| Auth gate | `apps/web/src/styles/auth.css` |
| WhatsApp kit | `apps/web/src/wa-kit/` — see `docs/WA_KIT.md` |
| Gallery layout | `apps/web/src/styles/wa.css` |

Reference: [Sandy Lab WhatsApp](https://zen-design-pal.lovable.app/sandy-lab/whatsapp), findow-phase1 login/stage patterns.

## Pre-deploy (blocking for UI changes)

Run the checklist in [`docs/VISUAL_QA.md`](docs/VISUAL_QA.md) before every UI deploy:

1. `cd apps/web && npm run build && npm run lint:wa`
2. WhatsApp route: `npm run preview &` then `QA_BASE_URL=http://localhost:4173 npm run qa:wa-frames`
3. Screenshot key routes at 375px + 1280px
4. Log pass/fail in `docs/VISUAL_QA.md`
5. Deploy only on PASS

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
