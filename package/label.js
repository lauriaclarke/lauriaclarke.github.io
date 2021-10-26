/* plan:
 *
 * label
 *   height 
 *   width
 *   basket
 *     height
 *     nwindows
 *   berries
 *     fillheight
 *     type
 *   front text
 *   back text
 *   left text
 *   right text
 *
 * individualpackage
 *   npate
 *   outside
 *   inside
 *
 * casepackage
 *   nboxes
 *   boxsize
 *   outside
 */

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

//---------------------------------------------
// LABEL
function Label(bounds, name){
  // savet he bounds for other stuff
  this.bounds = bounds;
  // name for the label
  this.name = name;
  // H and W
  this.height = bounds.size.height;
  this.width  = bounds.size.width;
  // basket hole dimensions
  this.holeW = 0.20 * INCH;
  this.holeOffset = 0.20 * this.width;
  // type of berries
  this.berryType = 'Black Currant';
  // basket and berries
  this.basket = null;
  this.berries = null;
  this.text = null;
  // final grouping with text and illustration
  this.g = null;
  // number of pieces
  this.nPieces = 9;
}

// TODO make the holes better...there should be a single width 
Label.prototype.makeLabel = function(){
  //
  this.g = new paper.Group(); 
  this.g.name = this.name;
  if(this.name == 'top'){
    this.makeBerries();
  }else if(this.name == 'right' || this.name == 'left'){
    this.height = this.bounds.size.width;
    this.width =  this.bounds.size.height;
    this.makeBasket();
  }else{
    this.makeBasket();
  }
  this.placeText();
  this.g.addChild(this.text);
  this.g.addChild(this.berries);
  this.g.addChild(this.basket);
  this.g.reverseChildren();
  // if the side contains text, make sure it's on top
  if(this.g.children['text'] != null){
    console.log(this.g.children['text'].children);
    this.g.children['text'].bringToFront();
  }
  console.log(this.g);
}

// basket
Label.prototype.makeBasket = function(){
  // create the group
  const basket = new paper.Group();
  // add the outer basket to the basket group
  var outerBasket = new paper.Path.Rectangle(0, 0, this.width, this.height);
  outerBasket.name = 'outerbasket';
  // basket.addChild(outerBasket);
  // add the outer basket to the array
  // if this isn't the bottom, add holes
  if(this.name != "bottom"){
    this.holeH = this.height / 2;
    var x = this.holeOffset;
    var i = 0;
    while(x < this.width - this.holeOffset){
      var basketHole = new paper.Path.Rectangle([0, this.height / 2], [this.holeW, this.holeH], [10, 10]);
      basketHole.position.x = x;
      basketHole.name = 'baskethole_' + i;
      basketHole.strokeColor = 'black';
      basket.addChild(basketHole);
      x = x + this.holeW * 2.5;
      i++;
    }
  }
  // this is some weird organization to get the holes centered on the label
  basket.bounds.bottomCenter = outerBasket.bounds.bottomCenter;
  basket.addChild(outerBasket);
  basket.children['outerbasket'].sendToBack();
  // the basket
  basket.name = "basket";
  basket.strokeColor = "black";
  basket.strokeWidt = 0.5;
  basket.fillColor = 'teal';
  // console.log(basket);
  this.basket = basket;
}

// berries
Label.prototype.makeBerries = function(){
  var nBerries = this.height * this.width / BERRY_SIZE;
  // var berries = [];
  var berries = new paper.Group({name:"berries"});
  console.log(nBerries);
  for(let i = 0; i < nBerries / 4; i++){
    var b;
    if(this.berryType == 'Black Currant'){
      var b = new Currant('Black');
      b.name = 'bc_' + i;
    }else if(this.berryType == 'Red Currant'){
      b = new Currant('Red');
      b.name = 'rc_' + i;
    }else if(this.berryType == 'White Currant'){
      b = new Currant('White');
      b.name = 'wc_' + i;
    }else if(this.berryType == 'Raspberry'){
      b = new Raspberry();
      b.name = 'r_' + i;
    }
    b.draw();
    b.move(this.bounds);
    berries.addChild(b.g);
  }
  this.berries = berries;
}

// text
Label.prototype.placeText = function(){
  this.text = new paper.Group({name: 'text'});
  // get fontscale based on aspect ration of package 
  var fontScale;
  if(this.width / 3 >= this.height){
    fontScale = this.bounds.size.height;
  } else {
    fontScale = this.bounds.size.width;
  }
  // switch for each side
  if(this.name == 'top'){
    // if white currants, use blakc text
    var fillColor;
    if(this.berryType == 'White Currant'){
      fillColor = 'black'
    } else {
      fillColor = 'white';
    }
    // better font scale
    if(this.width / 2 >= this.height){
      fontScale = this.bounds.size.height;
    } else {
      fontScale = this.bounds.size.width;
    }
    // main text
    const textA = new paper.PointText(); 
    textA.fontFamily = 'Tienne';
    textA.content = topTextA;
    textA.justification = 'center';
    textA.fillColor = fillColor;
    textA.bounds.topCenter = this.bounds.topCenter;
    textA.fontSize = fontScale * 0.07;
    // pate type
    const textB = new paper.PointText();
    textB.fontFamily = 'Tienne';
    textB.fillColor = fillColor;
    textB.content = '\n' + this.berryType + topTextB;
    textB.justification = 'center';
    textB.bounds.center = this.bounds.center;
    textB.fontSize = fontScale * 0.11;
    // location
    const textC = new paper.PointText();
    textC.fontFamily = 'Tienne';
    textC.fillColor = fillColor;
    textC.content = 'S. Strafford, VT\n';
    textC.justification = 'center';
    textC.bounds.bottomCenter = this.bounds.bottomCenter;
    textC.fontSize = fontScale * 0.07;

    const textD = new paper.PointText();
    textD.fontFamily = 'Tienne';
    textD.fillColor = fillColor;
    textD.content = this.nPieces + ' pieces';
    textD.justification = 'center';
    textD.bounds.bottomCenter = this.bounds.bottomCenter;
    textD.fontSize = fontScale * 0.03;
    // this.text.addChild(textA);
    // this.text.addChild(textB);
    // this.text.addChild(textC);
  }else if(this.name == 'front'){
    const text = new paper.PointText();
    text.fontFamily = 'Tienne';
    text.content = frontText;
    text.justification = 'center';
    text.fillColor = 'black';
    text.fontSize = fontScale * 0.05;
    text.position.x = this.width / 2;
    text.position.y = this.height / 4;
    this.text.addChild(text);
  }else if(this.name == 'left'){
    const text = new paper.PointText();
    text.fontFamily = 'Tienne';
    text.justification = 'center';
    text.fillColor = 'black';
    // flip the fontScale
    if(this.width / 2.5 > this.height){
      text.content = leftText;
    } else {
      text.content = leftTextB;
    }
    fontScale = this.bounds.size.height / 2;
    text.fontSize = fontScale * 0.07;
    text.position.x = this.bounds.size.height / 2;
    text.position.y = this.bounds.size.width / 4;
    this.text.addChild(text);
  }else if(this.name == 'right'){
    const text = new paper.PointText();
    text.fontFamily = 'Tienne';
    text.content = this.berryType + '\n Fruit Pate';
    text.justification = 'center';
    text.fillColor = 'black';
    // flip the fontScale
    if(this.width / 2.5 > this.height){
      fontScale = this.bounds.size.width;
    } else {
      fontScale = this.bounds.size.height;
    }
    fontScale = this.bounds.size.height / 2;
    text.fontSize = fontScale * 0.07;
    text.position.x = this.bounds.size.height / 2;
    text.position.y = this.bounds.size.width / 4;
    this.text.addChild(text);
  }else if(this.name == 'bottom'){
    const text = new paper.PointText();
    text.fontFamily = 'Tienne';
    text.content = bottomText;
    text.justification = 'left';
    text.fillColor = 'black';
    text.fontSize = fontScale * 0.014;
    text.position.x = this.bounds.size.width / 2;
    text.position.y = this.bounds.size.height / 4;
    this.text.addChild(text);
  }
}

//---------------------------------------------
// CURRANT
function Currant(type){
  this.size = BERRY_SIZE;
  this.type = type;
  this.body = null
  this.stem = null;
  this.g = null;
}

// draw currant
Currant.prototype.draw = function(){
  this.body = new paper.Path.Circle(0, 0, this.size);
  // draw the currant body with approproate coloe
  if(this.type == 'Black'){
    this.body.fillColor = '#0a021f'
    this.body.strokeColor = '#09001f';
  }else if(this.type == 'Red'){
    this.body.fillColor = '#e82f0e'
    this.body.strokeColor = '#911701';
  }else if(this.type == 'White'){
    this.body.fillColor = '#ede8b7'
    this.body.strokeColor = '#bdb98f';
  }
  // create a random stem
  this.stem = new paper.Path.Arc([0, 0], [1, 1], [getRandom(0, this.size), getRandom(0, this.size)]);
  this.stem.strokeColor = 'transparent';
  if(Math.random() < 0.35){
    this.stem.strokeColor = 'green';
  }
  this.stem.strokeWidth = 1;
  // add both the stem and body to the g group
  this.g = new paper.Group({name: 'currant', children:[this.stem, this.body]});
}

// move the currant
Currant.prototype.move = function(bounds){
  var currant = new paper.Group(this.body, this.stem);
  // place the berry randomly in the label bounds and rotate it
  currant.position.x = bounds.center.x + getRandom(-bounds.size.width / 2,  bounds.size.width / 2);
  currant.position.y = bounds.center.y + getRandom(-bounds.size.height / 2, bounds.size.height / 2);

  currant.rotation = getRandom(0, 360);
}

//---------------------------------------------
// RASPBERRY
function Raspberry(){
  this.size = BERRY_SIZE * 3;
  this.kernelSize = BERRY_SIZE * 3 / 10;
  this.nRows = 6;
  this.nCol = [6, 6, 5, 4, 3];
  this.offsets = [0, 0, 0.5, 0.5, 0.5];
  this.kSpace = 1.5;
  this.kernels = null;
  this.g = null;
}
// TODO improve the raspberry "look"
// draw a raspberry
Raspberry.prototype.draw = function(bounds){
  var kernels = [];
  var index = 0;
  // create a bunch of raspberry kernels
  for(let k = 0; k < this.nRows; k++){
    for(let l = 0; l < this.nCol[k]; l++){
      // create a circle path 
      kernels[index] = new paper.Path.Circle(this.kernelSize / 2 * (k - 1)+ this.kernelSize * this.kSpace * l, this.kernelSize * this.kSpace * k, this.kernelSize);
      kernels[index].fillColor = '#e82f0e'
      kernels[index].strokeColor = 'black';
      // aarray index
      index = index + this.nCol[k] + l; 
    }
  }
  // add the kernels to a group
  const kernelGroup = new paper.Group({name:"kernels", children: kernels});
  this.kernels = kernelGroup;
  // yes, this is redundant....
  this.g = this.kernels;
}

Raspberry.prototype.move = function(bounds){
  // place the berry randomly in the label bounds
  this.kernels.position.x = bounds.center.x + getRandom(-bounds.size.width / 2, bounds.size.width / 2);
  this.kernels.position.y = bounds.center.y + getRandom(-bounds.size.height / 2, bounds.size.height / 2);
  this.kernels.rotation = getRandom(0, 360);
}



