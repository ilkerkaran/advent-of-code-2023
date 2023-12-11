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

  let rightCount = 0
  let leftCount = 0
  const matrix = arr.map((row, i) => row.split('').map((item, j) => {
    if (item === 'S') { startPoint = [i, j] }
    return item
  }))

  const draw = []
  const isChecked = (i, j) =>
    !draw[i]?.[j] || draw[i][j] !== ' '
  const firstLeft = isLocationValid(startPoint, matrix[startPoint[0]][startPoint[1] - 1], 'left')
  const firstRight = isLocationValid(startPoint, matrix[startPoint[0]][startPoint[1] + 1], 'right')
  const firstUp = isLocationValid(startPoint, matrix[startPoint[0] - 1]?.[startPoint[1]], 'up')
  const firstDown = isLocationValid(startPoint, matrix[startPoint[0] + 1]?.[startPoint[1]], 'down')

  let path = [firstLeft && [firstLeft, 'left'], firstRight && [firstRight, 'right'], firstUp && [firstUp, 'up'], firstDown && [firstDown, 'down']].filter((item) => item).map((item) => [startPoint, ...item])[0]
  const coords = []
  const proceed = (cur, curDir, pipe) => {
    const [nextI, nextJ] = getCoordsByDir(cur, curDir)
    const nextPipe = nextI >= 0 && nextJ >= 0 ? matrix[nextI][nextJ] : null
    return [[nextI, nextJ], nextPipe, getDir(curDir, nextPipe)]
  }

  let stop = false
  const countTurn = (curPipe, curDir) => {
    switch (curPipe) {
      case 'F': {
        if (curDir === 'right') {
          rightCount++
        } else leftCount++
        break }
      case 'L': {
        if (curDir === 'right') {
          leftCount++
        } else rightCount++
        break
      }
      case 'J': {
        if (curDir === 'left') {
          rightCount++
        } else leftCount++
        break
      }
      case '7': {
        if (curDir === 'left') {
          leftCount++
        } else rightCount++
        break
      }
    }
  }

  const setPipeAdjOut = (coor, pipe, dir) => {
    if (pipe === '-') {
      if (dir === 'left') {
        if (isClockwise) {
          if (!!draw[coor[0] + 1]?.[coor[1]] && draw[coor[0] + 1][coor[1]] !== '#') { draw[coor[0] + 1][coor[1]] = '-' }
        } else {
          if (!!draw[coor[0] - 1]?.[coor[1]] && draw[coor[0] - 1][coor[1]] !== '#') { draw[coor[0] - 1][coor[1]] = '-' }
        }
      } else if (dir === 'right') {
        if (isClockwise) {
          if (!!draw[coor[0] - 1]?.[coor[1]] && draw[coor[0] - 1][coor[1]] !== '#') { draw[coor[0] - 1][coor[1]] = '-' }
        } else {
          if (!!draw[coor[0] + 1] && draw[coor[0] + 1]?.[coor[1]] !== '#') { draw[coor[0] + 1][coor[1]] = '-' }
        }
      }
    }
    if (pipe === '|') {
      if (dir === 'up') {
        if (isClockwise) {
          if (draw[coor[0]]?.[coor[1] - 1] && draw[coor[0]][coor[1] - 1] !== '#') {
            draw[coor[0]][coor[1] - 1] = '-'
          }
        } else {
          if (draw[coor[0]]?.[coor[1] + 1] && draw[coor[0]][coor[1] + 1] !== '#') { draw[coor[0]][coor[1] + 1] = '-' }
        }
      } else if (dir === 'down') {
        if (isClockwise) {
          if (draw[coor[0]]?.[coor[1] + 1] && draw[coor[0]][coor[1] + 1] !== '#') { draw[coor[0]][coor[1] + 1] = '-' }
        } else {
          if (draw[coor[0]]?.[coor[1] - 1] && draw[coor[0]][coor[1] - 1] !== '#') { draw[coor[0]][coor[1] - 1] = '-' }
        }
      }
    }
    if (pipe === 'F') {
      if (dir === 'right') {
        if (isClockwise) {
          if (draw[coor[0] - 1]?.[coor[1]] && draw[coor[0] - 1][coor[1]] !== '#') { draw[coor[0] - 1][coor[1]] = '-' }
          if (draw[coor[0]]?.[coor[1] - 1] && draw[coor[0]][coor[1] - 1] !== '#') { draw[coor[0]][coor[1] - 1] = '-' }
        }
      } else if (dir === 'down') {
        if (!isClockwise) {
          if (draw[coor[0] - 1]?.[coor[1]] && draw[coor[0] - 1][coor[1]] !== '#') { draw[coor[0] - 1][coor[1]] = '-' }
          if (draw[coor[0]]?.[coor[1] - 1] && draw[coor[0]][coor[1] - 1] !== '#') { draw[coor[0]][coor[1] - 1] = '-' }
        }
      }
    }
    if (pipe === 'L') {
      if (dir === 'right') {
        if (!isClockwise) {
          if (draw[coor[0] + 1]?.[coor[1]] && draw[coor[0] + 1][coor[1]] !== '#') { draw[coor[0] + 1][coor[1]] = '-' }
          if (draw[coor[0]]?.[coor[1] - 1] && draw[coor[0]][coor[1] - 1] !== '#') { draw[coor[0]][coor[1] - 1] = '-' }
        }
      } else if (dir === 'up') {
        if (isClockwise) {
          if (draw[coor[0] + 1]?.[coor[1]] && draw[coor[0] + 1][coor[1]] !== '#') { draw[coor[0] + 1][coor[1]] = '-' }
          if (draw[coor[0]]?.[coor[1] - 1] && draw[coor[0]][coor[1] - 1] !== '#') { draw[coor[0]][coor[1] - 1] = '-' }
        }
      }
    }
    if (pipe === 'J') {
      if (dir === 'left') {
        if (isClockwise) {
          if (draw[coor[0] + 1]?.[coor[1]] && draw[coor[0] + 1][coor[1]] !== '#') { draw[coor[0] + 1][coor[1]] = '-' }
          if (draw[coor[0]]?.[coor[1] + 1] && draw[coor[0]][coor[1] + 1] !== '#') { draw[coor[0]][coor[1] + 1] = '-' }
        }
      } else if (dir === 'up') {
        if (!isClockwise) {
          if (draw[coor[0] + 1]?.[coor[1]] && draw[coor[0] + 1][coor[1]] !== '#') { draw[coor[0] + 1][coor[1]] = '-' }
          if (draw[coor[0]]?.[coor[1] + 1] && draw[coor[0]][coor[1] + 1] !== '#') { draw[coor[0]][coor[1] + 1] = '-' }
        }
      }
    }
    if (pipe === '7') {
      if (dir === 'left') {
        if (!isClockwise) {
          if (draw[coor[0] - 1]?.[coor[1]] && draw[coor[0] - 1][coor[1]] !== '#') { draw[coor[0] - 1][coor[1]] = '-' }
          if (draw[coor[0]]?.[coor[1] + 1] && draw[coor[0]][coor[1] + 1] !== '#') { draw[coor[0]][coor[1] + 1] = '-' }
        }
      } else if (dir === 'down') {
        if (isClockwise) {
          if (draw[coor[0] - 1]?.[coor[1]] && draw[coor[0] - 1][coor[1]] !== '#') { draw[coor[0] - 1][coor[1]] = '-' }
          if (draw[coor[0]]?.[coor[1] + 1] && draw[coor[0]][coor[1] + 1] !== '#') { draw[coor[0]][coor[1] + 1] = '-' }
        }
      }
    }
  }

  while (!stop) {
    path = proceed(path[0], path[2], path[1])
    const [, curPipe, curDir] = path
    countTurn(curPipe, curDir)
    coords.push(path)
    if (path[1] === 'S') {
      stop = true
    }
  }
  const isClockwise = rightCount > leftCount
  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i]
    const drawRow = []
    for (let j = 0; j < row.length; j++) {
      if (coords.find(coor => coor[0][0] === i && coor[0][1] === j)) {
        drawRow.push('#')
      } else {
        drawRow.push(' ')
      }
    }
    draw.push(drawRow)
  }

  // set pipe adjacents whic are not inside
  for (let i = 0; i < coords.length; i++) {
    const [coor, pipe, dir] = coords[i]
    setPipeAdjOut(coor, pipe, dir)
  }
  const checkElement = (i, j, dir) => {
    if (!draw?.[i]?.[j]) {
      return '-'
    }
    const [x, y] = getCoordsByDir([i, j], dir)
    if (!isChecked(x, y)) {
      return checkElement(x, y, dir)
    }
    return draw?.[x]?.[y] ?? '-'
  }

  const isDone = () => draw.every((row, i) => row.every((item, j) => (item === '+' &&
  ['+', '#'].includes(draw[getCoordsByDir([i, j], 'up')[0]]?.[getCoordsByDir([i, j], 'up')[1]]) &&
  ['+', '#'].includes(draw[getCoordsByDir([i, j], 'down')[0]]?.[getCoordsByDir([i, j], 'down')[1]]) &&
  ['+', '#'].includes(draw[getCoordsByDir([i, j], 'left')[0]]?.[getCoordsByDir([i, j], 'left')[1]]) &&
  ['+', '#'].includes(draw[getCoordsByDir([i, j], 'right')[0]]?.[getCoordsByDir([i, j], 'right')[1]])) || (item !== ' ')))

  const inConditions = ['#', '+']
  let sum = 0
  for (let i = 0; i < draw.length; i++) {
    const r = draw[i]
    for (let j = 0; j < r.length; j++) {
      const element = r[j]
      if (element === ' ') {
        const up = checkElement(i, j, 'up')
        const left = checkElement(i, j, 'left')
        const right = checkElement(i, j, 'right')
        const down = checkElement(i, j, 'down')

        if (inConditions.includes(up) &&
        inConditions.includes(left) &&
        inConditions.includes(right) &&
        inConditions.includes(down)) {
          draw[i][j] = '+'
          sum++
        } else { draw[i][j] = '-' }
      }
    }
  }
  while (!isDone()) {
    for (let i = 0; i < draw.length; i++) {
      const r = draw[i]
      for (let j = 0; j < r.length; j++) {
        const element = r[j]
        if (element === '+') {
          const up = checkElement(i, j, 'up')
          const left = checkElement(i, j, 'left')
          const right = checkElement(i, j, 'right')
          const down = checkElement(i, j, 'down')

          if (inConditions.includes(up) &&
          inConditions.includes(left) &&
          inConditions.includes(right) &&
          inConditions.includes(down)) {
            draw[i][j] = '+'
          } else { draw[i][j] = '-' }
        }
      }
    }
  }
  sum = draw.reduce((acc, row) => acc + row.filter((item) => item === '+').length, 0)

  return sum
}
