class Ball {
    constructor(r,vx,vy,color){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.r = r;
        this.vx = vx;
        this.vy = vy; // +vy == downward motion
        this.speed = Math.sqrt(this.vx*this.vx + this.vy*this.vy)
        this.color = color;
    }

    draw(){
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x,this.y,this.r,0,Math.PI * 2, false);
        context.closePath();
        context.fill();
    }

    touchPaddle(p, b){
        p.top = p.y;
        p.bot = p.y + p.height;
        p.left = p.x;
        p.right = p.x + p.width;

        b.top = b.y - b.r
        b.bot = b.y + b.r
        b.left = b.x - b.r
        b.right = b.x + b.r
        
        return b.bot > p.top && b.top < p.bot && b.right > p.left && b.left < p.right
    }


    touchWall(){
        return this.y > canvas.height - this.r || this.y < this.r
        // If ball touches wall, return true
    }

    reset(dir){

        window.ball = new Ball(25,dir * 15,5,"black");
    }
}