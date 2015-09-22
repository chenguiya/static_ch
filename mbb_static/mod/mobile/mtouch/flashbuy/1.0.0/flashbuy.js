define("mobile/mtouch/flashbuy/1.0.0/flashbuy",["zepto"],function($){
 "use strict";{var b=$("zepto"),c=function(a,b,c,d,e){var f=a;if(!b||""===b||!c||""===c)return!1;b=new Date(b.replace(/-/g,"/")),c="string"==typeof c?new Date(c.replace(/-/g,"/")):c;var g=c.getTime(),h=b.getTime(),i=setInterval(function(){g+=1e3;var a,b,c,j,k="",l=parseInt((h-g)/1e3,10);a=parseInt(l/3600/24,10),b=parseInt(l/3600%24,10),c=parseInt(l/60%60,10),j=parseInt(l%60,10),0>j&&(clearInterval(i),a=b=c=j=0,"function"==typeof e&&e(f)),k=d.replace("{d}",10>a?"0"+a:a).replace("{h}",10>b?"0"+b:b).replace("{m}",10>c?"0"+c:c).replace("{s}",10>j?"0"+j:j),f.html(k)},1e3)},d=b(".J-flashbuy-countdown");d.data("now-time"),d.data("end-time")}
 b(".J-now-flashbuy .item").each(function(){
	var a=b(this),d=a.find(".J-flashbuy-countdown"),e=d.data("now-time"),f=d.data("end-time");
	c(d.find(".cd-con"),f,e,'<span class="t">{d}</span>\u5929<span class="t">{h}</span>\u5c0f\u65f6<span class="t">{m}</span>\u5206<span class="t">{s}</span>\u79d2',function(){})
   });
  var e=b(".fb-tabs").offset().top;
  b(window).on("scroll",function(){b(".tab-float").css(b("body").scrollTop()>=e?{position:"fixed",top:0}:{position:"static"})}),b(".fb-tabs a").click(function(){b(".fb-tabs a").removeClass("on"),b(this).addClass("on")});
b("body").on("click",".btn-click",function(){
var a=b(this).find("a").data("id"),c=window.prompt("\u8bf7\u8f93\u5165\u60a8\u7684\u624b\u673a\u53f7\u7801","");
if(!c)return!1;
var d=b.trim(c);
return isNaN(d)||11!=d.length?(window.alert("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u7535\u8bdd\u53f7\u7801"),!1):void b.ajax({type:"get",url:"http://www.mbaobao.com/ajax/SendSmsSubscribe",data:{id:a,mobile:parseInt(b.trim(c),10),tag:"",d:Math.round((new Date).getTime()/1e3)},dataType:"jsonp",jsonp:"jsoncallback",success:function(a){window.alert("1"==a.success?"\u606d\u559c\u60a8\uff01\u8ba2\u9605\u6210\u529f!":a.msg)}})});
});