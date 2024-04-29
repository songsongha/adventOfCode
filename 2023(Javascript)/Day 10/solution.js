// Problem 1: Furthest step in the loop
// Problem 2: how many tiles are inside the loop?
// Ray casting method, count how many times it crossing the loop border, odd is inside, even is outside
const fs = require('fs')
const path = require('path')
const { start } = require('repl')

// put inputs from text file into an array
// find the S
let startLocation = []
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n').map((line,index) => {
    const lineArray = line.split('')
    if (lineArray.includes('S')){
        startLocation = [index, lineArray.indexOf('S')]
    }
    return line.split('')
})

console.log({puzzleData})
console.log({startLocation})

const charMap = {
    '|': ['north', 'south'],
    '-': ['east', 'west'],
    'L': ['north', 'east'],
    'J': ['north', 'west'],
    '7': ['south', 'west'],
    'F': ['south', 'east']
}
const isSameLocation = (point1, point2)=>{
 return point1[0] === point2[0] && point1[1] === point2[1]
}
const pathArray = [[...startLocation]]

console.log({pathArray})
// look at all the adjacent squares for connecting pipes
let currentLocation = [...startLocation]
    const row = currentLocation[0]
    const col = currentLocation[1]
   const northPoint = [row - 1, col]
    const southPoint = [row + 1, col]
    const eastPoint = [row, col + 1]
    const westPoint = [row, col -1]
    let nextPipe = ''
    let previousDirection = ''
    
if (northPoint[0] >= 0){
    const char = puzzleData[northPoint[0]][northPoint[1]]
    if (char === '|' || char === '7' || char === 'F') {
        nextPipe = char
        previousDirection = 'south'
        currentLocation = northPoint
        pathArray.push(northPoint)
    }
}
if (!nextPipe && southPoint[0] < puzzleData.length){
    const char = puzzleData[southPoint[0]][southPoint[1]]
    if (char === '|' || char === 'L'|| char === 'J') {
        nextPipe = char
        previousDirection = 'north'
        currentLocation = southPoint
        pathArray.push(southPoint)
    }
}
if (!nextPipe && eastPoint[0] < puzzleData[0].length){
    const char = puzzleData[eastPoint[0]][eastPoint[1]]
    if (char === '-' || char === 'J' || char === '7') {
        nextPipe = char
        previousDirection = 'west'
        currentLocation = eastPoint
        pathArray.push(eastPoint)
    }
}
if (!nextPipe && westPoint[0] >= 0 ){
    const char = puzzleData[westPoint[0]][westPoint[1]]
    if (char === '-' || char === 'L' || char === 'F') {
        nextPipe = char
        previousDirection = 'east'
        currentLocation = westPoint
        pathArray.push(westPoint)
    }
}
let pathCounter = 1

while (nextPipe !== 'S'){
    pathCounter ++
    const directionToCheck = charMap[nextPipe].find(dir => dir !== previousDirection)
    console.log({directionToCheck})
    switch (directionToCheck) {
        case 'north':
            nextPipe = puzzleData[currentLocation[0]-1][currentLocation[1]]
            currentLocation = [currentLocation[0]-1, currentLocation[1] ]
            previousDirection = 'south'
            pathArray.push(currentLocation)
            break
        case 'south':
            nextPipe = puzzleData[currentLocation[0]+1][currentLocation[1]]
            currentLocation = [currentLocation[0]+1 , currentLocation[1]]
            previousDirection = 'north'
            pathArray.push(currentLocation)
            break
        case 'east':
            nextPipe = puzzleData[currentLocation[0]][currentLocation[1]+1]
            currentLocation = [currentLocation[0], currentLocation[1]+1]
            previousDirection = 'west'
            pathArray.push(currentLocation)
            break
        case 'west':
            nextPipe = puzzleData[currentLocation[0]][currentLocation[1]-1]
            currentLocation = [currentLocation[0], currentLocation[1]-1]
            previousDirection = 'east'
            pathArray.push(currentLocation)
            break
    }
}

pathArray.pop() // remove the duplicate S location
console.log({pathArray})
console.log({pathCounter})
const furthestStep = pathCounter/2
console.log({furthestStep})
// if two pipes connecting into the start location are in the same row, replace the S in the puzzleData with a '-'
if (pathArray[1][0] === pathArray[pathArray.length-1][0]){
    puzzleData[startLocation[0]][startLocation[1]] = '-'
    console.log(puzzleData)
}
// loop over puzzle data and check to see if the ray cast is odd or even 
const isPointInPathArray = ( row, col ) =>{
    return pathArray.filter(coord => coord[0] === row && coord[1] === col).length
}
const isHoriztontalEdge = (row, col) =>{
    const char = puzzleData[row][col]
    if (isPointInPathArray(row, col)) {
        if (char === '-'){
            return true
        } else if ((char === 'L' || char === 'F') && puzzleData[row][col+1] === '-' ) {
            return true
        } else if ((char === 'J' || char === '7') && puzzleData[row][col-1] === '-'){
            return true
        } else {
            return false
        }
    } else {
        console.log('not in the bounday')
        return false
    }
}
let enclosedByLoopCount = 0
puzzleData.forEach((row, rowIndex) => {
    console.log({row})
    row.forEach((tile, colIndex) =>{
        // if the tile is part of the pipe no need to raycast
        // if (pathArray.filter(coord => coord[0] === rowIndex && coord[1] === colIndex).length){
        if (isPointInPathArray(rowIndex,colIndex)){
            console.log('tile is part of the loop')
        } else {
            // raycast check it if the tile the ray is on is a '-', if so don't count it as it's an edge
            let crossBoundaryCount = 0
            for(let rayCol = colIndex + 1; rayCol < puzzleData[0].length; rayCol++ ){
                if (isPointInPathArray(rowIndex, rayCol) && !isHoriztontalEdge(rowIndex,rayCol)){
                    crossBoundaryCount++
                }
            }
            console.log({crossBoundaryCount})
            if (crossBoundaryCount%2) {
                console.log('point is inside the loop')
                enclosedByLoopCount++
            } else {
                console.log('point is outside the loop')
            }
        }
    })
    console.log({enclosedByLoopCount})
})
