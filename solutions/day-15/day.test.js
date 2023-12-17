import { assertSolution, assertTest, getFileP } from '../utils.js'
import first from './firstSolution.js'
import second from './secondSolution.js'

// this name is used to target the correct file when testing
// eg `mocha test -- -f day15-first`
const dayName = 'day15'

describe(`${dayName}-first`, function () {
  const func = first
  assertTest(getFileP('testinput'), func, 1320)
  assertSolution(getFileP('input'), func)
})

describe(`${dayName}-second`, function () {
  const func = second
  assertTest(getFileP('testinput'), func, 145)
  assertSolution(getFileP('input'), func)
})
