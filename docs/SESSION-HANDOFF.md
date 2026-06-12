# Session Handoff — Janata Masala

**Last updated:** 2026-06-12  
**Status:** M2.5 — live voice (Priya) on `/home/explorations/voice`, UI polished  
**Live:** https://project-janata-masala.vercel.app  
**Repo:** https://github.com/spacebuilder13/project-janata-masala  
**Login:** `masala2026`

## What's done (M2.4)

- [x] Canonical `wa-kit/` — class-based WhatsApp chrome + primitives (ported from zen-money-manager)
- [x] WhatsApp gallery: 11 frame-safe demos, 3-col layout, ChatAgent below gallery
- [x] WA QA: `npm run lint:wa`, `npm run qa:wa-frames`, `docs/qa-screenshots/v4-frame-*.png`
- [x] Sandy shell: PageShell, PageIntro, tokens/shell/slides CSS from findow-phase1
- [x] Adventure anchor nav + list-row polish; Visual QA checklist in `docs/VISUAL_QA.md`

## What's done (M2)

- [x] NLM queries Q1–Q3 (verbatim); Q4–Q6 synthesis; knowledge layer expanded
- [x] Typed data layer: strategy, roadmap, benchmarks, actions, chat-memory, voice-scripts, brand-mockups
- [x] Adventure: north star, pillars, roadmap, benchmarks, meetings, actions, scope
- [x] Explorations: brand route, 11 WhatsApp patterns + offline ChatAgent
- [x] Voice: live ElevenLabs agent (Priya) + Claude post-call extraction, bill card + system flow diagram
- [x] Voice R&D sandbox: `voice-lab/` (standalone lab, prompt v1.1.0)
- [x] Architecture: benchmark stack, phase overlay, DiagramQuadrant, agent tooltips
- [x] Offline-first: no API keys required for demos

## What's next

- [ ] Jay: product spreadsheet → enrich SKU data in voice/WhatsApp demos
- [ ] Retry NLM Q4/Q5 if CLI timeout resolves
- [ ] Optional: `VITE_ENABLE_LIVE_CHAT=true` + `ANTHROPIC_API_KEY` for live Claude
- [x] ElevenLabs agent `agent_8101ktx3d3g6ehjr063fhm5yzyr5` — set `VITE_ENABLE_LIVE_VOICE=true` on Vercel
- [ ] Backport `wa-kit` primitives to zen-money-manager when Sandy Lab adds new surfaces

## Key docs

| Doc | Purpose |
|-----|---------|
| `docs/WA_KIT.md` | WhatsApp kit structure, tokens, frame-safe rules |
| `docs/VISUAL_QA.md` | Pre-deploy checklist (interior frame pass blocking for WhatsApp) |
| `BUILD.md` | Routes, stack, deploy commands |

## NLM notebook

`b5db93de-0a0e-49ea-9cd9-6009beabf6ed` — 3 audio sources (Jun 9–10, 2026)

## Routes

| Route | Module |
|-------|--------|
| `/home/adventure` | Strategy, roadmap, benchmarks, meetings, actions |
| `/home/explorations/brand` | Heritage, workshop, sensory, packaging |
| `/home/explorations/whatsapp` | 11 patterns (wa-kit gallery) + offline ChatAgent |
| `/home/explorations/voice` | 2 scripted scenarios + system flow |
| `/home/explorations/architecture` | Benchmark stack + agent diagram |
