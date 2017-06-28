#pragma once

#include "ofMain.h"
#include "ofxCcv.h"
#include "ofxGrt.h"
#include "ofxGui.h"
#include "ofxOsc.h"



// where to send osc messages by default
#define DEFAULT_OSC_DESTINATION "localhost"
#define DEFAULT_OSC_ADDRESS "/classification"
#define DEFAULT_OSC_PORT 8000
#define DEFAULT_OSC_LISTEN 12345
#define NUM_MSG_STRINGS 20

class ofApp : public ofBaseApp {
public:
    
    void setup();
    void update();
    void draw();
    
    void trainClassifier();
    void save();
    void load();
    void clear();
    
    void sendOSC();
    
    void keyPressed(int key);
    
    ofVideoGrabber cam;
    
    ofxCcv ccv;
    ofVideoPlayer video;
    
    vector<float> classifierEncoding;
    vector<float> featureEncoding;
    
    bool setClassifier( const int type );
    
    //Create some variables for the demo
    ClassificationData trainingData;      		//This will store our training data
    GestureRecognitionPipeline pipeline;        //This is a wrapper for our classifier and any pre/post processing modules
    bool recordTrainingData;                                //This is a flag that keeps track of when we should record training data
    bool trainingModeActive;
    bool predictionModeActive;
    bool drawInfo;
    
    
    UINT trainingClassLabel;                    //This will hold the current label for when we are training the classifier
    UINT predictedClassLabel;
    string infoText;                            //This string will be used to draw some info messages to the main app window
    ofTrueTypeFont largeFont;
    ofTrueTypeFont smallFont;
    ofTrueTypeFont hugeFont;
    ofxGrtTimeseriesPlot predictionPlot;
    Timer trainingTimer;
    
    //OSC
    ofxOscSender sender;
    ofxOscReceiver receiver;
    string oscDestination, oscAddress;
    int oscPort;
    string msg_strings[NUM_MSG_STRINGS];
    
    //GUI
    ofxPanel gui;
    ofxIntSlider sliderClassLabel;
    
    ofxButton bTrain, bSave, bLoad, bClear;
    ofxToggle tRecord;
    
   
    
};
