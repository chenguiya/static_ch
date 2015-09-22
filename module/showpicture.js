/*
 * 图库详情，图片展示插件
 * author:zjh
 * 2014-11-12
 */
define(function(require, exports, module) {
	var $ = require('$');
	$.fn.showpicture = function(options) {
		var defaultoption = {
			delay:2,
			starIndex:0,
			playCtrl:'playCtrl',
			playtoggleClass:'d_stop',
			lightCtrl:'lightCtrl',
			lighttoggleClass:'ptch_onhover',
			nextClass: 'mouseright',
			preClass: 'mouseleft',
			bigpicClass:'bd_boxply',
			pictitleClass:'pictitle',
			smallpicClass:'smallpicarea',
			nextgroupClass:'nextgroup',
			pregroupClass:'pregroup',
			currentpicNumClass:'currentNum',
			totalpicClass:'totalpicNum',
			end_over: 'end_over'
		};
		options = $.extend(defaultoption, options || {});
		var wrapper = $(this);
		var pic_num = $('.' + options.smallpicClass + ' img').length;
		if (!pic_num) return;
		var smallpic = wrapper.find('.' + options.smallpicClass),
			bigpicarea = wrapper.find('.' + options.bigpicClass),
			pictitle = wrapper.find('.' + options.pictitleClass),
			nextitem = wrapper.find('.' + options.nextClass),
			preitem = wrapper.find('.' + options.preClass),
			nextgroup = wrapper.find('.' + options.nextgroupClass),
			pregroup = wrapper.find('.' + options.pregroupClass),
			lightCtrl = wrapper.find('.' + options.lightCtrl),
			playCtrl = wrapper.find('.' + options.playCtrl),
			currentNum = wrapper.find('.' + options.currentpicNumClass),
			end_over = wrapper.find('.' + options.end_over),
			totalpicNum = wrapper.find('.' + options.totalpicClass);
		
		var smallcotainWidth = $(smallpic.get(0).offsetParent).width(),
			smallItemWidth = smallpic.children().eq(options.starIndex).outerWidth(true),
			smalldisplaynum = Math.round(smallcotainWidth/smallItemWidth);
			smallcotainWidth = smallItemWidth * smalldisplaynum;
		
		var smallWidth = smallItemWidth * pic_num,
			smallIndex = 0;
			smallpic.width(smallWidth);
		
		
		var bigpicArr = [],
			picTitleArr = [];
		
		var currentIndex = (smallpic.find('.active').index() || smallpic.find('.active').index() === 0) ? smallpic.find('.active').index() : options.starIndex;
		
		var pageTitle = document.title;
		
		for(var i = 0; i < pic_num; i++) {
			bigpicArr[i] = (new Image()).src = smallpic.find('img').eq(i).attr('data-bigpic');
			picTitleArr[i] = smallpic.find('img').eq(i).attr('data-pictitle');
		}
		
		var disableEndOver = function() {
			if (end_over.is(':visible')) {
				if (playCtrl.hasClass(options.playtoggleClass)) {
					playCtrl.click();
				}
				end_over.css('display', 'none');
				bigpicarea.css('display', 'block');
			}
		};
		
		
		var init = function() {
			
			if (totalpicNum.length) {
				totalpicNum.text(pic_num);
			}
			
			if (currentNum.length) {
				currentNum.text(parseInt(currentIndex) + 1);
			}
			
			if (playCtrl.length) {
				var playTimeid = '';
				playCtrl.on('click',function(){
					if ($(this).hasClass(options.playtoggleClass)) {
						$(this).text('幻灯播放');
						if (playTimeid)
							clearInterval(playTimeid);
					}else {
						$(this).text('幻灯暂停');
						playTimeid = setInterval(nextpic, options.delay * 1000);
					}
					$(this).toggleClass(options.playtoggleClass);
					return false;
				});
			}
			
			if (lightCtrl.length) {
				lightCtrl.on('click', function() {
					if (wrapper.hasClass(options.lighttoggleClass)) {
						$(this).text('关灯浏览');
					}else {
						$(this).text('开灯浏览');
					}
					wrapper.toggleClass(options.lighttoggleClass);
					return false;
				});
			}
			
			if (nextitem.length) {
				nextitem.on('click', function() {
					nextpic();
					return false;
				});
			}
			
			if (preitem.length) {
				preitem.on('click', function() {
					prepic();
					return false;
				});
			}
			
			if (pregroup.length) {
				pregroup.on('click', function() {
					smallpicScroll('pre');
					return false;
				});
			}
			
			if (nextgroup.length) {
				nextgroup.on('click', function() {
					smallpicScroll('next');
					return false;
				});
			}
			
			
			if (!bigpicarea.find('img').length) {
				renderpic();
			}
			
			smallpic.children().on('click', function(){
				disableEndOver();
				currentIndex = $(this).index();
				renderpic();
				return false;
			});
			
			end_over.on('click', 'a.end_colose', function() {
				disableEndOver();
				return false;
			});
//			bigpicarea.height(bigpicarea.find('img').height());
		};
		
		var smallpicScroll = function(op){
			smallcotainWidth;
			smallWidth;
			var smallpicLeft = Math.abs(smallpic.position().left);
			switch (op) {
				case 'pre':
					if (smallpicLeft) {
						if (smallpicLeft <= smallcotainWidth ) {
							smallIndex = 0;
						}else {
							 smallIndex -= smalldisplaynum;
						}
					}
					break;
				case 'next':
					if (smallpicLeft <= (smallWidth-smallcotainWidth)) {
						if ((smallpicLeft+smallcotainWidth*2) >= smallWidth) {
							smallIndex = pic_num-smalldisplaynum;
						}else {
							smallIndex += smalldisplaynum;
						}
					}
					break;
				default :
				        if(pic_num > smalldisplaynum){
						  if(currentIndex < pic_num-3){
						     smallIndex = 1*(currentIndex-3<0?0:(currentIndex-3));
						  }else if(currentIndex >= pic_num-3){
						     smallIndex = 1*(pic_num-smalldisplaynum);
						  }
						}
					break;
			}
			if (smallpicLeft != Math.abs(smallIndex * smallItemWidth))
			smallpic.animate({'left':-Math.abs(smallIndex * smallItemWidth)});
		};
		
		var prepic = function() {
			if (currentIndex > 0) {
				currentIndex -= 1;
				renderpic();
			}
		};
		
		var nextpic  = function() {
			if (currentIndex == (pic_num-1)) {
				if (end_over.is(':hidden')) {
					bigpicarea.stop().fadeOut('fast', function(){
						end_over.stop().fadeIn('fast');
					});
				}
				if (playCtrl.hasClass(options.playtoggleClass)) {
					playCtrl.click();
				}
				return false;
			}else {
				currentIndex += 1;
			}
			renderpic();
		};
		
		var renderpic = function() {
			if (!bigpicarea.find('img').length) {
				bigpicarea.append('<img src="' + bigpicArr[currentIndex] + '" style=" opacity:1; max-width:960px; max-height:625px;"/>');
			}else {
				bigpicarea.find('img').attr('src', bigpicArr[currentIndex]);
				wrapper.find('.d_orgpic').attr('href',bigpicArr[currentIndex]);
				//iframe重载图片
				if ($('#picture_load').length) {
					var picwhich = parseInt(currentIndex) + 1;
					$('#picture_load').attr('data-pic', picwhich);
					$('#picture_load').attr('src', document.location.href.replace(/(\w[^_]*)\w*(\.html)/i, "$1_" + picwhich + "$2"));
					document.title =pageTitle+ '(第【'+picwhich+'】页)';
				}
			}
			
			pictitle.text(picTitleArr[currentIndex]);
			smallpic.children().eq(currentIndex).addClass('active').siblings().removeClass('active');
//			bigpicarea.height(bigpicarea.find('img').height());
			
			if (currentNum.length) {
				currentNum.text(parseInt(currentIndex) + 1);
			}
			
			smallpicScroll();
		};
		
		init();
	};
});

