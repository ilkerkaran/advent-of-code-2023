const getUnfolded = (condition, group) => {
  let unfoldedCondition = ''
  const unfoldedGroup = []
  for (let i = 0; i < 5; i++) {
    unfoldedGroup.push(...group)
    unfoldedCondition += condition + (i === 4 ? '' : '?')
  }
  return [unfoldedCondition, unfoldedGroup]
}

const calcQArr = (qLen, group, s = 0) => {
  if (group.length === 0) {
    return 0
  }
  let g = group.shift()

  const remGroupLength = group.reduce((acc, item) => acc + item, 0) + group.length - 1
  console.log('qLen, group, s', qLen, group, s, remGroupLength)
  if (!group.length) {
    if (qLen >= g) {
      return (qLen - g + 1)
    } else return 0
  } else {
    g++
    for (let i = 0; i < qLen - remGroupLength; i++) {
      s += calcQArr(qLen - g - i, [...group], s)
    }
    return s
  }
}

const calcHashQArr = (condition, group, sum = 0) => {
  if (group.length === 0) return 1
  if (condition.split('').every((item) => item === '?')) {
    return group.length === 0 ? 1 : calcQArr(condition.length, group)
  }
  for (let i = 0; i < condition.length; i++) {
    const node = condition[i]
    if (node === '#') {
      for (let j = 0; j < group.length; j++) {
        const g = group[j]
        for (let k = i - g + 1; k <= i; k++) {
          if (condition[k]) {
            const prior = calcHashQArr(condition.slice(0, k), group.slice(0, j))
            const after = calcHashQArr(condition.slice(k + 1), group.slice(j + 1))
            console.log('prior, after', prior, after)
            return sum + (prior * after)
          }
        }
      }
    }
  }
}

export default (arr) => {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    const r = arr[i]
    const [conditionStr, groupStr] = r.split(' ')
    const group = groupStr.split(',').map((item) => +item)
    const [unfoldedCondition, unfoldedGroup] = getUnfolded(conditionStr, group)
    const condition = conditionStr.replaceAll(/(\.)\1+/g, '.').split('.')

    console.log('unfoldedCondition, unfoldedGroup', unfoldedCondition, unfoldedGroup)
    const arrSum = 1// fillArrengments(unfoldedCondition, unfoldedGroup)

    console.log('QArr', calcQArr(6, [1, 1, 1]))
    console.log('??#?#', calcHashQArr('?#', [1]), '1')
    console.log('??#?#', calcHashQArr('??#?#', [1, 1]), '1')
    console.log('??#?#', calcHashQArr('??#?#', [1, 1, 1]), '1')
    // console.log('???#?#', calcHashQArr('???#?#', [1, 1, 1]), '2')
    // console.log('????#??#??', calcHashQArr('????#??#??', [2, 2, 2]), '4')
    // console.log('????#??#??', calcHashQArr('????#??#??', [2, 4]), '3')
    sum += arrSum
    console.log('iterasyon', i + 1, arrSum)
  }
  return sum
}
