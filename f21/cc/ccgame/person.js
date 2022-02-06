// things people need
const personL = 20.5;
const personW = 6;
const shoulderCurve = 120;
const hairCurve = 20;
var leftRight = true;
var tf = 0;
var ti = 0;
let closeFlag = false;

// a person class borrowed from my APD poster
function Person(size, hair){
  this.x           = 100;
  this.y           = 100;
  this.toolX       = 0;
  this.toolY       = 0;
  this.stop        = false;
  this.size        = size;
  this.height      = size * 20.5;
  this.width       = size * 6;
  this.lBounds     = this.x - this.width / 2;
  this.rBounds     = this.x + this.width / 2;
  this.uBounds     = this.y - (2 * this.size);
  this.dBounds     = (this.y - (2 * this.size)) + this.height / 2;
  this.pants       = true;
  this.hair        = hair;
  this.skinTone    = color(255, 229, 217);
  this.pantsColor  = color(38, 39, 51);
  this.shirtColor  = color(61, 82, 20);
  this.currentTool = 'screwdriver';

  this.experience  = 0;
  this.enthusiasm  = 85;
  this.expChange   = 0;
  this.entChange   = 0;
}

// stationary person from behind
Person.prototype.drawBehind = function(x, y, leftRight){
  push();
  this.x = x;
  this.y = y;
  this.updateBounds();
  translate(this.x, this.y);
  noStroke();
  // total height of a person is 4 + 6 + 5.5 + 5 * size 
  var headW  = 4 * this.size;
  var headL  = 4 * this.size;
  var torsoW = 6 * this.size;
  var torsoL = 6 * this.size;
  var legW   = 4 * this.size;
  var legL   = 5.5 * this.size;
  var shoeW  = 5 * this.size;
  var shoeL  = 0.5 * this.size;
  var mouthW = 0.2 * this.size;
  var mouthL = 0.7 * this.size;
  var eyeL = 0.7 * this.size;
  var eyeW = 0.5 * this.size;
  var handW = 1 * this.size;

  if(this.pants){
    // torso
    fill(this.shirtColor);
    rect(0, (headL + torsoL) / 2 , torsoW, torsoL, shoulderCurve, shoulderCurve, 0, 0);
    // legs
    fill(this.pantsColor);
    rect(0, (headL + legL) / 2 + torsoL, legW, legL);
  } else {
    fill(this.pantsColor);
    // legs
    rect(0, (headL + legL) / 2 + torsoL, legW, legL);
    // torso
    rect(0, (headL + torsoL) / 2, torsoW, torsoL, shoulderCurve, shoulderCurve, 0, 0);
    for(let i = 0; i < legL - 20; i++){
      rect(0, torsoL + i, torsoW + i * 0.4, 2);
    }
  }
  // tool
  this.drawTool(torsoW / 2, 3 / 4 * (headL + torsoL), leftRight, 0.2);
  // hands 
  fill(this.skinTone);
  ellipse(-torsoW / 2, 3 / 4 * (headL + torsoL), handW, handW);
  ellipse(torsoW / 2, 3 / 4 * (headL + torsoL), handW, handW);
  // shoes
  fill(31);
  rect(0, torsoL + headL / 2 + legL, shoeW, shoeL, 10, 10, 0, 0);
  // head
  fill(this.skinTone);
  ellipse(0, 0, headW, headL);
  // back hair
  if(this.hair == true){
    fill(32, 19, 19);
    rect(0, headL / 4, headL + 3, headW / 2, hairCurve, hairCurve);
    ellipse(0, 0, headW + 3, headL);
  }
  // front hair
  fill(32, 19, 19);
  arc(0, 0, headW * 1.02, headL * 1.01, PI, 2 * PI, OPEN);
  pop();    
};

// normal moving person
Person.prototype.draw = function(x, y, leftRight){
  push();
  this.x = x;
  this.y = y;
  this.updateBounds();
  translate(this.x, this.y);
  noStroke();
  // total height of a person is 4 + 6 + 5.5 + 5 * size 
  var headW  = 4 * this.size;
  var headL  = 4 * this.size;
  var torsoW = 6 * this.size;
  var torsoL = 6 * this.size;
  var legW   = 4 * this.size;
  var legL   = 5.5 * this.size;
  var shoeW  = 5 * this.size;
  var shoeL  = 0.5 * this.size;
  var mouthW = 0.2 * this.size;
  var mouthL = 0.7 * this.size;
  var eyeL = 0.7 * this.size;
  var eyeW = 0.5 * this.size;
  var handW = 1 * this.size;

  if(this.pants){
    // torso
    fill(this.shirtColor);
    rect(0, (headL + torsoL) / 2 , torsoW, torsoL, shoulderCurve, shoulderCurve, 0, 0);
    // legs
    fill(this.pantsColor);
    rect(0, (headL + legL) / 2 + torsoL, legW, legL);
  } else {
    fill(this.pantsColor);
    // legs
    rect(0, (headL + legL) / 2 + torsoL, legW, legL);
    // torso
    rect(0, (headL + torsoL) / 2, torsoW, torsoL, shoulderCurve, shoulderCurve, 0, 0);
    for(let i = 0; i < legL - 20; i++){
      rect(0, torsoL + i, torsoW + i * 0.4, 2);
    }
  }
  // hands 
  fill(this.skinTone);
  ellipse(-torsoW / 2, 3 / 4 * (headL + torsoL), handW, handW);
  ellipse(torsoW / 2, 3 / 4 * (headL + torsoL), handW, handW);
  // tool
  this.drawTool(torsoW / 2, 3 / 4 * (headL + torsoL), leftRight, this.size * TOOL_SCALE);
  // update the tool x and y
  if(leftRight){
    this.toolX = this.x - torsoW / 2;
  }else{
    this.toolX = this.x + torsoW / 2;
  }
  this.toolY = this.y + 3 / 4 * (headL + torsoL);

  // shoes
  fill(31);
  rect(0, torsoL + headL / 2 + legL, shoeW, shoeL, 10, 10, 0, 0);

  // back hair
  if(this.hair == true){
    fill(32, 19, 19);
    rect(0, headL / 4, headL + 3, headW / 2, hairCurve, hairCurve);
    ellipse(0, 0, headW + 3, headL);
  }
  // head
  fill(this.skinTone);
  ellipse(0, 0, headW, headL);
  // front hair
  fill(32, 19, 19);
  arc(0, 0, headW * 1.02, headL * 1.01, PI, 2 * PI, OPEN);

  // eyes
  fill("white");
  ellipse(this.size, 0.3 * this.size,  eyeL, eyeW);
  ellipse(-this.size, 0.3 * this.size, eyeL, eyeW);
  fill("black");
  ellipse(this.size, 0.3 * this.size, 0.3 * this.size, 0.3 * this.size);
  ellipse(-this.size, 0.3 * this.size, 0.3 * this.size, 0.3 * this.size);
  // mouth
  fill(122, 20, 4);
  ellipse(0, 0.7 * headL / 2, mouthL, mouthW); 
  strokeWeight(1.5);
  stroke(this.skinTone);
  line(0 - mouthL / 2, 0.7 * headL / 2, mouthL / 2,  0.7 * headL / 2);

  pop();    
};

// draw the tool
Person.prototype.drawTool = function(x, y, leftRight, scale){
  push();
  // use this to adjust the tool position in the player's hand
  var transX = [0, 0.7];
  var transY = [0.7, 0.3];
 
  // adjust trans values for soldering iron
  if(this.currentTool === 'solderingiron'){ 
    transX = [0.7, 0.3];
    transY = [0.4, 0.3];
  }

  if(leftRight){
    translate(-x + transX[0] * this.size, y + transY[0] * this.size);
    rotate(-3 * PI / 5);
  } else {
    translate(x - transX[1] * this.size, y + transY[1] * this.size);
    rotate(-PI / 5);
  }
  // console.log(this.currentTool);
  // screwdriver
  if(this.currentTool === 'screwdriver'){ 
    image(screwdriver, 0, 0, screwdriver.width * scale, screwdriver.height * scale);
  }else if(this.currentTool === 'wrench'){ 
    image(wrench, 0, 0, wrench.width * scale, wrench.height * scale);
  }else if(this.currentTool === 'solderingiron'){ 
    image(solderingiron, 0, 0, solderingiron.width * scale, solderingiron.height * scale);
  }

  pop();
}

// move around and interact with stuff when i get close
Person.prototype.move = function(obstacles){
  let direction;
  // only move and execute interactions if a key is pressed and within the debounce time
  ti = millis();
  if((keyIsPressed == true) && ((ti - tf) > 10 * deltaTime)){
    // key based movement
    if(keyIsDown(LEFT_ARROW)){
      this.x = this.x - 5;
      if(this.x < 0){
        this.x = CANVASX;
      }
      leftRight = true;
      direction = "left";
    }
    else if(keyIsDown(RIGHT_ARROW)){
      this.x = this.x + 5;
      if(this.x > CANVASX){
        this.x = 0;
      }
      leftRight = false;
      direction = "right";
    }
    else if(keyIsDown(UP_ARROW)){
      this.y = this.y - 5;
      if(this.y < 0){
        this.y = CANVASY;
      }
      direction = "up";
    }
    else if(keyIsDown(DOWN_ARROW)){
      this.y = this.y + 5;
      if(this.y > CANVASY){
        this.y = 0;
      }
      direction = "down";
    }
    //check for obstacles among the items in the scene 
    for(let i = 0; i< obstacles.length; i++){
      // calculate the center of the obstacle the find the distance from it
      let obstacleX = obstacles[i].x + obstacles[i].image.width * IMG_SCALE * 0.5;
      let obstacleY = obstacles[i].y + obstacles[i].image.height * IMG_SCALE * 0.5;
      let d = dist(this.toolX, this.toolY, obstacleX, obstacleY);
      // if we've been moving to the left or right them compare to the widht of the image, otherwise use the height
      if(direction == "left" || direction == "right"){
        if((d <= obstacles[i].image.width * IMG_SCALE * 0.5) && (closeFlag == false)){
          this.interact(obstacles[i]);
          tf = millis();
          closeFlag = true;
        }else if(d > obstacles[i].image.width * IMG_SCALE * 0.5){
          closeFlag = false;
        }
      }else if((direction == "up" || direction == "down") && (closeFlag == false)){
        if(d <= obstacles[i].image.height * IMG_SCALE * 0.5){
          this.interact(obstacles[i]);
          tf = millis();
          closeFlag = true
        }else if(d > obstacles[i].image.height * IMG_SCALE * 0.5){
          closeFlag = false;
        }
      }
    }
  }
  // draw the person
  this.draw(this.x, this.y, leftRight);
}

// interact with a thing
Person.prototype.interact = function(thing){
  if((thing.activationTool === this.currentTool) && (thing.activated === false) && (thing.completed == false)){
    thing.update();
    // if the tihng has been activated, then add the points
    if(thing.activated){ 
      if(this.experience < 100){
        this.experience += thing.expPts;
        this.expChange = thing.expPts; 
        if(this.experience >= 100){
          this.experience = 100;
        }
      }
      if(this.enthusiasm > 0){ 
        this.enthusiasm += thing.entPts; 
        this.entChange = thing.entPts; 
        if(this.enthusiasm >= 100){
          this.enthusiasm = 100;
        }
      }else if(this.enthusiasm <= 0){
        this.enthusiasm = 0;
      }
    }
  }

  return  
}

// maintain enthusiasm across level, but reset experience
Person.prototype.resetEs = function(){
  this.enthusiasm = this.enthusiasm;
  this.experience = 0;
}

// never worked
Person.prototype.updateBounds = function(){
  this.lBounds     = this.x - this.width / 2;
  this.rBounds     = this.x + this.width / 2;
  this.uBounds     = this.y - (2 * this.size);
  this.dBounds     = (this.y - (2 * this.size)) + this.height / 2;
}  

