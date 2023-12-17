import { assertSolution, assertTest, getFileP } from '../utils.js'
import first from './firstSolution.js'
import second from './secondSolution.js'

// this name is used to target the correct file when testing
// eg `mocha test -- -f day17-first`
const dayName = 'day17'

describe(`${dayName}-first`, function () {
  const func = first
  // assertTest(getFileP('testinput'), func, 102)
  // assertTest(getFileP('testinput1'), func, 9)
  assertTest(getFileP('testinput2'), func, 2)
  // assertSolution(getFileP('input'), func)
})

describe(`${dayName}-second`, function () {
  const func = second
  assertTest(getFileP('testinput'), func, 51)
  assertSolution(getFileP('input'), func)
})
