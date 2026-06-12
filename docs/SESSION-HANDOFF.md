# Session Handoff — Janata Masala

**Last updated:** 2026-06-12  
**Status:** M2.7 — Adventure executive brief + Commerce 101 roadmap + voice run logging  
**Live:** https://project-janata-masala.vercel.app  
**Repo:** https://github.com/spacebuilder13/project-janata-masala  
**Login:** `masala2026`

## What's done (M2.7)

- [x] Adventure restructured — executive brief (north star, today, vision, Crawl/Walk/Run, stores, stories)
- [x] Removed from Adventure: benchmarks, roadmap, meetings, action/scope trackers, open questions
- [x] Commerce 101 roadmap in Explorations — CRM, WhatsApp, inward inventory + tech initiatives
- [x] Explorations hub: voice enabled, brand marked deferred (Walk/Run)
- [x] Architecture page: Commerce 101 roadmap (ArchitectureDiagram unwired — deferred)
- [x] Voice run logging — Priya/Meera attempts saved to Vercel Blob (`jm-voice-logs`); viewer at `/api/voice-runs?view=html&key=<DEMO_PASSWORD>`

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
- [x] Voice: **Priya** (fast list-dump, v1.2) + **Meera** (consultative, v2.0) — agent picker on explorations voice route
- [x] Enriched catalog (categories, new launches, pairings) + generated knowledge for Meera in-call
- [x] Voice R&D sandbox: `voice-lab/` — `node scripts/create-or-patch-agent.js --agent all`
- [x] Architecture: benchmark stack, phase overlay, DiagramQuadrant, agent tooltips
- [x] Offline-first: no API keys required for demos

## What's next

- [ ] Jay: product spreadsheet → enrich SKU data in voice/WhatsApp demos
- [ ] Retry NLM Q4/Q5 if CLI timeout resolves
- [ ] Optional: `VITE_ENABLE_LIVE_CHAT=true` + `ANTHROPIC_API_KEY` for live Claude
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
| `/home/adventure` | Strategy executive brief, Crawl/Walk/Run storytelling |
| `/home/explorations/brand` | Heritage, workshop, sensory, packaging |
| `/home/explorations/whatsapp` | 11 patterns (wa-kit gallery) + offline ChatAgent |
| `/home/explorations/voice` | Priya + Meera live voice, agent picker, run logging |
| `/home/explorations/architecture` | Commerce 101 roadmap |
