# Agent instructions — Janata Masala × Spaceships & Atoms

B2B engagement pod for modernizing Janata Masala through agentic commerce.

## First reads

1. `docs/SESSION-HANDOFF.md` — **start here** when resuming
2. `knowledge/stakeholder_brief.md` — people, engagement context
3. `PROGRAM.md` — brief and module priorities
4. `BUILD.md` — routes, stack, deploy
5. `knowledge/jm_source_index.md` — NLM sources and query rules

## Bootstrap phrases

- "continue from SESSION-HANDOFF"
- "continue from BUILD.md"
- "query NLM for X"
- "update adventure module"
- "update explorations"
- "update whatsapp" / "wa-kit" → load `docs/WA_KIT.md` + `docs/VISUAL_QA.md`
- "voice costing report" / "voice cost report" → `docs/VOICE_COSTING_V1.md` + `npm run report:voice-cost`

## WhatsApp / wa-kit

- Kit lives in `apps/web/src/wa-kit/` — **no hex outside `tokens.css`**
- JM demos are thin wrappers in `apps/web/src/components/explorations/wa/demos/`
- New pattern: add primitive to wa-kit first, then JM copy wrapper
- Frame-safe: one carousel card visible; composer always in frame

## NLM

- Notebook ID: `b5db93de-0a0e-49ea-9cd9-6009beabf6ed`
- URL: https://notebooklm.google.com/notebook/b5db93de-0a0e-49ea-9cd9-6009beabf6ed
- CLI only (not MCP): `notebooklm use $NOTEBOOKLM_NOTEBOOK_ID`
- Run queries **sequentially** — never parallel

## Model routing

| Task | Model | Why |
|------|-------|-----|
| Routing, classification, quick edits | Haiku | Cheap, fast |
| Most work — code, analysis, writing | Sonnet | Default |
| Deep architecture, hard planning | Opus | Only when necessary |

## Domains to load

`design`, `coding`, `llm`, `voice`, `deployment`, `knowledge`

## Delegation

| Task | Route to |
|------|----------|
| NLM bulk queries (3+ prompts) | subagent / shell |
| Design capture | browser MCP |
| Stack learnings | append `docs/STACK_DELTA.md` |

Knowledge hub: see vibe-coding-stack `registry/hubs.json` entry `janata-masala`.

## WhatsApp QA discipline

Never mark WhatsApp PASS on DOM refs or accessibility tree alone. Require:

1. `npm run lint:wa` — hex guard
2. `npm run qa:wa-frames` — per-pattern `.wa-mini-frame` screenshots + overflow asserts
3. Human review of `docs/qa-screenshots/v4-frame-*.png` against [Sandy Lab WhatsApp](https://zen-design-pal.lovable.app/sandy-lab/whatsapp)

See [`docs/WA_KIT.md`](docs/WA_KIT.md) for kit structure and frame-safe rules.
