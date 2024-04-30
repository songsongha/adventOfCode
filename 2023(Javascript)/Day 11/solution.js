// Problem 1: Find the sum of the lengths of the shortest path between every pair of galaxies
const fs = require('fs')

// put inputs from text file into an array
// find the S
let startLocation = []
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n').map((line) => {
    return line.split('')
})

console.log({puzzleData})

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
console.log({isRowExpandedArray})
console.log({isColExpandedArray})
console.log({galaxyLocations})

// find the length of the pairs ==> difference between y values and x values
let sumOfLengths = 0
galaxyLocations.forEach((coord, index) =>{
    // find distance between each galaxy that is in front of it
    for (let pairIndex = index + 1; pairIndex < galaxyLocations.length; pairIndex++){
        const x1 = coord[0]
        const y1 = coord[1]
        const x2 = galaxyLocations[pairIndex][0]
        const y2 = galaxyLocations[pairIndex][1]
        let shortestLength = Math.abs(y2-y1) + Math.abs(x2-x1)
        // check expanded rows
        for (let i = x1 +1 ; i < x2; i++){
            if (isRowExpandedArray[i]) shortestLength++
        }
        // check expanded cols
        const largerY = y2 > y1 ? y2 : y1
        const smallerY = y2 > y1 ? y1: y2

        for (let i = smallerY +1 ; i < largerY; i++){
            if (isColExpandedArray[i]) shortestLength++
        }
        console.log({shortestLength})
        sumOfLengths +=shortestLength
    }
})
console.log({sumOfLengths})