define(function(require, exports, module) {
	var $ = require('$');
	$.fn.slideBox = function(options) {
		var defaults = {
			delay: 2,
			startIndex: 0
		};
		var settings = $.extend(defaults, options || {});
		var wrapper = $(this),
			ul = wrapper.find('ul:first'),
			lis = ul.find('li');
		var li_num = lis.length,
			li_height = 0,
			li_width = 0;
		var order_by = 'ASC';
		var slidebarul = wrapper.find('ul:last');

		var init = function() {
			if (!wrapper.length)
				return false;
			li_height = settings.height ? settings.height : lis.first().height();
			li_width = settings.width ? settings.width : lis.first().width();
			ul.find('li:eq(' + settings.startIndex + ')').addClass('active');
			slidebarul.find('li').each(function(i){
				if (i == settings.startIndex) {
					return false;
				}
				$(this).css('display','none');
			});
			slidebarul.find('li').hover(function(e) {
				$(this).addClass('active').siblings().removeClass('active');
				var active = $(this).index() ? $(this).index()-1 : li_num-1;
				ul.find('li:eq(' + active + ')').addClass('active').siblings().removeClass('active');
				start();
				stop();
				return false;
			}, function() {
				wrapper.data('timeid', window.setTimeout(start, settings.delay * 1000));
				return false;
			});
			
			if (wrapper.find('.slidepre').length) {
				wrapper.on('click','.slidepre',function(){
					var active = ul.find('li.active');
					if (active.prev().prev().length) {
						active.prev().prev().addClass('active');
					}else {
						active.siblings('li:last').prev().addClass('active');
					}
					active.removeClass('active');
					start('stopautoscroll');
				});
			}
			
			if (wrapper.find('.slidenext').length) {
				wrapper.on('click','.slidenext',function(){
					start('stopautoscroll');
				});
			}
			
			li_num > 1 && start('init');
		};

		var start = function(option) {
			var active = ul.find('li.active').next();
			if (!active.length || option == 'init') {
				active = ul.find('li:first');
			}
			var index = active.index();
			slidebarul.find('li:eq(' + index + ')').addClass('active').siblings().removeClass('active');
			if (index) {
				active.siblings('li:visible, li.active').css('display',function(){
					active.addClass('active').css('display','block');
					active.siblings('li:visible, li.active').removeClass('active');
					return 'none';
				});
			}
			else {
				active.addClass('active').css('display','block').siblings().css('display', 'none').removeClass('active');
			}
			stop();
			if (option != 'stopautoscroll') 
			wrapper.data('timeid', window.setTimeout(start, settings.delay * 1000));
		};
		var stop = function() {
			window.clearTimeout(wrapper.data('timeid'));
		};
		wrapper.hover(function() {
			stop();
		}, function() {
			wrapper.data('timeid', window.setTimeout(start, settings.delay * 1000));
		});

		init();
	};
});


