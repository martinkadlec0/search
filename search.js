var wnd = document.createElement('div');
wnd.style.cssText = 'position: absolute; background: white; border: 3px solid #ccc; min-width: 80px; padding: 10px; height: 15px; border-radius: 4px;';

var lnk = document.createElement('a');
wnd.appendChild(lnk);

document.addEventListener('mouseup', function(e) {
	var txt = window.getSelection().toString().trim();
	if (txt) {
		lnk.innerHTML = 'Hledat: ' + txt;
		lnk.href = 'http://www.google.com/search?q=%s&sourceid=opera&num=%i&ie=utf-8&oe=utf-8'.replace('%s', txt);
		wnd.style.left = e.pageX - 40 + 'px';
		wnd.style.top = e.pageY - 50 + 'px';
		document.body.appendChild(wnd);
	}
});