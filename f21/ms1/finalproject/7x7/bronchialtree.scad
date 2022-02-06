THICKNESS = 2.5;
HEIGHT = 400;
C = 2 * THICKNESS;

// a bronchi chunk
module bronchi(height){
  r1 = height / 2;
  r2 = height / 10;
  echo(r1, r2);
    
  // create the outer and inner walls
  difference(){
    cylinder(height, r1, r2, false);
    cylinder(height + THICKNESS, r1 - THICKNESS, r2 - THICKNESS, false);
  }
  
  // add some cartilidge every 5 mm
  for(i = [0 : 20 : height]){
     // calculate the radius of incrementing height...this was not trivial
     currentR = ((i - height) * (r2 - r1))/ height + r2;
     echo(i, currentR);
     // rotate extrude a circle to create bands
     rotate_extrude(convexity = 10)
     // translate by the calculated radius
     translate([currentR, i, 0])
     // draw the circle
     circle(C); 
  }
}


// draw the thing
bronchi(HEIGHT);
