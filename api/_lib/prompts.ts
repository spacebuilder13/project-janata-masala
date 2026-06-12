import { getCatalogSummary } from './catalog'

export function buildExtractionPrompt(transcript: string, catalogSummary?: string): string {
  const catalog = catalogSummary ?? getCatalogSummary()
  return `Extract structured actionable output from this Janata Masala voice order conversation.

Rules:
- Map items only to SKUs from this catalog (sku|name|unit|price):
${catalog}
- customer_id: RETAIL-DEMO- plus last 4 chars of session if unknown
- crm_note.type: retail_order
- finance_entry.type: receivable
- inventory_delta qty: negative for outbound
- Return JSON only matching the schema

Transcript:
${transcript}`
}
