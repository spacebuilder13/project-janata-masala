# BUILD — Janata Masala

Status: **M2.8 Mission Center v2 (Falcon 2026) — local on `adventure-os-review`**

**Live:** https://project-janata-masala.vercel.app  
**Deploy:** Vercel (`vercel.json` at repo root)  
**Handoff:** `docs/SESSION-HANDOFF.md`

## Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Login | S&A × JM co-branding, passcode gate |
| `/home` | Home | Hub — Mission + Explorations cards |
| `/home/mission` | Mission | Falcon 2026 Mission Center — tabbed brief (Business Objective, Engagement Model, Falcon Roadmap) |
| `/home/adventure` | — | Redirect → `/home/mission` |
| `/home/explorations` | ExplorationsIndex | Explorations hub |
| `/home/explorations/whatsapp` | ExplorationsWhatsapp | WA gallery (wa-kit) + ChatAgent |
| `/home/explorations/voice` | ExplorationsVoice | VoiceAgent + system flow |
| `/home/explorations/architecture` | — | Redirect → `/home/mission?tab=roadmap` |
| `/home/explorations/brand` | ExplorationsBrand | Brand & content direction |

## Offline mode (default)

ChatAgent uses `chat-memory.ts` keyword router. Voice on `/home/explorations/voice` offers **Priya** (fast list-dump) and **Meera** (consultative counter) via agent picker. Requires `VITE_ENABLE_LIVE_VOICE=true` + ElevenLabs/Anthropic keys. Token route: `GET /api/voice-token?agent=priya|meera`.

## Stack

- Vite 7 + React 19 + TypeScript + TanStack Router
- Tailwind CSS v4 + Sandy design tokens
- Framer Motion
- Vercel API: `api/chat.ts`, `api/voice-token.ts`, `api/post-call-extract.ts`, `api/voice-runs.ts`, `api/usage-snapshot.ts`, `api/auth.ts`
- ElevenLabs browser SDK (`@elevenlabs/client`) for live voice

### Voice run logging

Every Priya/Meera call is saved to Vercel Blob (`jm-voice-logs`) via `post-call-extract` and patched with EL usage from the client.

| Viewer | URL |
|--------|-----|
| HTML table | `/api/voice-runs?view=html&key=<DEMO_PASSWORD>` |
| JSON list | `/api/voice-runs?key=<DEMO_PASSWORD>` |
| Single run | `/api/voice-runs?session_id=<id>&key=<DEMO_PASSWORD>` |

### Voice costing report (v1)

Recurring INR spend report for voice demos. Methodology: `docs/VOICE_COSTING_V1.md`.

```bash
npm run report:voice-cost   # writes outputs/voice-costing/latest.md
```

| Env var | Default | Purpose |
|---------|---------|---------|
| `DEMO_PASSWORD` | *(required)* | Auth for voice-runs API |
| `VOICE_COST_BASE_URL` | `https://project-janata-masala.vercel.app` | API base |
| `EL_PLAN_USD` | `22` | Creator subscription USD |
| `EL_PLAN_CREDITS` | `248000` | Monthly EL credit pool |
| `USD_INR_FX` | `83` | FX for ₹ display |

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
ELEVENLABS_AGENT_ID_PRIYA=
ELEVENLABS_AGENT_ID_MEERA=
JM_CATALOG_VERSION=demo-v2
# Voice run log (Vercel Blob — linked store: jm-voice-logs)
# BLOB_READ_WRITE_TOKEN=
```
