// Problem 1: Multiply number of ways to win for given race data

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

// Problem 2: Number of ways to win if spaces are removed from data?
const raceData2 = puzzleData.map (line =>{
    return Number(line.match(regex).reduce((acc, curr) => acc + curr))
    })

const raceDuration2 = raceData2[0]
const recordDistance2 = raceData2[1]

let waysToWin = 0
    for (let i = 1; i <= raceDuration2; i++) {
        const distanceTravelled = i * (raceDuration2 - i)
        if (distanceTravelled > recordDistance2) waysToWin++
    }

console.log({waysToWin})
