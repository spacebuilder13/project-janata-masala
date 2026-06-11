export type WAPattern = {
  id: string
  number: string
  title: string
  intent: string
  jmHook: string
  tags: string[]
  demoType: 'text' | 'buttons' | 'list' | 'carousel' | 'channel'
}

export const JM_WA_PATTERNS: WAPattern[] = [
  {
    id: 'list-dump',
    number: '01',
    title: 'List-dump order',
    intent: 'Housewife sends plain shopping list; staff returns itemized bill + payment link.',
    jmHook: '"1kg kaju, 500g elaichi, 2 garam masala" → bill ₹1,560 + Razorpay link',
    tags: ['retail', 'conversion', 'B2C'],
    demoType: 'text',
  },
  {
    id: 'catalog-carousel',
    number: '02',
    title: 'Masala catalog carousel',
    intent: 'Top SKUs in swipeable carousel — Garam, Chana, Pav Bhaji.',
    jmHook: '"Our bestsellers this season ↑" — tap to add or ask bulk pricing',
    tags: ['catalog', 'conversion'],
    demoType: 'carousel',
  },
  {
    id: 'bulk-order-buttons',
    number: '03',
    title: 'Bulk order quick-reply',
    intent: 'Distributor: 50kg / 100kg / Custom — three reply buttons.',
    jmHook: '[50 kg] [100 kg] [Custom qty] → callback or order form',
    tags: ['B2B', 'conversion'],
    demoType: 'buttons',
  },
  {
    id: 'channels-arrivals',
    number: '04',
    title: 'WhatsApp Channels — new arrivals',
    intent: 'Broadcast updates for moms and older generation on seasonal products.',
    jmHook: '"Fresh 13mm kaju arrived!" — channel post, no 1:1 spam',
    tags: ['channel', 'retention'],
    demoType: 'channel',
  },
  {
    id: 'payment-link',
    number: '05',
    title: 'Bill + payment link',
    intent: 'Post list-parse: performance bill with line items + one-tap pay.',
    jmHook: 'Order #JM-2901 · Total ₹1,560 · [Pay now →]',
    tags: ['trust', 'conversion'],
    demoType: 'buttons',
  },
  {
    id: 'crm-segment',
    number: '06',
    title: 'CRM segment push',
    intent: 'Product-specific content to affinity segments (kaju buyers get kaju reel).',
    jmHook: '"Your favourite 13mm kaju is back in stock" + benefits video',
    tags: ['CRM', 'personal'],
    demoType: 'text',
  },
  {
    id: 'order-confirm',
    number: '07',
    title: 'Order confirmation',
    intent: 'Post-order: ID, items, total, delivery ETA.',
    jmHook: '"Order #JM-2847 confirmed. Delivery tomorrow before 11am."',
    tags: ['trust', 'retail'],
    demoType: 'text',
  },
  {
    id: 'festival-list',
    number: '08',
    title: 'Festival combo list picker',
    intent: 'Navratri / Diwali — sectioned list of combo packs.',
    jmHook: '"Pick your festival combo" → native WA list sheet',
    tags: ['promotion', 'seasonal'],
    demoType: 'list',
  },
  {
    id: 'bundle-essentials',
    number: '09',
    title: 'Monthly Essentials bundle',
    intent: 'Curated bundle increases AOV vs single items.',
    jmHook: '"Monthly Essentials pack — ₹2,400 (save ₹180)"',
    tags: ['conversion', 'retail'],
    demoType: 'buttons',
  },
  {
    id: 'feedback-flow',
    number: '10',
    title: 'Post-delivery feedback',
    intent: 'Rating, freshness check, reorder prompt → CRM note.',
    jmHook: 'Flow: rating + "Reorder kaju?" → CRM segment update',
    tags: ['CRM', 'retention'],
    demoType: 'list',
  },
  {
    id: 'recipe-tiein',
    number: '11',
    title: 'Recipe + product tie-in',
    intent: 'Seasonal recipe linking to masala blend needed.',
    jmHook: '"Perfect Pav Bhaji weekend — you\'ll need our Pav Bhaji Masala"',
    tags: ['brand', 'engagement'],
    demoType: 'text',
  },
]
