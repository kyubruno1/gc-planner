import Link from 'next/link'
import { signUp } from './actions'

export default function SignUpPage() {
  return (
    <div style={{ maxWidth: 360, margin: '40px auto', display: 'grid', gap: 12 }}>
      <h1>Criar conta</h1>

      <form action={signUp} style={{ display: 'grid', gap: 10 }}>
        <input name="username" placeholder="Usuário" autoComplete="username" />
        <input name="password" placeholder="Senha" type="password" autoComplete="new-password" />
        <button type="submit">Criar conta</button>
      </form>

      <p style={{ marginTop: 8 }}>
        Já tem conta? <Link href="/login">Entrar</Link>
      </p>
    </div>
  )
}
