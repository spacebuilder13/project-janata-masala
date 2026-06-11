# Session Handoff — Janata Masala

**Last updated:** 2026-06-11  
**Status:** M1 harness complete — deployed  
**Live:** https://project-janata-masala.vercel.app  
**Repo:** https://github.com/spacebuilder13/project-janata-masala  
**Login:** `masala2026` (dev fallback; set `DEMO_PASSWORD` in Vercel for production)

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
