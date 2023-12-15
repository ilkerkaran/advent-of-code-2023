import { decodeLabel } from './utils.js'

export default (arr) => {
  const steps = arr.flatMap(x => x.split(','))
  return steps.reduce((sum, step) => sum + decodeLabel(step), 0)
}
