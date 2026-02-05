import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { env } from 'node:process'

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient
  pgPool?: Pool
}

function makePgPool() {
  // ✅ App pode usar DATABASE_URL (pode ser pooler)
  const connectionString = env.DATABASE_URL
  if (!connectionString) throw new Error('DATABASE_URL não definida no .env')

  return new Pool({ connectionString })
}

export const prisma =
  globalForPrisma.prisma ??
  (() => {
    const pool = globalForPrisma.pgPool ?? makePgPool()
    globalForPrisma.pgPool = pool

    const adapter = new PrismaPg(pool)
    return new PrismaClient({ adapter })
  })()

if (env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
