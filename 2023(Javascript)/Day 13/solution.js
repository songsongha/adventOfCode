// Problem 1: Find where the mirrors are, add up the number of columns to the left of each vertical line of reflection and add 100xnumber of rows abovev each horizontal line fo relction.
// Problem 2: Find the smudge that creates the new reflection line, what is the new reflection line sum?

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

const checkDifference = (index, pattern) => {
    let difference = 0
    for (let i = 0; (index + i + 1) < pattern[0].length && index - i >= 0; i++){
        const leftIndex = index - i
        const rightIndex = index + i + 1
        for (let rowIndex = 0; rowIndex < pattern.length; rowIndex++){
            if (pattern[rowIndex][leftIndex] !== pattern[rowIndex][rightIndex]) difference += 1
        }
    }
    return difference
}

const findVertMirrorIndex = (pattern) => {
    let mirrorIndex = null
    for (let colIndex = 0; colIndex < pattern[0].length -1; colIndex++){
        for (let rowIndex = 0; rowIndex < pattern.length; rowIndex++){
            if (pattern[rowIndex][colIndex] === pattern[rowIndex][colIndex+1]) {
                if(rowIndex === pattern.length -1){
                    // this is the last row so everything before is also mirror
                    // check all of the columns out of this axis til you reach an end
                    if (checkMirrorLine(colIndex,pattern)){
                        mirrorIndex = colIndex
                    } else {
                        break
                    }      
                }
            } else {
                // move on to the next column
                break
            }
        }
        if (mirrorIndex !== null) break
    }
    console.log({mirrorIndex})
    return mirrorIndex
}

const findSmudgeVertMirrorIndex = (pattern) => {
    for (let colIndex = 0; colIndex < pattern[0].length -1; colIndex++){
            if (checkDifference(colIndex,pattern) === 1){
                return colIndex
        }
    }
    return null
}

// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n\n').map(line => line.split('\n')).filter(item=>!!item)
console.log({puzzleData})
let sum = 0
puzzleData.forEach(pattern => {
    // check for vertical mirror 
    const vertMirrorIndex = findVertMirrorIndex(pattern)
    if (vertMirrorIndex === null) {
        // transpose the pattern
        const transposedPattern = transpose(pattern)
        // redo the action
        const horizMirrorIndex = findVertMirrorIndex(transposedPattern)
        // add amount to total
        if(horizMirrorIndex === null) throw new Error('both hoeizontal and vertical are null!!')
        sum += (horizMirrorIndex + 1) * 100
    } else {
        // add amount to count
        sum += vertMirrorIndex + 1
    }
        console.log({sum})
})

// Part 2:
puzzleData.forEach(pattern => {
    // check for vertical mirror 
    const vertMirrorIndex = findSmudgeVertMirrorIndex(pattern)
    if (vertMirrorIndex === null) {
        // transpose the pattern
        const transposedPattern = transpose(pattern)
        // redo the action
        const horizMirrorIndex = findSmudgeVertMirrorIndex(transposedPattern)
        // add amount to total
        if(horizMirrorIndex === null) throw new Error('both hoeizontal and vertical are null!!')
        sum += (horizMirrorIndex + 1) * 100
    } else {
        // add amount to count
        sum += vertMirrorIndex + 1
    }
        console.log({sum})
})
