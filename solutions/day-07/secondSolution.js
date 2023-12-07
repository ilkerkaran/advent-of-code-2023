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
    let maxKind = 0
    let maxCard = []
    for (let i = 0; i < hand.length; i++) {
      const card = hand[i]
      handMap[card] = (handMap[card] ?? 0) + 1
      if (maxKind < handMap[card]) {
        maxCard = [card]
        maxKind = handMap[card]
      } else if (maxKind === handMap[card]) {
        maxCard.push(card)
      }
    }

    if (handMap.J) {
      if (!maxCard.includes('J') || maxCard.length === 2) { maxKind += handMap.J }
      if (maxCard.length === 2) {
        maxCard.pop()
      }
      console.log('do elevation', maxKind)
    }

    if (maxKind === 5) {
      return cardTypes.fiveOfaKind
    } else if (maxKind === 4) {
      return cardTypes.fourOfaKind
    } else if (maxKind === 3) {
      if (Object.values(handMap).includes(2)) {
        return cardTypes.fullHouse
      } else {
        return cardTypes.threeOfaKind
      }
    } else if (
      maxKind === 2
    ) {
      if (maxCard.length === 2) { return cardTypes.twoPair } else { return cardTypes.onePair }
    } else { return cardTypes.highCard }
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
    console.log('hand', hand, handStrength, bid)
  }

  // sort
  hands.sort(handSort)

  return hands.reduce((acc, hand, i) => acc + hand.bid * (i + 1), 0)
}
