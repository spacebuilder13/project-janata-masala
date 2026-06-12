# Janata Masala Voice Lab

Standalone browser voice agents for B2C ordering. Does **not** modify `apps/web/`.

## Quick start

```bash
# From repo root — sync catalog knowledge
node scripts/generate-catalog-knowledge.mjs

cd voice-lab
cp .env.example .env.local
# Add ELEVENLABS_API_KEY, ANTHROPIC_API_KEY

npm install
node scripts/create-or-patch-agent.js --agent all
# Add printed agent IDs to .env.local:
#   ELEVENLABS_AGENT_ID_PRIYA=...
#   ELEVENLABS_AGENT_ID_MEERA=...

npm run lab            # build + vercel dev → http://localhost:3000
```

## Agents

| Agent | Role | Prompt | EL tuning |
|-------|------|--------|-----------|
| **Priya** | Fast list-dump (Janta Stores) | v1.2.0-priya | eager, speed 1.08 |
| **Meera** | Warm counter expert | v2.0.0-meera | normal, speed 0.98 |

Both pronounce the brand **"Janta Masala"** when speaking (written: Janata Masala).

```bash
node scripts/create-or-patch-agent.js --agent priya
node scripts/create-or-patch-agent.js --agent meera
node scripts/create-or-patch-agent.js --agent all
```

## Meera demo script

1. Start call — warm open from Meera
2. Ask: *"Kya kya hai stock mein?"* — category inventory
3. Order mirchi + haldi — expect dhaniya pairing suggestion
4. Say *"bas"* — expect *"aur kuch?"* then bill

## Priya demo script

1. Start call — short open
2. Dump list fast — no upsell
3. Confirm bill — end call

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
node ../scripts/generate-catalog-knowledge.mjs
node scripts/create-or-patch-agent.js --agent all
npm run test:extract
```

## Voice

- Hindi voice: `ohvvU75FpBEB8fdaLOMh` (Monika Sogam)
- Catalog: `data/catalog.demo.json` (demo-v2 with categories, launches, pairings)
- Generated prompt knowledge: `prompts/jm-catalog-knowledge.generated.md`

## Docs

- [PRD](docs/PRD.md)
- [TRD](docs/TRD.md)
- [VOICE-TUNE-TEST](docs/VOICE-TUNE-TEST.md)
