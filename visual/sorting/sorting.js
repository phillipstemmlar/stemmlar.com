var bars = [];
var sort_alg;
let bar_Length = 100;
let bar_width = 15
let bar_spacing = 15;
let bar_vert_offest = 0;
let showValues = false;

let bar_count = 10;

let max_val = 100;
let min_val = 10;

let loop_counter1 = 0;
let loop_counter2 = 0;
let loop_counter3 = 0;
let loop_counter4 = 0;

let loop_val = null;
let loop_val1 = null;

let BGCOLOR = '#bbbbbb';
let sorted_color = new color(0,0,0);
let unsorted_color = new color(0,0,0);
let active_color = new color(0,0,0);
let marked_color = new color(0,0,0);
// <option value="volvo">Volvo</option>

var algos_names = ['Bubble Sort','Insertion Sort','Selection Sort'];
var algos_func = [bubble_sort,insertion_sort,selection_sort];

function onLoad(){
  var cmb = document.getElementById('algorithms');
  for (var i = 0; i < algos_names.length; i++){
    cmb.innerHTML = cmb.innerHTML + '\n<option value="'+i+'">'+algos_names[i]+'</options>';
  }
  onColorChanged('cont-sorted-color','sorted_color');
  onColorChanged('cont-unsorted-color','unsorted_color');
  onColorChanged('cont-active-color','active_color');
  onColorChanged('cont-marked-color','marked_color');
  setFrameRate(30);
}

function onColorChanged(id1,id2){
  var cp = document.getElementById(id1);
  cp.style.backgroundColor = document.getElementById(id2).value;
}

function start(){
  var count_in = document.getElementById('bar_count');
  if(count_in.value > count_in.max) count_in.value = count_in.max;
  if(count_in.value < count_in.min) count_in.value = count_in.min;
  bar_count = count_in.value;

  var fps_in = document.getElementById('frame_rate');
  if(fps_in.value > fps_in.max) fps_in.value = fps_in.max;
  if(fps_in.value < fps_in.min) fps_in.value = fps_in.min;
  setFrameRate(fps_in.value);

  showValues = document.getElementById('showValues').checked;
  bar_vert_offest = (showValues)? 20 : 0;

  sorted_color.setHex(document.getElementById('sorted_color').value);
  unsorted_color.setHex(document.getElementById('unsorted_color').value);
  active_color.setHex(document.getElementById('active_color').value);
  marked_color.setHex(document.getElementById('marked_color').value);

  var index = document.getElementById('algorithms').value;
  sort_alg = algos_func[index];
  if(typeof sort_alg === 'function'){
    init();
  }
}

setup = function(){
  // setFrameRate(60);
  background(BGCOLOR);
  loop();
  sort_alg();
}

function insertion_sort(){
  resetBars();
  drawBars();

  loop_counter1 = 1;
  loop_counter2 = loop_counter1 - 1;
  loop_val = bars[loop_counter1].tag;
  loop_val1 = false;

  draw = function(){
    if(loop_counter1 < bar_count){
      if(loop_counter2 >= 0 && bars[loop_counter2].tag > loop_val){
        bars[loop_counter2].active = true;
        bars[loop_counter2].sorted = false;
        swapBars(bars[loop_counter2+1],bars[loop_counter2]);
        bars[loop_counter2+1].sorted = true;
        loop_counter2--;
      }else{
        bars[loop_counter2+1].sorted = true;
        loop_counter1++;
        if(loop_counter1 < bar_count){
          loop_val = bars[loop_counter1].tag;
          bars[loop_counter1].marked = true;
          bars[loop_counter1].sorted = false;
          loop_counter2 = loop_counter1 - 1;
        }
      }
    }else{
      bars[bar_count-1].sorted = true;
      noloop();
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
  resetBars();
  drawBars();

  loop_counter1 = 0;    // i = 0
  loop_counter2 = 1;    // j = 0
  loop_counter3 = 0;    // min_index = 0

  // bars[0].marked = true;

  draw = function(){
    if(loop_counter1 < bar_count-1){
      if(loop_counter2 < bar_count){
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
        bars[bar_count-1].active = false;
        loop_counter1++;
        loop_counter3 = loop_counter1;
        loop_counter2 = loop_counter1 + 1;
      }
    }else{
      noloop();
      bars[bar_count-1].sorted = true;
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
  resetBars();
  drawBars();

  loop_counter1 = 0;    // i = 0
  loop_counter2 = 0;    // j = 0

  draw = function(){
    if(loop_counter1 < bar_count - 1){
      if(loop_counter2 < bar_count - loop_counter1 - 1){
        bars[loop_counter2].active = false;
        bars[loop_counter2+1].active = true;
        if(bars[loop_counter2].tag > bars[loop_counter2+1].tag){
          swapBars(bars[loop_counter2],bars[loop_counter2+1]);
        }
        loop_counter2++;
      }else{
        loop_counter1++;
        loop_counter2 = 0;
        bars[bar_count - loop_counter1].sorted = true;
      }
    }else{
      noloop();
      bars[0].sorted = true;
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
  for(var i = 0; i < bar_count; ++i){
    bars[i].draw();
  }
}
function resetBars(){
  bar_Length = height() - 20;
  var gx = width()/2 - (bar_spacing+bar_width)*bar_count/2 - bar_spacing-bar_width;
  for(var i = 0; i < bar_count; ++i){
    // console.log(i);
    var rand = Math.floor(Math.random()*(max_val-min_val)+min_val);
    bars[i] = new bar(new rect(new vect2D(gx + (i+1)*(bar_width+bar_spacing),bar_vert_offest), new vect2D(gx+bar_width+ (i+1)*(bar_spacing+bar_width), bar_Length*(rand/100)+bar_vert_offest)));
    // bars[i] = new bar(new rect(new vect2D(i*(bar_width+bar_spacing),10),new vect2D(i*(bar_width+bar_spacing)+bar_width, 100)));
    bars[i].tag = rand;
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
  for(var i = 0; i < bar_count; ++i){
    out = out + bars[i].tag + '  ';
  }
  console.log(out);
}
