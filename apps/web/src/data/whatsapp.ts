import type { ComponentType } from 'react'
import { JM_WA_COMPONENTS } from '@/components/explorations/wa/demos'

export type WAPattern = {
  id: string
  number: string
  title: string
  intent: string
  jmHook: string
  api: string
  research: string
  tags: string[]
  demoType: 'text' | 'buttons' | 'list' | 'carousel' | 'channel' | 'flow'
}

export const WA_TAGS = [
  'all',
  'retail',
  'B2B',
  'B2C',
  'conversion',
  'CRM',
  'channel',
  'promotion',
  'brand',
  'personal',
  'trust',
  'retention',
  'catalog',
  'seasonal',
  'engagement',
] as const

export type WATag = (typeof WA_TAGS)[number]

export { JM_WA_COMPONENTS }

export const JM_WA_PATTERNS: WAPattern[] = [
  {
    id: 'list-dump',
    number: '01',
    title: 'List-dump order',
    intent: 'Housewife sends plain shopping list; staff returns itemized bill + payment link.',
    jmHook: '"1kg kaju, 500g elaichi, 2 garam masala" → bill ₹1,560 + Razorpay link',
    api: 'messages · type: text + payment link',
    research: 'Plain-text list ordering matches how Ghatkopar housewives already shop — no app download, no form. Staff parse + bill in-thread closes the loop in one chat.',
    tags: ['retail', 'conversion', 'B2C'],
    demoType: 'text',
  },
  {
    id: 'catalog-carousel',
    number: '02',
    title: 'Masala catalog carousel',
    intent: 'Top SKUs in swipeable carousel — Garam, Chana, Pav Bhaji.',
    jmHook: '"Our bestsellers this season ↑" — tap to add or ask bulk pricing',
    api: 'Media card carousel templates · up to 10 cards',
    research: 'Carousels show 1.7–2.2× engagement vs single-image broadcasts on WA (Meta 2024). Swipeable SKUs let customers browse without leaving chat.',
    tags: ['catalog', 'conversion'],
    demoType: 'carousel',
  },
  {
    id: 'bulk-order-buttons',
    number: '03',
    title: 'Bulk order quick-reply',
    intent: 'Distributor: 50kg / 100kg / Custom — three reply buttons.',
    jmHook: '[50 kg] [100 kg] [Custom qty] → callback or order form',
    api: 'interactive · type: button (max 3)',
    research: 'Reply-button messages convert ~2× higher than free-text prompts on WA Business benchmarks. Tap > type for B2B qty selection.',
    tags: ['B2B', 'conversion'],
    demoType: 'buttons',
  },
  {
    id: 'channels-arrivals',
    number: '04',
    title: 'WhatsApp Channels — new arrivals',
    intent: 'Broadcast updates for moms and older generation on seasonal products.',
    jmHook: '"Fresh 13mm kaju arrived!" — channel post, no 1:1 spam',
    api: 'WhatsApp Channels · broadcast',
    research: 'Channels reach customers who prefer WA over Instagram — ideal for moms and older demographic. Broadcast without 1:1 spam risk.',
    tags: ['channel', 'retention'],
    demoType: 'channel',
  },
  {
    id: 'payment-link',
    number: '05',
    title: 'Bill + payment link',
    intent: 'Post list-parse: itemized bill with line items + one-tap pay.',
    jmHook: 'Order #JM-2901 · Total ₹1,560 · [Pay now →]',
    api: 'interactive · type: cta_url',
    research: 'Branded CTA buttons lift CTR ~1.5× over inline links and reduce phishing-anxiety drop-off. Razorpay in-thread keeps payment inside trusted chat.',
    tags: ['trust', 'conversion'],
    demoType: 'buttons',
  },
  {
    id: 'crm-segment',
    number: '06',
    title: 'CRM segment push',
    intent: 'Product-specific content to affinity segments (kaju buyers get kaju reel).',
    jmHook: '"Your favourite 13mm kaju is back in stock" + benefits video',
    api: 'messages · type: image + caption',
    research: 'Product-affinity segments (kaju buyers → kaju content) increase reorder rate vs generic broadcasts. Personal hook + visual card outperforms text-only.',
    tags: ['CRM', 'personal'],
    demoType: 'text',
  },
  {
    id: 'order-confirm',
    number: '07',
    title: 'Order confirmation',
    intent: 'Post-order: ID, items, total, delivery ETA.',
    jmHook: '"Order #JM-2847 confirmed. Delivery tomorrow before 11am."',
    api: 'messages · type: text (structured)',
    research: 'Structured confirmation messages reduce "did my order go through?" callbacks. ID + ETA in one bubble builds trust for first-time WA buyers.',
    tags: ['trust', 'retail'],
    demoType: 'text',
  },
  {
    id: 'festival-list',
    number: '08',
    title: 'Festival combo list picker',
    intent: 'Navratri / Diwali — sectioned list of combo packs.',
    jmHook: '"Pick your festival combo" → native WA list sheet',
    api: 'interactive · type: list · sections[]',
    research: 'List messages outperform free-text for closed-set choices. Section headers (Navratri / Diwali) cut decision time for seasonal bundles.',
    tags: ['promotion', 'seasonal'],
    demoType: 'list',
  },
  {
    id: 'bundle-essentials',
    number: '09',
    title: 'Monthly Essentials bundle',
    intent: 'Curated bundle increases AOV vs single items.',
    jmHook: '"Monthly Essentials pack — ₹2,400 (save ₹180)"',
    api: 'interactive · type: button',
    research: 'Curated bundles increase average order value vs single-item orders. Reply buttons make the yes/no decision frictionless.',
    tags: ['conversion', 'retail'],
    demoType: 'buttons',
  },
  {
    id: 'feedback-flow',
    number: '10',
    title: 'Post-delivery feedback',
    intent: 'Rating, freshness check, reorder prompt → CRM note.',
    jmHook: 'Flow: rating + "Reorder kaju?" → CRM segment update',
    api: 'WhatsApp Flows · published flow_id',
    research: 'Flows reduce drop-off vs web-form redirects by 40–60% on post-purchase journeys. Rating + reorder in-app enriches CRM without a survey link.',
    tags: ['CRM', 'retention'],
    demoType: 'flow',
  },
  {
    id: 'recipe-tiein',
    number: '11',
    title: 'Recipe + product tie-in',
    intent: 'Seasonal recipe linking to masala blend needed.',
    jmHook: '"Perfect Pav Bhaji weekend — you\'ll need our Pav Bhaji Masala"',
    api: 'messages · type: image + caption',
    research: 'Visual-first recipe tie-ins outperform text-only product pushes on comprehension. Seasonal context (weekend cooking) makes the product feel helpful, not promotional.',
    tags: ['brand', 'engagement'],
    demoType: 'text',
  },
]

export type JMWAComponentMap = Record<string, ComponentType>
