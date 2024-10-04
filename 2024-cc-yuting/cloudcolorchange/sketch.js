let cloudColor;       
let Clock;   

function setup() {
  createCanvas(400, 400);
  cloudColor = color(255);
  Clock = millis();
}

function draw() {
  background(135, 206, 235);

  if (millis() - Clock >= 1000) {
    cloudColor = color(random(255), random(255), random(255));
      Clock = millis();

  }

  fill(cloudColor);
  noStroke();

  let cloudX = width / 2;
  let cloudY = height / 2;

  ellipse(cloudX - 60, cloudY, 100, 80);
  ellipse(cloudX - 30, cloudY - 20, 100, 100);
  ellipse(cloudX, cloudY, 120, 120);
  ellipse(cloudX + 30, cloudY - 20, 100, 100);
  ellipse(cloudX + 60, cloudY, 100, 80);
}