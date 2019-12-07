function landed(){
	var d = new Date();
	document.getElementById('footer').innerHTML = 'Phillip Stemmlar Schulze © ' + d.getFullYear();
	document.body.setAttribute('onresize','adjustCanvas();');

	var navs = document.getElementsByClassName('nav-item');
	for(var i = 0; i < navs.length; ++i){
		navs[i].setAttribute("onclick","navItemOnClick(this);");
	}

	adjustCanvas();
}

function navItemOnClick(nav){
		console.log(nav);
		var navtoid = nav.getAttribute('data-nav-to-id');
		var dest = document.getElementById(navtoid);
		scrollSmooth(elementTop(dest));
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
		}, setin);
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