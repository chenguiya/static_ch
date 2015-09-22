define("base/home/1.0.0/home",["jquery"],function($){
	"use strict";
	var b=$("jquery"),e={};
	
	b(".com_Ltable li:odd").addClass("even");
	//体坛花边轮播
	b("#tthb_bd_id .in_dets .slidepre").hover(function() {
			b(this).addClass("pre_s");
		}, function() {
			b(this).removeClass("pre_s");
	});
	b("#tthb_bd_id .in_dets .slidenext").hover(function() {
			b(this).addClass("next_s")
		}, function() {
			b(this).removeClass("next_s");
	});
	//体坛热度
	b(".ttrd_Tab li").on("mouseover", function() {
			b(".ttrd_Tab li").removeClass("active");
			b(this).addClass("active");
			b(".ttrd_center").css("display", "none");
			var ttrdTabID = b(this).attr("id");
			b("#" + ttrdTabID + "center").show();
			return false;
	});
	//今日之星遮罩层
	b(".in_bnaList li").hover(function(){
	     b(this).find(".tagTxt_s").show();
	},function(){
	     b(this).find(".tagTxt_s").hide();
	});
	
	//合作伙伴切换
	b(".parter_Tag span").each(function(index,elen){
	      var chilidList=b(".parter_link").children();
	      b(elen).mouseover(function(){
		      chilidList.hide();
			  b(chilidList[index]).show();
		      b(".parter_Tag span").removeClass("active");
			  b(this).addClass("active"); 
		  });
	});
	
	//体育视觉遮罩
	b("#homeFram li").hover(function(){
		b(this).find(".transLayer").show();
	},function(){
		b(this).find(".transLayer").hide();
	});
	
	
});