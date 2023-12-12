// Problem 1: What is the lowest location number that corresponds to any of the initial seed numbers

const fs = require('fs')

// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n')
console.log({puzzleData})

const regex = /\d+/g

let nullCounter = 0
const mapArray = new Array(8)
const locationArray = []

puzzleData.forEach((line)=>{
    const match = line.match(regex)
    if (!match){
        nullCounter++
    } else {
        const mapIndex = nullCounter/2
        if (!mapArray[mapIndex]) {
            mapArray[mapIndex] = []
        } 
       mapArray[mapIndex].push(match.map(str => Number(str)))
    }
})

// for each seed
mapArray[0][0].forEach(seed => {
    // find corresponding soil -> location
    let refSource = seed
    for(let i = 1; i < mapArray.length; i++){
        for(let j = 0; j < mapArray[i].length; j++){
            const source = mapArray[i][j][1]
            const destination = mapArray[i][j][0]
            const range = mapArray[i][j][2]
            if (refSource >= source && refSource <= source + range) {
                // refSource falls in the range
                refSource = destination + refSource - source
                break
            } // otherwise refSource should remain the same
        }

        // if we are on location
        if (i === mapArray.length -1) {
            locationArray.push(refSource)
        }
        
    }

})

console.log({locationArray})
console.log('Minimum value', Math.min(...locationArray))

// Problem 2 Brute Force method

let minLocation
// for each seed
for(let k = 0; k < mapArray[0][0].length -1; k = k+2){
    const seedStart = mapArray[0][0][k]
    const seedRange = mapArray[0][0][k+1]
    for(let seed = seedStart; seed <= seedStart + seedRange; seed++){
        let refSource = seed
        for(let i = 1; i < mapArray.length; i++){
            for(let j = 0; j < mapArray[i].length; j++){
                const source = mapArray[i][j][1]
                const destination = mapArray[i][j][0]
                const range = mapArray[i][j][2]
                if (refSource >= source && refSource <= source + range) {
                    // refSource falls in the range
                    refSource = destination + refSource - source
                    break
                } // otherwise refSource should remain the same
            }
    
            // if we are on location
            if (i === mapArray.length -1) {
                if (!minLocation || minLocation > refSource){
                    minLocation = refSource
                }
            }
            
        }
    }
}
console.log({minLocation})