# Janata Masala Voice Lab

Standalone browser voice agent for B2C list-dump ordering. Does **not** modify `apps/web/`.

## Quick start

```bash
cd voice-lab
cp .env.example .env.local
# Add ELEVENLABS_API_KEY, ANTHROPIC_API_KEY

npm install
npm run setup-agent    # creates/patches ElevenLabs agent, prints ELEVENLABS_AGENT_ID
# Add ELEVENLABS_AGENT_ID to .env.local

npm run lab            # build + vercel dev → http://localhost:3000
```

## 5-minute demo script

1. Open http://localhost:3000 — check ElevenLabs credits balance in header
2. Click **Start order** — allow microphone
3. Say (Hinglish): *"1kg kaju 13mm, 500 gram elaichi, do packet garam masala, ek kilo haldi"*
4. Confirm when agent reads back total (~₹1,560)
5. Click **End call** — review bill card, credits panel, structured JSON
6. Thumbs up/down for feedback

### Test matrix

| # | Language | Utterance |
|---|----------|-----------|
| 1 | Hinglish | Golden list above |
| 2 | Hindi | "ek kilo kaju 13mm, aadha kilo elaichi, do packet garam" |
| 3 | Gujarati mix | Same items with Gujarati numbers |
| 4 | Ambiguity | "kaju" only → agent should ask 13mm vs regular |
| 5 | English | "one kg turmeric powder, two packets garam masala" |

## API routes

| Route | Purpose |
|-------|---------|
| `GET /api/voice-token` | Signed URL for Web SDK |
| `POST /api/post-call-extract` | Claude Sonnet structured extraction |
| `GET /api/usage-snapshot` | EL balance or per-conversation credits |
| `POST /api/save-run` | Write run artifacts + ledger CSV |
| `POST /api/admin/setup-agent` | Re-sync prompts to ElevenLabs agent |

## Scripts

```bash
npm run setup-agent          # create/patch ElevenLabs agent (v1.1: eager turns, Hindi voice)
npm run test:extract         # offline fixture check
node scripts/test-extraction.js --live   # needs vercel dev + Anthropic key
```

## Artifacts

Per session: `outputs/runs/{sessionId}/`  
Ledger: `outputs/analytics/session_ledger.csv`

## Voice (v1.1)

- Hindi voice: `ohvvU75FpBEB8fdaLOMh` (Monika Sogam — added from ElevenLabs library)
- Persona: Priya, Mumbai counter staff — fast Hinglish, list-dump flow
- Subjective eval: [VOICE-TUNE-TEST.md](docs/VOICE-TUNE-TEST.md)

## Docs

- [PRD](docs/PRD.md)
- [TRD](docs/TRD.md)

## Credits visibility

After each call the UI shows:
- **ElevenLabs:** credits from conversation charging API
- **Claude:** input/output tokens + estimated INR

## Integration (later)

Once S1–S9 pass, port to main app `/home/explorations/voice` — UX TBD.
