type Status = 'planned' | 'in-progress' | 'done' | 'pending'

const chipClass: Record<Status, string> = {
  planned: 'status-chip',
  pending: 'status-chip',
  'in-progress': 'status-chip status-chip--spice',
  done: 'status-chip status-chip--tea',
}

export default function StatusChip({ status }: { status: Status }) {
  return (
    <span className={chipClass[status]}>
      {status}
    </span>
  )
}
