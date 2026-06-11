# PROJECT JANATA MASALA — CLAUDE WORKSPACE

**Client:** Janata Masala  
**Partner:** Spaceships & Atoms (S&A)  
**Engagement:** Modernizing Janata Masala — agentic commerce, WhatsApp campaigns, voice order-taking  
**Status:** M1 harness — landing + home hub + explorations demos

---

## AGENT QUICKSTART

Read in order:

1. `knowledge/stakeholder_brief.md`
2. `PROGRAM.md`
3. `BUILD.md`
4. `knowledge/jm_source_index.md`

---

## NOTEBOOKLM

**Notebook:** Janata Masala  
**ID:** `b5db93de-0a0e-49ea-9cd9-6009beabf6ed`  
**URL:** https://notebooklm.google.com/notebook/b5db93de-0a0e-49ea-9cd9-6009beabf6ed

**Query discipline:**
- Sequential only (never parallel)
- Preserve responses verbatim in `outputs/`
- Tag: VERBATIM | SYNTHESIS | INVESTIGATIVE

---

## ROUTES (live app)

| Route | Purpose |
|-------|---------|
| `/` | Login / Landing — S&A × JM co-branding |
| `/home` | Hub — Adventure + Explorations cards |
| `/home/adventure` | Moderning Janata Masala — meetings, decisions, scope |
| `/home/explorations` | Explorations hub |
| `/home/explorations/whatsapp` | WhatsApp campaign + ChatAgent |
| `/home/explorations/voice` | VoiceAgent + system flow diagram |
| `/home/explorations/architecture` | Agentic commerce architecture |

---

## COPY RULES

- NLM-backed claims only; label inferences
- Demo voice/chat agents are illustrative, not production JM systems
- Architecture diagram shows target state, not live integrations

---

## INTEGRATIONS

- **Claude API** — ChatAgent, structured post-call output (`api/chat.ts`)
- **ElevenLabs** — VoiceAgent via signed URL (`api/voice-token.ts`)
- **Auth** — Passcode gate (`api/auth.ts` + `DEMO_PASSWORD` env)
