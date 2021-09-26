// 0 =  snips
// 1 =  hammer
// 2 =  mallet
// 3 =  drill
// 4 =  4 mm allen
// 5 =  5 mm allen
// 6 =  tape measure
// 7 =  screwdriver
// 8 =  multimeter 
// 9 =  staplegun
// 10 = lights
// 11 = mini gluegun
// 12 = combosquare
// 13 = level
// 14 = clamps    
// 15 = camera
// 16 = xacto
// 17 = mini hack saw
// 18 = large hack saw

var toolNames = ["snips",
                 "hammer",
                 "mallet",
                 "drill",
                 "4 mm allen",
                 "5 mm allen",
                 "tape measure",
                 "screwdriver",
                 "multimeter",
                 "staplegun",
                 "light",
                 "mini gluegun",
                 "combosquare",
                 "level",
                 "clamps",
                 "camera",
                 "xacto",
                 "mini hack saw",   
                 "large hack saw"];   


var toolUse = [];
// move in
toolUse[0] = [1, 6];
toolUse[1] = [1, 6, 7];
toolUse[2] = [1, 6];
toolUse[3] = [1, 7];
toolUse[4] = [1, 6, 7, 5];
// pegboard install
toolUse[18] = [3, 13, 7];
toolUse[19] = [3, 13, 7];
toolUse[20] = [1];
toolUse[21] = [1];
// day of postcards due
toolUse[37] = [10, 15, 16, 12];
// first prototype
toolUse[44] = [3, 1];
// second prototype
toolUse[48] = [18, 1, 3, 0, 14, 12];
// blinds installation
toolUse[49] = [3, 13, 7, 1, 6];
// final prototype p1
toolUse[50] = [3, 14, 7];
// final prototype p2
toolUse[51] = [3, 14, 7, 11, 0];
toolUse[52] = [3, 13, 7];
toolUse[53] = [3, 13, 7];
// bike fix
toolUse[55] = [4, 5];


