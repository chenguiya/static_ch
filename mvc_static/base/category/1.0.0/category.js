define("base/category/1.0.0/category",["jquery"],function($){
	"use strict";
	var b=$("jquery"),e={};
	
	//列表阴影效果出现
	b(".listUL li").hover(function(){
	   b(this).addClass("list_hover");
	},function(){
	   b(this).removeClass("list_hover");
	});
	
	
});