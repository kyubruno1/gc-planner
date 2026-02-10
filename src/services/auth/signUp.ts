import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/password'

export async function signUpService(input: { username: string; password: string }) {
  const username = input.username.trim()
  const password = input.password

  if (username.length < 3) throw new Error('Usuário deve ter pelo menos 3 caracteres')
  if (password.length < 8) throw new Error('Senha deve ter pelo menos 8 caracteres')

  const exists = await prisma.credential.findUnique({ where: { username } })
  if (exists) throw new Error('Usuário já existe')

  const passwordHash = await hashPassword(password)

  const user = await prisma.user.create({
    data: {
      name: username,
      credential: {
        create: { username, passwordHash },
      },
    },
    select: { id: true, name: true },
  })

  return user
}
