var bars = [];
var sort_alg;
let bar_count = 10;
let bar_Length = 500;
let max_val = 100;
let min_val = 10;

let c = 0;

setup = function(){
  background('#0050A0');
  noloop();
  resetBars();
  sort_alg = bubble_sort;
  sort_alg(bars);
}

draw = function(){
  // if(typeof sort_alg !== 'undefined'){
  //   sort_alg(bars);
  // }else{
  //   console.log("No sorting algorithm selected!");
  // }

  for(var i = 0; i < bar_count; ++i){
    var col = (i/bar_count)*255;
    // bars[i].setBGColor(col,col,col);
    bars[i].setBGColor(col,col,col);
    // bars[i].tag = min_val + bars[i].tag + c;
    bars[i].br.y = bar_Length*(bars[i].tag/100);
    bars[i].draw();
  }
}

function bubble_sort(arr){
  console.log('Using bubble sort');
  for(var i = 0; i < arr.length-1; ++i){
    for(var j = 0; j < arr.length-i-1; ++j){
      if(arr[j].tag > arr[j+1].tag){
        swapBars(arr[j],arr[j+1]);
      }
    }
  }
}

function swapBars(b1,b2){
  var tmp = b1.tag;
  b1.tag = b2.tag;
  b2.tag = tmp;
}
function resetBars(){
  var d = 10
  var s = 10;
  var gx = width()/2 - (s+d)*bar_count/2 - s-d;

  for(var i = 1; i < bar_count+1; ++i){
    var rand = Math.random()*(max_val-min_val)+min_val;
    bars[i-1] = new rect(new vect2D(gx + i*(d+s),10), new vect2D(gx+d+ i*(s+d), bar_Length*(rand/100)));
    bars[i-1].tag = rand;
  }
}
