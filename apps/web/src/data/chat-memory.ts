export type ChatMemoryEntry = {
  keywords: string[]
  response: string
}

export const suggestedPrompts = [
  'How does list-dump ordering work?',
  'What is Commerce 101?',
  'Explain the three pillars',
  'WhatsApp channels for moms?',
  'Crawl Walk Run strategy?',
  'Agentic CRM for JM?',
]

export const chatMemory: ChatMemoryEntry[] = [
  {
    keywords: ['list-dump', 'list dump', 'ordering', 'order', 'whatsapp order'],
    response: 'List-dump ordering: housewives send a plain list in WhatsApp → staff parses items → itemized bill + payment link in chat. Digital bills force phone + address capture into CRM. Primary channel for JM\'s Ghatkopar demographic.',
  },
  {
    keywords: ['commerce 101', 'crawl', 'walk', 'run', 'three pillar'],
    response: 'Commerce 101 (Crawl): three operational pillars — CRM (10k contacts), WhatsApp backbone (orders + digital bills), inward inventory (weeks-of-stock). Walk = hyper-local growth + founder-led reels. Run = premium branding (deferred until top-line profit).',
  },
  {
    keywords: ['phase 1', 'phase one', 'crawl', 'deliverable'],
    response: 'Crawl / Phase 1: structured CRM, WhatsApp commerce flow, inward inventory tracking. Every interaction is a data channel. Branding book intentionally deferred to Run phase.',
  },
  {
    keywords: ['phase 2', 'walk', 'inventory', 'outward'],
    response: 'Walk / Phase 2: founder-led Instagram, hyper-local targeting (40–65 Gujarati/Kachchi women, 1km radius), after-hours chatbot, outbound inventory tracking, voice agent for peak hours.',
  },
  {
    keywords: ['phase 3', 'run', 'crm', 'agentic', 'voice', 'brand book'],
    response: 'Run / Phase 3: premium brand book, agency marketing, full agentic CRM, QR/barcode automation, voice agents integrated with inventory. Only after Commerce 101 drives profit.',
  },
  {
    keywords: ['channel', 'channels', 'moms', 'older', 'broadcast'],
    response: 'WhatsApp Channels: seasonal updates and new arrivals for moms and older generation. Complements 1:1 list-dump ordering — more trusted than a website for this demographic.',
  },
  {
    keywords: ['workshop', 'video', 'reel', 'instagram', 'phone', 'utsav'],
    response: 'Founder-led content: Utsav teaches Jay to shoot and edit authentic reels on phone — community tone (Heeraben testimonials) over agency production. Deferred fancy branding to Run phase.',
  },
  {
    keywords: ['crm', 'contact', '10000', '10,000', 'database', 'haldi'],
    response: 'CRM is JM\'s biggest asset — move from pen-and-paper to 10,000 structured contacts. 1% on 10k = 100 sales vs 1 on 100. Enables re-engagement (e.g. haldi buyer who hasn\'t returned in a year).',
  },
  {
    keywords: ['inventory', 'inward', 'stock', 'qr', 'barcode'],
    response: 'Inward inventory (Crawl): track goods on arrival, weeks-of-stock visibility, low-stock reorder alerts. QR/barcode tagging deferred to Walk/Run — follow the money through inventory lifecycle.',
  },
  {
    keywords: ['founder', 'jay', 'liberation', 'north star', 'present'],
    response: 'North star: Can Janata Masala run without Jay physically present? Commerce 101 first — CRM, WhatsApp backbone, inward inventory. Systems and data before premium branding.',
  },
  {
    keywords: ['default'],
    response: 'Ask about Commerce 101, the three pillars (CRM/WhatsApp/inventory), Crawl/Walk/Run, list-dump ordering, or agentic CRM. Grounded in JM\'s modernization plan.',
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
