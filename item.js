class Reverser extends Item{
    constructor(width,height,image){
        super(width,height,image);
    }

    use(){
        screenBalls[0].rebound(this)
        // alert("test")
        // setTimeout(defMouseCtrls, 5000);
    //     let alreadyRan = false; let initMousePos = 0;
    //     canvas.onmousemove = function(e){
    //         let rect = canvas.getBoundingClientRect();
    //         let mousePos = event.y - rect.top -p1.height/2
    //         if(!alreadyRan){
    //             let initMousePos = mousePos
    //             alreadyRan = true
    //         }
    //         let dPos = mousePos - initMousePos;
    //         p1.y = mousePos + dPos;
    //     }
    }
}

class Speeder extends Item{
    constructor(width,height,image){
        super(width,height,image);
    }

    use(){
        
    }
}

class Multiball extends Item{
    constructor(width,height,image){
        super(width,height,image);
    }

    use(){
        let numBalls = getRndInteger(1,4); //spawn between 1 or 4 balls inclusive
        let numCalls = 0;
        let lastTouched = screenBalls[0].vx > 0 ? players[0] : players[1]; //velocity of black ball
        let dir = lastTouched == players[0] ? 1 : -1; //direction of balls to travel, dependent on player who last touched the ball
        let r = 25; //radius of new balls
        let vx = 10; //speed of new balls
        let x = lastTouched == players[0] ? 0 : canvas.width - r; 
        //starting x value of new balls, dependent on player who last touched the ball
        //if left paddle last touched, set x = 0.
        //if right paddle last touched, set x = canvas.width -r

        let loopId = setInterval(function(){ //loop used to send pink balls at a regular interval
            if (numBalls == numCalls){
                clearInterval(loopId)
            }
            else{
                let y = getRndInteger(r,canvas.height-r);
                screenBalls.push(new Ball(x,y,r,dir * vx,0,"pink",0.5)); //scoreinc of 0.5
                numCalls++
            }
        },1000)
    }
}

class Minifier extends Item{
    constructor(width,height,image){
        super(width,height,image);
    }

    use(){
        
    }
}

class Enlarger extends Item{
    constructor(width,height,image){
        super(width,height,image);
    }

    use(){
        
    }
}
