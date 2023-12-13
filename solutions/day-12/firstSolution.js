import { fillArrengments } from './utils.js'

export default (arr) => {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    const r = arr[i]
    const [condition, groupStr] = r.split(' ')
    const group = groupStr.split(',').map((item) => +item)
    const arrSum = fillArrengments(condition, group)
    console.log('condition', condition, group, arrSum)
    sum += arrSum
  }
  return sum
}
