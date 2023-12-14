export default (arr) => {
  const platform = arr.map(line => line.split(''))
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      const piece = platform[i][j]
      if (piece === 'O') {
        let [ni, nj] = n(i, j)
        let nextPiece = platform[ni][nj]
        let dist = 0
        while (nextPiece === '.') {
          [ni, nj] = n(ni, nj)
          dist++
          nextPiece = platform[ni][nj]
        }
        platform[i][j] = '.'
        const [nni, nnj] = n(i, j, dist)
        platform[nni][nnj] = 'O'
      }
    }
  }
}

const n = (i, j, dist = 1) => [
  i - dist, j
]
const ne = (i, j) => [
  i - 1, j + 1
]
const e = (i, j) => [
  i, j + 1
]
const se = (i, j) => [
  i + 1, j + 1
]
const s = (i, j) => [
  i + 1, j
]
const sw = (i, j) => [
  i + 1, j - 1
]
const w = (i, j) => [
  i, j - 1
]
const nw = (i, j) => [
  i - 1, j - 1
]
