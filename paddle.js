class Paddle extends Rect{
    constructor(x,width,height,color){
        let y = canvas.width/2 - width/2;
        super(x,y,width,height,color)
        this.score = 0;
    }
}

class Bot extends Paddle{
    constructor(x,width,height,color){
        super(x,width,height,color)
    }
    findClosestBall(){
        let distances = [];
        let x = this.x; 
        if (screenBalls.length == 1){ //case where only black ball is present
            return screenBalls[0]
        }
        else{
            screenBalls.forEach(function(b){
                let pushVal = b.vx > 0 ? x-b.x : 10000; //if velocity is going towards bot, push value. Else push null placeholder 
                distances.push(pushVal)
                
            })
            let index = distances.indexOf(Math.min(...distances))
            return screenBalls[index]

        }

    }

    move(){
        let b = this.findClosestBall();
        this.difficulty = parseInt(document.getElementById("difficultySlider").value); // from 1 to 10.
        this.y += (b.y -(this.y + this.height/2)) * this.difficulty*0.1 //multiply by 0.1 to range p.difficulty within 0.1 and 1.
    }
}