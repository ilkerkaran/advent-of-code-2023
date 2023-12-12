import { fillArrengments } from './utils.js'

const getUnfolded = (condition, group) => {
  let unfoldedCondition = ''
  const unfoldedGroup = []
  for (let i = 0; i < 5; i++) {
    unfoldedGroup.push(...group)
    unfoldedCondition += condition + (i === 4 ? '' : '?')
  }
  return [unfoldedCondition, unfoldedGroup]
}

export default (arr) => {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    const r = arr[i]
    const [condition, groupStr] = r.split(' ')
    const group = groupStr.split(',').map((item) => +item)
    const [unfoldedCondition, unfoldedGroup] = getUnfolded(condition, group)
    console.log('unfoldedCondition, unfoldedGroup', unfoldedCondition, unfoldedGroup)
    const arrSum = fillArrengments(unfoldedCondition, unfoldedGroup)
    sum += arrSum
    console.log('iterasyon', i + 1, arrSum)
  }
  return sum
}
