export default (arr) => {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    const line = arr[i]
    const [winningNumbers, myNumbers] = line.split(':')[1].split('|')
    const finalWinningNumbers = winningNumbers.split(' ').filter(n => n).map((number) => parseInt(number))

    const finalMyNumbers = myNumbers.split(' ').filter(n => n).map((number) => parseInt(number))
    let match = 0
    for (let j = 0; j < finalMyNumbers.length; j++) {
      const myNum = finalMyNumbers[j]
      if (finalWinningNumbers.includes(myNum)) {
        match++
      }
    }
    if (match > 0) { sum += Math.pow(2, match - 1) }
  }
  return sum
}
