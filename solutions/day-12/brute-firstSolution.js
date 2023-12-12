export default (arr) => {
  const isArrengmentValid = (condition, group) => {
    const remainingGroup = group
    for (let i = 0; i < condition.length; i++) {
      if (condition[i] === '#') {
        let errCount = 1
        while (condition[i + 1] === '#') {
          errCount++
          i++
        }
        if (errCount !== remainingGroup.shift()) return false
      }
    }
    return remainingGroup.length === 0
  }

  const getPossibleArrangments = (condition) => {
    const possibleArrangments = [condition]
    while (possibleArrangments.some((arr) => arr.indexOf('?') !== -1)) {
      const newArrangments = []
      for (let i = 0; i < possibleArrangments.length; i++) {
        const arr = possibleArrangments.shift()
        const index = arr.indexOf('?')
        if (index !== -1) {
          newArrangments.push(arr.slice(0, index) + '.' + arr.slice(index + 1))
          newArrangments.push(arr.slice(0, index) + '#' + arr.slice(index + 1))
        } else { newArrangments.push(arr) }
      }
      possibleArrangments.push(...newArrangments)
    }
    return possibleArrangments
  }

  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    const r = arr[i]
    const [condition, groupStr] = r.split(' ')
    const group = groupStr.split(',').map((item) => +item)

    const possibleArrangments = getPossibleArrangments(condition)
    const validArrangments = possibleArrangments.filter(arr => isArrengmentValid(arr, [...group]))
    sum += validArrangments.length
  }
  return sum
}
