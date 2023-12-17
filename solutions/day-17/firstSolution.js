import { n, w, s, e } from '../utils.js'
import { getKey } from './utils.js'
import util from 'util'

export default (arr) => {
  const targetI = arr.length - 1
  const targetJ = arr[0].length - 1

  const getNode = (i, j) => arr[i]?.[j]
  const graph = {}

  for (let i = 0; i <= targetI; i++) {
    for (let j = 0; j <= targetJ; j++) {
      if (arr[i][j]) {
        const block = { heat: arr[i][j], neighbours: [] }
        if (getNode(...n(i, j))) block.neighbours.push({ dir: 'n', key: getKey(...n(i, j)) })
        if (getNode(...w(i, j))) block.neighbours.push({ dir: 'w', key: getKey(...w(i, j)) })
        if (getNode(...s(i, j))) block.neighbours.push({ dir: 's', key: getKey(...s(i, j)) })
        if (getNode(...e(i, j))) block.neighbours.push({ dir: 'e', key: getKey(...e(i, j)) })

        graph[getKey(i, j)] = block
      }
    }
  }

  const findPaths = (startKey, endKey) => {
    const queue = []
    const visited = { [startKey]: true }
    const paths = []
    let path = [startKey]
    paths.push(path)
    queue.push(startKey)

    while (queue.length) {
      path = []
      const node = queue.shift()
      const neighbours = graph[node].neighbours
      for (let i = 0; i < neighbours.length; i++) {
        const neighbour = neighbours[i]
        if (neighbour.key === endKey) {
          continue
        } else {
          if (!visited[neighbour.key]) {
            queue.push(neighbour.key)
            visited[neighbour.key] = true
          }
        }
      }
      paths.push(path)
      console.log('paths after itreration', node, queue)
    }
    return paths
  }
  console.log('graph', util.inspect(graph, true, 5, true))
  console.log(getKey(0, 0), getKey(targetI, targetJ))
  // console.log('graph', graph)
  const paths = findPaths(getKey(0, 0), getKey(targetI, targetJ))
  console.log('paths', paths)
}
