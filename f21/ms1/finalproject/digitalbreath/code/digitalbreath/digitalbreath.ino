#include <SharpIR.h>

#define IRPinShort A1
#define modelShort 1080
#define IRPinLong A3
#define modelLong 100500
#define SHORT true
#define LONG_MIN 1.7
#define LONG_MAX 3.2

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
    if(pickSensor()){
      Serial.println(0.01);
      // Serial.println(mapShortDistance());
    }else{
      Serial.println(mapLongDistance());
    }
  }
}


bool pickSensor(){
  if(voltageShort > 0.5 && distanceShort < 80){
    // Serial.println("short sensor");
    return true;
  }else{
    // Serial.println("long sensor");
    return false;  
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
  if(distanceLong > 0 && voltageLong <= LONG_MAX){
    mappedValue = abs(1 - mapFloat(voltageLong, LONG_MIN, LONG_MAX, 0, 1.0));
    //Serial.println(mappedValue);
    return mappedValue;
  }else if(voltageLong > LONG_MAX){
    return 0.0;
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


  Serial.print("(");
  Serial.print(distanceShort);
  Serial.print(" cm, ");
  Serial.print(voltageShort);
  Serial.print(" V),  (");
  Serial.print(distanceLong);
  Serial.print(" cm, ");
  Serial.print(voltageLong);
  Serial.println(" V)");
  
  

  delay(1000);
}
