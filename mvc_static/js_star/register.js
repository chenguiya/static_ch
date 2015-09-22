$(function(){
  var siteurl="http://star.5usport.com";
  //var siteurl="http://localhost/mvc/index.php";
  $.formValidator.initConfig({autotip:true,submitonce:true,formID:"myform",onerror:function(msg){return false},onsuccess:function(){}});
  $("#username").formValidator({onShow:"用户名2-20位之间(不能用中文)",onFocus:"用户名2-20位之间(不能用中文)",onCorrect:"该用户可以注册"}).inputValidator({min:2,max:20,onError:"用户名2-20位之间"}).regexValidator({regExp:"username",dataType:"enum",onError:"用户名格式不正确(不能用中文)"}).ajaxValidator({
    async:true,
	url:siteurl+"/member/checkUsername",
	success:function(data){
	   if(data=1) return "该用户名不可用，请更换用户名";
	   return true;
	},
	buttons:$("#dosubmit"),
	error:function(jqXHR,textStatus,errorThrown){},
	onError:"该用户名不可用，请更换用户名",
	onWait:"正在对用户名进行合法性校验，请稍后..."
  });
  $("#password").formValidator({onShow:"密码6-20位之间",onFocus:"密码为6-20位之间",onCorrect:"密码合法"}).inputValidator({min:2,max:20,onError:"密码6-20位之间",empty:{leftEmpty:false,rightEmpty:false,emptyError:"密码两边不能有空符号"}});
  $("#email").formValidator({onShow:"邮箱6-100个字符",onFocus:"邮箱6-100个字符",onCorrect:"邮箱设置成功"}).inputValidator({min:6,max:100,onError:"邮箱格式错误，请确认"}).regexValidator({regExp:"^([\\w-.]+)@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([\\w-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)$",onError:"邮箱格式不正确"}).ajaxValidator({
      async:true,
	  url:siteurl+"/member/checkEmail",    //异步检查重要性
	  success:function(data){
	     if(data=1) return "该邮箱不可用，请更换用户名";
		 return true;
	  },
	  buttons:$("#dosubmit"),
	  error:function(jqXHR,textStatus,errorThrown){},
	  onError:"该邮箱不可用，请更换用户",
	  onWait:"正在对邮箱进行合法性校验，清稍等..."
  });
  $("#code").formValidator({onShow:"",onFocus:"请输入验证码",onCorrect:"验证成功"}).ajaxValidator({
     async:true,
	 url:siteurl+"/member/checkVerifycode",
	 success:function(data){
	    if(data=1) return true;
		return "验证码错误";
	 },
	 buttons:$("#dosubmit"),
	 error:function(jqXHR,textStatus,errorThrown){},
	 onError:"验证码错误",
	 onWait:"正在对验证码进行校验，请稍等..."
  });
  $("#protocol").formValidator({onShow:"请详细阅读协议",onFocus:"",onCorrect:""}).inputValidator({min:1,onError:"请阅读注册协议"});
  //协议弹窗
  $(".protocol").click(function(){
      art.dialog({lock:true,title:"会员注册协议",id:"protocoliframe",iframe:'http://star.5usport.com/member/reg_protocol',width:"500",height:"300",yesText:"确认"},function(){
	      $("#protocol").attr("checked",true);
	  });
  });
  
  
});