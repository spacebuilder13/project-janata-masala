# Voice Costing Report — v1

Recurring INR report for Priya/Meera voice demo spend. Run via `npm run report:voice-cost` or ask the agent: **"voice costing report"**.

## Data sources

| Source | Endpoint | Fields |
|--------|----------|--------|
| Voice run log | `GET /api/voice-runs?key=<DEMO_PASSWORD>&limit=100` | `usage.elevenlabs`, `usage.estimated_cost_inr`, `duration_secs`, `status`, `agent_key`, `session_id`, `meta`, `created_at` |
| EL subscription | `GET /api/usage-snapshot?balance=true` | `character_count_used`, `character_limit`, `character_remaining`, `pct_remaining`, `tier` |

Live app: [`api/voice-runs.ts`](../api/voice-runs.ts), [`api/usage-snapshot.ts`](../api/usage-snapshot.ts).

## Plan economics

All ElevenLabs spend is drawn from the monthly credit pool. **Do not** add published $/min rates or `llm_price` USD on top of credits — in-call Claude is already billed as `llm_charge` credits.

```
₹ per credit     = (EL_PLAN_USD × USD_INR_FX) / EL_PLAN_CREDITS
EL cost (₹)      = credits_used × ₹ per credit
Post-call Claude = usage.estimated_cost_inr  (Anthropic API, outside EL pool)
Full stack (₹)   = EL cost + post-call Claude
```

### Defaults (Creator plan)

| Env var | Default | Meaning |
|---------|---------|---------|
| `EL_PLAN_USD` | `22` | Monthly subscription USD |
| `EL_PLAN_CREDITS` | `248000` | Monthly credit pool |
| `USD_INR_FX` | `83` | FX for ₹ display |
| `VOICE_COST_BASE_URL` | `https://project-janata-masala.vercel.app` | API base |
| `DEMO_PASSWORD` | *(required)* | Auth for voice-runs API |

## Credit breakdown (per run)

From `usage.elevenlabs.charging`:

| Field | Component |
|-------|-----------|
| `call_charge` | Voice / ASR / TTS / connection |
| `llm_charge` | In-call Claude via ElevenLabs |
| `credits_used` | `call_charge + llm_charge` |

Post-call extraction (`usage.estimated_cost_inr`) is a separate Anthropic charge.

## Run classification

| Type | Rule |
|------|------|
| **System / smoke** | `session_id` starts with `test-` OR `meta.source === "smoke-test"` |
| **Live session** | All other runs (`jm-*` with real EL conversation) |

System tests are listed for completeness but excluded from live-session totals.

## Report sections

The script writes markdown with these sections:

1. **Report meta** — generated at (IST), base URL, EL tier, plan params
2. **Plan economics** — ₹/credit, subscription ₹/mo, pool size
3. **Dashboard snapshot** — used / remaining credits and ₹
4. **Gap analysis** — `dashboard_used − sum(all logged EL credits)` = non-demo EL usage
5. **Live sessions summary** — count, credits, talk time, ₹/min
6. **Where money went** — call_charge vs llm_charge vs post-call Claude (₹ + %)
7. **By outcome** — successful (`status=done`) vs failed/aborted
8. **By agent** — Priya vs Meera credits and ₹/min
9. **Per-session table** — IST time, agent, status, duration, credits, EL ₹, Claude ₹, total ₹
10. **Budget context** — % of pool used, estimated minutes remaining

Transcripts: use the [HTML voice-runs viewer](/api/voice-runs?view=html&key=…) — costing report stays cost-focused.

## Output files

| Path | Purpose |
|------|---------|
| `outputs/voice-costing/latest.md` | Always overwritten; commit to track spend over time |
| `outputs/voice-costing/report-<timestamp>.md` | Timestamped archive |

## Agent workflow

1. Read this doc for formulas and section template
2. Run `npm run report:voice-cost` from repo root
3. Read `outputs/voice-costing/latest.md`
4. Present INR summary in chat; compare to previous `latest.md` in git if available
5. **Never** re-derive costs from memory — always use script output

## Manual run

```bash
DEMO_PASSWORD=masala2026 npm run report:voice-cost
```

## Verification (2026-06-17)

Tested on production APIs:

| Check | Result |
|-------|--------|
| Missing `DEMO_PASSWORD` | Exit 1, clear error message |
| `npm run report:voice-cost` | Exit 0; writes `latest.md` + timestamped archive |
| Live fetch | voice-runs + usage-snapshot both return 200 |
| INR math | Creator $22 / 248k credits × ₹83 FX = ₹0.0074/credit |
| Classification | 3 smoke (`test-*`) excluded; 24 live sessions counted |

Agent trigger: say **"voice costing report"** — skill at `.cursor/skills/voice-costing-report/SKILL.md`.
