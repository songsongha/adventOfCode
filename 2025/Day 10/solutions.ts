// Part 1: What is the fewest button presses required to
// correctly configure the indicator lights on all the machines

import fs from 'fs'

interface LightData {
    light: string
    presses: number
}

interface JoltageData {
    joltage: number[]
    presses: number
}
// parse the string to the get light diagram, button configs
const schematic = fs.readFileSync('./inputs.txt', 'utf8').split('\n')
const regexSquare = /(?<=\[)[^\]]+(?=\])/g
const regexRound = /(?<=\()[^\)]+(?=\))/g

let totalButtonPresses = 0

// for (const line of schematic) {
//     const squareMatch = line.match(regexSquare)
//     const desiredLightPattern = squareMatch ? squareMatch[0] : ''
//     const buttons = line.match(regexRound) || []

//     const initialPattern: LightData = {
//         light: desiredLightPattern.replaceAll('#', '.'),
//         presses: 0
//     }
//     const patternsToCheck = [initialPattern]
//     const visited = new Set<string>()

//     while (patternsToCheck.length) {
//         // need to take from the front of the line to get shortest path
//         const current = patternsToCheck.shift()!
//         const currentLight = current.light
//         if (visited.has(currentLight)) continue // skip already seen patterns
//         visited.add(currentLight)
//         if (currentLight === desiredLightPattern) {
//             const buttonPresses = current.presses
//             console.log({ buttonPresses })
//             totalButtonPresses += buttonPresses
//             break
//         }

//         // get the list of lights we want to be on compared to existing scenario after button is pressed
//         for (const button of buttons) {
//             const newLight = {
//                 light: getNewLight(currentLight, button),
//                 presses: current.presses + 1
//             }
//             patternsToCheck.push(newLight)
//         }
//     }
// }
// console.log({ totalButtonPresses })

function getNewLight(light: string, button: string) {
    const newLight = [...light]
    for (const strIndex of button.split(',')) {
        const numIndex = Number(strIndex)
        newLight[numIndex] = light[numIndex] === '#' ? '.' : '#'
    }
    return newLight.join('')
}

// Part 2, how many times to press the button to get the jolt counters

let totalButtonPresses2 = 0
for (const line of schematic) {
    const regexCurly = /(?<=\{)[^\)]+(?=\})/g
    const curlyMatch = line.match(regexCurly)
    const desiredJoltage = curlyMatch ? curlyMatch[0].split(',').map(Number) : []
    const initialJoltage: JoltageData = {
        joltage: new Array(desiredJoltage.length).fill(0),
        presses: 0
    }
    const joltageStack: JoltageData[] = [initialJoltage]
    console.log(joltageStack)
    console.log({ desiredJoltage })
    const buttons: number[][] = line.match(regexRound).map((str) => str.split(',').map(Number)) || []
    console.log(buttons)
    while (joltageStack.length) {
        const current = joltageStack.shift()!
        const currentJoltage = current.joltage

        if (currentJoltage.every((x, i) => x === desiredJoltage[i])) {
            const buttonPresses = current.presses
            console.log({ buttonPresses })
            totalButtonPresses2 += buttonPresses
            break
        }

        for (const button of buttons) {
            const newJoltage = [...currentJoltage]
            let isOverDesired = false
            for (let i = 0; i < button.length; i++) {
                const index = button[i]
                const newVal = currentJoltage[index] + 1
                if (newVal > desiredJoltage[i]) {
                    isOverDesired = true
                    break
                }
                newJoltage[i] = newVal
            }
            if (isOverDesired) continue
            const stackItem = {
                joltage: newJoltage,
                presses: current.presses + 1
            }
            joltageStack.push(stackItem)
        }
    }
}
console.log({ totalButtonPresses2 })
