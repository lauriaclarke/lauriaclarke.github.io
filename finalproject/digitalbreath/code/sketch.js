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

var state = 0;
var start = false;

var timeA = 0;
var timeB = 0;

var loopCount = 0;

function preload(){
  inhale = loadSound("inhale.mp3");
  exhale = loadSound("exhale.mp3");
}

function setup() {
  createCanvas(CANVASX, CANVASY);
  // the button
  play = createButton("start");
  play.position(width / 2, height - 50);
  play.mousePressed(buttonPlay);

  // inhale volume slider
  sliderA = createSlider(0, 1, 0.5, 0.01);
  sliderA.position(150, 10);
  sliderA.style('width', '200px');
  // exhale volume slider
  sliderB = createSlider(0, 1, 0.5, 0.01);
  sliderB.position(150, 30);
  sliderB.style('width', '200px');

  // inhale pause slider
  sliderInhalePause = createSlider(0, 10000, 5000, 500);
  sliderInhalePause.position(150, 60);
  sliderInhalePause.style('width', '200px');
  // exhale pause slider
  sliderExhalePause = createSlider(0, 10000, 5000, 500);
  sliderExhalePause.position(150, 80);
  sliderExhalePause.style('width', '200px');

  // inhale speed slider
  sliderInhaleSpeed = createSlider(0.1, 2, 1, 0.1);
  sliderInhaleSpeed.position(150, 120);
  sliderInhaleSpeed.style('width', '200px');
  // exhale speed slider
  sliderExhaleSpeed = createSlider(0.1, 2, 1, 0.1);
  sliderExhaleSpeed.position(150, 140);
  sliderExhaleSpeed.style('width', '200px');


  console.log("inhale " + inhale.duration());
  console.log("exhale " + exhale.duration());
}

// 
function draw() {
  background(255, 60, 80);

  if(start){

    switch(state){
      // INHALE: play inhale
      case 0:
        console.log(inhale.isPlaying());
        // start the inhale
        if(!inhale.isPlaying()){
          // inhale.rate(sliderInhaleSpeed.value()); 
          inhale.play();
        }
        // console.log(inhale.currentTime());
        
        // if we get to the middle section, replay it
        //if(inhale.currentTime() >= INHALEMID_STOP){
        //  inhale.jump(INHALEMID_START); // , INHALEMID_DURATION);
        //}

        // then play the rest of the clip 
       // else if(loopCount >=3){
       //   inhale.jump(INHALEMID_STOP);
       // }

        inhale.onended(switchState);
      break;
      
      // INHALEPAUSE: wait for exhale
      case 1:
        // console.log("state 1");
        loopCount = 0;
        // use this logic instead of a while loop for happy computer
        if(timeA == 0){
          timeA = millis();
        } 
        if(millis() - timeA < sliderInhalePause.value()){
          console.log("waiting for exhale");
        }else{
          state = 2;
          timeA = 0;
        }
      break;

      // EXHALE: play exhale
      case 2:
        // console.log("state 2");
        if(!exhale.isPlaying()){ 
          exhale.rate(sliderExhaleSpeed.value()); 
          exhale.play();
        }
        exhale.onended(switchState);
      break; 
      
      // EXHALEPAUSE: wait for inhale
      case 3:
        // console.log("state 3");
        // use this logic instead of a while loop for happy computer
        if(timeB == 0){
          timeB = millis();
        }
        if(millis() - timeB < sliderExhalePause.value()){
          console.log("waiting for inhale");
        }else{
          state = 0;
          timeB = 0;
        }
      break;
    }
  }

  inhale.setVolume(sliderA.value());
  exhale.setVolume(sliderB.value());
  drawText();
}


// increment the state variable
function switchState(){
  console.log("clip ended");
  state = state + 1;
}



// start and stop the sketch
function buttonPlay() {
  if(start == false){
    start = true;
    play.html("stop");
  }else{
    start = false;
    play.html("start");
  }
}


function drawText(){
  fill('black');
  text("volume sliders", 50, 30)
  text("pause sliders", 50, 80)
  text("rate sliders", 50, 140)
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

