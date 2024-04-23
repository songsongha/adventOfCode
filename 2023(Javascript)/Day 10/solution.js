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

// look at all the adjacent squares for connecting pipes

// follow the paths until they get back to the S or have no connecting pipes or loop that closes
s