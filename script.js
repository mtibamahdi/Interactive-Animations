const canvas = document.getElementById("canvas1");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = {
  x: undefined,
  y: undefined
};

window.addEventListener("click", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
  }
});

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 10; i++) {
    particlesArray.push(new Particle());
  }
});

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 16;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = `hsl(${hue},100%,50%)`;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.3) {
      this.size -= 0.1;
    }
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
  draw2() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(
      this.x - this.size,
      this.y - this.size,
      this.x - this.size * 1.5,
      this.y + this.size / 2,
      this.x,
      this.y + this.size
    );
    ctx.bezierCurveTo(
      this.x + this.size * 1.5,
      this.y + this.size / 2,
      this.x + this.size,
      this.y - this.size,
      this.x,
      this.y
    );
    ctx.closePath();
    ctx.fillStyle = "red";
    ctx.fill();
  }
}

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  hue += 2;
  requestAnimationFrame(animate);
}

animate();
