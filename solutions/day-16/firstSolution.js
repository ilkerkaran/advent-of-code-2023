import { n, w, s, e, print2DArray } from '../utils.js'
import { getKey } from './utils.js'
String.raw`C:\\Foo\Bar\Fuzz\document.pdf` // C:\\Foo\Bar\Fuzz\document.pdf

export default (arr) => {
  const cave = arr.flatMap(x => x.split(','))
  const energizedTileMap = {}
  const processedMirrorMap = {}

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

  const processBeam = (curI, curJ, dir, dirName, unifier = 0) => {
    console.log('before', curI, curJ, dir)
    const [i, j] = dir(curI, curJ)
    const tile = cave[i]?.[j]
    console.log('processBeam', dir, curI, curJ, i, j, tile)
    if (!tile) return

    energizedTileMap[getKey(i, j)] = true
    if (tile === '.') {
      processBeam(i, j, dir, '', unifier)
    } else {
      if (processedMirrorMap[`${unifier}:${dirName}:${getKey(curI, curJ)}`]) {
        return 0
      } else {
        processedMirrorMap[`${unifier}:${dirName}:${getKey(curI, curJ)}`] = true
        const nextDir = getNextDirection(tile, dir)
        console.log('get next', tile, dir, nextDir)
        if (nextDir) {
          if (typeof nextDir === 'object') {
            processBeam(i, j, nextDir[0], '', unifier + 1)
            processBeam(i, j, nextDir[1], '', unifier + 2)
          } else {
            processBeam(i, j, nextDir, '', unifier)
          }
        }
      }
    }
  }

  processBeam(0, -1, e, 'e', 0)
  console.log('energized cave:')
  for (let i = 0; i < 10; i++) {
    let line = ''
    for (let j = 0; j < 10; j++) {
      line += energizedTileMap[getKey(i, j)] ? '#' : '.'
    }
    console.log(line)
  }
  console.log('energized tiles', Object.keys(energizedTileMap))

  return Object.keys(energizedTileMap).length
}
