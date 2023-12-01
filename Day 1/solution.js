// Problem 1: Find first and last digits in each input line, combine to make anew number, then add all together to get solution.

const fs = require('fs')

// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n')

const numberArray = puzzleData.map((line)=>{ 
    const digitsOnly = line.match(/\d/g)
    if (digitsOnly?.length){
        // return first and last digits or double up if there's only 1 digit
        return Number (digitsOnly[0] + digitsOnly[digitsOnly.length-1])
    }
    else {
        return Number(0)
    }
})

const sum = numberArray.reduce((acc, curr) => acc + curr, 0)

console.log({sum})