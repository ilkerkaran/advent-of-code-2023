export default (arr) =>
  arr.reduce((sum, str) => {
    let firstDigit = ''
    let lastDigit = ''
    // find first digit of the str
    for (let i = 0; i < str.length; i++) {
      if (!isNaN(+str[i])) {
        firstDigit = str[i]
        break
      }
    }

    // find last digit of the str
    for (let i = str.length - 1; i >= 0; i--) {
      if (!isNaN(+str[i])) {
        lastDigit = str[i]
        break
      }
    }
    return sum + +(firstDigit + lastDigit)
  }, 0
  )
