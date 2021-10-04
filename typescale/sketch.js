// S P A G H E T T I
// s p a g h e t t i

// SPAGHETTI
// spaghetti
//
// TODO describe the y spoisiont of the above line text and the below line text...there are real words for that 
// TODO make a shadow
// TODO when the x dimension is less than 

var canvasX = 1000;
var canvasY = 1000;
let s1;

var onoff = true;
var ts = 40;
var ss = 5;
var shadow = false;

function setup(){
  angleMode(DEGREES);
  createCanvas(canvasX, canvasY);
  background(184, 46, 4);
  s1 = new Spaghetti(100, 100, ss);
}

function draw(){
  var xInc = canvasX / 10;
  var yInc = 1.5 * canvasY / 3;

  var xSInc = canvasX / 10;
  var ySInc = 1.5 * canvasY / 3;

  shadow = true;
  s1.drawS(xSInc * 1, ySInc - 2 * ts, ts);
  s1.drawP(xSInc * 2, ySInc, ts);
  s1.drawA(xSInc * 3, ySInc, ts);
  s1.drawG(xSInc * 4, ySInc, ts);
  s1.drawH(xSInc * 5, ySInc, ts);
  s1.drawE(xSInc * 6, ySInc, ts);
  s1.drawT(xSInc * 7, ySInc, ts);
  s1.drawT(xSInc * 8, ySInc, ts);
  s1.drawI(xSInc * 9, ySInc, ts);

  shadow = false;
  s1.drawS(xInc * 1, yInc - 2 * ts, ts);
  s1.drawP(xInc * 2, yInc, ts);
  s1.drawA(xInc * 3, yInc, ts);
  s1.drawG(xInc * 4, yInc, ts);
  s1.drawH(xInc * 5, yInc, ts);
  s1.drawE(xInc * 6, yInc, ts);
  s1.drawT(xInc * 7, yInc, ts);
  s1.drawT(xInc * 8, yInc, ts);
  s1.drawI(xInc * 9, yInc, ts);
  
  if(onoff){
    resizeCanvas(canvasX, canvasY);
    fill(184, 46, 4);
    rect(0, 0, canvasX, canvasY);
    ts = 40 * canvasY / canvasX;
    ss = 0.01 * canvasY;
    console.log("ts " + ts);
    console.log("ss " + ss);
    console.log("x, y  " + canvasX, canvasY);
    onoff = false;
  }
}



function boobs(radius){
  var xO = 200;
  var yO = 400;
  var kern = 3 * s1.width;

  s1.drawSegment(xO, yO, xO, yO - 3 * radius, 0, false);
  s1.drawO(xO + radius, yO, radius);
  s1.drawO(xO + 3 * radius + kern, yO, radius);
  s1.drawO(xO + 5 * radius + 2*kern, yO, radius);
  s1.drawSegment(xO + 6 * radius + 3 * kern, yO, xO, yO - 3 * radius, 0, false);
  s1.drawO(xO + 7 * radius + 3 * kern, yO, radius);

  // S
  s1.drawArc(xO + 9 * radius + 2 * kern, yO, 20, 3);
  s1.drawArc(xO + 9 * radius + 2 * kern + 40, yO, 20, 2);
  s1.drawArc(xO + 9 * radius + 2 * kern, yO, 20, 1);
  s1.drawArc(xO + 9 * radius + 2 * kern + 40, yO + 40, 20, 2);
  s1.drawArc(xO + 9 * radius + 2 * kern + 40, yO + 40, 20, 0);
  s1.drawArc(xO + 9 * radius + 2 * kern, yO + 40, 20, 1);
}


function Spaghetti(x, y){
  this.x = x;
  this.y = y;

  // this.width = width;
}


Spaghetti.prototype.draw = function(dark){
  push();
  translate(this.x, this.y);

  // attempt at shadow 
  if(shadow){
    push();
    blendMode(MULTIPLY);
    fill(235, 227, 225);
    stroke(235, 227, 225);
    ellipse(-5, -5, ss * 2, ss * 2)
    pop();
  }

  var r = 242 + random(-10, 1);
  var g = 213 + random(-10, 1);
  var b = 92 +  random(-10, 1);

  stroke(r, g, b);
  if(dark){
    fill(r, g, b);
  } else {
    fill(245, 228, 159);
  }
  ellipse(0, 0, ss * 2, ss * 2);
  pop();
}


Spaghetti.prototype.drawSegment = function(xStart, yStart, xStop, yStop, slope, direction){
  var x = xStart;
  var y = yStart;

  // x axis
  if(slope != 0){
    // plus x
    if(xStart < xStop){
      while(x < xStop){
        this.x = x;
        this.y = y;
        this.draw();
        x++;
        y += slope;
      }
    } else {
      while(x > xStop){
        this.x = x;
        this.y = y;
        this.draw();
        x--;
        y -= slope;
      }
    }
  } else {
    if(yStart < yStop){
      while(y < yStop){
        this.x = x;
        this.y = y;
        this.draw();
        y++;
      }
    } else {
      while(y > yStop){
        this.x = x;
        this.y = y;
        this.draw();
        y--;
      }
    }
  }
}


// 90 degree segments that go in different directions
// "bottom" of segment starts at the point specified
// (this doesn't make much sense except for joining segments)
// 0: down, left
// 1: down, right
// 2: up, left
// 3: up, right
Spaghetti.prototype.drawArc = function(xAnchor, yAnchor, radius, segment){  
  var angle = 0;
  var step =  1;
  var stopAngle;

  switch(segment){
   case 0:
    stopAngle = 90;
    angle = 0;
    while(angle < stopAngle){
      this.x = xAnchor + cos(angle) * radius - radius;
      this.y = yAnchor + sin(angle) * radius;
      angle += step;
      this.draw();
    }
    break;
   case 1:
    stopAngle = 90;
    angle = 180;
    while(angle > stopAngle){
      this.x = xAnchor + cos(angle) * radius + radius;
      this.y = yAnchor + sin(angle) * radius;
      angle -= step;
      this.draw();
    }
    break;
   case 2:
    stopAngle = 270;
    angle = 360;
    while(angle > stopAngle){
      this.x = xAnchor + cos(angle) * radius - radius;
      this.y = yAnchor + sin(angle) * radius;
      angle -= step;
      this.draw();
    }
    break;
   case 3:
    stopAngle = 270;
    angle = 180;
    while(angle < stopAngle){
      this.x = xAnchor + cos(angle) * radius + radius;
      this.y = yAnchor + sin(angle) * radius;
      angle += step;
      this.draw();
    }
    break;
  }
}

// just draw a circle...
// centered one radius from anchor
Spaghetti.prototype.drawO = function(xAnchor, yAnchor, radius){
  var angle = 0;
  var step =  0.1;
  angle = 0;
  while(angle < 360){
    this.x = xAnchor + cos(angle) * radius;
    this.y = yAnchor + sin(angle) * radius;
    angle += step;
    this.draw();
  }
  this.draw(true);
}


// S
Spaghetti.prototype.drawS = function(x, y, size){
  this.drawArc(x,            y,            size, 3);
  this.drawArc(x + 2 * size, y,            size, 2);
  this.drawArc(x,            y,            size, 1);
  this.drawArc(x + 2 * size, y + 2 * size, size, 2);
  this.drawArc(x + 2 * size, y + 2 * size, size, 0);
  this.drawArc(x,            y + 2 * size, size, 1);
}

// P
Spaghetti.prototype.drawP = function(x, y, size){
  this.drawSegment(x, y, x, y + 3 * size, 0);
  this.drawO(x + size, y, size);
}

// A
Spaghetti.prototype.drawA = function(x, y, size){
  this.drawO(x + size, y, size);
  this.drawSegment(x + 2 * size, y, x + 2 * size, y + size, 0);
}

// G
Spaghetti.prototype.drawG = function(x, y, size){
  this.drawSegment(x + 2 * size, y, x + 2 * size, y + 3 * size, 0);
  this.drawO(x + size, y, size);
  this.drawArc(x + 2 * size, y + 3 * size, size, 0);
}

// H
Spaghetti.prototype.drawH = function(x, y, size){
  this.drawSegment(x, y + size, x, y - 3 * size, 0);
  this.drawSegment(x + 2 * size, y + size, x + 2 * size, y, 0);
  this.drawArc(x + 2 * size, y, size, 2);
  this.drawArc(x, y, size, 3);
}

// E
Spaghetti.prototype.drawE = function(x, y, size){
  this.drawArc(x,            y,            size, 3);
  this.drawArc(x + 2 * size, y,            size, 2);
  this.drawArc(x,            y,            size, 1);
  this.drawSegment(x, y, x + 2 * size, y, 0.01);

 // this.drawSegment(x, y + size, x, y - 3 * size, 0);
 // this.drawSegment(x + 2 * size, y + size, x + 2 * size, y, 0);
 // this.drawArc(x + 2 * size, y, size, 2);
 // this.drawArc(x, y, size, 3);
}

// T
Spaghetti.prototype.drawT = function(x, y, size){
  this.drawSegment(x, y, x, y - 3 * size, 0);
  // this.drawArc(x,            y,            size, 3);
  // this.drawArc(x + 2 * size, y,            size, 2);
  this.drawArc(x,            y,            size, 1);
  this.drawSegment(x, y - 2 * size, x + size, y - 2 * size, 0.01);
  // this.drawSegment(x, y, x + 2 * size, y, 0.01);
}

// I
Spaghetti.prototype.drawI = function(x, y, size){
  this.drawSegment(x, y, x, y - size, 0);
  this.drawArc(x,            y,            size, 1);
  this.y = y - 2 * size;
  this.x = x;
  this.draw();
}


function mouseClicked() {
  canvasX = mouseX;
  canvasY = mouseY;
  onoff = true;
}
