import { getK, structForest } from './structTree.js'

export default (arr) => {
  const x = arr[0].length
  const y = arr.length
  // struct map
  const treeMap = structForest(arr)

  const getTree = (i, j) => treeMap[getK(i, j)]
  let curBestView = 0

  const calculateView = (coorX, coorY) => {
    const ownLength = getTree(coorX, coorY)
    let r = 0
    let l = 0
    let u = 0
    let d = 0
    // look right
    for (let j = coorY + 1; j < y; j++) {
      const targetTree = getTree(coorX, j)
      r++
      if (ownLength <= targetTree) { break }
    }
    // look down
    for (let i = coorX + 1; i < x; i++) {
      const targetTree = getTree(i, coorY)
      d++
      if (ownLength <= targetTree) { break }
    }
    // look left
    for (let j = coorY - 1; j >= 0; j--) {
      const targetTree = getTree(coorX, j)
      l++
      if (ownLength <= targetTree) { break }
    }
    // look up
    for (let i = coorX - 1; i >= 0; i--) {
      const targetTree = getTree(i, coorY)
      u++
      if (ownLength <= targetTree) { break }
    }

    return r * l * u * d
  }

  for (let i = 1; i < x - 1; i++) {
    for (let j = 1; j < y - 1; j++) {
      curBestView = Math.max(curBestView, calculateView(i, j))
    }
  }

  return curBestView
}
