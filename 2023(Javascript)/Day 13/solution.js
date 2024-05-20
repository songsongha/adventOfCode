// Problem 1: Find where the mirrors are, add up the number of columns to the left of each vertical line of reflection and add 100xnumber of rows abovev each horizontal line fo relction.
// Problem 2: 

const fs = require('fs')


// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n\n').map(line => line.split('\n'))
console.log({puzzleData})
puzzleData.forEach(pattern => {
    // check for vertical mirror 
    let mirrorIndex = null
    for (let colIndex = 0; colIndex < pattern[0].length -1; colIndex++){
        for (let rowIndex = 0; rowIndex < pattern.length -1; rowIndex++){
            if (pattern[rowIndex][colIndex] === pattern[rowIndex][colIndex+1]) {
                console.log({colIndex})
                console.log({rowIndex})
                if(rowIndex === pattern.length -1){
                    // this is the last row so everything before is also mirror
                    // check all of the columns out of this axis til you reach an end
                    // create function for this check
                    mirrorIndex = colIndex
                }
            } else {
                // move on to the next column
                break
            }
        }
        if (mirrorIndex !== null) break
    }
    console.log(mirrorIndex)
        
})