type Status = 'planned' | 'in-progress' | 'done' | 'pending'

const colors: Record<Status, string> = {
  planned: 'var(--color-sandy-ink-faint)',
  pending: 'var(--color-sandy-ink-faint)',
  'in-progress': 'var(--color-jm-spice)',
  done: 'var(--color-sandy-tea)',
}

export default function StatusChip({ status }: { status: Status }) {
  return (
    <span className="mono text-[10px] shrink-0" style={{ color: colors[status] }}>
      {status}
    </span>
  )
}
