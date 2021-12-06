#include <SharpIR.h>

#define IRPinShort A0
#define modelShort 1080
#define IRPinLong A3
#define modelLong 100500

int distanceShort;
int distanceLong;

float i = 1;
float increment;
bool debug = true;

SharpIR shortSensor = SharpIR(IRPinShort, modelShort);
SharpIR longSensor = SharpIR(IRPinLong, modelLong);

void setup() {
  Serial.begin(9600);
}

void loop() {
  
  // debug to check the basic functionality of the sketch
  if (debug) {
    if (i >= 1.0) {
      increment = -0.1;
    } else if (i <= 0) {
      increment = 0.1;
    }
    Serial.println(abs(i));
    i += increment;
    delay(2000);
  } else {
    // thre real sketch that uses the distance sensors
    distanceShort = shortSensor.distance();
    distanceLong = longSensor.distance();

    Serial.print(distanceShort);
    Serial.print(" cm, ");
    Serial.print(distanceLong);
    Serial.print(" cm    ");

    float voltageShort = analogRead(IRPinShort) * (5.0 / 1023.0);
    float voltageLong = analogRead(IRPinLong) * (5.0 / 1023.0);
    Serial.print(voltageShort);
    Serial.print(" V, ");
    Serial.print(voltageLong);
    Serial.println(" V");
  }

  delay(1000);
}
