class Hero extends Sprite {

    
    static moviments = {
        Idle: {
            src: 'Idle.png',
            frames: 8,
            width: 1600,
            currentFrame: 1,
            widthBetweenFrames: 200,
            height: 200,
            layer: 4
        },
        Run: {
            src: 'Run.png',
            frames: 8,
            width: 1600,
            currentFrame: 1
        },
        Jump: {
            src: 'Jump.png',
            frames: 2,
            width: 400,
            currentFrame: 1
        },
        Fall: {
            src: 'Fall.png',
            frames: 2,
            width: 400,
            currentFrame: 1
        },
        Attack1: {
            src: 'Attack1.png',
            frames: 6,
            width: 1200,
            currentFrame: 1
        },
        Attack2: {
            src: 'Attack2.png',
            frames: 6,
            width: 1200,
            currentFrame: 1
        }
    };
     

    constructor(position, velocity,width, height, offset, hit = 10, moviments , scale = 1, frameCropSize = 0, speedFrame, maxSpeedFrame, imageSrc = 'Idle') {  
        super(position, velocity, width, height, offset, hit, moviments, scale, frameCropSize, speedFrame, maxSpeedFrame, imageSrc);
     }   


}
