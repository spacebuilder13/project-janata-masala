export type ActionItem = {
  id: string
  owner: string
  item: string
  due?: string
  status: 'pending' | 'in-progress' | 'done'
}

export const actionItems: ActionItem[] = [
  { id: 'a1', owner: 'Jay', item: 'Share comprehensive product spreadsheet (pricing, categories, margins)', status: 'pending' },
  { id: 'a2', owner: 'Utsav', item: 'Share branding case studies and ballpark cost estimate', due: 'Within 2 days', status: 'pending' },
  { id: 'a3', owner: 'Neel', item: 'Explore AI tools (ChatGPT/Claude) for Agentic CRM possibilities', status: 'in-progress' },
  { id: 'a4', owner: 'Neyomi', item: 'Packaging template concept within 50k budget scope', status: 'pending' },
  { id: 'a5', owner: 'S&A', item: 'Engagement workspace + NLM grounding', status: 'done' },
  { id: 'a6', owner: 'S&A', item: 'WhatsApp campaign gallery in JM context', status: 'in-progress' },
  { id: 'a7', owner: 'Jay', item: 'Document order flow and inventory lifecycle', status: 'pending' },
]
