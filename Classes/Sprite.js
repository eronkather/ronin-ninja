class Sprite{
    constructor({position, velocity,width, height, offset, hit = 10, moviments, scale = 1, frameCropSize = 0, speedFrame, maxSpeedFrame, imageSrc}) {
        console.log(moviments)
        this.position = position
        this.velocity = velocity
        this.width = width
        this.height = height
        this.attack = {
            position: this.position,
            width: 100,
            height: 50,
            offset,
            isAttacking: false,
        },
        this.hit = hit
        this.moviments = moviments
        this.scale = scale,
        this.frameCropSize = frameCropSize
        this.speedFrame = speedFrame
        this.maxSpeedFrame = maxSpeedFrame
        this.image = new Image()
        this.imageSrc = imageSrc
        this.image.src = moviments[imageSrc].src
        this.canJump = true;
        this.images = [];
        this.frames = 8;
        this.imageWidth = 1600;
        this.currentFrame = 1;
        this.jumpCount = 0;

         for (const moviment in this.moviments) {
            this.images[moviment] = new Image()
            this.images[moviment].src = this.moviments[moviment].src
         }
    }

    controll =  {
        a: false,
        d: false,
        w: false,
        f: false
    }

    draw(){
        context.save();
        context.scale(1 * this.scale,1);
        context.drawImage(
            this.image,
            this.frameCropSize, //posição do frame do ninja na posição x 
            //1400, //posição do frame do ninja na posição x 
            0, //Posição do frame do ninja do eixo y
            //this.position.y, //Posição do frame do ninja do eixo y
            this.width, //Distorção do ninja do eixo x para menor
            this.height, // Distorção do ninja do eixo Y para menor
            this.scale * this.position.x - this.width , // Posição do tile eixo X 
            //this.scale ? 600 : -1000 , // Posição do tile eixo X 
            //-1000, // Posição do tile eixo X 
            this.position.y - 45, //Posição do ninja eixo y
            //this.position.y, //Posição do ninja eixo y
            400, // Distorção do ninja eixo X para maior
            400 // Distorção do ninja do eixo Y para maior
            ) 
            context.restore()
            //console.log(this.scale )
            //context.setTransform(1,0,0,1,0,0);
    }
    
    update(){
        this.position.y += this.velocity.y;
        this.position.realY += this.velocity.y;
        this.position.x += this.velocity.x;
        if(this.position.y + this.velocity.y + this.height  >= canvas.height){
            this.velocity.y = 0
            this.canJump = true
            this.jumpCount = 0;
        } else{
            this.velocity.y += gravity;
        }
        if(this.position.x -200 >= canvas.width - this.width - 40){
            this.position.x = canvas.width -40
            if(this.controll.d){
                platform.position.x -= 1
            }
            
        }
        if(this.position.x <= 40){
            if(this.controll.a){
                platform.position.x += 1
            }
            this.position.x = 40
        }
        

        if(this.speedFrame % this.maxSpeedFrame == 0){
            // console.log(this.imageSrc)
            
            let cropWidth = (this.imageWidth / this.frames) * this.currentFrame;
            this.currentFrame++
            if(cropWidth % this.imageWidth ===0)
            this.currentFrame = 1

            this.frameCropSize = cropWidth - this.imageWidth / this.frames;
            this.speedFrame = 1
        }
        this.speedFrame++ 
        this.draw();
    }
}