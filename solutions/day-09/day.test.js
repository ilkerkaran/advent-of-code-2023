import { assertSolution, assertTest, getFileP } from '../utils.js'
import first from './firstSolution.js'
import second from './secondSolution.js'

// this name is used to target the correct file when testing
// eg `mocha test -- -f day09-first`
const dayName = 'day09'

describe(`${dayName}-first`, function () {
  const func = first
  assertTest(getFileP('testinput'), func, 114)
  assertSolution(getFileP('input'), func)

  // 1944159732 too high
})

describe(`${dayName}-second`, function () {
  const func = second
  assertTest(getFileP('testinput'), func, 5905)
  assertSolution(getFileP('input'), func)
})
