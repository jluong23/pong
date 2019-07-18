class Paddle extends Rect{
    constructor(x,width,height,color){
        let y = canvas.width/2 - width/2;
        super(x,y,width,height,color)
        this.score = 0;
    }
}

class Player extends Paddle{
    constructor(x,width,height,color){
        super(x,width,height,color)
        this.name = "Player";
    }
}

class Bot extends Paddle{
    constructor(x,width,height,color){
        super(x,width,height,color)
        this.name = "Bot";
        if (this.x < canvas.width/2){
            this.pos = "left";
        }
        else{
            this.pos = "right";
        }
    }
    findClosestBall(){
        let distances = [];
        let x = this.x; 
        let pos = this.pos;

        if (screenBalls.length == 1){ //case where only black ball is present
            return screenBalls[0]
        }
        else{
            screenBalls.forEach(function(b){
                let pushVal
                if (pos == "left"){
                    pushVal = b.vx < 0 ? Math.abs(x-b.x) : canvas.width*2; 
                }
                else{
                    pushVal = b.vx > 0 ? Math.abs(x-b.x) : canvas.width*2; 
                }
                //if velocity is going towards bot, push distance value from ball to bot. 
                //if ball is going away from bot, push a large value of distance so the bot won't travel towards that ball.
                distances.push(pushVal)
            })
            let index = distances.indexOf(Math.min(...distances)) //index of closest ball is minimum index of distances array
            return screenBalls[index]
        }
    }

    move(){
        let b = this.findClosestBall();
        this.difficulty = parseInt(document.getElementById("difficultySlider").value); // from 1 to 5.
        let dh = b.y - (this.y + this.height/2) //difference in height between closest ball and paddle
        this.y += dh * this.difficulty*0.1 //multiply to keep within difficulty 0.1 and 0.5
    }
}