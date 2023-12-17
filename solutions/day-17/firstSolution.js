import { n, w, s, e } from '../utils.js'
import { getKey } from './utils.js'

export default (arr) => {
  const targetI = arr.length - 1
  const targetJ = arr[0].length - 1

  const getNode = (i, j) => arr[i]?.[j]
  const graph = {}

  for (let i = 0; i <= targetI; i++) {
    for (let j = 0; j <= targetJ; j++) {
      if (arr[i][j]) {
        const block = { heat: arr[i][j], neighbors: [] }
        if (getNode(...n(i, j))) block.neighbors.push(getKey(...n(i, j)))
        if (getNode(...w(i, j))) block.neighbors.push(getKey(...w(i, j)))
        if (getNode(...s(i, j))) block.neighbors.push(getKey(...s(i, j)))
        if (getNode(...e(i, j))) block.neighbors.push(getKey(...e(i, j)))

        graph[getKey(i, j)] = block
      }
    }
  }

  const findPaths = (startKey, endKey) => {
    const queue = []
    const visited = {}
    const paths = []

    queue.push(startKey)

    while (queue.length) {
      const node = queue.shift()
      const { neighbors } = graph[node]
      for (const neighbor of neighbors) {
        if (neighbor === endKey) {
          paths.push([...queue, neighbor])
        } else if (!visited[neighbor]) {
          queue.push(neighbor)
        }
      }
    }
    return paths
  }

  console.log('graph', graph)
  const paths = findPaths(getKey(0, 0), getKey(targetI, targetJ))
  console.log('paths', paths)
}
