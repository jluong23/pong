class Rect{
    constructor(x,y,width,height,color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    draw(){
        context.fillStyle = this.color;
        context.fillRect(this.x,this.y,this.width,this.height,this.color);
    }
}

class Circle{
    constructor(x,y,r,color){
        this.x = x;
        this.y =y;
        this.r = r;
        this.color = color;
    }

    draw(){
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x,this.y,this.r,0,Math.PI * 2, false);
        context.closePath();
        context.fill();
    }
}

class Item{
    constructor(width,height,image){
        this.width = width;
        this.height = height;
        this.image = image;
    }

    setRandomPos(){
        // this.x = Math.floor(Math.random() * (canvas.width - this.width)) + this.width
        // this.y = Math.floor(Math.random() * (canvas.height - this.height)) + this.height
        this.x = getRndInteger(0,canvas.width-this.width)
        this.y = getRndInteger(0,canvas.height-this.height)
    }

    drawImage(){
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}