import fs from 'fs'

interface Point {
    x: number
    y: number
}
const tileData = fs.readFileSync('./inputs.txt', 'utf8').split('\n')
// need to find the largest rectange that can be made with the coordinates
// loop over tileData, track max rectangle size

let max = 0
tileData.forEach((line, index) => {
    const [x1, y1] = line.split(',').map(Number)
    for (let i = index + 1; i < tileData.length; i++) {
        const line2 = tileData[i]
        const [x2, y2] = line2.split(',').map(Number)
        // needs to be inclusive of the tiles
        const area = (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1)
        if (area > max) max = area
    }
})

console.log({ max })

// Part 2: color in the shape made by all the vertices,
// what is the largest area of the rectangle that cna be made

// compress 2D points (use rank rather than value)
const points: Point[] = tileData.map((line) => {
    const [x, y] = line.split(',').map(Number)
    return {
        x,
        y
    }
})

const uniqueX = Array.from(new Set(points.map((point) => point.x))).sort((a, b) => a - b)
const uniqueY = Array.from(new Set(points.map((point) => point.y))).sort((a, b) => a - b)

// create the look up map so you can find index from actual coordinate later
// this is better than searching the array every time
const xLookUpMap: Map<number, number> = new Map()
const yLookUpMap: Map<number, number> = new Map()
uniqueX.forEach((value, index) => xLookUpMap.set(value, index))
uniqueY.forEach((value, index) => yLookUpMap.set(value, index))

// then create a grid based on the new compressed points
// initialize the grid with dots
const grid: string[][] = Array.from({ length: uniqueY.length }, () => Array(uniqueX.length).fill('.'))

// transform points and put those points on the grid
const transformedPoints = points.map((point) => {
    const transformY = yLookUpMap.get(point.y)!
    const transformX = xLookUpMap.get(point.x)!

    grid[transformY][transformX] = '#'
    return {
        x: transformX,
        y: transformY
    }
})

// draw the lines to create the polygon
for (let i = 0; i < transformedPoints.length; i++) {
    const point1 = i == 0 ? transformedPoints[transformedPoints.length - 1] : transformedPoints[i - 1]
    const point2 = transformedPoints[i]

    if (point1.x == point2.x) {
        const [y0, y1] = [point1.y, point2.y].sort((a, b) => a - b)
        for (let y = y0; y <= y1; y++) {
            grid[y][point1.x] = '#'
        }
    }
    if (point1.y == point2.y) {
        const [x0, x1] = [point1.x, point2.x].sort((a, b) => a - b)
        for (let x = x0; x <= x1; x++) {
            grid[x][point1.y] = '#'
        }
    }
}

console.log({ grid })

// fill the interior
// first find inside point
const insidePoint = getInsidePoint(grid)
// then fill

// check all point pairs, find the largest enclosed rectangle

// helpers
function floodFill(grid: string[][], start: Point) {
    const stack = [start]
    const dirs = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0]
    ]

    while (stack.length) {
        const p = stack.pop()!
        if (grid[p.y][p.x] !== '.') continue
        grid[p.y][p.x] = 'X'

        for (const [dx, dy] of dirs) {
            const nx = p.x + dx,
                ny = p.y + dy
            if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[0].length) {
                if (grid[ny][nx] === '.') stack.push({ x: nx, y: ny })
            }
        }
    }
}

function getInsidePoint(grid: string[][]): Point {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] !== '.') continue

            let hitsLeft = 0
            let prev = '.'

            for (let i = x; i >= 0; i--) {
                const cur = grid[y][i]
                if (cur !== prev) {
                    hitsLeft++
                }
                prev = cur
            }

            if (hitsLeft % 2 === 1) {
                return { x, y }
            }
        }
    }
    throw new Error('no inside point found')
}
