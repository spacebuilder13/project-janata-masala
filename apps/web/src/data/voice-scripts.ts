export type VoiceMessage = { role: 'customer' | 'agent'; text: string }

export type VoiceScenario = {
  id: string
  title: string
  subtitle: string
  messages: VoiceMessage[]
  structured: {
    order: { items: { sku: string; name: string; qty: number; unit: string }[]; total: number; customer_id: string }
    inventory_delta: { sku: string; qty: number }[]
    crm_note: { type: string; summary: string }
    finance_entry: { type: string; amount: number }
  }
}

export const voiceScenarios: VoiceScenario[] = [
  {
    id: 'b2b-bulk',
    title: 'B2B bulk order',
    subtitle: 'Distributor places 50kg Garam + 20kg Pav Bhaji',
    messages: [
      { role: 'customer', text: "Hi, I'd like to place a bulk order for 50kg Garam Masala and 20kg Pav Bhaji Masala." },
      { role: 'agent', text: 'Certainly! May I have your distributor ID?' },
      { role: 'customer', text: 'DIST-4421, Sharma Traders, Pune.' },
      { role: 'agent', text: '50kg Garam at ₹280/kg and 20kg Pav Bhaji at ₹320/kg. Total ₹20,400. Confirm?' },
      { role: 'customer', text: 'Yes, please. Delivery by next Friday.' },
      { role: 'agent', text: 'Confirmed. Order #JM-2847. You\'ll receive the bill on WhatsApp shortly.' },
    ],
    structured: {
      order: {
        items: [
          { sku: 'JM-GARAM-1KG', name: 'Garam Masala', qty: 50, unit: 'kg' },
          { sku: 'JM-PAVBHAJI-1KG', name: 'Pav Bhaji Masala', qty: 20, unit: 'kg' },
        ],
        total: 20400,
        customer_id: 'DIST-4421',
      },
      inventory_delta: [
        { sku: 'JM-GARAM-1KG', qty: -50 },
        { sku: 'JM-PAVBHAJI-1KG', qty: -20 },
      ],
      crm_note: { type: 'bulk_order', summary: 'Sharma Traders — 50kg Garam + 20kg Pav Bhaji, delivery Friday' },
      finance_entry: { type: 'receivable', amount: 20400 },
    },
  },
  {
    id: 'b2c-list-dump',
    title: 'B2C list-dump',
    subtitle: 'Housewife sends shopping list on WhatsApp',
    messages: [
      { role: 'customer', text: '1kg kaju 13mm, 500g elaichi, 2 packets garam masala, 1kg haldi powder' },
      { role: 'agent', text: 'Got it! Let me prepare your bill.' },
      { role: 'agent', text: 'Kaju 13mm 1kg ₹920, Elaichi 500g ₹340, Garam Masala x2 ₹180, Haldi 1kg ₹120. Total ₹1,560.' },
      { role: 'customer', text: 'Ok send payment link' },
      { role: 'agent', text: 'Here\'s your payment link. Delivery tomorrow before 11am. Order #JM-2901.' },
    ],
    structured: {
      order: {
        items: [
          { sku: 'JM-KAJU-13MM', name: 'Kaju 13mm', qty: 1, unit: 'kg' },
          { sku: 'JM-ELAICHI', name: 'Elaichi', qty: 0.5, unit: 'kg' },
          { sku: 'JM-GARAM-PKT', name: 'Garam Masala', qty: 2, unit: 'pkt' },
          { sku: 'JM-HALDI', name: 'Haldi Powder', qty: 1, unit: 'kg' },
        ],
        total: 1560,
        customer_id: 'RETAIL-WA-8821',
      },
      inventory_delta: [
        { sku: 'JM-KAJU-13MM', qty: -1 },
        { sku: 'JM-ELAICHI', qty: -0.5 },
        { sku: 'JM-GARAM-PKT', qty: -2 },
        { sku: 'JM-HALDI', qty: -1 },
      ],
      crm_note: { type: 'retail_order', summary: 'Repeat kaju buyer — prefers 13mm, Ghatkopar delivery' },
      finance_entry: { type: 'receivable', amount: 1560 },
    },
  },
]
