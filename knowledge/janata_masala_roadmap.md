# Janata Masala — Strategic Roadmap
> Source document for webapp integration. All content, design specs, and interaction notes are included below.

---

## Webapp Layout Notes

- **Phase 1** renders as a full 4-column segment matrix with detailed deliverables per cell
- **Phase 2 + 3** collapse the segment columns entirely — each phase renders as a single full-width block with an objective + input goals. These are intentionally flexible; treat them as dynamic Kanban boards where items can be moved between phases based on outcomes
- The **phase unlock statement** is the most important UI element per phase — it should read as a headline or section anchor, not a footnote
- Segment column headers (color-coded) appear only in Phase 1
- A **scope badge** is shown on Phase 1 (no rupee value — just an indicator that this is the active scope)

---

## Design Tokens

| Segment | Hex | Usage |
|---|---|---|
| Brand identity | `#7F77DD` | Purple — 3px top bar on column header |
| Content + Instagram | `#D85A30` | Coral — 3px top bar |
| WhatsApp CRM + commerce | `#1D9E75` | Teal — 3px top bar |
| Performance marketing | `#BA7517` | Amber — 3px top bar |

- Phase 1 cells: secondary background (slightly off-white / surface)
- Phase 2 + 3 blocks: primary background (white / base)
- Grid lines: 1px, tertiary border color
- All text: uses CSS variables for light/dark mode compatibility

---

## Phase 1

**Phase label:** Phase 1
**Duration:** 4 weeks
**Scope badge:** Active scope (no currency value)
**Objective:** Give Janata Masala its brand, its first content system, and its WhatsApp door

**Phase unlock statement:**
> Janata Masala has a brand, a content engine, an open WhatsApp door, and its first paid reach into the community.

---

### Segment 1 — Brand identity

> All items below are components of a single deliverable: a comprehensive 50-page branding book. The book is the deliverable — not each item in isolation. Brand identity flows from the branding book.

**Primary deliverable:**
- Comprehensive 50-page branding book

**Contents of the branding book:**
- Color palette *(defined hex values + usage guidelines)*
- Font palette *(typefaces + typographic hierarchy)*
- Brand voice + tone *(how Janata Masala speaks and feels)*
- Taglines
- 10 brand use case mockups *(brand shown in real-world contexts)*
- Reusable packaging template *(example format: dry fruits — Jay replicates the template across other product categories himself)*

**Note:** Logo is not in scope. Client has explicitly signalled no logo change.

---

### Segment 2 — Content + Instagram

> Phase 1 scope is intentionally narrow here. The goal is to give Jay's team the tools to create content independently — not to create content for them at scale yet.

- In-store shoot workshop
  *(TQi teaches Jay's team to shoot semi-aesthetic videos on their phones)*
- Hook, transition + cut templates
  *(Consistent format for anyone on the team to use)*

**Items moved to Phase 2:**
- TQi editing raw footage into reels
- Sensory-first content direction (spices being crushed, 13mm cashews, purity cues)
- Testimonial videos from housewife demographic
- Populating Instagram with testimonial content

---

### Segment 3 — WhatsApp CRM + commerce

> Goal for Phase 1: completely functional for human-operator-led usage. No automation yet.

- WhatsApp Business account setup
- Full product portfolio loaded into WA catalog
  *(Every SKU browsable + shareable from WhatsApp)*
- WhatsApp Channels configured
  *(New arrival updates — built for moms + older generation)*

---

### Segment 4 — Performance marketing

> Strategy: Push mid-quality videos — the kind created via the in-store phone-video workshop — repeatedly to target segments to encourage them to try placing an order via WhatsApp. A portion of the budget is allocated to performance marketing to drive immediate trials during this initial phase.

- Meta + IG ad targeting setup
  *(Affluent Gujarati + Kachchi community, Ghatkopar belt)*
- Initial campaigns on low-stake items
  *(Drive WhatsApp trial, not just reach or impressions)*

---

## Phase 2

**Phase label:** Phase 2
**Duration:** 4–6 weeks
**Layout:** Full-width block — no segment columns
**Scope:** Flexible / Kanban. Items can shift based on Phase 1 outcomes.

**Objective:**
> Every order can be placed and tracked without Jay on the phone. The store runs without him in the room.

**Input goals for this phase:**
- Content reaches a defined number of people (target TBD after Phase 1 data)
- A defined number of WhatsApp conversations initiated directly from the campaign
- Begin experimenting with voice agents for inbound order intake

**Directional scope (subject to change):**
- TQi editing raw footage → high-quality reels with trending music
- Sensory-first content (spices crushed, unique product USPs, purity cues)
- Testimonial video production + Instagram cadence
- Conversational order flow (customer dumps list → immediate bill + payment link)
- CRM setup — links customers to order history + preferences
- CRM-linked ad pushing (right content to right segment at right time)
- Audience segmentation: housewives, bulk buyers, gifting occasion

---

## Phase 3

**Phase label:** Phase 3
**Duration:** 4–6 weeks
**Layout:** Full-width block — no segment columns
**Scope:** Flexible / Kanban. Items evolve based on Phase 2 outcomes.

**Objective:**
> Janata Masala serves and grows customers autonomously. Jay is free to open Store 2.

**Input goals for this phase:**
- Voice agents integrated with inventory + order management systems
- CRM-personalized content running at scale
- Multi-store brand system ready for expansion

**Directional scope (subject to change):**
- Agentic CRM — AI-assisted autonomous order intake (ChatGPT / Claude powered)
- Refined customer experience: WhatsApp, website, or hybrid model
- Recurring order management
- Full Meta + IG campaigns with CRM-push and retargeting
- Full retainer: CRM + videography (TQi's long-term engagement model)

---

## Segment Reference (for Phase 2 + 3 tag chips if needed in UI)

If the webapp shows segment tags on Phase 2/3 Kanban items, use these labels and colors:

| Tag | Hex |
|---|---|
| Brand identity | `#7F77DD` |
| Content + Instagram | `#D85A30` |
| WhatsApp CRM + commerce | `#1D9E75` |
| Performance marketing | `#BA7517` |

---

## Open Questions / Flags for Builder

1. **Phase 1 scope badge:** Show as a pill/tag — label only, no rupee value. Suggested label: `Active scope` or `Current phase`
2. **Phase 2 + 3 Kanban:** Items under "Directional scope" should ideally be draggable/moveable between phases in the webapp. Flag this as a future interaction if not building drag-drop in v1
3. **Input goals fields:** Consider making these editable inline so Jay or the team can fill in the actual target numbers once Phase 1 data comes in
4. **Phase unlock statement:** Treat this as the phase's headline — not a subtitle. It should be the first thing a reader sees when they look at a phase
5. **Logo exclusion note:** Do not include logo as a deliverable anywhere in the UI — not in Phase 1, not in later phases
