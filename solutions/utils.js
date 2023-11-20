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
