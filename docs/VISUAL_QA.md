# Visual QA — Janata Masala

Pre-deploy checklist for UI changes. **Blocking** for any polish or layout PR.

## Breakpoints

| Width | Device |
|-------|--------|
| 375px | Mobile |
| 768px | Tablet (spot-check) |
| 1280px | Desktop |

## Routes (8 total)

| Route | Purpose |
|-------|---------|
| `/` | Login gate |
| `/home` | Hub — hybrid intro + stage panel |
| `/home/adventure` | Adventure scroll shell — executive brief |
| `/home/explorations` | Explorations index |
| `/home/explorations/whatsapp` | WhatsApp + ChatAgent |
| `/home/explorations/voice` | Voice + system flow |
| `/home/explorations/architecture` | Commerce 101 roadmap |
| `/home/explorations/brand` | Brand & content |

## Checklist

- [ ] No uppercase in input placeholders
- [ ] Body text ≥ 14px, readable
- [ ] Mono labels ≥ 11px (`.tag`, `.mono-caps`, `.caption-label`)
- [ ] All routes use `PageShell` — no ad-hoc `px-6 py-12 max-w-*`
- [ ] Horizontal padding matches `clamp(16px, 4vw, 48px)`
- [ ] Intro lede ≤ 760px on desktop
- [ ] No content orphaned in corner with >50% empty viewport
- [ ] Graph paper fine grid only (no major overlay), vignette visible
- [ ] LivingLines only inside `.jm-stage` / hero banners
- [ ] Card radius unified (`--radius-xl` / `.obj-card`)
- [ ] Zero `text-[10px]` in app chrome (WA mockup interior exempt)
- [ ] Login ≈ [findow-phase1](https://findow-phase1.vercel.app); Home stage ≈ [Sandy Lab](https://zen-design-pal.lovable.app/sandy-lab/living-lines)

## Execution steps

1. `cd apps/web && npm run build`
2. `npm run dev` (or preview production build)
3. Screenshot each route at **375px**, **768px**, and **1280px** (24 total)
4. Save to `docs/qa-screenshots/v2-*.png` (full routes) or `v3-*.png` (section-level)
5. Log pass/fail below with date
6. Deploy only on **PASS**

---

## Section-level QA (v3 — mandatory for Adventure + WhatsApp)

**Deploy blocked** unless all section anchor tests below PASS.

### Adventure anchor pass (1280px)

For each anchor pill on `/home/adventure`: North star, **Today**, **Vision**, **Crawl/Walk/Run**, **Stores**, **Stories**:

1. Click anchor link (or navigate to `#id`)
2. Verify section **heading fully visible** — no clipped serif ascenders under topbar + anchor nav
3. Verify first content row has ≥18px internal padding
4. Screenshot at 1280px → `docs/qa-screenshots/v5-adventure-{section}-1280.png`

### Adventure visual pass (1280px)

- **Today:** 4-stat grid + bullet list; stat values readable at mobile
- **Vision:** 2×2 goal cards + conversion bar chart; chart bars visible at 375px
- **Crawl/Walk/Run:** 3-column step strip; active step spice border
- **Stores:** hyperlocal banner + 2 store cards
- **Stories:** 3 quote cards with serif pull quotes

### List row pass (1280px) — superseded

- ~~Actions, Scope, Meetings, Open questions~~ — removed from Adventure in M2.7

### WhatsApp pass (v4 — Zen gallery + interior frames)

Reference: [Sandy Lab WhatsApp](https://zen-design-pal.lovable.app/sandy-lab/whatsapp) · Kit docs: [`docs/WA_KIT.md`](WA_KIT.md)

**Automated (blocking):**

```bash
cd apps/web && npm run build && npm run lint:wa
npm run preview &
QA_BASE_URL=http://localhost:4173 DEMO_PASSWORD=masala2026 npm run qa:wa-frames
```

- `lint:wa` — zero hex outside `wa-kit/tokens.css`
- `qa:wa-frames` — 11× `v4-frame-{id}.png` + `v4-whatsapp-gallery-1280.png`; no horizontal overflow in `.wa-mini-frame`; composer visible

**Page chrome (1280px):**

- 3-col `.wa-gallery-grid`; Sandy surface cards + elevated stage
- Each card: `.wa-mini-frame` (260×460) with status bar + composer
- All 11 patterns under "all"; tags include `catalog`, `seasonal`, `engagement`
- ChatAgent below gallery in `.wa-chat-section`

**Interior frame pass (blocking — human 5 min):**

- [ ] `v4-frame-catalog-carousel.png` — one full card visible, dots below, no hard clip at bezel
- [ ] `v4-frame-list-dump.png` — outgoing bubble + bill visible without scrolling thread
- [ ] `v4-frame-festival-list.png` — list sheet fits inside frame
- [ ] Side-by-side [Zen Sandy Lab WhatsApp](https://zen-design-pal.lovable.app/sandy-lab/whatsapp) for carousel, reply buttons, list picker
- [ ] `npm run lint:wa` PASS

**2026-06-12 signed:** catalog carousel, list-dump, festival-list — PASS on prod; see `v4-frame-*.png`.

**375px:** single column gallery; no page-level horizontal overflow

**Note:** WA interior font sizes (`text-[10px]` etc.) exempt from body-font rule — **layout inside frame is NOT exempt**.

### WhatsApp pass (v3 — superseded)

- ~~2-col `.jm-cp-stage--chat`; ChatAgent sticky sidebar~~

---

## Log

### 2026-06-12 — Remove Agentic architecture (M2.7 follow-up)

**Build:** `npm run build` — PASS  
**Route verified:** `/home/explorations/architecture` at 1280px + 375px  
**Removed:** Target state / Agentic architecture block (benchmark stack, quadrant, agent flow)  
**Confirmed absent:** "Agentic architecture", "Benchmark stack", phase animate buttons, DiagramQuadrant  
**Artifacts:** `docs/qa-screenshots/v5-architecture-roadmap-only-1280.png`, `v5-architecture-roadmap-only-375.png`

**Overall: PASS** — architecture page is Commerce 101 roadmap only.

### 2026-06-12 — Adventure restructure (M2.7)

**Build:** `npm run build` — PASS  
**Routes verified:** `/home`, `/home/adventure`, `/home/explorations`, `/home/explorations/architecture` at 1280px  
**Adventure anchors:** North star, Today, Vision, Crawl/Walk/Run, Stores, Stories — all present  
**Artifacts:** `docs/qa-screenshots/v5-home-1280.png`, `v5-adventure-1280.png`, `v5-architecture-1280.png`

**Overall: PASS** — Adventure executive brief + Commerce 101 roadmap restructure.

### 2026-06-12 — WA interior frame fix (M2.4)

**Build:** `npm run build` — PASS  
**lint:wa:** PASS (hex only in `wa-kit/tokens.css`)  
**qa:wa-frames:** PASS (11 frame interiors + gallery screenshot)

**Fixes:**
- Extracted canonical `wa-kit/` from zen patterns with CSS classes + tokens
- Frame-safe carousel: single-card snap (no 3×110px clip)
- JM demos rewired as thin wrappers; `data-wa-pattern` for automated QA
- Added `lint:wa`, `qa:wa-frames`, `docs/WA_KIT.md`

**Artifacts:** `docs/qa-screenshots/v4-frame-*.png`, `v4-whatsapp-gallery-1280.png`

**Overall: PASS** — cleared for deploy.

### 2026-06-12 — List row fix (M2.3)

**Build:** `npm run build` — PASS  
**Fixes:**
- `scroll-padding-top` + `.jm-section-anchor` scroll-margin for sticky topbar + anchor nav
- Anchor `id` on `SectionHead` / section headings (not outer wrappers)
- `.list-stack`, `.list-row`, `.status-chip` primitives in `slides.css`
- Migrated ActionTracker, ScopeTracker, OpenQuestions, MeetingCard, BenchmarkStack
- WhatsApp sticky chat column + ChatAgent padding; topbar `position: sticky`

**Section screenshots:** `docs/qa-screenshots/v3-*.png`

| Test | Result | Notes |
|------|--------|-------|
| Anchor jump — all 8 sections | PASS | Headings clear of sticky stack at 1280px |
| Actions list rows + status chips | PASS | Compact chips; 18px row padding |
| Scope list rows | PASS | Phase meta under title |
| Meetings surface cards | PASS | `.surface-card` + caption rhythm |
| Open questions list rows | PASS | Matches action row padding |
| WhatsApp 2-col + ChatAgent | PASS | Sticky panel; 16–20px zones |

**Overall: PASS** — cleared for deploy.

### 2026-06-12 — Adventure layout hotfix (M2.2.1)

**Issues found in user QA:** North Star text clipped at bottom; Phase 1 title clipped at top ("nase 1"); anchor nav misaligned with page padding.

**Fixes:**
- `hero-banner` — LivingLines clipped in inner layer only; body text never `overflow-hidden`
- `surface-card` — replaced ExpandableCard `overflow-hidden` + height animation
- `PageShell` — anchor nav inside `.jm-page` so padding aligns with content
- Removed Framer Motion wrappers from NorthStar/Heritage banners

**Adventure re-check:** North Star full text visible; Phase 1 title readable — PASS

### 2026-06-12 — Full UI/UX revamp (M2.2)

**Build:** `npm run build` — PASS  
**References:** findow login gate, Sandy Lab stage panels, findow CampaignPage rhythm  
**Screenshots:** `docs/qa-screenshots/v2-*.png`

| Route | 375px | 768px | 1280px | Notes |
|-------|-------|-------|--------|-------|
| `/` | PASS | PASS | PASS | pgate centered; placeholder sans-serif |
| `/home` | PASS | PASS | PASS | Editorial intro top; hub cards in `.jm-stage`; no bottom-left orphan |
| `/home/adventure` | PASS | PASS | PASS | `.jm-main` padding; `.tag` anchor nav; section rhythm |
| `/home/explorations` | PASS | PASS | PASS | `.cp-seq-item` left-accent cards |
| `/home/explorations/whatsapp` | PASS | PASS | PASS | `.jm-cp-stage` 2-col; aligned 560px panels |
| `/home/explorations/voice` | PASS | PASS | PASS | Voice in `.jm-stage` |
| `/home/explorations/architecture` | PASS | PASS | PASS | Wide shell; responsive DiagramLoop |
| `/home/explorations/brand` | PASS | PASS | PASS | HeritageFrame + obj-cards |

**Checks:**

| Check | Result |
|-------|--------|
| PageShell on all 8 routes | PASS |
| Input placeholder casing | PASS |
| Body ≥ 14px | PASS |
| Mono labels ≥ 11px | PASS |
| No orphaned layout | PASS |
| Fine grid + vignette | PASS |
| LivingLines discipline | PASS |
| Typo fixed (Modernizing) | PASS |
| Login card ≥380px desktop | PASS |

**Overall: PASS** — cleared for deploy.

### 2026-06-11 — Visual polish pass (M2.1) — superseded

Prior pass fixed login only; home layout still broken. See M2.2 revamp above.
