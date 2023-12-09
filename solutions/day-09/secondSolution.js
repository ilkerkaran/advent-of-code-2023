import { findHistoryOfSequence } from './utils.js'

export default (arr) => {
  const sequences = arr.map((line, i) => line.split(' ').map(numStr => +numStr))
  let sum = 0
  for (let i = 0; i < sequences.length; i++) {
    const seq = sequences[i]
    const historyOfSequence = findHistoryOfSequence(seq, [])
    sum += historyOfSequence.reduceRight((acc, cur, i) => cur[0] - acc, 0)
  }
  return sum
}
