// Problem 1: Find values of numbers that are adjacent/diagonal to a symbol

const fs = require('fs')

// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n')
const isDigitRegex = /\d+/g
const isSymbolRegex = /[^0-9.]/g
let sum = 0

const listOfNumbers = puzzleData.map((line)=>{
   return [...line.matchAll(isDigitRegex)]
})
const listOfSymbols = puzzleData.map((line)=>{
    return [...line.matchAll(isSymbolRegex)]
})

const getNumPositionArray = (entry) => {
        const numPositions = [entry.index]
        while (numPositions.length < entry[0].length){
            numPositions.push(entry.index + numPositions.length)
        }
        return numPositions
}
const getSymbolPositionArray = (entry) => {
    return [entry.index -1, entry.index, entry.index + 1]
}

const isAdjacent = (numberEntry, symbolEntry)=>{
    const numberPositions = getNumPositionArray(numberEntry)
    const symbolPositions = getSymbolPositionArray(symbolEntry)
    const intersection = numberPositions.filter(position => symbolPositions.includes(position))
    return Boolean(intersection.length)
}

listOfSymbols.forEach((row, rowIndex)=>{
    row.forEach((symbolEntry) => {
        // check list of Numbers to see if there is a number adjacent to the position
        // check row above
        if (rowIndex > 0){
            listOfNumbers[rowIndex-1].forEach(numberEntry=>{
                if (isAdjacent(numberEntry, symbolEntry)){
                    sum+= Number(numberEntry[0])

                }
            })
        }
        // check same row
            listOfNumbers[rowIndex].forEach(numberEntry=>{
                if (isAdjacent(numberEntry, symbolEntry)){
                    sum+= Number(numberEntry[0])

                }
            })
        // check row below
        if (rowIndex < listOfSymbols.length -1){
            listOfNumbers[rowIndex+1].forEach(numberEntry=>{
                if (isAdjacent(numberEntry, symbolEntry)){
                    sum+= Number(numberEntry[0])

                }
            })
        }
    })
})

console.log({sum})

// Problem 2: Find all the * adjacent to two numbers, multiply the two numbers, and sum the total.
let gearRatioSum = 0
const isGearRegex = /\*/g


const listOfGears = puzzleData.map((line)=>{
   return [...line.matchAll(isGearRegex)]
})
const gearObject = {}

listOfGears.forEach((row, rowIndex)=>{
    row.forEach((gearEntry) => {
        const gearId = `gear-row${rowIndex}col${gearEntry.index}`
        
        if (!gearObject[gearId]) gearObject[gearId] = []
        // check row above
        if (rowIndex > 0){
            listOfNumbers[rowIndex-1].forEach(numberEntry=>{
                if (isAdjacent(numberEntry, gearEntry)){
                    gearObject[gearId].push(numberEntry[0])
                }
            })
        }
        // check same row
            listOfNumbers[rowIndex].forEach(numberEntry=>{
                if (isAdjacent(numberEntry, gearEntry)){
                    gearObject[gearId].push(numberEntry[0])
                }
            })
        // check row below
        if (rowIndex < listOfSymbols.length -1){
            listOfNumbers[rowIndex+1].forEach(numberEntry=>{
                if (isAdjacent(numberEntry, gearEntry)){
                    gearObject[gearId].push(numberEntry[0])
                }
            })
        }
    })
})

for (key in gearObject) {
    if (gearObject[key].length === 2){
        const gearRatio = gearObject[key][0] * gearObject[key][1]
        gearRatioSum += gearRatio
    }
}

console.log({gearRatioSum})