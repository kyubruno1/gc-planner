import Link from 'next/link'
import { signIn } from '@/auth'

export default function LoginPage() {
  return (
    <div style={{ maxWidth: 360, margin: '40px auto', display: 'grid', gap: 12 }}>
      <h1>Login</h1>

      <form
        action={async (formData) => {
          'use server'
          await signIn('credentials', {
            username: String(formData.get('username') ?? ''),
            password: String(formData.get('password') ?? ''),
            redirectTo: '/planner',
          })
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
        <button type="submit">Entrar</button>
      </form>

      <p style={{ marginTop: 8 }}>
        Não tem conta? <Link href="/signup">Criar conta</Link>
      </p>
    </div>
  )
}
