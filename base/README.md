
# 基础库

## audio.js

[audio.js](https://github.com/kolber/audiojs) HTML5 音频播放组件，不支持 H5 的浏览器自动降级成 Flash 播放，UI可定制。

此版本在官方版本基础上做过cmd封装，支持seajs加载，用法如下：

#### JavaScript

```js
seajs.use('jquery', function($){
	$(function(){
		seajs.use('audioplayer', function(audio){
			audio.createAll();
		});
	});
});
```

#### HTML

```html
<audio src="xxx/123.mp3" preload="auto"></audio>
```
