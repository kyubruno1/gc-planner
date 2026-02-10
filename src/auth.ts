import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import { verifyPassword } from '@/lib/password'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Usuário', type: 'text' },
        password: { label: 'Senha', type: 'password' },
      },
      authorize: async (credentials) => {
        const username = String(credentials?.username ?? '').trim()
        const password = String(credentials?.password ?? '')

        if (!username || !password) return null

        const cred = await prisma.credential.findUnique({
          where: { username },
          include: { user: true },
        })

        if (!cred) return null

        const ok = await verifyPassword(password, cred.passwordHash)
        if (!ok) return null

        return {
          id: cred.user.id,
          name: cred.user.name ?? username,
          email: cred.user.email ?? undefined,
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
})
