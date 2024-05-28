// Problem 1: Roll all the rocks north then calculate load
// Problem 2: 

const fs = require('fs')

// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n')
console.log({puzzleData})

const bolderTracker = new Array(puzzleData.length).fill(0)
console.log({bolderTracker})
let blockageTracker = new Array(puzzleData[0].length).fill(0)
puzzleData.forEach((line, row) => {
    for(let i = 0; i < line.length; i++){
        if (line[i] === 'O') {
            bolderTracker[blockageTracker[i]]++
            blockageTracker[i]++
        } else if (line[i] === '#'){
            blockageTracker[i] = row + 1
        }
    }
})
console.log({bolderTracker})
let totalLoad = 0
for (let i = 0; i < bolderTracker.length ; i++){
    const distanceFromSouth = bolderTracker.length - i
    totalLoad += distanceFromSouth * bolderTracker[i]
}
console.log({totalLoad})