import { decodeLabel } from './utils.js'

export default (arr) => {
  const boxes = []
  boxes.fill([], 0, 255)
  const steps = arr.flatMap(x => x.split(','))

  console.log(decodeLabel('qp'), boxes.length)

  // to be continued...
}
