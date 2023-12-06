export default (arr) => {
  const times = [...arr[0].matchAll(/\d+/g)].map(n => +n[0])
  const distances = [...arr[1].matchAll(/\d+/g)].map(n => +n[0])
  const res = []
  for (let i = 0; i < times.length; i++) {
    const targetTime = times[i]
    const targetDistance = distances[i]
    res[i] = []

    for (let j = 1; j < targetTime; j++) {
      if (targetDistance < j * (targetTime - j)) {
        res[i].push(j)
      }
    }
  }

  return res.reduce((acc, cur) => acc * cur.length, 1)
}
