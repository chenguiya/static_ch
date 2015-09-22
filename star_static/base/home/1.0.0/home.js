define("base/home/1.0.0/home",["jquery","module/slidebox/slidebox"],function($){
	"use strict";
	var b=$("jquery"),c=$("module/slidebox/slidebox"),e={};
	//滑动图片js
	e.slidebox=function(){
		if (b('.slidebox').length) {
			b('.slidebox').each(function() {
				b(this).slideBox();
			});
		}
	},e.slidebox();
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
	//体坛花边遮罩层
	b(".laceSide li").hover(function(){
		b(this).find(".transLayer").show();
	},function(){
		b(this).find(".transLayer").hide();
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
});