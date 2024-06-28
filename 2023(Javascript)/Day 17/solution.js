// Problem 1: Find minimum value of heat loss
// Problem 2: 

const fs = require('fs')

// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n')
console.log({puzzleData})

// starting in lefthand corner, find all possible paths to right corner, assume that we won't reenter a square
const clumsyCrucible = (row, col, direction, directionCount) =>{
 // if the row col is not in bounds return
    if (row < 0 || col < 0 || row >= puzzleData.length || col >= puzzleData[0].length || puzzleData[row][col] === 0) {
        return null
    }
    let minSum = puzzleData[row][col]
    puzzleData[row][col] = 0 // Mark current cell as visited
    if (row !== puzzleData.length-1 && col !== puzzleData[0].length -1){
         // check neighboring cells, take the min
         const down =  clumsyCrucible(row + 1, col); // Down
         const up = clumsyCrucible(row - 1, col); // Up
         const right = clumsyCrucible(row, col + 1); // Right
         const left = clumsyCrucible(row, col - 1); // Left
         const result = [down, up, right, left].filter(item=>!!item)
         if (result.length){
             minSum += Math.min(...result)
         } else {
             return null
         }
    }
 
   return minSum
   // if the crucible has moved 3 times in the same space in a row the only option
}

clumsyCrucible(0,0)