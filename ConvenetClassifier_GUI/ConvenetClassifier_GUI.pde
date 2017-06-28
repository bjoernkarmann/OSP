import oscP5.*;
import netP5.*;
OscP5 oscP5;
NetAddress dest;

PImage img_dark,img_light;

public int oscMSG;
public int load = 0;
public int c = 0;

public void setup() {
  fullScreen();
  //size(1600,900);
  oscP5 = new OscP5(this, 8000);
  dest = new NetAddress("127.0.0.1", 12345);
  img_dark = loadImage("data/dark.png");
  img_light = loadImage("data/light.png");
}

public void draw() {
  imageMode(CENTER);
  if (oscMSG == 1 && load != 4) {
    background(255);
    image(img_light, width/2, height/2, img_light.width/2, img_light.height/2);
  } else {
    background(30);
    image(img_dark, width/2, height/2, img_dark.width/2, img_dark.height/2);
  }
  
  
  String lines[] = loadStrings("../data/data.txt");
  if (lines.length > 0) {
    load = Integer.parseInt(lines[0]);
  }

  switch(load) {
    case(0):
      sendOSC("/s");
      c=0;
      break;
    case(1):
      sendOSC("/1");
      sendOSC("/r");
      c=0;
      break;
    case(2):
      sendOSC("/2");
      sendOSC("/r");
      c=0;
      break;
    case(3):
      c++;
      if(c==10)sendOSC("/t");
      break;
    case(4):
      sendOSC("/s");
      sendOSC("/c");
      c=0;
      break;
  }
}

void keyPressed() {
  switch(key) {
    case('0'):
      sendOSC("/s");
    case('1'):
      sendOSC("/1");
      break;
    case('2'):
      sendOSC("/2");
      break;
    case('r'):
      sendOSC("/r");
      break;
    case('t'):
      sendOSC("/t");
      break;
    case('c'):
      sendOSC("/c");
      break;
  }
  
  if(key == ' '){
    sendOSC("/s");
    sendOSC("/c");
  }
}

void sendOSC(String str) {
  OscMessage msg = new OscMessage(str);
  oscP5.send(msg, dest);
}

public void oscEvent(OscMessage msg) {
  oscMSG = msg.get(0).intValue();
}