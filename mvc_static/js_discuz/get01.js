$(function(){
   //starlist:search
   //http://group.5usport.com/forum.php?mod=ajaxstarlist&fid=55&t=1429082714  json格式
   $(".club").on("click",function(){
        $(".leagues .club").removeClass("active");
        $(this).addClass("active");
		var club_id=$(this).attr("id");
		var timestamp=Math.round(new Date().getTime()/1000);
		$.get("http://group.5usport.com/forum.php",{mod:"ajaxstarlist",fid:club_id,t:timestamp},function(data){
		   $("#starlist").empty();
		   $('.joinall').show();
		   clubs=[];
		   for(i=0;i<data.length;i++){
		      var star=data[i];
			  var act=star.follow ? 'cal' : 'con';
			  var className=act=='cal' ? 'joined' : '';
			  var langjoin=star.follow ? '已加入' : '加入';
			  clubs.push(star.fid);
			  $("#starlist").append('<li>\
			       <div class="star-icon"><a href="/' + star.url + '" target="_blank"><img src="data/attachment/common/' + star.icon + '"></a></div>\
				   <div class="star-info">\
				        <a herf="/' + star.icon + '" target="_blank">'+ star.name +'</a>\
						<div><span class="concerns">'+ star.fans_num +'</span><span class="threads">'+ star.threads +'</span></div>\
						<div><a class="join '+ className +'" href="javascript:void(0);" data-act="'+ act +'" data-fid="'+ star.fid +'" data-formhash="1">'+ langjoin +'</div>\
				   </div>\
			     </li>');
		   }
		},'json')
   });
   
   //http://group.5usport.com/plugin.php?id=forumconcern_pang%3Aforum_concern&fid=79&act=allc&formhashsend=1
   var clubs=[];
   $(".joinall").on('click',function(){
      if(clubs.length == 0){
	     return false;
	  }
	  var fid=clubs.join('|');
	  $.get("plugin.php?id=forumconcern_pang%3Aforum_concern&fid="+ fid +"&act=allc&formhashsend=1",function(data){
	       data=JSON.parse(data);
		   if(!data.isLogin){
		       showWindow('login','member.php?mod=logging&action=login');
		   }
		   else if(data.code==1){
		       $('#starlist .join').html("已加入").attr('data-act','cal').addClass("joined");
		   }
	  });
	  return false;
   });
   
   
});