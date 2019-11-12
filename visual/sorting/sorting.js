let bars = [];
let bar_count = 10;

setup = function(){
  // noloop();
  var d = 10
  var s = 10;
  var gx = width()/2 - (s+d)*bar_count/2 - s-d;

  for(var i = 1; i < bar_count+1; ++i){
    bars[i] = new rect(new vect2D(gx + i*(d+s),10), new vect2D(gx+d+ i*(s+d), 50));
  }

}

draw = function(){
  for(var i = 1; i < bar_count+1; ++i){
    bars[i].draw();
    bars[i].moveBy(0,1);
  }
}
