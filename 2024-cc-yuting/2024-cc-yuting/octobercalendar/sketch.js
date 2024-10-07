function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(200);
  strokeWeight(4);
  stroke(255);
  
  let cols = 7; 
  let rows = 5;
  let totalCircles = 31; 
  
  let d = day(); 

 
  for (var i = 0; i < totalCircles; i++) {
    let x = (i % cols) * 50 + 40;
    let y = Math.floor(i / cols) * 50 + 40; 
    
    if (i + 1 === d) {
      fill(50, 255, 250);
    } else {
      fill(255);
    }
    
    ellipse(x, y, 25, 25);
  }

  let button = createButton('October');
  button.position(300, 250);
}