/*
TODO create end state
TODO add things the solder level
TODO adjust the position of the soldering iron
TODO have score be a stack of hardware 
*/

// constants
const IMG_SCALE = 0.09;
const LOGO_SCALE = 0.4;
const TOOL_SCALE = 0.007;
const BG = 180;
const CANVASX = 600;
const CANVASY = 400;
// other stuff
var p1;
var keyX = 10;
var keyY = 10; 
var lauria;
let enterCount = 0;
let levelCount = 0;
let scenes = [];
// lots of images
let thingImages = [];
let starlogo, logo, vcr;
let screwdriver, wrench, solderingiron;
let screw, hex, solder;
let restart = false;

// load images
function preload(){
  // load all the thing images
  for(let i = 0; i < thingImageNames.length; i++){
    thingImages[i] = loadImage(thingImageNames[i]);
  }
  // load the other images
  screw = loadImage("assets/screw.png");
  solder = loadImage("assets/solder.png");
  hex = loadImage("assets/hex.png");
  vcr = loadImage("assets/vcr.png");
  logo = loadImage("assets/logo.png");
  starlogo = loadImage("assets/starlogo.png");
  screwdriver = loadImage("assets/screwdriver.png");
  wrench = loadImage("assets/wrench.png");
  solderingiron = loadImage("assets/solderingiron.png");
  console.log(thingImages);
}

function setup(){
  createCanvas(CANVASX, CANVASY);
  rect(0, 0, CANVASX, CANVASY);
  rectMode(CENTER);
  // the lauria character used in levels
  lauria = new Person(5, true, false);
  // intro
  scenes[0] = new Scene("intro");
  scenes[0].draw = sceneOne; // endScene;
  scenes[0].introScene = splashScreen;
  scenes[0].infoDone = false;
  // one
  scenes[1] = new Scene("screwdriver");
  scenes[1].person = lauria;
  scenes[1].introScene = screwdriverScene;
  // two
  scenes[2] = new Scene("wrench");
  scenes[2].person = lauria;
  scenes[2].introScene = wrenchScene;
  // three
  scenes[3] = new Scene("soldering iron");
  scenes[3].person = lauria;
  scenes[3].draw = endScene;
  // scenes[3].introScene = solderingironScene;
  // build all the scenes
  for(let i = 0; i < scenes.length; i++){
    scenes[i].build();
  }
}

function draw(){
  // switch case to change scenes
  switch(levelCount){
    // intro
    case 0:
      scenes[0].draw();
      break;
    // screwdriver
    case 1:
      scenes[2].person.currentTool = "screwdriver";
      scenes[1].draw();
      break;
    // wrench
    case 2:
      scenes[2].person.currentTool = "wrench";
      scenes[2].draw();
      break;
    // soldering iron
    case 3:
      scenes[3].person.currentTool = "solderingiron";
      scenes[3].draw();
      break;
  }
  checkState();
}

// check if the person can advance ot the next level
function checkState(){
  if(levelCount >= 1){
    if(scenes[levelCount].person.enthusiasm >= 1 && scenes[levelCount].person.experience == 100){
      levelCount++;
      console.log("new level " + levelCount);
      // reset the experience for the person in the new scene
      scenes[levelCount].person.resetEs();
      // set the done bit for the scene
      scenes[levelCount].isDone = true;
    // if you lose all your enthusiasm you have to go bakc a level 
    }else if(scenes[levelCount].person.enthusiasm == 0){
      levelCount--;
      resetScenes();
      scenes[levelCount].person.resetEs(); 
    }
  }
}

// keep track of the enter key
function keyPressed(){
  // generic counter
  if(keyCode === ENTER){
    enterCount++;
    // activate the first level
    if(enterCount > 1 && levelCount <= 0){
      levelCount = 1;
    // special logic for the screen that asks you to increase your browser zoom
    // }else if(scenes[levelCount].infoDone = false){
    //   scenes[levelCount].infoDone = true;
    }else{
      // if we're in a scene set the introDone flag
      scenes[levelCount].introDone = true;
    }
    // 
    if(levelCount == 3 && scenes[levelCount].isDone == true){
      levelCount = 0;
      enterCount = 0;
      resetScenes();
    }
  }
  
  console.log(enterCount , levelCount, scenes[levelCount].infoDone, scenes[levelCount].introDone, restart); 
}

// reset the flags in all the scenes
function resetScenes(){
  for(let i = 0; i < scenes.length; i++){
    scenes[i].isDone = false;
    scenes[i].introDone = false;
  }
}

