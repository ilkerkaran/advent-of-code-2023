export const getK = (i, j) => `${i}_${j}`

export const structForest = (arr) => {
  const treeMap = {}
  arr.map((line, i) => {
    line.split('').map((c, j) => { treeMap[getK(i, j)] = +c })
  })
  return treeMap
}
