## About

Search window is an extension for Opera Browser.

It gives you quick access to many customizable tools like searching and translating just by selecting some text on any webpage.

By default there are buttons for Google, Wiki and Google Translator.

```
Note: The Google translator translates from English to Czech language. To change the languages use an options page.
```

In the options page you can add your own buttons and remove or edit the default set of buttons.


## Tips

You can use two special symbols in Search URL.

  * %s - encoded selected string
  * %t - non-encoded selected string

Most of the times, you will want to use the %s symbol. The %t is usefull for example for creating "Go to" button by setting the Search URL simply to "%t".

Also, you can use javascript-urls to perform more complex actions, like copying selected text. Here is an example how to do that:

  * Firstly you have to enable access to the clipboard in opera:config -> opera:config#UserPrefs|LetSiteAccessClipboard
  * Then create new item in the options page and set Search URL to -> javascript:void(document.execCommand("copy"))
  * As icon you can use e.g. http://www.patterson-consulting.net/public/onlinedocs/test_design_studio/icon_copy.gif
  * Done, you can now copy text by clicking on the icon :)