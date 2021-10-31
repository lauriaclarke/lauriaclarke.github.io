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



// class for a 6 sided box
function Package(height, width, depth, iscase){
  this.height = height;
  this.width  = width;
  this.depth  = depth;
  this.tabWidth = 0.5 * INCH;
  this.iscase = iscase;

  this.pattern = null;
}



// create a box template with given dimensions
Package.prototype.makePattern = function(){
  var topPad = this.height * 0.0625 / 2;
  // front
  const front_r = new paper.Rectangle(this.height, 0, this.width, this.height);
  const front = new paper.Path.Rectangle(front_r);
  front.name = "front";
  // front.fillColor = "red";
  // bottom
  const bottom_r = new paper.Rectangle(this.height, this.height, this.width, this.depth);
  const bottom = new paper.Path.Rectangle(bottom_r);
  bottom.name = "bottom";
  // bottom.fillColor = "orange";
  // back
  const back_r = new paper.Rectangle(this.height, this.height + this.depth, this.width, this.height);
  const back = new paper.Path.Rectangle(back_r);
  back.name = "back";
  // back.fillColor = "yellow";
  // top
  const top_r = new paper.Rectangle(this.height - topPad, 2 * this.height + this.depth, this.width + 2 * topPad, this.depth + topPad);
  const top = new paper.Path.Rectangle(top_r);
  top.name = "top";
  // top.fillColor = "yellow";
  // left
  const left_r = new paper.Rectangle(0, this.height, this.height, this.depth);
  const left = new paper.Path.Rectangle(left_r);
  left.name = "left";
  left.fillColor = "blue";
  // right
  const right_r = new paper.Rectangle(this.height + this.width, this.height, this.height, this.depth);
  const right = new paper.Path.Rectangle(right_r);
  right.name = "right";
  // right.fillColor = "indigo";


  // left_tab_1
  const left_tab_1 = this.makeTab(new paper.Rectangle(0, this.height - this.tabWidth, this.height, this.tabWidth));
  left_tab_1.name = "left_tab_1";
  // left_tab_2
  const left_tab_2 = this.makeTab(new paper.Rectangle(0, this.height + this.depth, this.height, this.tabWidth));
  left_tab_2.rotation = 180;
  left_tab_2.name = "left_tab_2";
  // right_tab_1
  const right_tab_1 = this.makeTab(new paper.Rectangle(this.height + this.width, this.height - this.tabWidth, this.height, this.tabWidth));
  right_tab_1.name = "right_tab_1";
  // right_tab_2
  const right_tab_2 = this.makeTab(new paper.Rectangle(this.height + this.width, this.height + this.depth, this.height, this.tabWidth));
  right_tab_2.rotation = 180;
  right_tab_2.name = "right_tab_2";

  // top_tab (normal)
  var top_tab_1 = this.makeTab(new paper.Rectangle(this.height - topPad, 2 * (this.height + this.depth) + topPad, this.width + 2 * topPad, this.tabWidth));
  top_tab_1.rotation = 180;
  top_tab_1.name = "top_tab_1";

  var left_tab_3;          
  var right_tab_3;           
  var right_mini_tab_3;     
  var left_mini_tab_3;  
  // if this is not a case top, make closure tabs for the top
  if(this.iscase == false){
    // top_tab_1
    top_tab_1 = this.makeRectTab(new paper.Rectangle(this.height - topPad, 2 * (this.height + this.depth) + topPad, this.width + 2 * topPad, this.height * 0.45));
    top_tab_1.rotation = 180;
    top_tab_1.name = "top_tab_1";
    top_tab_1.fillColor = 'teal';
    // right_tab_3
    right_tab_3 = this.makeTopTab(new paper.Rectangle(0, 0, this.depth + topPad, this.height * 0.45), true);
    right_tab_3.rotation = 90;
    right_tab_3.position = new paper.Point(this.height + this.width + this.height * 0.45 * 0.5 + topPad, 2 * this.height + 1.5 * this.depth + topPad / 2);
    right_tab_3.name = "right_tab_3";
    right_tab_3.fillColor = 'teal';
    // right mini tab
    right_mini_tab_3 = this.makeMiniTab(new paper.Rectangle(0, 0, this.height * 0.45, this.height * 0.45));
    right_mini_tab_3.rotation = 90;
    right_mini_tab_3.position = new paper.Point(this.height + this.width + this.height * 0.45 * 0.5 + topPad, 2 * this.height + 2 * this.depth + this.height * 0.45 * 0.5 + topPad);
    right_mini_tab_3.name = "right_mini_tab_3";
    // left_tab_3
    left_tab_3 = this.makeTopTab(new paper.Rectangle(0, 0, this.depth + topPad, this.height * 0.45), false);
    left_tab_3.rotation = -90;
    left_tab_3.position = new paper.Point(this.height - this.height * 0.45 * 0.5 - topPad, 2 * this.height + 1.5 * this.depth + topPad / 2);
    left_tab_3.name = "left_tab_3";
    left_tab_3.fillColor = 'teal';
    // left mini tab
    left_mini_tab_3 = this.makeMiniTab(new paper.Rectangle(0, 0, this.height * 0.45, this.height * 0.45));
    left_mini_tab_3.rotation = -90;
    left_mini_tab_3.position = new paper.Point(this.height - this.height * 0.45 * 0.5 - topPad, 2 * this.height + 2 * this.depth + this.height * 0.45  * 0.5 + topPad);
    left_mini_tab_3.name = "right_mini_tab_3";
  }else{
    left_tab_3       = null;   
    right_tab_3      = null;     
    right_mini_tab_3 = null;    
    left_mini_tab_3  = null;  
  }

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
      right_mini_tab_3,
      left_mini_tab_3
    ],
    strokeColor: "black",
    strokeWidth: 0.5,
    // fillColor: null,
  });

  this.pattern = box;
}

// create an up-pointing tab in `bounds`
// bounds should be at least twice as wide as it is tall
Package.prototype.makeTab = function(bounds){
  const tab = new paper.Path.Rectangle(bounds);
  tab.segments[1].point.x += bounds.height;
  tab.segments[2].point.x -= bounds.height;
  // tab.fillColor = "violet";
  return tab;
}

Package.prototype.makeTopTab = function(bounds, leftright){
  const tab = new paper.Path.Rectangle(bounds);
  if(leftright){
    tab.segments[1].point.x += bounds.height;
  }else{
    tab.segments[2].point.x -= bounds.height;
  }
  // tab.fillColor = "violet";
  return tab;
}

Package.prototype.makeRectTab = function(bounds, leftright){
  const tab = new paper.Path.Rectangle(bounds);
  // tab.fillColor = "violet";
  return tab;
}


Package.prototype.makeMiniTab = function(bounds){
  const tab = new paper.Path.Rectangle(bounds);
  tab.segments[1].point.x += bounds.height / 2;
  tab.segments[2].point.x -= bounds.height / 2;
  // tab.fillColor = "violet";
  return tab;
}


