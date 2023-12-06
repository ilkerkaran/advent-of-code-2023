// import util from 'util'
// export default (arr) => {
//   const seeds = [...arr[0].matchAll(/\d+/g)].map((e) => parseInt(e))

//   const structuredSeeds = { src: [], dest: [] }
//   const almanac = {
//     seed2soil: { src: [], dest: [] },
//     soil2fertilizer: { src: [], dest: [] },
//     fertilizer2water: { src: [], dest: [] },
//     water2light: { src: [], dest: [] },
//     light2temperature: { src: [], dest: [] },
//     temperature2humidity: { src: [], dest: [] },
//     humidity2location: { src: [], dest: [] }
//   }
//   const getObj = (i) => {
//     switch (i) {
//       case 0:
//         return almanac.seed2soil
//       case 1:
//         return almanac.soil2fertilizer
//       case 2:
//         return almanac.fertilizer2water
//       case 3:
//         return almanac.water2light
//       case 4:
//         return almanac.light2temperature
//       case 5:
//         return almanac.temperature2humidity
//       case 6:
//         return almanac.humidity2location
//       default:
//         return null
//     }
//   }
//   for (let i = 0; i < seeds.length; i += 2) {
//     const s = seeds[i]
//     const l = seeds[i + 1]
//     structuredSeeds.src.push({ min: s, max: s + l - 1 })
//     structuredSeeds.dest.push({ min: s, max: s + l - 1 })
//   }

//   const reOrderMapBySrc = ({ src: srcArr, dest: destArr }) => {
//     const tmp = []
//     for (let i = 0; i < srcArr.length; i++) {
//       const srcList = srcArr[i]
//       const destList = destArr[i]
//       tmp.push({ srcList, destList, index: srcList.min })
//     }
//     tmp.sort((a, b) => a.index - b.index)
//     return { src: tmp.map((e) => e.srcList), dest: tmp.map((e) => e.destList) }
//   }

//   const reOrderMapByDest = ({ src: srcArr, dest: destArr }) => {
//     const tmp = []
//     for (let i = 0; i < srcArr.length; i++) {
//       const srcList = srcArr[i]
//       const destList = destArr[i]
//       tmp.push({ srcList, destList, index: destList.min })
//     }
//     tmp.sort((a, b) => a.index - b.index)
//     return { src: tmp.map((e) => e.srcList), dest: tmp.map((e) => e.destList) }
//   }
//   const arr2push = [[]]
//   for (let i = 2; i < arr.length; i++) {
//     const line = arr[i]
//     if (line) {
//       arr2push[arr2push.length - 1].push(line)
//     } else {
//       arr2push.push([])
//     }
//   }
//   // set almanac here
//   for (let i = 0; i < arr2push.length; i++) {
//     const element = arr2push[i]
//     const targetObj = getObj(i)
//     for (let j = 1; j < element.length; j++) {
//       const [to, from, range] = element[j].split(' ').map((e) => parseInt(e))
//       targetObj.src.push({ min: from, max: from + range - 1 })
//       targetObj.dest.push({ min: to, max: to + range - 1 })
//     }
//   }

//   Object.values(almanac).reduce((acc, curMap, index) => {
//     const { src: prevSrcObj, dest: prevDestObj } = reOrderMapByDest(acc)
//     const { src: curSrcObj, dest: curDestObj } = reOrderMapBySrc(curMap)
//     console.log('iteration', util.inspect({ prevSrcObj, prevDestObj, curSrcObj, curDestObj }, true, 10))
//     for (let i = 0; i < prevDestObj.length; i++) {
//       const prevSrc = prevSrcObj[i]
//       const prevDest = prevDestObj[i]
//       let j = 0
//       let curHead = prevDest.min

//       const destroy = (nextSrc, nextDest) => {}

//       const checkForOverlap = (jIndex) => {
//         if (jIndex >= curSrcObj.length) {
//           return false
//         }
//         const curSrc = curSrcObj[jIndex]
//         const curDest = curDestObj[jIndex]
//         if ((curHead >= curSrc.min && curHead <= curSrc.max) || (prevDest.max >= curSrc.min || prevDest.max <= curSrc.max) || (curSrc.min >= curHead && curSrc.min <= prevDest.max) || (curSrc.max >= curHead && curSrc.max <= prevDest.max)) {
//           return true
//         }
//         return false
//       }

//       while (j < curSrcObj.length) {
//         const curSrc = curSrcObj[j]
//         const curDest = curDestObj[j]
//         // find overlapping arrays in next
//         const next = null
//         if (checkForOverlap(j)) {
//           // when prev
//           // inner
//           if (curSrc.min <= prevDest.min && prevDest.max >= curSrc.max) {
//             acc.src.push(prevSrc)
//             acc.dest.push({
//               min: curDest.src + (prevDest.min - curSrc.min),
//               max: curDest = (prevDest.max - curSrc.max)
//             })
//           }
//         } else if (prevDest.min <= curSrc.min && prevDest.max >= curSrc.max) { // outer
//           // before
//           acc.src.push({
//             min: prevSrc.min,
//             max: curSrc.min - 1
//           })
//           acc.dest.push({
//             min: prevDest.min + (curSrc.min - prevDest.min),
//             max: prevDest.min + (prevDest.min - curSrc.min)
//           })
//           curHead = curSrc.min
//           // overlap
//           acc.src()
//           // set head
//         }
//         // left

//         // right

//         j++
//       }
//     }

//     // for (let j = 0; j < overlappingNext.length; j++) {
//     //   headOffset = curPrevHead - prevDestFrom
//     //   const [curSrcFrom, curSrcTo] = overlappingNext[j]
//     //   if (curSrcFrom > curPrevHead) {
//     //     acc.src.push([curPrevHead, curSrcFrom - curPrevHead - 1])
//     //     acc.dest.push()
//     //   }
//     // }

//     if (index === 0) {
//       // console.log('pieceRes', util.inspect(pieceRes, true, 10))
//     }
//     return curMap
//   }, structuredSeeds)

//   return Math.min(6)
// }
