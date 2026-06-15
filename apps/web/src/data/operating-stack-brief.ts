/** Operating stack strategy — synthesis from tech executive report (Jun 2026) */

export type OperatingLayer = {
  id: string
  order: number
  name: string
  jobToday: string
  janataToday: string
  bestBet: string
}

export type MatrixQuadrant = {
  id: string
  title: string
  adoption: 'high' | 'low'
  impact: 'high' | 'low'
  examples: string
  highlight?: boolean
}

export type ExecutionMove = {
  id: string
  order: string
  title: string
  summary: string
}

export const operatingLayers: OperatingLayer[] = [
  {
    id: 'world-inputs',
    order: 1,
    name: 'World inputs',
    jobToday: 'Capture what happens in the store and around it',
    janataToday: 'Footfall, phone calls, supplier deliveries, shelf checks, staff memory.',
    bestBet: 'Start with human capture, not sensors or over-automation.',
  },
  {
    id: 'capture-ux',
    order: 2,
    name: 'Capture UX',
    jobToday: 'Make data entry simple enough to use during rush hour',
    janataToday: 'Pen, paper, verbal coordination.',
    bestBet: 'Mobile-first internal workflows with fast search, defaults, and minimal fields.',
  },
  {
    id: 'system-of-record',
    order: 3,
    name: 'System of record',
    jobToday: 'Store canonical business data',
    janataToday: 'Records are fragmented or informal.',
    bestBet: 'A real database core for customers, orders, products, stock, suppliers, and payments.',
  },
  {
    id: 'workflow-logic',
    order: 4,
    name: 'Workflow logic',
    jobToday: 'Standardize repeatable store operations',
    janataToday: 'Founder-dependent execution.',
    bestBet: 'Rules for orders, stock inward, billing, follow-ups, and exceptions.',
  },
  {
    id: 'intelligence',
    order: 5,
    name: 'Intelligence',
    jobToday: 'Turn records into decisions',
    janataToday: 'Ad hoc judgment and memory.',
    bestBet: 'Reorder alerts, repeat-cycle memory, dormant customer prompts, top-SKU tracking.',
  },
  {
    id: 'action-surfaces',
    order: 6,
    name: 'Action surfaces',
    jobToday: 'Get intelligence back into the flow of work',
    janataToday: 'Mostly calls and in-person communication.',
    bestBet: 'WhatsApp for customers, staff console for operations, daily summary for Jay.',
  },
  {
    id: 'management',
    order: 7,
    name: 'Management layer',
    jobToday: 'Give visibility and control',
    janataToday: 'Limited reporting structure today.',
    bestBet: 'A lightweight ops dashboard with daily health, stock risk, and customer activity.',
  },
]

export const designPrinciples = {
  headline: 'The first product is a calm internal operating system — not a customer app.',
  optimizeFor: [
    'Staff usability under pressure.',
    'Low-friction data entry.',
    'Structured customer and order memory.',
    'Inventory visibility starting with stock inward and fast-moving SKUs.',
    'WhatsApp-native customer communication.',
    'Founder liberation through rules, records, and exception views.',
  ],
  avoid: [
    'Consumer app before staff workflows are structured.',
    'Spreadsheets as the long-term transactional core.',
    'Perfect real-time inventory before inward entry discipline.',
    'Autonomous AI before visible human review and exception handling.',
    'Heavy forms that staff abandon during rush periods.',
  ],
}

export const priorityMatrix: MatrixQuadrant[] = [
  {
    id: 'hygiene',
    title: 'Operational hygiene',
    adoption: 'high',
    impact: 'low',
    examples: 'Digital customer records, structured SKU naming, daily summary views.',
  },
  {
    id: 'priority',
    title: 'Priority investments',
    adoption: 'high',
    impact: 'high',
    examples:
      'Fast order capture, WhatsApp confirmation flows, repeat-order memory, stock inward tracking, reorder alerts.',
    highlight: true,
  },
  {
    id: 'experiments',
    title: 'Nice-to-have experiments',
    adoption: 'low',
    impact: 'low',
    examples: 'Fancy loyalty gamification, heavy analytics layers, nonessential visual dashboards.',
  },
  {
    id: 'bets',
    title: 'Strategic bets',
    adoption: 'low',
    impact: 'high',
    examples:
      'Predictive replenishment, automated campaign intelligence, multi-store orchestration, agent-led upsell logic.',
  },
]

export const matrixRule =
  'Build the high-adoption, high-impact quadrant first; test high-impact / low-adoption ideas in narrow pilots; defer the rest.'

export const executionMoves: ExecutionMove[] = [
  {
    id: 'structure',
    order: '01',
    title: 'Structure memory',
    summary: 'Customer database, SKU base, order ledger, supplier list.',
  },
  {
    id: 'stabilize',
    order: '02',
    title: 'Stabilize operations',
    summary: 'Order capture, digital bills, stock inward, daily exception handling.',
  },
  {
    id: 'intelligence',
    order: '03',
    title: 'Add intelligence',
    summary: 'Reorder alerts, dormant customers, repeat-cycle memory, top-SKU tracking.',
  },
  {
    id: 'growth',
    order: '04',
    title: 'Layer growth',
    summary: 'WhatsApp campaigns, community loops, founder content attribution, later agents.',
  },
]

export const mentalModels = [
  { label: 'Retail memory machine', body: 'Every recurring business insight starts as a structured event record.' },
  {
    label: 'Notebook to operating system',
    body: 'Turn store memory into repeatable workflows — not digitization for its own sake.',
  },
  {
    label: 'Rules before agents',
    body: 'Deterministic workflows carry early value; AI amplifies them once records are clean.',
  },
  {
    label: 'Exception-driven management',
    body: 'Jay should see what needs human judgment — not every raw log.',
  },
]
