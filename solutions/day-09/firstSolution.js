import { findHistoryOfSequence } from './utils.js'

export default (arr) => {
  const sequences = arr.map((line, i) => line.split(' ').map(numStr => +numStr))
  let sum = 0
  for (let i = 0; i < sequences.length; i++) {
    const seq = sequences[i]
    const historyOfSequence = findHistoryOfSequence(seq, [])
    sum += historyOfSequence.reduce((acc, cur) => acc + (cur.length ? cur[cur.length - 1] : 0), 0)
  }
  return sum
}
