import { getKeyOfMatrix } from './../utils.js'
import { expandVertically, expandHorizontally } from './utils.js'
export default (arr, expandSize) => {
  const matrix = arr.map((row) => row.split(''))
  const expandedColumns = expandHorizontally(matrix)
  const expandedRows = expandVertically(matrix)

  const galaxies = {}

  const nonDiagonalDist = (i1, j1, i2, j2) => {
    let dist = 0
    const startI = Math.min(i1, i2)
    const startJ = Math.min(j1, j2)
    let i = 0; let j = 0
    while (i < Math.abs(i1 - i2) || j < Math.abs(j1 - j2)) {
      if (i < Math.abs(i1 - i2) && !expandedRows[startI + i]) {
        dist++
        i++
      } else if (j < Math.abs(j1 - j2) && !expandedColumns[startJ + j]) {
        dist++
        j++
      } else {
        if (j < Math.abs(j1 - j2)) {
          dist += expandSize
          j++
        }
        if (i < Math.abs(i1 - i2)) {
          dist += expandSize
          i++
        }
      }
    }

    return dist
  }

  matrix.forEach((row, i) => {
    row.forEach((seat, j) => {
      if (seat === '#') { galaxies[getKeyOfMatrix(i, j)] = { i, j, distMap: {} } }
    })
  })
  Object.entries(galaxies).forEach(([addr, galaxy]) => {
    Object.entries(galaxies).filter(([addr2, galaxy2]) => addr !== addr2).forEach(([addr2, galaxy2]) => {
      galaxy.distMap[addr2] = nonDiagonalDist(galaxy.i, galaxy.j, galaxy2.i, galaxy2.j)
    })
  })

  return Object.values(galaxies).reduce((acc, galaxy) =>
    acc + Object.values(galaxy.distMap).reduce((acc, dist) => acc + dist, 0)
  , 0) / 2
}
