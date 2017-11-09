#include <TinyGPS++.h>                                  // Tiny GPS Plus Library
#include <SoftwareSerial.h>                             // Software Serial Library so we can use other Pins for communication with the GPS module


#define RXPin 13
#define TXPin 12
#define GPSBaud 9600   
#define ConsoleBaud 115200

SoftwareSerial ss(RXPin, TXPin);

TinyGPSPlus gps;

void setup(){
  Serial.begin(ConsoleBaud);
  ss.begin(GPSBaud);
  Serial.println("Sample GPS");
  Serial.println();
}

void loop(){
  while(ss.available() > 0)
    gps.encode(ss.read());
      if (gps.location.isUpdated() || gps.altitude.isUpdated()){
        Serial.print("Location: "); 
        Serial.print(gps.location.lat(), 6);
        Serial.print(",");
        Serial.print(gps.location.lng(), 6);
        Serial.println();
  }
}

