// canvas
var canvasX = 4000;
var canvasY = 600;
var nDays = 55;

function setup(){
  createCanvas(canvasX, canvasY);
  textAlign(CENTER, CENTER);
}

function draw() {
  var x1 = 0 + 100;
  var y1 = canvasY / 2;
  var x2 = 0 + 100;
  var y2 = canvasY / 2;

  increment  = (canvasX - 100 )/ (nDays + 1); 
  console.log(toolUse.length);
  for(let i = 0; i < toolUse.length; i++){
    line(x1, y1, x2, y2);
    ellipse(x2, y2, 5, 5);
    printTools(x2, i);
    x2 = x1
    x1 += increment;
  }
  background();
}

function printTools(x, index){
  if(toolUse[index] != undefined){
    for(let i = 0; i < toolUse[index].length; i++){
       text(toolNames[toolUse[index][i]], x, canvasY / 2 - (i + 1) * 20);
    }
  }
}
