var canvas_el = null;
var canvas = null;
var isLooping = true;
var BACKGROUND_COLOR = "#ffffffff";
var drawInterval = null;
var delay = 33;     //1/(0.033 spf) => 30 fps
var draw;
var setup;

var box;

function setLineWidth(w){
  canvas.lineWidth = w;
}
function resetLineWidth(w){
  canvas.lineWidth = 1;
}
function clear(){
  canvas.clearRect(0,0,width(),height());
}
function background(color_hex_str){
  BACKGROUND_COLOR = color_hex_str;
}
function init(){
  canvas_el = document.getElementById('canvas');
  if(typeof canvas_el === "undefined" || canvas_el === null)return;
  canvas = canvas_el.getContext('2d');
  if(typeof canvas === "undefined" || canvas === null)return;
  setup();
  tryDraw();
  if(isLooping){
    drawInterval = setInterval(tryDraw,delay);
  }else{
    tryDraw();
  }
}
function tryDraw(){
  if(typeof draw === "function"){
    clear();
    canvas.fillStyle = BACKGROUND_COLOR;
    canvas.clearRect(0,0,width(),height());
    canvas.fillRect(0,0,width(),height());
    draw();
  }else{
    clearInterval(drawInterval);
    return;
  }
  if(!isLooping){
    clearInterval(drawInterval);
  }
}
function setDelayTime(time){
  if(time < 1) time = 1;
  delay = time;
}
function loop(){
  isLooping = true;
}
function noloop(){
  isLooping = false;
}
function width(){
  return canvas_el.width;
}
function height(){
  return canvas_el.height;
}
function decToHex(dec){
  // console.log(dec);
  return ((dec < 10 && dec > -10)? "0":"") + dec.toString(16);
}
function drawPoint(x,y,color_hex_str = "#000000ff"){
  canvas.fillStyle = color_hex_str;
  canvas.beginPath();
  canvas.fillRect(x-1,y-1,3,3);
  canvas.closePath();
}
function drawLine(pt1,pt2,color_hex_str = "#000000ff"){
  canvas.strokeStyle = color_hex_str;
  canvas.beginPath();
  canvas.moveTo(pt1.x, pt1.y);
  canvas.lineTo(pt2.x, pt2.y);
  canvas.stroke();
  canvas.closePath();
};
function drawRay(pt1,pt2,extrap_dist,color_hex_str = "#000000ff"){
  var m = (pt1.y-pt2.y)/(pt1.x-pt2.x);
  var ex = pt2.x + ((pt1.x > pt2.x) && (pt1.y < pt2.y || pt1.y > pt2.y)? -1:1)*extrap_dist / Math.sqrt(m*m + 1);
  var ey = pt2.y + ((pt1.x > pt2.x) && (pt1.y < pt2.y || pt1.y > pt2.y)? -1:1)*(m * extrap_dist)/ Math.sqrt(m*m + 1);
  canvas.strokeStyle = color_hex_str;
  canvas.beginPath();
  canvas.moveTo(pt1.x, pt1.y);
  canvas.lineTo(ex, ey);
  canvas.stroke();
  canvas.closePath();
}
function drawText(pt,text,size=15,font="Arial",color_hex_str = "#000000ff"){
  canvas.strokeStyle = color_hex_str;
  canvas.font = size+"px "+font;
  canvas.fillText(text,pt.x,pt.y+size-5);
}
function strokeText(pt,text,size=15,font="Arial",color_hex_str = "#000000ff"){
  canvas.strokeStyle = color_hex_str;
  canvas.font = size+"px "+font;
  canvas.strokeText(text,pt.x,pt.y+size-5);
}
function drawRect(p1,p2,color_hex_str = "#000000ff"){
  canvas.strokeStyle = color_hex_str;
  canvas.beginPath();
  canvas.rect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);
  canvas.stroke();
  canvas.closePath();
}
function fillRect(p1,p2,color_hex_str = "#000000ff"){
  canvas.fillStyle = color_hex_str;
  canvas.fillRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);
}
function drawCircle(center,radius,color_hex_str = "#000000ff"){
  canvas.strokeStyle = color_hex_str;
  canvas.beginPath();
  canvas.arc(center.x,center.y,radius,0, 2 * Math.PI);
  canvas.stroke();
  canvas.closePath();
}
function fillCircle(center,radius,color_hex_str = "#000000ff"){
  canvas.fillStyle = color_hex_str;
  canvas.beginPath();
  canvas.arc(center.x,center.y,radius,0, 2 * Math.PI);
  canvas.fill();
  canvas.closePath();
}
function drawTriangle(pt1,pt2,pt3,color_hex_str = "#000000ff"){
  canvas.strokeStyle = color_hex_str;
  canvas.beginPath();
  canvas.moveTo(pt1.x, pt1.y);
  canvas.lineTo(pt2.x, pt2.y);
  canvas.lineTo(pt3.x, pt3.y);
  canvas.lineTo(pt1.x, pt1.y);
  canvas.stroke();
  canvas.closePath();
}
function fillTriangle(pt1,pt2,pt3,color_hex_str = "#000000ff"){
  canvas.fillStyle = color_hex_str;
  canvas.beginPath();
  canvas.moveTo(pt1.x, pt1.y);
  canvas.lineTo(pt2.x, pt2.y);
  canvas.lineTo(pt3.x, pt3.y);
  canvas.fill();
  canvas.closePath();
}
function drawPoly(points,color_hex_str = "#000000ff"){
  canvas.strokeStyle = color_hex_str;
  canvas.beginPath();
  var pt = points[0];
  canvas.moveTo(pt.x, pt.y);
  for(var i = 0; i < points.length; ++i){
    pt = points[i];
    canvas.lineTo(pt.x, pt.y);
  }
  canvas.lineTo(points[0].x, points[0].y);
  canvas.stroke();
  canvas.closePath();
}
function fillPoly(points,color_hex_str = "#000000ff"){
  canvas.fillStyle = color_hex_str;
  canvas.beginPath();
  var pt = points[0];
  canvas.moveTo(pt.x, pt.y);
  for(var i = 0; i < points.length; ++i){
    pt = points[i];
    canvas.lineTo(pt.x, pt.y);
  }
  canvas.fill();
  canvas.closePath();
}

class circle{
  constructor(center, radius){
    this.center = center;
    this.radius = radius;
    this.bg_color = new color(0,0,0,255);
    this.border_color = new color(0,0,0,255);
    this.fill = true;
    this.border = false;
    this.tag = 0;
  }
  draw(){
    if(this.fill){
      fillCircle(this.center,this.radius,this.bg_color.toHex());
    }
    if(this.border){
      drawCircle(this.center,this.radius,this.bg_color.toHex());
    }
  }
  moveTo(x,y){
    this.center.set(x,y);
  }
  moveBy(dx,dy){
    this.center.moveBy(dx,dy);
  }
  radius(){
    return this.radius;
  }
  setRadius(h){
    this.radius;
  }
  setFill(val){
    this.fill = val;
  }
  setBorder(val){
    this.border = val;
  }
  setBGColor(r,g,b,a=255){
    if(typeof r === 'color'){
      this.bg_color = r;
    }else{
      this.bg_color.set(r,g,b,a);
    }
  }
  setBGAlpha(a){
    this.bg_color.alpha = a;
  }
  setBorderColor(r,g,b,a=255){
    if(typeof r === 'color'){
      this.border_color = r;
    }else{
      this.border_color.set(r,g,b,a);
    }
  }
  setBorderAlpha(a){
    this.border_color.alpha = a;
  }
  print(){console.log(this);}
}
class vect2D{
  constructor(x=0,y=0){
    this.x = x;
    this.y = y;
    this.tag = 0;
  }
  draw(color_hex_str = "#000000ff"){
    drawPoint(this.x,this.y,color_hex_str);
  }
  set(x,y){
    this.x = x;
    this.y = y;
  }
  moveBy(dx,dy){
    this.x += dx;
    this.y += dy;
  }
  print(){console.log(this);}
}
class color{
  constructor(r,g,b,a=255){
    this.red = r;
    this.green = g;
    this.blue = b;
    this.alpha = a;
  }
  set(r,g,b,a=255){
    this.red = r;
    this.green = g;
    this.blue = b;
    this.alpha = a;
  }
  setHex(hexstr){
    if(hexstr == null || hexstr[0] != '#' || hexstr.length < 2 || hexstr.length == 6|| hexstr.length == 8 || hexstr.length > 9)return;  //    '' or '#' or 'x' or '#rgbax' or #rrggbba' or too long
    var r = 0;
    var g = 0;
    var b = 0;
    var a = 0;

    if(hexstr.length < 4){     //  '#x' => r=x b=x c=x a=ff      or '#xx'  => r=xx b=xx c=xx a=ff
      r = hexstr.substr(1,hexstr.length-1);
      g = r;
      b = r;
      a = "ff";
    }
    else if(hexstr.length < 6){                     // '#rgb' a=ff or  '#rgba'
      r = hexstr.substr(1,1);
      g = hexstr.substr(2,1);
      b = hexstr.substr(3,1);
      a = (hexstr.length == 4 )? "ff" : hexstr.substr(4,1);
    }
    else{                         // '#rrggbb'  (or  '#rgbax' is invalid) or '#rrggbbaa' (or '#rrggbba' is invalid)
      r = hexstr.substr(1,2);
      g = hexstr.substr(3,2);
      b = hexstr.substr(5,2);
      a = (hexstr.length == 7)? "ff" : hexstr.substr(7,2);
    }

    this.red = parseInt(r,'16');
    this.green = parseInt(g,'16');
    this.blue = parseInt(b,'16');
    this.alpha = parseInt(a,'16');
  }
  toHex(){
    var hex = '#' + decToHex(this.red) + decToHex(this.green) + decToHex(this.blue) + decToHex(this.alpha);

    return hex;
  }
  print(){console.log(this);}
  static red(){return new color(255,0,0);}
  static green(){return new color(0,255,0);}
  static blue(){return new color(0,0,255);}
  static white(){return new color(255,255,255);}
  static black(){return new color(0,0,0);}
  static grey(){return new color(51,51,51);}
  static yellow(){return new color(255,255,0);}
  static magenta(){return new color(255,0,255);}
  static cyan(){return new color(0,255,255);}
  static orange(){return new color(255,165,0);}
  static purple(){return new color(128,0,128);}
  static pink(){return new color(255,192,203);}
  static lime(){return new color(191,255,0);}
}
class rect{
  constructor(top_left, bottom_right){
    this.tl = top_left;
    this.br = bottom_right;
    this.bg_color = new color(0,0,0,255);
    this.border_color = new color(0,0,0,255);
    this.fill = true;
    this.border = false;
    this.tag = 0;
  }
  draw(){
    if(this.fill){
      fillRect(this.tl,this.br,this.bg_color.toHex());
    }
    if(this.border){
      drawRect(this.tl,this.br,this.border_color.toHex());
    }
  }
  moveTo(x,y){
    var dx = x - this.tl.x;
    var dy = y - this.tl.y;
    this.moveBy(dx,dy);
  }
  moveBy(dx,dy){
    this.tl.moveBy(dx,dy);
    this.br.moveBy(dx,dy);
  }
  width(){
    return Math.abs(this.tl.x - this.br.x);
  }
  setWidth(w){
    var dw = w - this.width();
    this.br.x += dw;
  }
  height(){
    return Math.abs(this.tl.y - this.br.y);
  }
  setHeight(h){
    var dh = h - this.height();
    this.br.y += dh;
  }
  setFill(val){
    this.fill = val;
  }
  setBorder(val){
    this.border = val;
  }
  setBGColor(r,g,b,a=255){
    if(typeof r === 'color'){
      this.bg_color = r;
    }else{
      this.bg_color.set(r,g,b,a);
    }
  }
  setBGAlpha(a){
    this.bg_color.alpha = a;
  }
  setBorderColor(r,g,b,a=255){
    if(typeof r === 'color'){
      this.border_color = r;
    }else{
      this.border_color.set(r,g,b,a);
    }
  }
  setBorderAlpha(a){
    this.border_color.alpha = a;
  }
  print(){console.log(this);}
}
