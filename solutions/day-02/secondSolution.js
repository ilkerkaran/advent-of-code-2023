export default (arr) => {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    const line = arr[i].replaceAll(' ', '').replaceAll('green', 'G').replaceAll('red', 'R').replaceAll('blue', 'B')
    const setsStr = line.split(':')[1]
    sum += checkLine(setsStr)
  }
  return sum
}
// returns if the line is possible
const checkLine = (setsStr) => {
  const target = { R: 0, G: 0, B: 0 }
  const sets = setsStr.split(';')
  for (let i = 0; i < sets.length; i++) {
    const cubes = sets[i].split(',')
    for (let j = 0; j < cubes.length; j++) {
      const cube = cubes[j]
      const cubeCount = +cube.substring(0, cube.length - 1)
      const cubeColor = cube[cube.length - 1]
      if (target[cubeColor] < cubeCount) {
        target[cubeColor] = cubeCount
      }
    }
  }
  return target.R * target.G * target.B
}
