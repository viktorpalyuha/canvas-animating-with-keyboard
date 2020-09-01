let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

function circle(x, y, radius, fillCircle) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);

  if (fillCircle) {
    ctx.fill();
  } else {
    ctx.strole();
  }
}

class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.speed = 5;
    this.xSpeed = 1;
    this.ySpeed = 0;
    this.radius = 10;
  }

  move() {
    this.x += this.xSpeed * this.speed;
    this.y += this.ySpeed * this.speed;

    if (this.x < 0 || this.x > width) {
      this.xSpeed = -this.xSpeed;
    } else if (this.y < 0 || this.y > height) {
      this.ySpeed = -this.ySpeed;
    }
  }

  draw() {
    circle(this.x, this.y, this.radius, true);
  }

  setDirection(direction) {
    if (direction === "up") {
      this.xSpeed = 0;
      this.ySpeed = -1;
    } else if (direction === "down") {
      this.xSpeed = 0;
      this.ySpeed = 1;
    } else if (direction === "right") {
      this.xSpeed = 1;
      this.ySpeed = 0;
    } else if (direction === "left") {
      this.xSpeed = -1;
      this.ySpeed = 0;
    } else if (direction === "stop") {
      this.xSpeed = 0;
      this.ySpeed = 0;
    }
  }
}

let ball = new Ball();

let keyActions = {
  32: "stop",
  37: "left",
  38: "up",
  39: "right",
  40: "down",
  90: "slow down",
  88: "accelerate",
  67: "shrink",
  86: "grow",
};

let speeds = {
  49: 1,
  50: 2,
  51: 3,
  52: 4,
  53: 5,
  54: 6,
  55: 7,
  56: 8,
  57: 9,
};

document.querySelector("body").addEventListener("keydown", () => {
  let keyPressed = event.keyCode;
  if (keyPressed > 48 && keyPressed < 58) {
    ball.speed = speeds[keyPressed];
  } else if (keyPressed === 90) {
    if (ball.speed !== 1) {
      ball.speed--;
    }
  } else if (keyPressed === 88) {
    ball.speed++;
  } else if (keyPressed === 67) {
    if (ball.radius !== 1) {
      ball.radius--;
    }
  } else if (keyPressed === 86) {
    ball.radius++;
  } else {
    ball.setDirection(keyActions[keyPressed]);
  }
});

setInterval(function () {
  ctx.clearRect(0, 0, width, height);
  ball.draw();
  ball.move();
  ctx.strokeRect(0, 0, width, height);
}, 30);
