// Problem 1: Find minimum value of heat loss
// Problem 2: 

const fs = require('fs')

// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n')
console.log({puzzleData})

function getMinOfMap(map) {
    const min = Array.from(map).reduce((min,curr)=> {
        const [x,y] = curr[0].split(',')
        curr[1] < min[1] && puzzleData[x][y] !== null ? curr : min
    })
    // returns location of minimum map that hasn't been visited
    return min[0];
  }
// starting in lefthand corner
const queue = [[0,0]]
const heatMap = new Map()
const initialHeatLoss = puzzleData[0][0]
console.log ({initialHeatLoss})
heatMap.set('0,0', 0) 
while (queue.length > 0) {
    const location = queue.shift()
    const [row, col] = location
    puzzleData[row][col] = null
    // check adjacent squares 
    if (row + 1 < puzzleData.length){
        const below = puzzleData[row + 1][col]
        heatMap.set(`${row + 1},${col}`, below)
        if (!minHeat || below < minHeat){

        }
    }
    if (row - 1 >= 0){
        const above = puzzleData[row - 1][col]
        if (above === 1){
            puzzleData[row - 1][col] = 2
            queue.push([row - 1, col])
        }

    }
    if (col + 1 < puzzleData[0].length){
        const right = puzzleData[row][col+1]
        if (right === 1){
            puzzleData[row][col+1] = 2
            queue.push([row, col+1])
        }

    }
    if (col - 1 >= 0){
        const left = puzzleData[row][col-1]
        if (left === 1){
            puzzleData[row][col-1] = 2
            queue.push([row, col-1])
        }

    }
console.log({initialHeatLoss})
    
}
// const clumsyCrucible = (row, col, direction, directionCount) =>{
//  // if the row col is not in bounds return
//     if (row < 0 || col < 0 || row >= puzzleData.length || col >= puzzleData[0].length || puzzleData[row][col] === 0) {
//         return null
//     }
//     let minSum = puzzleData[row][col]
//     puzzleData[row][col] = 0 // Mark current cell as visited
//     if (row !== puzzleData.length-1 && col !== puzzleData[0].length -1){
//          // check neighboring cells, take the min
//          const down =  clumsyCrucible(row + 1, col); // Down
//          const up = clumsyCrucible(row - 1, col); // Up
//          const right = clumsyCrucible(row, col + 1); // Right
//          const left = clumsyCrucible(row, col - 1); // Left
//          const result = [down, up, right, left].filter(item=>!!item)
//          if (result.length){
//              minSum += Math.min(...result)
//          } else {
//              return null
//          }
//     }
 
//    return minSum
//    // if the crucible has moved 3 times in the same space in a row the only option
// }

clumsyCrucible(0,0)