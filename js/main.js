class Panda{
    constructor(x, y, alfa, i) {
        this.start = { x: x, y: y };
        this.position = { x: x, y: y };
        this.velocity = { x: 0, y: 0 };
        this.angle = alfa;
        this.id = i;
        this.radius = 172;
    }
    move(dx, dy) {
        this.position.x -= dx;
        this.position.y -= dy;
        //style
        document.getElementById('panda' + this.id).style.top = this.position.y + 'px'
        document.getElementById('panda' + this.id).style.left = this.position.x + 'px'
        document.getElementById('panda' + this.id).style.transform = 'rotate('+ this.angle +'deg)'
    }
}

const pandaPositionX = [990]
const pandaPositionY = [667]
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
            panda.move(mouse.end.x - mouse.start.x, mouse.end.y - mouse.start.y)
        }
    }
}