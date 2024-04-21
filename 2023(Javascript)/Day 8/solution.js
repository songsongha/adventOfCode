// Problem 1: How many steps odes it take to reach ZZZ?
// Problem 2: If you start with all the nodes that end with A and step until they all end with Z how many steps does it take?
const lcmOfArray = require('../../helper')
const fs = require('fs')

// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n')
console.log({puzzleData})

const nodeRegex = /[\w]{3}/g
const leftRightInstructions = puzzleData[0]

const nodeMap = {} 
const partTwoCurrentNodeArray = []
puzzleData.slice(2).forEach(line => {
    const node = line.match(nodeRegex)
    nodeMap[node[0]] = [node[1], node[2]]
    if (node[0][2] === 'A') partTwoCurrentNodeArray.push(node[0])
})

let part1Steps = 0
let currentNode = 'AAA'

while (currentNode !== 'ZZZ'){
    for (const char of leftRightInstructions){
        if (char === 'L') {
            currentNode = nodeMap[currentNode][0]
        } else if (char === 'R'){
            currentNode = nodeMap[currentNode][1]
        }
        part1Steps++
        if (currentNode === 'ZZZ') break
    }
}
console.log({part1Steps})


const calculateSteps2 = (startNode)=>{
    let steps = 0
    let currentNode = startNode
    
    while (currentNode[2] !== 'Z'){
        for (const char of leftRightInstructions){
            if (char === 'L') {
                currentNode = nodeMap[currentNode][0]
            } else if (char === 'R'){
                currentNode = nodeMap[currentNode][1]
            }
            steps++
            if (currentNode[2] === 'Z') break
        }
    }
    return steps
}


const stepsArray = partTwoCurrentNodeArray.map(node=> calculateSteps2(node))
console.log({stepsArray})
console.log( 'Part 2 answer', lcmOfArray(stepsArray))



