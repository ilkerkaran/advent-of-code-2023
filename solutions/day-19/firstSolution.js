import { n, s, e, w } from '../utils.js'
export default (arr) => {
  const commands = arr.map((line) => line.split(' ').reduce((obj, x, i) => ({ ...obj, [i === 0 ? 'dir' : i === 1 ? 'dist' : 'colour']: i === 0 ? x === 'R' ? e : x === 'U' ? n : x === 'D' ? s : w : i === 1 ? +x : x }), {}))

  console.log('commands', commands)
  const ground = [[true]]
  let curLoc = [0, 0]

  for (const index in commands) {
    const command = commands[index]
    const { dir, dist } = command
    const [x, y] = curLoc
    console.log('itreation', command, dir, dist, x, y)
    const [x1, y1] = dir(x, y, dist)
    console.log('from', x, y, 'to', x1, y1)
    for (let i = Math.min(x, x1); i <= Math.max(x, x1); i++) {
      for (let j = Math.min(y, y1); j <= Math.max(y, y1); j++) {
        if (ground[i]) { ground[i][j] = true } else {
          const r = []
          r[j] = true
          ground[i] = [...r]
        }
      }
    }
    curLoc = [x1, y1]
  }
  console.log('ground', ground)
  let sum = 0
  // count in values
  for (let i = 0; i < ground.length; i++) {
    const row = ground[i]
    let isIn = false
    let rowSum = 0
    for (let j = 0; j < row.length; j++) {
      const col = row[j]
      if (col) {
        isIn = !isIn
        rowSum++
      } else if (isIn) { rowSum++ }
    }
    console.log('rowSum', i, rowSum)
    sum += rowSum
  }
  return sum
}
