const isArrengmentValid = (condition, group, processedCondition = -1) => {
  if (processedCondition === -1) { processedCondition = condition.length }

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
  return remainingGroup.length === 0 && (condition.slice(processedCondition + 1).indexOf('#') === -1 || condition.slice(processedCondition + 1).indexOf('?') === -1)
}

export const fillArrengments = (condition, group, processedGroup = [], prefix = '', sum = 0) => {
  const broken = group[0]
  if ((condition.indexOf('?') === -1 && prefix.indexOf('?') === -1) || (group.length === 0 && condition.indexOf('#') === -1)) {
    const ret = (sum + isArrengmentValid(prefix + condition, [...processedGroup, ...group], prefix.length))
    return ret
  }
  for (let i = 0; i < condition.length; i++) {
    const char = condition[i]
    if (char === '#') {
      let errCount = 1
      prefix += '#'
      let j = i + 1
      while (condition[j] === '#' || (errCount < broken && condition[j] === '?')) {
        prefix += '#'
        errCount++
        j++
      }
      if (errCount !== broken) {
        return sum
      }

      if (errCount === broken &&
        (!condition[j] ||
        condition[j] === '.' ||
        condition[j] === '?')) {
        if (condition[j]) { prefix += '.' }
        return fillArrengments(condition.slice(j + 1), group.slice(1), [...processedGroup, broken], prefix, sum)
      } else {
        return sum + isArrengmentValid(prefix + condition.slice(j), [...group], [...processedGroup])
      }
    } else if (char === '.') {
      while (!condition[i] || (condition[i] === '.')) {
        if (condition[i]) { prefix += '.' }
        i++
      }
      return fillArrengments(condition.slice(i), group, [...processedGroup], prefix, sum)
    } else {
      return fillArrengments(condition.replace('?', '.'), [...group], [...processedGroup], prefix, sum) +
      fillArrengments(condition.replace('?', '#'), [...group], [...processedGroup], prefix, sum)
    }
  }
}
