export type WAPattern = {
  id: string
  number: string
  title: string
  intent: string
  jmHook: string
  tags: string[]
}

export const JM_WA_PATTERNS: WAPattern[] = [
  {
    id: 'catalog-carousel',
    number: '01',
    title: 'Masala catalog carousel',
    intent: 'Showcase top SKUs — Garam Masala, Chana Masala, Pav Bhaji — in a swipeable carousel.',
    jmHook: '“Our bestsellers this season ↑” — customer taps to add to cart or ask for bulk pricing.',
    tags: ['catalog', 'conversion'],
  },
  {
    id: 'bulk-order-buttons',
    number: '02',
    title: 'Bulk order quick-reply',
    intent: 'Distributor enquiry: 50kg / 100kg / Custom quantity — three reply buttons, no typing.',
    jmHook: '[50 kg] [100 kg] [Custom qty] → routes to voice callback or order form.',
    tags: ['B2B', 'conversion'],
  },
  {
    id: 'order-confirm',
    number: '03',
    title: 'Order confirmation + tracking',
    intent: 'Post-order message with order ID, items, total, and delivery ETA.',
    jmHook: '“Your Janata Masala order #JM-2847 is confirmed. Delivery by Friday.”',
    tags: ['trust', 'retail'],
  },
  {
    id: 'recipe-inspiration',
    number: '04',
    title: 'Recipe + product tie-in',
    intent: 'Seasonal recipe card linking to the masala blend needed.',
    jmHook: '“Make the perfect Pav Bhaji this weekend — you’ll need our Pav Bhaji Masala.”',
    tags: ['brand', 'engagement'],
  },
  {
    id: 'feedback-flow',
    number: '05',
    title: 'Post-delivery feedback',
    intent: 'WhatsApp Flow: rating, freshness check, reorder prompt.',
    jmHook: 'Structured form → CRM note + reorder suggestion for popular items.',
    tags: ['CRM', 'retention'],
  },
  {
    id: 'promo-list',
    number: '06',
    title: 'Festival promo list picker',
    intent: 'Diwali / Holi offers — sectioned list of combo packs.',
    jmHook: '“Pick your festival combo” → native WA list sheet with 6 options.',
    tags: ['promotion', 'seasonal'],
  },
]
