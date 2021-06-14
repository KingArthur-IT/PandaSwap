class SceneObj{
    constructor(description, sx, sy, px, py, w, h, alfa, i) {
        this.start = { x: sx, y: sy };
        this.position = { x: px, y: py };
        this.velocity = { x: 0, y: 0 };
        this.startAngle = alfa;
        this.angle = alfa;
        this.id = i;
        this.width = w;
        this.height = h;
        this.description = description;
    }
    move() {
        //mouse displacement
        let dx = this.position.x - this.start.x
        let dy = this.position.y - this.start.y

        dx = dx > 100 ? dx * 0.001 : dx * 0.01
        dy = dy > 100 ? dy * 0.001 : dy * 0.01
        //add to velocity
        this.velocity.x += dx 
        this.velocity.y += dy 
        
        //avoid trembling
        if (Math.abs(this.position.x - this.start.x) < 2.0 && Math.abs(this.position.y - this.start.y) < 2.0 &&
        Math.abs(this.velocity.x) < 0.5 && Math.abs(this.velocity.y) < 0.5) {
            this.position.x = this.start.x;
            this.position.y = this.start.y;
        }

        //change position ans angle
        this.position.x -= 0.1 * this.velocity.x;
        this.position.y -= 0.1 * this.velocity.y;
        this.angle -= (this.angle - this.startAngle) * 0.01;
        //style
        document.getElementById(this.description + this.id).style.top = this.position.y + 'px'
        document.getElementById(this.description + this.id).style.left = this.position.x + 'px'
        document.getElementById(this.description + this.id).style.transform = 'rotate(' + this.angle + 'deg)'
        //velocity fading
        this.velocity.x *= 0.99
        this.velocity.y *= 0.99
    }
    addVelocity(vx, vy) {
        this.velocity.x += vx * 0.5
        this.velocity.y += vy * 0.5

        this.angle += Math.sqrt(vx*vx+vy*vy) * 0.4
    }
}

let mouse = {
    start: { x: 0, y: 0 },
    end: {x: 0, y: 0}
}

const pandaPositionX = [0.05, 0.32, 0.5, 0.68, 0.85]
const pandaPositionY = [0.78, 0.65, 0.8, 0.6, 0.8] 
const pandaAngle = [-25, 20, -120, 0, 40]
const pandaImgSrc = './img/panda.png';
const pandaSize = 172;
let pandasArray = [];

const pandaBackPositionX = [-0.04, 0.25, 0.95]
const pandaBackPositionY = [0.6, 0.9, 0.6] 
const pandaBackAngle = [-100, 0, -100]
const pandaBackImgSrc = './img/pandaBack.png';
const pandaBackSize = 172;
let pandasBackArray = [];

const bambooShortPositionX = [0.05, 0.25, 0.74]
const bambooShortPositionY = [0.68, 0.82, 0.9] 
const bambooShortAngle = [-50, 0, 20]
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


const LOGOSRC = './img/logo.svg';
const MINILOGOSRC = './img/miniLogo.svg';

window.onload = () => {
    if (window.innerWidth < 450) {
        document.getElementsByClassName('navbar__img')[0].src = MINILOGOSRC;
    }
    initScene(false);
    addObjTages();
    editStyle();
    loop();
}
//loop
function loop() {
    pandasArray.forEach(i => {
        i.move();
    });
    pandasBackArray.forEach(i => {
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
    objMove(mouse.end.x - mouse.start.x, mouse.end.y - mouse.start.y);   
}
function touch_move_handler(e) {
    let evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
    let touch = evt.touches[0] || evt.changedTouches[0];

    mouse.end.x = mouse.start.x
    mouse.end.y = mouse.start.y
    mouse.start.x = touch.pageX
    mouse.start.y = touch.pageY
    if (mouse.end.x == 0 && mouse.end.y == 0) return
    objMove(0.5 * (mouse.end.x - mouse.start.x), 0.5 * (mouse.end.y - mouse.start.y));    
}

function objMove(dx, dy) {
    //for panda
    for (let index = 0; index < pandasArray.length; index++) {
        const panda = pandasArray[index];
        let centerX = panda.position.x + panda.width * 0.4
        let centerY = panda.position.y + panda.height * 0.4
        if (Math.abs(centerX - mouse.end.x) < 80 &&
            Math.abs(centerY - mouse.end.y) < 100)
        {
            panda.addVelocity(dx, dy)
        }
    }
    //for back panda
    for (let index = 0; index < pandasBackArray.length; index++) {
        const panda = pandasBackArray[index];
        let centerX = panda.position.x + panda.width * 0.4
        let centerY = panda.position.y + panda.height * 0.4
        if (Math.abs(centerX - mouse.end.x) < 80 &&
            Math.abs(centerY - mouse.end.y) < 100)
        {
            panda.addVelocity(dx, dy)
        }
    }
    //for short bamboo
    for (let index = 0; index < bambooShortsArray.length; index++) {
        const bambooShort = bambooShortsArray[index];
        if (mouse.end.x > bambooShort.position.x && mouse.end.x < bambooShort.position.x + 2.0*bambooShort.width &&
            mouse.end.y > bambooShort.position.y && mouse.end.y < bambooShort.position.y + 2.0*bambooShort.height)
        {
            bambooShort.addVelocity(dx, dy)
        }
    }
    //for long bamboo
    for (let index = 0; index < bambooLongArray.length; index++) {
        const bambooLong = bambooLongArray[index];
        if (mouse.end.x > bambooLong.position.x && mouse.end.x < bambooLong.position.x + bambooLong.width &&
            mouse.end.y > bambooLong.position.y && mouse.end.y < bambooLong.position.y + bambooLong.height)
        {
            bambooLong.addVelocity(dx, dy)
        }
    }
}

function initScene(notChangePosition) {
    pandasArray.length = [];
    pandasBackArray.length = [];
    bambooShortsArray.length = [];
    bambooLongArray.length = [];

    let width = document.querySelector('.header').getBoundingClientRect().width,
        height = document.querySelector('.header').getBoundingClientRect().height,
        koeff = height < width ? (height > 1024 ? 1.0 : 1.0 - (1024 - height) / 1200) : (width > 1440 ? 1.0 : 1.0 - (1440 - width) / 1600)
    //create pandas
    for (let index = 0; index < pandaPositionX.length; index++) {
        pandasArray.push(new SceneObj(
            'panda',
            width * pandaPositionX[index],
            height * (pandaPositionY[index] + (1.0 - koeff) * 0.15),
            notChangePosition ? width * pandaPositionX[index] : Math.random() * width,
            notChangePosition ? height * (pandaPositionY[index] + (1.0 - koeff) * 0.15) : height + 200.0,
            koeff * pandaSize,
            koeff * pandaSize,
            pandaAngle[index], index)
        )
    }
    //create back pandas
    for (let index = 0; index < pandaBackPositionX.length; index++) {
        pandasBackArray.push(new SceneObj(
            'pandaBack',
            width * pandaBackPositionX[index],
            height * (pandaBackPositionY[index] + (1.0 - koeff) * 0.15),
            notChangePosition ? width * pandaBackPositionX[index] : Math.random() * width,
            notChangePosition ? height * (pandaBackPositionY[index] + (1.0 - koeff) * 0.15) : height + 200.0,
            koeff * pandaBackSize,
            koeff * pandaBackSize,
            pandaBackAngle[index], index)
        )
    }
    //create short bamboo
    for (let index = 0; index < bambooShortPositionX.length; index++) {
        bambooShortsArray.push(new SceneObj(
            'bambooShort',
            width * bambooShortPositionX[index],
            height * (bambooShortPositionY[index] + (1.0 - koeff) * 0.15),
            notChangePosition ? width * bambooShortPositionX[index] : Math.random() * width,
            notChangePosition ? height * (bambooShortPositionY[index] + (1.0 - koeff) * 0.15) : height + 200.0,
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
            height * (bambooLongPositionY[index] + (1.0 - koeff) * 0.15),
            notChangePosition ? width * bambooLongPositionX[index] : Math.random() * width,
            notChangePosition ? height * (bambooLongPositionY[index] + (1.0 - koeff) * 0.15) : height + 200.0,
            koeff * bambooLongSizeX,
            koeff * bambooLongSizeY,
            bambooLongAngle[index], index)
        )
    }
}
var headerWidth = document.getElementsByClassName('header')[0].clientWidth;
window.addEventListener('resize', () => {
    //clange logo in nav bar to mini in moblie
    if (window.innerWidth < 450)
        document.getElementsByClassName('navbar__img')[0].src = MINILOGOSRC;        
    else document.getElementsByClassName('navbar__img')[0].src = LOGOSRC;
    //only width resize
    let newHeaderWidth = document.getElementsByClassName('header')[0].clientWidth;
    if (newHeaderWidth !== headerWidth)
    { initScene(true); editStyle(); headerWidth = newHeaderWidth;}
});

function addObjTages() {
    for (let index = 0; index < pandaPositionX.length; index++) {
        document.querySelector('.header').innerHTML += '<img src="' + pandaImgSrc + '" alt="panda" class="sceneObj" id = "panda' + index + '">';
    }
    for (let index = 0; index < pandaBackPositionX.length; index++) {
        document.querySelector('.header').innerHTML += '<img src="' + pandaBackImgSrc + '" alt="panda" class="sceneObj" id = "pandaBack' + index + '">';
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
    pandasBackArray.forEach(i => {
        document.getElementById('pandaBack' + i.id).style.width = i.width + 'px'
        document.getElementById('pandaBack' + i.id).style.height = i.height + 'px'
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