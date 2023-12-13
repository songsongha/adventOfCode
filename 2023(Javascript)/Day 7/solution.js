// Problem 1: Find the rank of every hand in your set, what are the total winnings?

const fs = require('fs')

// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n')
console.log({puzzleData})

const handRegex = /[\w]{5}/
const bidRegex = /\s\d+/

const handData = puzzleData.map(line =>{
    return line.match(handRegex)[0]
    })
console.log({handData})

const bidData = puzzleData.map (line =>{
    return Number(line.match(bidRegex))
    })

console.log({bidData})
