# 前端框架

## 框架结构

* sea.js  框架入口，模块加载器。

* base/  前端基础库。

* module/  自定义模块。根据业务需求，将常用功能封装成CMD模块，供全局调用。

* app/  产品目录。每个子目录对应一个产品，包括CSS文件、JavaScript文件、图片资源文件三类。


## 技术方案

* [Sea.js](http://seajs.org/docs/) 前端模块化加载框架

* [Gulp.js](http://gulpjs.com) 前端自动化构建工具

* [gulp-seajs-transport](https://github.com/guilipan/gulp-seajs-transport) 模块依赖提取

* [gulp-uglify](https://github.com/terinjokes/gulp-uglify/) JavaScript代码压缩

* [gulp-cssmin](https://github.com/chilijung/gulp-cssmin/) CSS代码压缩

* [gulp-concat](http://github.com/wearefractal/gulp-concat) 代码合并


## 部署

**git库地址**： git@192.168.2.14:/repos/static.git

**git库对应测试域名：** [http://static.usport.cc](http://static.usport.cc)