function landed(){
	// document.body.setAttribute('onresize','adjustCanvas();');

	var navs = document.getElementsByClassName('nav-item');
	for(var i = 0; i < navs.length; ++i){
		navs[i].setAttribute("onclick","navItemOnClick(this);");
	}

	// adjustCanvas();
}

function navItemOnClick(nav){
		var navtoid = nav.getAttribute('data-nav-to-id');
		var dest = document.getElementById(navtoid);
		scrollSmooth(elementTop(dest));
}