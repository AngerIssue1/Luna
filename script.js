// Get the canvas
const canvas = document.getElementById('heart');
const ctx = canvas.getContext('2d');

// Set canvas size to fit screen
function resizeCanvas() {
  canvas.width = window.innerWidth * 0.8;  // 80% of viewport width
  canvas.height = window.innerHeight * 0.5; // half of viewport height
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Your existing heart animation code goes here
function drawHeart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Example: a single heart shape (replace with your actual code)
  ctx.fillStyle = 'red';
  const x = canvas.width / 2;
  const y = canvas.height / 2;
  const size = Math.min(canvas.width, canvas.height) / 4; // proportional size
  
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x, y - size / 2, x - size, y - size, x - size, y);
  ctx.bezierCurveTo(x - size, y + size, x, y + size * 1.5, x, y + size * 2);
  ctx.bezierCurveTo(x, y + size * 1.5, x + size, y + size, x + size, y);
  ctx.bezierCurveTo(x + size, y - size, x, y - size / 2, x, y);
  ctx.fill();
}

// Animate
function animate() {
  drawHeart();
  requestAnimationFrame(animate);
}
animate();
