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
                    console.log(numberEntry[0], 'is next to a symbol')
                    sum+= Number(numberEntry[0])
                    // remove entry to prevent double counting
                }
            })
        }
        // check same row
            listOfNumbers[rowIndex].forEach(numberEntry=>{
                if (isAdjacent(numberEntry, symbolEntry)){
                    console.log(numberEntry[0], 'is next to a symbol')
                    sum+= Number(numberEntry[0])
                    // remove entry to prevent double counting
                }
            })
        // check row below
        if (rowIndex < listOfSymbols.length -1){
            listOfNumbers[rowIndex+1].forEach(numberEntry=>{
                if (isAdjacent(numberEntry, symbolEntry)){
                    console.log(numberEntry[0], 'is next to a symbol')
                    sum+= Number(numberEntry[0])
                    // remove entry to prevent double counting
                }
            })
        }
    })
})

console.log({sum})

