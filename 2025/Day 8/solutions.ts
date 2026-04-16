const fs = require('fs')

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
console.log(junctionData)
const allDistances: DistanceObject[] = []
// Part 1:  Need to connect 1000 (10 for sample) pairs of junction boxes
// find shortest straight line distance
// track sizes of the circuits
// multiply the largest circuits
const circuitSets: Array<Set<string>> = []
// make the DistanceObject
const allDistancesSorted = false
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
        if (allDistances.length <= MAX_CONNECTION) allDistances.push(description)
        else sortedInsert(allDistances, description)
    }
    // sort once we fill array to 10
    if (!allDistancesSorted && allDistances.length === MAX_CONNECTION)
        allDistances.sort((a, b) => a.distance - b.distance)
}
// now i have the shortest distances,
// but I need to check if they were ever actually connected because nothing happens
