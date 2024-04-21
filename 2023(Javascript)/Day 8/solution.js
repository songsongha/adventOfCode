// Problem 1: How many steps odes it take to reach ZZZ?

const fs = require('fs')

// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n')
console.log({puzzleData})

const nodeRegex = /[\w]{3}/g
const leftRightInstructions = puzzleData[0]
console.log({leftRightInstructions})
const nodeMap = {} 
puzzleData.slice(2).forEach(line=>{
    const node = line.match(nodeRegex)
    nodeMap[node[0]] = [node[1], node[2]]
})
console.log({nodeMap})

let steps = 0
let currentNode = 'AAA'

while (currentNode !== 'ZZZ'){
for (let char of leftRightInstructions){
    if (char === 'L') {
        currentNode = nodeMap[currentNode][0]
    } else if (char === 'R'){
        currentNode = nodeMap[currentNode][1]
    }
    steps++
    if (currentNode === 'ZZZ') break
}
}
console.log({steps})


