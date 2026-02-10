import Link from 'next/link'
import { signOut } from '@/auth'

export default function Navbar({ userName }: { userName: string }) {
  return (
    <header
      style={{
        padding: 12,
        borderBottom: '1px solid #ddd',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <Link href="/planner" style={{ fontWeight: 700 }}>
        GC Planner
      </Link>

      <div style={{ flex: 1 }} />

      <span>
        Logado como <strong>{userName}</strong>
      </span>

      <form
        action={async () => {
          'use server'
          await signOut({ redirectTo: '/login' })
        }}
      >
        <button type="submit">Sair</button>
      </form>
    </header>
  )
}
