'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var fs = require('fs');

var transport = require("gulp-seajs-transport");

function walk(path, ondir, onfile) {
	var dirs = fs.readdirSync(path);
	dirs.forEach(function(item){
		if (fs.statSync(path+'/'+item).isDirectory()) {
			walk(path+'/'+item, ondir, onfile);
			if (typeof ondir === 'function') ondir(path+'/'+item, item);
		}
		else {
			if (typeof onfile === 'function') onfile(path+'/'+item, item);
		}
	});
}

gulp.task('js', function(){

	gulp.src(['app/sample/**/*.js', '!**/main.js'])
		.pipe(uglify())
		.pipe(concat('main.js'))
		.pipe(gulp.dest('../dist/app/sample'));

	gulp.src('module/**/*.js')
  		.pipe(transport({ base:"." }))
		.pipe(uglify())
		.pipe(gulp.dest('../dist/module'));

});

gulp.task('css', function(){

});

gulp.task('default', ['js', 'css']);