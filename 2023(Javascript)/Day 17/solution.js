// Problem 1: Find minimum newHeatLoss of heat loss
// Problem 2: 

const fs = require('fs')

const DIRECTION_LIMIT = 3

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
    const [minX,minY] = min[0].split(',')
    if (puzzleData[minX][minY] === null) return null
    return min[0];
  }
// starting in lefthand corner
const queue = [[0,0]]
const heatMap = new Map()
const data = {
    heatLoss: puzzleData[0][0],
    direction: null,
    directionCount: 0,
    prevNode: null
}
heatMap.set('0,0', data ) 

function setHeatMapData(newHeatLoss, location, direction, prevNode) {
    const prevDirection = heatMap.get(location)?.direction
    const prevDirectionCount = heatMap.get(location)?.directionCount || 0
    console.log({location})
    console.log({prevDirection})
    console.log({direction})
    console.log(prevDirection === direction)

        const value = {
            heatLoss: newHeatLoss,
            direction,
            directionCount: (prevDirection === direction ? prevDirectionCount + 1 : 1),
            prevNode
        }
        heatMap.set(location, value)

}

while (queue.length > 0) {
    const location = queue.shift().map(str => Number(str))
    const [row, col] = location
    const originalLocation = `${row},${col}`
    const minCumulativeHeatLossAtLocation = heatMap.get(originalLocation).heatLoss
    const direction = heatMap.get(originalLocation).direction
    const directionCount = heatMap.get(originalLocation).directionCount
console.log({originalLocation})
    // check adjacent squares 
    if (row + 1 < puzzleData.length && (directionCount < DIRECTION_LIMIT || direction !== 'down') ){
        const location = `${row + 1},${col}`
        console.log('down adjacent location', location)
        const newHeatLoss = puzzleData[row + 1][col] + minCumulativeHeatLossAtLocation
        const prevValue = heatMap.get(location)?.heatLoss

        if (!prevValue || newHeatLoss < prevValue) {
            console.log('there was no prev value or new heatloss is less!. prevValue', prevValue,"newHeatLoss", newHeatLoss)
            setHeatMapData(newHeatLoss, location, 'down', originalLocation )
        }
    }
    if (row - 1 >= 0 && (directionCount < DIRECTION_LIMIT || direction !== 'up')){
        const location = `${row - 1},${col}`
        console.log('up adjacent location', location)
        const newHeatLoss = puzzleData[row - 1][col] + minCumulativeHeatLossAtLocation
        const prevValue = heatMap.get(location)?.heatLoss

        if (!prevValue || newHeatLoss < prevValue) {
            console.log('there was no prev value or new heatloss is less!. prevValue', prevValue,"newHeatLoss", newHeatLoss)
            setHeatMapData(newHeatLoss, location, 'up', originalLocation)
        }
    }
    if (col + 1 < puzzleData[0].length && (directionCount < DIRECTION_LIMIT || direction !== 'right')){
        const location = `${row},${col+1}`
        console.log('right adjacent location', location)
        const newHeatLoss = puzzleData[row][col+1] + minCumulativeHeatLossAtLocation
        const prevValue = heatMap.get(location)?.heatLoss

        if (!prevValue || newHeatLoss < prevValue) {
            console.log('there was no prev value or new heatloss is less!. prevValue', prevValue,"newHeatLoss", newHeatLoss)
            setHeatMapData(newHeatLoss, location, 'right', originalLocation)
        }
    }
    if (col - 1 >= 0 && (directionCount < DIRECTION_LIMIT || direction !== 'left')){
        const location = `${row},${col-1}`
        console.log('left', location)
        const newHeatLoss = puzzleData[row][col-1] + minCumulativeHeatLossAtLocation
        const prevValue = heatMap.get(location)?.heatLoss

        if (!prevValue || newHeatLoss < prevValue) {
            console.log('there was no prev value or new heatloss is less!. prevValue', prevValue,"newHeatLoss", newHeatLoss)
            setHeatMapData(newHeatLoss, location, 'left', originalLocation)
        }
    }
    puzzleData[row][col] = null

    const nextNode = getMinOfMap(heatMap)
    if(nextNode === null) break
    queue.push(nextNode.split(','))

    
}
const endLocation = `${puzzleData.length -1},${puzzleData[0].length-1}`
console.log({endLocation})

let currHeatNode = heatMap.get(`${puzzleData.length -1},${puzzleData[0].length-1}`)
while (currHeatNode.prevNode !== null){
    console.log('prevNode', currHeatNode.prevNode, currHeatNode.heatLoss)
    console.log('direction', currHeatNode.direction, currHeatNode.directionCount)
    currHeatNode = heatMap.get(currHeatNode.prevNode)
}

// console.log(heatMap.get(`${puzzleData.length -1},${puzzleData[0].length-1}`))