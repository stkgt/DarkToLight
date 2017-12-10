var canvas, ctx, width, height;
var rect = {x:(window.innerWidth-22)/2, y:(window.innerHeight-22)/2, radius: 30, width:40, height:40, v:3};
var mousepos = {x:(window.innerWidth-20)/2, y:(window.innerHeight-20)/2};

function init() {
    canvas = document.querySelector("#myCanvas");
    canvas.width = window.innerWidth-22;
    canvas.height = window.innerHeight-22;
    ctx = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;

    canvas.addEventListener('mousemove', function (evt) {
        mousepos = getMousePos(canvas, evt);
    }, false);
    canvas.addEventListener('mousedown', clicked);

    function clicked(evt) {
        console.log("You pressed button: " + evt.button);
        if(evt.button == 1){
            poulpeAttack();
        }else if(evt.button == 2){

        }

    }

    mainloop();
}

function clicked(evt) {
    console.log("You pressed button: " + evt.button);
}

function circleCollide(x1, y1, r1, x2, y2, r2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    return ((dx * dx + dy * dy) < (r1 + r2)*(r1+r2));
}

function dist(x1, x2, y1, y2) {
    return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}

function mainloop() {
    // 1) clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2) move object
    var dx = rect.x - mousepos.x;
    var dy = rect.y - mousepos.y;
    var angle = Math.atan2(dy, dx);

    if(dist(rect.x, mousepos.x, rect.y, mousepos.y) > 10) {
        rect.x -= rect.v*Math.cos(angle);
        rect.y -= rect.v*Math.sin(angle);
    }

    // 3) draw object
    drawRectangle(angle);

    // 4) request new frame
    window.requestAnimationFrame(mainloop);
}

function drawRectangle(angle) {

    // var img = new Image();
    //
    // img.onload = function() {
    //     ctx.drawImage(img, rect.x, rect.y, rect.width ,rect.height);
    //     ctx.rotate(angle);
    //     ctx.translate(-rect.width/2, -rect.height/2);
    // };
    // img.src = './Sprites/Poulpe/Deplacement/Deplacement_01.png';

    ctx.save();

    // These two lines move the coordinate system
    ctx.translate(rect.x, rect.y);
    ctx.rotate(angle);
    // recenter the coordinate system in the middle
    // the rectangle. Like that it will rotate around
    // this point instead of top left corner
    ctx.translate(-rect.width/2, -rect.height/2);

    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.restore();
}

function poulpeAttack(){
    console.log("poulpeAttack");
    ctx.save();

    ctx.translate(rect.width/2,-rect.height/2);
    // Le cou
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, 2*Math.PI);
    ctx.fill();
    ctx.restore();
}

function getMousePos(canvas, evt) {
    // necessary to take into account CSS boudaries
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}