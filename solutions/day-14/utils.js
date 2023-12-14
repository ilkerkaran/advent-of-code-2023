import { areColumnsEqual } from '../utils.js'

export const getPatternVal = (pattern) => {
  let tempVerticalIndexes = []
  let tempHorizontalIndexes = []
  // check horizontal mirrors
  for (let j = 0; j < pattern.length - 1; j++) {
    const startIndex = j
    const tempIndexes = []
    let tmpCounter = 0
    let isMirror = true
    while (startIndex - tmpCounter >= 0) {
      if (!pattern[startIndex - tmpCounter]) {
        isMirror = true
        break
      } else if (!!pattern[startIndex + tmpCounter + 1] &&
        (pattern[startIndex - tmpCounter] !== pattern[startIndex + tmpCounter + 1])) {
        isMirror = false
        break
      }
      tempIndexes.push(startIndex - tmpCounter)
      tmpCounter++
    }

    if (isMirror && tempIndexes.length > tempHorizontalIndexes.length) {
      tempHorizontalIndexes = tempIndexes
      break
    }
  }
  if (tempHorizontalIndexes.length > 0) {
    return 100 * tempHorizontalIndexes.length
  }

  // check vertical mirrors
  for (let j = 0; j < pattern[0].length; j++) {
    const startIndex = j
    const tempIndexes = []
    let tmpCounter = 0
    let isMirror = true
    while (startIndex - tmpCounter >= 0) {
      if (!pattern[0][startIndex - tmpCounter]) {
        isMirror = true
        break
      } else if (!!pattern[0][startIndex + tmpCounter + 1] && !areColumnsEqual(pattern, startIndex - tmpCounter, startIndex + tmpCounter + 1)) {
        isMirror = false
        break
      }
      tempIndexes.push(startIndex - tmpCounter)
      tmpCounter++
    }

    if (isMirror && tempIndexes.length >= tempVerticalIndexes.length) {
      tempVerticalIndexes = tempIndexes
      break
    }
  }
  return tempVerticalIndexes.length
}

export const getPatternMap = (pattern) => {
  const pMap = { v: [], h: [] }

  const tempVerticalIndexes = []
  const tempHorizontalIndexes = []
  // check horizontal mirrors
  for (let j = 0; j < pattern.length - 1; j++) {
    const startIndex = j
    const tempIndexes = []
    let tmpCounter = 0
    let isMirror = true
    while (startIndex - tmpCounter >= 0) {
      if (!pattern[startIndex - tmpCounter]) {
        isMirror = true
        break
      } else if (!!pattern[startIndex + tmpCounter + 1] &&
        (pattern[startIndex - tmpCounter] !== pattern[startIndex + tmpCounter + 1])) {
        isMirror = false
        break
      }
      tempIndexes.push(startIndex - tmpCounter)
      tmpCounter++
    }

    if (isMirror && tempIndexes.length) {
      tempHorizontalIndexes.push(tempIndexes)
    }
  }

  // check vertical mirrors
  for (let j = 0; j < pattern[0].length - 1; j++) {
    const startIndex = j
    const tempIndexes = []
    let tmpCounter = 0
    let isMirror = true
    while (startIndex - tmpCounter >= 0) {
      if (!pattern[0][startIndex - tmpCounter]) {
        isMirror = true
        break
      } else if (!!pattern[0][startIndex + tmpCounter + 1] && !areColumnsEqual(pattern, startIndex - tmpCounter, startIndex + tmpCounter + 1)) {
        isMirror = false
        break
      }
      tempIndexes.push(startIndex - tmpCounter)
      tmpCounter++
    }

    if (isMirror && tempIndexes.length >= tempVerticalIndexes.length) {
      tempVerticalIndexes.push(tempIndexes)
    }
  }
  for (let i = 0; i < tempHorizontalIndexes.length; i++) {
    const element = tempHorizontalIndexes[i]
    pMap.h.push(JSON.stringify(element))
  }
  for (let i = 0; i < tempVerticalIndexes.length; i++) {
    const element = tempVerticalIndexes[i]
    pMap.v.push(JSON.stringify(element))
  }

  return pMap
}
