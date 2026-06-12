import type { VercelRequest, VercelResponse } from '@vercel/node'
import { loadLocalEnv } from './_lib/load-env'
import { getCatalogSummary, validateSkus } from './_lib/catalog'

loadLocalEnv()
import { buildExtractionPrompt } from './_lib/prompts'
import { STRUCTURED_SCHEMA, validateStructured, type StructuredOutput } from './_lib/schema'
import { estimateClaudeCostUsd, toInr, type ClaudeUsage } from './_lib/usage'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(503).json({
      error: 'ANTHROPIC_API_KEY not configured',
      fallback: 'Set ANTHROPIC_API_KEY in .env.local',
    })
  }

  const { transcript, session_id } = req.body as {
    transcript?: string
    session_id?: string
  }

  if (!transcript?.trim()) {
    return res.status(400).json({ error: 'transcript required' })
  }

  const model = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514'
  const catalogSummary = getCatalogSummary()
  const prompt = `${buildExtractionPrompt(transcript, catalogSummary)}

Return ONLY valid JSON matching this shape (no markdown):
${JSON.stringify(STRUCTURED_SCHEMA.properties, null, 0)}`

  try {
    const body = {
      model,
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const err = await response.text()
      return res.status(response.status).json({ error: err })
    }

    const data = await response.json()
    const text = data.content?.[0]?.text ?? ''
    const usage: ClaudeUsage = {
      input_tokens: data.usage?.input_tokens ?? 0,
      output_tokens: data.usage?.output_tokens ?? 0,
      total_tokens: (data.usage?.input_tokens ?? 0) + (data.usage?.output_tokens ?? 0),
    }

    let structured: StructuredOutput
    try {
      const jsonText = text.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim()
      structured = JSON.parse(jsonText) as StructuredOutput
    } catch {
      return res.status(200).json({
        structured: text,
        validation: { ok: false, errors: ['JSON parse failed'] },
        usage: {
          claude: usage,
          estimated_cost_usd: estimateClaudeCostUsd(model, usage),
          estimated_cost_inr: toInr(estimateClaudeCostUsd(model, usage)),
        },
        meta: { model, session_id, catalog_version: process.env.JM_CATALOG_VERSION || 'demo-v1' },
      })
    }

    const schemaValidation = validateStructured(structured)
    const skus = structured.order?.items?.map((i) => i.sku) ?? []
    const skuValidation = validateSkus(skus)
    const errors = [...schemaValidation.errors, ...(skuValidation.ok ? [] : skuValidation.errors.map((s) => `Unknown SKU: ${s}`))]
    const costUsd = estimateClaudeCostUsd(model, usage)

    return res.status(200).json({
      structured,
      validation: { ok: schemaValidation.ok && skuValidation.ok, errors },
      usage: {
        claude: usage,
        estimated_cost_usd: costUsd,
        estimated_cost_inr: toInr(costUsd),
      },
      meta: {
        model,
        session_id,
        catalog_version: process.env.JM_CATALOG_VERSION || 'demo-v1',
        prompt_version: process.env.JM_PROMPT_VERSION || 'v1.0.0',
      },
    })
  } catch (e) {
    return res.status(500).json({ error: String(e) })
  }
}
