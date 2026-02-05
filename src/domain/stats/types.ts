export type Stats = {
  atk: number
  def: number
  hp: number
}

export const emptyStats = (): Stats => ({
  atk: 0,
  def: 0,
  hp: 0,
})
