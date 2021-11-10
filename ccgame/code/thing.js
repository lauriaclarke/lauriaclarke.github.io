// a thing class
function Thing(x, y, tool, ent, exp, image){
  this.x           = x;
  this.y           = y;
  this.name        = null;
  this.image       = image;
  this.lBounds     = this.x;
  this.rBounds     = this.x + this.image.width  * IMG_SCALE;
  this.uBounds     = this.y;
  this.dBounds     = this.y + this.image.height * IMG_SCALE;
  // interactive properties
  this.activationTool = tool;
  this.entPts         = ent;
  this.expPts         = exp;
  this.actCnt         = 0;
  this.actNum         = exp;
  this.activated      = false;
  this.completed      = false;
}

// draw a thing
Thing.prototype.draw = function(){
  push();
  rectMode(CORNER);
  // this.updateBounds();
  // console.log(this);
  translate(this.x, this.y);
  // draw the thing
  image(this.image, 0, 0, this.image.width * IMG_SCALE, this.image.height * IMG_SCALE);
  // once it's been completed turn it green
  strokeWeight(5);
  noFill();

  if(this.completed){
    stroke('green');
    rect(0, 0, this.image.width * IMG_SCALE, this.image.height * IMG_SCALE);
  // other wise flash red each time it's activated
  }else if(this.activated){
    stroke('yellow');
    rect(0, 0, this.image.width * IMG_SCALE, this.image.height * IMG_SCALE);
    // this.printMessage();
    this.activated = false;
  }

  pop(); 
} 

// update the activation of the thing
Thing.prototype.update = function(){
  // if the activation count == number, thing is activated 
  this.actCnt++;
  this.activated = true;
  if(this.actCnt === this.actNum){
    this.completed = true;
  }
}

// print a messgae about the item when we get close and interact with it
Thing.prototype.printMessage = function(){
  push();
  translate(this.x, this.y);
  fill('black');
  textAlign(CENTER);
  var msg = this.name + "  " + this.actCnt + "/" + this.actNum;
  if(this.activationTool == "screwdriver"){
    text(msg + " screws taken apart", this.image.width * IMG_SCALE * 0.5, this.image.height * IMG_SCALE + 10); 
  }else if(this.activationTool == "wrench"){
    text(msg + " nuts taken apart",  this.image.width * IMG_SCALE * 0.5, this.image.height * IMG_SCALE + 10); 
  }
  pop();
}

// never really worked
Thing.prototype.updateBounds = function(){
  this.lBounds = this.x; 
  this.rBounds = this.x + this.image.width  * IMG_SCALE; 
  this.uBounds = this.y; 
  this.dBounds = this.y + this.image.height * IMG_SCALE; 
}  
