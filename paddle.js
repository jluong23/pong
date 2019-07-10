class Paddle {
    constructor(x,width,height,color){
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = canvas.width/2 - this.width/2;
        this.score = 0;
    }

    draw(){
        context.fillStyle = this.color;
        context.fillRect(this.x,this.y,this.width,this.height,this.color);
    }

    // movePaddle(dir, )
}

class Bot extends Paddle{
    constructor(x,width,height,color){
        super(x,width,height,color)
    }

    move(b,p){
        if (Math.abs(b.y - p.y +p.height / 2) < 5){ //If the ball and middle of paddle are within 50px on y coordinate, stop moving
            this.vy =0;
        }
        else{
            bot.vy =parseInt(document.getElementById("difficultySlider").value);
            b.y > p.y + p.height/2 ? p.y += p.vy : p.y -=p.vy //if ball is below bot paddle, move down, else up
        }
    }
}