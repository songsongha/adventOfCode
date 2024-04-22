// Problem 1: Find the extrapolated value and sum them
const fs = require('fs')

// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n')

const calculateHistory = (stringOfNumbers)=>{
    const arrayOfNumbers = stringOfNumbers.split(' ').map(stringNum=>Number(stringNum))
    const historyArray = [arrayOfNumbers]
    let history = [...arrayOfNumbers]

    while (!history.every(element => element === 0)){
        const nextHistory = []
        for (let i = 0; i < history.length - 1; i++){
            const diff = history[i+1] - history[i]
            nextHistory.push(diff)
        }
        historyArray.push(nextHistory)
        history = [...nextHistory]
    }
    return historyArray
}
const calculateExtrapolatedValue = (stringOfNumbers) => {
    const historyArray = calculateHistory(stringOfNumbers)
    let extrapolatedValue = 0
    for (let i = historyArray.length -1; i >= 0; i--){
        extrapolatedValue += historyArray[i].pop()
    }
    return extrapolatedValue
}

const calculateExtrapolatedValue2 = (stringOfNumbers) => {
    const historyArray = calculateHistory(stringOfNumbers)
    let extrapolatedValue = 0
    for (let i = historyArray.length -1; i >= 0; i--){
        extrapolatedValue = historyArray[i].shift() - extrapolatedValue
    }
    return extrapolatedValue

}

let sumOfExtrapolatedValuesPart1 = 0
puzzleData.forEach(line => {
    sumOfExtrapolatedValuesPart1 += calculateExtrapolatedValue(line)
})
let sumOfExtrapolatedValuesPart2 = 0
puzzleData.forEach(line => {
    sumOfExtrapolatedValuesPart2 += calculateExtrapolatedValue2(line)
})

console.log({sumOfExtrapolatedValuesPart1})
console.log({sumOfExtrapolatedValuesPart2})



