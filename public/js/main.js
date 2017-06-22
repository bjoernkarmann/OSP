console.log("Client Ready");

var w = window.innerWidth;

// Socket messages:
// 1 = train class 1/on
// 2 = train class 2/off
// 3 = stop training
// 4 = clear training

function setup(){
    socket = io.connect('http://localhost:3000');
};

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
    }else{
      socket.emit('osp', 2);
      img_switch.src = "./img/switch_off.png";
      img_buble.src  = "./img/buble_off.png";
      document.body.style.backgroundColor = "#333333";
    }
  };

  if(event.target.id == img_button.id){
    socket.emit('osp', 4);
    img_button.src = "./img/clear_down.png";
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

};
