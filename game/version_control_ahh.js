const speedDisplay = document.getElementById('speed');
const needle = document.querySelector('.needle');
let speed = 0;
let maxSpeed = 20;
let animDuration = 10; // seconds
let prevStartTime = new Date(); // The time in seconds when the animation was last started. 

let scooterX = 0; // Initial position of the scooter on the x-plane
const scooter = document.querySelector('.scooter');
const roadWidth = 300; // Width of the road
const scooterWidth = 60; // Width of the scooter

// Function to update the road speed based on scooter speed
function updateRoadSpeed() {
  const roads = document.querySelectorAll('.center-line');
  current_time = new Date()
  elapsed_time = (current_time - prevStartTime) / 1000;
  elapsedRatio = elapsed_time/animDuration;
  animDuration = 2 / (speed / 10);
  roads.forEach((road) => {
    if (speed > 0) {
        road.style.animationDuration = `${animDuration}s`;
        road.style.animationPlayState = 'running';
        road.style.animationDelay = `${elapsedRatio * animDuration}s`;
        prevStartTime = new Date()
      } else {
        road.style.animationPlayState = 'paused';
      }
  })
}

// Function to update speedometer needle angle based on speed
function updateSpeedometer() {
  let angle = (speed / maxSpeed) * 180 - 90; // Maps speed to -90 to 90 degrees
  needle.style.transform = `rotate(${angle}deg)`;
}

// Arrow key event listener for controlling speed
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      if (speed < maxSpeed) speed += 1;
      break;
    case 'ArrowDown':
      if (speed > 0) speed -= 1;
      break;
    case 'ArrowLeft':
        // Move scooter left without crossing road's left border
        if (scooterX > -((roadWidth - scooterWidth) / 2)) {
            scooterX -= 5;
            scooter.style.transform = `translateX(calc(-50% + ${scooterX}px)) rotate(-15deg)`;
        }
        break;
    case 'ArrowRight':
        // Move scooter right without crossing road's right border
        if (scooterX < (roadWidth - scooterWidth) / 2) {
            scooterX += 5;
            scooter.style.transform = `translateX(calc(-50% + ${scooterX}px)) rotate(15deg)`;
        }
        break;
  }

  // Update the displayed speed, road animation speed, and speedometer needle
  speedDisplay.textContent = speed;
  updateRoadSpeed();
  updateSpeedometer();
});

// Reset scooter tilt when keys are released
document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    scooter.style.transform = `translateX(calc(-50% + ${scooterX}px)) rotate(0deg)`;
  }
});
