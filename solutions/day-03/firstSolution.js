export default (arr) => {
  const engine = arr.map((row) => { row.split('') })

  const checkNumberAdjacent = (startIndex, numberLength) => {
    let hasSymbol = false
    for (let i = 0; i < numberLength; i++) {
      if (false) {
        hasSymbol = true
        break
      }
    }

    return hasSymbol
  }
}
