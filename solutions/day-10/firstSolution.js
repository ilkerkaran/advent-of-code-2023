const isLocationValid = (cur, nextPipe, curDir) => {
  if (curDir === 'up' && (nextPipe === '|' || nextPipe === 'F' || nextPipe === '7')) return nextPipe
  if (curDir === 'down' && (nextPipe === '|' || nextPipe === 'L' || nextPipe === 'J')) return nextPipe
  if (curDir === 'left' && (nextPipe === '-' || nextPipe === 'F' || nextPipe === 'L')) return nextPipe
  if (curDir === 'right' && (nextPipe === '-' || nextPipe === 'J' || nextPipe === '7')) return nextPipe
  return false
}

const getDir = (curDir, pipe) => {
  if (curDir === 'right' && (pipe === '-')) return 'right'
  if (curDir === 'right' && (pipe === 'J')) return 'up'
  if (curDir === 'right' && (pipe === '7')) return 'down'
  if (curDir === 'down' && (pipe === '|')) return 'down'
  if (curDir === 'down' && (pipe === 'L')) return 'right'
  if (curDir === 'down' && (pipe === 'J')) return 'left'
  if (curDir === 'left' && (pipe === '-')) return 'left'
  if (curDir === 'left' && (pipe === 'F')) return 'down'
  if (curDir === 'left' && (pipe === 'L')) return 'up'
  if (curDir === 'up' && (pipe === '|')) return 'up'
  if (curDir === 'up' && (pipe === 'F')) return 'right'
  if (curDir === 'up' && (pipe === '7')) return 'left'
  return null
}

const getCoordsByDir = (cur, dir) => {
  if (dir === 'up') return [cur[0] - 1, cur[1]]
  if (dir === 'down') return [cur[0] + 1, cur[1]]
  if (dir === 'left') return [cur[0], cur[1] - 1]
  if (dir === 'right') return [cur[0], cur[1] + 1]
  return []
}

export default (arr) => {
  let startPoint = 0
  const matrix = arr.map((row, i) => row.split('').map((item, j) => {
    if (item === 'S') { startPoint = [i, j] }
    return item
  }))
  const firstLeft = isLocationValid(startPoint, matrix[startPoint[0]][startPoint[1] - 1], 'left')
  const firstRight = isLocationValid(startPoint, matrix[startPoint[0]][startPoint[1] + 1], 'right')
  const firstUp = isLocationValid(startPoint, matrix[startPoint[0] - 1][startPoint[1]], 'up')
  const firstDown = isLocationValid(startPoint, matrix[startPoint[0] + 1][startPoint[1]], 'down')

  let paths = [firstLeft && [firstLeft, 'left'], firstRight && [firstRight, 'right'], firstUp && [firstUp, 'up'], firstDown && [firstDown, 'down']].filter((item) => item).map((item) => [startPoint, ...item])

  const proceed = (cur, curDir, pipe) => {
    const [nextI, nextJ] = getCoordsByDir(cur, curDir)
    const nextPipe = nextI >= 0 && nextJ >= 0 ? matrix[nextI][nextJ] : null
    return [[nextI, nextJ], nextPipe, getDir(curDir, nextPipe)]
  }

  let iteration = 0
  let stop = false
  while (!stop) {
    iteration += 1
    const new1 = proceed(paths[0][0], paths[0][2], paths[0][1])
    const new2 = proceed(paths[1][0], paths[1][2], paths[1][1])
    paths = [new1, new2]

    if (new1[1] === 'S') {
      stop = true
    }
  }
  return iteration % 2 === 0 ? iteration / 2 : iteration / 2 + 1
}
