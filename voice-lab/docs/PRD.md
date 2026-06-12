# PRD — Janata Masala Voice Lab

**Version:** v1.0.0  
**Status:** Standalone lab (pre–main-app integration)  
**Last updated:** 2026-06-12

---

## 1. Objective (one sentence)

Build a **standalone local mini-app** that lets a neighbourhood customer **speak a grocery/spice list** to a Janata Masala voice agent, get a **natural multilingual conversation**, and produce **structured back-office output** (order, inventory, CRM note, finance entry) — proving that Jay does not need to be on every call.

**Founder liberation test:** Every demo must answer — *does this reduce Jay's physical presence requirement?*

---

## 2. Problem statement

Janata Masala's growth is constrained by **founder-operational lock-in**. Real kirana commerce already works via **WhatsApp list-dumps** and phone calls (Janta Stores pattern), but:

- Staff time is spent **decoding messy lists** ("1kg kaju 13mm, do packet garam…")
- **Unit and grade ambiguity** causes rework (kg vs packet, 13mm vs regular kaju)
- Orders live in **heads and chats**, not inventory/CRM/finance systems
- Premium SKUs (e.g. 13mm kaju) need **trust and clarification**, not a rigid IVR

A voice agent must feel like **the shop you already trust**, not a call centre bot.

---

## 3. Target user & scenario

| Actor | Need |
|-------|------|
| **B2C neighbourhood buyer** | Dump a shopping list by voice; confirm bill; get delivery/payment next step |
| **S&A / JM stakeholders** | See live conversation + structured output that maps to Inventory · Orders · CRM · Finance |
| **Jay (future)** | Validate that the agent handles JM-specific nuance without him on the line |

**Primary v1 scenario:** B2C list-dump — aligned with JM offline script `b2c-list-dump`.

---

## 4. Success criteria

| # | Criterion | Measurable target |
|---|-----------|-------------------|
| S1 | **End-to-end voice loop works locally** | User starts mic session, completes order, sees structured JSON — no changes to main JM app |
| S2 | **List-dump comprehension** | ≥80% of demo test utterances correctly parsed into line items with SKU mapping |
| S3 | **Clarification when ambiguous** | Agent asks ≤2 targeted questions when unit/grade missing |
| S4 | **Bill read-back** | Total and line items spoken back before confirm |
| S5 | **Structured post-call output** | Valid JSON: `order`, `inventory_delta`, `crm_note`, `finance_entry` |
| S6 | **Multilingual** | Autodetect + respond in Gujarati, Hindi, Marathi, English, or Hinglish |
| S7 | **Latency feels conversational** | No dead air >3s on clarifications |
| S8 | **Stakeholder demo ready** | 5-minute scripted demo path; reproducible on `vercel dev` |
| S9 | **Credits visible** | UI shows ElevenLabs + Claude usage after every session |

---

## 5. In scope (v1)

- Standalone `voice-lab/` subfolder — **no edits to `apps/web/`**
- Browser voice via ElevenLabs ConvAI (signed URL + Web SDK)
- Claude Sonnet 4 in-call (ElevenLabs) + post-call structured extraction
- Demo catalog (~30–50 SKUs) seeded from JM voice-scripts B2C scenario
- B2C list-dump flow: greet → accept list → clarify → quote → confirm → close
- UI: start/stop call, live status, transcript, bill card, structured JSON, credits panel
- Versioned prompts + agent config snapshots
- Local dev with `.env.local`; session artifacts in `outputs/runs/`
- Thumbs up/down feedback per session

---

## 6. Out of scope (v1)

| Out of scope | Why |
|--------------|-----|
| Changes to main JM Vercel app / `apps/web/` | Explicit constraint |
| Real Tally / ERP / inventory API writes | Lab proves extraction quality only |
| Real WhatsApp send / payment links | Mock or placeholder |
| B2B bulk distributor flow | v1 optimizes B2C |
| Real Jay product spreadsheet | Demo catalog; swap path in TRD |
| Production telephony (Twilio) | Browser-first |
| Credit/udhaar ledger | Needs CRM + policy |
| LLM-based call scoring | Deterministic checks first |
| Customer authentication / CRM lookup | Anonymous demo buyer |

---

## 7. Kirana-specific requirements

| Pattern | Requirement |
|---------|-------------|
| **List-dump** | Accept multi-item utterances in one breath |
| **Read-back bill** | Summarize qty × item × price → total before confirm |
| **Grade/spec** | Disambiguate 13mm kaju, elaichi grade, packet vs kg |
| **Substitution** | Offer nearest alternative if SKU unavailable in demo data |
| **Relationship tone** | Warm, familiar — not corporate IVR |
| **Next step** | Close with order ID + "bill on WhatsApp shortly" |

### Multilingual

- Autodetect: Gujarati, Hindi, Marathi, English, Hinglish
- Numbers: "ek kilo", "do packet", "500 gram", mixed numerals
- Code-switch mid-call supported

### Agent must never (v1)

- Invent prices not in demo catalog
- Confirm order without explicit customer confirmation
- Claim real inventory sync
- Offer medical/nutrition advice

---

## 8. Post-call structured output

```json
{
  "order": {
    "items": [{ "sku": "", "name": "", "qty": 0, "unit": "" }],
    "total": 0,
    "customer_id": "RETAIL-DEMO-XXXX"
  },
  "inventory_delta": [{ "sku": "", "qty": -1 }],
  "crm_note": { "type": "retail_order", "summary": "" },
  "finance_entry": { "type": "receivable", "amount": 0 }
}
```

If extraction fails schema validation, UI shows transcript + error — never silent failure.

---

## 9. Roadmap

1. **Now:** Standalone `voice-lab/` proves the loop locally (this PRD)
2. **Next:** Once S1–S9 pass, integrate demo into main web app explorations route — **UX TBD**
3. **Deferred:** Telephony (insurance pattern), real ERP writes, WhatsApp send — not product phases until standalone is proven

No phased v1.1/v2 releases inside the lab. Ship one working loop, then port.

---

## 10. Risks & mitigations

| Risk | Mitigation |
|------|------------|
| SKU hallucination | Catalog in agent knowledge + prompt rules |
| Multilingual ASR errors | Read-back confirmation |
| ElevenLabs cost | 10-min max; credits panel; balance check on load |
| Extraction drift | Golden transcripts + schema validation |
| Main repo pollution | Isolated `voice-lab/` subfolder |

---

## 11. Benchmark inspiration

| Market | Lesson |
|--------|--------|
| **Janta Stores** | List-dump commerce; automate decode, keep human tone |
| **CDS WPI** | Premium SKU storytelling (13mm kaju) |
| **GroceryAI** | Voice notes = housewife list-dump |
| **BiteSpeed / UnleashX** | Voice captures, WhatsApp confirms/pays |
| **project-insurance** | Versioned prompts, eval artifacts, ops discipline |
