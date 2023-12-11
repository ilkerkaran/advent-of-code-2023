import { assertSolution, assertTest, getFileP } from '../utils.js'
import first from './firstSolution.js'
import second from './secondSolution.js'

// this name is used to target the correct file when testing
// eg `mocha test -- -f day11-first`
const dayName = 'day11'

describe(`${dayName}-first`, function () {
  const func = first
  assertTest(getFileP('testinput'), func, 374)
  assertSolution(getFileP('input'), func)
})

describe(`${dayName}-second`, function () {
  const func = second
  assertTest(getFileP('testinput'), func, 1030, [10])
  assertTest(getFileP('testinput'), func, 8410, [100])
  assertSolution(getFileP('input'), func, [1000000])
})
