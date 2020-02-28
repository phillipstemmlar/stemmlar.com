var ownValues = [];

function onLoad(){
  var cmb = document.getElementById('algorithms');
  for (var i = 0; i < algos_names.length; i++){
    cmb.innerHTML = cmb.innerHTML + '\n<option value="'+i+'">'+algos_names[i]+'</options>';
  }

  var inputs = document.querySelectorAll('input[type="number"]');
  for(var i = 0; i < inputs.length; ++i){
      inputs[i].setAttribute('onfocus','onFocusSelect(this);');
      inputs[i].setAttribute('onchange','validateValue(this);');
  }
  inputs = document.querySelectorAll('input[type="color"]');
  for(var i = 0; i < inputs.length; ++i){
      inputs[i].setAttribute('onchange','onColorChanged(this);');
      onColorChanged(inputs[i]);
  }
  document.getElementById('algorithms').setAttribute('onchange','onChangeAlgo();');

  ownValues = [];

  setInputMinMax('add-item-value',min_val,max_val);
  setInputMinMax('bar_count',min_bars,max_bars);
  setInputMinMax('frame_rate',min_fps,max_fps);

  onRandomValues();
  setFrameRate(default_fps);

  onChangeAlgo();
}

function onChangeAlgo(){
  noloop();
  start();
}

function clearValues(){
  ownValues = [];
  onChangeAlgo();
  document.getElementById('add-item-clear').style.display = "none";
  document.getElementById('add-item-shuffle').style.display = "none";
  document.getElementById('bar_count').value = ownValues.length;
}

function shuffleValues(){

}

function onRandomValues(){
  if(!document.getElementById('randomValues').checked){
    randomValues = false;
    document.getElementById('add-item-panel').style.display = "";
    document.getElementById('add-item-value').value = Math.floor((min_val+max_val)/2);
    document.getElementById('bar_count').setAttribute('disabled','1');
    document.getElementById('bar_count').min = 0;
    document.getElementById('bar_count').value = ownValues.length;
    if(ownValues.length > 0){
      document.getElementById('add-item-shuffle').style.display = "";
      document.getElementById('add-item-clear').style.display = "";
    }else{
    document.getElementById('add-item-shuffle').style.display = "none";
        document.getElementById('add-item-clear').style.display = "none";
    }
    values = ownValues;
  }else{
    randomValues = true;
    document.getElementById('add-item-shuffle').style.display = "none";
    document.getElementById('add-item-clear').style.display = "none";
    document.getElementById('add-item-panel').style.display = "none";
    document.getElementById('bar_count').removeAttribute('disabled');
    document.getElementById('bar_count').min = min_bars;
    document.getElementById('bar_count').value = bar_count;
  }
  onChangeAlgo();
}

function validateValue(input){
  if(parseInt(input.value) > parseInt(input.max)) input.value = input.max;
  if(parseInt(input.value) < parseInt(input.min) || input.value.length == 0) input.value = input.min;
}

function onFocusSelect(obj){
  obj.select();
}

function onAddValue(){
  var input = document.getElementById('add-item-value');
  var val = parseInt(input.value);
  var max = parseInt(input.max);
  var min = parseInt(input.min);
  if(val > max){ val = max; }
  if(val < min || input.value.length == 0){ val = min; }
  input.value = Math.floor((min+max)/2);
  ownValues.push(Math.floor(val));
  document.getElementById('bar_count').value = ownValues.length;
  if(ownValues.length > 0){
    document.getElementById('add-item-clear').style.display = "";
    document.getElementById('add-item-shuffle').style.display = "";
  }
  onChangeAlgo();
}

function onColorChanged(obj){
  obj.parentElement.style.backgroundColor = obj.value;
}

function setInputMinMax(id,min,max){
  var valueInput = document.getElementById(id);
  valueInput.setAttribute('min',min);
  valueInput.setAttribute('max',max);
}

function onSort(){
  loop();
  if(isSorted){
    start();
  }else{
    start_Draw();
  }
}

function start(){
  if(randomValues){
    var count_in = document.getElementById('bar_count');
    if(parseInt(count_in.value) > parseInt(count_in.max)) count_in.value = count_in.max;
    if(parseInt(count_in.value) < parseInt(count_in.min)) count_in.value = count_in.min;
    bar_count = count_in.value;
  }

  var fps_in = document.getElementById('frame_rate');
  if(parseInt(fps_in.value) > parseInt(fps_in.max)) fps_in.value = fps_in.max;
  if(parseInt(fps_in.value) < parseInt(fps_in.min)) fps_in.value = fps_in.min;
  setFrameRate(fps_in.value);

  showValues = document.getElementById('showValues').checked;
  bar_vert_offest = (showValues)? 30 : 10;

  sorted_color.setHex(document.getElementById('sorted_color').value);
  unsorted_color.setHex(document.getElementById('unsorted_color').value);
  active_color.setHex(document.getElementById('active_color').value);
  marked_color.setHex(document.getElementById('marked_color').value);

  var index = document.getElementById('algorithms').value;
  sort_alg = algos_func[index];

  if(typeof sort_alg === 'function'){
    if(isLooping){
      init_draw();
    }else{
      init();
      canvas.fillStyle = BACKGROUND_COLOR;
      canvas.clearRect(0,0,width(),height());
      canvas.fillRect(0,0,width(),height());
      drawBars();
    }
  }

}
