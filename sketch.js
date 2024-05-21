//Grid assignment
//Justin Nguyen

//make grid and blocks
const grid = 
[[0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
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

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellSize = height / grid.length;
  currentBlock = generateRandomBlock();
  frameRate(60); 
}

function draw() {
  background(220);
  showGrid();

  //Check if it's time to move the block down
  if (frameCount % fallTimer === 0 && currentBlock) { 
    currentBlock.update();
  }

  if (currentBlock) {
    currentBlock.show();
    currentBlock.addAnotherBlock();
  }
}

function keyPressed() {
  if (currentBlock && !currentBlock.landed) {
    if (key === "a") {
      currentBlock.moveLeft();
    } 
    else if (key === "d") {
      currentBlock.moveRight();
    } 
    else if (key === "s") {
      currentBlock.moveDown();
    }
    else if (key === "r") {
      currentBlock = false;
    }
  }
}
//Show grid
function showGrid() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      fill(grid[y][x] === 1 ? "black" : "white");
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

//use to create random block
function generateRandomBlock() {
  const blockTypes = Object.keys(blocks);
  const randomType = blockTypes[Math.floor(Math.random() * blockTypes.length)];
  const randomShape = blocks[randomType];
  return new Block(randomShape);
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
    if (this.y + this.shape.length < grid.length && !this.landed) {
      this.moveDown();
    } else {
      this.landed = true; 
    }
    this.inGrid();
  }

  addAnotherBlock() {
    for (let y = 0; y < this.shape.length; y++) {
      for (let x = 0; x < this.shape[y].length; x++) {
        if (this.shape[y][x]) {
          grid[this.y + y][this.x + x];
        }
      }
    }
  }

  inGrid() {
    if (this.x < 0) {
      this.x = 0;
    }
    else if (this.x + this.shape[0].length > grid[0].length) {
      this.x = grid[0].length - this.shape[0].length;
    }
  }

  moveDown() {
    this.y++;
  }

  moveLeft() {
    if (!this.landed) {
      this.x--;
    }
  }

  moveRight() {
    if (!this.landed) {
      this.x++;
    }
  }
}