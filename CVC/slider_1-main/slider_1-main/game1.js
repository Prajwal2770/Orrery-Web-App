// Get the game elements
const spaceship = document.getElementById('spaceship');
const gameOverText = document.getElementById('game-over');

// Create asteroids dynamically
const asteroids = [];
for (let i = 0; i < 3; i++) {
    const asteroid = document.createElement('div');
    asteroid.classList.add('asteroid');  // Assuming you have a CSS class for asteroids
    document.body.appendChild(asteroid);
    asteroids.push(asteroid);
}

// Initial game settings
let spaceshipPosition = 225;  // Initial position of the spaceship (center)

// Arrays to store asteroid positions and speeds
let asteroidPositionsX = [Math.random() * 1550, Math.random() * 1550, Math.random() * 1550];  // Random asteroid start positions
let asteroidPositionsY = [0, 0, 0];
let asteroidSpeeds = [2, 2.5, 2];  // Different speeds for each asteroid
let gameRunning = true;

// Move the spaceship based on arrow keys
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && spaceshipPosition > 10) {
        spaceshipPosition -= 100;
    }
    if (e.key === 'ArrowRight' && spaceshipPosition < 1550) {
        spaceshipPosition += 100;
    }
    spaceship.style.left = spaceshipPosition + 'px';
});

// Game loop to move the asteroids down and check for collision
function gameLoop() {
    if (!gameRunning) return;

    // Loop through each asteroid
    for (let i = 0; i < asteroids.length; i++) {
        // Move each asteroid down
        asteroidPositionsY[i] += asteroidSpeeds[i];
        asteroids[i].style.top = asteroidPositionsY[i] + 'px';
        asteroids[i].style.left = asteroidPositionsX[i] + 'px';

        // Check if asteroid reaches the bottom, reset its position
        if (asteroidPositionsY[i] > window.innerHeight) {
            asteroidPositionsY[i] = 0;
            asteroidPositionsX[i] = Math.floor(Math.random() * 1550);
            asteroidSpeeds[i] += 0.5;  // Increase difficulty for each asteroid
        }

        // Check for collision with spaceship
        if (asteroidPositionsY[i] > window.innerHeight - 100 && 
            asteroidPositionsX[i] < spaceshipPosition + 50 && 
            asteroidPositionsX[i] + 50 > spaceshipPosition) {
            gameRunning = false;
            gameOverText.style.display = 'block';  // Show "Game Over"
        }
    }

    requestAnimationFrame(gameLoop);  // Repeat the game loop
}

// Start the game loop
gameLoop();

