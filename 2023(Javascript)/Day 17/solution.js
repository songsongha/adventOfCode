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
    if (row === puzzleData.length -1 && col === puzzleData[0].length -1) break
    puzzleData[row][col] = null
    // check adjacent squares 
    if (row + 1 < puzzleData.length){
        const below = puzzleData[row + 1][col]
        heatMap.set(`${row + 1},${col}`, below)
    }
    if (row - 1 >= 0){
        const above = puzzleData[row - 1][col]
        heatMap.set(`${row - 1},${col}`, above)
    }
    if (col + 1 < puzzleData[0].length){
        const right = puzzleData[row][col+1]
        heatMap.set(`${row},${col+1}`, right)
    }
    if (col - 1 >= 0){
        const left = puzzleData[row][col-1]
        heatMap.set(`${row},${col-1}}`, left)
    }
console.log({initialHeatLoss})
const nextNode = getMinOfMap(heatMap).split(',')
queue.push(nextNode)
    
}

clumsyCrucible(0,0)