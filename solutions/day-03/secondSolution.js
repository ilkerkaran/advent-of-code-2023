export default (arr) => {
  const engine = arr.map((row) => row.split(''))
  let sum = 0
  const myMap = {}
  const checkAdj = (i, j) => {
    const char = engine?.[i]?.[j]
    return char === '*'
  }
  const checkNumberAdjacent = (startI, startJ, numberLength) => {
    let hasSymbol = false
    for (let j = startJ; j < startJ + numberLength; j++) {
      // check first digit
      if (j === startJ) {
        const [ni, nj] = n(startI, j)
        const [wi, wj] = w(startI, j)
        const [nwi, nwj] = nw(startI, j)
        const [swi, swj] = sw(startI, j)
        const [si, sj] = s(startI, j)
        const [sei, sej] = se(startI, j)
        const [nei, nej] = ne(startI, j)
        hasSymbol = (checkAdj(ni, nj) && [ni, nj]) ||
          (checkAdj(wi, wj) && [wi, wj]) ||
          (checkAdj(nwi, nwj) && [nwi, nwj]) ||
          (checkAdj(swi, swj) && [swi, swj]) ||
          (checkAdj(si, sj) && [si, sj]) ||
          (checkAdj(sei, sej) && [sei, sej]) ||
          (checkAdj(nei, nej) && [nei, nej])
      }
      // check last digit
      else if (j === startJ + numberLength - 1) {
        const [ei, ej] = e(startI, j)
        const [nei, nej] = ne(startI, j)
        const [sei, sej] = se(startI, j)
        hasSymbol = (checkAdj(ei, ej) && [ei, ej]) ||
          (checkAdj(nei, nej) && [nei, nej]) ||
          (checkAdj(sei, sej) && [sei, sej])
      } else {
        const [nei, nej] = ne(startI, j)
        const [sei, sej] = se(startI, j)
        hasSymbol = (checkAdj(nei, nej) && [nei, nej]) ||
          (checkAdj(sei, sej) && [sei, sej])
      }
      if (hasSymbol) {
        break
      }
    }
    return hasSymbol
  }

  for (let i = 0; i < arr.length; i++) {
    const row = arr[i]
    const numberMatches = [...row.matchAll(/\d+/g)]

    for (let j = 0; j < numberMatches.length; j++) {
      const match = numberMatches[j]

      const starAddress = checkNumberAdjacent(i, match.index, match[0].length)
      if (starAddress) {
        if (myMap[`${starAddress[0]}_${starAddress[1]}`]) {
          myMap[`${starAddress[0]}_${starAddress[1]}`].push(+match[0])
        } else { myMap[`${starAddress[0]}_${starAddress[1]}`] = [+match[0]] }
      }
    }
  }

  Object.values(myMap).forEach((arr) => {
    if (arr.length === 2) {
      sum += (arr[0] * arr[1])
    }
  })
  return sum
}

const n = (i, j) => [
  i - 1, j
]
const ne = (i, j) => [
  i - 1, j + 1
]
const e = (i, j) => [
  i, j + 1
]
const se = (i, j) => [
  i + 1, j + 1
]
const s = (i, j) => [
  i + 1, j
]
const sw = (i, j) => [
  i + 1, j - 1
]
const w = (i, j) => [
  i, j - 1
]
const nw = (i, j) => [
  i - 1, j - 1
]
