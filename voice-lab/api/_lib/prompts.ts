import fs from 'fs'
import path from 'path'

export function loadPrompt(name: string): string {
  const p = path.join(process.cwd(), 'prompts', name)
  return fs.readFileSync(p, 'utf8')
}

export function buildSystemPrompt(): string {
  const system = loadPrompt('jm-voice-system.md')
  const closure = loadPrompt('jm-voice-closure.md')
  const rules = loadPrompt('jm-catalog-rules.md')
  return [system, closure, rules].join('\n\n---\n\n')
}

export function buildExtractionPrompt(transcript: string, catalogSummary: string): string {
  return `Extract structured actionable output from this Janata Masala voice order conversation.

Rules:
- Map items only to SKUs from this catalog (sku|name|unit|price):
${catalogSummary}
- customer_id: RETAIL-DEMO- plus last 4 chars of session if unknown
- crm_note.type: retail_order
- finance_entry.type: receivable
- inventory_delta qty: negative for outbound
- Return JSON only matching the schema

Transcript:
${transcript}`
}
