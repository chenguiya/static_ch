define("base/pic/1.0.0/pic",["jquery"],function($){
	"use strict";
	var b=$("jquery"),e={};
	//图库首页轮播
	b(".showcase li img").on("mouseover",function(){
	    b(this).parents(".showcase").find(".shadow").fadeOut("fast");
		b(this).next(".shadow").stop().fadeIn();
		var caseurl=b(this).attr("data-casepic");
		var casetitle=b(this).attr("data-casetitle");
		b(".showcase .case img").attr("src",caseurl);
		b(".showcase .case .title").text(casetitle);
	});
	
	//性感体坛遮罩
	b("#xgttFram li").hover(function(){
	   b(this).find(".transLayer").show();
	},function(){
	   b(this).find(".transLayer").hide();
	});
	
	//图库图片格子遮罩
	b(".pictures .wall li").hover(function(){
	   b(this).find(".cover").show();
	},function(){
	   b(this).find(".cover").hide();
	})
	
	
	
});