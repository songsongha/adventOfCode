// Problem 1: Roll all the rocks north then calculate load
// Problem 2: 

const fs = require('fs')

// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n')
console.log({puzzleData})

const bolderTracker = new Array(puzzleData[0].length).fill(0)
console.log({bolderTracker})

puzzleData.forEach(line=>{
    for(let i = 0; i < line.length; i++){
        if (line[i] === 'O') bolderTracker[i]++
    }
})
console.log({bolderTracker})
let totalLoad = 0
bolderTracker.forEach(colCount =>{
for (let i = 0; i < colCount ; i++){
    const distanceFromSouth = puzzleData.length - i
    totalLoad += distanceFromSouth 
}
})
console.log({totalLoad})