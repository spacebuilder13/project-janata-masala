---
name: voice-costing-report
description: >-
  Generate the JM voice demo INR costing report from live voice-runs and
  ElevenLabs balance. Use when the user asks for voice costing report, voice
  cost report, run voice costing, EL spend, or voice demo costs.
---

# Voice Costing Report (v1)

Produce the recurring INR spend report for Priya/Meera voice demos. **Always run the script** — never re-derive costs from memory or published EL $/min rates.

## When to use

- "voice costing report"
- "voice cost report"
- "run voice costing"
- "EL spend" / "voice demo costs"
- "how much have voice demos cost"

## Workflow

1. Read [`docs/VOICE_COSTING_V1.md`](../../docs/VOICE_COSTING_V1.md) for formulas and section template
2. From repo root, run:

```bash
npm run report:voice-cost
```

Requires `DEMO_PASSWORD` in `.env.local` or environment. Optional: `EL_PLAN_USD`, `EL_PLAN_CREDITS`, `USD_INR_FX`, `VOICE_COST_BASE_URL`.

3. Read `outputs/voice-costing/latest.md`
4. Present INR summary in chat using the report sections:
   - Plan economics
   - Dashboard snapshot
   - Gap analysis (non-demo EL usage)
   - Live sessions summary (₹/min all-in)
   - Where money went (call_charge vs llm_charge vs post-call Claude)
   - By outcome and by agent
   - Budget context
5. If a previous `latest.md` exists in git, note deltas (credits used, ₹ spent, new sessions)
6. Link to HTML viewer for transcripts — costing report is cost-only

## Rules

- **All figures in ₹** using Creator plan: `₹ per credit = (EL_PLAN_USD × USD_INR_FX) / EL_PLAN_CREDITS`
- In-call Claude is **inside** EL `llm_charge` credits — do not double-count `llm_price` USD
- Post-call Claude (`estimated_cost_inr`) is **outside** the EL pool
- Classify system/smoke: `session_id` starts with `test-` or `meta.source === "smoke-test"`

## Output paths

| File | Purpose |
|------|---------|
| `outputs/voice-costing/latest.md` | Current report (overwrite each run) |
| `outputs/voice-costing/report-*.md` | Timestamped archive |

## On failure

- `DEMO_PASSWORD is required` → set in `.env.local` or pass inline
- 401 on voice-runs → wrong passcode
- 503 on voice-runs → Blob store not configured on deployment
