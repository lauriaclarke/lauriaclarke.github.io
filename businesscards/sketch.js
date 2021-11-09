// the pt to inch conversion
const INCH = 72;
// height and width of a card
const WIDTH = 3.5 * INCH;
const HEIGHT = 2 * INCH;
// number of grid segments in each direction
const X_SCALE = 2;
const Y_SCALE = 10;
// square root of business cards
const X_DIM = 3;
const Y_DIM = 15;
// text scale
const TEXT_SIZE = 10;
// some margin for fun
const MARGIN = 5;
// make the canvas fit the cards
const CANVASX = X_DIM * 4 * INCH;
const CANVASY = Y_DIM * 2.5 * INCH;
// to hold cards
let cards = [];

function setup(){
  textAlign(LEFT, BOTTOM);
  createCanvas(CANVASX, CANVASY);
  // create a 5 x 5 grid of business cards
  for(let i = 0; i < X_DIM; i++){
    for(let j = 0; j < Y_DIM; j++){
      cards[(i * Y_DIM) + j] = new BusinessCard(4 * MARGIN + WIDTH * i + (2 * MARGIN * i), 4 * MARGIN + HEIGHT * j + (2 * MARGIN * j));
    }
  }
  // check out the cards
  console.log(cards);
  // call draw just once
  for(let i = 0; i < X_DIM * Y_DIM; i++){
    cards[i].draw();
  }
}

// not important
function draw(){
}

// budisness card for lillie
function BusinessCard(x, y){
  this.name  = "lillian fradin";
  this.title = "propagation manager";
  this.phone = "(245) 762 0953";
  this.email = "lillian@fernmail.com";
  this.x = x;
  this.y = y;
}


BusinessCard.prototype.draw = function(){
  push();
  textSize(TEXT_SIZE);
  fill('black');
  rect(this.x, this.y, WIDTH, HEIGHT);
  // randomly place the fields around the grid
  // fill('forestgreen');
  fill('white');
  text("ferns for fun",  this.x + WIDTH / X_SCALE * round(random(0, X_SCALE - 1)) + MARGIN, this.y + round(random(1, Y_SCALE - 1)) * HEIGHT / Y_SCALE);
  text(this.name,  this.x + WIDTH / X_SCALE * round(random(0, X_SCALE - 1)) + MARGIN, this.y + round(random(1, Y_SCALE - 1)) * HEIGHT / Y_SCALE);
  text(this.title, this.x + WIDTH / X_SCALE * round(random(0, X_SCALE - 1)) + MARGIN, this.y + round(random(1, Y_SCALE - 1)) * HEIGHT / Y_SCALE);
  text(this.phone, this.x + WIDTH / X_SCALE * round(random(0, X_SCALE - 1)) + MARGIN, this.y + round(random(1, Y_SCALE - 1)) * HEIGHT / Y_SCALE);
  text(this.email, this.x + WIDTH / X_SCALE * round(random(0, X_SCALE - 1)) + MARGIN, this.y + round(random(1, Y_SCALE - 1)) * HEIGHT / Y_SCALE);
  pop();
}

