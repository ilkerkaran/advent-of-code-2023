import { n, w, s, e } from '../utils.js'
import { getKey } from './utils.js'

export default (arr) => {
  const cave = arr.flatMap(x => x.split(','))
  let energizedTileMap = {}
  let splitMap = {}
  const getNextDirection = (tile, dir) => {
    if (tile === '.') {
      return dir
    } else if (tile === '/') {
      if (dir === n) {
        return e
      } else if (dir === w) {
        return s
      } else if (dir === s) {
        return w
      } else if (dir === e) {
        return n
      }
    } else if (tile === 'v') {
      if (dir === n) {
        return w
      } else if (dir === w) {
        return n
      } else if (dir === s) {
        return e
      } else if (dir === e) {
        return s
      }
    } else if (tile === '-') {
      if (dir === w || dir === e) {
        return dir
      } else {
        return [w, e]
      }
    } else if (tile === '|') {
      if (dir === n || dir === s) {
        return dir
      } else {
        return [n, s]
      }
    }
  }

  const processBeam = (curI, curJ, dir) => {
    const [i, j] = dir(curI, curJ)
    const tile = cave[i]?.[j]
    if (!tile) return
    energizedTileMap[getKey(i, j)] = true
    if (tile === '.') {
      processBeam(i, j, dir)
    } else {
      if (splitMap[getKey(i, j)]) {
        return 0
      } else {
        const nextDir = getNextDirection(tile, dir)
        if (nextDir) {
          if (typeof nextDir === 'object') {
            splitMap[getKey(i, j)] = true
            processBeam(i, j, nextDir[0])
            processBeam(i, j, nextDir[1])
          } else {
            processBeam(i, j, nextDir)
          }
        }
      }
    }
  }
  const clearMaps = () => {
    energizedTileMap = {}
    splitMap = {}
  }

  const res = []
  for (let i = 0; i < arr.length; i++) {
    processBeam(i, -1, e)
    res.push(Object.keys(energizedTileMap).length)
    clearMaps()
    processBeam(i, arr[i].length, w)
    res.push(Object.keys(energizedTileMap).length)
    clearMaps()
  }

  for (let i = 0; i < arr[0].length; i++) {
    processBeam(-1, i, s)
    res.push(Object.keys(energizedTileMap).length)
    clearMaps()
    processBeam(arr.length, i, n)
    res.push(Object.keys(energizedTileMap).length)
    clearMaps()
  }

  return Math.max(...res)
}
