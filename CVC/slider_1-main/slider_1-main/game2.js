const puzzleContainer = document.getElementById('puzzle-container');
const shuffleButton = document.getElementById('shuffle-button');
const messageElement = document.getElementById('message');

let tiles = [];
const size = 4; // 4x4 puzzle
const totalTiles = size * size;

function initTiles() {
    tiles = [];
    for (let i = 0; i < totalTiles; i++) {
        tiles.push(i);
    }
}

function drawPuzzle() {
    puzzleContainer.innerHTML = '';
    tiles.forEach((tile, index) => {
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        if (tile !== 0) {
            const img = document.createElement('img');
            img.src = `3d-view-sun-space.jpg`; // Random space image
            piece.appendChild(img);
            piece.addEventListener('click', () => moveTile(index));
        } else {
            piece.style.background = 'transparent'; // Empty tile
        }
        puzzleContainer.appendChild(piece);
    });
}

function shuffleTiles() {
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
}

function moveTile(index) {
    const emptyIndex = tiles.indexOf(0);
    const validMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - size, emptyIndex + size];

    if (validMoves.includes(index)) {
        [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
        drawPuzzle();
        checkWin();
    }
}

function checkWin() {
    if (tiles.join(',') === [...Array(totalTiles).keys()].join(',')) {
        messageElement.innerText = "🎉 Congratulations! You've solved the puzzle! 🎉";
    }
}

shuffleButton.addEventListener('click', () => {
    initTiles();
    shuffleTiles();
    drawPuzzle();
    messageElement.innerText = '';
});

// Initialize the puzzle
initTiles();
drawPuzzle();
