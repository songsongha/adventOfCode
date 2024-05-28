// Problem 1: Find ASCII value, calculate formula and sum up values
// Problem 2: 

const fs = require('fs')

// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split(',')
console.log({puzzleData})
let sum = 0
puzzleData.forEach(str=>{
    let hashValue = 0
    for (let i = 0; i < str.length; i++){
        const asciiValue = str.charCodeAt(i)
        hashValue = ((hashValue + asciiValue) * 17) % 256
    }
    console.log({hashValue})
    sum += hashValue
})
console.log({sum})
