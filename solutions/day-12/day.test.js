import { assertSolution, assertTest, getFileP } from '../utils.js'
import first from './firstSolution.js'
import second from './secondSolution.js'

// this name is used to target the correct file when testing
// eg `mocha test -- -f day12-first`
const dayName = 'day12'

describe(`${dayName}-first: ${new Date().toISOString().match(/(\d{2}:){2}\d{2}/)[0]}`, function () {
  const func = first
  assertTest(getFileP('testinput'), func, 136)
  // assertSolution(getFileP('input'), func)
})

describe(`${dayName}-second: ${new Date().toISOString().match(/(\d{2}:){2}\d{2}/)[0]}`, function () {
  const func = second
  assertTest(getFileP('testinput'), func, 525152)
  assertSolution(getFileP('input'), func)
})
