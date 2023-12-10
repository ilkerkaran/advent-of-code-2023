import { assertSolution, assertTest, getFileP } from '../utils.js'
import first from './firstSolution.js'
import second from './secondSolution.js'

// this name is used to target the correct file when testing
// eg `mocha test -- -f day10-first`
const dayName = 'day10'

describe(`${dayName}-first`, function () {
  const func = first
  assertTest(getFileP('testInput'), func, 4)
  assertTest(getFileP('testInput1'), func, 8)
  assertSolution(getFileP('input'), func)
})

describe(`${dayName}-second`, function () {
  const func = second
  assertTest(getFileP('testinput'), func, 1)
  assertTest(getFileP('testInput1'), func, 1)
  assertTest(getFileP('testinput2'), func, 4)
  assertTest(getFileP('testinput3'), func, 8)
  assertTest(getFileP('testinput4'), func, 10)
  assertSolution(getFileP('input'), func)
})
