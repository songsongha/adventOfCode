// Problem 1: Find where the mirrors are, add up the number of columns to the left of each vertical line of reflection and add 100xnumber of rows abovev each horizontal line fo relction.
// Problem 2: 

const fs = require('fs')
const transpose = (arr) => {
    console.log({arr})
    const newStringArray = arr[0].split('')
    return newStringArray.map((col, i) => arr.map(row => row[i]).join(''))
} 
const checkMirrorLine = (index, pattern) => {
    console.log('check mirrorLine')
    for (let i = 1; (index + i + 1) < pattern[0].length && index - i >= 0; i++){
        const leftIndex = index - i
        const rightIndex = index + i + 1
        for (let rowIndex = 0; rowIndex < pattern.length; rowIndex++){
            if (pattern[rowIndex][leftIndex] !== pattern[rowIndex][rightIndex]) return false
        }
    }
    return true
}

const findVertMirrorIndex = (pattern) => {
    let mirrorIndex = null
    for (let colIndex = 0; colIndex < pattern[0].length -1; colIndex++){
        for (let rowIndex = 0; rowIndex < pattern.length -1; rowIndex++){
            if (pattern[rowIndex][colIndex] === pattern[rowIndex][colIndex+1]) {
                // console.log('matches')
                if(rowIndex === pattern.length -2){
                    console.log('last row')
                    // this is the last row so everything before is also mirror
                    // check all of the columns out of this axis til you reach an end
                    if (checkMirrorLine(colIndex,pattern)){
                        mirrorIndex = colIndex
                    } else {
                        break
                    }      
                }
            } else {
                // console.log('break')
                // move on to the next column
                break
            }
        }
        if (mirrorIndex !== null) break
    }
    console.log({mirrorIndex})
    return mirrorIndex
}

// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n\n').map(line => line.split('\n')).filter(item=>!!item)
console.log({puzzleData})
let sum = 0
puzzleData.forEach(pattern => {
    // check for vertical mirror 
    const vertMirrorIndex = findVertMirrorIndex(pattern)
    console.log({vertMirrorIndex})
    if (vertMirrorIndex === null) {
        // transpose the pattern
        const transposedPattern = transpose(pattern)
        console.log({transposedPattern})
        // redo the action
        const horizMirrorIndex = findVertMirrorIndex(transposedPattern)
        console.log({horizMirrorIndex})
        // add amount to total
        if(horizMirrorIndex === null) throw new Error('both hoeizontal and vertical are null!!')
        sum += (horizMirrorIndex + 1) * 100
    } else {
        // add amount to count
        sum += vertMirrorIndex + 1
    }
        console.log({sum})
})