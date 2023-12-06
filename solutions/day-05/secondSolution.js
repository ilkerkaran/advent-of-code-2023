export default (arr) => {
  const seeds = [...arr[0].matchAll(/\d+/g)].map((e) => parseInt(e))
  const almanac = {
    seed2soil: { from: [], to: [], range: [] },
    soil2fertilizer: { from: [], to: [], range: [] },
    fertilizer2water: { from: [], to: [], range: [] },
    water2light: { from: [], to: [], range: [] },
    light2temperature: { from: [], to: [], range: [] },
    temperature2humidity: { from: [], to: [], range: [] },
    humidity2location: { from: [], to: [], range: [] }
  }
  console.log('seeds', seeds)
  const getObj = (i) => {
    switch (i) {
      case 0:
        return almanac.seed2soil
      case 1:
        return almanac.soil2fertilizer
      case 2:
        return almanac.fertilizer2water
      case 3:
        return almanac.water2light
      case 4:
        return almanac.light2temperature
      case 5:
        return almanac.temperature2humidity
      case 6:
        return almanac.humidity2location
      default:
        return null
    }
  }

  const arr2push = [[]]
  for (let i = 2; i < arr.length; i++) {
    const line = arr[i]
    if (line) {
      arr2push[arr2push.length - 1].push(line)
    } else {
      arr2push.push([])
    }
  }

  for (let i = 0; i < arr2push.length; i++) {
    const element = arr2push[i]
    const targetObj = getObj(i)

    for (let j = 1; j < element.length; j++) {
      const [to, from, range] = element[j].split(' ').map((e) => parseInt(e))
      targetObj.from.push(from)
      targetObj.to.push(to)
      targetObj.range.push(range)
    }
  }
  let iteration = 1
  let minRes = Number.MAX_SAFE_INTEGER

  for (let i = 0; i < seeds.length; i += 2) {
    const locRange = seeds[i + 1]
    const maps = Object.values(almanac)
    for (let r = 0; r < locRange; r++) {
      let loc = seeds[i] + r

      for (let j = 0; j < maps.length; j++) {
        const m = maps[j]
        loc = m[loc] ?? loc
        for (let k = 0; k < m.from.length; k++) {
          const from = m.from[k]
          const to = m.to[k]
          const range = m.range[k]
          if (loc >= from && loc <= from + range) {
            loc = to + (loc - from)

            const remLocR = locRange - r
            const remMapR = from - loc - range
            r = +Math.min(remLocR, remMapR)
            break
          }
        }
      }
      minRes = Math.min(minRes, loc)
      if (iteration++ % 1000000 === 0) console.log('iteration', iteration / 1000000, 'million', minRes)
    }
    console.log('end of seed', i, 'of', seeds.length / 2)
  }

  return minRes
}
