// Problem 1: Find values of numbers that are adjacent/diagonal to a symbol

const fs = require('fs')

// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n')

let sum = 0
puzzleData.forEach((line)=>{
    const numbers = line.split(': ').pop().split(' | ')
    const winningNumbers = numbers[0].match(/\d+/g)
    const ticketNumbers = numbers[1].match(/\d+/g)
    const intersection = winningNumbers.filter(position => ticketNumbers.includes(position))
    
    if (intersection.length){
        const points = 2**(intersection.length - 1)
        sum += points
    } 
})

console.log({sum})

