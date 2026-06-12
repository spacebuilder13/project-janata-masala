# Voice Tune Test — v1.1

Subjective eval script for Mumbai male / fast Hinglish agent tune.

## Before you test

1. `node scripts/create-or-patch-agent.js` (prompt v1.1 + voice `ohvvU75FpBEB8fdaLOMh`)
2. `npm run lab` → http://localhost:3000
3. Allow microphone

## Golden script (say exactly this)

> 1kg kaju 13mm, 500 gram elaichi, do packet garam masala, ek kilo haldi

When agent reads back total (~₹1,560), say: **"Haan confirm"**

Then **End call** and check bill + credits panel.

## Score each 1–5

| # | Dimension | 1 = bad | 5 = great |
|---|-----------|---------|-----------|
| W | **Warmth** | Robotic / cold | Feels like neighbourhood shop |
| S | **Speed** | Slow, filler, dead air | Snappy, under 90s |
| L | **Language** | Wrong tone / gender / formal | Natural Mumbai Hinglish |
| O | **Would order again** | No | Yes |

## Log per run

| Field | Where to get it |
|-------|-----------------|
| `session_id` | Browser devtools / `outputs/runs/` |
| `duration_s` | UI timer |
| `el_credits` | Credits panel after call |
| `claude tokens` | Credits panel |
| W, S, L, O | Your scores |

## Pass bar (v1.1)

- W ≥ 4, S ≥ 4, L ≥ 4, O ≥ 4
- Duration ≤ 90s for golden list
- No "bol rahi hoon" or call-centre openers

## Variants (optional)

| # | Utterance | Tests |
|---|-----------|-------|
| 2 | "ek kilo kaju 13mm, aadha kilo elaichi, do packet garam" | Hindi numbers |
| 3 | "kaju" only (no grade) | Single clarify question |
| 4 | English: "one kg turmeric, two garam masala packets" | English switch |

## Regression

```bash
node scripts/test-extraction.js --live   # post-call JSON still valid
```
