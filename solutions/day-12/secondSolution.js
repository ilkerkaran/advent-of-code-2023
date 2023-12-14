import { calcCombinations } from '../utils.js'

const myCache = {}

const getUnfolded = (condition, group) => {
  let unfoldedCondition = ''
  const unfoldedGroup = []
  for (let i = 0; i < 5; i++) {
    unfoldedGroup.push(...group)
    unfoldedCondition += condition + (i === 4 ? '' : '?')
  }
  return [unfoldedCondition, unfoldedGroup]
}
const calcQArr = (qLen, group) => {
  const space = qLen - group.reduce((acc, item) => acc + item, 0) - group.length + 1

  const spaces = group.length + space
  const pieceCount = group.length
  if (myCache[`c:${spaces}-${pieceCount}`]) {
    return myCache[`c:${spaces}-${pieceCount}`]
  }
  const ans = calcCombinations(spaces, pieceCount)
  myCache[`c:${spaces}-${pieceCount}`] = ans
  myCache[`c:${spaces}-${spaces - pieceCount}`] = ans
  return ans
}

const calcHashQArr = (condition, group, sum = 0) => {
  const cacheK = `a:${condition}-${group.join(',')}`
  if (myCache[cacheK]) {
    return myCache[cacheK]
  }
  if (group.length === 0) {
    if (condition && condition.split('').some((item) => item === '#')) {
      myCache[cacheK] = 0
      return 0
    } else {
      myCache[cacheK] = 1
      return 1
    }
  }
  if (condition.length < group.reduce((acc, item) => acc + item, 0) + group.length - 1) {
    myCache[cacheK] = 0
    return 0
  }

  if (condition.split('').every((item) => item === '?')) {
    const r = group.length === 0 ? 1 : calcQArr(condition.length, group)
    myCache[cacheK] = r
    return r
  }
  for (let i = 0; i < condition.length; i++) {
    const node = condition[i]
    let sum = 0
    if (node === '#') {
      for (let j = 0; j < group.length; j++) {
        const g = group[j]
        for (let k = i - g + 1; k <= i; k++) {
          // is suitable
          let isSuitable = true
          for (let m = 0; m < g; m++) {
            if (!condition[k + m] || condition[k + m] === '.') {
              isSuitable = false
              break
            }
          }
          if (condition[k + g] === '#' || condition[k - 1] === '#') {
            isSuitable = false
          }

          if (isSuitable) {
            const prior = calcHashQArr(condition.slice(0, Math.max(k - 1, 0)), group.slice(0, j))
            const after = calcHashQArr(condition.slice(k + g + 1), group.slice(j + 1))
            sum += (prior * after)
          }
        }
      }
      myCache[cacheK] = sum
      return sum
    }
  }
}

const resolveConditions = (conditionPieces, group, sum = 0) => {
  // console.log('!!!here', conditionPieces, group, sum)
  if (conditionPieces.length === 1) {
    return calcHashQArr(conditionPieces[0], group)
  }
  if (conditionPieces.length === 0) {
    return group.length === 0 ? 1 : 0
  }
  for (let i = 0; i < conditionPieces.length; i++) {
    const conditionPiece = conditionPieces[i]
    const nextPieces = conditionPieces.slice(i + 1)
    const localPossibilityPieces = []
    for (let j = 0; j < group.length; j++) {
      const localGroup = group.slice(0, j + 1)

      // group does not fit the condition
      if (conditionPiece.length < localGroup.reduce((acc, item) => acc + item, 0) + localGroup.length - 1) {
        continue
      }
      const pieceVal = calcHashQArr(conditionPiece, localGroup)
      const nextPiecesVal = resolveConditions(nextPieces, group.slice(j + 1))
      localPossibilityPieces.push(pieceVal * nextPiecesVal)
      sum += pieceVal * nextPiecesVal
    }
  }
  return sum
}

export default (arr, isP2 = true) => {
  let sum = 0

  for (let i = 0; i < arr.length; i++) {
    const r = arr[i]
    const [conditionStr, groupStr] = r.split(' ')
    const group = groupStr.split(',').map((item) => +item)
    const [unfoldedCondition, unfoldedGroup] = isP2 ? getUnfolded(conditionStr, group) : [conditionStr, group]
    const conditionPieces = (unfoldedCondition).replaceAll(/(\.)\1+/g, '.').split('.').filter((item) => item !== '')

    const arrSum = resolveConditions(conditionPieces, unfoldedGroup)
    console.log(i + 1, unfoldedCondition, unfoldedGroup, arrSum)
    sum += arrSum
  }
  // console.log('cache', myCache)
  return sum
}
