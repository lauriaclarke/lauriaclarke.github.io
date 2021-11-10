// a scene class
function Scene(name){
  this.name        = name;
  this.introScene  = null;
  this.introDone   = false;
  this.infoDone    = true;
  this.x           = 0;
  this.y           = 0;
  this.nThings     = 11;
  this.things      = [];  
  this.person      = null;
}

// update all the items in the scene
Scene.prototype.update = function(){
  // draw person's health and exp
  push();
  rectMode(CORNER);
  textStyle(NORMAL); 
  // experience
  stroke('black');
  noFill();
  rect(CANVASX - 105, CANVASY - 15, 100, 10);
  fill('black')
  rect(CANVASX - 105, CANVASY - 15, this.person.experience, 10);
  // enthusiasm
  stroke('black');
  noFill();
  rect(CANVASX - 105, CANVASY - 28, 100, 10);
  fill('purple')
  rect(CANVASX - 105, CANVASY - 28, this.person.enthusiasm, 10);
  // the text for point bars
  textAlign(LEFT);
  textSize(10);
  fill('black');
  text('experience', CANVASX - 185, CANVASY - 8);
  text('enthusiasm', CANVASX - 185, CANVASY - 20);
  // change values and display the change next to the value bar
  textAlign(RIGHT);
  if(this.person.expChange >= 0){
    fill('green');
    text("+" + Math.floor(this.person.expChange), CANVASX - 108, CANVASY - 8); 
  }else{
    fill('red');
    text(Math.floor(this.person.expChange), CANVASX - 108, CANVASY - 8); 
  }
  if(this.person.entChange >= 0){
    fill('green');
    text("+" + Math.floor(this.person.entChange), CANVASX - 108, CANVASY - 20);
  }else{
    fill('red');
    text(Math.floor(this.person.entChange), CANVASX - 108, CANVASY - 20);
  }
  // display the relevant object info
  this.objectInfo();
  pop();
}

// display info next to objects which have been activated
Scene.prototype.objectInfo = function(){
  for(let i = 0; i < this.things.length; i++){
    let obstacleX = this.things[i].x + this.things[i].image.width * IMG_SCALE * 0.5;
    let obstacleY = this.things[i].y + this.things[i].image.height * IMG_SCALE * 0.5;
    let d = dist(this.person.toolX, this.person.toolY, obstacleX, obstacleY);
    if(d < this.things[i].image.width * IMG_SCALE * 0.5){
      // if an object has been activated at least once, display its info
      if((this.things[i].actCnt <= this.things[i].actNum) && (this.things[i].actCnt > 0)){ 
        this.things[i].printMessage();
      }
    }
  }
}

// draw the scene
Scene.prototype.draw = function(){
  if(this.introDone == false){
    // console.log("doing intro"); 
    this.introScene();
  }else{
    background(BG);
    text("level: " + this.name, 5, 15);
    // draw the background
    for(let i = 0; i < this.nThings; i++){
      this.things[i].draw();
    }
    // move the person around the thing array
    this.person.move(this.things);
    this.update();
  }
}

// build all the objects in the scene and place them randomly
Scene.prototype.build = function(){
  var curX = 30;
  var curY = 30;
  var yInc = 0;
  var xInc = 0;
  for(let i = 0; i < this.nThings; i++){
    // pick a random image
    var curImg = thingImages[i];
    // increment the X and Y by the size of the image plus some buffer
    curX = curX + xInc;
    // if this image is larger in height than the last, then use it as the nw yInc
    if(curImg.height * IMG_SCALE > yInc){
      yInc = curImg.height * IMG_SCALE + 20;
    } 
    // if we reach the end of the canvas shift down a row
    if(curX >= CANVASX - 50){
      curY = curY + yInc;
      curX = 30;
      yInc = 0;
    }
    // instantiate a new thing
    this.things[i] = new Thing(curX, curY, thingTools[i], thingEnts[i], thingExps[i], curImg);
    // split the image names into real names 
    var imgName = thingImageNames[i].split("/");
    var thingName = imgName[1].split(".")[0];
    this.things[i].name = thingName;
    // console.log(xInc + "  " + curX + "  " + thingName);
    // increment the xInc
    xInc = curImg.width * IMG_SCALE * 2 + 20;
  }
}

//----------------------------------
// CUSTOM DRAW FUNCTIONS
// intial scene of the game
function sceneOne(){
  if(this.introDone == false){
    console.log("doing intro"); 
    this.introScene();
  // }else if(this.infoDone == false){
  //   console.log("doing info"); 
  //   infoScreen();
  }else{
    background(BG);
    push();
    // var t1 = new Thing(120);  
    var l = new Person(35, true);
    var d = new Person(55, false);
    
    image(vcr, CANVASX / 4, CANVASY / 2, vcr.width * 0.3, vcr.height * 0.3);
    d.drawBehind(6 * CANVASX / 7, CANVASY / 2);
    l.drawBehind(1 * CANVASX / 9, CANVASY / 3);
     
    text("We can take out the screws that hold this together using the screwdriver.", 10, 20);
    text("Oh cool! There are a lot of other things that have screws in them!", 10, 40);
    text("press ENTER to continue", CANVASX - 160, CANVASY - 10);
    pop();
  }
}

// splash screen 
function splashScreen(){
  background(BG);
  push();
  textAlign(CENTER, CENTER);
  textSize(80);
  text("TAKE APART", CANVASX / 2, CANVASY / 4);
  textSize(20);
  text("a game of experience and enthusiasm", CANVASX / 2, 7 * CANVASY / 8);
  text("press ENTER to continue", CANVASX / 2, 7.5 * CANVASY / 8);
  image(logo, CANVASX / 2 - logo.width * LOGO_SCALE * 0.5, CANVASY / 6, logo.width * LOGO_SCALE, logo.height * LOGO_SCALE);
  pop();
}
// asks you to zoom the browser
function infoScreen(){
  background(BG);
  push();
  textAlign(CENTER, CENTER);
  textSize(40);
  stroke('black');
  fill('red');
  text("please increase your \n browser zoom to ~240% \n to see the game \n thanks! ", CANVASX / 2, CANVASY / 2);
  textSize(10);
  fill('black');
  text("press ENTER to continue", CANVASX - 160, CANVASY - 10);
  pop();
}

function screwdriverScene(){
  background(BG);
  push();
  var l = new Person(35, true); 
  l.currentTool = "screwdriver"; 
  l.draw(1.5 * CANVASX / 5, CANVASY / 2.8); 
  // the screw
  image(screw, 3 * CANVASX / 5, CANVASY / 3, screw.width * LOGO_SCALE, screw.height * LOGO_SCALE);
  text("Let's look for things that have screws in them! Not everything does, but I think there are a lot.", 10, 20);
  text("Use the arrow keys to get close to objects that you want to take apart.", 10, 40);
  text("Oh, watch out though - there are some things you aren't supposed to take apart...", 10, 60);
  text("press ENTER to continue", CANVASX - 160, CANVASY - 10);
  pop() 
}

function wrenchScene(){
  background(BG);
  push();

  var l = new Person(35, true);
  l.currentTool = "wrench"; 
  image(hex, 3 * CANVASX / 5, CANVASY / 3, hex.width * LOGO_SCALE, hex.height * LOGO_SCALE);
  l.draw(1.5 * CANVASX / 5, CANVASY / 2.8); 

  text("Cool, we can use this wrench to take apart things with nuts and bolts in them!", 10, 20);
  text("Let's look for more things to take apart with this new tool.", 10, 40);
  text("press ENTER to continue", CANVASX - 160, CANVASY - 10);
  pop()
}

function solderingironScene(){
  background(BG);
  push();

  var l = new Person(35, true);
  l.currentTool = "solderingiron"; 
  l.draw(1.5 * CANVASX / 5, CANVASY / 2.8); 
  image(solder, 3 * CANVASX / 5, CANVASY / 3, solder.width * LOGO_SCALE, solder.height * LOGO_SCALE);
  text("Cool, we can use this wrench to take apart things with electronics in them!", 10, 20);
  text("Let's look for more things to take apart with this new tool.", 10, 40);
  text("press ENTER to continue", CANVASX - 160, CANVASY - 10);
  pop()
}

function solderingironScene(){
  background(BG);
  push();

  var l = new Person(35, true, true);
  l.currentTool = "solderingiron"; 
  l.draw(1.5 * CANVASX / 5, CANVASY / 2.8); 
  image(solder, 3 * CANVASX / 5, CANVASY / 3, solder.width * LOGO_SCALE, solder.height * LOGO_SCALE);

  text("We can use this soldering iron to take apart things with electronics in them!", 10, 20);
  text("Let's look for more things to take apart with this new tool.", 10, 40);
  text("press ENTER to continue", CANVASX - 160, CANVASY - 10);
  pop()
}



