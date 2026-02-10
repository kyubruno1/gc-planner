'use client'

import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/planner'

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  return (
    <div style={{ maxWidth: 360, margin: '40px auto', display: 'grid', gap: 12 }}>
      <h1>Login</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault()
          setError(null)
          setLoading(true)

          const formData = new FormData(e.currentTarget)
          const username = String(formData.get('username') ?? '')
          const password = String(formData.get('password') ?? '')

          const res = await signIn('credentials', {
            username,
            password,
            redirect: false,
            callbackUrl,
          })

          setLoading(false)

          if (!res?.ok) {
            setError('Usuário ou senha inválidos')
            return
          }

          router.push(res.url ?? callbackUrl)
          router.refresh()
        }}
        style={{ display: 'grid', gap: 10 }}
      >
        <input name="username" placeholder="Usuário" autoComplete="username" />
        <input
          name="password"
          placeholder="Senha"
          type="password"
          autoComplete="current-password"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      <p style={{ marginTop: 8 }}>
        Não tem conta? <Link href="/signup">Criar conta</Link>
      </p>
    </div>
  )
}
