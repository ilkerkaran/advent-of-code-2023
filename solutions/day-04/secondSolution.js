export default (arr) => {
  const cardMap = arr.reduce((m, _, i) => ({ ...m, [i + 1]: 1 }), {})

  const incrementCardMap = (startNum, winCount, p) => {
    for (let i = startNum; i < startNum + winCount; i++) {
      cardMap[i + 1] += p
    }
  }

  for (let i = 1; i < arr.length; i++) {
    const line = arr[i - 1]
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

    if (match > 0) {
      incrementCardMap(i, match, cardMap[i])
    }
  }
  return Object.values(cardMap).reduce((sum, val) => sum + val, 0)
}
