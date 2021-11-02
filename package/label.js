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
  this.holeOffset = 3 * this.holeW;
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

Label.prototype.makeLabel = function(){
  //
  this.g = new paper.Group(); 
  this.g.name = this.name;
  if(this.name == 'top'){
    this.makeBerries();
  }else if(this.name == 'topcase'){
    this.makeCaseLabel();
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
    // console.log(this.g.children['text'].children);
    this.g.children['text'].bringToFront();
  }
  // console.log(this.g);
}

// basket
// this code works and is messy, but I'm not changing it
Label.prototype.makeBasket = function(){
  // create the group
  const basket = new paper.Group();
  // add the outer basket to the basket group
  var outerBasket = new paper.Path.Rectangle(0, 0, this.width, this.height);
  outerBasket.name = 'outerbasket';
  outerBasket.fillColor = 'teal';
  // if this isn't the bottom, add holes
  if(this.name != "bottom"){
    this.holeH = this.height / 2;
    var x = this.holeOffset;
    var i = 0;
    while(x < this.width - this.holeOffset){
      var basketHole = new paper.Path.Arc([-this.holeW / 2, this.holeW / 2], [0, 0], [this.holeW / 2, this.holeW / 2]);
      var rPoints = [new paper.Point(this.holeW / 2, this.holeW / 2),  new paper.Point(this.holeW / 2, this.holeH)];
      basketHole.addSegments(rPoints);
      var lPoints = [new paper.Point(-this.holeW / 2, this.holeH),  new paper.Point(-this.holeW / 2, this.holeW / 2)];
      basketHole.addSegments(lPoints);
      basketHole.closed = true;
      basketHole.position.x = x;
      basketHole.name = 'baskethole_' + i;
      basketHole.strokeColor = 'black';
      basketHole.fillColor = 'white';
      basket.addChild(basketHole);
      x = x + this.holeW * 2.5;
      // console.log(this.name + "  " + x + "   " + this.height + "  " + this.width + "  " + this.holeOffset);
      i++;
    }
    basket.bounds.bottomCenter = outerBasket.bounds.bottomCenter;
  }else{
    // add mini holes ot the bottom of the basket
    this.holeH = this.height / 2;
    var x = this.holeOffset;
    var i = 0;
    var bottomHolesB = new paper.Group();
    while(x < this.width - this.holeOffset){
      var basketHole = new paper.Path.Arc([-this.holeW / 2, this.holeW / 2], [0, 0], [this.holeW / 2, this.holeW / 2]);
      basketHole.closed = true;
      basketHole.position.x = x;
      basketHole.name = 'baskethole_' + i;
      basketHole.strokeColor = 'black';
      basketHole.fillColor = 'white';
      bottomHolesB.addChild(basketHole);
      x = x + this.holeW * 2.5;
      i++;
    }
    bottomHolesB.bounds.bottomCenter = outerBasket.bounds.bottomCenter;
    basket.addChild(bottomHolesB);
 
    x = this.holeOffset;
    i = 0;
    var bottomHolesL = new paper.Group();
    while(x < this.height - this.holeOffset){
      var basketHole = new paper.Path.Arc([-this.holeW / 2, this.holeW / 2], [0, 0], [this.holeW / 2, this.holeW / 2]);
      basketHole.closed = true;
      basketHole.position.x = x;
      basketHole.name = 'baskethole_' + i;
      basketHole.strokeColor = 'black';
      basketHole.fillColor = 'white';
      bottomHolesL.addChild(basketHole);
      x = x + this.holeW * 2.5;
      i++;
    }
    bottomHolesL.rotation = 90;
    bottomHolesL.bounds.leftCenter = outerBasket.bounds.leftCenter; 
    basket.addChild(bottomHolesL);

    x = this.holeOffset;
    i = 0;
    var bottomHolesR = new paper.Group();
    while(x < this.height - this.holeOffset){
      var basketHole = new paper.Path.Arc([-this.holeW / 2, this.holeW / 2], [0, 0], [this.holeW / 2, this.holeW / 2]);
      basketHole.closed = true;
      basketHole.position.x = x;
      basketHole.name = 'baskethole_' + i;
      basketHole.strokeColor = 'black';
      basketHole.fillColor = 'white';
      bottomHolesR.addChild(basketHole);
      x = x + this.holeW * 2.5;
      i++;
    }
    bottomHolesR.rotation = -90;
    bottomHolesR.bounds.rightCenter = outerBasket.bounds.rightCenter;
    basket.addChild(bottomHolesR);

    x = this.holeOffset;
    i = 0;
    var bottomHolesT = new paper.Group();
    while(x < this.width - this.holeOffset){
      var basketHole = new paper.Path.Arc([-this.holeW / 2, this.holeW / 2], [0, 0], [this.holeW / 2, this.holeW / 2]);
      basketHole.closed = true;
      basketHole.position.x = x;
      basketHole.name = 'baskethole_' + i;
      basketHole.strokeColor = 'black';
      basketHole.fillColor = 'white';
      bottomHolesT.addChild(basketHole);
      x = x + this.holeW * 2.5;
      i++;
    }
    bottomHolesT.rotation = 180;
    bottomHolesT.bounds.topCenter = outerBasket.bounds.topCenter;
    basket.addChild(bottomHolesT);
  }
  // this is some weird organization to get the holes centered on the label
  basket.addChild(outerBasket);
  basket.children['outerbasket'].sendToBack();
  // the basket
  basket.name = "basket";
  basket.strokeColor = "black";
  basket.strokeWidth = 0.5;
  this.basket = basket;
}

// make a pile of berries for the case and add some text
Label.prototype.makeCaseLabel = function(){
  var berries = new paper.Group({name:"berries"});
  // scale factor for nBerries
  var scale = 100;
  // number of berries in each side of the frame
  var nBerries = this.height * this.width / scale;
  // for the number of berries in the enclosed area, place the berries 
  for(let i = 0; i < nBerries; i++){
    var b;
    // pick the berry type
    if(this.berryType == 'Black Currant'){
      b = new Currant('Black');
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
    }else if(this.berryType == 'Blueberry'){
      b = new Blueberry();
      b.name = 'bb_' + i;
    }else if(this.berryType == "Mixed Berry"){
      // pick a number and then a berry type - 33% for each
      var randomType = Math.random();
      if(randomType < 0.25){
        b = new Raspberry();
        b.name = 'r_' + i;
      }else if(randomType >= 0.25 && randomType < 0.625){
        b = new Currant('Black');
        b.name = 'bc_' + i;
      }else if(randomType >= 0.625){
        b = new Blueberry();
        b.name = 'bb_' + i;
      }
    }else if(this.berryType == "Mixed Currant"){
      // pick a number and then a berry type - 33% for each
      var randomType = Math.random();
      if(randomType < 0.33){
        b = new Currant('Black');
        b.name = 'bc_' + i;
      }else if(randomType >= 0.33 && randomType < 0.66){
        b = new Currant('Red');
        b.name = 'rc_' + i;
      }else if(randomType >= 0.66){ 
        b = new Currant('White');
        b.name = 'wc_' + i;
      }
     }

    // make the berries 25% larger just for fun
    b.size = BERRY_SIZE * 1.25;
    // draw the berry
    b.draw();
    // cool math to position the berries randomly under a curve
    // probably the most impressive math I've done in a while...
    b.g.position.x = getRandom(-this.width / 2, this.width / 2);
    b.g.position.y = this.bounds.y + getRandom(0, this.height / 3 -(Math.pow(b.g.position.x, 2) / 1000));
    b.g.position.x = b.g.position.x + this.width / 2 + this.bounds.x;
    // rotate the berry
    b.g.rotation = getRandom(0, 360);
    berries.addChild(b.g);
  } 

  this.berries = berries;
}

// make berries in a more organized way
Label.prototype.makeBerries = function(){
  var berries = new paper.Group({name:"berries"});
  // make the berry width
  var berryWidth;
  // number of berries in each side of the frame
  var nBerries;
  // scale factor for nBerries
  var scale = 64;

  // iterate over each of the four sides of the berry frame arandomly placing berries in the frame area
  for(let k = 0; k < 4; k++){
    // change the width of the frame based on the ratio of the sides of the box
    if(this.height > this.width){
      berryWidth = this.width / 8;
    }else{
      berryWidth = this.height / 8;
    }
    // determine how many berries should be in the chunk of berries
    if(k === 0){
      nBerries =  berryWidth * this.width / scale;
    }else if(k === 1){
      nBerries =  berryWidth * this.height / scale;
    }else if(k === 2){
      nBerries =  berryWidth * this.height / scale;
    }else if(k === 3){
      nBerries =  berryWidth * this.width / scale;
    }
    // for the number of berries in the enclosed area, place the berries 
    for(let i = 0; i < nBerries; i++){
      var b;
      // pick the berry type
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
      }else if(this.berryType == 'Blueberry'){
        b = new Blueberry();
        b.name = 'bb_' + i;
      }else if(this.berryType == "Mixed Berry"){
        // pick a number and then a berry type - less likely for raspberries
        var randomType = Math.random();
        if(randomType < 0.25){
          b = new Raspberry();
          b.name = 'r_' + i;
        }else if(randomType >= 0.25 && randomType < 0.625){
          b = new Currant('Black');
          b.name = 'bc_' + i;
        }else if(randomType >= 0.625){
          b = new Blueberry();
          b.name = 'bb_' + i;
        }
      }else if(this.berryType == "Mixed Currant"){
        // pick a number and then a berry type - 33% for each
        var randomType = Math.random();
        if(randomType < 0.33){
          b = new Currant('Black');
          b.name = 'bc_' + i;
        }else if(randomType >= 0.33 && randomType < 0.66){
          b = new Currant('Red');
          b.name = 'rc_' + i;
        }else if(randomType >= 0.66){ 
          b = new Currant('White');
          b.name = 'wc_' + i;
        }
      }
      // draw the berry
      b.draw();
      // adjust the range of berry positions for each side
      if(k === 0){
        // top
        b.g.position.x = this.bounds.x + getRandom(0, this.width);
        b.g.position.y = this.bounds.y + getRandom(0, berryWidth);
      }else if(k === 1){
        // left 
        b.g.position.x = this.bounds.x + getRandom(0, berryWidth);
        b.g.position.y = this.bounds.y + getRandom(0, this.height); 
      }else if(k === 2){
        // right
        b.g.position.x = this.bounds.x + getRandom(this.width - berryWidth, this.width);
        b.g.position.y = this.bounds.y + getRandom(0, this.height);
      }else if(k === 3){
        // bottom
        b.g.position.x = this.bounds.x + getRandom(0, this.width);
        b.g.position.y = this.bounds.y + getRandom(this.height - berryWidth, this.height);
      }
      // rotate the berry
      b.g.rotation = getRandom(0, 360);
      berries.addChild(b.g);
    }
  }


  this.berries = berries;
}

// text
Label.prototype.placeText = function(){
  this.text = new paper.Group({name: 'text'});
  // get fontscale based on aspect ration of package 
  var fontScale = 0.15;
  // console.log(this.name + "  font " + fontScale);

  
  // switch for each side
  if(this.name == 'top'){
    // if white currants, use blakc text
    var fillColor;
    if(this.berryType == 'White Currant' || this.berryType == 'Mixed Currant'){
      fillColor = 'black'
    } else {
      fillColor = 'white';
    }
    // better font scale

    // main text
    // const textA = new paper.PointText(); 
    // textA.fontFamily = 'Tienne';
    // textA.content = topTextA;
    // textA.justification = 'center';
    // textA.fillColor = fillColor;
    // textA.bounds.topCenter = this.bounds.topCenter;
    // textA.fontSize = fontScale * 0.07;
    // pate type
    // const textB = new paper.PointText();
    // textB.fontFamily = 'Tienne';
    // textB.fillColor = fillColor;
    // textB.content = '\n' + this.berryType + "\nFruit Pate";
    // textB.justification = 'center';
    // textB.bounds.center = this.bounds.center;
    // textB.fontSize = fontScale * 0.11;
    // // location
    // const textC = new paper.PointText();
    // textC.fontFamily = 'Tienne';
    // textC.fillColor = fillColor;
    // textC.content = 'S. Strafford, VT\n';
    // textC.justification = 'center';
    // textC.bounds.bottomCenter = this.bounds.bottomCenter;
    // textC.fontSize = fontScale * 0.07;

   //  const textD = new paper.PointText();
   //  textD.fontFamily = 'Tienne';
   //  textD.fillColor = fillColor;
   //  textD.content = this.nPieces + ' pieces';
   //  textD.justification = 'center';
   //  textD.bounds.bottomCenter = this.bounds.bottomCenter;
   //  textD.fontSize = this.height / 2 * fontScale;
    // this.text.addChild(textA);
    // this.text.addChild(textB);
    // this.text.addChild(textC);
  }else if(this.name == 'front'){
    const text = new paper.PointText();
    text.fontFamily = 'Tienne';
    text.content = frontText;
    text.justification = 'center';
    text.fillColor = 'black';
    text.fontSize = 10; //  this.bounds.size.height / 2 * fontScale;
   // if(text.bounds.size.width > this.bounds.size.width){
   //   text.fontSize =  this.bounds.size.width / 3 * fontScale;
   // }
    text.position.x = this.width / 2;
    text.position.y = this.height / 6;
    this.text.addChild(text);
  }else if(this.name == 'left'){
    const text = new paper.PointText();
    text.fontFamily = 'Tienne';
    text.content = leftTextB;
    text.justification = 'center';
    text.fillColor = 'black';
    text.fontSize = 10; //  this.bounds.size.height / 2 * fontScale;
   //  if(text.bounds.size.height > this.bounds.size.width / 2){
   //    text.fontSize =  this.bounds.size.width / 2 * fontScale;
   //  }
    text.position.x = this.bounds.size.height / 2;
    text.position.y = this.bounds.size.width / 6;
    this.text.addChild(text);
  }else if(this.name == 'right'){
    const text = new paper.PointText();
    text.fontFamily = 'Tienne';
    text.content = this.berryType + '\n Fruit Pate';
    text.justification = 'center';
    text.fillColor = 'black';
    text.fontSize =  10; // this.bounds.size.height / 2 * fontScale;
//     if(text.bounds.size.height > this.bounds.size.width / 2){
//       text.fontSize =  this.bounds.size.width / 2 * fontScale;
//     }
    text.position.x = this.bounds.size.height / 2;
    text.position.y = this.bounds.size.width / 6;
    this.text.addChild(text);
  }else if(this.name == 'bottom'){
    const text = new paper.PointText();
    text.fontFamily = 'Tienne';
    // text.content = bottomText;
    text.justification = 'left';
    text.fillColor = 'black';
    text.fontSize = this.bounds.size.height / 2 * 0.08;
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
    this.body.fillColor = '#3b3157'
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
  this.g = new paper.Group({name: 'currant', children:[this.body, this.stem]});
}

// move the currant
Currant.prototype.move = function(bounds){
  var currant = new paper.Group(this.body, this.stem);
  // place the berry randomly in the label bounds and rotate it
  currant.position.x = bounds.center.x + getRandom(-bounds.size.width / 2,  bounds.size.width / 2);
  currant.position.y = bounds.center.y + getRandom(-bounds.size.height / 8, bounds.size.height / 8);

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

//---------------------------------------------
// BLUEBERRY
function Blueberry(){
  this.size = BERRY_SIZE;
  this.body = null
  this.butt = null;
  this.star = null;
  this.g = null;
}

// draw blueberry
Blueberry.prototype.draw = function(){
  this.body = new paper.Path.Circle(0, 0, this.size);
  // body
  this.body.fillColor = '#444768'
  this.body.strokeColor = '#09001f';
  // start on the top of the blueberry
  this.star = new paper.Path.Star([getRandom(-BERRY_SIZE * 0.45, BERRY_SIZE * 0.45), 0], 6, BERRY_SIZE * 0.23, BERRY_SIZE * 0.33);
  this.star.strokeColor = 'transparent';
  // belly button on the bottom
  this.butt = new paper.Path.Circle([getRandom(-BERRY_SIZE * 0.45, BERRY_SIZE * 0.45), 0], BERRY_SIZE * 0.1);
  this.butt.strokeColor = 'transparent';
  // randomly decide to draw a star, then decideto draw a belly button
  if(Math.random() < 0.35){
    this.star.strokeColor = '#09001f';
  }else{
    if(Math.random() < 0.35){
      this.butt.strokeColor = '#09001f';
    }
  }
  // add parts to the g group
  this.g = new paper.Group({name: 'blueberry', children:[this.body, this.star, this.butt]});
}


