# BUILD — Janata Masala M1

Status: **M1 harness complete**

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

## Stack

- Vite 7 + React 19 + TypeScript + TanStack Router
- Tailwind CSS v4 + Sandy design tokens
- Framer Motion
- Vercel API: `api/chat.ts`, `api/voice-token.ts`, `api/auth.ts`

## Design

See `knowledge/brand_guidelines.md`. Graph paper background, JM spice accent on Sandy base.

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
