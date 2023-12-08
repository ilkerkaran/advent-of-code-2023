import { assertSolution, assertTest, getFileP } from '../utils.js'
import first from './firstSolution.js'
import second from './secondSolution.js'

// this name is used to target the correct file when testing
// eg `mocha test -- -f day07-first`
const dayName = 'day08'

describe(`${dayName}-first`, function () {
  const func = first
  assertTest(getFileP('testinput'), func, 6)
  assertTest(getFileP('testinput1'), func, 2)
  assertSolution(getFileP('input'), func)
})

describe(`${dayName}-second`, function () {
  const func = second
  assertTest(getFileP('testinput2'), func, 6)
  assertSolution(getFileP('input'), func)
  // wrong 189001860000000
  // wrong 18024643846274
  //       18024643846273
})
