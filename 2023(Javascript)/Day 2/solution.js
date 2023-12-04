// Problem 1: Find games that are valid with 12 red cubes, 13 green cubes, and 14 blue cubes and sum the game ids
// Problem 2: Find minimum  number of cubes for each game, multiply the number of die for each game then add them together.

const fs = require('fs')

// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n')
const regex = /(\d+) (red|blue|green|:)/g
let sum = 0

puzzleData.forEach((game, gameIndex)=>{
    const match = game.match(regex)
    const isValid = match.every((result)=>{
        const splitResult = result.split(' ')
        if (splitResult[1].includes('red') && Number(splitResult[0]) > 12 
        || splitResult[1].includes('green') && Number(splitResult[0]) > 13 
        || splitResult[1].includes('blue') && Number(splitResult[0]) > 14) {
            return false
        }
        return true
        
    })
    if (isValid) {
        const gameId = gameIndex + 1
        sum += gameId
    }
})
console.log({sum})

let powerSum = 0

puzzleData.forEach((game)=>{
    let minRed = 0
    let minGreen = 0
    let minBlue = 0

    const match = game.match(regex)
    match.forEach((result)=>{
        const splitResult = result.split(' ')
        const diceCount = Number(splitResult[0])
        if (splitResult[1].includes('red') && diceCount > minRed) minRed = diceCount
        if (splitResult[1].includes('green') && diceCount > minGreen) minGreen = diceCount
        if (splitResult[1].includes('blue') && diceCount > minBlue) minBlue = diceCount
    })

    const power = minRed * minGreen * minBlue
    powerSum += power
})

console.log({powerSum})