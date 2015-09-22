define("base/article/1.0.0/article",["jquery","module/slidebox/slidebox","module/scrollpage/scrollpage"],function($){
	"use strict";
	var b=$("jquery"),c=$("module/slidebox/slidebox"),d=$("module/scrollpage/scrollpage"),e={};
	
	
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
	
	//相关图集JS
	e.scrolltuji=function(){
	   if(b('#dets_xgtj').length){
	    b('#dets_xgtj').scrollpage({
		   'preClass': 'det_m_pre',
		   'nextClass': 'det_m_nxt',
		   'scrollClass': 'det_xgtj_ul',
		   'scrollWidth': 4 * 173,
		   'totalWidth': b('#dets_xgtj .det_xgtj_ul li').length * 173,
		   'autoScroll': true
		});
	   }
	},e.scrolltuji();
	
	//梅西粉丝秀JS
	if(b('#singcere').length){
	   b('#singcere').scrollpage({
	   'scrollClass':'sign_ul',
	   'scrollWidth':1 * 675,
	   'totalWidth':b('#singcere .sign_ul li').length * 675,
	   'autoScroll':true
	   });
	}
	
	//赛事预告JS
	e.scrollpages=function(){
	   if(b('.eventsBox').length){
	      b('.eventsBox').scrollpage({
		    'totalWidth':b('.eventsBox .widget-content .eventCon').length*300
		  });
	   }
	},e.scrollpages();
	
	//点赞与踩与收藏
	if(b('a.ajaxlike').length){
	  b('body').on('click','a.ajaxlike',function(){
	     var $self=b(this);
		 var url=$self.attr('data-ajaxurl');
		 var sharebtn=$self.siblings('a.sharebtn');
		 var statusChange=function(){
		    showmsg('出错了，请稍后重试');
		 };
		 var offsetObj={'top':$self.offset().top-45,'left':sharebtn.offset().left};
		 if($self.hasClass('d_m_zan')){//踩和赞
		    if($self.siblings('a.d_m_cha').hasClass('oped')){
			   showmsg('您已经发表过看法，感谢参与！',offsetObj);
			   return false;
			}
			statusChange=function(){
			   $self.addClass('oped d_m_zaned');
			}
		 }else if($self.hasClass('d_m_cha')){
		    if($self.siblings('a.d_m_zan').hasClass('oped')){
			    showmsg('您已经发表过看法，感谢参与！',offsetObj);
				return false;
			}
			statusChange=function(){
			   $self.addClass('oped d_m_chaed');
			}
		 }
		 b.ajax({
		    type: 'GET',
			url: url,
			dataType: 'jsonp',
			success:function(data){
			   if($self.hasClass('d_m_cha') || $self.hasClass('d_m_zan')){//踩、赞
			      if(data.status===1)
				  { 
				    $self.find('.votenum').text(parseInt($self.find('.votenum').text() || 0)+1);
					statusChange();
				  }else if(data.status===2)
				  {
				    showmsg('您已经发表过看法de，感谢参与',offsetObj);
					return false;
				  }else{
				     showmsg('出错了，请稍后再试！',offsetObj);
				  }
			   }
			},
			error:function(){
			   showmsg('出错了，请稍后再试，',offsetObj);
			}
		 });
		 return false;
	  });
	}
	
});

//加入收藏
function AddFavorite(sURL,sTitle)
{
	try{
	  window.external.addFavorite(sURL,sTitle);
	}
	catch(e)
	{
		try
		{
		window.sildebar.addPanel(sTitle,sURL,"");
		}
		catch(e)
		{
			alert("加入收藏失败，请使用Ctrl+D进行添加");
		}
	}
}
