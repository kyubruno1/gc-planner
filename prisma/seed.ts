import 'dotenv/config'
import { env } from 'node:process'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const connectionString = env.DIRECT_URL
if (!connectionString) throw new Error('DIRECT_URL não definida no .env')

const pool = new Pool({ connectionString })
const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
})

async function main() {
  // User
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: { email: 'test@example.com' },
  })

  // CharacterBase (catálogo)
  const elesis = await prisma.characterBase.upsert({
    where: { key: 'elesis' },
    update: { name: 'Elesis', job: 'Knight' },
    create: { key: 'elesis', name: 'Elesis', job: 'Knight' },
  })

  await prisma.characterBase.upsert({
    where: { key: 'lire' },
    update: { name: 'Lire', job: 'Archer' },
    create: { key: 'lire', name: 'Lire', job: 'Archer' },
  })

  // Build fake (config crua)
  await prisma.build.create({
    data: {
      name: 'Minha primeira build',
      userId: user.id,
      characterBaseId: elesis.id,
      data: {
        equipment: {},
        cards: [],
        pets: [],
      },
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-undef
    console.error(e)
    await prisma.$disconnect()
    // eslint-disable-next-line no-undef
    process.exit(1)
  })
