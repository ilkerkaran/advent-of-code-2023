function calculateLCM (...numbers) {
  // Find the greatest common divisor (GCD) using Euclidean algorithm
  function findGCD (x, y) {
    while (y !== 0) {
      const temp = y
      y = x % y
      x = temp
    }
    return x
  }

  // Calculate LCM for an array of numbers
  function calculateArrayLCM (arr) {
    if (arr.length === 0) {
      return 1 // LCM of an empty set is 1
    }

    let lcm = arr[0]
    for (let i = 1; i < arr.length; i++) {
      const currentNumber = arr[i]
      const gcd = findGCD(lcm, currentNumber)
      lcm = (lcm * currentNumber) / gcd
    }

    return lcm
  }

  return calculateArrayLCM(numbers)
}

export default (arr) => {
  const directions = arr[0]
  const nodesStr = arr.slice(2)

  const myMap = {}
  nodesStr.reduce((acc, node, i) => {
    const [curNode, leftRight] = node.replaceAll(' ', '').split('=')
    const [left, right] = leftRight.substring(1, leftRight.length - 1).split(',')
    myMap[curNode] = { L: left, R: right }
    return myMap
  }, myMap)

  let iteration = 0
  const startItems = Object.keys(myMap).filter(node => node[2] === 'A')
  const myPaths = Object.keys(myMap).filter(node => node[2] === 'A')

  const perfStats = myPaths.reduce((acc, node, index) => ({ ...acc, [index]: { } }), {})

  let mappedStats = 0
  while (mappedStats !== myPaths.length) {
    const nextDir = directions[iteration % directions.length]
    for (let i = 0; i < myPaths.length; i++) {
      const node = myPaths[i]
      myPaths[i] = myMap[node][nextDir]
      if (node[2] === 'Z') {
        if (!perfStats[i].startIteration) {
          perfStats[i] = { startNode: startItems[i], endNode: node, startIteration: iteration + 1 }
        } else if (!perfStats[i].endIteration) {
          perfStats[i].endIteration = iteration
          perfStats[i].cycle = iteration + 1 - perfStats[i].startIteration
          mappedStats++
        }
      }
    }
    iteration++
  }

  return calculateLCM(...Object.values(perfStats).map(({ cycle }) => cycle))
}
