const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 1280;
const CANVAS_HEIGHT = canvas.height = 720;

let gameSpeed = 0;

const bgLayer1 = new Image();
bgLayer1.src = '/images/TRIPA_J10.png'
bgLayer1.id = 'id--layer1'
const bgLayer2 = new Image();
bgLayer2.src = '/images/GNews_camada2.png'
bgLayer2.id = 'id--layer2'
const bgLayer3 = new Image();
bgLayer3.src = '/images/GNews_camada3.png'
bgLayer3.id = 'id--layer3'
const bgLayer4 = new Image();
bgLayer4.src = '/images/Dias Semana.png'
bgLayer4.id = 'id--layer4'
const bgLayer5 = new Image();
bgLayer5.src = '/images/hashTag.png'
bgLayer5.id = 'id--layer5'
const bgLayer6 = new Image();
bgLayer6.src = '/images/Texto Manchete 02.png'
bgLayer6.id = 'id--layer6'
const bgLayer7 = new Image();
bgLayer7.src = '/images/J10.png'
bgLayer7.id = 'id--layer7'
const bgLayer8 = new Image();
bgLayer8.src = '/images/GNews_LOGO.png'
bgLayer8.id = 'id--layer8'


const slider = document.getElementById('slider');
slider.value = - gameSpeed;
const showSpeed = document.getElementById('showSpeed');
showSpeed.innerHTML = - gameSpeed;

slider.addEventListener('change', function (e) {
    gameSpeed = e.target.value;
    showSpeed.innerHTML = e.target.value;
});

class Layer {
    constructor(image, speedModifier, x, y) {
        this.x = x;
        this.y = y;
        this.width = 1280;
        this.height = 720;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    update() {
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width) {
            this.x = this.width + this.x2 - this.speed;
        }
        if (this.x2 <= -this.width) {
            this.x2 = this.width + this.x - this.speed;
        }
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}

const layer1 = new Layer(bgLayer1, 0, 0, 0);
const layer2 = new Layer(bgLayer2, 0.2, 800, 0);
const layer3 = new Layer(bgLayer3, 0.4, 250, 0);
const layer4 = new Layer(bgLayer4, -0.3, 400, 200);
const layer5 = new Layer(bgLayer5, 0.8, 0, 190);
const layer6 = new Layer(bgLayer6, 1.6, 0, -190);
const layer7 = new Layer(bgLayer7, 3.2, 0, 0);
const layer8 = new Layer(bgLayer8, 5, 0, 0);

const screenObjects = [layer1, layer2, layer3, layer4, layer5, layer6, layer7, layer8];

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    screenObjects.forEach(object => {
        object.update();
        object.draw();
    })
    requestAnimationFrame(animate);
};

animate();