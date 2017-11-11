#include <Adafruit_NeoPixel.h> // For lighting
#include <ESP8266WiFi.h>
#include <TinyGPS++.h> // For gps
#include <SoftwareSerial.h> 
#include <PubSubClient.h>
#ifdef __AVR__
  #include <avr/power.h>
#endif

#define LEDMatrixPIN 4
#define RXPin 13 // D7
#define TXPin 12 // D6
#define GPSBaud 9600
#define ConsoleBaud 115200

// Device name
const char* deviceID = "puppy1";

// Define wifi credential
const char* ssid = "echo512";
const char* password = "qwertyrock5";

// MQTT Broker
IPAddress mqtt_server(34, 210,16, 173);

// LED Matrix of 3x3
Adafruit_NeoPixel strip = Adafruit_NeoPixel(9, LEDMatrixPIN, NEO_GRB + NEO_KHZ800);
SoftwareSerial ss(RXPin, TXPin);
// Instantiate GPS
TinyGPSPlus gps;
// Setup Network
WiFiClient espClient;
PubSubClient client(espClient);

long lastMsg = 0;

void setup() {
  Serial.begin(ConsoleBaud);
  ss.begin(GPSBaud); // GPS runs at 9600
  setup_wifi();
  setup_mqtt();
}

void setup_mqtt(){
  client.setServer(mqtt_server, 1883);
  client.setCallback(cb); // handle message recieved
}

void setup_wifi(){
  Serial.println("Setting up WiFi");

  // Connect to wifi
  WiFi.begin(ssid, password);

  // Check if wifi is connected
  while (WiFi.status() != WL_CONNECTED){
    // Change matrix to orange for waiting connection
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void cb(char* topic, byte* payload, unsigned int length){
  Serial.print("Message Arrived -> {");
  Serial.print(topic);
  Serial.print("}");
  for (int i = 0; i < length; i++){
    Serial.print((char)payload[i]); // incoming msg
  }
  Serial.println();
  if ((char)payload[0] == 0){
    // CHANGE LED MATRIX
  }
}

void reconnect(){
  while(!client.connected()){
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    Serial.println(mqtt_server);
    if (client.connect("ESP8266Client")) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish("outTopic", "hello world");
      // ... and resubscribe
      client.subscribe("inTopic");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void loop() {
  if(!client.connected()){
    reconnect();
  }
  client.loop();

  long now = millis();

  // default for gps coord set
  float GPSLAT;
  float GPSLNG;
  
  while(ss.available() > 0){
    gps.encode(ss.read());
    
    if(gps.location.isUpdated() || gps.altitude.isUpdated()){
//      Serial.print("Location: "); 
//      Serial.print(gps.location.lat(), 6);
//      Serial.print(",");
//      Serial.print(gps.location.lng(), 6);
//      Serial.println();
      GPSLAT = gps.location.lat();
      GPSLNG = gps.location.lng();
    }
  }
  
  if (now - lastMsg > 10000){ // Update every 10 seconds
    lastMsg = now;
    String msg = "Lat:";
    msg = msg + String(GPSLAT, 6);
    msg = msg + "-";
    msg = msg + "Lng:";
    msg = msg + String(GPSLNG, 6);

  
//    Serial.println(msg);
    char message[120];
    msg.toCharArray(message, 120);
    Serial.println(message);
    client.publish("sample/GPS_Coord", message);
    
  }
}
