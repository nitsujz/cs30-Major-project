//Grid assignment
//Justin Nguyen

//make grid and blocks
const grid = 
[ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const blocks = {
  I: [
    [1, 1, 1, 1]
  ],

  L: [
    [1, 0],
    [1, 0],
    [1, 1],
  ],

  U: [
    [0, 1],
    [0, 1],
    [1, 1],
  ],

  O: [
    [1, 1],
    [1, 1],
  ],

  S: [
    [1, 1, 0],
    [0, 1, 1],
  ],

  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],

  Z: [
    [0, 1, 1],
    [1, 1, 0],
  ],
};

let currentBlock;
let cellSize;
let fallTimer = 30;
let gameOver = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellSize = height / grid.length;
  currentBlock = generateRandomBlock();
  frameRate(60); 
}

function draw() {
  background(220);
  showGrid();

  if (gameOver) {
    textSize(64); 
    textAlign(CENTER, CENTER); 
    fill("red");
    text("Game Over", width / 2, height / 2);
    noLoop();
    return;
  }

  //check if it's time to move the block down
  if (frameCount % fallTimer === 0 && currentBlock) { 
    currentBlock.update();
  }

  //check if the 's' key is held down to move the block down
  if (keyIsDown(83) && currentBlock && !currentBlock.landed) {
    currentBlock.moveDown();
  }
  
  if (currentBlock) {
    currentBlock.show();
  }
}

function keyPressed() {
  if (currentBlock && !currentBlock.landed) {
    //used to move blocks down and side to side
    if (key === "a") {
      currentBlock.moveLeft();
    } 
    else if (key === "d") {
      currentBlock.moveRight();
    } 
    else if (key === "s") {
      currentBlock.moveDown();
    }
  }
} 

//create and show grid
function showGrid() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x]) {
        fill(grid[y][x]);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      } 
      else {
        fill("black");
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

//use to create random blocks
function generateRandomBlock() {
  const blockTypes = Object.keys(blocks);
  const randomType = blockTypes[Math.floor(Math.random() * blockTypes.length)];
  const randomShape = blocks[randomType];
  const newBlock = new Block(randomShape);

  //check if new block overlaps with existing blocks (game over condition)
  if (newBlock.checkCollision()) {
    gameOver = true;
  }

  return newBlock;
}

//make block
class Block {
  constructor(shape) {
    this.shape = shape;
    this.x = Math.floor(grid[0].length / 2) - Math.floor(shape[0].length / 2);
    this.y = 0;
    this.color = color(random(255), random(255), random(255));
    this.landed = false;
  }

  show() {
    for (let y = 0; y < this.shape.length; y++) {
      for (let x = 0; x < this.shape[y].length; x++) {
        if (this.shape[y][x]) {
          fill(this.color);
          rect((this.x + x) * cellSize, (this.y + y) * cellSize, cellSize, cellSize);
        }
      }
    }
  }

  update() {
    if (this.y + this.shape.length < grid.length && !this.checkCollision()) {
      this.moveDown();
    } 
    else {
      this.landed = true;
      this.addAnotherBlock();
      this.makeRowDisappear();
      currentBlock = generateRandomBlock();
    }
  }

  addAnotherBlock() {
    for (let y = 0; y < this.shape.length; y++) {
      for (let x = 0; x < this.shape[y].length; x++) {
        if (this.shape[y][x]) {
          grid[this.y + y][this.x + x] = this.color;
        }
      }
    }
  }
  
  //check if the block touches another block or the bottom of the grid
  checkCollision() {
    for (let y = 0; y < this.shape.length; y++) {
      for (let x = 0; x < this.shape[y].length; x++) {
        if (this.shape[y][x] && (this.y + y + 1 >= grid.length || grid[this.y + y + 1][this.x + x])) {
          return true;
        }
      }
    }
    return false;
  }

  //check if the blocks have gone outside the grid
  checkSideCollision(direction) {
    for (let y = 0; y < this.shape.length; y++) {
      for (let x = 0; x < this.shape[y].length; x++) {
        if (this.shape[y][x] && (this.x + x + direction < 0 || this.x + x + direction >= grid[0].length || grid[this.y + y][this.x + x + direction])) {
          return true;
        }
      }
    }
    return false;
  }

  //make the row disappear and move other blocks down when the row is fully filled
  makeRowDisappear() {
    for (let y = grid.length - 1; y >= 0; y--) {
      if (grid[y].every(cell => cell !== 0)) {
        grid.splice(y, 1);
        grid.unshift(new Array(grid[0].length).fill(0));
      } 
    }
  }

  moveDown() {
    if (!this.checkCollision()) {
      this.y++;
    } 
    else {
      this.landed = true;
      this.addAnotherBlock();
      this.makeRowDisappear();
      currentBlock = generateRandomBlock();
    }
  }

  moveLeft() {
    if (!this.landed && this.x > 0 && !this.checkSideCollision(-1)) {
      this.x--;
    }
  }

  moveRight() {
    if (!this.landed && this.x + this.shape[0].length < grid[0].length && !this.checkSideCollision(1)) {
      this.x++;
    }
  }
}