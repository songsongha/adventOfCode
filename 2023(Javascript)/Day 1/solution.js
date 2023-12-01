// Problem 1: Find first and last digits in each input line, combine to make anew number, then add all together to get solution.

const fs = require('fs')

// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n')

const findSumOfFirstAndLastDigits = (puzzleData) => {

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
    return sum
}

console.log(findSumOfFirstAndLastDigits(puzzleData)) // 55130

// some entries have overlapping letters i.e. xtwone3four numbers so the we need to put the letters back in so ensure all numbers are placed
const wordToNumberMap = {
    one: 'one1one',
    two: 'two2two',
    three: 'three3three',
    four: 'four4four',
    five: 'five5five',
    six: 'six6six',
    seven: 'seven7seven',
    eight: 'eight8eight',
    nine: 'nine9nine'
}
const wordsReplacedWithNumberArray = puzzleData.map((line)=>{
    let newLine = line
    for (const key in wordToNumberMap){
        newLine = newLine.replaceAll(key,wordToNumberMap[key])
    }
    return newLine
})

console.log (findSumOfFirstAndLastDigits(wordsReplacedWithNumberArray)) // 54985
