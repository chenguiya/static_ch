/* 
 * 赛事预告，滚动翻页
 */
define(function(requir,exports,module) {
	var $ = requir('$');
	$.fn.scrollpage = function(options) {
		var defaultoption = {
			'preClass':'pre',
			'nextClass':'next',
			'scrollClass':'widget-content',
			'scrollWidth':300,
			'totalWidth':1200,
			'autoScroll':false
		};
		options = $.extend(defaultoption, options || {});
		var $wrapper = $(this),
			$pre = $wrapper.find('.' + options.preClass),
			$next = $wrapper.find('.' + options.nextClass),
			$scrollblock = $wrapper.find('.' + options.scrollClass),
			$scrollleft = Math.abs($scrollblock.position().left) || 0,
			$left = 0,
			timeid = '';
		
		$scrollblock.width(options.totalWidth);
		
		$pre.on('click', function(){
			if (!$scrollleft) {
				return;
			}else if ($scrollleft <= options.scrollWidth) {
				$left = 0;
			}else {
					$left += options.scrollWidth;
			}
			$scrollblock.animate({'left': $left},'normal', function(){
					$scrollleft = Math.abs($left);
					if (options.autoScroll && timeid) {
						clearInterval(timeid);
						autoScroll();
					}
				});
				return false;
		});
		
		$next.on('click', function(){
			if ($scrollleft >= options.totalWidth - options.scrollWidth) {
				return;
			}else if (parseInt($scrollleft) + parseInt(options.scrollWidth)*2 > options.totalWidth) {
				$left = -options.totalWidth + options.scrollWidth;
			}else {
				$left -= options.scrollWidth;
			}
			$scrollblock.animate({'left': $left},'normal', function(){
				$scrollleft = Math.abs($left);
				if (options.autoScroll && timeid) {
					clearInterval(timeid);
					autoScroll();
				}
			});
			return false;
		});
		
		var autoScroll = function() {
			timeid = setInterval(function(){
				if ($scrollleft >= options.totalWidth - options.scrollWidth) {
					$left = 0;
				}else if (parseInt($scrollleft) + parseInt(options.scrollWidth)*2 > options.totalWidth) {
					$left = -options.totalWidth + options.scrollWidth;
				}else {
					$left -= options.scrollWidth;
				}
				$scrollblock.animate({'left': $left},1000, function(){
					$scrollleft = Math.abs($left);
				});
			}, 4000);
		};
		
		if (options.autoScroll) {
			autoScroll();
		}
		
	};
});

