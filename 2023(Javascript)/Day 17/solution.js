// Problem 1: Find minimum value of heat loss
// Problem 2: 

const fs = require('fs')

// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n').map(str => str.split('').map(Number))
console.log({puzzleData})

function getMinOfMap(map) {
    const min = Array.from(map).reduce((min,curr)=> {
        const [minX,minY] = min[0].split(',')
        const [x,y] = curr[0].split(',')
        if (puzzleData[minX][minY] === null) return curr
        return curr[1] < min[1] && puzzleData[x][y] !== null ? curr : min
    })
    // returns location of minimum map that hasn't been visited
    console.log({min})
    const [minX,minY] = min[0].split(',')
    console.log('puzzleData[minX][minY]', puzzleData[minX][minY])
    if (puzzleData[minX][minY] === null) return null
    return min[0];
  }
// starting in lefthand corner
const queue = [[0,0]]
const heatMap = new Map()

heatMap.set('0,0', puzzleData[0][0]) 
while (queue.length > 0) {
    const location = queue.shift().map(str => Number(str))
    const [row, col] = location
    console.log({row})
    console.log({col})
    const minCumulativeHeatLossAtLocation = heatMap.get(`${row},${col}`)
    // check adjacent squares 
    if (row + 1 < puzzleData.length){
        const location = `${row + 1},${col}`
        const value = puzzleData[row + 1][col] + minCumulativeHeatLossAtLocation
        const prevValue = heatMap.get(location)
        if (!prevValue || value < prevValue) heatMap.set(location, value)
    }
    if (row - 1 >= 0){
        const location = `${row - 1},${col}`
        const value = puzzleData[row - 1][col] + minCumulativeHeatLossAtLocation
        const prevValue = heatMap.get(location)
        if (!prevValue || value < prevValue) heatMap.set(location, value)
    }
    if (col + 1 < puzzleData[0].length){
        const location = `${row},${col+1}`
        const value = puzzleData[row][col+1] + minCumulativeHeatLossAtLocation
        const prevValue = heatMap.get(location)
        if (!prevValue || value < prevValue) heatMap.set(location, value)
    }
    if (col - 1 >= 0){
        const location = `${row},${col-1}`
        const value = puzzleData[row][col-1] + minCumulativeHeatLossAtLocation
        const prevValue = heatMap.get(location)
        if (!prevValue || value < prevValue) heatMap.set(location, value)
    }
    puzzleData[row][col] = null
    const nextNode = getMinOfMap(heatMap)
    if(nextNode === null) break
    queue.push(nextNode.split(','))

    
}

console.log(heatMap.get(`${puzzleData.length -1},${puzzleData[0].length-1}`))