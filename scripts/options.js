var d = document;
	var p = chrome.storage.local;
	var buttons, menu;

	JSON.saveParse = function(txt) {
		try {
			return JSON.parse(txt);
		} catch(e) {
			return null;
		}
	};

	d.addEventListener('DOMContentLoaded', init);

	function init() {
		menu = d.querySelector('.menu');
		buttons = d.querySelector('#buttons');

		p.get('data', function(store) {
			if (!store.data || !Array.isArray(store.data)) return;

			for (var i=0; i < store.data.length; i++) {
				var ele = readTpl('btn_tpl', store.data[i]);
				ele.className = 'item';
				buttons.appendChild(ele);
			}
		});
		
	}

	function readTpl(tplSource, data) {
		var newEle = d.createElement('div');
		var tmp = d.getElementById(tplSource).innerHTML;
		
		newEle.innerHTML = Mustache.render(tmp, data);

		return newEle;

	}

	

	d.addEventListener('focusout', saveData);
	d.addEventListener('change', function(e) {
		if (e.target.type == 'checkbox') {
			saveData();
		}
	});

	function saveData(e, list) {
		var newData = [];

		var items = d.querySelectorAll('.item');
		var i, j, url, icon, title, tmp;
		for (i=0, j=items.length; i<j; i++) {
			url = items[i].querySelector('.tpl-url').value;
			icon = items[i].querySelector('.tpl-icon').value;
			title = items[i].querySelector('.tpl-title').value;
			disabled = !items[i].querySelector('.tpl-enabled').checked;

			if (url && icon) {
				tmp = { url: url, icon: icon };

				if (disabled) tmp.disabled = true; 
				if (title) tmp.title = title;

				newData.push(tmp);	
			}
		}

		if (list) {
			newData = newData.concat(list)
		}


		p.set({ 'data': newData });
	}

	d.addEventListener('click', function(e) {


		var t = e.target;
		if (t.id == 'reset') {
			if (confirm('Do you really want reset defaults?' )) {
				opera.extension.postMessage({ action: 'reset' }) ;
				window.location.reload();
			}
		} else if (t.id == 'add') {
			var ele = readTpl('btn_tpl', {});
			ele.className = 'item';
			buttons.appendChild(ele);
		} else if (t.id == 'up' && t.parentNode.previousElementSibling) {
			buttons.insertBefore(t.parentNode, t.parentNode.previousElementSibling);
			saveData();
		} else if (t.id == 'down' && t.parentNode.nextElementSibling) {
			buttons.insertBefore(t.parentNode.nextElementSibling, t.parentNode);
			saveData();
		} else if (t.id == 'del') {
			buttons.removeChild(t.parentNode);
			saveData();
		} else if (t.id == 'export') {
			p.get('data', function(store) {
				var expr = new Blob([JSON.stringify(store.data)]);
				chrome.tabs.create({ url:  URL.createObjectURL(expr) });
			});
		} else if (t.id == 'import') {
			var list = prompt('Put exported string here: ');
			tryParse = JSON.saveParse(list);
			if (Array.isArray(tryParse)) {
				p.set({ 'data': tryParse }, function() {
					window.location.reload()
				});				
			} else if (list) {
				alert('wrong format!');
			}
		} else if (t.id == 'append') {
			var list = prompt('Put exported string here: ');
			tryParse = JSON.saveParse(list);
			if (Array.isArray(tryParse)) {
				saveData(e, tryParse);
				window.location.reload();	
			} else if (list) {
				alert('wrong format!');
			}
		} 

		if (!menu.hidden) {
			menu.hidden = true;
		} else if (t.id == 'more') {
			menu.hidden = false;
			menu.style.top = t.offsetTop + 'px';
			menu.style.left = t.offsetLeft + t.offsetWidth + 5 + 'px';
		} 
	});	