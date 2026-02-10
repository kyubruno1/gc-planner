import Link from 'next/link'

export default function PublicHeader() {
  return (
    <header style={{ padding: 12, borderBottom: '1px solid #ddd', display: 'flex', gap: 12 }}>
      <Link href="/" style={{ fontWeight: 700 }}>
        GC Planner
      </Link>
      <div style={{ flex: 1 }} />
      <Link href="/login">Login</Link>
      <Link href="/signup">Criar conta</Link>
    </header>
  )
}
