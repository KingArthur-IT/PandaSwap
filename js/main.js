class Panda{
    constructor(x, y, alfa, i) {
        this.start = { x: x, y: y };
        this.position = { x: x, y: y };
        this.velocity = { x: 0, y: 0 };
        this.startAngle = alfa;
        this.angle = alfa;
        this.id = i;
        this.radius = 172;
    }
    move() {
        this.velocity.x += (this.position.x - this.start.x) * 0.001
        this.velocity.y += (this.position.y - this.start.y) * 0.001


        let w = document.querySelector('.header').getBoundingClientRect().width,
            h = document.querySelector('.header').getBoundingClientRect().height
        w -= this.radius
        h -= this.radius
        
        if (this.position.x < 0 || this.position.x > w || this.position.y < 0 || this.position.y > h) {
            this.velocity.x *= -1
            this.velocity.y *= -1
        }
        if (this.position.x < 0) this.position.x = 0
        if (this.position.x > w) this.position.x = w
        if (this.position.y > h) this.position.y = h
        if (this.position.y < 0) this.position.y = 0
        
        this.position.x -= 0.1 * this.velocity.x;
        this.position.y -= 0.1 * this.velocity.y;

        this.angle -= (this.angle - this.startAngle) * 0.01;
        //style
        document.getElementById('panda' + this.id).style.top = this.position.y + 'px'
        document.getElementById('panda' + this.id).style.left = this.position.x + 'px'
        document.getElementById('panda' + this.id).style.transform = 'rotate(' + this.angle + 'deg)'
        
        this.velocity.x *= 0.985
        this.velocity.y *= 0.985
    }
    addVelocity(vx, vy) {
        this.velocity.x += vx * 0.5
        this.velocity.y += vy * 0.5
        this.angle += Math.sqrt(vx*vx+vy*vy) * 0.2
    }
}

const pandaPositionX = [990]
const pandaPositionY = [400] //667
const pandaAngle = [0]
const pandaImgSrc = './img/panda.png';
let pandasArray = [];
let mouse = {
    start: { x: 0, y: 0 },
    end: {x: 0, y: 0}
}

window.onload = () => {
    for (let index = 0; index < pandaPositionX.length; index++) {
        pandasArray.push(new Panda(pandaPositionX[index], pandaPositionY[index], pandaAngle[index], index))
        //add tag
        document.querySelector('.header').innerHTML += '<img src="' + pandaImgSrc + '" alt="panda" class="panda" id = "panda' + index + '">';
        //style
        document.getElementById('panda' + index).style.top = pandaPositionY[index] + 'px'
        document.getElementById('panda' + index).style.left = pandaPositionX[index] + 'px'
        document.getElementById('panda' + index).style.transform = 'rotate('+ pandaAngle[index]+'deg)'
    }

    function loop() {
        pandasArray.forEach(i => {
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

    for (let index = 0; index < pandasArray.length; index++) {
        const panda = pandasArray[index];
        let centerX = panda.position.x + panda.radius * 0.4
        let centerY = panda.position.y + panda.radius * 0.4
        if (Math.abs(centerX - e.x) < 80 &&
            Math.abs(centerY - e.y) < 100)
        {
            panda.addVelocity(mouse.end.x - mouse.start.x, mouse.end.y - mouse.start.y)
        }
    }
}