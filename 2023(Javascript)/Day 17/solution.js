// Problem 1: Find minimum value of heat loss
// Problem 2: 

const fs = require('fs')

// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n')
console.log({puzzleData})

// starting in lefthand corner, find all possible paths to right corner, assume that we won't reenter a square
const clumsyCrucible = (row, col) =>{
 // if the row col is not in bounds return
    if (row < 0 || col < 0 || row >= puzzleData.length || col >= puzzleData[0].length || puzzleData[row][col] === 0) {
        return
    }
   // if the crucible has been to this spot before return null as it's not a valid path
   // if the crucible has moved 3 times in the same space in a row the only option
}
