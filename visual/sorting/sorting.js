var bars = [];
var sort_alg;
let bar_count = 20;
let bar_Length = 500;
let max_val = 100;
let min_val = 10;

let loop_counter1 = 0;
let loop_counter2 = 0;

let active_color = color.green();
let sorted_color = color.grey();
let unsorted_color = color.black();

setup = function(){
  // delay = 500;
  background('#0050A0');
  loop();
  sort_alg = bubble_sort;
  sort_alg();
}

function selection_sort(){

}

function bubble_sort(){
  resetBars();
  drawBars();

  loop_counter1 = 0;    // i = 0
  loop_counter2 = 0;    // j = 0

  draw = function(){
    if(loop_counter1 < bar_count - 1){
      if(loop_counter2 < bar_count - loop_counter1 - 1){

        bars[loop_counter2].bg_color = unsorted_color;
        bars[loop_counter2+1].bg_color = active_color;

        if(bars[loop_counter2].tag > bars[loop_counter2+1].tag){
          swapBars(bars[loop_counter2],bars[loop_counter2+1]);
        }
        loop_counter2++;
      }else{
        loop_counter1++;
        loop_counter2 = 0;
        bars[bar_count - loop_counter1].bg_color = sorted_color;
      }
    }else{
      noloop();
      bars[0].bg_color = sorted_color;
    }
    drawBars();
  }

  /*
    for (i = 0; i < n-1; i++)
      for (j = 0; j < n-i-1; j++)
          if (bars[j] > bars[j+1])
              swap(bars[j], bars[j+1]);
  */
}

function swapBars(b1,b2){
  var tmp = b1.tag;
  b1.tag = b2.tag;
  b2.tag = tmp;
  console.log("swap");
}
function drawBars(){
  for(var i = 0; i < bar_count; ++i){
    // bars[i].tag = min_val + bars[i].tag + c;
    bars[i].br.y = bar_Length*(bars[i].tag/100);
    bars[i].draw();
  }
}
function resetBars(){
  var d = 10
  var s = 10;
  var gx = width()/2 - (s+d)*bar_count/2 - s-d;

  for(var i = 0; i < bar_count; ++i){
    var rand = Math.floor(Math.random()*(max_val-min_val)+min_val);
    bars[i] = new rect(new vect2D(gx + (i+1)*(d+s),10), new vect2D(gx+d+ (i+1)*(s+d), bar_Length*(rand/100)));
    bars[i].tag = rand;
    bars[i].bg_color = unsorted_color;
  }
}
function logBars(){
  var out = '';
  for(var i = 0; i < bar_count; ++i){
    out = out + bars[i].tag + '  ';
  }
  console.log(out);
}
