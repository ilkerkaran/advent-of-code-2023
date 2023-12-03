export default (arr) => {
  const engine = arr.map((row) => row.split(''))
  let sum = 0

  const checkAdj = (i, j) => {
    const char = engine?.[i]?.[j]
    return char !== +char && char !== "." && !!char
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
        hasSymbol = checkAdj(ni, nj) || checkAdj(wi, wj) || checkAdj(nwi, nwj) || checkAdj(swi, swj) || checkAdj(si, sj) || checkAdj(sei, sej) || checkAdj(nei, nej)
      }
      //check last digit
      else if (j === startJ + numberLength - 1) {
        const [ei, ej] = e(startI, j)
        const [nei, nej] = ne(startI, j)
        const [sei, sej] = se(startI, j)
        hasSymbol = checkAdj(ei, ej) || checkAdj(nei, nej) || checkAdj(sei, sej)
      }
      else {
        const [nei, nej] = ne(startI, j)
        const [sei, sej] = se(startI, j)
        hasSymbol = checkAdj(nei, nej) || checkAdj(sei, sej)
      }
      if (hasSymbol) {
        break
      }
    }
    return hasSymbol
  }




  for (let i = 0; i < arr.length; i++) {
    const row = arr[i];
    const numberMatches = [...row.matchAll(/\d+/g)]

    for (let j = 0; j < numberMatches.length; j++) {
      const match = numberMatches[j]
      if (checkNumberAdjacent(i, match.index, match[0].length)) {
        console.log("match", match[0], i)
        sum += parseInt(match[0])
      }
    }
  }



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
