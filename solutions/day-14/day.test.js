import { assertSolution, assertTest, getFileP } from '../utils.js'
import first from './firstSolution.js'
import second from './secondSolution.js'

// this name is used to target the correct file when testing
// eg `mocha test -- -f day14-first`
const dayName = 'day14'

describe(`${dayName}-first`, function () {
  const func = first
  assertTest(getFileP('testinput'), func, 136)
  assertSolution(getFileP('input'), func)
})

describe(`${dayName}-second`, function () {
  const func = second
  assertTest(getFileP('testinput'), func, 400)
  assertSolution(getFileP('input'), func)
})
