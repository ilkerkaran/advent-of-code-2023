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

  let whereAmI = 'AAA'
  let iteration = 0
  while (whereAmI !== 'ZZZ') {
    const nextDir = directions[iteration % directions.length]
    whereAmI = myMap[whereAmI][nextDir]
    iteration++
  }

  return iteration
}
