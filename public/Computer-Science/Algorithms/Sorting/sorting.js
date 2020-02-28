var bars = [];
var values = [];
var sort_alg;
let bar_Length = 100;
let bar_width = 15
let bar_spacing = 15;
let bar_vert_offest = 0;
var showValues = true;
var randomValues = true;

var bar_count = 10;
var BAR_COUNT = bar_count;

var max_val = 100;
var min_val = 10;
var max_bars = 25;
var min_bars = 5;

let loop_counter1 = 0;
let loop_counter2 = 0;
let loop_counter3 = 0;
let loop_counter4 = 0;

let loop_val = null;
let loop_val1 = null;

var isSorted = false;

let BGCOLOR = '#bbbbbb';
let sorted_color = new color(0,0,0);
let unsorted_color = new color(0,0,0);
let active_color = new color(0,0,0);
let marked_color = new color(0,0,0);
// <option value="volvo">Volvo</option>

var algos_names = ['Bubble Sort','Insertion Sort','Selection Sort'];
var algos_func = [bubble_sort,insertion_sort,selection_sort];

setup = function(){
  resetBars();
  background(BGCOLOR);
  isSorted = false;
  sort_alg();
}

function insertion_sort(){
  drawBars();

  loop_counter1 = 1;
  loop_counter2 = loop_counter1 - 1;
  loop_val = bars[loop_counter1].tag;
  loop_val1 = false;

  draw = function(){
    if(loop_counter1 < BAR_COUNT){
      if(loop_counter2 >= 0 && bars[loop_counter2].tag > loop_val){
        bars[loop_counter2].active = true;
        bars[loop_counter2].sorted = false;
        swapBars(bars[loop_counter2+1],bars[loop_counter2]);
        bars[loop_counter2+1].sorted = true;
        loop_counter2--;
      }else{
        bars[loop_counter2+1].sorted = true;
        loop_counter1++;
        if(loop_counter1 < BAR_COUNT){
          loop_val = bars[loop_counter1].tag;
          bars[loop_counter1].marked = true;
          bars[loop_counter1].sorted = false;
          loop_counter2 = loop_counter1 - 1;
        }
      }
    }else{
      bars[BAR_COUNT-1].sorted = true;
      noloop();
      isSorted = true;
    }
    drawBars();
  }

/*
  int i, key, j;
    for (i = 1; i < n; i++)
    {
        key = arr[i].tag;
        j = i - 1;

        while (j >= 0 && arr[j].tag > key)
        {
            arr[j + 1].tag = arr[j].tag;
            j = j - 1;
        }
        arr[j + 1].tag = key;
    }
  */
}
function selection_sort(){
  drawBars();

  loop_counter1 = 0;    // i = 0
  loop_counter2 = 1;    // j = 0
  loop_counter3 = 0;    // min_index = 0

  // bars[0].marked = true;

  draw = function(){
    if(loop_counter1 < BAR_COUNT-1){
      if(loop_counter2 < BAR_COUNT){
        bars[loop_counter3].marked = true;
        bars[loop_counter2-1].active = false;
        bars[loop_counter2].active = true;

        if(bars[loop_counter2].tag < bars[loop_counter3].tag){
          bars[loop_counter3].marked = false;
          loop_counter3 = loop_counter2;
          bars[loop_counter3].marked = true;
        }
        loop_counter2++;
      }else{
        swapBars(bars[loop_counter3],bars[loop_counter1])
        bars[loop_counter1].sorted = true;
        bars[BAR_COUNT-1].active = false;
        loop_counter1++;
        loop_counter3 = loop_counter1;
        loop_counter2 = loop_counter1 + 1;
      }
    }else{
      bars[BAR_COUNT-1].sorted = true;
      noloop();
      isSorted = true;
    }
    drawBars();
  }
/*
  for (i = 0; i < n-1; i++){
      min_idx = i;
      for (j = i+1; j < n; j++){
        if (bars[j].tag < bars[min_idx].tag)
            min_idx = j; }
      swapBars(bars[min_idx], bars[i])
  */
}
function bubble_sort(){
  drawBars();

  loop_counter1 = 0;    // i = 0
  loop_counter2 = 0;    // j = 0

  draw = function(){
    if(loop_counter1 < BAR_COUNT - 1){
      if(loop_counter2 < BAR_COUNT - loop_counter1 - 1){
        bars[loop_counter2].active = false;
        bars[loop_counter2+1].active = true;
        if(bars[loop_counter2].tag > bars[loop_counter2+1].tag){
          swapBars(bars[loop_counter2],bars[loop_counter2+1]);
        }
        loop_counter2++;
      }else{
        loop_counter1++;
        loop_counter2 = 0;
        bars[BAR_COUNT - loop_counter1].sorted = true;
      }
    }else{
      bars[0].sorted = true;
      noloop();
      isSorted = true;
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

function swapBars(bar1, bar2){
  var tmp = bar1.tag;
  bar1.tag = bar2.tag;
  bar2.tag = tmp;

  tmp = bar1.marked;
  bar1.marked = bar2.marked;
  bar2.marked = tmp;

  // console.log("swap");
}
function sort(){
  sort_alg();
  if(!isLooping){
    loop();
    init();
  }
}
function drawBars(){
  for(var i = 0; i < BAR_COUNT; ++i){
    bars[i].draw();
  }
}

function init_drawBars(){
  clear();
  canvas.fillStyle = BACKGROUND_COLOR;
  canvas.clearRect(0,0,width(),height());
  canvas.fillRect(0,0,width(),height());
  drawBars();
}

function resetBars(){
  var vals;
  if(randomValues){
    BAR_COUNT = bar_count;
    values = [];
    for(var i = 0; i < bar_count; i++){
      values[i] = Math.floor(Math.random()*(max_val-min_val)+min_val);
    }
    vals = values;
  }else{
    BAR_COUNT = ownValues.length;
    vals = ownValues;
  }

  bar_Length = height() - 20;
  var gx = width()/2 - (bar_spacing+bar_width)*BAR_COUNT/2 - bar_spacing-bar_width;

  for(var i = 0; i < BAR_COUNT; ++i){
    var val = vals[i];
    bars[i] = new bar(new rect(new vect2D(gx + (i+1)*(bar_width+bar_spacing),bar_vert_offest), new vect2D(gx+bar_width+ (i+1)*(bar_spacing+bar_width), bar_Length*(val/100)+bar_vert_offest)));
    bars[i].tag = val;
    bars[i].length = bar_Length;
    bars[i].showValue = showValues;
    bars[i].sorted_color = sorted_color;
    bars[i].unsorted_color = unsorted_color;
    bars[i].active_color = active_color;
    bars[i].marked_color = marked_color;
  }
  // console.log('RESET');
  // console.log(bars);
}
function logBars(){
  var out = '';
  for(var i = 0; i < BAR_COUNT; ++i){
    out = out + bars[i].tag + '  ';
  }
  console.log(out);
}
