/* 
 *赛事中心ajax加载更多
 */
define(function(require, exports, module) {
	var $ = require('$');
	$.fn.ajaxmore = function() {
		var body = $('#body_scorecenter');
		var activebody = '';
		var matchid = 0, dateid = 0, page = 1;
		var $self = $(this);
		
		$self.on('click', function() {
			activebody = body.children('ul.active');
			
			matchid =  $('.matchtypes li.active').attr('data-matchid') || '0';
			dateid = $('.datepicker li.active').attr('data-dateid') || 'undefine';
			if (!activebody || activebody.attr('data-matchid') !== matchid || activebody.attr('data-dateid') !== dateid) {
				body.children('ul.active').removeClass('active');
				if (body.children('ul[data-matchid="'+matchid+'"]').filter('[data-dateid="'+dateid+'"]').length) {
					body.children('ul[data-matchid="'+matchid+'"]').filter('[data-dateid="'+dateid+'"]').addClass('active').siblings('ul').removeClass('active');
					return false;
				}
				activebody = $('<ul class="active timeline" data-matchid="'+matchid+'" data-dateid="'+dateid+'" data-page="0" ></ul>');
				body.append(activebody);
			}
			page = activebody.attr('data-page') || 0;
			
			$.ajax({
				url: $self.attr('data-ajaxurl') + '/event/mixlist/' + matchid + '/' + dateid + '/' + page,
				type: 'POST',
				dataType: "jsonp",
				timeout:6000,
				success: function(data) {
					if (data) {
						var morepage = data.more;
						if (data.matchs.length) {
							data = data.matchs;
							var $cls_status = '';
							var appendli = [];
							var link=[];
							var statusbtn = [];
							var live_entrance = [];
							var leaguelogo = {};

							 for(var i in data) {
								 link=[];
								 statusbtn = [];
								 live_entrance = [];
								if(data[i].status == 0){
									var $row_1= encodeURIComponent(data[i].event_name+'赛事直播：'+data[i].a_name+''+data[i].b_name),
										$time=data[i].remind_time,
										$row_2= encodeURIComponent('时间：'+$time),
										$row_3= encodeURIComponent('直播地址：'+data[i].live[0].url),
										$advance='5',
										$url=data[i].live[0].url;
									$cls_status = 'notbegin'; 
									statusbtn.push('<div class="reminder"><a href="http://qzs.qq.com/snsapp/app/bee/widget/open.htm#content=' + $row_1+ '%0A' + $row_2+ '&time=' + $time+ '&advance=' + $advance +'&url=' + $url+ '" target="_blank" title="提醒我" class="eventAn">开赛提醒</a></div>');
								} else {
									statusbtn.push('<div class="live"><div class="live_trigger"><a href="javascript:void(0);" rel="nofollow"><img src="http://static.usport.cc/app/www/images/zhibo.jpg"></a></div></div>');
									live_entrance.push('<div class="live_entrance">');
									if (data[i].live) {
										for(var k in data[i].live) {
											live_entrance.push('<a href="'+ data[i].live[k].url+'"  target="_blank" rel="nofollow"><img src="'+data[i].live[k].channel_logo+'" alt="'+data[i].live[k].name+'" ></a>');
										}
									}
									live_entrance.push('</div>');
								}

								if(data[i].status ==-1){
									$cls_status = 'end';
								}
								
								if (data[i].promotion) {
									var $u='url';
									var $t='title';
									for(var $n=0;$n<4;$n++){
										$u='url'+$n; 
										$t='title'+$n;
										if (data[i].promotion[$u] && data[i].promotion[$t]) {
											link.push('<li><a href="'+ data[i].promotion[$u]+'" target="_blank">·'+ data[i].promotion[$t]+'</a></li>');
										}

									}
								}
								
								link = link.join('');
								statusbtn = statusbtn.join('');
								live_entrance = live_entrance.join('');
								leaguelogo = {'a_logo': '<img class="logo" src="'+ data[i].a_logo+'">', 'b_logo': '<img class="logo" src="'+ data[i].b_logo+'">'};
								
								appendli.push('<li class="match '+ $cls_status+'">\
										<div class="head">\
											<span class="title">'+ data[i].league_name+'</span><span class="time">'+ data[i].date+data[i].week+data[i].time+'</span>\
										</div>\
										<div class="info">\
										<div class="team l">\
											'+ leaguelogo.a_logo+'\
											<span class="name">'+ data[i].a_name+'</span>\
											<span class="score">'+ data[i].a_score+'</span>\
										</div>\
										<div class="team r">\
											'+ leaguelogo.b_logo+'\
											<span class="name">'+ data[i].b_name+'</span>\
											<span class="score">'+ data[i].b_score+'</span>\
										</div>\
										<div class="state">'+ data[i].status_name+'</div>\
											'+statusbtn+'</div>\
										'+live_entrance+'\
										<div class="interact">\
											<div class="sup-left">\
												<a href="javascript:void(0);" class="thumb l" data-eventid="' + data[i].id + '"></a>\
												<span>'+ data[i].a_support+'</span>\
											</div>\
											<div class="r"><div class="l" style="width:'+ data[i].a_percent+'%;"></div></div>\
											<div class="sup-right">\
												<a href="javascript:void(0);" class="thumb r" data-eventid="' + data[i].id + '"></a>\
												<span>'+ data[i].b_support+'</span>\
											</div>\
										</div>\
										<ul class="link">'+link+'</ul>\
									</li>');
							 }

							if (appendli) {
								if (activebody.find('li').length) { 
									$(document).scrollTop(parseInt($self.offset().top) - 154);
								}
								activebody.attr('data-page', parseInt(page) + 1).append(appendli);
							}else {
								alert('加载失败，请稍后重试');
							}
						}
						
						if (morepage == 0) {
							activebody.attr('data-finish', 1);
							$('#loadmore_scorecenter').parent('.loadmore').fadeOut();
						}
						
						if (! activebody.attr('data-finish')) {
							$('#loadmore_scorecenter').parent('.loadmore').fadeIn();
						}
						
					}
				},
				error: function(x, s, e) {
					if (s == "timeout") {
						alert('请求超时，稍后再试...');
						return;
					}
					alert('出错了，请稍后重试');
				}
			});
			
			return false;
		});

	};
});

