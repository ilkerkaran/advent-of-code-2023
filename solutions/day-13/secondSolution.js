import { getPatternMap } from './utils.js'

const getSmackedPatternVal = (pattern) => {
  for (let j = 0; j < pattern.length; j++) {
    const pMap = getPatternMap(pattern)
    const line = pattern[j]
    for (let k = 0; k < line.length; k++) {
      const element = line[k]
      let newLine = ''
      if (element === '#') {
        newLine = line.substring(0, k) + '.' + line.substring(k + 1)
      } else {
        newLine = line.substring(0, k) + '#' + line.substring(k + 1)
      }
      const smacjedPattern = pattern.slice(0, j).concat([newLine]).concat(pattern.slice(j + 1))
      const newRes = getPatternMap(smacjedPattern)
      if ((newRes.h.length > 0 || newRes.v.length > 0) && (JSON.stringify(newRes) !== JSON.stringify(pMap))) {
        for (let i = 0; i < newRes.h.length; i++) {
          const newHorizontal = newRes.h[i]
          if (pMap.h.indexOf(newHorizontal) === -1) {
            return JSON.parse(newHorizontal).length * 100
          }
        }
        for (let i = 0; i < newRes.v.length; i++) {
          const newVertical = newRes.v[i]
          if (pMap.v.indexOf(newVertical) === -1) {
            return JSON.parse(newVertical).length
          }
        }
      }
    }
  }
  return 0
}

export default (arr) => {
  const patterns = [[]]

  for (let i = 0; i < arr.length; i++) {
    const line = arr[i]
    if (line === '') {
      patterns.push([])
    } else { patterns[patterns.length - 1].push(line) }
  }
  let newSum = 0
  for (let i = 0; i < patterns.length; i++) {
    const val = getSmackedPatternVal(patterns[i])
    newSum += val
  }

  return newSum
}
