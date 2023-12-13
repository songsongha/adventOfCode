// Problem 1: What is the lowest location number that corresponds to any of the initial seed numbers

const fs = require('fs')

// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n')
console.log({puzzleData})

const regex = /\d+/g

const raceData = puzzleData.map (line =>{
return line.match(regex).map(str => Number(str))
})

const raceDuration = raceData[0]
const recordDistance = raceData[1]

const waysToWinArray = []
raceDuration.forEach((duration, index) =>{
    let waysToWin = 0
    for (let i = 1; i <= duration; i++) {
        const distanceTravelled = i * (duration - i)
        if (distanceTravelled > recordDistance[index]) waysToWin++
    }
    waysToWinArray.push(waysToWin)
})

const p1Solution = waysToWinArray.reduce((acc, curr) => acc * curr, 1)
console.log({p1Solution})