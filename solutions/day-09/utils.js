export const findHistoryOfSequence = (sequence, fullHistory) => {
  fullHistory.push(sequence)

  if (!sequence.every(num => num === 0)) {
    const nextIteration = []
    for (let i = 0; i < sequence.length - 1; i++) {
      const cur = sequence[i]
      const next = sequence[i + 1]
      nextIteration.push(next - cur)
    }
    return findHistoryOfSequence(nextIteration, fullHistory)
  }
  if (sequence.every(num => num === 0)) { return fullHistory } else return []
}
