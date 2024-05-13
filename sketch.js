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
    [1, 1, 1],
    [0, 1, 0],
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
  let block = new Block();
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
    if (key === "w") {
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
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

//make block
class Block {
  constructor(shape, color) {
    this.shape = shape;
    this.x = Math.floor(cellSize / 2) - Math.floor(shape[0].length / 2); 
    this.y = 0; 
    this.color = color;
  }

  show() {
    for (let y = 0; y < this.shape.length; y++) {
      for (let x = 0; x < this.shape[y].length; x++) {
        if (this.shape[y][x]) {
          fill("white");
          square((this.x + x) * cellSize, (this.y + y) * cellSize, cellSize);
        }
      }
    }
  }

  update() {
    this.inGrid();
    this.moveDown();

    this.color = color(random(255), random(255), random(255));
  }

  addAnotherBlock() {
    for (let y = 0; y < this.shape.length; y++) {
      for (let x = 0; x < this.shape[y].length; x++) {
        if (this.shape[y][x]) {
          grid[this.y + y][this.x + x] = 1;
        }
      }
    }
  }

  inGrid() {
    if (this.x > grid || this.x < grid) {
      this.x = grid / 2;
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