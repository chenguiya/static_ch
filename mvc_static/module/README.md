
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

## slidebox

轮播组件，图片轮播

###HTML

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

###javascript
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

