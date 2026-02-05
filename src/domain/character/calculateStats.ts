import type { CharacterInput } from './types'
import type { Stats } from '../stats/types'

export function calculateStats(input: CharacterInput): Stats {
  // MVP: por enquanto só devolve os status base.
  // Depois aqui entra:
  // - soma de equipamentos
  // - cartas
  // - pets
  // - títulos
  // - efeitos percentuais vs flat
  return { ...input.baseStats }
}
