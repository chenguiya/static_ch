'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var fs = require('fs');

gulp.task('js', function(){

	gulp.src(['audio.js'])
		.pipe(uglify())
		.pipe(rename('audio.min.js'))
		.pipe(gulp.dest('.'));

});

gulp.task('css', function(){

});

gulp.task('default', ['js', 'css']);