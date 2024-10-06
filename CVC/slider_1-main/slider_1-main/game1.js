// Get the game elements
const spaceship = document.getElementById('spaceship');
const gameOverText = document.getElementById('game-over');
const restartButton = document.getElementById('restart-button');

// Create asteroids dynamically
const asteroids = [];
for (let i = 0; i < 3; i++) {
    const asteroid = document.createElement('div');
    asteroid.classList.add('asteroid');
    document.body.appendChild(asteroid);
    asteroids.push(asteroid);
}

// Initial game settings
let spaceshipPosition = window.innerWidth / 2 - 100;  // Center spaceship
let asteroidPositionsX = [Math.random() * window.innerWidth, Math.random() * window.innerWidth, Math.random() * window.innerWidth];
let asteroidPositionsY = [0, 0, 0];
let asteroidSpeeds = [2, 2.5, 2];
let gameRunning = true;

// Function to reset the game
function resetGame() {
    // Reset positions
    spaceshipPosition = window.innerWidth / 2 - 100;
    asteroidPositionsX = [Math.random() * window.innerWidth, Math.random() * window.innerWidth, Math.random() * window.innerWidth];
    asteroidPositionsY = [0, 0, 0];
    asteroidSpeeds = [2, 2.5, 2];
    gameRunning = true;

    // Hide "Game Over" and restart button
    gameOverText.style.display = 'none';
    restartButton.style.display = 'none';

    // Start the game loop again
    gameLoop();
}

// Move the spaceship based on arrow keys
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && spaceshipPosition > 10) {
        spaceshipPosition -= 100;
    }
    if (e.key === 'ArrowRight' && spaceshipPosition < window.innerWidth - 200) {
        spaceshipPosition += 100;
    }
    spaceship.style.left = spaceshipPosition + 'px';
});

// Game loop to move the asteroids down and check for collision
function gameLoop() {
    if (!gameRunning) return;

    // Loop through each asteroid
    for (let i = 0; i < asteroids.length; i++) {
        asteroidPositionsY[i] += asteroidSpeeds[i];
        asteroids[i].style.top = asteroidPositionsY[i] + 'px';
        asteroids[i].style.left = asteroidPositionsX[i] + 'px';

        // Check if asteroid reaches the bottom, reset its position
        if (asteroidPositionsY[i] > window.innerHeight) {
            asteroidPositionsY[i] = 0;
            asteroidPositionsX[i] = Math.random() * window.innerWidth;
            asteroidSpeeds[i] += 0.5;  // Increase difficulty
        }

        // Check for collision with spaceship
        const asteroidRect = asteroids[i].getBoundingClientRect();
        const spaceshipRect = spaceship.getBoundingClientRect();
        if (
            asteroidRect.top < spaceshipRect.bottom &&
            asteroidRect.bottom > spaceshipRect.top &&
            asteroidRect.left < spaceshipRect.right &&
            asteroidRect.right > spaceshipRect.left
        ) {
            gameRunning = false;
            gameOverText.style.display = 'block';  // Show "Game Over"
            restartButton.style.display = 'block';  // Show restart button
        }
    }

    if (gameRunning) {
        requestAnimationFrame(gameLoop);  // Repeat the game loop
    }
}

// Start the game loop
gameLoop();

// Event listener for restart button
restartButton.addEventListener('click', resetGame);
