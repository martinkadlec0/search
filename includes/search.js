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

	var resetCSS = 'padding: 0; border: 0; margin: 0; float: none; font-size: 0; background: transparent; vertical-align: top; ';

	var i;
	for (i=0; i<icons.length; i++) {
		if (!icons[i].disabled) {
			icons[i].lnk = document.createElement('a');
			icons[i].lnk.style.cssText = resetCSS + ' display: inline;';
			icons[i].lnk.innerHTML = '<img style="' + resetCSS + ' display: inline-block;" width="16" height="16" src="' + icons[i].icon + '">';
			if (icons[i].title) {
				icons[i].lnk.title = icons[i].title;
			}

			if (!/javascript:/.test(icons[i].url)) {
				icons[i].lnk.target = '_blank';
			}
			
			wnd.appendChild(icons[i].lnk);	
			if (i + 1 < icons.length) {
				wnd.appendChild(document.createTextNode(' '));
			}
		}
	}

	document.addEventListener('mouseup', function(e) {
		// When you click on link with selected text, the selection remains -> wnd apperas again
		// lastSelection variable is supposed to fix this problem
		var txt = window.getSelection().toString().trim();
		if (txt != lastSelection) {
			
			if (txt && !wnd.parentNode && e.button == 0) {
				setLinks(txt);
				document.body.appendChild(wnd);
				var halfWidth = wnd.offsetWidth / 2;
				wnd.style.left = (e.pageX - halfWidth < 0 ? 0 : e.pageX - halfWidth) + 'px';
				wnd.style.top = (e.pageY - 55 < 0 ? 0 : e.pageY - 55) + 'px';
				
			} else if (wnd.parentNode &&  /javascript:/.test(e.target.parentNode.href)) {
				setTimeout(function() {
					document.body.removeChild(wnd);	
				}, 0);
				lastSelection = txt;
			}
		} else {
			lastSelection = '';
		}
	});

	var lastSelection = '';
	document.addEventListener('mousedown', handleMouseDown);

	function handleMouseDown(e) {
		lastSelection = '';
		var txt = window.getSelection().toString().trim();
		if (wnd.parentNode && !isAncestor(e.target, wnd)) {
			document.body.removeChild(wnd);
			lastSelection = txt;
		} 
	}

	function setLinks(txt) {
		var tmp;
		for (var i=0; i<icons.length; i++) {
			if (!icons[i].disabled) {
				tmp = window.encodeURIComponent(txt);
				icons[i].lnk.href = icons[i].url.replace('%s', tmp).replace('%t', txt);
			}
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

