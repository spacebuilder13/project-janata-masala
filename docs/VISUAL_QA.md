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
| `/home/adventure` | Adventure scroll shell |
| `/home/explorations` | Explorations index |
| `/home/explorations/whatsapp` | WhatsApp + ChatAgent |
| `/home/explorations/voice` | Voice + system flow |
| `/home/explorations/architecture` | Agentic commerce diagram |
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

For each anchor pill on `/home/adventure`: North star, Pillars, Roadmap, Benchmarks, Meetings, **Actions**, **Scope**, Questions:

1. Click anchor link (or navigate to `#id`)
2. Verify section **heading fully visible** — no clipped serif ascenders under topbar + anchor nav
3. Verify first content row has ≥18px internal padding
4. Screenshot at 1280px → `docs/qa-screenshots/v3-adventure-{section}-1280.png`

### List row pass (1280px)

- **Actions:** `.status-chip` compact mono pills; `.list-row` 18–20px padding; 12px stack gap
- **Scope:** phase label under title via `.list-row-meta`; not floating outside card
- **Meetings:** `.surface-card` rhythm; decision tags use `.tag`
- **Open questions:** same row height/padding as actions

### WhatsApp pass (v4 — Zen gallery)

Reference: [Sandy Lab WhatsApp](https://zen-design-pal.lovable.app/sandy-lab/whatsapp)

- **1280px:** 3-col `.wa-gallery-grid`; each `.wa-gallery-card` has Sandy surface + elevated stage
- **1280px:** Each card contains `.wa-mini-frame` (260×460 black bezel) with status bar + composer
- **1280px:** Carousel pattern (02) renders swipe cards — not text fallback
- **1280px:** All 11 patterns visible under "all"; filter tags include `catalog`, `seasonal`, `engagement`
- **1280px:** ChatAgent below gallery in `.wa-chat-section` (not sticky sidebar)
- **375px:** single column gallery; no horizontal overflow
- Screenshot: `docs/qa-screenshots/v4-whatsapp-gallery-1280.png`

### WhatsApp pass (v3 — superseded)

- ~~2-col `.jm-cp-stage--chat`; ChatAgent sticky sidebar~~

---

## Log

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
