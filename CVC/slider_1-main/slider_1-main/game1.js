// Get the game elements
const spaceship = document.getElementById('spaceship');
const asteroid = document.getElementById('asteroid');
const gameOverText = document.getElementById('game-over');

// Initial game settings
let spaceshipPosition = 225;  // Initial position of the spaceship (center)
let asteroidPositionX = Math.floor(Math.random() * 1550); // Random asteroid start position
let asteroidPositionY = 0;
let asteroidSpeed = 2;
let gameRunning = true;

// Move the spaceship based on arrow keys
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && spaceshipPosition > 10) {
        spaceshipPosition -= 60;
    }
    if (e.key === 'ArrowRight' && spaceshipPosition < 1550) {
        spaceshipPosition += 60;
    }
    spaceship.style.left = spaceshipPosition + 'px';
});

// Game loop to move the asteroid down and check for collision
function gameLoop() {
    if (!gameRunning) return;
    
    // Move asteroid down
    asteroidPositionY += asteroidSpeed;
    asteroid.style.top = asteroidPositionY + 'px';
    asteroid.style.left = asteroidPositionX + 'px';
    
    // Check if asteroid reaches the bottom, reset its position
    if (asteroidPositionY > window.innerHeight) {
        asteroidPositionY = 0;
        asteroidPositionX = Math.floor(Math.random() * 1550);
        asteroidSpeed += 0.5;  // Increase difficulty
    }

    // Check for collision
    if (asteroidPositionY > window.innerHeight - 100 && 
        asteroidPositionX < spaceshipPosition + 50 && 
        asteroidPositionX + 50 > spaceshipPosition) {
        gameRunning = false;
        gameOverText.style.display = 'block';  // Show "Game Over"
    }

    requestAnimationFrame(gameLoop);  // Repeat the game loop
}

// Start the game loop
gameLoop();
