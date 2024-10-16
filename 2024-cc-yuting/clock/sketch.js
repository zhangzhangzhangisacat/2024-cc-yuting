// This code is based on [ConwaySmudge by xladn0]
// Original project URL: https://openprocessing.org/sketch/2225025/
// Used and modified under the [https://creativecommons.org/licenses/by-nc-sa/3.0/] licenselet rows, cols;

let resolution = 20;
let grid;
let lastUpdateTime = 0; 
let updateInterval = 1000; 
let activeCellCount = 1; 
let maxCellCount = 60; 
let direction = 1; 


let music1;
let currentMusic = null;
let lastPlayTime = 0; 

function preload() {
  
  music1 = loadSound('assets/music1.mp3');
}

function setup() {
  frameRate(10);
  createCanvas(500, 500);
  rows = height / resolution;
  cols = width / resolution;
  grid = createRandomGrid();
  describe("Epilepsy Warning. Game of life variant. Elongated black, white, and blue rectangles dancing around the screen.");
}

function draw() {
  background(255);
  let currentTime = millis(); 

  
  if (currentTime - lastUpdateTime > updateInterval) {
    updateGrid();
    lastUpdateTime = currentTime; 

    
    activeCellCount += direction;

    
    if (activeCellCount >= maxCellCount) {
      activeCellCount = maxCellCount; 
      direction = -1;
    }
    
    else if (activeCellCount <= 1) {
      activeCellCount = 1; 
      direction = 1;
    }

    
    if (currentTime - lastPlayTime > 1000) { 
      playMusic();
      lastPlayTime = currentTime; 
    }
  }

  drawGrid();
  describe("game of life with outlines");
}

function playMusic() {
  
  if (currentMusic && currentMusic.isPlaying()) {
    currentMusic.stop();
  }
  
  if (music1 && !music1.isPlaying()) {
    music1.play(); 
  }
  currentMusic = music1;
}

function createRandomGrid() {
  let grid = new Array(cols).fill(null).map(() => new Array(rows).fill(0));
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = Math.random() > 0.5 ? 1 : 0;
    }
  }
  return grid;
}

function updateGrid() {
  let nextGrid = new Array(cols).fill(null).map(() => new Array(rows).fill(0));

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let neighbors = countNeighbors(grid, i, j);
      let state = grid[i][j];

      if (state === 0 && neighbors === 3) {
        nextGrid[i][j] = 1;
      } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
        nextGrid[i][j] = 0;
      } else {
        nextGrid[i][j] = state;
      }
    }
  }

  grid = nextGrid;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}

let colors = [
  [144, 255, 96], 
  [100, 233, 255],
  [231, 142, 255],
  // [255, 218, 47],
  // [13, 255, 0],
  // [158, 53, 255]
];

function drawGrid() {
  let count = 0;

  for (let i = 0; i < cols && count < activeCellCount; i++) {
    for (let j = 0; j < rows && count < activeCellCount; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] === 1) {
        let randomIndex = Math.floor(Math.random() * colors.length);
        let chosenColor = colors[randomIndex];

        fill(chosenColor[0], chosenColor[1], chosenColor[2]);
        stroke(22);
        rect(x, y, resolution, resolution + 200);

        count++; 
      }
    }
  }
}