// Problem 1: Find ASCII value, calculate formula and sum up values
// Problem 2: Focus power of lense configuration

const fs = require('fs')

const getBoxNoFromLabel = (str) => {
    let hashValue = 0
    for (let i = 0; i < str.length; i++){
        const asciiValue = str.charCodeAt(i)
        hashValue = ((hashValue + asciiValue) * 17) % 256
    }
    return hashValue
}
// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split(',')
console.log({puzzleData})
let sum = 0
puzzleData.forEach(str=>{
    sum += getBoxNoFromLabel(str)
})
console.log({sum})

// Part 2
const lenseBox = new Array(256).fill([]).map(()=>new Map())

puzzleData.forEach(str => {
    if (str.includes('-')){
        const label = str.split('-')[0]
        const boxNo = getBoxNoFromLabel(label)
        // remove lense if present in box, otherwise do nothing
        lenseBox[boxNo].delete(label)
    } else if (str.includes('=')){
        const [label, focalLength] = str.split('=')
        const boxNo = getBoxNoFromLabel(label)
        // add or replace lense in the box
        lenseBox[boxNo].set(label,focalLength)
    }
})

let totalFocusPower = 0
lenseBox.forEach((lenseMap, boxNo)=>{
    let lensePosition = 1
    lenseMap.forEach((focalLength, label)=>{
        const focalPower = (boxNo + 1) * lensePosition * focalLength
        lensePosition++
        totalFocusPower += focalPower
    })
})
console.log({totalFocusPower})



