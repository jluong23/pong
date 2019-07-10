function mainLoop(){
    render();
    update();
}

function render(){
    context.clearRect(0,0,canvas.width,canvas.height); //clear screen for each render
    drawNet();
    showScore();
    p1.draw();
    bot.draw();
    ball.draw();
}

function update(){
    ball.x += ball.vx;
    ball.y += ball.vy;
    bot.move(ball,bot);

    ball.touchWall() ? ball.vy *= -1 : ball.vy *=1; //If ball touches wall, reverse vertical velocity
    let player = (ball.x<canvas.width/2) ? p1 : bot; //if ball is on left side of canvas, only left player can hit paddle and vice versa
    if (ball.touchPaddle(player,ball)){ // If ball touches paddle, reverse horizontal velocity
        let normCollisionPoint = (ball.y - (player.y + player.height/2))/player.height/2; //collision on top = -1, mid = 0, bot = 1
        let angle = normCollisionPoint * Math.PI
        let dir = (ball.x<canvas.width/2) ? 1 : -1;
        ball.vx = dir *Math.cos(angle) * ball.speed
        ball.vy = dir * Math.sin(angle) * ball.speed
        ball.speed+=1
        
    }
    if (ballOut()){
        if (ball.x > canvas.width / 2){
            p1.score +=1;
            ball.reset(-1) //Parameter indicates direction of ball being left to p1 when reset
        }
        else{
            bot.score +=1;
            ball.reset(1) //Parameter indicates direction of ball being right to bot when reset
        }

    }
}

function ballOut(){
    if (ball.x < 0 || ball.x > canvas.width){
        return true
    }
    return false
}

function drawNet(){
    context.fillStyle = "gray"
    for (let i = 0; i<20; i++){
        context.fillRect(canvas.width/2 - 10,5+50*i ,10,30)
    }
}

function showScore(){
    context.fillStyle = "black"
    context.font = "40px Arial"
    context.fillText(`P1 Score = ${p1.score}`,10,50)
    context.fillText(`Bot Score = ${bot.score}` ,720,50)
    context.fillText(`Bot Speed = ${bot.vy}`, 720, 100)

}

let canvas = document.getElementById("gameCanvas");
canvas.width = "1000";
canvas.height = "1000";
let context = canvas.getContext("2d");
let p1 = new Paddle (0, 20, 100, "black");
let bot = new Bot (canvas.width - 20, 20, 100, "black");

window.ball = new Ball(25,-15,5,"black");


// document.addEventListener('keydown', event =>{
//     console.log(event)
//     if (event.key == "w"){
//         p1.y-= 30
//     } else if (event.key == "s"){
//         p1.y+= 30
//     }
// })

    // Mouse Controls
canvas.onmousemove = function(e){
    let rect = canvas.getBoundingClientRect();
    p1.y = event.y - rect.top - p1.height/2
    // bot.y = event.y - rect.top - bot.height/2
}

let fps = 1000/60;
let animId = setInterval(mainLoop, fps); 
