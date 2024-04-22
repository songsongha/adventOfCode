// Problem 1: Find the extrapolated value and sum them
const fs = require('fs')

// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n')

const calculateExtrapolatedValue = (stringOfNumbers) => {
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

    let extrapolatedValue = 0
    for (let i = historyArray.length -1; i >= 0; i--){
        extrapolatedValue += historyArray[i].pop()
    }
    return extrapolatedValue

}

let sumOfExtrapolatedValues = 0
puzzleData.forEach(line => {
    sumOfExtrapolatedValues += calculateExtrapolatedValue(line)
})

console.log({sumOfExtrapolatedValues})

