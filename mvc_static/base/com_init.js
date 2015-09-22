define("base/com_init",["jquery","module/slidebox/slidebox","module/scrollpage/scrollpage"],function($){
	"use strict";
	var b=$("jquery"),c=$("module/slidebox/slidebox"),d=$("module/scrollpage/scrollpage"),e={};
	//全局弹层函数
		var showmsg = function(msg, offsetObj, delay) {
			delay = delay || 3000;
			msg = msg || '操作成功';
			var timeid = '';
			if (!offsetObj) {
				var winHeight = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
			}
			var winWidth = document.body.clientWidth || window.innerWidth;

			if (!b('#toptip').length) {
				b(document.body).prepend('<div id="jsapend" style="position:relative;"><div id="toptip" style="position: absolute; font-size: 20px; color: #fff;  font-family: Microsoft YaHei;  text-align: center; border-radius: 5px; line-height: 50px; padding: 0 35px 0 35px; min-height: 50px;background: rgba(0,0,0,0.5);z-index: 300;">' + msg + '</div></div>');
			} else {
				b('#toptip').fadeOut('fast').text(msg);
			}

			if (!offsetObj) {
				offsetObj = {'top': document.body.scrollTop + winHeight / 2, 'left': winWidth / 2 - b('#toptip').outerWidth(true) / 2};
			} else if (!offsetObj.left) {
				offsetObj.left = winWidth / 2 - b('#toptip').outerWidth(true) / 2;
			} else {
				offsetObj.left = offsetObj.left - b('#toptip').outerWidth(true) / 2;
			}

			b('#toptip').css(offsetObj).stop().fadeIn('normal', function() {
				if (timeid)
					clearTimeout(timeid);
				timeid = setTimeout(function() {
					b('#toptip').fadeOut();
				}, delay);
			});
		};
		
	//搜索按钮事件
	if(b('.searchBox .searchIn').length && b('.searchBox .searchBnt').length){
	   b('.searchBox .searchBnt').on('click',function(){
	      if(!b(this).hasClass('searchBntY')){
		     b(this).parent().css('background','#fff');
			 b(this).addClass('searchBntY');
			 b('.searchBox .searchIn').show().stop().animate({'width':'180px'},'slow',function(){
			    b(this).focus();
			 });
			 return false;
		  }else{
		     window.open('http://zhannei.baidu.com/cse/search?s=12283768759426572611&entry=1&q='+encodeURIComponent(document.getElementsByClassName('searchIn')[0].value));
			 
		  }
	   });
	   
	   //搜索框失去焦点后隐藏
	   b('.searchBox .searchIn').on('blur',function(){
	      if(b('.searchBox .searchBnt').hasClass('searchBntY')){
		      b(this).stop().animate({'width':'0px'},'slow',function(){
			     document.getElementsByClassName('searchIn')[0].value='';
				 b(this).hide().parent().css('background','#595656'); 	
				 b('.searchBox .searchBnt').removeClass('searchBntY');
			  });
		   }
	   });
	}
	
	//二级导航切换
	if(b('.menu_bd ul').length && b('.menu_bd .menuB ul').length){
	   var menuA=b('.menu_bd .menuA');
	   var menuB=b('.menu_bd .menuB');
	   var menuTimeid='';
	   menuA.on('mouseover','li',function(){
	       if(menuTimeid){
		      clearTimeout(menuTimeid);
		   }
		   if(!b(this).hasClass('active')){
		      b(this).addClass('active').siblings().removeClass('active');
			  menuB.find('ul[data-id="'+b(this).children('a').attr('data-menuid')+'"]').addClass('active').siblings().removeClass('active');
		   }
	   });
	}
	
	//共用滑动JS
	e.slidebox=function(){
		if (b('.slidebox').length) {
			b('.slidebox').each(function() {
				b(this).slideBox();
			});
		}
	},e.slidebox();
	
	//体坛花边遮罩层（列表页）
	b("#homeSides li,.hdjxs_bd li").hover(function(){
		b(this).find(".homelayer").show();
	},function(){
		b(this).find(".homelayer").hide();
	});
	
	//共用花边排行（视频、花边）
	if(b('[data-mouseevent]').length && b('[data-mousehide]').length && b('[data-mouseshow]').length){
	    var dataMouseTimeid='';
		b('[data-mousehide]').on('mouseover',function(e){
		   if(b(this).siblings('[data-mouseshow]').length){
		      var $selft=b(this);
			  dataMouseTimeid=window.setTimeout(function(){
			     $selft.parents('[data-mouseevent]').find('[data-mouseshow]').slideUp().siblings('[data-mousehide]').show('fast',function(){
				    $selft.hide().siblings('[data-mouseshow]').fadeIn();
				 });
			  },500);
		   }
		}).on('mouseout',function(){
		   if(dataMouseTimeid)
		   clearTimeout(dataMouseTimeid);
		});
	}
	
	//赛事预告JS(首页、视频页)
	if(b('.videoEvent').length){
	    var sliderEvent=b('.videoEvent .sliderEvent');
		var totalWidth=sliderEvent.find('.evnetBlock .eventList').length * sliderEvent.find('.evnetBlock .eventList').outerWidth(true);
		sliderEvent.scrollpage({
		   'preClass':'pre',
		   'nextClass':'next',
		   'scrollClass':'evnetBlock',
		   'scrollWidth':sliderEvent.find('.evnetBlock .eventList').outerWidth(true) * 4,
		   'totalWidth':totalWidth,
		   'autoScroll':false
		});
	}
	
	
});