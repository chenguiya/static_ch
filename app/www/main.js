seajs.use('jquery', function($) {
	$(document).ready(function() {
		var $ajaxurl = $('#ajaxurl').attr('data-url');
		//全局弹层函数
		var showmsg = function(msg, offsetObj, delay) {
			delay = delay || 3000;
			msg = msg || '操作成功';
			var timeid = '';
			if (!offsetObj) {
				var winHeight = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
			}
			var winWidth = document.body.clientWidth || window.innerWidth;

			if (!$('#toptip').length) {
				$(document.body).prepend('<div id="jsapend" style="position:relative;"><div id="toptip" style="position: absolute; font-size: 20px; color: #fff;  font-family: Microsoft YaHei;  text-align: center; border-radius: 5px; line-height: 50px; padding: 0 35px 0 35px; min-height: 50px;background: rgba(0,0,0,0.5);z-index: 300;">' + msg + '</div></div>');
			} else {
				$('#toptip').fadeOut('fast').html(msg);
			}

			if (!offsetObj) {
				offsetObj = {'top': document.body.scrollTop + winHeight / 2, 'left': winWidth / 2 - $('#toptip').outerWidth(true) / 2};
			} else if (!offsetObj.left) {
				offsetObj.left = winWidth / 2 - $('#toptip').outerWidth(true) / 2;
			} else {
				offsetObj.left = offsetObj.left - $('#toptip').outerWidth(true) / 2;
			}

			$('#toptip').css(offsetObj).stop().fadeIn('normal', function() {
				if (timeid)
					clearTimeout(timeid);
				timeid = setTimeout(function() {
					$('#toptip').fadeOut();
				}, delay);
			});
		};

		//logo，鼠标上移出现首页图标
		if ($('.logo').length) {
			$('.logo').hover(function() {
				$(this).find('.indexico').show();
			}, function() {
				$(this).find('.indexico').hide();
			});
		}

		//搜索按钮事件
		if ($('.searchBox input.searchIn').length && $('.searchBox .searchBnt').length) {
			$('.searchBox input.searchBnt').on('click', function() {
				if (!$(this).hasClass('searchBntY')) {
					$(this).parent().css('background', '#fff');
					$(this).addClass('searchBntY');
					$('.searchBox input.searchIn').show().stop().animate({'width': '180px'}, 'slow', function() {
						$(this).focus();
					});
					return false;
				} else {//提交搜索查询
					window.open('http://zhannei.baidu.com/cse/search?s=12283768759426572611&entry=1&q=' + encodeURIComponent(document.getElementsByClassName('searchIn')[0].value));
					$('.searchBox input.searchIn').width(180).stop().focus();
				}
			});

			//搜索框失去焦点后隐藏
			$('.searchBox input.searchIn').on('blur', function() {
				if ($('.searchBox input.searchBnt').hasClass('searchBntY')) {
					$(this).stop().animate({'width': '0px'}, 'slow', function() {
						document.getElementsByClassName('searchIn')[0].value = '';
						$(this).hide().parent().css('background', '#595656');
						$('.searchBox input.searchBnt').removeClass('searchBntY');
					});
				}
			});
		}

		//二级导航切换
		if ($('.menu ul').length && $('.menu .menuB ul').length) {
			var menuA = $('.menu .menuA');
			var menuB = $('.menu .menuB');
			var menuTimeid = '';
			menuA.on('mouseover', 'li', function() {
				if (menuTimeid) {
					clearTimeout(menuTimeid);
				}
				if (!$(this).hasClass('active')) {
					$(this).addClass('active')
						.siblings().removeClass('active');

					menuB.find('ul[data-id="' + $(this).children('a').attr('data-menuid') + '"]').addClass('active')
						.siblings().removeClass('active');
				}
			}).on('mouseout', 'li', function(e) {
				if (!$(this).hasClass('default')) {
					var $self = $(this);
					var dataMenueId = $self.siblings('.default').length ? $self.siblings('.default').children('a').attr('data-menuid') : 'home';
					menuTimeid = setTimeout(function() {
						$self.removeClass('active')
							.siblings('.default').addClass('active');

						menuB.find('ul[data-id="' + dataMenueId + '"]').addClass('active')
							.siblings().removeClass('active');
					}, 500);
				}
			});

			menuB.find('ul').hover(function(e) {
				if (menuTimeid) {
					clearTimeout(menuTimeid);
				}
			}, function() {
				var menuid = menuB.find('ul.active').attr('data-id');
				var dataMenueId = menuA.find('li.default').length ? menuA.find('li.default a').attr('data-menuid') : 'home';
				menuTimeid = setTimeout(function() {
					if (menuA.find('a[data-menuid="' + menuid + '"]').parent('li.active').length && !menuA.find('a[data-menuid="' + menuid + '"]').parent('li').hasClass('default')) {
						menuA.find('a[data-menuid="' + menuid + '"]').parent('li').removeClass('active')
							.siblings('li.default').addClass('active');
						menuB.find('ul[data-id="' + menuid + '"]').removeClass('active')
							.siblings('ul[data-id="' + dataMenueId + '"]').addClass('active');
					}
				}, 500);
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

		//登出
		if ($("#btn_logout").length) {
			$("#btn_logout").click(function() {
				var $self = $(this);
				var reloadurl = window.location.href;
				$("#logout_span").html('正在退出...');
				$("#logout_frame").attr("src", $self.attr('data-ajaxurl') + "/member/logout/2");
				$.ajax({
					url: $self.attr('data-ajaxurl') + "/member/logout",
					type: "post",
					dataType: "json",
					data: "",
					timeout: 100000,
					cache: false,
					beforeSend: function(XMLHttpRequest) {
					},
					success: function(data, textStatus) {
						if (typeof (data.message) != "undefined")
						{
							if (data.success == true)
							{

								if (data.arr_js[0] == "")
								{
									$("#message_tip").html(data.uc_msg);
								}
								else
								{
									if (typeof (data.arr_js[0]) != "undefined")
									{
										$("#passframe").attr("src", data.arr_js[0]);
									}
									if (typeof (data.arr_js[1]) != "undefined")
									{
										$("#passframe1").attr("src", data.arr_js[1]);
									}
									if (typeof (data.arr_js[2]) != "undefined")
									{
										$("#passframe2").attr("src", data.arr_js[2]);
									}
								}

								setTimeout(function() {
									window.location.href = reloadurl;
								}, 1000);

							}
							else
							{
								$("#message_tip").html(data.message + "|" + data.uc_msg);
							}
						}
					},
					complete: function(XMLHttpRequest, textStatus) {
					},
					error: function() {
						showmsg("返回异常！");
					}
				});
				return false;
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

		//设置图标下拉菜单
		if ($('.set').length && $('.setTop').length) {
			seajs.use('module/showMenue', function(s) {
				$('.set').on('click', function() {
					s.showMenue($(this), $(this).parent('.userHead').next('.setTop'));
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
		var picShowcaseTimeid = '';
		$('.showcase li img').on('mouseover', function(e) {
			if (picShowcaseTimeid)
				clearTimeout(picShowcaseTimeid);
			var $self = $(this);
			picShowcaseTimeid = setTimeout(function() {
				$self.parents('.showcase').find('.shadow').fadeOut('fast');
				$self.next('.shadow').stop().fadeIn();
				$('.showcase .case img').attr('src', $self.attr('data-bigpic'));
				$('.showcase .case a').attr('href', $self.attr('data-caseurl'));
				$('.showcase .case .title a').text($self.attr('data-casetitle'));
			}, 500);

		}).on('mouseout', function() {
			if (picShowcaseTimeid)
				clearTimeout(picShowcaseTimeid);
		});

		//图库图片格子
		$('.pictures .wall li').hover(function() {
			$(this).find('.cover').show();
		}, function() {
			$(this).find('.cover').hide();
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
				var offsetObj = {'top': $self.offset().top, 'left': parseInt($self.parent('.head').offset().left) + parseInt($self.parent('.head').width() / 2)};
				if (url) {
					$.ajax({
						type: "GET",
						url: url,
						dataType: 'jsonp',
						success: function(data) {
							if (data) {
								if (data.status == 1) {
									$self.children('span').text(parseInt($self.children('span').text()) + 1);
								} else {
									showmsg('已支持!', offsetObj);
								}
							}
						},
						error: function(x, s, t) {
							if (s === "timeout") {
								showmsg('超时，请稍后再试!', offsetObj);
							} else {
								showmsg('请稍后再试!', offsetObj);
							}
						}
					});
				} else {
					showmsg('参数错误，请稍后再试!', offsetObj);
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

			//图库分享按钮
			if ($('.d_share').length) {
				seajs.use(['module/baidushare'], function() {
					$('.pictureShare').shareconfig({
						subject: '【5u体育】' + $('.pt_bdarea h1:first').text(),
						content: "【5u体育】",
						url: document.location.href,
						pic: $('.bd_boxply').find('img').attr('src')
					});
				});

				$('.d_share').on('click', function() {
					seajs.use('module/showMenue', function(s) {
						s.showMenue($('.d_share'), $('.pictureShare'), false, 3);
					});
					return false;
				});
			}

			//图片点赞
			if ($('p.ptch_mood a').length) {
				$('p.ptch_mood').on('click', 'a', function() {
					var $self = $(this);
					var offsetObj = {'top': $self.offset().top, 'left': parseInt($self.parents('div.bd_boxB').offset().left) + parseInt($self.parents('div.bd_boxB').outerWidth(true) / 2)};
					$.ajax({
						type: 'GET',
						url: $self.attr('data-ajaxurl'),
						dataType: 'jsonp',
						success: function(data) {
							if (data) {
								if (data.status === 1) {
									$self.find('span.collet_num').text(parseInt($self.find('span.collet_num').text()) + 1);
								} else if (data.status === 2) {
									showmsg('您已发表过看法，感谢参与!', offsetObj);
								} else {
									showmsg('出错了，请稍后再试!', offsetObj);
								}
							} else {
								showmsg('出错了，请稍后再试!', offsetObj);
							}
						},
						error: function() {
							showmsg('出错了，请稍后再试!', offsetObj);
						}
					});
					return false;
				});

			}
		}

		//文章页分享按钮
		if ($('.sharebtn').length) {
			seajs.use(['module/baidushare'], function() {
				$('.share1').shareconfig({
					subject: '【5u体育】' + $('.det_paddinc h1:first').text(),
					content: "【5u体育】",
					url: document.location.href,
					pic: ""
				});
			});

			var shareTimeid = '';
			$('.sharebtn').on('click', function() {
				$('.share1').css({'left': $(this).offset().left, 'top': parseFloat($(this).offset().top) + 50}).slideDown();
				shareTimeid = setTimeout(function() {
					$('.share1').slideUp();
				}, 2000);
				return false;
			});

			$('.share1').on('click', function() {
				$(this).slideUp();
				$('.sharebtn').find('.sharenum').text(parseInt($('.sharebtn').find('.sharenum').text()) + 1);
			}).on('mouseover', function() {
				if (shareTimeid)
					clearTimeout(shareTimeid);
			}).on('mouseleave', function() {
				shareTimeid = setTimeout(function() {
					$('.share1').slideUp();
				}, 2000);
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

		//视频页，赛事预告，video.php
		if ($('.videoEvent').length) {
			seajs.use('module/scrollpage', function() {
				var silderEvent = $('.videoEvent .silderEvent');
				var totalWidth = silderEvent.find('.silderblock .eventList').length * silderEvent.find('.silderblock .eventList').outerWidth(true);
				silderEvent.scrollpage({
					'preClass': 'pre',
					'nextClass': 'next',
					'scrollClass': 'silderblock',
					'scrollWidth': silderEvent.find('.silderblock .eventList').outerWidth(true) * 3,
					'totalWidth': totalWidth,
					'autoScroll': false
				});
			});
		}

		//赛事中心加载更多,支持球队
		if ($('#body_scorecenter').length) {
			var body_scorecenter = $('#body_scorecenter');
			//加载更多
			if ($('#loadmore_scorecenter').length) {
				seajs.use('module/ajaxmore', function() {
					$('#loadmore_scorecenter').ajaxmore();
				});
			}

			var scorecenterTab = function(option) {
				if (!option.justScroll && !$(option.self).hasClass('active')) {
					var matchid = option.matchid || '0';
					var dateid = option.dateid || '0';
					$(option.self).addClass('active').siblings('li').removeClass('active');
					var activebody = body_scorecenter.children('ul[data-matchid="' + matchid + '"]').filter('[data-dateid="' + dateid + '"]');
					if (activebody.length) {
						activebody.addClass('active').siblings('ul').removeClass('active');
						if (activebody.attr('data-finish')) {
							$('#loadmore_scorecenter').parent('.loadmore').fadeOut();
						} else {
							$('#loadmore_scorecenter').parent('.loadmore').fadeIn();
						}
					} else {
						$('#loadmore_scorecenter').click();
					}
				}
				$(document).scrollTop(parseInt($('.featured').offset().top) + 286);
				return false;

			};


			//tab切换, 赛事类别
			$('ul.matchtypes li').on('click', function() {
				scorecenterTab({'self': this, 'dateid': $('ul.datepicker li.active').attr('data-dateid'), 'matchid': $(this).attr('data-matchid')});
			});

			//tab切换, 日期
			$('ul.datepicker li').on('click', function() {
				scorecenterTab({'self': this, 'dateid': $(this).attr('data-dateid'), 'matchid': $('ul.matchtypes li.active').attr('data-matchid')});
			});

			//点击导航事件
			$('div.menuB ul[data-id="sc"] li').on('click', function() {
				$('ul.matchtypes li').eq($(this).index()).click();
				return false;
			});

			if (!isNaN(parseInt(location.pathname.split('/').pop()))) {
				scorecenterTab({justScroll: true});
			} else {
				$('.matchtypes .hot').addClass('active');
			}


			//支持球队
			$('div.col-left').on('click', 'div.interact a.thumb', function() {
				var offsetObj = {'top': $(this).offset().top - 30, 'left': parseInt($(this).parents('.interact').offset().left) + parseInt($(this).parents('.interact').outerWidth() / 2)};
				//每场比赛只能支持一次，并且只能支持其中一队
				if ($(this).hasClass('ed') || $(this).parents('div.interact').find('a.thumb').not(this).hasClass('ed')) {
					showmsg('每场比赛只能支持一次!', offsetObj);
					return false;
				}

				var $self = $(this);
				var eventId = $self.attr('data-eventid');
				var spanCount = $self.parent('div').find('span');
				var whichTeam = 'a';
				if ($self.hasClass('r')) {
					whichTeam = 'b';
				}

				$.ajax({
					url: $('#loadmore_scorecenter').attr('data-ajaxurl') + '/event/support/' + eventId + '/' + whichTeam,
					type: 'GET',
					dataType: 'jsonp',
					success: function(data) {
						if (data) {
							$self.addClass('ed');
							spanCount.text(parseInt(spanCount.text()) + 1);
						}
					},
					error: function(x, s, e) {
						if (s == "timeout") {
							showmsg('请求超时，稍后再试...', offsetObj);
							return;
						}
						showmsg('出错了:' + s + '，请稍后重试', offsetObj);
					}
				});

			});

//			//直播入口
			if ($('div.live_trigger a').length) {
				seajs.use('module/showMenue', function(s) {
					$('div.scorecenter').on('click', 'div.live_trigger a', function() {
						var $self = $(this);
						var $left = parseInt(parseInt($self.position().left, 10) - $self.parents('div.info').siblings('div.live_entrance').outerWidth(true) / 2 + 38);
						$self.parents('div.info').siblings('div.live_entrance').css({'left': $left});
						s.showMenue($self, $self.parents('div.info').siblings('div.live_entrance'), '', 3);
					});
				});
			}
		}

		//新闻详情页，踩和赞,收藏
		if ($('a.ajaxlike').length) {
			$('body').on('click', 'a.ajaxlike', function() {
				var $self = $(this);
				var url = $self.attr('data-ajaxurl');
				var collectTip = '收藏成功!';
				var statusChange = function() {
					showmsg('出错了，请稍后重试');
				};
				var sharebtn = $self.siblings('a.sharebtn');
				if (!sharebtn.length) {
					sharebtn = $self.siblings('a.v_share');
				}
				var offsetObj = {'top': $self.offset().top - 45, 'left': sharebtn.offset().left};

				if ($self.hasClass('d_m_zan')) {//踩和赞
					if ($self.siblings('a.d_m_cha').hasClass('oped')) {
						showmsg('您已发表过看法，感谢参与!', offsetObj);
						return false;
					}
					statusChange = function() {
						$self.addClass('oped d_m_zaned');
					};
				} else if ($self.hasClass('d_m_cha')) {
					if ($self.siblings('a.d_m_zan').hasClass('oped')) {
						showmsg('您已发表过看法，感谢参与!', offsetObj);
						return false;
					}
					statusChange = function() {
						$self.addClass('oped d_m_chaed');
					};
				} else if ($self.hasClass('d_m_xihu')) {//收藏
					statusChange = function() {
						$self.addClass('oped d_m_xihued');
					};
				}
				$.ajax({
					type: 'GET',
					url: url,
					dataType: 'jsonp',
					success: function(data) {
						if ($self.hasClass('d_m_xihu')) {//收藏
							if (data['status'] == 1) {
								showmsg("收藏成功！", offsetObj);
								$self.find('.votenum').text((parseInt($self.find('.votenum').text()) || 0) + 1);
							} else if (data['status'] == -2) {
								showmsg("已收藏！", offsetObj);
							} else if (data['status'] == -1) {
								showmsg("请登录后再收藏！", offsetObj);
							} else {
								showmsg("参数有误！", offsetObj);
							}
						} else if ($self.hasClass('d_m_cha') || $self.hasClass('d_m_zan')) {//踩、赞
							if (data.status === 1) {
								$self.find('.votenum').text((parseInt($self.find('.votenum').text()) || 0) + 1);
								statusChange();
							} else if (data.status === 2) {
								showmsg('您已发表过看法，感谢参与!', offsetObj);
								return false;
							} else {
								showmsg('出错了，请稍后再试!', offsetObj);
							}
						}
					},
					error: function() {
						if ($self.hasClass('d_m_xihu')) {
							showmsg('收藏失败', offsetObj);
						}
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
		}, function() {
			$(this).find(".tagTxt_s").hide();
		});

		//观点介绍
		$(".vews_unit").hover(function() {
			$(this).addClass("vews_unthover");
		}, function() {
			$(this).removeClass("vews_unthover");
		});

		//返回顶部
		$('#goTop').on('click', function() {
			$(document).scrollTop(0);
		});
		//赛事中心
		if ($('.scorecenter')) {
			// 日期选择器浮动
			$(document).scroll(function() {
				if ($(document).scrollTop() > 530) {
					$('.datepicker').css({'position': 'fixed', 'top': 0, 'z-index': 10});
					$('.matchtypes').css({'position': 'fixed', 'top': 0, 'z-index': 10});
				}
				else {
					$('.datepicker').css('position', 'static');
					$('.matchtypes').css({'position': 'absolute', 'top': 'auto'});
				}
			});

			$('.featured > li.live:first').addClass('active');
			$('.featured > li.focus').addClass('active');

			$('.featured .nav .prev a').click(function() {
				var active = $('.featured > li.active');
				$('.featured > li').removeClass('active');
				active.prev().addClass('active');
				return false;
			});

			$('.featured .nav .next a').click(function() {
				var active = $('.featured > li.active');
				$('.featured > li').removeClass('active');
				active.next().addClass('active');
				return false;
			});
		}

		//图片收藏、视频收藏
		if ($('#AddFavorite').length) {
			$('#AddFavorite').on('click', function() {
				var offsetObj = {'top': parseInt($(this).offset().top) + 20};
				$.ajax({
					type: "GET",
					url: $ajaxurl + "/member/addfavorite/" + encodeURIComponent(window.location) + "/" + document.title,
					dataType: "jsonp",
					success: function(data) {
						if (data['status'] == 1) {
							showmsg("收藏成功！", offsetObj);
							if ($('#AddFavorite').find('span.votenum').length) {
								$('#AddFavorite').find('span.votenum').text(parseInt($('#AddFavorite').find('span.votenum').text()) + 1);
							}
						} else if (data['status'] == -2) {
							showmsg("已收藏！", offsetObj);
						} else if (data['status'] == -1) {
							showmsg("请登录后再收藏！", offsetObj);
						} else {
							showmsg("参数有误！", offsetObj);
						}
					}
				});
			});
		}

		//show_video.php
		if ($('.scroll-pane').length) {
			seajs.use('module/showvideos', function() {
				$('.scroll-pane').jScrollPane();
			});

			$('#play_btn').on('click', function() {
				var href = $(this).attr('href');
				window.open(href, "", "toolbar=1,location=1,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,top=100,left=174,width=640,height=525");
				return false;
			});

			$('#mood').on('click', 'a.mooda', function() {
				var n = 9;
				if ($(this).hasClass('cai'))
					n = 10;
				var catid = $('#mood').attr('data-catid');
				var videoid = $('#mood').attr('data-videoid');
				var offsetObj = {'top': parseInt($(this).offset().top) + 40};
				$.ajax({
					type: "GET",
					url: $ajaxurl + "/mood/zan/" + catid + "/" + videoid + "/1/" + n + "/",
					dataType: "jsonp",
					success: function(data) {
						if (data['status'] == 1) {
							var num = $("#n" + n + " >a").html();
							$("#n" + n + " >a").html(parseInt(num) + 1);
						} else if (data['status'] == 2) {
							showmsg("您已发表过看法，感谢参与!", offsetObj);
						} else {
							showmsg("提交失败！", offsetObj);
						}
					},
					error: function(s, x, t) {
						console.log(x);
					}
				});
			});

			//用手机看
			$('ul.tagIco li.tagMobel span.ml').on('click', function() {
				var $self = $(this);
				seajs.use('module/showMenue', function(s) {
					s.showMenue($self, $self.parent('li.tagMobel').find('div.codeOpen'), '', 2);
				});
			});

			//分享
			if ($('.share2').length) {
				seajs.use(['module/baidushare'], function() {
					$('.share2').shareconfig({
						subject: '(' + document.title + ') - 5u体育 (' + document.location.href + ')',
						content: "【5u体育】",
						url: document.location.href,
						pic: $('#play_btn img:first').attr('src')
					});
				});
			}

		}
		//合作伙伴切换
		$(".parter_Tag span").each(function(index, elen) {
			var chilidList = $(".parter_link").children();
			$(elen).mouseover(function() {
				chilidList.hide();
				$(chilidList[index]).show();
				$(".parter_Tag span").removeClass("active");
				$(this).addClass("active");
			});
		});
		//首页遮罩
		$("#homeSides li,.hdjxs_bd li").hover(function() {
			$(this).find(".homelayer").show();
		}, function() {
			$(this).find(".homelayer").hide();
		});

		//脚部footer.php 微信、新浪、手机二维码
		if ($('div.footerLink').length) {
			$('div.footerLink').children('a').on('mouseover', function() {
				var $box = $('div.' + $(this).attr('class') + '-box');
				var $self = $('this');
				if (!$box.length || $box.is('visible'))
					return false;
				seajs.use('module/showMenue', function(s) {
					s.showMenue($self, $box);
				});
			});
		}

		//views.php 专栏作者tab切换
		if ($('#views_content').length) {
			$('#view_tab a').on('mouseover', function() {
				if ($(this).hasClass('active'))
					return;
				$('#view_tab').siblings('div.' + $(this).attr('class')).addClass('active').siblings('div.tab_content').removeClass('active');
				$(this).addClass('active').siblings('a').removeClass('active');

			});

			$('#views_content').on('click', 'div.page a', function() {
				var page = $(this).attr('data-page');
				var pagesize = $(this).attr('data-pagesize');
				var userid = $(this).attr('data-userid');
				var type = $(this).attr('data-type');
				ajaxpage(page, pagesize, userid, type);
			});

			function ajaxpage(page, pagesize, userid, type) {
				page = page || 2;
				pagesize = pagesize || 16;
				type = type || '';
				_userid = userid || 0;
				var url = $ajaxurl + '/expertlist/lists/' + page + '/' + pagesize + '/' + _userid;
				if (type)
					url = url + '/' + type;
				$.ajax({
					url: url,
					type: 'GET',
					dataType: 'jsonp',
					success: function(data) {
						$('div.tab_content.active').html(data.html);
					},
					error: function(data, s) {
						console.log(JSON.stringify(s));
					}
				});
			}
		}

		//viewintroduce.php  ajax分页
		if ($('#viewintroduce_ajax').length) {
			$('#viewintroduce_ajax').on('click', '#pages a', function() {
				var page = $(this).attr('data-page');
				var pagesize = $(this).attr('data-pagesize') || 10;
				var username = $(this).attr('data-username');
				if (page) {
					var url = $ajaxurl + '/expertposts/lists/' + page + '/' + pagesize + '/' + username;
					$.ajax({
						url: url,
						type: 'GET',
						dataType: 'jsonp',
						success: function(data) {
							$('#viewintroduce_ajax').html(data.html);
						},
						error: function(data, s) {
							console.log(JSON.stringify(s));
						}
					});
				}
			});

			//百度分享
			if ($('.v_share').length) {
				seajs.use(['module/baidushare'], function() {
					$('#viewintroduce_ajax').on('click', 'a.v_share', function() {
						var vews_list = $(this).parents('.vews_list');
						var shareTimeid = '';

						$('#viewintroduceShare').shareconfig({
							subject: '【5u体育-专栏作家介绍】' + vews_list.find('.vews_name a').text(),
							content: "【5u体育】" + vews_list.find('.vews_txt').text(),
							url: vews_list.find('.vews_name a').attr('href'),
							pic: ""
						});

						$('#viewintroduceShare').css({'left': $(this).offset().left + 30, 'top': parseFloat($(this).parents('p.meta_left').offset().top)}).stop().fadeIn();
						shareTimeid = setTimeout(function() {
							$('#viewintroduceShare').stop().fadeOut();
						}, 2000);

						$('#viewintroduceShare').on('click', function() {
							$(this).stop().fadeOut();
						}).on('mouseover', function() {
							if (shareTimeid)
								clearTimeout(shareTimeid);
						}).on('mouseleave', function() {
							shareTimeid = setTimeout(function() {
								$('#viewintroduceShare').stop().fadeOut();
							}, 2000);
						});
						return false;
					});

				});
			}
		}

		//专家订阅
		if ($('a.expert_subscribe').length) {
			$('body').on('click', 'a.expert_subscribe', function() {
				var del_class = 'expert_subed';
				var $self = $(this);
				var fuid = $self.attr('data-fuid');
				var buid = $self.attr('data-buid');
				var del_sub = $self.hasClass(del_class);
				var offsetObj = {'top': $self.offset().top, 'left': $self.offset().left - 20};
				if (fuid && buid) {
					var url = $ajaxurl + '/follow/addfollow/' + buid + '/' + fuid;
					if (del_sub) {
						url = $ajaxurl + '/follow/unfollow/' + buid + '/' + fuid;
					}
					$.ajax({
						url: url,
						type: 'GET',
						dataType: "jsonp",
						success: function(data) {
							if (data.status) {
								switch (data.status) {
									case 0:
										showmsg('未登录!', offsetObj);
										location.href = document.location.origin + '/member/?referer=' + document.location.href;
										break;
									case 1:
										if (del_sub) {
											if ($self.hasClass('joinAn')) {
												$self.removeClass(del_class).attr('title', '关注订阅').text('+关注订阅');
											} else if ($self.hasClass('addSub')) {
												$self.removeClass(del_class).attr('title', '关注订阅').text('+关注订阅');
											} else if ($self.hasClass('sub_pay')) {
												$self.removeClass(del_class).attr('title', '关注订阅').text('+关注订阅');
											}
										} else {
											if ($self.hasClass('joinAn')) {
												$self.addClass(del_class).attr('title', '取消关注').text('-取消关注');
											} else if ($self.hasClass('addSub')) {
												$self.addClass(del_class).attr('title', '取消关注').text('-取消关注');
											} else if ($self.hasClass('sub_pay')) {
												$self.addClass(del_class).attr('title', '取消关注').text('-取消关注');
											}
										}
										break;
									case -1:
										showmsg('未关注!', offsetObj);
										break;
									case 2:
										showmsg('已关注!', offsetObj);
										break;
									default :
										showmsg('出错了，请稍后再试!', offsetObj);
										break;
								}
							}
						}
					});
				} else {
					showmsg('数据出错了，请稍后再试!', offsetObj);
				}
			});
		}

		//年终专题topic/yearEnd.php
		if ($('#yearEnd-tagBox').length) {
			$('#yearEnd-tagBox li').on('mouseover', function() {
				var oldpic = $(this).find('img').attr('src');
				var eventpic = $(this).find('img').attr('data-eventpic');
				$(this).find('img').attr({'data-eventpic': oldpic, 'src': eventpic});
			}).on('mouseout', function() {
				var oldpic = $(this).find('img').attr('src');
				var eventpic = $(this).find('img').attr('data-eventpic');
				$(this).find('img').attr({'data-eventpic': oldpic, 'src': eventpic});
			});

			var yearEndpicTimeid = '';
			$('div.imgBox div.imgList ul li').on('mouseover', function(e) {
				if (yearEndpicTimeid)
					clearTimeout(yearEndpicTimeid);
				var $self = $(this);
				yearEndpicTimeid = setTimeout(function() {
					$('div.videoOne div.imgshow img').attr({'src': $self.find('img').attr('data-bigpic'), 'title': $self.find('img').attr('title')});
					$('div.videoOne div.imgshow a').attr({'href': $self.find('a').attr('href'), 'title': $self.find('a').attr('title')});
					$('div.videoOneInfo').find('dt a').attr({'href': $self.find('a').attr('href'), 'title': $self.find('a').attr('title')}).text($self.find('a').attr('title'))
						.end()
						.find('dd').text($self.find('img').attr('data-desc'));
				}, 500);

			}).on('mouseout', function() {
				if (yearEndpicTimeid)
					clearTimeout(yearEndpicTimeid);
			});
		}


		if ($('.fullCalendar').length) {
			seajs.use('module/fullcalendar', function() {
				var timeS = parseInt($('.fullCalendar').attr('data-timestamp')) || new Date().getTime();
				var options = {
					year: new Date(timeS).getFullYear(),
					month: new Date(timeS).getMonth() + 1,
					current: new Date(timeS),
					onSelect: function(date, target) {
						location.href = location.origin + '/lx/matchs/' + $(target).attr('abbr');
					}
				};
				$('.fullCalendar').fullCalendar(options);
			});
		}

		if ($('.nba_rank').length) {
			$('.nba_rank').on('click', '.widget-head a', function() {
				if ($(this).hasClass('active')) {
					return false;
				}
				var $self = $(this);
				var classUl = $self.attr('class');
				$self.addClass('active').siblings('a.active').removeClass('active');
				if ($('ul.' + classUl).length) {
					$('ul.' + classUl).siblings('ul').stop().fadeOut('normal', function() {
						$('ul.' + classUl).stop().fadeIn();
					});
					return false;
				}
				var url = $ajaxurl + '/nbalx/events';
				$.ajax({
					type: 'GET',
					url: url,
					dataType: 'jsonp',
					success: function(data) {
						if (data && data.rank) {
							var ulHtml = '<ul class="clearfix weekview">';
							ulHtml += '<li><span class="tih_digi tih_red">1</span><div class="tih_show">\
                                  <a href="' + data.first_rank.url + '" title=" ' + data.first_rank.title + '" target="_blank" class="tih_pics">\
                                  <img src="' + data.first_rank.thumb + '" width="109" height="73" title="' + data.first_rank.title + '" alt="' + data.first_rank.title + '"><span class="videoIco"></span></a>\
                                  <div class="t_show_txt">\
                                       <a href="' + data.first_rank.url + '" target="_blank" title="' + data.first_rank.title + ' ">' + data.first_rank.title + '</a>\
                                       <span>播放：' + data.hits + '</span></div></div></li>';
							$.each(data.rank, function(i, $v) {
								ulHtml += '<li>\
                         	<span class="tih_digi tih_red">' + (i + 1) + '</span>\
                         	<div class="tih_txt"><a href="' + $v.url + '" target="_blank" title="' + $v.title + ' ">' + $v.title + '</a></div>\
                         </li>';
							});
							ulHtml += '</ul>';
							console.log(ulHtml);
							$('.nba_rank .tih_info').find('ul').stop().fadeOut('normal', function() {
								$('.nba_rank .tih_info').append(ulHtml)
							});
						}
					}
				});
			});
		}

		//nba 视频聚集-今日比赛
		if ($('.nba_events table tr').length) {
			$('.nba_events table tr:odd').css({background: '#f7f7f7'});
			var defaultColor = '';
			$('.nba_events table tr').on({'mouseover': function() {
					defaultColor = $(this).css('background-color');
					$(this).css({'background-color': '#eb6100', 'cursor': 'pointer'});
				}, 'mouseout': function() {
					$(this).css({'background-color': defaultColor});
				}, 'click': function() {
					var eventsTime = $(this).attr('data-matchtime');
					location.href = location.origin + '/lx/matchs/' + eventsTime;
				}});
		}

		//nba 视频聚集 前一天、后一天选项卡
		if ($('.select_tab').length) {
			function AddDays(date,value) 
			{ 
				date.setDate(date.getDate()+value); 
			} 
			function GetMonthDayCount(date)
			{
				switch (date.getMonth() + 1)
				{
					case 1:
					case 3:
					case 5:
					case 7:
					case 8:
					case 10:
					case 12:
						return 31;
					case 4:
					case 6:
					case 9:
					case 11:
						return 30;
				}
//feb: 
				date = new Date(date);
				var lastd = 28;
				date.setDate(29);
				while (date.getMonth() == 1)
				{
					lastd++;
					AddDays(date, 1);
				}
				return lastd;
			}
			
			$('.select_tab').on('click', 'a', function() {
				if ($(this).hasClass('active'))
					return false;
				var aClass = $(this).attr('class');
				var bClass = (aClass === 'pre_tab' ? 'next_tab' : 'pre_tab');
				var matchdate = $('#matchDate').attr('data-todaytime');
				$(this).addClass('active').siblings('a.' + bClass).removeClass('active');
				if (aClass === 'next_tab' ) {
					matchdate = $('#matchDate').attr('data-yestoday');
				}
				$('#matchDate').text(matchdate);
				$('title').text(matchdate+'NBA录像');
				$('meta[name="keywords"]').attr('content', matchdate+'NBA录像');
				$('meta[name="description"]').attr('content', matchdate+'NBA录像');
				if ($('div.' + aClass).length) {
					$('div.' + aClass).siblings('div.' + bClass).stop().fadeOut('normal', function() {
						$('div.' + aClass).stop().fadeIn();
					});
					return false;
				}
				var matchtime = $('.fullCalendar td.calendar-today').attr('abbr');
				matchtime = matchtime.split('-');
				var now = new Date(matchtime[0], matchtime[1]-1, matchtime[2]);
				var lastday = GetMonthDayCount(now);
				if (lastday == matchtime[2]) {
					now.setDate(parseInt(now.getDate())-lastday+1); 
					now.setMonth(parseInt(now.getMonth())+1); 
				}else {
					now.setDate(parseInt(now.getDate())+1); 
				}
				var year = now.getFullYear();
				var month = now.getMonth() + 1;
				var day = now.getDate();
				matchtime = year + '-' + month + '-' + day;
				var url = $ajaxurl + '/nbalx/matchs/' + matchtime;
//				var url =  'http://www.usport.local/ajax/nbalx/matchs/'+matchtime;
				$.ajax({
					type: 'GET',
					url: url,
					dataType: 'jsonp',
					success: function(data) {
						if (data) {
							$('div.mainLeft').find('div.' + bClass).stop().fadeOut('normal', function() {
								$('div.mainLeft').append(data.html);
							});
						}
					}
				});
			});
		}
	});
});