
#include "ofApp.h"


void ofApp::setup()
{
    ofSetLogLevel(OF_LOG_VERBOSE);
    ofSetFrameRate(30);

    auto grabber = std::make_shared<Video::IPVideoGrabber>();

    grabber->setURI("http://195.200.199.8/axis-cgi/mjpg/video.cgi?resolution=320x240");
    grabber->connect(); // connect immediately

    grabbers = grabber;
}

void ofApp::update()
{
    grabbers->update();
}


void ofApp::draw()
{
    ofBackground(0,0,0);

    int w = ofGetWidth() / NUM_COLS;
    int h = ofGetHeight() / NUM_ROWS;

    grabbers->draw(0,0,w,h); // draw the camera
}
