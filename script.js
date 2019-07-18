function mainLoop(){
    render();
    update();
}

function render(){
    context.clearRect(0,0,canvas.width,canvas.height); //clear screen for each render
    drawNet();
    showText();
    screenItems.forEach(function(item){ //draw all items
        item.drawImage();
    })
    players.forEach(function(player){ //draw all players
        player.draw();
    })
    screenBalls.forEach(function(ball){ //draw all balls
        ball.draw();
    })
}

function update(){
    if (itemsOn){
        placeItemLoop();
    }
    players.forEach(function(player){ //if the class of the player is a bot, move the bot
        
        if(player.name == "Bot"){
            player.move();
        }
    })
    screenBalls.forEach(function(ball){
        ball.x += ball.vx;
        ball.y += ball.vy;
        ball.touchWall() ? ball.vy *= -1 : ball.vy *=1; //If ball touches wall, reverse vertical velocity

        let defender = (ball.x<canvas.width/2) ? players[0] : players[1]; //if ball is on left side of canvas, only left player can hit paddle and vice versa
        let attacker = (ball.x<canvas.width/2) ? players[1]: players[0];

        if (ball.touchRect(defender)){
            ball.rebound(defender);
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
    context.fillText(`${players[0].name} Score = ${players[0].score}`,10,50)
    context.fillText(`${players[1].name} Score = ${players[1].score}` ,canvas.width - 300,50)
    document.getElementById("difficulty").innerHTML = ` Bot level ${document.getElementById("difficultySlider").value}`;
    document.getElementById("droprate").innerHTML = ` Spawn item every ${document.getElementById("itemSlider").value/1000} seconds`;

}

function stopItemLoop(){
    clearInterval(itemLoopId);
    itemLoopCalled = false;
}

function placeItemLoop(sliderChange){ 

    dropRate = parseInt(document.getElementById("itemSlider").value);
    if (sliderChange){
        stopItemLoop();
    }

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

function setPlayerCtrls(){
    players.forEach(function(player){
        if(player.name == "Player"){
            canvas.onmousemove = function(e){
                let rect = canvas.getBoundingClientRect();
                player.y = event.y - rect.top - player.height/2
                // bot.y = event.y - rect.top - bot.height/2
        }}
    })
}

function toggleItems(){
    if(itemsOn){ 
        itemsOn = false;
        screenItems = [];
        stopItemLoop();
    }
    else{
        itemsOn = true;
    }
}
let canvas = document.getElementById("gameCanvas");
canvas.width = "1000";
canvas.height = "1000";
let context = canvas.getContext("2d");


let players = [
    new Player (0,20,100,"black"),
    new Bot (canvas.width - 20, 20, 100, "black")
]

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
let running = true; //state of game
let itemLoopCalled = false;
let itemLoopId 
let itemsOn = true;
setPlayerCtrls();
let animId = setInterval(mainLoop, fps); //start main loop
