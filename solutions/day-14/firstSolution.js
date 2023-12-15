import { tiltNorth } from './utils.js'

export default (arr) => {
  const platform = arr.map(line => line.split(''))
  tiltNorth(platform)
  let sum = 0
  for (let i = 0; i < platform.length; i++) {
    const line = platform[i]
    sum += line.filter((item) => item === 'O').length * (platform.length - i)
  }
  return sum
}
