import { getPatternVal } from './utils.js'

export default (arr) => {
  const patterns = [[]]

  for (let i = 0; i < arr.length; i++) {
    const line = arr[i]
    if (line === '') {
      patterns.push([])
    } else { patterns[patterns.length - 1].push(line) }
  }

  return patterns.reduce((acc, cur) => acc + getPatternVal(cur), 0)
}
