export const tiltNorth = (platform, dirFinder) => {
  for (let i = 0; i < platform.length; i++) {
    for (let j = 0; j < platform[0].length; j++) {
      const piece = platform[i][j]
      if (piece === 'O') {
        let [ni, nj] = n(i, j)
        let nextPiece = platform[ni]?.[nj]
        let dist = 0
        while (nextPiece === '.') {
          [ni, nj] = n(ni, nj)
          dist++
          nextPiece = platform[ni]?.[nj]
        }
        platform[i][j] = '.'
        const [nni, nnj] = n(i, j, dist)
        platform[nni][nnj] = 'O'
      }
    }
  }
}

export const tiltWest = (platform, dirFinder) => {
  for (let i = 0; i < platform.length; i++) {
    for (let j = 0; j < platform[0].length; j++) {
      const piece = platform[i][j]
      if (piece === 'O') {
        let [ni, nj] = w(i, j)
        let nextPiece = platform[ni]?.[nj]
        let dist = 0
        while (nextPiece === '.') {
          [ni, nj] = w(ni, nj)
          dist++
          nextPiece = platform[ni]?.[nj]
        }
        platform[i][j] = '.'
        const [nni, nnj] = w(i, j, dist)
        platform[nni][nnj] = 'O'
      }
    }
  }
}

export const tiltEast = (platform, dirFinder) => {
  for (let i = platform.length - 1; i >= 0; i--) {
    for (let j = platform[0].length - 1; j >= 0; j--) {
      const piece = platform[i][j]
      if (piece === 'O') {
        let [ni, nj] = e(i, j)
        let nextPiece = platform[ni]?.[nj]
        let dist = 0
        while (nextPiece === '.') {
          [ni, nj] = e(ni, nj)
          dist++
          nextPiece = platform[ni]?.[nj]
        }
        platform[i][j] = '.'
        const [nni, nnj] = e(i, j, dist)
        platform[nni][nnj] = 'O'
      }
    }
  }
}

export const tiltSouth = (platform, dirFinder) => {
  for (let i = platform.length - 1; i >= 0; i--) {
    for (let j = platform[0].length - 1; j >= 0; j--) {
      const piece = platform[i][j]
      if (piece === 'O') {
        let [ni, nj] = s(i, j)
        let nextPiece = platform[ni]?.[nj]
        let dist = 0
        while (nextPiece === '.') {
          [ni, nj] = s(ni, nj)
          dist++
          nextPiece = platform[ni]?.[nj]
        }
        platform[i][j] = '.'
        const [nni, nnj] = s(i, j, dist)
        platform[nni][nnj] = 'O'
      }
    }
  }
}

export const fullSpin = (platform) => {
  tiltNorth(platform)
  tiltWest(platform)
  tiltSouth(platform)
  tiltEast(platform)
}

const n = (i, j, dist = 1) => [
  i - dist, j
]

const e = (i, j, dist = 1) => [
  i, j + dist
]

const s = (i, j, dist = 1) => [
  i + dist, j
]

const w = (i, j, dist = 1) => [
  i, j - dist
]
