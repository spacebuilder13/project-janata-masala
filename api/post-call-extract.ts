import type { VercelRequest, VercelResponse } from '@vercel/node'
import { loadLocalEnv } from './_lib/load-env'
import { validateSkus } from './_lib/catalog'
import { fetchConversationTranscript } from './_lib/elevenlabs'
import { buildExtractionPrompt } from './_lib/prompts'
import { STRUCTURED_SCHEMA, validateStructured, type StructuredOutput } from './_lib/schema'
import { estimateClaudeCostUsd, toInr, type ClaudeUsage } from './_lib/usage'
import { VOICE_AGENTS, resolveAgentId, resolveVoiceAgentKey } from './_lib/voice-agents'

loadLocalEnv()

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(503).json({
      error: 'ANTHROPIC_API_KEY not configured',
      fallback: 'Set ANTHROPIC_API_KEY in Vercel env.',
    })
  }

  const { transcript, session_id, conversation_id, agent_key } = req.body as {
    transcript?: string
    session_id?: string
    conversation_id?: string
    agent_key?: string
  }

  const agentKey = resolveVoiceAgentKey(agent_key)
  const agentDef = VOICE_AGENTS[agentKey]
  const resolvedAgentId = resolveAgentId(agentKey)

  let resolvedTranscript = transcript?.trim() ?? ''
  let transcriptSource: 'client' | 'elevenlabs' = 'client'

  if (!resolvedTranscript && conversation_id) {
    const elKey = process.env.ELEVENLABS_API_KEY
    if (elKey) {
      resolvedTranscript = await fetchConversationTranscript(elKey, conversation_id)
      if (resolvedTranscript) transcriptSource = 'elevenlabs'
    }
  }

  if (!resolvedTranscript) {
    return res.status(400).json({ error: 'transcript required (client and ElevenLabs both empty)' })
  }

  const model =
    process.env.ANTHROPIC_EXTRACT_MODEL || process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514'
  const prompt = `${buildExtractionPrompt(resolvedTranscript)}

Return ONLY valid JSON matching this shape (no markdown):
${JSON.stringify(STRUCTURED_SCHEMA.properties, null, 0)}`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      }),
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
        meta: {
          model,
          session_id,
          conversation_id: conversation_id ?? null,
          transcript_source: transcriptSource,
          catalog_version: process.env.JM_CATALOG_VERSION || 'demo-v2',
          agent_key: agentKey,
          prompt_version: agentDef.promptVersion,
          agent_id: resolvedAgentId,
        },
      })
    }

    const schemaValidation = validateStructured(structured)
    const skus = structured.order?.items?.map((i) => i.sku) ?? []
    const skuValidation = validateSkus(skus)
    const errors = [
      ...schemaValidation.errors,
      ...(skuValidation.ok ? [] : skuValidation.errors.map((s) => `Unknown SKU: ${s}`)),
    ]
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
        conversation_id: conversation_id ?? null,
        transcript_source: transcriptSource,
        catalog_version: process.env.JM_CATALOG_VERSION || 'demo-v2',
        prompt_version: agentDef.promptVersion,
        agent_key: agentKey,
        agent_id: resolvedAgentId,
      },
    })
  } catch (e) {
    return res.status(500).json({ error: String(e) })
  }
}
