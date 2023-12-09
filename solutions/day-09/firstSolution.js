const findHistoryOfSequence = (sequence, fullHistory) => {
  fullHistory.push(sequence)

  while (!sequence.every(num => num === 0)) {
    const nextIteration = []
    for (let i = 0; i < sequence.length - 1; i++) {
      const cur = sequence[i]
      const next = sequence[i + 1]
      nextIteration.push(Math.abs(next - cur))
    }
    return findHistoryOfSequence(nextIteration, fullHistory)
  }
  if (sequence.every(num => num === 0)) { return fullHistory } else return []
}

export default (arr) => {
  const sequences = arr.map((line, i) => line.split(' ').map(numStr => +numStr))
  let sum = 0
  for (let i = 0; i < sequences.length; i++) {
    const seq = sequences[i]
    const historyOfSequence = findHistoryOfSequence(seq, [])

    console.log('historyOfSequence', historyOfSequence)
    sum += historyOfSequence.length > 1 ? historyOfSequence.reduce((acc, cur) => acc + (cur.length ? cur[cur.length - 1] : 0), 0) : 0
  }
  return sum
}
