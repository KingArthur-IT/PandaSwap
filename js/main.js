class SceneObj{
    constructor(description, x, y, w, h, alfa, i) {
        this.start = { x: x, y: y };
        this.position = { x: x, y: y };
        this.velocity = { x: 0, y: 0 };
        this.startAngle = alfa;
        this.angle = alfa;
        this.id = i;
        this.width = w;
        this.height = h;
        this.description = description;
    }
    move() {
        this.velocity.x += (this.position.x - this.start.x) * 0.001
        this.velocity.y += (this.position.y - this.start.y) * 0.001

        let headerW = document.querySelector('.header').getBoundingClientRect().width,
            headerH = document.querySelector('.header').getBoundingClientRect().height
        headerW -= this.width
        headerH -= this.height
        
        if (this.position.x < 0 || this.position.x > headerW || this.position.y < 0 || this.position.y > headerH) {
            this.collide();
        }
        if (this.position.x < 0) this.position.x = 0
        if (this.position.x > headerW) this.position.x = headerW
        if (this.position.y > headerH) this.position.y = headerH
        if (this.position.y < 0) this.position.y = 0
        
        this.position.x -= 0.1 * this.velocity.x;
        this.position.y -= 0.1 * this.velocity.y;

        this.angle -= (this.angle - this.startAngle) * 0.01;
        //style
        document.getElementById(this.description + this.id).style.top = this.position.y + 'px'
        document.getElementById(this.description + this.id).style.left = this.position.x + 'px'
        document.getElementById(this.description + this.id).style.transform = 'rotate(' + this.angle + 'deg)'
        
        this.velocity.x *= 0.985
        this.velocity.y *= 0.985
    }
    addVelocity(vx, vy) {
        this.velocity.x += vx * 0.5
        this.velocity.y += vy * 0.5
        this.angle += Math.sqrt(vx*vx+vy*vy) * 0.2
    }
    collide() {
        this.velocity.x *= -1
        this.velocity.y *= -1
    }
}

let mouse = {
    start: { x: 0, y: 0 },
    end: {x: 0, y: 0}
}

const pandaPositionX = [0.08, 0.5, 0.3, 0.69, 0.9]
const pandaPositionY = [0.8,  0.87, 0.7, 0.55, 0.85] 
const pandaAngle = [0, -20, -120, 20, 45]
const pandaImgSrc = './img/panda.png';
const pandaSize = 172;
let pandasArray = [];

const bambooShortPositionX = [0.25, 0.01, 0.8]
const bambooShortPositionY = [0.9, 0.8, 0.9] 
const bambooShortAngle = [0, 50, 20]
const bambooShortImgSrc = './img/bambooShort.png';
const bambooShortSizeX = 155;
const bambooShortSizeY = 48;
let bambooShortsArray = [];

const bambooLongPositionX = [0.8, 0.55]
const bambooLongPositionY = [0.6, 0.55] 
const bambooLongAngle = [135, 20]
const bambooLongImgSrc = './img/bambooLong.png';
const bambooLongSizeX = 126;
const bambooLongSizeY = 204;
let bambooLongArray = [];

window.onload = () => {
    let width = document.querySelector('.header').getBoundingClientRect().width,
        height = document.querySelector('.header').getBoundingClientRect().height
    //create pandas
    for (let index = 0; index < pandaPositionX.length; index++) {
        pandasArray.push(new SceneObj(
            'panda',
            width * pandaPositionX[index],
            height * pandaPositionY[index],
            pandaSize,
            pandaSize,
            pandaAngle[index], index)
        )
        //add tag
        document.querySelector('.header').innerHTML += '<img src="' + pandaImgSrc + '" alt="panda" class="sceneObj" id = "panda' + index + '">';
        //style
        document.getElementById('panda' + index).style.top = pandasArray[pandasArray.length - 1].position.y + 'px'
        document.getElementById('panda' + index).style.left = pandasArray[pandasArray.length - 1].position.x + 'px'
        document.getElementById('panda' + index).style.transform = 'rotate(' + pandaAngle[index] + 'deg)'
        document.getElementById('panda' + index).style.width = pandaSize + 'px'
        document.getElementById('panda' + index).style.height = pandaSize + 'px'
    }
    //create short bamboo
    for (let index = 0; index < bambooShortPositionX.length; index++) {
        bambooShortsArray.push(new SceneObj(
            'bambooShort',
            width * bambooShortPositionX[index],
            height * bambooShortPositionY[index],
            bambooShortSizeX,
            bambooShortSizeY,
            bambooShortAngle[index], index)
        )
        //add tag
        document.querySelector('.header').innerHTML += '<img src="' + bambooShortImgSrc + '" alt="bamboo" class="sceneObj" id = "bambooShort' + index + '">';
        //style
        document.getElementById('bambooShort' + index).style.top = bambooShortsArray[bambooShortsArray.length - 1].position.y + 'px'
        document.getElementById('bambooShort' + index).style.left = bambooShortsArray[bambooShortsArray.length - 1].position.x + 'px'
        document.getElementById('bambooShort' + index).style.transform = 'rotate(' + bambooShortAngle[index] + 'deg)'
        document.getElementById('bambooShort' + index).style.width = bambooShortSizeX + 'px'
        document.getElementById('bambooShort' + index).style.height = bambooShortSizeY + 'px'
    }
    //create long bamboo
    for (let index = 0; index < bambooLongPositionX.length; index++) {
        bambooLongArray.push(new SceneObj(
            'bambooLong',
            width * bambooLongPositionX[index],
            height * bambooLongPositionY[index],
            bambooLongSizeX,
            bambooLongSizeY,
            bambooLongAngle[index], index)
        )
        //add tag
        document.querySelector('.header').innerHTML += '<img src="' + bambooLongImgSrc + '" alt="bamboo" class="sceneObj" id = "bambooLong' + index + '">';
        //style
        document.getElementById('bambooLong' + index).style.top = bambooLongArray[bambooLongArray.length - 1].position.y + 'px'
        document.getElementById('bambooLong' + index).style.left = bambooLongArray[bambooLongArray.length - 1].position.x + 'px'
        document.getElementById('bambooLong' + index).style.transform = 'rotate(' + bambooLongAngle[index] + 'deg)'
        document.getElementById('bambooLong' + index).style.width = bambooLongSizeX + 'px'
        document.getElementById('bambooLong' + index).style.height = bambooLongSizeY + 'px'
    }
    //loop
    function loop() {
        pandasArray.forEach(i => {
            i.move();
        });
        bambooShortsArray.forEach(i => {
            i.move();
        });
        bambooLongArray.forEach(i => {
            i.move();
        });
        requestAnimationFrame(loop)
    }
    loop();
}

document.addEventListener("mousemove", mouse_move_handler);
function mouse_move_handler(e) {
    mouse.end.x = mouse.start.x
    mouse.end.y = mouse.start.y
    mouse.start.x = e.x
    mouse.start.y = e.y
    //for panda
    for (let index = 0; index < pandasArray.length; index++) {
        const panda = pandasArray[index];
        let centerX = panda.position.x + panda.width * 0.4
        let centerY = panda.position.y + panda.height * 0.4
        if (Math.abs(centerX - e.x) < 80 &&
            Math.abs(centerY - e.y) < 100)
        {
            panda.addVelocity(mouse.end.x - mouse.start.x, mouse.end.y - mouse.start.y)
        }
    }
    //for short bamboo
    for (let index = 0; index < bambooShortsArray.length; index++) {
        const bambooShort = bambooShortsArray[index];
        if (e.x > bambooShort.position.x && e.x < bambooShort.position.x + bambooShort.width &&
            e.y > bambooShort.position.y && e.y < bambooShort.position.y + bambooShort.height)
        {
            bambooShort.addVelocity(mouse.end.x - mouse.start.x, mouse.end.y - mouse.start.y)
        }
    }
    //for long bamboo
    for (let index = 0; index < bambooLongArray.length; index++) {
        const bambooLong = bambooLongArray[index];
        if (e.x > bambooLong.position.x && e.x < bambooLong.position.x + bambooLong.width &&
            e.y > bambooLong.position.y && e.y < bambooLong.position.y + bambooLong.height)
        {
            bambooLong.addVelocity(mouse.end.x - mouse.start.x, mouse.end.y - mouse.start.y)
        }
    }
}