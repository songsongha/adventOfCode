import fs from 'fs'

console.time('runtime')
const MAX_CONNECTION = 1000
type Coordinate = [number, number, number]
type DistanceObject = { from: string; to: string; distance: number }

const straightLineDistance = (coordinate1: Coordinate, coordinate2: Coordinate) => {
    const [x1, y1, z1] = coordinate1
    const [x2, y2, z2] = coordinate2
    return Math.hypot(x2 - x1, y2 - y1, z2 - z1)
}

const getCoordinate = (num_string: string) => {
    return num_string.split(',').map(Number) as Coordinate
}

const sortedInsert = (sortedArray: DistanceObject[], item: DistanceObject) => {
    let low = 0,
        high = sortedArray.length
    while (low < high) {
        const mid = Math.floor((low + high) / 2)
        if (sortedArray[mid].distance < item.distance) low = mid + 1
        else high = mid
    }
    sortedArray.splice(low, 0, item)
    if (sortedArray.length > MAX_CONNECTION) sortedArray.pop()
}

const junctionData = fs.readFileSync('./inputs.txt', 'utf8').split('\n')
const allDistances: DistanceObject[] = []
// Part 1:  Need to connect 1000 (10 for sample) pairs of junction boxes
// find shortest straight line distance
// track sizes of the circuits
// multiply the largest circuits

for (let i = 0; i < junctionData.length; i++) {
    const coord1 = junctionData[i]
    for (let j = i + 1; j < junctionData.length; j++) {
        const coord2 = junctionData[j]
        const distance = straightLineDistance(getCoordinate(coord1), getCoordinate(coord2))
        const description = {
            from: coord1,
            to: coord2,
            distance: distance
        }
        sortedInsert(allDistances, description)
    }
}
console.log({ allDistances })
// now i have the shortest connections, need to create circuits

const circuitSetArray: Array<Set<string>> = []
allDistances.forEach((connection) => {
    const { from, to } = connection

    // find which existing circuits contain 'from' and 'to'
    const fromCircuit = circuitSetArray.find((circuit) => circuit.has(from))
    const toCircuit = circuitSetArray.find((circuit) => circuit.has(to))

    if (fromCircuit && toCircuit) {
        // both already in circuits - merge toCircuit into fromCircuit if they're different
        if (fromCircuit !== toCircuit) {
            toCircuit.forEach((node) => fromCircuit.add(node))
            circuitSetArray.splice(circuitSetArray.indexOf(toCircuit), 1)
        }
    } else if (fromCircuit) {
        // only 'from' has a circuit - add 'to' to it
        fromCircuit.add(to)
    } else if (toCircuit) {
        // only 'to' has a circuit - add 'from' to it
        toCircuit.add(from)
    } else {
        // neither exists yet - create a new circuit
        circuitSetArray.push(new Set([from, to]))
    }
})

// now I need to sort by size and get the size
const sortedCircuitSet = circuitSetArray.sort((a, b) => b.size - a.size)
console.log({ sortedCircuitSet })
let answer = 1
for (let i = 0; i < 3; i++) {
    const size = sortedCircuitSet[i].size
    answer *= size
    console.log({ size })
}
// 5780 is too low
console.log(answer)
console.timeEnd('runtime')
