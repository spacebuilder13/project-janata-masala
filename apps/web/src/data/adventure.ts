export type Meeting = {
  id: string
  date: string
  title: string
  attendees: string[]
  summary: string
  decisions: string[]
  actions: { owner: string; item: string }[]
}

export type ScopeItem = {
  id: string
  area: string
  status: 'planned' | 'in-progress' | 'done'
  description: string
  phase?: string
}

export const meetings: Meeting[] = [
  {
    id: 'm1',
    date: '2026-06-09',
    title: 'Discovery — Modernizing Janata Masala',
    attendees: ['Jay', 'Sohum', 'Neyomi', 'Utsav'],
    summary: 'Aligned on three strategic pillars: business-led growth, premium positioning, agentic CRM. Identified founder dependence as core constraint. WhatsApp-first over website for target demographic.',
    decisions: [
      'Phase 1 focuses on branding + Instagram + WhatsApp operator (not full tech stack yet)',
      'Mini brand revamp within ~50k: branding book, packaging template, workshop videos',
      'Benchmark Janta Stores (channel), CDS WPI (brand), Rupsub (tech destination)',
      'Performance marketing to Ghatkopar Gujarati/Kachchi belt',
    ],
    actions: [
      { owner: 'Jay', item: 'Share product spreadsheet (pricing, categories, margins)' },
      { owner: 'Utsav', item: 'Branding case studies + ballpark estimate (2 days)' },
      { owner: 'Neel', item: 'Explore Agentic CRM tools (ChatGPT/Claude)' },
    ],
  },
  {
    id: 'm2',
    date: '2026-06-10',
    title: 'Creative & channel strategy',
    attendees: ['Sohum', 'Neyomi', 'Utsav', 'TQi team'],
    summary: 'Workshop approach for phone videos. Sensory content (spice crush, 13mm kaju). WhatsApp channels for moms. List-dump ordering as primary commerce flow.',
    decisions: [
      'TQi provides video templates; Jay\'s team shoots at store',
      'WhatsApp Channels for new arrivals (older demographic)',
      'Curated bundles: Monthly Essentials, Navratri Essentials',
      'One packaging template included in Phase 1 budget',
    ],
    actions: [
      { owner: 'Neyomi', item: 'Packaging template concept' },
      { owner: 'S&A', item: 'WhatsApp Business portfolio setup scope' },
      { owner: 'S&A', item: 'Engagement workspace with explorations demos' },
    ],
  },
]

export const openQuestions = [
  'Which ERP/inventory system does JM use today? (pen-and-paper → digital)',
  'Existing WhatsApp Business account or new WABA setup?',
  'Priority SKUs for list-dump demo scenarios?',
  'Jay\'s product spreadsheet — pricing tiers for bulk vs retail?',
  'Private label expansion timeline?',
]

export const scopeItems: ScopeItem[] = [
  { id: 's1', area: 'Engagement workspace', status: 'done', description: 'Login-gated hub with Adventure + Explorations', phase: 'M1' },
  { id: 's2', area: 'Branding book + mockups', status: 'in-progress', description: 'Palette, fonts, voice, 10 touchpoint mockups, packaging template', phase: 'Phase 1' },
  { id: 's3', area: 'Instagram + workshop videos', status: 'in-progress', description: 'Semi-aesthetic phone video system at store', phase: 'Phase 1' },
  { id: 's4', area: 'WhatsApp Business setup', status: 'in-progress', description: 'Dedicated number, operator, campaign patterns', phase: 'Phase 1' },
  { id: 's5', area: 'Inventory + order systems', status: 'planned', description: 'Integrated back-end replacing pen-and-paper', phase: 'Phase 2' },
  { id: 's6', area: 'Agentic CRM + voice', status: 'planned', description: 'Personalization, AI order intake, payment links', phase: 'Phase 3' },
  { id: 's7', area: 'NLM content grounding', status: 'done', description: 'Strategy, benchmarks, playbook from notebook', phase: 'M2' },
]
