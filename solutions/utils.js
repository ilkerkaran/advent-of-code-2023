import fs from 'fs'
import path from 'path'
import callsite from 'callsite'
import assert from 'assert'

export const getFileP = (inputFileName) => {
  const stack = callsite()
  const requester = stack[1].getFileName()
  const finalPath = path.join(path.dirname(requester), inputFileName).substring(5)
  return finalPath
}

export const readFileFromFullPath = (fullPath) => fs.readFileSync(fullPath, 'utf8').split('\n')

export const readFile = (inputFileName) => {
  return fs.readFileSync(getFileP(inputFileName), 'utf8').split('\n')
}

export const assertTest = (fullPath, targetFunc, expectedVal, additionalArgs = []) => {
  it(`${targetFunc.name} should return ${expectedVal}`, function () {
    const inputArr = readFileFromFullPath(fullPath)
    assert.equal(targetFunc(inputArr, ...additionalArgs), expectedVal)
  })
}

export const assertSolution = (fullPath, targetFunc, additionalArgs = []) => {
  it('input should return', function () {
    const inputArr = readFileFromFullPath(fullPath)
    const actualAns = targetFunc(inputArr, ...additionalArgs)
    console.log('predictedAnswer:', actualAns)
    assert.ok(actualAns)
  })
}

export const print2DArray = (txt, arr) => {
  console.log(txt)
  for (let i = 0; i < arr.length; i++) {
    const row = arr[i]
    let rowStr = ''
    for (let j = 0; j < row.length; j++) {
      const element = row[j]
      rowStr += element
    }
    console.log(rowStr)
  }
}

export const getKeyOfMatrix = (i, j) => `${i},${j}`
export const getCoordOfMatrixKey = (key) => key.split(',').map((str) => parseInt(str))
