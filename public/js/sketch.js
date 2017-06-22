var canvas;

var screenW;
var screenH;

var training_on = 0;
var training_off = 0;

var count = 1;
var dots = 0;
var trigger_on = false;
var trigger_off = false;

var press = false;
var cam_press = false;
var intro = true;

var step_count = 1;
var c = 0;
function setup() {
  screenW = windowWidth;
  screenH = windowHeight;
  strokeWeight(2);

  //socket = io.connect('http://172.20.10.2:3000'); // hotspot
  socket = io.connect('http://10.114.2.42:3000'); // ciid
}


function draw() {

  // cam buttom
  var cam = document.getElementById("cam");
  var nutral = document.getElementById("nutral");
  var on = document.getElementById("on");
  var off = document.getElementById("off");
  var dot = document.getElementById("dots");
  var dotoff = document.getElementById("dotso");
  var train_on = document.getElementById("train_on");
  var train_off = document.getElementById("train_off");
  var train_on_n = document.getElementById("train_on_n");
  var train_off_n = document.getElementById("train_off_n");

  if(trigger_on){
    socket.emit('mouse', 1);
    dots++;
    nutral.style.display = "none";
    on.style.display = "block";
    if(dots > 30){dot.innerHTML = ".";}
    if(dots > 60){dot.innerHTML = "..";}
    if(dots > 90){dot.innerHTML = "...";}
    if(dots > 120){dot.innerHTML = ""; dots = 0;}
    training_on++;
    //train_on.innerHTML = (training_on/10).toFixed(0);
    //train_on_n.innerHTML = (training_on/10).toFixed(0);
  }else{
    nutral.style.display = "block";
    on.style.display = "none";
  }

  if(trigger_off){
    socket.emit('mouse', 2);
    dots++;
    nutral.style.display = "none";
    off.style.display = "block";
    if(dots > 30){dotoff.innerHTML = ".";}
    if(dots > 60){dotoff.innerHTML = "..";}
    if(dots > 90){dotoff.innerHTML = "...";}
    if(dots > 120){dotoff.innerHTML = ""; dots = 0;}
    training_off++;
    //train_off.innerHTML = (training_off/10).toFixed(0);
    //train_off_n.innerHTML = (training_off/10).toFixed(0);

  }else{
    nutral.style.display = "block";
    off.style.display = "none";
  }
}

function mousePressed(){


  if(intro == false){
    if(mouseY > 100 && mouseY < screenH-100 && cam_press == false){
      press = true;
    }

    //Switch area
    if(mouseY < -300 && mouseY > -550){
      // off click
      if(mouseX > screenW/2){
        trigger_off = true;
        console.log("off");
      }
      //on click
      if(mouseX < screenW/2){
        trigger_on = true;
        console.log("on");
      }
    }

    if(cam_press == false && mouseY < -90 && mouseY > -200 && count > 500){
      cam_press = true;
      count = 0;
    }

    if(cam_press == true && mouseY < -90 && mouseY > -200 && count > 500){
      cam_press = false;
      count = 0;
    }

    if(cam_press == true && mouseY < -650  && count > 500){
      cam_press = false;
      count = 0;
    }
    //clear
    if(mouseY > 400 && count > 500){
      count = 0;
      console.log("clear");
      training_off = 0;
      training_on = 0;
    //  note.innerHTML = "no training examples";
    //  train_on_n.innerHTML = "";
    //  train_off_n.innerHTML = "";
      socket.emit('mouse', 4);
    }
  }
}

function mouseReleased() {
  socket.emit('mouse', 3);
  press = false;
  trigger_on = false;
  trigger_off = false;
  dots = 0;


  if(intro){
    if(mouseY<screenH/2){
      if(step_count/2==1){
        var step = document.getElementById("step1");
        step.style.left = -screenW+"px";
      }
      if(step_count/2==2){
        var step = document.getElementById("step2");
        step.style.left = -screenW+"px";
      }
      if(step_count/2==3){
        var step = document.getElementById("step3");
        step.style.left = -screenW+"px";
      }
      if(step_count/2==4){
        var step = document.getElementById("step4");
        step.style.left = -screenW+"px";
      }
      if(step_count/2==5){
        intro=false;
        var step = document.getElementById("step5");
        step.style.left = -screenW+"px";
      }
      step_count++;
      console.log(intro);
    }
  }

}

function deviceShaken() {
  value = value + 5;
  if (value > 255) {
    value = 0;
  }
}


function polygon(x, y, radius, npoints) {
  push();
  rotate(PI/8);
  var angle = TWO_PI / npoints;
  beginShape();

  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
  pop();
}
