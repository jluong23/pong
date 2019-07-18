function mainLoop(){
    render();
    update();
}

function render(){
    context.clearRect(0,0,canvas.width,canvas.height); //clear screen for each render
    drawNet();
    showText();
    screenItems.forEach(function(item){
        item.drawImage();
    })
    p1.draw();
    bot.draw();
    screenBalls.forEach(function(ball){
        ball.draw();
    })
}

function update(){
    placeItemLoop();
    bot.move();

    screenBalls.forEach(function(ball){
        ball.x += ball.vx;
        ball.y += ball.vy;
        ball.touchWall() ? ball.vy *= -1 : ball.vy *=1; //If ball touches wall, reverse vertical velocity

        let defender = (ball.x<canvas.width/2) ? p1 : bot; //if ball is on left side of canvas, only left player can hit paddle and vice versa
        let attacker = (ball.x<canvas.width/2) ? bot: p1;

        if (ball.touchRect(defender)){
            ball.reboundPaddle(defender);
        }
        screenItems.forEach(function(item){

            if (ball.touchRect(item) && ball.color == "black"){
                item.use();
                screenItems.splice(screenItems.indexOf(item),1); //remove item from screenItems array
            }
        })


        if (ball.isOut()){
            attacker.score+=ball.scoreInc;
            if (ball.color == "black"){ //black ball is the main ball
                ball.reset(attacker); //reset ball given object argument of the scorer
                resetScreen();
            }
            else(
                screenBalls.splice(screenBalls.indexOf(ball),1)
            )
        }
    })
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min+1)) + min;
}


function drawNet(){
    context.fillStyle = "gray"
    for (let i = 0; i<20; i++){
        context.fillRect(canvas.width/2 - 10,5+50*i ,10,30)
    }
}

function showText(){
    context.fillStyle = "black";
    context.font = "40px Arial";
    context.fillText(`P1 Score = ${p1.score}`,10,50)
    context.fillText(`Bot Score = ${bot.score}` ,canvas.width - 320,50)
}

function placeItemLoop(){ 
    dropRate = parseInt(document.getElementById("itemSlider").value);
    if (!itemLoopCalled){ //If item loop has not been called yet, start placing items every x seconds
        itemLoopId = setInterval(function(){
            if (running){ //only place an item if the game is running
                let imgWidth = 70; let imgHeight = 100;
                let itemList = [
                    new Reverser(imgWidth,imgHeight,images[0]),
                    new Multiball(imgWidth,imgHeight,images[1]),
                ]   
                let randomItem = itemList[getRndInteger(0,itemList.length-1)]; //select random item from item array
                screenItems.push(randomItem); 
                randomItem.setRandomPos(); 
            }            
        },dropRate);
    }
    itemLoopCalled = true; //don't recall function if the loop has already been called
}
function preloadImages(subfolder,srcs){ //return array called images which hold image objects, assuming all images are within subfolder
    let images = [];
    for (let i = 0; i<srcs.length; i++){
        images[i] = new Image;
        images[i].src = `${subfolder}/${srcs[i]}`;
    }
    return images
}

function pauseGame(){
    if (running){
        clearInterval(animId);
        running = false;
    }
    else{
        animId = setInterval(mainLoop, fps);
        running = true;
    }
}

function defMouseCtrls(){
    // Mouse Controls
    canvas.onmousemove = function(e){
        let rect = canvas.getBoundingClientRect();
        p1.y = event.y - rect.top - p1.height/2
        // bot.y = event.y - rect.top - bot.height/2
    }
}

function resetScreen(){    
    screenItems = [];
    screenBalls = [new Ball(canvas.width/2, canvas.height/2, 25,-13,5,"black",1)];

}
let canvas = document.getElementById("gameCanvas");
canvas.width = "1000";
canvas.height = "1000";
let context = canvas.getContext("2d");

let p1 = new Paddle (0, 20, 100, "black");
let bot = new Bot (canvas.width - 20, 20, 100, "black");

let images = preloadImages("assets",["reverse.png","multiball.png"])


let screenItems = [];
let screenBalls = [new Ball(canvas.width/2, canvas.height/2, 25,-13,5,"black",1)];




// document.addEventListener('keydown', event =>{
//     console.log(event)
//     if (event.key == "w"){
//         p1.y-= 30
//     } else if (event.key == "s"){
//         p1.y+= 30
//     }
// })


let fps = 1000/60;
defMouseCtrls();
let running = true; //state of game
let itemLoopCalled = false;
let itemLoopId 
let animId = setInterval(mainLoop, fps); //start main loop
