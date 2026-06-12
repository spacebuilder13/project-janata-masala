export type ClaudeUsage = {
  input_tokens: number
  output_tokens: number
  total_tokens: number
}

export function estimateClaudeCostUsd(model: string, usage: ClaudeUsage): number {
  const m = model.toLowerCase()
  const inputRate = m.includes('sonnet') ? 3 / 1_000_000 : 1 / 1_000_000
  const outputRate = m.includes('sonnet') ? 15 / 1_000_000 : 5 / 1_000_000
  return usage.input_tokens * inputRate + usage.output_tokens * outputRate
}

export function toInr(usd: number): number {
  const fx = Number(process.env.USD_INR_FX || '83')
  return Number((usd * fx).toFixed(2))
}

export function sumElevenLabsCredits(charging: Record<string, unknown> | null | undefined): number {
  if (!charging) return 0
  return Number(charging.call_charge ?? 0) + Number(charging.llm_charge ?? 0)
}
