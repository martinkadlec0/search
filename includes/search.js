(function() {

	var wnd = document.createElement('unknown');
	wnd.style.cssText = 'box-sizing: content-box !important; display: block; z-index: 99999999; position: absolute; word-spacing: 5px; background: white; border: 3px solid #ccc; min-width: 100px; text-align: center; padding: 10px; height: 15px; border-radius: 4px; box-shadow: 0 0 5px black;';

	var icons = [
		{
			icon: 'https://www.google.com/favicon.ico',
			url: 'http://www.google.com/search?q=%s&sourceid=opera&num=%i&ie=utf-8&oe=utf-8'
		},
		{
			icon: 'http://en.wikipedia.org/favicon.ico',
			url: 'http://en.wikipedia.org/wiki/Special:Search?search=%s'
		},
		{
			icon: 'http://s1.ikiwq.com/shared/img/favicon.png',
			url: 'http://www.qwiki.com/search?query=%s&watch=watch'
		},
		{
			icon: 'http://translate.google.com/favicon.ico',
			url: 'http://translate.google.com/#en/cs/%s'
		}
	];

	var i;
	for (i=0; i<icons.length; i++) {
		icons[i].lnk = document.createElement('a');
		icons[i].lnk.innerHTML = '<img src="' + icons[i].icon + '">';
		icons[i].lnk.target = '_blank';
		wnd.appendChild(icons[i].lnk);	
		if (i + 1 < icons.length) {
			wnd.appendChild(document.createTextNode(' '));
		}
	}

	document.addEventListener('mouseup', function(e) {
		var txt = window.getSelection().toString().trim();
		if (txt && !wnd.parentNode) {
			setLinks(txt);
			wnd.style.left = (e.pageX - 60 < 0 ? 0 : e.pageX - 60) + 'px';
			wnd.style.top = (e.pageY - 55 < 0 ? 0 : e.pageY - 55) + 'px';
			document.body.appendChild(wnd);
		} 
	});

	document.addEventListener('mousedown', function(e) {
		if (wnd.parentNode && !isAncestor(e.target, wnd)) {
			document.body.removeChild(wnd);
		}
	});

	function setLinks(txt) {
		for (var i=0; i<icons.length; i++) {
			icons[i].lnk.href = icons[i].url.replace('%s', txt);
		}
	}

	function isAncestor(what, test) {
		if (what.isSameNode(test)) {
			return true;
		} else if (!what.parentNode) {
			return false;
		} else {
			return isAncestor(what.parentNode, test);
		}
	}

})();

