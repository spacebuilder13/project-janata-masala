export type ChatMemoryEntry = {
  keywords: string[]
  response: string
}

export const suggestedPrompts = [
  'How does list-dump ordering work?',
  'Explain the benchmark stack',
  'What is Phase 1 deliverables?',
  'WhatsApp channels for moms?',
  'Workshop video approach?',
  'Agentic CRM for JM?',
]

export const chatMemory: ChatMemoryEntry[] = [
  {
    keywords: ['list-dump', 'list dump', 'ordering', 'order', 'whatsapp order'],
    response: 'List-dump ordering (Janta Stores model): housewives send a plain list in WhatsApp → staff parses items → itemized bill + payment link in chat. No website needed. This is the lowest-hanging fruit for JM\'s Ghatkopar demographic.',
  },
  {
    keywords: ['benchmark', 'stack', 'janta', 'cds', 'rupsub', 'compare'],
    response: 'Benchmark stack: CDS WPI (brand — premium feel, sensory content) + Janta Stores Borivali (channel — WhatsApp list-dump) in Phase 1. Rupsub (tech — CRM, AI voice, multi-location) is the Phase 2–3 destination.',
  },
  {
    keywords: ['phase 1', 'phase one', 'branding', 'instagram', 'deliverable'],
    response: 'Phase 1 (~4 weeks): branding book, Instagram launch, workshop for phone videos, WhatsApp number with operator, one packaging template. Evaluated against: does this reduce Jay\'s physical presence?',
  },
  {
    keywords: ['phase 2', 'inventory', 'systems', 'integration'],
    response: 'Phase 2 (4–6 weeks): inventory, order intake, logistics modules. All systems talk to each other — replace pen-and-paper. Document goods lifecycle storage → dispatch.',
  },
  {
    keywords: ['phase 3', 'crm', 'agentic', 'voice', 'digital interface'],
    response: 'Phase 3 (4–6 weeks): WhatsApp-led or hybrid interface, full Agentic CRM, automated billing + payment links, real-time inventory. AI voice agents for peak demand (Rupsub model).',
  },
  {
    keywords: ['channel', 'channels', 'moms', 'older', 'broadcast'],
    response: 'WhatsApp Channels: new arrivals and seasonal updates for moms and older generation. More trusted than website. Complements 1:1 list-dump ordering in chat.',
  },
  {
    keywords: ['workshop', 'video', 'reel', 'instagram', 'phone'],
    response: 'Workshop approach: TQi teaches Jay\'s staff to shoot semi-aesthetic videos on phones. Templates for hooks, transitions, cuts. TQi edits raw footage into reels. Sustainable vs full production crew every post.',
  },
  {
    keywords: ['packaging', 'template', 'dry fruit', '50k', 'budget'],
    response: 'Within 50k budget: one templatized dry-fruit packaging design Jay can duplicate across product lines. Part of mini brand revamp alongside branding book and 10 mockups.',
  },
  {
    keywords: ['brand', 'janta', 'heritage', 'premium', 'sabyasachi'],
    response: '"Janta" as heritage authority — Sabyasachi not Zara. Serious buyers come for originality. Sensory content (spice crush, 13mm kaju USP) justifies premium. Gujarati-Kachchi Ghatkopar audience demands quality.',
  },
  {
    keywords: ['performance', 'marketing', 'meta', 'ghatkopar', 'ads'],
    response: 'Performance marketing: Meta/Instagram ads targeting affluent Gujarati-Kachchi in Ghatkopar belt. Drive 30% revenue on low-stake items → justify larger CRM/videography retainer.',
  },
  {
    keywords: ['crm', 'segment', 'personal', 'birthday', 'kaju'],
    response: 'Agentic CRM: track birthdays, preferences, product affinity. Push kaju content to kaju buyers. Satisfy "customer ego" through personalization — the familiarity they expect from Jay, at scale.',
  },
  {
    keywords: ['founder', 'jay', 'liberation', 'north star', 'present'],
    response: 'North star: Can Janata Masala run without Jay physically present? Every Phase 1 deliverable is brand as operating system — infrastructure for multi-store, multi-staff scale.',
  },
  {
    keywords: ['default'],
    response: 'Ask about list-dump ordering, the benchmark stack (CDS/Janta/Rupsub), phase deliverables, WhatsApp channels, workshop videos, or Agentic CRM. All grounded in JM\'s modernization plan.',
  },
]

export function matchChatResponse(input: string): string {
  const lower = input.toLowerCase()
  for (const entry of chatMemory) {
    if (entry.keywords.includes('default')) continue
    if (entry.keywords.some((k) => lower.includes(k))) return entry.response
  }
  return chatMemory.find((e) => e.keywords.includes('default'))!.response
}
