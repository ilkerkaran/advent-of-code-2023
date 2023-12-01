export default (arr) => {
  const writings = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
  const equals = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

  return arr.reduce((sum, str) => {
    const locations = []

    writings.map((writing, i) => {
      return [...str.matchAll(writing)].map(a => {
        locations[a.index] = equals[i]
        return 0
      })
    })

    // find first digit of the str
    for (let i = 0; i < str.length; i++) {
      if (!isNaN(+str[i])) {
        locations[i] = str[i]
        break
      }
    }

    // find last digit of the str
    for (let i = str.length - 1; i >= 0; i--) {
      if (!isNaN(+str[i])) {
        locations[i] = str[i]
        break
      }
    }

    // find first filled location
    let firstFilled = 0
    for (let i = 0; i < locations.length; i++) {
      if (locations[i]) {
        firstFilled = locations[i]
        break
      }
    }
    // find last filled location
    let lastFilled = 0
    for (let i = locations.length - 1; i >= 0; i--) {
      if (locations[i]) {
        lastFilled = locations[i]
        break
      }
    }

    console.log('locations', firstFilled, lastFilled)
    return sum + +(firstFilled + lastFilled)
  }, 0)
}
