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

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellSize = height / grid.length;
  currentBlock = generateRandomBlock();
}

function draw() {
  background(220);
  showGrid();

  if (currentBlock) {
    currentBlock.update();
    currentBlock.show();
    currentBlock.addAnotherBlock();
  }
}

function keyPressed() {
  if (currentBlock) {
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

//use to create random block
function generateRandomBlock() {
  const blockTypes = Object.keys(blocks);
  const randomType = blockTypes[Math.floor(Math.random() * blockTypes.length)];
  const randomShape = blocks[randomType];
  return new Block(randomShape);
}

//show grid
function showGrid() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      fill(grid[y][x] === 1 ? "black" : "white");
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

//make block
class Block {
  constructor(shape) {
    this.shape = shape;
    this.x = Math.floor(grid[0].length / 2) - Math.floor(shape[0].length / 2);
    this.y = 0;
    this.color = color(random(255), random(255), random(255));
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
    if (this.y + this.shape.length < grid.length) {
      this.moveDown();
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
    this.x--;
  }

  moveRight() {
    this.x++;
  }
}