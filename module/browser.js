define(function(require, exports, module) {
	var BROWSER = {};
	var USERAGENT = navigator.userAgent.toLowerCase();
	browserVersion({'ie':'msie','firefox':'','chrome':'','opera':'','safari':'','mozilla':'','webkit':'','maxthon':'','qq':'qqbrowser','rv':'rv'});
	if(BROWSER.safari || BROWSER.rv) {
		BROWSER.firefox = true;
	}
	BROWSER.opera = BROWSER.opera ? opera.version() : 0;

	var HTMLNODE = document.getElementsByTagName('head')[0].parentNode;
	if(BROWSER.ie) {
		BROWSER.iemode = parseInt(typeof document.documentMode != 'undefined' ? document.documentMode : BROWSER.ie);
		HTMLNODE.className = 'ie_all ie' + BROWSER.iemode;
	}

	function browserVersion(types) {
		var other = 1;
		for(i in types) {
			var v = types[i] ? types[i] : i;
			if(USERAGENT.indexOf(v) != -1) {
				var re = new RegExp(v + '(\\/|\\s|:)([\\d\\.]+)', 'ig');
				var matches = re.exec(USERAGENT);
				var ver = matches != null ? matches[2] : 0;
				other = ver !== 0 && v != 'mozilla' ? 0 : other;
			}else {
				var ver = 0;
			}
			eval('BROWSER.' + i + '= ver');
		}
		BROWSER.other = other;
	}
	
	exports.browser = BROWSER;
});


