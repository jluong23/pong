class Ball extends Circle{
    constructor(x,y,r,vx,vy,color,scoreInc){
        super(x,y,r,color);
        this.vx = vx;
        this.vy = vy; // +vy == downward motion
        this.speed = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
        this.speedInc = 0.2;
        this.scoreInc = scoreInc;
    }


    touchRect(rect){
        let closestX = Math.max(rect.x, Math.min(this.x, rect.x + rect.width)) 
        let closestY = Math.max(rect.y, Math.min(this.y, rect.y + rect.height)) //closest coordinates from paddle to circle
        let dx = this.x - closestX
        let dy = this.y - closestY 
        return (dx*dx + dy*dy < this.r*this.r) //if closest point is within circle, must be intersecting
    }

    rebound(p){
        let normCollisionPoint = (this.y - (p.y + p.height/2))/p.height/2; //collision on paddle: top = -1, mid = 0, bot = 1
        let angle = normCollisionPoint * Math.PI
        let dir = (this.x<canvas.width/2) ? 1 : -1;
        this.vx = dir * Math.cos(angle) * this.speed
        this.vy = Math.sin(angle) * this.speed
        this.speed+= this.speedInc
    }

    touchWall(){
        return this.y > canvas.height - this.r || this.y < this.r
        // If ball touches wall, return true
    }

    reset(scorer){ //reinit ball instance attributes when scored. scorer parameter is the object of the scorer
        let dir = 1;
        if (scorer.x < canvas.width / 2){ //if the left side scored, set direction to -1
            dir = -1;
        }
        this.x = canvas.width / 2   
        this.y = canvas.height / 2
        this.vx = dir* 15
        this.vy = 5
        this.speed = Math.sqrt(this.vx*this.vx+this.vy*this.vy)
    }

    isOut(){
        if (this.x < 0 || this.x > canvas.width){
            return true
        }
        return false
    }
}