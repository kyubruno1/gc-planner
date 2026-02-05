import { execSync } from 'node:child_process'

execSync('npx tsx prisma/seed.ts', { stdio: 'inherit' })
