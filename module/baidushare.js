define(function(require,exports,module){

	var $ = require('$');
	var custom_config = {};
	
	window._bd_share_config = {
		common : {		
			bdText : '',
			bdDesc : '',
			bdUrl : '',
			bdPic : '',
			bdSign : 'on',
			onBeforeClick : function(cmd, config) {
				return $.extend(config, custom_config);
			}
		},
		share: [
			{ 'tag': 'articleShare', 'bdSize':24 },{tag:'videoShare', bdSize:16,"bdStyle":"1"},{ 'tag': 'pictureShare', 'bdSize':24 },{tag:'viewintroduceShare', bdSize:16}
		]
	};

	seajs.use('http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5));

	$.fn.shareconfig = function(config) {
		var _self = $(this);
		_self._shareconfig = {
			bdText : config.subject,
			bdDesc : config.content||'',
			bdUrl : config.url||location.href,
			bdPic : config.pic||''
		};

		_self.on('mousedown', function(){
			custom_config = _self._shareconfig;
		});

	};

})