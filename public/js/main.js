console.log("Client Ready");

var w = window.innerWidth;
var on = 0;
var off = 0;
// Socket messages:
// 1 = train class 1/on
// 2 = train class 2/off
// 3 = stop training
// 4 = clear training
var timerOn;
var timerOff;

function setup(){
    socket = io.connect();
    document.getElementById("on").innerHTML = on;
    document.getElementById("off").innerHTML = off;
};

function countOn(){
  on++;
  document.getElementById("on").innerHTML = on;
}

function countOff(){
  off++;
  document.getElementById("off").innerHTML = off;
}


function mousePressed(){

  var img_switch = document.getElementById("switch");
  var img_button = document.getElementById("clear");
  var img_buble  = document.getElementById("buble");

  if(event.target.id == img_switch.id){
    if(mouseX<w/2){
      socket.emit('osp', 1);
      img_switch.src = "./img/switch_on.png";
      img_buble.src  = "./img/buble_on.png";
      document.body.style.backgroundColor = "#FFF676";
      timerOn = setInterval(countOn, 100);
    }else{
      socket.emit('osp', 2);
      img_switch.src = "./img/switch_off.png";
      img_buble.src  = "./img/buble_off.png";
      document.body.style.backgroundColor = "#333333";
      timerOff = setInterval(countOff, 100);
      document.getElementById("off").innerHTML = off;
    }
  };

  if(event.target.id == img_button.id){
    socket.emit('osp', 4);
    img_button.src = "./img/clear_down.png";
    on = 0;
    off = 0;
    document.getElementById("on").innerHTML = on;
    document.getElementById("off").innerHTML = off;
  }
};

function mouseReleased() {
  var img_switch = document.getElementById("switch");
  var img_button = document.getElementById("clear");
  var img_buble  = document.getElementById("buble");

  socket.emit('osp', 3);
  img_switch.src = "./img/switch_nutral.png";
  img_button.src = "./img/clear.png";
  img_buble.src  = "./img/buble.png";
  document.body.style.backgroundColor = "#ffffff";
  clearInterval(timerOn);
  clearInterval(timerOff);
  document.getElementById("on").innerHTML = on;
  document.getElementById("off").innerHTML = off;
};
