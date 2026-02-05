import type { Stats } from '../stats/types'
import type { BuildData } from '../stats/build'

export type CharacterInput = {
  characterKey: string // ex: "elesis"
  baseStats: Stats
  build: BuildData
}
