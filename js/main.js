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

        if (Math.abs(this.position.x - this.start.x) < 3.0 && Math.abs(this.position.y - this.start.y) < 3.0) {
            this.position.x = this.start.x;
            this.position.y = this.start.y;
        }

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
    
        this.velocity.x *= 0.99
        this.velocity.y *= 0.99

    }
    addVelocity(vx, vy) {
        this.velocity.x += vx
        this.velocity.y += vy

        if (this.velocity.x > 0.1) this.velocity.x = 0.1
        if (this.velocity.y > 0.1) this.velocity.y = 0.1
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

const pandaPositionX = [0.05, 0.5, 0.3, 0.69, 0.88]
const pandaPositionY = [0.78,  0.78, 0.75, 0.6, 0.77] 
const pandaAngle = [0, -20, -120, 20, 45]
const pandaImgSrc = './img/panda.png';
const pandaSize = 172;
let pandasArray = [];

const bambooShortPositionX = [0.25, 0.01, 0.74]
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
    initScene();
    addObjTages();
    editStyle();
    loop();
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
    
document.addEventListener("mousemove", mouse_move_handler);
document.addEventListener("touchmove", touch_move_handler); 
function mouse_move_handler(e) {
    mouse.end.x = mouse.start.x
    mouse.end.y = mouse.start.y
    mouse.start.x = e.x
    mouse.start.y = e.y
    if (mouse.end.x == 0 && mouse.end.y == 0) return
    objMove();   
}
function touch_move_handler(e) {
    let evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
    let touch = evt.touches[0] || evt.changedTouches[0];

    mouse.end.x = mouse.start.x
    mouse.end.y = mouse.start.y
    mouse.start.x = touch.pageX
    mouse.start.y = touch.pageY
    if (mouse.end.x == 0 && mouse.end.y == 0) return
    objMove();    
}

function objMove() {
    //for panda
    for (let index = 0; index < pandasArray.length; index++) {
        const panda = pandasArray[index];
        let centerX = panda.position.x + panda.width * 0.4
        let centerY = panda.position.y + panda.height * 0.4
        if (Math.abs(centerX - mouse.start.x) < 80 &&
            Math.abs(centerY - mouse.start.y) < 100)
        {
            panda.addVelocity(mouse.end.x - mouse.start.x, mouse.end.y - mouse.start.y)
        }
    }
    //for short bamboo
    for (let index = 0; index < bambooShortsArray.length; index++) {
        const bambooShort = bambooShortsArray[index];
        if (mouse.start.x > bambooShort.position.x && mouse.start.x < bambooShort.position.x + 2.0*bambooShort.width &&
            mouse.start.y > bambooShort.position.y && mouse.start.y < bambooShort.position.y + 2.0*bambooShort.height)
        {
            bambooShort.addVelocity(mouse.end.x - mouse.start.x, mouse.end.y - mouse.start.y)
        }
    }
    //for long bamboo
    for (let index = 0; index < bambooLongArray.length; index++) {
        const bambooLong = bambooLongArray[index];
        if (mouse.start.x > bambooLong.position.x && mouse.start.x < bambooLong.position.x + bambooLong.width &&
            mouse.start.y > bambooLong.position.y && mouse.start.y < bambooLong.position.y + bambooLong.height)
        {
            bambooLong.addVelocity(mouse.end.x - mouse.start.x, mouse.end.y - mouse.start.y)
        }
    }
}

function initScene() {
    pandasArray.length = [];
    bambooShortsArray.length = [];
    bambooLongArray.length = [];

    let width = document.querySelector('.header').getBoundingClientRect().width,
        height = document.querySelector('.header').getBoundingClientRect().height,
        koeff = height < width ? (height > 1024 ? 1.0 : 1.0 - (1024 - height) / 1024) : (width > 1440 ? 1.0 : 1.0 - (1440 - width) / 1440)
    //create pandas
    for (let index = 0; index < pandaPositionX.length; index++) {
        pandasArray.push(new SceneObj(
            'panda',
            width * pandaPositionX[index],
            height * (pandaPositionY[index] + (1 - koeff) * 0.15),
            koeff * pandaSize,
            koeff * pandaSize,
            pandaAngle[index], index)
        )
    }
    //create short bamboo
    for (let index = 0; index < bambooShortPositionX.length; index++) {
        bambooShortsArray.push(new SceneObj(
            'bambooShort',
            width * bambooShortPositionX[index],
            height * (bambooShortPositionY[index] + (1 - koeff) * 0.15),
            koeff * bambooShortSizeX,
            koeff * bambooShortSizeY,
            bambooShortAngle[index], index)
        )
    }
    //create long bamboo
    for (let index = 0; index < bambooLongPositionX.length; index++) {
        bambooLongArray.push(new SceneObj(
            'bambooLong',
            width * bambooLongPositionX[index],
            height * (bambooLongPositionY[index] + (1 - koeff) * 0.15),
            koeff * bambooLongSizeX,
            koeff * bambooLongSizeY,
            bambooLongAngle[index], index)
        )
    }
}
window.addEventListener('resize', () => { initScene(); editStyle(); });

function addObjTages() {
    for (let index = 0; index < pandaPositionX.length; index++) {
        document.querySelector('.header').innerHTML += '<img src="' + pandaImgSrc + '" alt="panda" class="sceneObj" id = "panda' + index + '">';
    }
    for (let index = 0; index < bambooShortPositionX.length; index++) {
        document.querySelector('.header').innerHTML += '<img src="' + bambooShortImgSrc + '" alt="bamboo" class="sceneObj" id = "bambooShort' + index + '">';
    }
    for (let index = 0; index < bambooLongPositionX.length; index++) {
        document.querySelector('.header').innerHTML += '<img src="' + bambooLongImgSrc + '" alt="bamboo" class="sceneObj" id = "bambooLong' + index + '">';
    }
}

function editStyle() {
    pandasArray.forEach(i => {
        document.getElementById('panda' + i.id).style.width = i.width + 'px'
        document.getElementById('panda' + i.id).style.height = i.height + 'px'
    });
    bambooShortsArray.forEach(i => {
        document.getElementById('bambooShort' + i.id).style.width = i.width + 'px'
        document.getElementById('bambooShort' + i.id).style.height = i.height + 'px'
    });
    bambooLongArray.forEach(i => {
        document.getElementById('bambooLong' + i.id).style.width = i.width + 'px'
        document.getElementById('bambooLong' + i.id).style.height = i.height + 'px'
    });
}