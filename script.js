var canvas = document.getElementById('heart');
var ctx = canvas.getContext('2d');
var width, height;

function resizeCanvas() {
    // Shrink a little so it fits phones
    width = canvas.width = window.innerWidth * 0.95;
    height = canvas.height = window.innerHeight * 0.95;
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(0, 0, width, height);
}

// Call once and on resize
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Later, in your pulse function:
// Shift heart to center dynamically
var pulse = function(kx, ky){
    for(var i=0;i<pointsOrigin.length;i++){
        targetPoints[i] = [];
        targetPoints[i][0] = kx*pointsOrigin[i][0] + width/2;  // center x
        targetPoints[i][1] = ky*pointsOrigin[i][1] + height/2; // center y
    }
};
