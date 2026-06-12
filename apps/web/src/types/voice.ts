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

export type ValidationResult = { ok: boolean; errors: string[] }

export type SessionUsage = {
  elevenlabs?: { credits_used: number; duration_secs: number; charging?: unknown }
  claude?: { input_tokens: number; output_tokens: number; total_tokens: number }
  estimated_cost_usd?: number
  estimated_cost_inr?: number
}

export type VoiceCallStatus = 'checking' | 'ready' | 'connecting' | 'live' | 'extracting' | 'done' | 'unavailable' | 'error'

export type DevinPayload = {
  sessionId: string
  conversationId: string
  transcript: string
  structured: StructuredOutput | null
  validation: ValidationResult
  usage: SessionUsage
  meta: Record<string, unknown>
  balance: { character_remaining?: number; pct_remaining?: number; tier?: string } | null
}
