/*
 * 
 * INFORMATION HARDWARE SETUP 
 * BLACK - GND
 * RED - 3.3V
 * PIN 3 - ORANGE - CLK
 * PIN 2 - YELLOW - DATA
 *
*/

#include <Arduino.h>
#include <SPI.h>
#include "Adafruit_BLE.h"
#include "Adafruit_BluefruitLE_UART.h"
#include "BluefruitConfig.h"
#include "HX711.h"
// get scale
HX711 scale(3, 2);

// check if the software is available
#if SOFTWARE_SERIAL_AVAILABLE
  #include <SoftwareSerial.h>
#endif

#define FACTORYRESET_ENABLE         1
#define MINIMUM_FIRMWARE_VERSION    "0.6.6"
#define MODE_LED_BEHAVIOUR          "MODE"
#define BLUEFRUIT_HWSERIAL_NAME     Serial1

/* ...or hardware serial, which does not need the RTS/CTS pins. Uncomment this line */
Adafruit_BluefruitLE_UART ble(Serial1, BLUEFRUIT_UART_MODE_PIN); 

// A small helper
void error(const __FlashStringHelper*err) {
  Serial.println(err);
  while (1);
}

// The calibration factor to measure the right weight
float calibration_factor = -350;
float units;
float ounces;

void setup(void)
{
  //while (!Serial);  // required for Flora & Micro
  delay(500);

  scale.set_scale();
  scale.tare();  //Reset the scale to 0

  /* Initialise the module */
  Serial.print(F("Initialising the Bluefruit LE module: "));

  if ( !ble.begin(VERBOSE_MODE) )
  {
    error(F("Couldn't find Bluefruit, make sure it's in CoMmanD mode & check wiring?"));
  }
  Serial.println( F("OK!") );

  if ( FACTORYRESET_ENABLE )
  {
    /* Perform a factory reset to make sure everything is in a known state */
    Serial.println(F("Performing a factory reset: "));
    if ( ! ble.factoryReset() ){
      error(F("Couldn't factory reset"));
    }
  }

  /* Disable command echo from Bluefruit */
  ble.echo(false);

  Serial.println("Requesting Bluefruit info:");
  /* Print Bluefruit information */
  ble.info();

  ble.verbose(false);  // debug info is a little annoying after this point!

  /* Wait for connection */
  while (! ble.isConnected()) {
      delay(500);
  }

  // LED Activity command is only supported from 0.6.6
  if ( ble.isVersionAtLeast(MINIMUM_FIRMWARE_VERSION) )
  {
    // Change Mode LED Activity
    Serial.println(F("******************************"));
    Serial.println(F("Change LED activity to " MODE_LED_BEHAVIOUR));
    ble.sendCommandCheckOK("AT+HWModeLED=" MODE_LED_BEHAVIOUR);
    Serial.println(F("******************************"));
  }

  long zero_factor = scale.read_average(); //Get a baseline reading
  Serial.print("Zero factor: "); //This can be used to remove the need to tare the scale. Useful in permanent scale projects.
  Serial.println(zero_factor);
}

void loop(void)
{
  // Check for user input
  char inputs[BUFSIZE+1];

  scale.set_scale(calibration_factor); //Adjust to this calibration factor

  units = scale.get_units(), 10;
  if (units < 0)
  {
    units = 0.00;
  }
  ounces = units * 0.035274;

  Serial.print(round(units));
  Serial.print("\n"); 

  ble.print("AT+BLEUARTTX=");
  ble.println((String)round(units));

  if ( getUserInput(inputs, BUFSIZE) )
  {

    ble.print("[Recv]");
    ble.println(inputs);
    
    // check response stastus
    if (! ble.waitForOK() ) {
      Serial.println(F("Failed to send?"));
    }
  }

  // Check for incoming characters from Bluefruit
  ble.println("AT+BLEUARTRX");
  ble.readline();

  // get test
  // Serial.println(ble.buffer);
  
  if (strcmp(ble.buffer, "OK") == 0) {
    // no data
    return;
  }
  
  // Some data was found, its in the buffer
  Serial.print(F("[Recv] "));
  Serial.println(ble.buffer);
  ble.waitForOK();
}

// Check for user input -> 
bool getUserInput(char buffer[], uint8_t maxSize)
{
  // timeout in 100 milliseconds
  TimeoutTimer timeout(100);

  memset(buffer, 0, maxSize);
  while( (!Serial.available()) && !timeout.expired() ) { delay(1); }

  if ( timeout.expired() ) return false;

  delay(2);
  uint8_t count=0;
  do
  {
    count += Serial.readBytes(buffer+count, maxSize);
    delay(2);
  } while( (count < maxSize) && (Serial.available()) );

  return true;
}
