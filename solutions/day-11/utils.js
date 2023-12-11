export const expandVertically = (matrix) => {
  const newMatrix = []

  matrix.forEach((row, i) => {
    if (row.every((seat) => seat === '.' || seat === '*')) {
      for (let j = 0; j < row.length; j++) {
        row[j] = '*'
      }

      newMatrix[i] = true
    }
  })

  return newMatrix
}

export const expandHorizontally = (matrix) => {
  const expandIndexes = []
  for (let j = 0; j < matrix[0].length; j++) {
    if (matrix.every((row) =>
      row[j] === '.' || row[j] === '*'
    )) {
      for (let i = 0; i < matrix.length; i++) {
        matrix[i][j] = '*'
      }

      expandIndexes[j] = true
    }
  }

  return expandIndexes
}

export const nonDiagonalDist = (i1, j1, i2, j2) => Math.abs(i1 - i2) + Math.abs(j1 - j2)
