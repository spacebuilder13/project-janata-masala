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
}

export const meetings: Meeting[] = [
  {
    id: 'm1',
    date: '2026-06-01',
    title: 'Kickoff — Modernizing Janata Masala',
    attendees: ['S&A Team', 'JM Leadership'],
    summary: 'Aligned on vision: agentic commerce for spice retail — WhatsApp campaigns, voice ordering, integrated back-office.',
    decisions: [
      'Start with explorations demos before production integrations',
      'WhatsApp Business API as primary customer channel',
      'Voice agent for order-taking and enquiries as Phase 1 demo',
    ],
    actions: [
      { owner: 'S&A', item: 'Set up engagement workspace and NLM grounding' },
      { owner: 'JM', item: 'Share product catalog and order flow context' },
    ],
  },
  {
    id: 'm2',
    date: '2026-06-08',
    title: 'Explorations scope — WhatsApp & Voice',
    attendees: ['S&A Team', 'JM Operations'],
    summary: 'Defined demo scenarios: bulk order enquiry, retail customer callback, inventory check on popular SKUs.',
    decisions: [
      'Demo structured output to Inventory, Orders, CRM, Finance',
      'Use Claude for post-conversation orchestration',
    ],
    actions: [
      { owner: 'S&A', item: 'Build WhatsApp campaign gallery in JM context' },
      { owner: 'S&A', item: 'Configure ElevenLabs voice persona for JM' },
    ],
  },
]

export const openQuestions = [
  'Which ERP/inventory system does JM use today?',
  'WhatsApp Business API — existing WABA or new setup?',
  'Priority SKUs for voice demo scenarios?',
  'CRM tool preference for customer notes?',
]

export const scopeItems: ScopeItem[] = [
  { id: 's1', area: 'Engagement workspace', status: 'done', description: 'Login-gated hub with Adventure + Explorations' },
  { id: 's2', area: 'WhatsApp campaigns', status: 'in-progress', description: 'JM-context campaign slides + ChatAgent' },
  { id: 's3', area: 'Voice order-taking', status: 'in-progress', description: 'ElevenLabs demo with structured Claude output' },
  { id: 's4', area: 'System integration', status: 'planned', description: 'Live hooks to Inventory, Orders, CRM, Finance' },
  { id: 's5', area: 'NLM grounding', status: 'planned', description: 'Replace placeholder content with NLM exports' },
]
