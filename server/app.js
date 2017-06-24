// SOCKET.IO
//https://github.com/socketio/socket.io
var express = require('express');
var app = express();
var server = app.listen(3000);
app.use(express.static('./public'));
console.log('Socket server is running');
var io = require('socket.io').listen(server);

// SOCKET.IO-EMITTER
// https://github.com/socketio/socket.io-emitter

// var gpio = require('socket.io-emitter')({
//   host: 'ospv2.local',
//   port: 51717 }
// );

// OSC.JS
//https://github.com/colinbdclark/osc.js/
var osc = require("osc")
var oscPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 8000
});
oscPort.open();

var local  = "127.0.0.1";
var ml4a   = 12345;
var remote = "127.0.0.1" //ospv2.local
var osp    = 9998;
var state;

// When a client connects, we note it in the console
io.on('connection', function (socket) {
    console.log('A client is connected!');
    socket.emit('message', 'You are connected!');
    socket.on('osp', function (data) {
      state = data;
      sendOSC();
    });
});

// Send the osc message to ml4a
var sendOSC = function(){
  if(state=="1"){
    console.log('Training ON');
    oscPort.send({address: "/1"},local, ml4a);
    oscPort.send({address: "/r"},local, ml4a);
  }
  if(state=="2"){
    console.log('Training OFF');
    oscPort.send({address: "/2"},local, ml4a);
    oscPort.send({address: "/r"},local, ml4a);
  }
  if(state=="3"){
    oscPort.send({address: "/t"},local, ml4a);
  }
  if(state=="4"){
    console.log('Delete Training');
    oscPort.send({address: "/c"},local, ml4a);
  }
}
oscPort.on("ready", sendOSC);

// Listen for incoming osc messeges from ml4a
oscPort.on("message", function (msg) {
    var c = parseInt(msg.args[0]);
    if(c==1){
      console.log("ON");
      oscPort.send({address: "/on"},remote, osp);
    }
    if(c==2){
      console.log("OFF");
      oscPort.send({address: "/off"},remote, osp);
    }
});
