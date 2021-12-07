#include <SharpIR.h>

#define IRPinShort A1
#define modelShort 1080
#define IRPinLong A3
#define modelLong 100500
#define SHORT true

int distanceShort;
int distanceLong;
float voltageShort;
float voltageLong;

float i = 1;
float increment;
bool debug = false;

SharpIR shortSensor = SharpIR(IRPinShort, modelShort);
SharpIR longSensor = SharpIR(IRPinLong, modelLong);

void setup() {
  Serial.begin(9600);
}

void loop() {
  // debug to check the basic functionality of the sketch
  if (debug) {
    debugTest();
  } else {
    getDistances();
    // map the short distacne to a good range
    if(SHORT){
      Serial.println(mapShortDistance());
    }else{
      Serial.println(mapLongDistance());
    }
  }
}


float mapFloat(float x, float in_min, float in_max, float out_min, float out_max)
{
 return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}


float mapShortDistance(){
  float mappedValue = 0;
  if((distanceShort < 150) &&  (voltageShort >= 0.1)){
    mappedValue = abs(1 - mapFloat(voltageShort, 0, 3.0, 0, 1.0));
    //Serial.println(mappedValue);
    return mappedValue;
  }else{
    return 1.0;
  }
}


float mapLongDistance(){
  float mappedValue = 0;
  if(distanceLong > 0 && voltageLong <= 3.5){
    mappedValue = abs(1 - mapFloat(voltageLong, 0, 3.2, 0, 1.0));
    //Serial.println(mappedValue);
    return mappedValue;
  }else{
    return 1.0;
  }
}


void debugTest() {
  if (i >= 1.0) {
    increment = -0.1;
  } else if (i <= 0) {
    increment = 0.1;
  }
  Serial.println(abs(i));
  i += increment;
  delay(2000);
}

void getDistances() {
  // thre real sketch that uses the distance sensors
  distanceShort = shortSensor.distance();
  distanceLong = longSensor.distance();
  voltageShort = analogRead(IRPinShort) * (5.0 / 1023.0);
  voltageLong = analogRead(IRPinLong) * (5.0 / 1023.0);

//  Serial.print(distanceShort);
//  Serial.print(" cm, ");
//  Serial.print(distanceLong);
//  Serial.print(" cm    ");
//  Serial.print(voltageShort);
//  Serial.print(" V, ");
//  Serial.print(voltageLong);
//  Serial.println(" V");

  delay(1000);
}
