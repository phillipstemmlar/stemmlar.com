function ready(){
	var d = new Date();
	document.getElementById('copyright').innerHTML = 'Phillip Stemmlar Schulze © ' + d.getFullYear();

	document.getElementById('btn-feedback-open').setAttribute('onclick','showFeedback();');
	adjustFeedbackToHidden();

	document.getElementById('feedback-input-email').setAttribute('oninput','toggleLabel(this);');
	document.getElementById('feedback-input-other').setAttribute('oninput','toggleLabel(this);');
	document.getElementById('feedback-input-msg').setAttribute('oninput','toggleLabel(this);');

	document.getElementById('feedback-input-type').setAttribute('onchange','onTypeSelected(this);');
	onTypeSelected(document.getElementById('feedback-input-type'));
}

function onTypeSelected(sender){
	var other = document.getElementById('feedback-input-other');
	var notify = document.getElementById('feedback-check-notify');
	if(sender.value == 'Other'){
		other.hidden = false;
		notify.hidden = true;
		notify.checked = false;
	}else if(sender.value == 'Request'){
		other.hidden = true;
		other.value = '';
		notify.hidden = false;
	}else{
		other.hidden = true;
		other.value = '';
		notify.hidden = true;
		notify.checked = false;
	}
	toggleLabel(other);
	toggleLabel(notify);
	scrollToBottom();
}

function toggleLabel(sender){
	var par = sender.parentNode;
	var label = par.querySelectorAll('label')[0];
	label.hidden = (parseInt(sender.value.length) > 0 && !sender.hidden)? false: true;
}

function showFeedback(){
		toggleFeedback();
		scrollToBottom();
}

function toggleFeedback(){
	toggleFeedbackHidden();
	adjustFeedbackToHidden();
}

function toggleFeedbackHidden(){
	var fbody = document.getElementById('feedback-body');
	fbody.hidden = !fbody.hidden;
}

function adjustFeedbackToHidden(){
	var fbody = document.getElementById('feedback-body');
	document.getElementById('btn-feedback-open').innerHTML = (fbody.hidden)? 'Give Feedback' : 'Close Feedback';
	document.getElementById('feedback-container').style.backgroundColor = (fbody.hidden)? 'rgba(0,0,0,0)' : 'white';
	document.getElementById('feedback-container').style.padding = (fbody.hidden)? '0px' : '10px';
	if(fbody.hidden) clearFeedback();
}

function clearFeedback(){
	document.getElementById('feedback-input-email').value = '';
	document.getElementById('feedback-input-other').value = '';
	document.getElementById('feedback-input-msg').value = '';
	document.getElementById('feedback-input-type').selectedIndex = 0;
	document.getElementById('feedback-check-notify').checked = false;
	document.getElementById('feedback-check-subscribe').checked = false;
}

function scrollToBottom(){
	var fbody = document.getElementById('feedback-body');
	if(!fbody.hidden){
		document.documentElement.scrollTop = document.documentElement.scrollHeight;
	}
}

function scrollSmooth(top, time = 2){
	if(isNaN(top))	throw "Top must be a nubmer";
	if(pos < 0)			throw "Top cannot be negative";

	const offset = 10;
	var pos = document.documentElement.scrollTop;
	if(pos < top){
		var t = offset;
		for(let i = pos; i <= top; i+= offset){
			t += offset;
			setTimeout(() => {document.documentElement.scrollTo(0,i);} , t/2);
		}
	}else{
		var i = pos;
		var x;
		x = setInterval(() => {
			document.documentElement.scrollTo(0,i);
			i-=offset;
			if(i <= top) clearInterval(x);
		}, time);
	}
}


function elementTop(element){
	var rect = element.getBoundingClientRect();
	return rect.top;
}
function elementRight(element){
	var rect = element.getBoundingClientRect();
	return rect.right;
}
function elementBottom(element){
	var rect = element.getBoundingClientRect();
	return rect.bottom;
}
function elementLeft(element){
	var rect = element.getBoundingClientRect();
	return rect.left;
}