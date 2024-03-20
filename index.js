const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

context.fillStyle = 'black';
context.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.5;

const hero = new Hero({
    position: {
        x:150,
        y:0,
    },
    velocity: {
        x:0,
        y:0
    },
    width:200,
    height: 200,
    offset:{
        x: 0,
        y: 0
    },
    hit :10,
    moviments: Hero.moviments,
    scale: 1,
    speedFrame: 1,
    maxSpeedFrame: 8,
    imageSrc: 'Idle'
});

const plattformPositions = [
    [100, 250,200,20],
    [400, 200, 200,20],
    [500, 350, 200,20],
    [550, 500, 200,20],
]

const plattforms = []

for (const plattformPosition of plattformPositions) {
    console.log(plattformPosition.join(','))
    plattforms.push(new Platform(...plattformPosition))
}

// const enemy = new Sprite({
//     position: {
//         x:600,
//         y:0
//     },
//     velocity: {
//         x:0,
//         y:0
//     },
//     width:200,
//     height: 200,
//     offset:{
//         x: 0,
//         y: 0
//     },
//     hit :10,
//     moviments: moviments,
//     scale: 1,
//     speedFrame: 1,
//     maxSpeedFrame: 5,
//     imageSrc: 'Idle'
// })

function changeMoviments(moviment){
    
    if(hero.image == undefined){
        return false
    }
    // console.log(hero.currentFrame)
    if(hero.images.Attack1 == hero.image && hero.currentFrame != 6)  {
        return false;
    }

    switch (moviment) {
        
        case "Attack1":
                    // console.log(hero.images.Attack1)
                if(hero.image != hero.images.Attack1){
                    hero.image = hero.images.Attack1;
                    hero.frames = Hero.moviments['Attack1'].frames;
                    hero.currentFrame = 1;
                    hero.imageWidth = Hero.moviments['Attack1'].width;
                    // console.log(hero.image)
                }
                break;
            case "Jump":
                if(hero.image != hero.images.Jump){
                    hero.image = hero.images.Jump;
                    hero.frames = Hero.moviments['Jump'].frames;
                    hero.currentFrame = 1;
                    hero.imageWidth = Hero.moviments['Jump'].width;
                }
                break;
            case "Fall":
                if(hero.image !=hero.images.Fall){
                    hero.image = hero.images.Fall;
                    hero.frames = Hero.moviments['Fall'].frames;
                    hero.currentFrame = 1;
                    hero.imageWidth = Hero.moviments['Fall'].width;        
                }
                break;
            case "Idle":
                if(hero.image !=hero.images.Idle && hero.velocity.y == 0){
                    hero.image = hero.images.Idle;
                    hero.frames = Hero.moviments['Idle'].frames;
                    hero.currentFrame = 1;
                    hero.imageWidth = Hero.moviments['Idle'].width;   
                }
                break;
            case "Run":
                if(hero.image != hero.images.Run && hero.velocity.y == 0){
                    hero.image = hero.images.Run;
                    hero.frames = Hero.moviments['Run'].frames;
                    hero.currentFrame = 1;
                    hero.imageWidth = Hero.moviments['Run'].width;
                }    
                break;
        }
}

window.addEventListener('keydown', (e) => {
    
    switch (e.key) {
        case 'd':
            hero.controll.d = true;
        break;
        case 'a':
            hero.controll.a = true;
        break;
        case 'w':
            if(hero.jumpCount < 2){
                hero.velocity.y = -13;
                hero.jumpCount++;
            }
            break;
        case 'f':
            hero.controll.f = true;
            changeMoviments('Attack1');
        break;
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'd':
            hero.controll.d = false;
        break;
        case 'a':
            hero.controll.a = false;
        break;
        case 'f':
            hero.controll.f = false;
            
        break;
    }
})

function animate(){

    window.requestAnimationFrame(animate);

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (i in plattforms){
        plattforms[i].update();
    }

    //platform.update()
    
    hero.update();
    // enemy.update();
//    console.log(hero.position.x,  hero.width ,platform.position.x ,platform.width )

    //Lógica da plataforma para o heroi ficar em cima e lógica da queda
    for (let i = 0; i < plattforms.length; i++) {
        if(hero.position.y + hero.height + hero.velocity.y + plattforms[i].height >= plattforms[i].position.y + plattforms[i].height &&
            hero.position.y + hero.height + plattforms[i].height <= plattforms[i].position.y + plattforms[i].height &&
            hero.position.x + hero.width >= plattforms[i].height + plattforms[i].position.x + plattforms[i].width  &&
            hero.position.x <= plattforms[i].position.x + plattforms[i].width 
            
            ) {
                
            //hero.position.y =  hero.position.y - 5
            hero.velocity.y = 0
            hero.canJump = true
            hero.jumpCount = 0;
        }
        
    }
    

    
    if (hero.controll.a) {
        changeMoviments("Run")
        hero.velocity.x = -5
        hero.scale = -1

    } else if(hero.controll.d){
        changeMoviments("Run")
        hero.velocity.x = 5
        hero.scale = 1
    } else{
        changeMoviments("Idle")
        hero.velocity.x = 0;
    }
    

    if(hero.velocity.y > 0){
        // console.log(hero.position.y)
        changeMoviments("Fall")
        
    } else if(hero.velocity.y < 0) {
        changeMoviments("Jump")
    }
    // zGWu&i@&yT6jgs#
    // https://e-gov.betha.com.br/cdweb/03114-396/contribuinte/main.faces
    if(hero.position.y <= -100 && hero.velocity.y < 0 ){
        
        // platform.position.y += 6
    }
    
    if(hero.image == hero.images.Fall && hero.position.y < 0 && platform.position.y > platform.startPosition.y){
         console.log(hero.position.y)
         platform.position.y -= 6
    }

    
    if(hero.position.y <= -100 ){
        hero.position.y = -100
    }

    


    // if (
    //     hero.attack.position.x + hero.attack.width  >= enemy.position.x - enemy.width && 
    //     hero.attack.position.x <= enemy.position.x + enemy.width   &&
    //     hero.attack.position.y + hero.attack.height >= enemy.position.y &&
    //     hero.attack.position.y - hero.attack.height <= enemy.position.y &&
    //     hero.attack.isAttacking
    //    ){
        
    // }

    // heroAttack();

    if(hero.controll.f === true){
        hero.attack.isAttacking = true;
    }
}

animate();