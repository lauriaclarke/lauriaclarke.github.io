const CANVASX = 500;
const CANVASY = 500;

const INHALEPAUSE = 3000;
const EXHALEPAUSE = 3000;

const INHALEMID_START = 0.12;
const INHALEMID_STOP  = 0.16;
const INHALEMID_DURATION  = INHALEMID_STOP - INHALEMID_START;

const EXHALEMID_START = 0.177
const EXHALEMID_STOP  = 0.25
const EXHALEMID_DURATION  = EXHALEMID_STOP - EXHALEMID_START;

let inhale;
let exhale;

let inhale_start;
let inhale_mid;
let inhale_stop;
let exhale_start;
let exhale_mid;
let exhale_stop;

var inhalePause; 
var exhalePause; 
var inhaleRate;  
var exhaleRate;  
var inhaleVolume;
var exhaleVolume;

var state = 0;
var start = false;
var manual = true;

var timeA = 0;
var timeB = 0;

var loopCount = 0;

function preload(){
  inhale = loadSound("inhale.mp3");
  exhale = loadSound("exhale.mp3");
  // inhale = loadSound("inhale2.mp3");
  // exhale = loadSound("exhale2.mp3");
 
 // inhale_start = loadSound("inhale_start.mp3");    
 // inhale_mid   = loadSound("inhale_mid.mp3");      
 // inhale_stop  = loadSound("inhale_stop.mp3");     
 // exhale_start = loadSound("exhale_start.mp3");     
 // exhale_mid   = loadSound("exhale_mid.mp3");     
 // exhale_stop  = loadSound("exhale_stop.mp3");                          
}                          

function setup() {
  createCanvas(CANVASX, CANVASY);
  // the play button
  play = createButton("start");
  play.position(width / 2 - 50, height - 50);
  play.mousePressed(buttonPlay);

  // the control button
  manualCtrl = createButton("auto");
  manualCtrl.position(width / 2 + 50, height - 50);
  manualCtrl.mousePressed(buttonManual);

  // inhale volume slider
  sliderInhaleVolume = createSlider(0, 1, 0.5, 0.01);
  sliderInhaleVolume.position(150, 10);
  sliderInhaleVolume.style('width', '200px');
  // exhale volume slider
  sliderExhaleVolume = createSlider(0, 1, 0.5, 0.01);
  sliderExhaleVolume.position(150, 30);
  sliderExhaleVolume.style('width', '200px');

  // inhale pause slider
  sliderInhalePause = createSlider(0, 5000, 2500, 100);
  sliderInhalePause.position(150, 60);
  sliderInhalePause.style('width', '200px');
  // exhale pause slider
  sliderExhalePause = createSlider(0, 5000, 2500, 100);
  sliderExhalePause.position(150, 80);
  sliderExhalePause.style('width', '200px');

  // inhale speed slider
  sliderInhaleRate = createSlider(0.8, 1.2, 1, 0.01);
  sliderInhaleRate.position(150, 120);
  sliderInhaleRate.style('width', '200px');
  // exhale speed slider
  sliderExhaleRate = createSlider(0.8, 1.2, 1, 0.01);
  sliderExhaleRate.position(150, 140);
  sliderExhaleRate.style('width', '200px');

  // single slider
  sliderSingle = createSlider(0, 1, 0.5, 0.1);
  sliderSingle.position(150, 280);
  sliderSingle.style('width', '200px');
  

  console.log("inhale " + inhale.duration());
  console.log("exhale " + exhale.duration());
}

// 
function draw() {
  background(255, 60, 80);

  if(start && manual){
    breathe(sliderInhalePause.value(), sliderExhalePause.value(), 
            sliderInhaleRate.value(), sliderExhaleRate.value(),
            sliderInhaleVolume.value(), sliderExhaleVolume.value());
  }else if(start && !manual){
    // console.log(random() < 0.01 - sliderSingle.value() / 100);
    // add some randomization to the inhale and exhale cadence based on the slider
    // inhale cadence
    if(random() < 0.015 - sliderSingle.value() / 100){
      inhalePause = 0;
    }else{
      inhalePause = sliderSingle.value() * 1000;
    }
    // exhale cadence
    if(random() < 0.015 - sliderSingle.value() / 100){
      exhalePause = 0;
    }else{
      exhalePause = sliderSingle.value() * 1000;
    }


    // inhale volume
    if(random() < 0.015 - sliderSingle.value() / 100){
      inhaleVolume = random(0.3, 1);
    }else{
      inhaleVolume = 1 - sliderSingle.value() + 0.3;
    }
    // exhale volume
    if(random() < 0.015 - sliderSingle.value() / 100){
      exhaleVolume = random(0.2, 1);
    }else{
      exhaleVolume = 1 - sliderSingle.value() + 0.2;
    }


    // inhale volume
    if(random() < 0.015 - sliderSingle.value() / 100){
      inhaleRate = random(0.8, 1.2);
    }else{
      inhaleRate = 1;
    }
    // exhale volume
    if(random() < 0.015 - sliderSingle.value() / 100){
      exhaleRate = random(0.8, 1.2);
    }else{
      exhaleRate = 1;
    }


    // inhaleRate  = 1; // sliderSingle.value() * 100;
    // exhaleRate  = 1; // sliderSingle.value() * 100;
    // inhaleVolume = 0.5; //sliderSingle.value() * 100;
    // exhaleVolume = 0.5; //sliderSingle.value() * 100;
    breathe(inhalePause, exhalePause, inhaleRate, exhaleRate, inhaleVolume, exhaleVolume);
  }

  drawText();
}

// breathing based on manual sliders
function breathe(inhalePause, exhalePause, inhaleRate, exhaleRate, inhaleVolume, exhaleVolume){

  // set volumes
  inhale.setVolume(inhaleVolume);
  exhale.setVolume(exhaleVolume);

  switch(state){
    // INHALE: play inhale
    case 0:
      // start the inhale
      if(!inhale.isPlaying()){
        inhale.rate(inhaleRate); 
        inhale.play();
      }
      inhale.onended(switchState);
    break;
    
    // INHALEPAUSE: wait for exhale
    case 1:
      loopCount = 0;
      // use this logic instead of a while loop for happy computer
      if(timeA == 0){
        timeA = millis();
      } 
      if(millis() - timeA < inhalePause){
        // console.log("waiting for exhale");
      }else{
        state = 2;
        timeA = 0;
      }
    break;

    // EXHALE: play exhale
    case 2:
      if(!exhale.isPlaying()){ 
        exhale.rate(exhaleRate); 
        exhale.play();
      }
      exhale.onended(switchState);
    break; 
    
    // EXHALEPAUSE: wait for inhale
    case 3:
      // use this logic instead of a while loop for happy computer
      if(timeB == 0){
        timeB = millis();
      }
      if(millis() - timeB < exhalePause){
        // console.log("waiting for inhale");
      }else{
        state = 0;
        timeB = 0;
      }
    break;
  }
}

// increment the state variable
function switchState(){
  // console.log("clip ended");
  state = state + 1;
}

// start and stop the sketch
function buttonPlay(){
  if(start == false){
    start = true;
    play.html("stop");
  }else{
    start = false;
    play.html("start");
  }
}

// change from manual control to single slider 
function buttonManual(){
  if(manual == false){
    manual = true;
    manualCtrl.html("auto");
  }else{
    manual = false;
    manualCtrl.html("manual");
  }
}

// text for sliders
function drawText(){
  fill('black');
  text("volume sliders", 50, 30);
  text("pause sliders", 50, 80);
  text("rate sliders", 50, 140);
  text("single sliders", 50, 300);
}

/*
  rectMode(CENTER);
  createCanvas(CANVASX, CANVASY);
  capture = createCapture(VIDEO);
  capture.size(CANVASX / SCALE, CANVASY / SCALE);
  // get the microphone input
  mic = new p5.AudioIn();
  mic.start();
  // instantiate an fft of the microphone
  fft = new p5.FFT();
  fft.setInput(mic);
  // hide the mini image
  capture.hide();

//  if (!inhale.isPlaying() || !exhale.isPlaying()) {
//    inhale.loop();
//    exhale.loop();
//    play.html("stop");
//  } else {
//    inhale.pause();
//    exhale.pause();
//    play.html("start");
//  }

*/

