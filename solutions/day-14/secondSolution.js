import { fullSpin } from './utils.js'
const graph = {}

const calcSum = (platform) => {
  let sum = 0
  for (let i = 0; i < platform.length; i++) {
    const line = platform[i]
    sum += line.filter((item) => item === 'O').length * (platform.length - i)
  }
  return sum
}

export default (arr) => {
  const platform = arr.map(line => line.split(''))
  const firstPlatformKey = JSON.stringify(platform)
  let prevPlatformKey = firstPlatformKey
  let ctr = 0
  graph[firstPlatformKey] = { next: null, i: ctr++ }
  let isCp = false
  while (!isCp) {
    fullSpin(platform)
    const platformKey = JSON.stringify(platform)
    graph[prevPlatformKey].next = platformKey
    prevPlatformKey = platformKey
    if (graph[platformKey]) {
      isCp = true
    } else {
      graph[platformKey] = { next: null, i: ctr++ }
    }
  }
  let curNode = graph[firstPlatformKey]
  for (let i = 0; i < 1000000000; i++) {
    curNode = graph[curNode.next]
    if (i % 1000000 === 0) { console.log('iteration', i / 1000000, 'million') }
  }
  const newP = JSON.parse(Object.entries(graph).filter(([key, value]) => value.i === curNode.i).map(([key, value]) => key)[0])
  return calcSum(newP)
}
