var starInfo={
    //原文
	'origTxt':function(btn,orig){
	  if(orig.is(':hidden')){
	     orig.slideDown();
	  }else{
	     orig.slideUp();
	  }
	  btn.toggleClass('textbg_ed');
	},
	//评论显示
	'comment':function(triggerEl,commentBox,relativeClass){
	  if(triggerEl.hasClass(relativeClass)){
	     if(commentBox.length>0 && triggerEl.is(':visible')){
		    commentBox.hide();
			triggerEl.removeClass('pl_ed');
		 }
	  }else{
	     if(commentBox.length && commentBox.is(':hidden')){
		   commentBox.show().find('textarea:first').focus();
		   triggerEl.addClass(relativeClass);
		 }
	  }
	},
	//分享
	'share':function(triggerEl,relativeEl,args){
	   relativeEl.toggle();
	   triggerEl.toggleClass('zf_ed');
	
	}
	
};

$(function() {
       //头部搜索
	   $(":root").on('focus',':input',function(){
	      $(this).attr('oholder',$(this).attr('placeholder'));
		  $(this).attr('placeholder','');
	   }).on('blur',':input',function(){
	      $(this).attr('placeholder',$(this).attr('oholder'));
	   });
	   $("#search_form").submit(function(e){
	      if(!$(this).find('input[name="q"]').val()){
		     $(this).find('input[name="q"]').focus();
			 return false;
		  }
	   });
	   //登录弹窗
	   $(".loginBox .login").click(function(){
	      $('.mm_openBox').css('display','block');
		  $('.logoBox').css('display','block');
		  var st=Math.max(document.body.scrollTop || document.documentElement.scrollTop);
		  $('.logoBox').css({'left':($(window).width() - $('.logoBox').width()) / 2}).animate({'opacity':1,'top':($(window).height()-$('.logoBox').height()) / 2 +st+'px'},1500);
	   });
	   $('.closed').click(function(){
	      $('.logoBox').animate({'opacity':0,'top':-$('.logoBox').height()+'px'},1500,function(){
		     $('.mm_openBox').css('display','none');
			 $('.logoBox').css('display','none');
		  });
	   });
	   //登录注册界面验证
	   $('#myform').submit(function(e){
	      var username =$('#username').val();
		  var password =$('#password').val();
		  var cookietime='';
		  if($('#cookietime').is(':checked')){
		    cookietime=$('#cookietime').val();
		  }
		  var formTip=false;
		  if(!(username && password)){
		      formTip='用户名或密码不为空！';
		  }else{
		    $.ajax({
			  url:'member/ajaxlogin',
			  type:'post',
			  data:{username:username,password:password,cookietime:cookietime,dosubmit:1},
			  async:false,
			  success:function(data){
			     if(data <1){
				    formTip='用户名或密码不正确';
					$('#password').val('');
				 }else{
				    window.location.href=window.location.href;
					$('.closed').click();
				 }
			  }
			});
		  }
		  if(formTip){
		     $('.myformTip').text(formTip);
		  }
		  return false;
	   });
	   //文章
	   $('.infoBox').on('click','.textbg',function(){//原文
	     starInfo.origTxt($(this),$(this).parents('.infoBox').find('.infoCon_all'));
	   }).on('click','.listSetBox .funBox .pl',function(){//原文发表显示
	       var commentBox=$(this).parents('.infoBg').find('.commentBox');
		   starInfo.comment($(this),commentBox,'pl_ed');
	   }).on('click','.commentBox .pl',function(){//评论后点击回复发送
	       var replyBox=$(this).parents('.funMain').siblings('.replyBox');
		   starInfo.comment($(this),replyBox,'pl_ed');
	   }).on('mouseenter','.listSetBox .funBox .zf',function(){//博文分享按钮
	       $(this).addClass('zf_ed');
		   var shareContent=$('.shareContent');
		   var infoBg=$(this).parents('.infoBg');
		   var starname=infoBg.find('.listTitle a:first').text();
		   var starid=infoBg.attr('data-starid');
		   var tweetid=infoBg.attr('data-contentid');
		   var issueTime=infoBg.find('.wbFrom .star_info_time').text();
		   var source=infoBg.find('.wbFrom .source_addr').text();
		   var shareText=infoBg.find('.infoCon').text();
		   var shareUrl=location.protocol + '//' + $.trim(location.host) + '/detail/' + tweetid + '/new';
		   bdshare_url=shareUrl;
		   bdshare_content=starname + issueTime + '在' + source + '上发表博文："' + shareText +'" ' + '（上U体育，无需翻墙第一时间查看球星twitter和facebook动态）';
		   if($(this).parents('.infoList').find('.list_pic').length){
		       bdshare_pic=$(this).parents('.infoList').find('.list_pic img').attr('src');
		   }
		   shareContent.css({'top':$(this).offset().top-30,'left':$(this).offset().left-55}).fadeIn();
	   }).on('mouseleave','.shareContent',function(){
	      if($(this).is(':hidden')){
		    return;
		  }
		  $(this).fadeOut('normal',function(){
		     $('.zf_ed').removeClass("zf_ed");
		  });
	   });
	   
});