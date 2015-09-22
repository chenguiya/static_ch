define("mobile/mtouch/item/1.0.0/item",["zepto","swipejs/2.0.1/swipe_min"],function($){
 var d=$("zepto"),e=$("swipejs/2.0.1/swipe_min"),i=document.getElementById("slider-nav").getElementsByTagName("li");i[0].className="on";
 e.create(document.getElementById("slider"),{auto:3e3,speed:500,continuous:!0,callback:function(a){var b=i.length,c=a;for(2===b&&c>=2&&(c=a-2);b--;)i[b].className="";i[c].className="on"}});
 
 var j=d(window).width(),k=(d(window).height(),d(".panels-tab").height(),640),l=d(".i-panels").offset().top;
 !function(){var a=d(".panels-tab").offset().top;d(window).on("scroll",function(){d(".panels-tab").css(d("body").scrollTop()>=a?{position:"fixed",top:0}:{position:"static"})})}(),
 
});