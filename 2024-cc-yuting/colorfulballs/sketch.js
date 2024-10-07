let circles = []; 
let BallPositions = [];
let BallColors = [];
let button;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();


  for (let i = 0; i < 50; i++) {
    let m = random(width);
    let n = random(height / 5);
    let o = random(10, 100);
    let p = color(random(255), random(255), random(255)); 
    let q = random(0.5, 3);
    circles[i] = new DrawCircle(m, n, o, p, q);
  }


  generateBalls(100);


  button = createButton("Button Multiplier");
  button.mouseClicked(moveButton);
  button.size(200, 100);
  button.position(10, 10);
  button.style("font-family", "Comic Sans MS");
  button.style("font-size", "20px");
  button.style("background-color", "rgba(30, 50, 255, 0.7)");
}

function draw() {
  background(255, 204, 0);


  for (let i = 0; i < circles.length; i++) {
    circles[i].move();
    circles[i].display();
  }


  if (circles.length > 9) {
    circles.shift();
  }


  for (let i = 0; i < BallPositions.length; i++) {
    let Ball = BallPositions[i];
    let BallColor = BallColors[i];

    fill(BallColor[0], BallColor[1], BallColor[2]);
    ellipse(Ball.x, Ball.y, Ball.size);
  }
}


function moveButton() {
  button.position(random(width - button.width), random(height - button.height));
  generateNewBalls();
  console.log("Hello IDM!");
}


function mousePressed() {
  let m = random(10, 100); 
  let n = color(random(255), random(255), random(255)); 
  let q = random(0.5, 7);
  let newCircle = new DrawCircle(mouseX, mouseY, m, n, q);
  circles.push(newCircle);
}


function DrawCircle(m, n, o, p, q) {
  this.xPos = m;
  this.yPos = n;
  this.diameter = o;
  this.color = p;
  this.speed = q;
}


DrawCircle.prototype = {
  constructor: DrawCircle,
  display: function () {
    fill(this.color);
    ellipse(this.xPos, this.yPos, this.diameter, this.diameter);
  },
  move: function () {
    this.yPos += this.speed; 
    if (this.yPos > height) {
      this.yPos = 0; 
    }
  },
};


function generateBalls(count) {
  BallPositions = [];
  BallColors = [];
  for (let i = 0; i < count; i++) {
    BallPositions.push({
      x: random(0, width),
      y: random(0, height),
      size: random(10, 30),
    });
    BallColors.push([random(255), random(255), random(255)]);
  }
}


function generateNewBalls() {
  generateBalls(floor(random(50, 200)));
}