import PasswordGate from '@/components/auth/PasswordGate'
import { Navigate } from '@tanstack/react-router'
import { isAuthed } from '@/lib/auth'

export default function Login() {
  if (isAuthed()) return <Navigate to="/home" />

  return (
    <PasswordGate>
      <Navigate to="/home" />
    </PasswordGate>
  )
}
