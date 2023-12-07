import { assertSolution, assertTest, getFileP } from '../utils.js'
import first from './firstSolution.js'
import second from './secondSolution.js'

// this name is used to target the correct file when testing
// eg `mocha test -- -f day07-first`
const dayName = 'day07'

describe(`${dayName}-first`, function () {
  const func = first
  assertTest(getFileP('testinput'), func, 6440)
  assertSolution(getFileP('input'), func)
})

describe(`${dayName}-second`, function () {
  const func = second
  assertTest(getFileP('testinput'), func, 5905)
  assertSolution(getFileP('input'), func)
})
