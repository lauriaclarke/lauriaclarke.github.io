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
function Package(height, width, depth){
  this.height = height;
  this.width  = width;
  this.depth  = depth;
  this.tabWidth = 0.5 * INCH;

  this.pattern = null;
}



// create a box template with given dimensions
Package.prototype.makePattern = function(){
  // front
  const front_r = new paper.Rectangle(this.height, 0, this.width, this.height);
  const front = new paper.Path.Rectangle(front_r);
  front.name = "front";
  front.fillColor = "red";

  // bottom
  const bottom_r = new paper.Rectangle(this.height, this.height, this.width, this.depth);
  const bottom = new paper.Path.Rectangle(bottom_r);
  bottom.name = "bottom";
  bottom.fillColor = "orange";

  // back
  const back_r = new paper.Rectangle(this.height, this.height + this.depth, this.width, this.height);
  const back = new paper.Path.Rectangle(back_r);
  back.name = "back";
  back.fillColor = "yellow";

  // top
  const top_r = new paper.Rectangle(this.height, 2 * this.height + this.depth,this.width, this.depth);
  const top = new paper.Path.Rectangle(top_r);
  top.name = "top";
  top.fillColor = "green";

  // left
  const left_r = new paper.Rectangle(0, this.height, this.height, this.depth);
  // const left_r = new paper.Rectangle(this.tabWidth, this.height - this.tabWidth, this.depth, this.height);
  const left = new paper.Path.Rectangle(left_r);
  left.name = "left";
  left.fillColor = "blue";
  // left.rotate(90, left.bounds.center);

  // right
  //const right_r = new paper.Rectangle(this.height + this.width + this.tabWidth, this.height - this.tabWidth, this.depth, this.height);
  const right_r = new paper.Rectangle(this.height + this.width, this.height, this.height, this.depth);
  const right = new paper.Path.Rectangle(right_r);
  right.name = "right";
  right.fillColor = "indigo";
  // right.rotate(90, right.bounds.center);

  // top_tab_1
  const top_tab_1 = this.makeTab(new paper.Rectangle(this.height, 2 * (this.height + this.depth), this.width, this.tabWidth));
  top_tab_1.rotation = 180;
  top_tab_1.name = "top_tab_1";
  // top_tab_1.fillColor = "pink";

  // left_tab_1
  const left_tab_1 = this.makeTab(new paper.Rectangle(0, this.height - this.tabWidth, this.height, this.tabWidth));
  left_tab_1.name = "left_tab_1";

  // left_tab_2
  const left_tab_2 = this.makeTab(new paper.Rectangle(0, this.height + this.depth, this.height, this.tabWidth));
  left_tab_2.rotation = 180;
  left_tab_2.name = "left_tab_2";

  // left_tab_3
  const left_tab_3 = this.makeTab(new paper.Rectangle(0, 0, this.depth, this.tabWidth));
  left_tab_3.rotation = -90;
  left_tab_3.position = new paper.Point(this.height - this.tabWidth * 0.5, 2 * this.height + 1.5 * this.depth);
  left_tab_3.name = "left_tab_3";
  // left_tab_3.fillColor = "green";

  // right_tab_1
  const right_tab_1 = this.makeTab(new paper.Rectangle(this.height + this.width, this.height - this.tabWidth, this.height, this.tabWidth));
  right_tab_1.name = "right_tab_1";

  // right_tab_2
  const right_tab_2 = this.makeTab(new paper.Rectangle(this.height + this.width, this.height + this.depth, this.height, this.tabWidth));
  right_tab_2.rotation = 180;
  right_tab_2.name = "right_tab_2";

  // right_tab_3
  const right_tab_3 = this.makeTab(new paper.Rectangle(0, 0, this.depth, this.tabWidth));
  right_tab_3.rotation = 90;
  right_tab_3.position = new paper.Point(this.height + this.width + this.tabWidth * 0.5, 2 * this.height + 1.5 * this.depth);
  right_tab_3.name = "right_tab_3";
  // right_tab_3.fillColor = "blue";

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

  this.pattern = box;
}

// create an up-pointing tab in `bounds`
// bounds should be at least twice as wide as it is tall
Package.prototype.makeTab = function(bounds){
  const tab = new paper.Path.Rectangle(bounds);
  tab.segments[1].point.x += bounds.height;
  tab.segments[2].point.x -= bounds.height;
  tab.fillColor = "violet";
  return tab;
}

Package.prototype.makeTopTab = function(bounds){
  const tab = new paper.Path.Rectangle(bounds);
  tab.segments[1].point.x += bounds.height;
  tab.segments[2].point.x -= bounds.height;
  tab.fillColor = "violet";
  return tab;
}







