// Problem 1: 
const fs = require('fs')

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
    }
}
if (!nextPipe && southPoint[0] < puzzleData.length){
    const char = puzzleData[southPoint[0]][southPoint[1]]
    if (char === '|' || char === 'L'|| char === 'J') {
        nextPipe = char
        previousDirection = 'north'
        currentLocation = southPoint
    }
}
if (!nextPipe && eastPoint[0] < puzzleData[0].length){
    const char = puzzleData[eastPoint[0]][eastPoint[1]]
    if (char === '-' || char === 'J' || char === '7') {
        nextPipe = char
        previousDirection = 'west'
        currentLocation = eastPoint
    }
}
if (!nextPipe && westPoint[0] >= 0 ){
    const char = puzzleData[westPoint[0]][westPoint[1]]
    if (char === '-' || char === 'L' || char === 'F') {
        nextPipe = char
        previousDirection = 'east'
        currentLocation = westPoint
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
            break
        case 'south':
            nextPipe = puzzleData[currentLocation[0]+1][currentLocation[1]]
            currentLocation = [currentLocation[0]+1 , currentLocation[1]]
            previousDirection = 'north'
            break
        case 'east':
            nextPipe = puzzleData[currentLocation[0]][currentLocation[1]+1]
            currentLocation = [currentLocation[0], currentLocation[1]+1]
            previousDirection = 'west'
            break
        case 'west':
            nextPipe = puzzleData[currentLocation[0]][currentLocation[1]-1]
            currentLocation = [currentLocation[0], currentLocation[1]-1]
            previousDirection = 'east'
            break
    }
console.log({nextPipe})
console.log({currentLocation})
}
console.log({pathCounter})
const furthestStep = pathCounter/2
console.log({furthestStep})
