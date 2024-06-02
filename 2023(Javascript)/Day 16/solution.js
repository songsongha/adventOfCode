// Problem 1: Find number of energized tiles
// Problem 2: Find max value of energized tiles

const fs = require('fs')

// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n')
// console.log({puzzleData})

// energizedTilesMap will be a map with string keys describing position and a set describing direction
const energizedTilesMap = new Map()
const followlightPath = (direction, position, energizedTilesMap) => {
    // direction where the beam of light is coming from, L, R, U, D
    // this helps us know if we've travelled this path before
    // position is a string seprated by a comma describing row and col
    const [row, col] = position.split(',').map(str=> Number(str))
    if (row >= puzzleData.length || row < 0 || col >= puzzleData[0].length || col < 0) return null

    const contraption = puzzleData[row][col]
    if (energizedTilesMap.get(position)?.has(direction)) {
        // we've been here before coming from the same direction, no need to continue
        return null
    } else if (!energizedTilesMap.get(position)) {
        // we've never been to this spot before
        energizedTilesMap.set(position, new Set(direction))
    } else {
        // we've been to this spot but not from this direction
        energizedTilesMap.get(position).add(direction)
    }

    let newPosition = ''
    let newPosition2 = ''
    let newDirection = ''
    let newDirection2 = ''

switch (direction){
    case 'L':
        switch(contraption){
            case '/':
                newPosition = `${row -1},${col}`
                newDirection = 'D'
                break
            case '\\':
                newPosition = `${row +1},${col}`
                newDirection = 'U'
                break
            case '|':
                newPosition = `${row -1},${col}`
                newDirection = 'D'
                newPosition2 = `${row +1},${col}`
                newDirection2 = 'U'
                break
            case '-':
            case '.':
                newPosition = `${row},${col + 1}`
                newDirection = direction
                break
        }
        break
    case 'R':
        switch(contraption){
            case '/':
                newPosition = `${row +1},${col}`
                newDirection = 'U'
                break
            case '\\':
                newPosition = `${row -1},${col}`
                newDirection = 'D'
                break
            case '|':
                newPosition = `${row -1},${col}`
                newDirection = 'D'
                newPosition2 = `${row +1},${col}`
                newDirection2 = 'U'
                break
            case '-':
            case '.':
                newPosition = `${row},${col - 1}`
                newDirection = direction
                break
        }
        break
    case 'U':
        switch(contraption){
            case '/':
                newPosition = `${row},${col -1}`
                newDirection = 'R'
                break
            case '\\':
                newPosition = `${row},${col + 1}`
                newDirection = 'L'
                break
            case '-':
                newPosition = `${row},${col -1}`
                newDirection = 'R'
                newPosition2 = `${row},${col + 1}`
                newDirection2 = 'L'
                break
            case '|':
            case '.':
                newPosition = `${row +1},${col}`
                newDirection = direction
                break
        }
        break
    case 'D':
        switch(contraption){
            case '/':
                newPosition = `${row},${col + 1}`
                newDirection = 'L'
                break
            case '\\':
                newPosition = `${row},${col -1}`
                newDirection = 'R'
                break
            case '-':
                newPosition = `${row},${col -1}`
                newDirection = 'R'
                newPosition2 = `${row},${col + 1}`
                newDirection2 = 'L'
                break
            case '|':
            case '.':
                newPosition = `${row -1},${col}`
                newDirection = direction
                break
        }
        break
}

followlightPath(newDirection, newPosition, energizedTilesMap)
if (newDirection2 && newPosition2) followlightPath(newDirection2, newPosition2, energizedTilesMap)
return
}
followlightPath('L', '0,0', energizedTilesMap )

console.log(energizedTilesMap.size)

// Part 2
let max = 0
const energizedTilesMap2 = new Map()

for (let rowIndex =  0; rowIndex < puzzleData.length; rowIndex++){
    const energizedTilesMap2 = new Map()
    const position = `${rowIndex},0`
    followlightPath('L', position, energizedTilesMap2 )
    if (energizedTilesMap2.size > max) max = energizedTilesMap2.size
}
for (let rowIndex =  0; rowIndex < puzzleData.length; rowIndex++){
    const energizedTilesMap2 = new Map()
    const position = `${rowIndex},${puzzleData.length -1}`
    followlightPath('R', position, energizedTilesMap2 )
    if (energizedTilesMap2.size > max) max = energizedTilesMap2.size
}
for (let colIndex =  0; colIndex < puzzleData.length; colIndex++){
    const energizedTilesMap2 = new Map()
    const position = `0,${colIndex}`
    followlightPath('U', position, energizedTilesMap2 )
    if (energizedTilesMap2.size > max) max = energizedTilesMap2.size
}

for (let colIndex =  0; colIndex < puzzleData.length; colIndex++){
    const energizedTilesMap2 = new Map()
    const position = `${puzzleData[0].length -1},${colIndex}`
    followlightPath('D', position, energizedTilesMap2 )
    if (energizedTilesMap2.size > max) max = energizedTilesMap2.size
}

console.log('final max', max)

