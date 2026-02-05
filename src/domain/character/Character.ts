import type { CharacterInput } from './types'
import type { Stats } from '../stats/types'
import { calculateStats } from './calculateStats'

export class Character {
  constructor(private readonly input: CharacterInput) {}

  calculateStats(): Stats {
    return calculateStats(this.input)
  }
}
