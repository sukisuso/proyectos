/**
 * 
 */

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	plumber = require('gulp-plumber'),
	inject = require('gulp-inject-string');

	 
	gulp.task('compress', function() {
		gulp.src(['webapp/build/*js'])
		.pipe(plumber())
		.pipe(concat('free-fw.js'))
		.pipe(uglify())
		.pipe(inject.prepend('// jshint ignore: start \n '))
		.pipe(gulp.dest('webapp/build/fw'));
	});

	
	gulp.task('justcompress', function() {
		gulp.src(['webapp/build/*js'])
		.pipe(plumber())
		.pipe(concat('free-all-debug-fw.js'))
		.pipe(inject.prepend('// jshint ignore: start \n '))
		.pipe(gulp.dest('webapp/build/fw'));
	});


gulp.task('watch',function(){
	gulp.watch(['webapp/build/*.js'], ['compress', 'justcompress']); 
});

gulp.task('default', ['compress',  'watch', 'justcompress']);