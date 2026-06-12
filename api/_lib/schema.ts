export const STRUCTURED_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    order: {
      type: 'object',
      additionalProperties: false,
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              sku: { type: 'string' },
              name: { type: 'string' },
              qty: { type: 'number' },
              unit: { type: 'string' },
            },
            required: ['sku', 'name', 'qty', 'unit'],
          },
        },
        total: { type: 'number' },
        customer_id: { type: 'string' },
      },
      required: ['items', 'total', 'customer_id'],
    },
    inventory_delta: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          sku: { type: 'string' },
          qty: { type: 'number' },
        },
        required: ['sku', 'qty'],
      },
    },
    crm_note: {
      type: 'object',
      additionalProperties: false,
      properties: {
        type: { type: 'string' },
        summary: { type: 'string' },
      },
      required: ['type', 'summary'],
    },
    finance_entry: {
      type: 'object',
      additionalProperties: false,
      properties: {
        type: { type: 'string' },
        amount: { type: 'number' },
      },
      required: ['type', 'amount'],
    },
  },
  required: ['order', 'inventory_delta', 'crm_note', 'finance_entry'],
} as const

export type StructuredOutput = {
  order: {
    items: { sku: string; name: string; qty: number; unit: string }[]
    total: number
    customer_id?: string
  }
  inventory_delta: { sku: string; qty: number }[]
  crm_note: { type: string; summary: string }
  finance_entry: { type: string; amount: number }
}

export function validateStructured(data: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = []
  if (!data || typeof data !== 'object') return { ok: false, errors: ['Not an object'] }
  const d = data as StructuredOutput
  if (!d.order?.items?.length) errors.push('order.items empty')
  if (typeof d.order?.total !== 'number') errors.push('order.total missing')
  if (!d.crm_note?.summary) errors.push('crm_note.summary missing')
  if (!d.finance_entry?.amount) errors.push('finance_entry.amount missing')
  return { ok: errors.length === 0, errors }
}
