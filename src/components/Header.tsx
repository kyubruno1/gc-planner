'use client'

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Header() {
  const { data: session, status } = useSession()
  const router = useRouter()

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
      <Link href="/" style={{ fontWeight: 700 }}>
        GC Planner
      </Link>

      <div style={{ flex: 1 }} />

      {status === 'loading' ? null : session?.user ? (
        <>
          <span>
            Logado como <strong>{session.user.name ?? 'Usuário'}</strong>
          </span>
          <button
            onClick={async () => {
              await signOut({ redirect: false })
              router.push('/login')
              router.refresh()
            }}
          >
            Sair
          </button>
        </>
      ) : (
        <>
          <Link href="/login">Login</Link>
          <Link href="/signup">Criar conta</Link>
        </>
      )}
    </header>
  )
}
