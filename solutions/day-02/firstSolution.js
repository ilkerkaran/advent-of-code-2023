export default (arr, rgb) => {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    const line = arr[i].replaceAll(' ', '').replaceAll('green', 'G').replaceAll('red', 'R').replaceAll('blue', 'B')
    const setsStr = line.split(':')[1]
    const isPossible = checkLine(setsStr, rgb)
    if (isPossible) {
      sum += i + 1
    }
  }
  return sum
}
// returns if the line is possible
const checkLine = (setsStr, rgb) => {
  const [R, G, B] = rgb
  const target = { R, G, B }
  const sets = setsStr.split(';')
  for (let i = 0; i < sets.length; i++) {
    const cubes = sets[i].split(',')
    for (let j = 0; j < cubes.length; j++) {
      const cube = cubes[j]
      const cubeCount = cube.substring(0, cube.length - 1)
      const cubeColor = cube[cube.length - 1]
      if (target[cubeColor] < cubeCount) {
        return false
      }
    }
  }
  return true
}
