# Session Handoff — Janata Masala

**Last updated:** 2026-06-11  
**Status:** M1 harness complete — repo scaffolded, all routes stubbed with content

## What's done

- [x] Repo structure + harness MD files
- [x] Web app with Sandy design system (graph paper, tokens)
- [x] Login gate + `/home` hub
- [x] Adventure module (meetings, decisions, scope)
- [x] Explorations: WhatsApp + ChatAgent, VoiceAgent + flow, Architecture

## What's next

- [ ] Query NLM for real meeting/decision content → replace placeholder adventure data
- [ ] Configure ElevenLabs agent in dashboard → set `ELEVENLABS_AGENT_ID`
- [ ] Set `ANTHROPIC_API_KEY` and `DEMO_PASSWORD` in Vercel env
- [ ] Link Vercel project and deploy

## Env vars needed (Vercel)

```
DEMO_PASSWORD=
ANTHROPIC_API_KEY=
ELEVENLABS_API_KEY=
ELEVENLABS_AGENT_ID=
```

## Key paths

- App: `apps/web/`
- API: `api/`
- Knowledge: `knowledge/`
