var gulp = require('gulp');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var cssMinify = require('gulp-minify-css');
var errorHandler = require('./errorHandler.js');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('./paths.js');

gulp.task('optimize-and-copy-less-components', function () {
    return gulp.src(paths.src.lessComponents)
    		   .pipe(changed(paths.dest.css))
    	       .pipe(sourcemaps.init())
    	       .pipe(less())
    	       .pipe(cssMinify({noRebase: true}))
    	       .pipe(sourcemaps.write())
    	       .pipe(concat('components.css'))
    	       .pipe(gulp.dest(paths.dest.css))
    	       .on('error', errorHandler.onError);
});