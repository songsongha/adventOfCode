// Problem 1: What is the lowest location number that corresponds to any of the initial seed numbers

const fs = require('fs')

// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n')
console.log({puzzleData})

const regex = /\d+/g

let nullCounter = 0
let mapArray = new Array(8)

puzzleData.forEach((line)=>{
    const match = line.match(regex)
    if (!match){
        nullCounter++
    } else {
        const mapIndex = nullCounter/2
        if (!mapArray[mapIndex]) {
            mapArray[mapIndex] = []
        }
       mapArray[mapIndex].push(match)
    }
})

// const seeds = []
// const seedToSoil = []
// const soilToFertilizer = []
// const fertilizerToWater = []
// const waterToLight = []
// const lightToTemp = []
// const tempToHumidity = []
// const humidityToLocation = []
