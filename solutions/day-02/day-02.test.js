import { assertSolution, assertTest, getFileP } from '../utils.js'
import first from './firstSolution.js'
import second from './secondSolution.js'

// this name is used to target the correct file when testing
// eg `mocha test -- -f day02-first`
const dayName = 'day02'

describe(`${dayName}-first`, function () {
  const func = first
  assertTest(getFileP('testinput'), func, 8, [[12, 13, 14]])
  assertSolution(getFileP('input'), func, [[12, 13, 14]])
})

describe(`${dayName}-second`, function () {
  const func = second
  assertTest(getFileP('testinput'), func, 2286)
  assertSolution(getFileP('input'), func)
})
