define("base/gallerydetail/1.0.0/gallerydetail",["jquery","module/showpicture/showpicture","module/baidushare/baidushare"],function($){
	"use strict";
	var b=$("jquery"),c=$("module/showpicture/showpicture"),d=$("module/baidushare/baidushare"),e={};
	
	//全局弹窗函数
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
	
	
	
	//图库详情展示
	e.showpic=function(){
		   b('#Smailllist').parents('.ptch_infor').showpicture();
	},e.showpic();
	
	//图库详情点赞
	if(b('p.ptch_mood a').length){
	   b('p.ptch_mood').on('click','a',function(){
	      var $self=b(this);
		  var offsetObj={'top':$self.offset().top,'left':parseInt($self.parents('div.bd_boxB').offset().left)+parseInt($self.parents('div.bd_boxB').outerWidth(true)/2)};
		  b.ajax({
		     type: 'GET',
			 url: $self.attr('data-ajaxurl'),
			 dataType: 'jsonp',
			 success:function(data){
			    if(data){
				   if(data.status === 1){
				      $self.find('span.collet_num').text(parseInt($self.find('span.collet_num').text()) + 1);
				   }else if(data.status == 2){
				      showmsg('已经赞过了，感谢参与',offsetObj);
				   }else{
				     showmsg('出错加沃尔了，请稍后再试',offsetObj);
				   }
				   
				}else{
				  showmsg('出似懂非懂错了，请稍后再试',offsetObj);
				}
			 },
			 error:function(){
			    showmsg('出错问问了，请稍后再试',offsetObj);
			 }
		  });
		  return false;
	   });
	}
	
	
	
	//图库分享按钮
	if(b('.d_share').length){
	   b('.pictureShare').shareconfig({
	      subject: '[5U体育sfds]'+b('.pt_bdarea h1:first').text(),
		  content: "[5U体育]",
		  url: 'http://www.chenhua.com',  //倘若运用document.location.href，要域名是www.xxx.com才能生效，若是在本地的location的话可能空间查看不了
		  pic: b('.bd_boxply').find('img').attr('src')
	   });
	   var shareTimeid='';
	   b('.d_share').on('click',function(){
	      b('.pictureShare').css({'left':parseFloat(b(this).offset().left)-100,'top':parseFloat(b(this).offset().top)+30}).slideDown();
		  shareTimeid=setTimeout(function(){
		      b('.pictureShare').slideUp();
		  },2000);
		  return false;
	   });
	   b('.pictureShare').on('mouseover',function(){
	       if(shareTimeid)
		   clearTimeout(shareTimeid);
	   }).on('mouseleave',function(){
	       shareTimeid=setTimeout(function(){
		      b('.pictureShare').slideUp();
		   },2000);
	   }); 
	}
	
	
	
});
