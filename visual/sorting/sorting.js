var bars = [];
var sort_alg;
let bar_Length = 500;
let bar_width = 10
let bar_spacing = 10;

let bar_count = 20;

let max_val = 100;
let min_val = 10;

let loop_counter1 = 0;
let loop_counter2 = 0;
let loop_counter3 = 0;
let loop_counter4 = 0;

let loop_val = null;

setup = function(){
  // delay = 500;
  // delay = 200;
  // setFrameRate(60);
  background('#0050A0');
  loop();
  sort_alg = selection_sort;
  sort_alg();
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

  tmp = bar1.sorted;
  bar1.sorted = bar2.sorted;
  bar2.sorted = tmp;

  tmp = bar1.marked;
  bar1.marked = bar2.marked;
  bar2.marked = tmp;

  console.log("swap");
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
  var gx = width()/2 - (bar_spacing+bar_width)*bar_count/2 - bar_spacing-bar_width;
  for(var i = 0; i < bar_count; ++i){
    // console.log(i);
    var rand = Math.floor(Math.random()*(max_val-min_val)+min_val);
    bars[i] = new bar(new rect(new vect2D(gx + (i+1)*(bar_width+bar_spacing),10), new vect2D(gx+bar_width+ (i+1)*(bar_spacing+bar_width), bar_Length*(rand/100))));
    // bars[i] = new bar(new rect(new vect2D(i*(bar_width+bar_spacing),10),new vect2D(i*(bar_width+bar_spacing)+bar_width, 100)));
    bars[i].tag = rand;
    bars[i].length = bar_Length;
  }
  console.log('RESET');
  // console.log(bars);
}
function logBars(){
  var out = '';
  for(var i = 0; i < bar_count; ++i){
    out = out + bars[i].tag + '  ';
  }
  console.log(out);
}

class bar{
  constructor(Rect){
    this.Rect = Rect;
    this.active = false;
    this.marked = false;
    this.sorted = false;
    this.sorted_color = color.grey();
    this.active_color = color.green();
    this.marked_color = color.red();
    this.unsorted_color = color.black();
    this.tag = 0;
    this.length = 100;
  }
  draw(){
    this.Rect.br.y = this.length*(this.tag/100)
    if(this.sorted){
      this.Rect.bg_color = this.sorted_color;
    }else if(this.active){
      this.Rect.bg_color = this.active_color;
    }else if(this.marked){
      this.Rect.bg_color = this.marked_color;
    }else{
      this.Rect.bg_color = this.unsorted_color;
    }
    this.Rect.draw();
  }
}
