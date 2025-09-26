var loaded = false;
var init = function() {
    if (loaded) return;
    loaded = true;

    var canvas = document.getElementById('heart');
    var ctx = canvas.getContext('2d');
    var width, height;

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fillRect(0, 0, width, height);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    var rand = Math.random;

    // Original heart function
    var heartPosition = function(rad) {
        return [Math.pow(Math.sin(rad), 3),
                -(15 * Math.cos(rad) - 5 * Math.cos(2*rad) - 2 * Math.cos(3*rad) - Math.cos(4*rad))];
    };

    var scaleAndTranslate = function(pos, scale) {
        return [pos[0]*scale, pos[1]*scale];
    };

    var traceCount = 20;
    var pointsOrigin = [];
    var dr = 0.1; // finer points for smoother heart

    // Compute scale based on canvas size (preserves heart shape)
    var originalMaxWidth = 210; // original design max width
    var originalMaxHeight = 13; // original max height used in pointsOrigin
    var scaleFactor = Math.min(width / (originalMaxWidth*2), height / (originalMaxHeight*20)); 

    // Generate heart points
    for (var i = 0; i < Math.PI*2; i += dr) pointsOrigin.push(scaleAndTranslate(heartPosition(i), scaleFactor*210));
    for (var i = 0; i < Math.PI*2; i += dr) pointsOrigin.push(scaleAndTranslate(heartPosition(i), scaleFactor*150));
    for (var i = 0; i < Math.PI*2; i += dr) pointsOrigin.push(scaleAndTranslate(heartPosition(i), scaleFactor*90));

    var heartPointsCount = pointsOrigin.length;
    var targetPoints = [];

    var pulse = function(kx, ky){
        for(var i=0;i<pointsOrigin.length;i++){
            targetPoints[i] = [];
            targetPoints[i][0] = kx*pointsOrigin[i][0] + width/2;
            targetPoints[i][1] = ky*pointsOrigin[i][1] + height/2;
        }
    };

    var e = [];
    for(var i=0;i<heartPointsCount;i++){
        var x=rand()*width, y=rand()*height;
        e[i]={vx:0,vy:0,R:2,speed:rand()+5,q:~~(rand()*heartPointsCount),
              D:2*(i%2)-1,force:0.2*rand()+0.7,
              f:"hsla(0,"+~~(40*rand()+100)+"%,"+~~(60*rand()+20)+"%,.3)",
              trace:[]};
        for(var k=0;k<traceCount;k++) e[i].trace[k]={x:x,y:y};
    }

    var config={traceK:0.4,timeDelta:0.01};
    var time=0;

    var loop = function(){
        var n=-Math.cos(time);
        pulse((1+n)*0.5,(1+n)*0.5);
        time += ((Math.sin(time)<0)?9:(n>0.8)?0.2:1)*config.timeDelta;
        ctx.fillStyle="rgba(0,0,0,.1)";
        ctx.fillRect(0,0,width,height);

        for(var i=e.length;i--;){
            var u=e[i];
            var q=targetPoints[u.q];
            var dx=u.trace[0].x-q[0];
            var dy=u.trace[0].y-q[1];
            var length=Math.sqrt(dx*dx+dy*dy);
            if(length<10){
                if(rand()>0.95) u.q=~~(rand()*heartPointsCount);
                else{
                    if(rand()>0.99) u.D*=-1;
                    u.q+=u.D;
                    u.q%=heartPointsCount;
                    if(u.q<0) u.q+=heartPointsCount;
                }
            }
            u.vx+=-dx/length*u.speed;
            u.vy+=-dy/length*u.speed;
            u.trace[0].x+=u.vx;
            u.trace[0].y+=u.vy;
            u.vx*=u.force;
            u.vy*=u.force;
            for(var k=0;k<u.trace.length-1;){
                var T=u.trace[k];
                var N=u.trace[++k];
                N.x-=config.traceK*(N.x-T.x);
                N.y-=config.traceK*(N.y-T.y);
            }
            ctx.fillStyle=u.f;
            for(var k=0;k<u.trace.length;k++) ctx.fillRect(u.trace[k].x,u.trace[k].y,1,1);
        }
        window.requestAnimationFrame(loop, canvas);
    };
    loop();
};

if(document.readyState==="complete"||document.readyState==="loaded"||document.readyState==="interactive") init();
else document.addEventListener('DOMContentLoaded',init,false);
