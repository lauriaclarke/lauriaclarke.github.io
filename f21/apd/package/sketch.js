// TODO make a blueberry!
// TODO change how text scales deoending on aspect ration of basket side
// TODO figure out what's going on with the text...doesn't seem like it's being added properly
// TODO make the black currants lighter

const INCH = 72;
const BERRY_SIZE = 10;
const PATE_HEIGHT = 1.125;
const PATE_WIDTH = 1.166;

function setup() {
  const paper_canvas = document.createElement("canvas");
  paper_canvas.setAttribute("width", "800");
  paper_canvas.setAttribute("height", "800");
  paper_canvas.style = "position:absolute; left: 25%;";
  document.body.append(paper_canvas);
  paper.setup(paper_canvas);
}

function main(){
  setup();

  document.getElementById("2x2").addEventListener("input", onInput);
  document.getElementById("3x3").addEventListener("input", onInput);
  document.getElementById("3x6").addEventListener("input", onInput);
  document.getElementById("3x6x2").addEventListener("input", onInput);
  document.getElementById("case").addEventListener("input", onInput);
  document.getElementById("doublecase").addEventListener("input", onInput);
  document.getElementById("custom").addEventListener("input", onInput);
  document.getElementById("layers").addEventListener("input", onInput);
  document.getElementById("rows").addEventListener("input", onInput);
  document.getElementById("columns").addEventListener("input", onInput);
  document.getElementById("berrytype").addEventListener("input", onInput);
  document.getElementById("download").addEventListener("click", () => {downloadSVG("box.svg");});

  onInput();
}

window.addEventListener("load", main);


//---------------------------------------------
// FUNCTIONAL STUFF 

function generate(height, width, depth, berryType, nPieces, iscase){
  // make the package pattern
  var p1 = new Package(height, width, depth, iscase);
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

  if(iscase){
    // top label for a case
    var topLabel = new Label(pp.top.bounds, 'topcase');
    topLabel.berryType = berryType;
    topLabel.nPieces = nPieces;
    topLabel.makeLabel();
  }else{
    // normal top label
    var topLabel = new Label(pp.top.bounds, 'top');
    topLabel.berryType = berryType;
    topLabel.nPieces = nPieces;
    topLabel.makeLabel();
  }


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
function onInput(){
  var height; 
  var width;
  var depth ;
  var berryType;
  var nPieces;
  var iscase = false;
  // if the custom checkbox is checked use the sliders
  if(document.getElementById("custom").checked){
    height = document.getElementById("layers").value * PATE_HEIGHT * INCH;
    width = document.getElementById("rows").value * PATE_WIDTH * INCH;
    depth = document.getElementById("columns").value * PATE_WIDTH * INCH;
    berryType = document.getElementById("berrytype").value;
    nPieces = document.getElementById("layers").value * document.getElementById("columns").value * document.getElementById("rows").value;
  }else{
    if(document.getElementById("2x2").checked){
      height = PATE_HEIGHT * INCH; 
      width = 2 * PATE_WIDTH * INCH;
      depth = 2 * PATE_WIDTH * INCH;
      berryType = document.getElementById("berrytype").value;
      nPieces = 4;
    }else if(document.getElementById("3x3").checked){
      height = PATE_HEIGHT * INCH; 
      width = 3 * PATE_WIDTH * INCH;
      depth = 3 * PATE_WIDTH * INCH;
      berryType = document.getElementById("berrytype").value;
      nPieces = 9;
    }else if(document.getElementById("3x6").checked){
      height = PATE_HEIGHT * INCH; 
      width = 6 * PATE_WIDTH * INCH;
      depth = 3 * PATE_WIDTH * INCH;
      berryType = document.getElementById("berrytype").value;
      nPieces = 12;
    }else if(document.getElementById("3x6x2").checked){
      height = 2 * PATE_HEIGHT * INCH; 
      width = 6 * PATE_WIDTH * INCH;
      depth = 3 * PATE_WIDTH * INCH;
      berryType = document.getElementById("berrytype").value;
      nPieces = 24;
    }else if(document.getElementById("case").checked){
      height = 3.5 * INCH; 
      width = 7.5 * INCH;
      depth = 8 * INCH;
      berryType = document.getElementById("berrytype").value;
      nPieces = 12;
      iscase = true;
    }else if(document.getElementById("doublecase").checked){
      height = 3.5 * INCH; 
      width = 11 * INCH;
      depth = 9 * INCH;
      berryType = document.getElementById("berrytype").value;
      nPieces = 24;
      iscase = true;
    }else{
      height = PATE_HEIGHT * INCH; 
      width = 2 * PATE_WIDTH * INCH;
      depth = 2 * PATE_WIDTH * INCH;
      berryType = document.getElementById("berrytype").value;
      nPieces = 9;
    }
  }

  // validate inputs here
  console.log(height, width, depth, berryType, iscase);
  // clear everything before redrawing
  paper.project.activeLayer.removeChildren();
  var p1 = generate(height, width, depth, berryType, nPieces, iscase);
  showItem(p1.pattern);
}


function refreshPage(){
    window.location.reload();
} 



