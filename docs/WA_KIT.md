# WA Kit — WhatsApp mockup design system

Canonical source for WhatsApp phone mockups in Janata Masala. Ported and refactored from `zen-money-manager-d8a17b9e/src/sandy-lab/whatsapp/patterns/index.tsx`.

## Structure

```
apps/web/src/wa-kit/
  tokens.css       ← ONLY file allowed to contain hex colors
  chrome.css       ← phone shell (status, header, thread, composer)
  bubbles.css      ← bubbles, reply rows, carousel, sheets, channel cards
  WAChrome.tsx
  Bubble.tsx
  primitives/      ← reusable interactive demos
  index.ts
```

JM-specific copy lives in [`apps/web/src/components/explorations/wa/demos/`](../apps/web/src/components/explorations/wa/demos/) as thin wrappers.

## Adding a new pattern

1. Add primitive to `wa-kit/primitives/` if the interaction type is new
2. Use CSS classes from `chrome.css` / `bubbles.css` — **no inline hex**
3. Add JM wrapper in `demos/index.tsx` with copy only
4. Register in `whatsapp.ts` + `JM_WA_COMPONENTS`
5. Run `npm run lint:wa` and `npm run qa:wa-frames`
6. Backport primitive to `zen-money-manager` when Sandy Lab needs the same interaction

## Frame-safe rules

- Carousel: one card visible (`translateX`), dots for navigation — never 3×110px row
- Wide bubbles: `.wa-bubble--wide` (92% max-width) for carousels and CTAs
- Thread: `max-height: var(--wa-thread-max)` with scroll
- Sheets: `max-height: 72%` of thread area
- Composer must always remain visible inside `.wa-mini-frame`

## Sync with zen-money-manager

When zen adds a new WA API surface, port the primitive here first (or vice versa), then align `tokens.css` values. Until a shared package exists, copy files manually and note the delta in commit messages.

## QA

```bash
npm run lint:wa          # hex guard
npm run build && npm run preview &
QA_BASE_URL=http://localhost:4173 npm run qa:wa-frames
```

See [`docs/VISUAL_QA.md`](VISUAL_QA.md) interior frame pass.
