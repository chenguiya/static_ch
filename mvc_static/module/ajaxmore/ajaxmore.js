/* 
 *赛事中心ajax加载更多
 */
define(function(require, exports, module) {
	var $ = require('$');
	$.fn.ajaxmore = function() {
		var body=$('#loadmore_scorecenter');
		var activebody='';
		var matchid=0,dateid=0,page=1;
		var $self=$(this);
		
		$self.on('click',function(){
		   activebody=body.children('ul.active');
		});
		
	
	};
});

