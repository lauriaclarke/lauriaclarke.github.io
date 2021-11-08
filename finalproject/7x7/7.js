let bgCol;
let canvas;
let button;
let songA;
let songB;
var lockVol = false;
var volumeA;


function preload() {
  songA = loadSound("breathsounds/b1.mov");
  songB = loadSound("breathsounds/b2.m4a");
}

function setup() {
  createCanvas(400, 100);
  // the button
  play = createButton("start");
  play.position(50, 10);
  play.mousePressed(buttonPlay);
  // lock volume ratio
  lock = createButton("lock");
  lock.position(50, 30);
  lock.mousePressed(lockVolume);
  // healthy slider
  sliderA = createSlider(0, 1, 0.5, 0.01);
  sliderA.position(150, 10);
  sliderA.style('width', '200px');
  // sick slider
  sliderB = createSlider(0, 1, 0.5, 0.01);
  sliderB.position(150, 30);
  sliderB.style('width', '200px');
}

// 
function draw() {
  background(255, 60, 80);
  if(lockVol){
    console.log(volumeA); 
    songA.setVolume(volumeA);
    songB.setVolume(sliderB.value());
  } else {
    songA.setVolume(sliderA.value());
    songB.setVolume(sliderB.value());
  }
}

// start and stop
function buttonPlay() {
  if (!songA.isPlaying() || !songB.isPlaying()) {
    songA.loop();
    songB.loop();
    play.html("stop");
  } else {
    songA.pause();
    songB.pause();
    play.html("start");
  }
}

// lock the healthy volume to be 1 - the sick slider
function lockVolume(){
  lockVol = !lockVol;
  if(lockVol == true){
    lock.html("unlock");
    volumeA = 1 - sliderB.value();
  } else {
    lock.html("lock");
  }
}
