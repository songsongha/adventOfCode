// Problem 1: Find number of points based on winning numbers
// Problem 2: How many scratch cards to do you have if you get a copy for every winning number?

const fs = require('fs')

// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n')

let sum = 0
const arrayOfWins = []

puzzleData.forEach((line)=>{
    const numbers = line.split(': ').pop().split(' | ')
    const winningNumbers = numbers[0].match(/\d+/g)
    const ticketNumbers = numbers[1].match(/\d+/g)
    const intersection = winningNumbers.filter(position => ticketNumbers.includes(position))
    arrayOfWins.push(intersection)
    if (intersection.length){
        const points = 2**(intersection.length - 1)
        sum += points
    } 
})

const cardCount = new Array (arrayOfWins.length).fill(1)

arrayOfWins.forEach((intersection, index) =>{
    for (let j = 0; j < cardCount[index]; j++){
        for (let i = 0; i < intersection.length; i++){
            cardCount[index+i+1] +=1
        }
    }
})
const totalNumCards = cardCount.reduce((acc, curr) => acc + curr, 0)

console.log({sum})
console.log({totalNumCards})





