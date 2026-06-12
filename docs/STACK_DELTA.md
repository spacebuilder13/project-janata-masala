# Stack Delta — Janata Masala

Learnings to batch-merge into `vibe-coding-stack` at milestones.

## 2026-06-11 — M1 harness

- Reused Sandy tokens + GraphPaper/LivingLines from `zen-money-manager-d8a17b9e` and `project-om-shanti/paul-deck`
- TanStack Router for protected `/home/*` routes with sessionStorage auth
- Vercel API routes at repo root for Claude + ElevenLabs (keys server-side only)
- JM-specific spice accent tokens (`--color-jm-spice`, `--color-jm-turmeric`) layered on Sandy base

## 2026-06-11 — M2 content

- NLM-grounded knowledge layer (Q1–Q3 verbatim, Q4–Q6 synthesis)
- Offline ChatAgent via `chat-memory.ts` keyword router — no API keys for demos
- ConversationSimulator for voice with 2 scenarios (B2B bulk, B2C list-dump)
- Adventure anchor nav + 8 sections; Explorations brand route added
- WAChatFrame for authentic WhatsApp mockups; 11 JM campaign patterns
- Architecture: benchmark stack, phase overlay, DiagramQuadrant

## 2026-06-12 — M2.3–M2.4 UI + WA kit

- Ported findow-phase1 shell CSS (PageShell, tags, slide primitives) + Sandy Lab stage rhythm
- WhatsApp page: Zen 3-col gallery with 260×460 mini-frames + sticky ChatAgent moved below gallery (M2.3)
- Extracted `wa-kit/` — canonical class-based WhatsApp chrome; hex only in `tokens.css`
- Frame-safe carousel (single-card snap); `lint:wa` + Playwright `qa:wa-frames` for interior QA
- Reference: zen-money-manager Sandy Lab WhatsApp; sync procedure in `docs/WA_KIT.md`
