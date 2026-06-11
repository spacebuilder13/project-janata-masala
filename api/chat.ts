import type { VercelRequest, VercelResponse } from '@vercel/node'

const SYSTEM_PROMPT = `You are a strategic advisor for Janata Masala's agentic commerce modernization.
You help the Spaceships & Atoms team explore WhatsApp campaigns, voice order-taking, and back-office integration.
Ground answers in Indian spice retail context. Be concise, actionable, and label inferences.
Topics: WhatsApp Business API patterns, voice ordering, inventory sync, CRM notes, finance entries.`

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(503).json({
      error: 'ANTHROPIC_API_KEY not configured',
      fallback: 'Configure ANTHROPIC_API_KEY in Vercel env to enable ChatAgent.',
    })
  }

  const { messages, structured } = req.body as {
    messages?: { role: 'user' | 'assistant'; content: string }[]
    structured?: boolean
    transcript?: string
  }

  if (!messages?.length && !structured) {
    return res.status(400).json({ error: 'messages required' })
  }

  try {
    const body: Record<string, unknown> = {
      model: 'claude-sonnet-4-20250514',
      max_tokens: structured ? 2048 : 1024,
      system: SYSTEM_PROMPT,
      messages: structured
        ? [
            {
              role: 'user',
              content: `Extract structured actionable output from this conversation transcript. Return JSON only.\n\n${req.body.transcript || ''}`,
            },
          ]
        : messages,
    }

    if (structured) {
      body.output_config = {
        format: {
          type: 'json_schema',
          schema: {
            type: 'object',
            properties: {
              order: {
                type: 'object',
                properties: {
                  items: { type: 'array', items: { type: 'object' } },
                  total: { type: 'number' },
                  customer_id: { type: 'string' },
                },
                required: ['items', 'total'],
              },
              inventory_delta: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: { sku: { type: 'string' }, qty: { type: 'number' } },
                  required: ['sku', 'qty'],
                },
              },
              crm_note: {
                type: 'object',
                properties: {
                  type: { type: 'string' },
                  summary: { type: 'string' },
                },
                required: ['type', 'summary'],
              },
              finance_entry: {
                type: 'object',
                properties: {
                  type: { type: 'string' },
                  amount: { type: 'number' },
                },
                required: ['type', 'amount'],
              },
            },
            required: ['order', 'inventory_delta', 'crm_note', 'finance_entry'],
          },
        },
      }
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

    if (structured) {
      try {
        return res.status(200).json({ structured: JSON.parse(text) })
      } catch {
        return res.status(200).json({ structured: text })
      }
    }

    return res.status(200).json({ reply: text })
  } catch (e) {
    return res.status(500).json({ error: String(e) })
  }
}
