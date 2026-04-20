import fs from 'fs'

const tileData = fs.readFileSync('./inputs.txt', 'utf8').split('\n')
// need to find the largest rectange that can be made with the coordinates
// loop over tileData, track max rectangle size

let max = 0
tileData.forEach((line, index) => {
    const [x1, y1] = line.split(',').map(Number)
    for (let i = index + 1; i < tileData.length; i++) {
        const line2 = tileData[i]
        console.log({ line2 })
        const [x2, y2] = line2.split(',').map(Number)
        // needs to be inclusive of the tiles
        const area = (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1)
        if (area > max) max = area
    }
})

console.log({ max })
