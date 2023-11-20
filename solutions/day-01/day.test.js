import { assertSolution, assertTest, getFileP } from '../utils.js'
import first from './firstSolution.js'
import second from './secondSolution.js'

const dayName = 'day8'

describe(`${dayName}-first`, function () {
  const func = first
  assertTest(getFileP('testinput0'), func, 21)
  assertSolution(getFileP('input'), func)
})

describe(`${dayName}-second`, function () {
  const func = second
  assertTest(getFileP('testinput0'), func, 8)
  assertSolution(getFileP('input'), func)
})
