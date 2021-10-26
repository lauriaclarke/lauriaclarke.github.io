// TODO inside package
// TODO make a blueberry!
// TODO change how text scales deoending on aspect ration of basket side
// TODO figure out what's going on with the text...doesn't seem like it's being added properly
// TODO make the black currants lighter
// TODO check the real size
// TODO add better tabs 

const INCH = 72;
const BERRY_SIZE = 10;
const PATE_HEIGHT = 1.125;
const PATE_WIDTH = 1.166;

function setup() {
  const paper_canvas = document.createElement("canvas");
  paper_canvas.setAttribute("width", "800");
  paper_canvas.setAttribute("height", "800");
  document.body.append(paper_canvas);
  paper.setup(paper_canvas);
}

function main(){
  setup();

  document.getElementById("layers").addEventListener("input", onInput);
  document.getElementById("rows").addEventListener("input", onInput);
  document.getElementById("columns").addEventListener("input", onInput);
  document.getElementById("berrytype").addEventListener("input", onInput);
  document.getElementById("download").addEventListener("click", () => {downloadSVG("box.svg");});

  onInput();
}

window.addEventListener("load", main);


const allRanges = document.querySelectorAll(".range-wrap");
allRanges.forEach(wrap => {
  const range = wrap.querySelector(".range");
  const bubble = wrap.querySelector(".bubble");

  range.addEventListener("input", () => {
    setBubble(range, bubble);
  });
  setBubble(range, bubble);
});

function setBubble(range, bubble) {
  const val = range.value;
  const min = range.min ? range.min : 0;
  const max = range.max ? range.max : 100;
  const newVal = Number(((val - min) * 100) / (max - min));
  bubble.innerHTML = val;

  // Sorta magic numbers based on size of the native UI thumb
  bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}



//---------------------------------------------
// FUNCTIONAL STUFF 

function generate(height, width, depth, berryType, nPieces){
  // make the package pattern
  var p1 = new Package(height, width, depth);
  p1.makePattern();
  
  var pp = p1.pattern.children;
  // front: create a label and then center it on package side
  var frontLabel = new Label(pp.front.bounds, 'front');
  frontLabel.makeLabel();
  frontLabel.g.bounds.point = pp.front.bounds.point;
  // back
  var backLabel = new Label(pp.back.bounds, 'back');
  backLabel.makeLabel();
  backLabel.g.bounds.point = pp.back.bounds.point;
  backLabel.g.rotation = 180; 
  // left
  var leftLabel = new Label(pp.left.bounds, 'left');
  leftLabel.makeLabel();
  leftLabel.g.bounds.center = pp.left.bounds.center;
  leftLabel.g.rotation = 270;
  // right
  var rightLabel = new Label(pp.right.bounds, 'right');
  rightLabel.makeLabel();  
  rightLabel.g.bounds.center = pp.right.bounds.center;
  rightLabel.g.rotation = 90;
  // bottom
  var bottomLabel = new Label(pp.bottom.bounds, 'bottom');
  bottomLabel.makeLabel();  
  bottomLabel.g.bounds.center = pp.bottom.bounds.center;
  // top
  var topLabel = new Label(pp.top.bounds, 'top');
  topLabel.berryType = berryType;
  topLabel.nPieces = nPieces;
  topLabel.makeLabel();

  return p1;
}

// center view on `target` item, and zoom to fit (active layer is whatever layer is active in the paper project at the moment)
function showItem(target = paper.project.activeLayer) {
  // project.view.center is the center of whatever the object I pass to 
  paper.project.view.center = target.bounds.center;
  // project.view.zoom expands the view to match the "paper size" in the largest dimension 
  paper.project.view.zoom = Math.min(
    paper.project.view.bounds.height / target.bounds.height,
    paper.project.view.bounds.width / target.bounds.width
  );
}

// random number generator
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

// downloads the paper drawing as svg
function downloadSVG(fileName) {
  // use default name if not provided
  fileName = fileName || "output.svg";
  // create a data url of the file
  var svgData = paper.project.exportSVG({ bounds: "content", asString: true });
  var url = "data:image/svg+xml;utf8," + encodeURIComponent(svgData);
  // create an off-document link to the data, and "click" it
  var link = document.createElement("a");
  link.download = fileName;
  link.href = url;
  link.click();
}

// grab input from the html
function onInput() {
  const height = document.getElementById("layers").value * PATE_HEIGHT * INCH;
  const width = document.getElementById("rows").value * PATE_WIDTH * INCH;
  const depth = document.getElementById("columns").value * PATE_WIDTH * INCH;
  const berryType = document.getElementById("berrytype").value;
  var nPieces = document.getElementById("layers").value * document.getElementById("columns").value * document.getElementById("rows").value;
  // validate inputs here
  console.log(height, width, depth, berryType);
  // clear everything before redrawing
  paper.project.activeLayer.removeChildren();
  var p1 = generate(height, width, depth, berryType, nPieces);
  showItem(p1.pattern);
}

// TODO change the text on the packaging
function updateText() {
  teststring = document.getElementById("fname").value;
}


// justin's code
/*
function main(){
  setup();
  // Create a Paper.js Path to draw a line into it:
  var gourd = new paper.Path();
  gourd.strokeColor = 'red';

  // Defining some variables that will affect more than one point below
  var topOfGourd_y = randomNumber(0, 39);
  var topOfGourdSecondaryPoints = topOfGourd_y + 10;
  var gourd_width = randomNumber(42, 77);

  // Creating the points
  var p1 = new paper.Point(50, 100);
  // var p2 = new Point(randomNumber(11, 30), 80);
  var p2 = new paper.Point(50 - gourd_width/2, 79);
  var p3 = new paper.Point(37, 55);
  var p4 = new paper.Point(43, topOfGourdSecondaryPoints);
  var p5 = new paper.Point(randomNumber(46, 53), topOfGourd_y);
  var p6 = new paper.Point(60, topOfGourdSecondaryPoints);
  var p7 = new paper.Point(64, 55);
  var p8 = new paper.Point(50 + gourd_width/2, 79);

  gourd.closed = true;
  
  gourd.add(p1, p2, p3, p4, p5, p6, p7, p8);

  gourd.smooth({ type: 'continuous' });

  gourd.fillColor = 'blue';

  // Handler function, random number within a range
  function randomNumber(min, max) {
		return Math.random() * (max - min) + min;
	}

  // Show the selected lines when I click on the gourd
  function onMouseDown(event) {
		gourd.fullySelected = true;
	}
	function onMouseUp(event) {
		gourd.fullySelected = false;
	}
}

window.addEventListener("load", main);
*/

// require https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.12.11/paper-full.min.js

/* globals paper*/
/* exported downloadSVG*/

/*
         ┌───────┐
         │       │
         │ front │
      gf │       │  gf
  ┌──────┼───────┼──────┐
  │      │       │      │
 f│left  │bottom │right │f
  │      │       │      │
  └──────┼───────┼──────┘
      gf │       │  gf
         │back   │
         │       │
         ├───────┤
         │       │
         │top    │
         │       │
         └───────┘
             f
*/
/*
const INCH = 72;
const TAB_WIDTH = 0.5 * INCH;
// const DEBUG = false;

// create a canvas and attach paper to it
function setup() {
  const paper_canvas = document.createElement("canvas");
  paper_canvas.setAttribute("width", "800");
  paper_canvas.setAttribute("height", "800");
  document.body.append(paper_canvas);
  paper.setup(paper_canvas);
}

// downloads the paper drawing as svg
// adapted from https://compform.net/vectors/
function downloadSVG(fileName) {
  // use default name if not provided
  fileName = fileName || "output.svg";

  // create a data url of the file
  var svgData = paper.project.exportSVG({ bounds: "content", asString: true });
  var url = "data:image/svg+xml;utf8," + encodeURIComponent(svgData);

  // create an off-document link to the data, and "click" it
  var link = document.createElement("a");
  link.download = fileName;
  link.href = url;
  link.click();
}

// center view on `target` item, and zoom to fit
// active layer is whatever layer is active in the paper project at the moment
function showItem(target = paper.project.activeLayer) {
  // project.view.center is the center of whatever the object I pass to 
  paper.project.view.center = target.bounds.center;
  // project.view.zoom expands the view to match the "paper size" in the largest dimension 
  paper.project.view.zoom = Math.min(
    paper.project.view.bounds.height / target.bounds.height,
    paper.project.view.bounds.width / target.bounds.width
  );
}

// create a box template with given dimensions
function makeBoxPattern(width, height, depth) {
  // front
  const front_r = new paper.Rectangle(height, 0, width, height);
  const front = new paper.Path.Rectangle(front_r);
  front.name = "front";
  front.fillColor = "red";

  // bottom
  const bottom_r = new paper.Rectangle(height, height, width, depth);
  const bottom = new paper.Path.Rectangle(bottom_r);
  bottom.name = "bottom";
  bottom.fillColor = "orange";

  // back
  const back_r = new paper.Rectangle(height, height + depth, width, height);
  const back = new paper.Path.Rectangle(back_r);
  back.name = "back";
  back.fillColor = "yellow";

  // top
  const top_r = new paper.Rectangle(
    height,
    height + depth + height,
    width,
    depth
  );
  const top = new paper.Path.Rectangle(top_r);
  top.name = "top";
  top.fillColor = "green";

  // left
  const left_r = new paper.Rectangle(0, height, height, depth);
  const left = new paper.Path.Rectangle(left_r);
  left.name = "left";
  left.fillColor = "blue";

  // right
  const right_r = new paper.Rectangle(height + width, height, height, depth);
  const right = new paper.Path.Rectangle(right_r);
  right.name = "right";
  right.fillColor = "indigo";

  // top_tab_1
  const top_tab_1 = makeTab(
    new paper.Rectangle(
      height,
      height + depth + height + depth,
      width,
      TAB_WIDTH
    )
  );
  top_tab_1.rotation = 180;
  top_tab_1.name = "top_tab_1";

  // left_tab_1
  const left_tab_1 = makeTab(
    new paper.Rectangle(0, height - TAB_WIDTH, height, TAB_WIDTH)
  );
  left_tab_1.name = "left_tab_1";

  // left_tab_2
  const left_tab_2 = makeTab(
    new paper.Rectangle(0, height + depth, height, TAB_WIDTH)
  );
  left_tab_2.rotation = 180;
  left_tab_2.name = "left_tab_2";

  // left_tab_3
  const left_tab_3 = makeTab(new paper.Rectangle(0, 0, depth, TAB_WIDTH));
  left_tab_3.rotation = -90;
  left_tab_3.position = new paper.Point(-TAB_WIDTH * 0.5, height + depth * 0.5);
  left_tab_3.name = "left_tab_3";

  // right_tab_1
  const right_tab_1 = makeTab(
    new paper.Rectangle(height + width, height - TAB_WIDTH, height, TAB_WIDTH)
  );
  right_tab_1.name = "right_tab_1";

  // right_tab_2
  const right_tab_2 = makeTab(
    new paper.Rectangle(height + width, height + depth, height, TAB_WIDTH)
  );
  right_tab_2.rotation = 180;
  right_tab_2.name = "right_tab_2";

  // right_tab_3
  const right_tab_3 = makeTab(new paper.Rectangle(0, 0, depth, TAB_WIDTH));
  right_tab_3.rotation = 90;
  right_tab_3.position = new paper.Point(
    height + width + height + TAB_WIDTH * 0.5,
    height + depth * 0.5
  );
  right_tab_3.name = "right_tab_3";

  // group + style
  const box = new paper.Group({
    name: "box",
    children: [
      front,
      bottom,
      back,
      top,
      left,
      right,
      top_tab_1,
      left_tab_1,
      left_tab_2,
      left_tab_3,
      right_tab_1,
      right_tab_2,
      right_tab_3,
    ],
    strokeColor: "black",
    strokeWidth: 0.5,
    fillColor: null,
  });

  return box;
}

// create an up-pointing tab in `bounds`
// bounds should be at least twice as wide as it is tall
function makeTab(bounds) {
  const tab = new paper.Path.Rectangle(bounds);
  tab.segments[1].point.x += bounds.height;
  tab.segments[2].point.x -= bounds.height;
  tab.fillColor = "violet";
  return tab;
}

function main() {
  console.log("main");
  setup();

  const pattern = makeBoxPattern(6 * INCH, 4 * INCH, 3 * INCH);
  showItem(pattern);

  // downloadSVG("box.svg");
}

window.addEventListener("load", main);
*/
