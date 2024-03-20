class Platform{
    
    constructor(x, y, width, height){
        this.position = {
            x: x,
            y: y
        }
        this.startPosition = {
            x: x,
            y: y
        }
        this.width = width
        this.height = height
    }



    draw() {
        console.log(this.position)
        context.fillStyle = 'yellow';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
    }

}

