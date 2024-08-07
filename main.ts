function lockPiece () {
    for (let y8 = 0; y8 <= currentPiece.length - 1; y8++) {
        for (let x8 = 0; x8 <= currentPiece[y8].length - 1; x8++) {
            if (currentPiece[y8][x8] == 1) {
                grid[currentY + y8][currentX + x8] = 1
            }
        }
    }
}
function rotatePieceRight () {
    let newPiece: number[][] = []
    for (let x4 = 0; x4 <= currentPiece[0].length - 1; x4++) {
        newPiece.push([])
        for (let index = 0; index < currentPiece.length; index++) {
            newPiece[x4].push(0)
        }
    }
    for (let y5 = 0; y5 <= currentPiece.length - 1; y5++) {
        for (let x5 = 0; x5 <= currentPiece[y5].length - 1; x5++) {
            newPiece[x5][currentPiece.length - y5 - 1] = currentPiece[y5][x5]
        }
    }
    if (canMove(0, 0)) {
        clearPiece()
        currentPiece = newPiece
        drawPiece()
    }
}
function spawnNewPiece () {
    currentPiece = tetris[Math.randomRange(0, tetris.length - 1)]
    currentX = 1
    currentY = 0
    if (!(canMove(0, 0))) {
        gameOver = true
        basic.showString("Game Over")
    } else {
        drawPiece()
    }
}
// 0 = no rotation, 1 = right, -1 = left
function drawPiece () {
    for (let y = 0; y <= currentPiece.length - 1; y++) {
        for (let x = 0; x <= currentPiece[y].length - 1; x++) {
            if (currentPiece[y][x] == 1) {
                led.plot(currentX + x, currentY + y)
            }
        }
    }
}
function clearLines () {
    for (let y9 = 0; y9 <= 4; y9++) {
        fullLine = true
        for (let x9 = 0; x9 <= 4; x9++) {
            if (grid[y9][x9] == 0) {
                fullLine = false
                break;
            }
        }
        if (fullLine) {
            for (let row = y9; row > 0; row--) {
                for (let col = 0; col < 5; col++) {
                    grid[row][col] = grid[row - 1][col]
                }
            }
for (let col2 = 0; col2 <= 4; col2++) {
                grid[0][col2] = 0
            }
        }
    }
}
input.onButtonPressed(Button.A, function () {
    movePiece(-1, 0)
})
function playSong () {
    for (let row2 of songGrid) {
        for (let note of row2) {
            if (notes[note] != undefined) {
                music.playTone(notes[note], music.beat(BeatFraction.Quarter))
                // Adjust timing between notes as needed
                basic.pause(200)
            }
        }
    }
}
function clearPiece () {
    for (let y2 = 0; y2 <= currentPiece.length - 1; y2++) {
        for (let x2 = 0; x2 <= currentPiece[y2].length - 1; x2++) {
            if (currentPiece[y2][x2] == 1) {
                led.unplot(currentX + x2, currentY + y2)
            }
        }
    }
}
function rotatePieceLeft () {
    let newPiece2: number[][] = []
    for (let x6 = 0; x6 <= currentPiece[0].length - 1; x6++) {
        newPiece2.push([])
        for (let index = 0; index < currentPiece.length; index++) {
            newPiece2[x6].push(0)
        }
    }
    for (let y7 = 0; y7 <= currentPiece.length - 1; y7++) {
        for (let x7 = 0; x7 <= currentPiece[y7].length - 1; x7++) {
            newPiece2[currentPiece[y7].length - x7 - 1][y7] = currentPiece[y7][x7]
        }
    }
    if (canMove(0, 0)) {
        clearPiece()
        currentPiece = newPiece2
        drawPiece()
    }
}
input.onButtonPressed(Button.AB, function () {
    rotatePiece()
})
input.onButtonPressed(Button.B, function () {
    movePiece(1, 0)
})
function canMove (dx: number, dy: number) {
    for (let y3 = 0; y3 <= currentPiece.length - 1; y3++) {
        for (let x3 = 0; x3 <= currentPiece[y3].length - 1; x3++) {
            if (currentPiece[y3][x3] == 1) {
                newX = currentX + x3 + dx
                newY = currentY + y3 + dy
                if (newX < 0 || newX >= 5 || newY < 0 || newY >= 5 || grid[newY][newX] == 1) {
                    return false
                }
            }
        }
    }
    return true
}
function rotatePiece () {
    if (rotationDirection == 1) {
        rotatePieceRight()
    } else if (rotationDirection == -1) {
        rotatePieceLeft()
    }
    // Reset rotation direction after rotation
    rotationDirection = 0
}
function movePiece (dx: number, dy: number) {
    if (canMove(dx, dy)) {
        clearPiece()
        currentX += dx
        currentY += dy
        drawPiece()
    } else if (dy != 0) {
        lockPiece()
        clearLines()
        spawnNewPiece()
    }
}
let newY = 0
let newX = 0
let fullLine = false
let gameOver = false
let currentY = 0
let songGrid: string[][] = []
let currentX = 0
let currentPiece: number[][] = []
let grid: number[][] = []
let tetris: number[][][] = []
// 0 = no rotation, 1 = right, -1 = left
let rotationDirection = 0
// Z piece
// S piece
// O piece
// I piece
// L piece
tetris = [
[[1, 1, 0], [0, 1, 1]],
[[0, 1, 1], [1, 1, 0]],
[[1, 1], [1, 1]],
[[
1,
1,
1,
1
]],
[[1, 1, 1], [1, 0, 0]]
]
grid = [
[
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0
]
]
currentPiece = tetris[Math.randomRange(0, tetris.length - 1)]
currentX = 1
let interval = 1000
let notes: { [key: string]: number } = {
    'A': Note.A,
    'B': Note.B,
    'C': Note.C,
    'D': Note.D,
    'E': Note.E,
    'F': Note.F,
    'G': Note.G
}
songGrid = [
[
"E",
"B",
"C",
"D"
],
[
"E",
"D",
"C",
"B"
],
[
"A",
"A",
"C",
"E"
],
[
"E",
"D",
"C",
"B"
],
[
"A",
"B",
"C",
"D"
],
[
"E",
"C",
"A",
"A"
],
[
"D",
"F",
"A",
"D"
],
[
"G",
"F",
"E",
"C"
],
[
"E",
"E",
"G",
"B"
],
[
"A",
"G",
"F",
"E"
]
]
basic.forever(function () {
    if (!(gameOver)) {
        basic.pause(interval)
        movePiece(0, 1)
    }
})
basic.forever(function () {
    if (!(gameOver)) {
        playSong()
        // Adjust the pause to match the length of the custom theme
        basic.pause(8000)
    }
})
