// Part 1: What is the fewest button presses required to
// correctly configure the indicator lights on all the machines

import fs from 'fs'

interface LightData {
    light: string
    presses: number
}
// parse the string to the get light diagram, button configs
const schematic = fs.readFileSync('./inputs.txt', 'utf8').split('\n')
const regexSquare = /(?<=\[)[^\]]+(?=\])/g
const regexRound = /(?<=\()[^\)]+(?=\))/g

let totalButtonPresses = 0

for (const line of schematic) {
    const squareMatch = line.match(regexSquare)
    const desiredLightPattern = squareMatch ? squareMatch[0] : ''
    const buttons = line.match(regexRound) || []

    const initialPattern: LightData = {
        light: desiredLightPattern.replaceAll('#', '.'),
        presses: 0
    }
    const patternsToCheck = [initialPattern]
    const visited = new Set<string>()

    while (patternsToCheck.length) {
        console.log({ patternsToCheck })
        const current = patternsToCheck.pop()!
        const currentLight = current.light
        if (visited.has(currentLight)) continue // skip already seen patterns
        visited.add(currentLight)
        if (currentLight === desiredLightPattern) {
            const buttonPresses = current.presses
            console.log({ buttonPresses })
            totalButtonPresses += buttonPresses
            break
        }
        // get the positions of the lights that we want to be toggled
        // const positions = getIndicesToChange(desiredLightPattern, currentLight)
        // console.log({ positions })
        // // search for buttons that contain the positions
        // const filteredButtons = buttons.filter((button) => positions.some((position) => button.includes(position)))
        // console.log({ filteredButtons })

        // get the list of lights we want to be on compared to existing scenario after button is pressed
        for (const button of buttons) {
            const newLight = {
                light: getNewLight(currentLight, button),
                presses: (current?.presses || 0) + 1
            }
            patternsToCheck.push(newLight)
        }
    }
}
console.log({ totalButtonPresses })
function getIndicesToChange(desiredLightPattern: string, currentLight: string) {
    const indices: string[] = []
    for (let i = 0; i < desiredLightPattern.length; i++) {
        if (desiredLightPattern[i] !== currentLight[i]) indices.push(String(i))
    }
    return indices
}
function getNewLight(light: string, button: string) {
    const newLight = [...light]
    for (const strIndex of button.split(',')) {
        const numIndex = Number(strIndex)
        newLight[numIndex] = light[numIndex] === '#' ? '.' : '#'
    }
    return newLight.join('')
}
