
# CMD模块用例

## baidushare

百度分享组件，一个页面可设置多个分享点。

#### HTML

```html
<div class="bdsharebuttonbox share1" data-tag="bdshare">
	<a data-cmd="qzone" href="#">QQ空间</a>
	<a data-cmd="tsina" href="#">新浪微博</a>
	<a data-cmd="tqq" href="#">腾讯微博</a>
	<a data-cmd="more" href="#">更多</a>
</div>

<div class="bdsharebuttonbox share2" data-tag="bdshare">
	<a data-cmd="qzone" href="#">QQ空间</a>
	<a data-cmd="tsina" href="#">新浪微博</a>
	<a data-cmd="tqq" href="#">腾讯微博</a>
	<a data-cmd="more" href="#">更多</a>
</div>
```
类名 .bdsharebuttonbox 必须保留，不可修改，作为分享组件外部容器；

属性 data-tag="bdshare" 必须保留，不可修改;


#### JavaScript

```js
seajs.use('jquery', function($){

	$(function(){
		
		seajs.use(['module/baidushare'], function(){

			$('.share1').shareconfig({
				subject : "电影有想法",
				content : "超体",
				url : "http://movie.douban.com/subject/24404677/",
				pic : "http://img3.douban.com/view/photo/photo/public/p2204643974.jpg"
			});

			$('.share2').shareconfig({
				subject : "给我个电话亭，我要拯救地球！",
				content : "安德的游戏 Ender's Game",
				url : "http://movie.douban.com/subject/5323957/",
				pic : "http://img3.douban.com/view/photo/photo/public/p2128409114.jpg"
			});

		});
	});
});
```

***

## ajaxmore
官网赛程中心加载更多,直接获取url获取数据，组装成相同的html结构追加进document

### HTML
```html
	<div class="loadmore">
		<a href="javascript:void(0);" data-ajaxurl="http://www.5usport.com/ajax" data-staticurl="http://static.5usport.com" id="loadmore_scorecenter">加载更多</a>
	</div>
```

### javascript
```js
	//赛事中心加载更多,支持球队
		if ($('#body_scorecenter').length) {
			var body_scorecenter = $('#body_scorecenter');
			//加载更多
			if ($('#loadmore_scorecenter').length) {
				seajs.use('module/ajaxmore', function() {
					$('#loadmore_scorecenter').ajaxmore();
				});
			}
```
***

## browser
判断浏览器,内部工具模块

### javascript
```js
var BROWSER = require('./browser');
if (BROWSER.ie) {//ie浏览器}
```
***

## fullcalendar
日历插件

### HTML
```html
	<div class="fullCalendar"></div>//只需一个日历控件的容器
```

### javascript
```js
	seajs.use('module/fullcalendar', function() {
		$('.fullCalendar').fullCalendar({
			width : 300,//日历控件的宽度
			height : 275,//日历控件的高度
			fit : false,//日历控件的宽高自适应
			border : true,//日历控件的边框
			firstDay : 0,//周的第一天，0为星期日
			weeks : ['日', '一', '二', '三', '四', '五', '六'],//周的表现方式，比如还可以是sun、mon等等
			months : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],//月的表现方式
			year : new Date().getFullYear(),//初始化年
			month : new Date().getMonth() + 1,//初始化月
			current : new Date(),//初始化日
			solarTerms : true, //显示二十四节气
			lunarDay : true, //显示农历
			onSelect : function (date, target) {},//日期选择的回调函数，date:当前选择的日期，target:当前对象
			onChange : function (year, month) {}//日期改变的回调函数，year:当前年，month:当前月
		});
	});
```
***

## scrollpage
滚动翻页，比如赛事预告/图文精选

### HTML
```html
	<div class="det_tew relativepic">
					     <div class="det_cobotm">
						      <h2 class="h2_c_titx">图文精选</h2>
							  <div class="det_yem"><a class="det_m_pre pre"></a><a class="det_m_nxt next"></a></div>
						 </div>
						<div class="det_xgtjbox" style="position: relative;">
							 <ul class="det_xgtj_ul ch_q">
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
							</ul>
						 </div>
					</div>
					
					类似的结构就行，只与类名挂钩，不与元素类型、嵌套关系挂钩
```

### javascript
```js
	seajs.use('module/scrollpage', function() {
		$('.relativepic').scrollpage({
			'preClass': 'pre',//上一页按钮的类名
			'nextClass': 'next',//下一页按钮的类名
			'scrollClass': 'det_xgtj_ul',//要滚动的容器的类名
			'scrollWidth': 4 * 173,//每一次滚动的偏移量
			'totalWidth': $('.relativepic .det_xgtj_ul li').length * 173,//要滚动的总偏移量
			'autoScroll': true//是否自动滚动
		});
	});
```
***

## showMenue
下拉层显示，主要用来显示二级下拉菜单

### javascript
```js
	seajs.use('module/showMenue', function(s) {
						s.showMenue(
							ctrlobj, //触发下拉菜单的jquery对象
							menueobj, //下拉菜单的jquery对象
							delay, //下拉菜单的延迟消失时间
							layer //下拉菜单的分层，同层的互斥，即同一时间只能出现一个
						);
				});
```
*** 

## showpicture
图库显示组件

### javascript
```js
	seajs.use('module/showpicture', function() {
		$('#Smailllist').showpicture({
			delay:2,//幻影灯播放的速度，毫秒
			starIndex:0,//图片的起始位置
			playCtrl:'playCtrl',//触发幻影灯的按钮的类名
			playtoggleClass:'d_stop',//标识识幻影灯停止播放的类名，即有此类名就停止播放，没有则播放
			lightCtrl:'lightCtrl',//触发关灯浏览的类名
			lighttoggleClass:'ptch_onhover',//标识识关灯浏览的类名，有，开灯；没，关灯。
			nextClass: 'mouseright',//下一张图片的按钮的类名
			preClass: 'mouseleft',//上一张图片的按钮的类名
			bigpicClass:'bd_boxply',//大图展示区域的类名
			pictitleClass:'pictitle',// 图片标题的类名
			smallpicClass:'smallpicarea',//小图展示区域的类名
			nextgroupClass:'nextgroup',//下一组小图
			pregroupClass:'pregroup',//上一组小图
			currentpicNumClass:'currentNum',//标识当前展示的图片的类名
			totalpicClass:'totalpicNum',//图片总数
			end_over: 'end_over'//标识展示到最后一张图
		});
	});
```
***

## showvideos
视频显示，主要用于官网视频展示的导航条优化，以及滚动事件控制

### javascript
```js
	seajs.use('module/showvideos', function() {
		$('.scroll-pane').jScrollPane();
	});
```
***

## slidebox

轮播组件，图片轮播

#### HTML

```html
<div class="slidebox">
<ul>轮播大图</ul>
<ul>indicator</ul>
<span class="slidepre"></span>
<span class="slidenext"></span>
</div>
组件不修改任何样式，需定义好样式。
类名slidebox必须保留，作为整个轮播组件的外部容器，容器内代码结构随意，但只能有最多两个ul标签。
indicator（轮播点），上、下一张图按钮可选。
```

#### javascript
```js
seajs.use('jquery', function($){

	$(function(){
		
		if ($('.slidebox').length) {
			seajs.use('module/slidebox', function() {
				$('.slidebox').each(function() {
					$(this).slideBox({
					    delay:2,    //轮播的间隔时间
					    startIndex:0    //轮播起始点
					});
				});
			});
		}
	});
});
```
***