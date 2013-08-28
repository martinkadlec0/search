var p = chrome.storage.local;

p.get('data', function(store) {
	if (!store.data) reset();
});
	

function reset() {
	p.set({'data': [
		{
			icon: 'https://www.google.com/favicon.ico',
			url: 'http://www.google.com/search?q=%s&sourceid=opera&ie=utf-8&oe=utf-8'
		},
		{
			icon: 'http://en.wikipedia.org/favicon.ico',
			url: 'http://en.wikipedia.org/wiki/Special:Search?search=%s'
		},
		/*{
			icon: 'http://s1.ikiwq.com/shared/img/favicon.png',
			url: 'http://www.qwiki.com/search?query=%s&watch=watch'
		},*/
		/*{
			icon: 'http://www.google.com/moon/images/bar_icon_link.gif',
			url: '%s'
		},*/
		{
			icon: 'http://translate.google.com/favicon.ico',
			url: 'http://translate.google.com/translate_t?text=%s&langpair=auto|cs&tbb=1&ie=UTF8'
		}
	] });
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	var data = message.data;
	switch (data.action) {
		case 'reset': reset(); break;
	}
});