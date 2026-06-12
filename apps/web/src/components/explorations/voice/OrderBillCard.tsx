import { motion } from 'framer-motion'
import { fadeRise } from '@/components/sandy/motion'
import type { StructuredOutput } from '@/types/voice'

type Props = { structured: StructuredOutput }

export default function OrderBillCard({ structured }: Props) {
  const items = structured.order?.items ?? []
  const total = structured.order?.total ?? 0

  return (
    <motion.div
      variants={fadeRise}
      initial="hidden"
      animate="show"
      className="p-6 rounded-2xl border"
      style={{ borderColor: 'var(--color-sandy-line)', background: 'var(--color-sandy-elevated)' }}
    >
      <p className="caption-label caption-label--spice mb-4">Order summary</p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li
            key={`${item.sku}-${i}`}
            className="flex justify-between text-sm py-2 border-b"
            style={{ borderColor: 'var(--color-sandy-line)' }}
          >
            <span style={{ color: 'var(--color-sandy-ink)' }}>
              {item.qty} {item.unit} {item.name}
            </span>
            <span className="mono text-xs" style={{ color: 'var(--color-sandy-ink-faint)' }}>
              {item.sku}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-lg font-semibold" style={{ color: 'var(--color-sandy-ink)' }}>
        Total ₹{total.toLocaleString('en-IN')}
      </p>
      {structured.crm_note?.summary && (
        <p className="mt-2 text-xs" style={{ color: 'var(--color-sandy-ink-faint)' }}>
          {structured.crm_note.summary}
        </p>
      )}
    </motion.div>
  )
}
