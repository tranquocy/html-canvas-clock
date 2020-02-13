const canvas = document.querySelector("canvas");
const getContext = canvas.getContext("2d");
let radius = canvas.height / 2;

getContext.translate(radius, radius);

radius = radius * .9;

setInterval(drawClock, 1000);

function drawClock() {
  drawClockFace(getContext, radius);
  drawClockNumber(getContext, radius);
  drawClockTime(getContext, radius);
}

function drawClockFace(getContext, radius) {
  let gradian = null;

  getContext.beginPath();
  getContext.arc(0, 0, radius, 0, 2 * Math.PI);
  getContext.fillStyle = "#eee";
  getContext.fill();

  gradian = getContext.createRadialGradient(0, 0, radius * .95, 0, 0, radius * 1.05);
  gradian.addColorStop(0, "#000");
  gradian.addColorStop(.5, "#fff");
  gradian.addColorStop(1, "#333");
  getContext.strokeStyle = gradian;
  getContext.lineWidth = radius * .1;
  getContext.stroke();

  getContext.beginPath();
  getContext.arc(0, 0, radius * .1, 0, 2 * Math.PI);
  getContext.fillStyle = "#000";
  getContext.fill();
}

function drawClockNumber(getContext, radius) {
  let ang;
  let num;

  getContext.font = radius * .15 + "px arial";
  getContext.textBaseline="middle";
  getContext.textAlign="center";
  
  for(num = 1; num < 13; num++) {
    ang = num * Math.PI / 6;
    getContext.rotate(ang);
    getContext.translate(0, -radius * 0.85);
    getContext.rotate(-ang);
    getContext.fillText(num.toString(), 0, 0);
    getContext.rotate(ang);
    getContext.translate(0, radius * 0.85);
    getContext.rotate(-ang);
  }
}

function drawClockTime(getContext, radius){
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  
  //hour
  hour = hour % 12;
  hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
  drawHand(getContext, hour, radius*0.5, radius*0.07);
  //minute
  minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
  drawHand(getContext, minute, radius*0.8, radius*0.07);
  // second
  second = (second*Math.PI/30);
  console.log(second);
  drawHand(getContext, second, radius*0.9, radius*0.02);
}

function drawHand (getContext, pos, length, width) {
  getContext.beginPath();
  getContext.lineWidth = width;
  getContext.moveTo(0, 0);
  getContext.rotate(pos);
  getContext.lineTo(0, -length);
  getContext.stroke();
  getContext.rotate(-pos);
}