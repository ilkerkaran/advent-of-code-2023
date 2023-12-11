import { getKeyOfMatrix, print2DArray } from './../utils.js'

export const expandVertically = (matrix) => {
  const newMatrix = []

  matrix.forEach((row) => {
    newMatrix.push(row)
    if (row.every((seat) => seat === '.')) {
      newMatrix.push(row)
    }
  })

  return newMatrix
}

export const expandHorizontally = (matrix) => {
  const newMatrix = []
  const expandIndexes = []
  for (let j = 0; j < matrix[0].length; j++) {
    if (matrix.every((row) =>
      row[j] === '.'
    )) {
      expandIndexes.push(j)
    }
  }

  matrix.forEach((row) => {
    const newRow = []
    for (let j = 0; j < row.length; j++) {
      newRow.push(row[j])
      if (expandIndexes.includes(j)) {
        newRow.push(row[j])
      }
    }
    newMatrix.push(newRow)
  })

  return newMatrix
}

export const nonDiagonalDist = (i1, j1, i2, j2) => {
  return Math.abs(i1 - i2) + Math.abs(j1 - j2)
}

export default (arr) => {
  let matrix = arr.map((row) => row.split(''))
  matrix = expandVertically(matrix)
  matrix = expandHorizontally(matrix)

  const galaksies = {}

  matrix.forEach((row, i) => {
    row.forEach((seat, j) => {
      if (seat === '#') { galaksies[getKeyOfMatrix(i, j)] = { i, j, distMap: {} } }
    })
  })
  Object.entries(galaksies).forEach(([addr, galaxy]) => {
    Object.entries(galaksies).filter(([addr2, galaxy2]) => addr !== addr2).forEach(([addr2, galaxy2]) => {
      galaxy.distMap[addr2] = nonDiagonalDist(galaxy.i, galaxy.j, galaxy2.i, galaxy2.j)
    })
  })

  return Object.values(galaksies).reduce((acc, galaxy) =>
    acc + Object.values(galaxy.distMap).reduce((acc, dist) => acc + dist, 0) / 2
  , 0)
}
