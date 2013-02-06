(function() {

	function saveParse(txt) {
		try {
			return JSON.parse(txt);
		} catch(e) {
			return null;
		}
	};

	var wnd = document.createElement('unknown');
	wnd.style.cssText = 'box-sizing: content-box !important; display: block; z-index: 99999999; position: absolute; word-spacing: 5px; background: white; border: 3px solid #ccc; min-width: 10px; text-align: center; padding: 10px; height: 15px; border-radius: 4px; box-shadow: 0 0 5px black;';

	var icons = saveParse(widget.preferences.data) || [];

	var i;
	for (i=0; i<icons.length; i++) {
		icons[i].lnk = document.createElement('a');
		icons[i].lnk.innerHTML = '<img style="padding: 0; border: 0; margin: 0; float: none;" width="16" height="16" src="' + icons[i].icon + '">';
		icons[i].lnk.target = '_blank';
		wnd.appendChild(icons[i].lnk);	
		if (i + 1 < icons.length) {
			wnd.appendChild(document.createTextNode(' '));
		}
	}

	document.addEventListener('mouseup', function(e) {
		var txt = window.getSelection().toString().trim();
		if (txt && !wnd.parentNode && e.button == 0) {
			txt = txt == '%s' ? txt: window.encodeURIComponent(txt);
			setLinks(txt);
			document.body.appendChild(wnd);
			var halfWidth = wnd.offsetWidth / 2;
			wnd.style.left = (e.pageX - halfWidth < 0 ? 0 : e.pageX - halfWidth) + 'px';
			wnd.style.top = (e.pageY - 55 < 0 ? 0 : e.pageY - 55) + 'px';
			
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

