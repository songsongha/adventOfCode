import fs from 'fs'

console.time('runtime')
const MAX_CONNECTION = 10
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
// now i have the shortest connections, need to create circuits

const circuitSetArray: Array<Set<string>> = []
allDistances.forEach((connection) => {
    const { from, to } = connection
    let hasBeenAdded = false
    for (const circuit of circuitSetArray) {
        if (circuit.has(from) || circuit.has(to)) {
            circuit.add(from)
            circuit.add(to)
            hasBeenAdded = true
        }
    }
    if (!hasBeenAdded) circuitSetArray.push(new Set([from, to]))
})

// now I need to check for  for duplicates in the set and merge them
for (let i = 0; i < circuitSetArray.length; i++) {
    const circuit1 = circuitSetArray[i]
    for (let j = i + 1; j < circuitSetArray.length; j++) {
        const circuit2 = circuitSetArray[j]
        const hasOverLap = [...circuit1].some((val) => circuit2.has(val))
        if (hasOverLap) {
            circuitSetArray[i] = new Set([...circuit1, ...circuit2])
            circuitSetArray.splice(j, 1)
            j-- // since we removed an element.
        }
    }
}
console.log({ circuitSetArray })
// now I need to sort by size and get the size
circuitSetArray.sort((a, b) => b.size - a.size)
let answer = 1
for (let i = 0; i < 3; i++) {
    const size = circuitSetArray[i].size
    answer *= size
    console.log({ size })
}

console.log(answer)
console.timeEnd('runtime')
