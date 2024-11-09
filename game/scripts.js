const scooter = document.querySelector('.scooter');
const speedDisplay = document.getElementById('speed');
let speed = 0;
let maxSpeed = 20;
let roadAnimationSpeed = 2;

// Function to update road animation speed
function updateRoadSpeed() {
  document.querySelector('.road').style.animationDuration = `${4 / roadAnimationSpeed}s`;
}

// Arrow key event listener
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      if (speed < maxSpeed) speed += 1;
      break;
    case 'ArrowDown':
      if (speed > 0) speed -= 1;
      break;
    case 'ArrowLeft':
      scooter.style.transform = 'translateX(-50%) rotate(-15deg)';
      break;
    case 'ArrowRight':
      scooter.style.transform = 'translateX(-50%) rotate(15deg)';
      break;
  }
  
  // Update the displayed speed and road speed
  speedDisplay.textContent = speed;
  roadAnimationSpeed = speed / 10 + 0.5;
  updateRoadSpeed();
});

// Reset scooter rotation when arrow keys are released
document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    scooter.style.transform = 'translateX(-50%) rotate(0deg)';
  }
});
