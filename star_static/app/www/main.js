
seajs.use(['jquery'], function($) {
	$(function() {
		
		//全局弹层函数
		var showmsg = function(msg, delay) {
			delay = delay || 3000;
			msg = msg || '操作成功';
			var timeid = '';
			var winHeight = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
			var winWidth = document.body.clientWidth || window.innerWidth;
			
			if (!$('#toptip').length) {
				$('body').prepend('<div id="toptip" style="position: absolute; font-size: 20px; color: #fff;  font-family: Microsoft YaHei;  text-align: center; border-radius: 5px; line-height: 50px; padding: 0 35px 0 35px; min-height: 50px;background: rgba(0,0,0,0.5);display: none;z-index: 300;">' + msg + '</div>');
			} else {
				$('#toptip').fadeOut('fast');
			}
			
			$('#toptip').css({'top': document.body.scrollTop + winHeight / 2, 'left': winWidth/2-$('#toptip').outerWidth(true)/2}).stop().fadeIn('normal', function(){
				if (timeid) clearTimeout(timeid);
				timeid = setTimeout(function(){$('#toptip').fadeOut();}, delay);
			});
		};
		
		//搜索按钮事件
		if ($('.searchBox input.searchIn').length && $('.searchBox .searchBnt').length) {
			$('.searchBox input.searchBnt').click(function() {
				if (!$(this).hasClass('searchBntY')) {
					$(this).parent().css('background', '#fff');
					$(this).addClass('searchBntY');
					$('.searchBox input.searchIn').show().stop().animate({'width': '180px'}, 'slow', function() {
						$(this).focus();
					});
					return false;
				} else {//提交搜索查询
					$('.searchBox input.searchIn').width(180).stop().focus();
				}
			});

			//搜索框失去焦点后隐藏
			$('.searchBox input.searchIn').on('blur', function() {
				if ($('.searchBox input.searchBnt').hasClass('searchBntY')) {
					$(this).stop().animate({'width': '0px'}, 'slow', function() {
						$(this).hide().parent().css('background', '#595656');
						$('.searchBox input.searchBnt').removeClass('searchBntY');
					});
				}
			});
		}

		//二级导航切换
		if ($('.menu ul.menuA').length && $('.menu .menuB ul').length) {
			var menuA = $('.menu ul.menuA');
			var menuB = $('.menu .menuB');
			menuA.on('mouseover', 'li', function() {
				if (!$(this).hasClass('active')) {
					$(this).addClass('active')
						.siblings().removeClass('active');

					menuB.find('ul[data-id="' + $(this).children('a').attr('data-menuid') + '"]').addClass('active')
						.siblings().removeClass('active');
				}
			});
		}

		//导航弹出层
		if ($('.navElse .navIco').length) {
			seajs.use('module/showMenue', function(s) {
				$('.navElse .navIco').on('click', function() {
					s.showMenue($(this), $(this).parent('.navElse').next('.openTop'));
					return false;
				});
			});
		}

		//用户名下拉菜单
		if ($('.usernamedragmenue').length) {
			seajs.use('module/showMenue', function(s) {
				$('.usernamedragmenue').on('click', function() {
					s.showMenue($(this), $(this).parent('.userHead').next('.openTop'));
					return false;
				});
			});
		}

		//滑动图片js
		if ($('.slidebox').length) {
			seajs.use('module/slidebox', function() {
				$('.slidebox').each(function() {
					$(this).slideBox();
				});
			});
		}

		//图片遮罩层
		if ($('.picShadow').length) {
			$('.picShadow').on('mouseover', function() {
				$(this).siblings('.transLayer').css({'height': $(this).height()}).show();
			});

			$('.transLayer').on('mouseleave', function() {
				$(this).hide();
			}).on('mouseenter', function() {
				$('.transLayer:visible').not(this).hide();
			});
		}

		//花边遮罩层
		$(".tid_ktag li").hover(function() {
			$(this).find(".flag_txt").show();
		}, function() {
			$(this).find(".flag_txt").hide();
		});

		//图库橱窗
		$('.showcase li img').on('mouseover', function(e) {
			$(this).parents('.showcase').find('.shadow').fadeOut('fast');
			$(this).next('.shadow').stop().fadeIn();
			var caseurl = $(this).attr('data-casepic');
			var casetitle = $(this).attr('data-casetitle');
			$('.showcase .case img').attr('src', caseurl);
			$('.showcase .case .title').text(casetitle);
		});

		//鼠标事件，花边排行/视频排行/图片排行
		if ($('[data-mouseevent]').length && $('[data-mousehide]').length && $('[data-mouseshow]').length) {
			var dataMouseTimeid = '';
			$('[data-mousehide]').on('mouseover', function(e) {
				if ($(this).siblings('[data-mouseshow]').length) {
					var $selft = $(this);
					dataMouseTimeid = window.setTimeout(function() {
						$selft.parents('[data-mouseevent]')
							.find('[data-mouseshow]').slideUp()
							.siblings('[data-mousehide]').show('fast', function() {
							$selft.hide().siblings('[data-mouseshow]').fadeIn();
						});
					}, 500);
				}
			}).on('mouseout', function() {
				if (dataMouseTimeid)
					clearTimeout(dataMouseTimeid);
			});
		}

		//观点pk台，投票事件
		if ($('div.opinions').length && $('div.opinions a.agree').length) {
			$('div.opinions a.agree').on('click', function() {
				var url = this.href;
				var $self = $(this);
				if (url && false) {
					$.get(url, function(data) {
						if (data) {
							$self.children('span').text(data);
						}
					});
				}
				else {//debug 在没提供ajax url时，方便查看页面效果
					var vote = $self.children('span');
					vote.text(parseInt(vote.text()) + 1);
				}
				return false;
			});
		}

		//新闻列表页，文章列表鼠标聚焦变色特效
		if ($('.listMain .listA').length) {
			$('.listMain .listA').hover(function() {
				$(this).addClass('bgC').siblings('.bgC').removeClass('bgC');
			}, function() {
				$(this).removeClass('bgC');
			});
		}

		//图库详情页面，图片展示
		if ($('#Smailllist').length) {
			seajs.use('module/showpicture', function() {
				$('#Smailllist').parents('.ptch_infor').showpicture();
			});
		}

		//文章页分享按钮
		if ($('.sharebtn').length) {
			seajs.use('jquery', function($) {
				$(function() {
					seajs.use(['module/baidushare'], function() {

						$('.share1').shareconfig({
							subject: "电影有想法",
							content: "超体",
							url: "http://movie.douban.com/subject/24404677/",
							pic: "http://img3.douban.com/view/photo/photo/public/p2204643974.jpg"
						});
					});

					var shareTimeid = '';
					$('.sharebtn').on('click', function() {
						$('.share1').css({'left': $(this).offset().left - 44, 'top': parseFloat($(this).offset().top) - 25}).slideDown();
						shareTimeid = setTimeout(function() {
							$('.share1').slideUp();
						}, 5000);
						return false;
					});

					$('.share1').on('click', function() {
						$(this).slideUp();
					}).on('mouseover', function() {
						if (shareTimeid)
							clearTimeout(shareTimeid);
					}).on('mouseleave', function() {
						shareTimeid = setTimeout(function() {
							$('.share1').slideUp();
						}, 5000);
					});
				});
			});
		}

		if ($('.relativepic').length) {
			seajs.use('module/scrollpage', function() {
				$('.relativepic').scrollpage({
					'preClass': 'pre',
					'nextClass': 'next',
					'scrollClass': 'det_xgtj_ul',
					'scrollWidth': 4 * 173,
					'totalWidth': $('.relativepic .det_xgtj_ul li').length * 173,
					'autoScroll': true
				});
			});
		}

		//赛事预告，翻页
		if ($('.eventsBox').length) {
			seajs.use('module/scrollpage', function() {
				$('.eventsBox').scrollpage({});
			});
		}

		//加载更多,暂时不用
		if ($('.debug').length) {
			seajs.use('module/ajaxmore', function() {
				$('.sportnews .ajaxmore').ajaxmore({
					'catid': 17, //分类ID
					'pagesize': 15, //每次加载数量
					'callback': function(data) {
						var newcontent = '';
						var posttime = new Date(data[i].inputtime * 1000),
							year = posttime.getYear(),
							month = posttime.getMonth() < 9 ? '0' + (posttime.getMonth() + 1) : posttime.getMonth() + 1,
							day = posttime.getDate() < 10 ? '0' + posttime.getDate() : posttime.getDate();
						posttime = year + '年' + month + '月' + day + '日';
						for (var i = 0; i < data.length; i++) {
							newcontent += '<li>\
							<a href="' + data[i].url + '" class="thumb">\
								<img src="' + data[i].thumb + '"></a>\
							<h3 class="title"><a href="">[' + data[i].catname + ']</a> ' + data[i].title + '</h3>\
							<p class="intro">' + data[i].description + '... <a href="' + data[i].url + '" class="fulltext">阅读全文</a></p>\
							<span class="tag">标签：</span>\
							<span class="posttime">' + posttime + '</span>\
						</li>';
						}
						if (newcontent) {
							$('.sportnews .list').append(newcontent);
						}
					}
				});
			});
		}

		//新闻详情页，踩和赞,收藏
		if ($('a.ajaxlike').length) {
			$('a.ajaxlike').on('click', function() {
				var $self = $(this);
				var url = $self.attr('href');
				$.getJSON(url, function(data) {
					if (data.status === 1) {
						$self.find('.votenum').text(parseInt($self.find('.votenum').text()) + 1);
					}
				});
				return false;
			});
		}

		//首页效果展示
		$(".com_Ltable li:odd").addClass("even");
		$("#tthb_bd_id .in_dets .slidepre").hover(function() {
			$(this).addClass("pre_s");
		}, function() {
			$(this).removeClass("pre_s");
		});
		$("#tthb_bd_id .in_dets .slidenext").hover(function() {
			$(this).addClass("next_s")
		}, function() {
			$(this).removeClass("next_s");
		});
		$(".ttrd_Tab li").on("click", function() {
			$(".ttrd_Tab li").removeClass("active");
			$(this).addClass("active");
			$(".ttrd_center").css("display", "none");
			var ttrdTabID = $(this).attr("id");
			$("#" + ttrdTabID + "center").show();
			return false;
		});
		$(".in_bnaList li").hover(function() {
			$(this).find(".tagTxt_s").show();
		},function(){
		    $(this).find(".tagTxt_s").hide();
	    });
		
		//观点介绍
		$(".vews_unit").hover(function(){$(this).addClass("vews_unthover");},function(){$(this).removeClass("vews_unthover");});

	});
});