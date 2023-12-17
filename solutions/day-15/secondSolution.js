import { decodeLabel } from './utils.js'
export default (arr) => {
  const boxes = (new Array(256)).fill(0).map(() => [])
  const steps = arr.flatMap(x => x.split(','))
  steps.forEach(step => {
    if (step.includes('=')) {
      const boxNum = decodeLabel(step.split('=')[0])
      const lens = boxes[boxNum].find(lens => lens.label === step.split('=')[0])
      if (lens) {
        lens.count = +step.split('=')[1]
      } else {
        boxes[boxNum].push({ label: step.split('=')[0], count: +step.split('=')[1] })
      }
    } else {
      const label = step.substring(0, step.length - 1)
      boxes[decodeLabel(label)] = boxes[decodeLabel(label)].filter(lens => lens.label !== label)
    }
  })
  return boxes.reduce((sum, box, i) => sum + (i + 1) * box.reduce((acc, lens, j) => acc + (j + 1) * lens.count, 0), 0)
}
