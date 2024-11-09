const speedDisplay = document.getElementById('speed');
const needle = document.querySelector('.needle');
const scooter = document.querySelector('.scooter');
let speed = 0;
let maxSpeed = 20;
let animDuration = 10; // seconds
let prevStartTime = new Date();
let scooterX = 0;
const roadWidth = 300;
const scooterWidth = 60;
let obstacles = [];
let obstacleSpeed = speed / 10; // Speed of obstacle movement downwards
const deceleration = -5; // Constant deceleration (e.g., -5 m/s²)

// Function to calculate dynamic braking distance based on current speed
// Function to calculate dynamic braking distance based on current speed
function calculateBrakingDistance(speed) {
    const t = Math.abs(speed / deceleration); // Time to stop based on current speed
    return 0.5 * Math.pow(t, 2) * Math.abs(deceleration); // Braking distance using the formula
  }
  
// Function to create a new obstacle
function createObstacle() {
  const obstacle = document.createElement('div');
  obstacle.classList.add('obstacle');
  obstacle.style.width = '40px';
  obstacle.style.height = '40px';
  obstacle.style.backgroundColor = 'red';
  obstacle.style.position = 'absolute';
  obstacle.style.top = '-40px';
  obstacle.style.left = `${Math.random() * (roadWidth - 40)}px`;
  document.querySelector('.road').appendChild(obstacle);
  obstacles.push(obstacle);
}

// Function to move obstacles down the road
function moveObstacles() {
  obstacles.forEach((obstacle, index) => {
    const top = parseFloat(obstacle.style.top);
    obstacle.style.top = `${top + obstacleSpeed}px`;

    if (top > window.innerHeight) {
      obstacle.remove();
      obstacles.splice(index, 1);
    }
  });
}

// Function to detect if an obstacle is close to the scooter
// Function to detect if an obstacle is close to the scooter
// Function to detect if an obstacle is close to the scooter
function detectObstacle() {
    const scooterRect = scooter.getBoundingClientRect();
    let brakingDistance = 10 * calculateBrakingDistance(speed); // Get braking distance based on current speed
    console.log(`Braking Distance: ${brakingDistance}`); // Debug log

    obstacles.forEach((obstacle) => {
        const obstacleRect = obstacle.getBoundingClientRect();
        const distance = scooterRect.top - obstacleRect.bottom;
        console.log(`Obstacle Distance: ${distance}`); // Debug log

        // Start braking when within a certain percentage of brakingDistance
        const brakeThreshold = 0.6; // Start braking when obstacle is 80% of the braking distance
        if (
            distance < brakingDistance * brakeThreshold && // Adjust threshold for when to start braking
            Math.abs(scooterRect.left - obstacleRect.left) < scooterWidth
        ) {
            console.log('Braking triggered'); // Debug log
            if (speed > 0) speed *= 0.4; // Gradually reduce speed (adjust as needed)
            if (speed < 0) speed = 0;
        }
    });
}


// Function to update road speed based on scooter speed
function updateRoadSpeed() {
  const roads = document.querySelectorAll('.center-line');
  const current_time = new Date();
  const elapsed_time = (current_time - prevStartTime) / 1000;
  const elapsedRatio = elapsed_time / animDuration;
  animDuration = 2 / (speed / 10);

  obstacleSpeed = speed * 0.8;
  
  roads.forEach((road) => {
    if (speed > 0) {
      road.style.animationDuration = `${animDuration}s`;
      road.style.animationPlayState = 'running';
      road.style.animationDelay = `${elapsedRatio * animDuration}s`;
      prevStartTime = new Date();
    } else {
      road.style.animationPlayState = 'paused';
    }
  });
}

// Function to update speedometer needle angle based on speed
function updateSpeedometer() {
  let angle = (speed / maxSpeed) * 180 - 90;
  needle.style.transform = `rotate(${angle}deg)`;
}

// Arrow key event listener for controlling speed and position
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      if (speed < maxSpeed) speed += 1;
      break;
    case 'ArrowDown':
      if (speed > 0) speed -= 1;
      break;
    case 'ArrowLeft':
      if (scooterX > -((roadWidth - scooterWidth) / 2)) {
        scooterX -= 5;
        scooter.style.transform = `translateX(calc(-50% + ${scooterX}px)) rotate(-15deg)`;
      }
      break;
    case 'ArrowRight':
      if (scooterX < (roadWidth - scooterWidth) / 2) {
        scooterX += 5;
        scooter.style.transform = `translateX(calc(-50% + ${scooterX}px)) rotate(15deg)`;
      }
      break;
  }

  // Update displayed speed, road animation speed, and speedometer needle
  speedDisplay.textContent = Math.round(speed);
  updateRoadSpeed();
  updateSpeedometer();
});

// Reset scooter tilt when keys are released
document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    scooter.style.transform = `translateX(calc(-50% + ${scooterX}px)) rotate(0deg)`;
  }
});

// Function to run continuously, updating obstacles and detecting collisions
function gameLoop() {
  moveObstacles();
  detectObstacle();
  updateRoadSpeed();
  updateSpeedometer();
  speedDisplay.textContent = Math.round(speed);

  requestAnimationFrame(gameLoop);
}

// Generate an obstacle every 3 seconds
setInterval(createObstacle, 5000);

// Start the game loop
gameLoop();
