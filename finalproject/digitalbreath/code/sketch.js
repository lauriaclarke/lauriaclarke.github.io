/*

STEPS TO CONNECT TO ARDUINO

1. find correct serial port

2. start python server in this directory on port 8080
   > python3 -m http.server 8080

3. start the p5 serial server
   > p5serial
   (should say that it's running)

*/

const CANVASX = 500;
const CANVASY = 500;

var serial;
// var portName = '/dev/ttyUSB0'; 
var portName = '/dev/ttyACM0'; 

let inhale;
let exhale;

var inhalePause; 
var exhalePause; 
var inhaleRate;  
var exhaleRate;  
var inhaleVolume;
var exhaleVolume;

var state = 0;
var start = false;
var manual = true;
var sensor = false;

var timeA = 0;
var timeB = 0;

var actValue;


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
  createCanvas(windowWidth, windowHeight);

  // create the buttons and sliders
  createControls();

  setupSerial();
   
  console.log("inhale " + inhale.duration());
  console.log("exhale " + exhale.duration());
}

// do the things!
function draw() {
  background(255, 60, 80);

  if(start){
    if(manual && !sensor){
      breathe(sliderInhalePause.value(), sliderExhalePause.value(), 
              sliderInhaleRate.value(), sliderExhaleRate.value(),
              sliderInhaleVolume.value(), sliderExhaleVolume.value());
    }else if(!manual && !sensor){
      randomizeBreath(sliderSingle.value());
      breathe(inhalePause, exhalePause, inhaleRate, exhaleRate, inhaleVolume, exhaleVolume);
    }else if(manual && sensor){
      console.log(actValue);
      randomizeBreath(actValue);
      breathe(inhalePause, exhalePause, inhaleRate, exhaleRate, inhaleVolume, exhaleVolume);
    }else{
      fill('black');
      text("PLEASE CHECK YOUR CONTROL SETTINGS!", width / 2, height / 2);
      console.log("manual " + manual + "  sensor " + sensor);
    }
  }

  drawText();
}


// add some randomization to the cadence, volume and playback rate based on the slider
// takes a value between 0 and 1 
function randomizeBreath(inputValue){
  // inhale cadence
  if(random() < 0.015 - inputValue / 100){
    inhalePause = 0;
  }else{
    inhalePause = inputValue * 1000;
  }
  // exhale cadence
  if(random() < 0.015 - inputValue / 100){
    exhalePause = 0;
  }else{
    exhalePause = inputValue * 1000;
  }

  // inhale volume
  if(random() < 0.015 - inputValue / 100){
    inhaleVolume = random(0.3, 1);
  }else{
    inhaleVolume = 1 - inputValue + 0.3;
  }
  // exhale volume
  if(random() < 0.015 - inputValue / 100){
    exhaleVolume = random(0.2, 1);
  }else{
    exhaleVolume = 1 - inputValue + 0.2;
  }

  // inhale rate
  if(random() < 0.015 - inputValue / 100){
    inhaleRate = random(0.8, 1.2);
  }else{
    inhaleRate = 1;
  }
  // exhale rate
  if(random() < 0.015 - inputValue / 100){
    exhaleRate = random(0.8, 1.2);
  }else{
    exhaleRate = 1;
  }
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

// change from manual control to use the sensor
function buttonSensor(){
  if(sensor == false){
    sensor = true;
    sensorCtrl.html("sensor");
  }else{
    sensor = false;
    sensorCtrl.html("manual");
  }
}

// text for sliders
function drawText(){
  fill('black');
  text("volume sliders", 50, 30);
  text("pause sliders", 50, 80);
  text("rate sliders", 50, 140);
  text("single sliders", 50, 250);
}

// create buttons a sliders for control
function createControls(){
  // the play button
  play = createButton("start");
  play.position(width / 2 - 60, height - 50);
  play.mousePressed(buttonPlay);

  // the control button
  manualCtrl = createButton("auto");
  manualCtrl.position(width / 2, height - 50);
  manualCtrl.mousePressed(buttonManual);

  // the sensor control button
  sensorCtrl = createButton("sensor");
  sensorCtrl.position(width / 2 + 60, height - 50);
  sensorCtrl.mousePressed(buttonSensor);

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
  sliderSingle.position(150, 230);
  sliderSingle.style('width', '200px');
}

// setup the serial connection 
function setupSerial(){
  // initalize serialport library to connect to p5.serialserver on the host:
  serial = new p5.SerialPort();
  // set callback functions for list and data events:
  serial.on('list', printList);
  serial.on('data', serialEvent);
  // open the serial port:
  serial.open(portName);
}

// read from serial connection
function serialEvent() {  
// read a line of text in from the serial port:
  var data = serial.readLine();
  console.log(data);

  // if you've got a valid line, convert it to a number:
  if (data.length > 0) {
    actValue = float(data);
  }

  // send a byte to the microcontroller
  // serial.write("x");
}

// serial stuff 
function printList(portList) {
  // portList is an array of serial port names:
  for (var i = 0; i < portList.length; i++) {
    console.log(i + ' ' + portList[i]);
  }
}

