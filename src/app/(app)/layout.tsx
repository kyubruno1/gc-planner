import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  return (
    <div>
      <Navbar userName={session.user.name ?? 'Usuário'} />
      <main style={{ padding: 16 }}>{children}</main>
    </div>
  )
}
