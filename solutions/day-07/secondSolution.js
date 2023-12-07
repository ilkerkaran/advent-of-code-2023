export default (arr) => {
  const cardTypes = {
    highCard: 0,
    onePair: 1,
    twoPair: 2,
    threeOfaKind: 3,
    fullHouse: 4,
    fourOfaKind: 5,
    fiveOfaKind: 6
  }

  const cards = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, T: 10, J: 1, Q: 12, K: 13, A: 14 }

  const identifyHand = (hand) => {
    const handMap = {}

    for (let i = 0; i < hand.length; i++) {
      const card = hand[i]
      handMap[card] = (handMap[card] ?? 0) + 1
    }

    const handMaps = [handMap]
    if (handMap.J) {
      Object.entries(handMap).forEach(([card, count]) => {
        if (card !== 'J') {
          let curJ = handMap.J
          const newHandMap = { ...handMap }
          while (curJ-- > 0) {
            newHandMap[card]++
            newHandMap.J--
            handMaps.push(newHandMap)
          }
        }
      })
    }

    let possibleBest = 0
    for (let i = 0; i < handMaps.length; i++) {
      const handMap = handMaps[i]
      let maxKind = 0
      let maxCard = []

      Object.entries(handMap).forEach(([card, count]) => {
        if (maxKind < count) {
          maxCard = [card]
          maxKind = count
        } else if (maxKind === count) {
          maxCard.push(card)
        }
      })

      if (maxKind === 5) {
        possibleBest = Math.max(possibleBest, cardTypes.fiveOfaKind)
      } else if (maxKind === 4) {
        possibleBest = Math.max(possibleBest, cardTypes.fourOfaKind)
      } else if (maxKind === 3) {
        if (Object.values(handMap).includes(2)) {
          possibleBest = Math.max(possibleBest, cardTypes.fullHouse)
        } else {
          possibleBest = Math.max(possibleBest, cardTypes.threeOfaKind)
        }
      } else if (
        maxKind === 2
      ) {
        if (maxCard.length === 2) {
          possibleBest = Math.max(possibleBest, cardTypes.twoPair)
        } else { possibleBest = Math.max(possibleBest, cardTypes.onePair) }
      } else { possibleBest = Math.max(possibleBest, cardTypes.highCard) }
    }

    return possibleBest
  }

  const hands = []

  const handSort = (a, b) => {
    if (a.handStrength !== b.handStrength) {
      return a.handStrength - b.handStrength
    } else {
      for (let i = 0; i < 5; i++) {
        const aHand = a.hand[i]
        const bHand = b.hand[i]
        if (aHand !== bHand) { return cards[aHand] - cards[bHand] }
      }
    }
  }
  for (let i = 0; i < arr.length; i++) {
    const [hand, bid] = arr[i].split(' ')
    const handStrength = identifyHand(hand)
    hands.push({ hand, handStrength, bid })
  }

  // sort
  hands.sort(handSort)

  return hands.reduce((acc, hand, i) => acc + hand.bid * (i + 1), 0)
}
