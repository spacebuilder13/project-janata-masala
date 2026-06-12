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
      className="voice-card voice-card--elevated"
    >
      <p className="caption-label caption-label--spice mb-4">Order summary</p>
      <ul className="voice-bill-items">
        {items.map((item, i) => (
          <li key={`${item.sku}-${i}`} className="voice-bill-item">
            <span className="voice-bill-item__name">
              {item.qty} {item.unit} {item.name}
            </span>
            <span className="voice-bill-item__sku">{item.sku}</span>
          </li>
        ))}
      </ul>
      <p className="voice-bill-total">Total ₹{total.toLocaleString('en-IN')}</p>
      {structured.crm_note?.summary && (
        <p className="voice-hint" style={{ marginTop: 12 }}>
          {structured.crm_note.summary}
        </p>
      )}
    </motion.div>
  )
}
