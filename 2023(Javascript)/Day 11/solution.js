// Problem 1: Find the sum of the lengths of the shortest path between every pair of galaxies
// Problem 2: What if rows were expanded?
const fs = require('fs')

// put inputs from text file into an array

const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n').map((line) => {
    return line.split('')
})

// expand the universe => check if the row is all dots, check if all columns are dots
const isRowExpandedArray = new Array(puzzleData.length).fill(true)
const isColExpandedArray = new Array(puzzleData[0].length).fill(true)
const galaxyLocations = []

for (let rowIndex = 0; rowIndex < puzzleData.length; rowIndex++){
    if (!puzzleData[rowIndex].every(entry => entry === '.')){
        isRowExpandedArray[rowIndex] = false
        for (let colIndex = 0; colIndex < puzzleData[0].length; colIndex++){
            if (puzzleData[rowIndex][colIndex] === '#'){
                isColExpandedArray[colIndex] = false
                galaxyLocations.push([rowIndex,colIndex])
            } 
        }
    }
}

// find the length of the pairs ==> difference between y values and x values
let sumOfLengths = 0
let sumOfLengths2 = 0
galaxyLocations.forEach((coord, index) =>{
    // find distance between each galaxy that is in front of it
    for (let pairIndex = index + 1; pairIndex < galaxyLocations.length; pairIndex++){
        const x1 = coord[0]
        const y1 = coord[1]
        const x2 = galaxyLocations[pairIndex][0]
        const y2 = galaxyLocations[pairIndex][1]
        let shortestLength = Math.abs(y2-y1) + Math.abs(x2-x1)
        let shortestLength2 = Math.abs(y2-y1) + Math.abs(x2-x1)
        // check expanded rows
        for (let i = x1 +1 ; i < x2; i++){
            if (isRowExpandedArray[i]) {
                shortestLength++
                shortestLength2 += (1000000 -1)
            }
        }
        // check expanded cols
        const largerY = y2 > y1 ? y2 : y1
        const smallerY = y2 > y1 ? y1: y2

        for (let i = smallerY +1 ; i < largerY; i++){
            if (isColExpandedArray[i]) {
                shortestLength++
                shortestLength2 += (1000000 - 1)
            }
        }
        sumOfLengths +=shortestLength
        sumOfLengths2 += shortestLength2
    }
})
console.log({sumOfLengths})
console.log({sumOfLengths2})