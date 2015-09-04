var gulp = require('gulp');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var errorHandler = require('./errorHandler.js');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('./paths.js');
var uglify = require('gulp-uglify');

gulp.task('optimize-and-copy-components-js', function() {
	return gulp.src(paths.src.components)
			   .pipe(changed(paths.dest.components))
			   .pipe(sourcemaps.init())
			   .pipe(uglify().on('error', errorHandler.onError))
			   .pipe(concat('components.js'))
			   .pipe(sourcemaps.write("./"))
			   .pipe(gulp.dest(paths.dest.components));
});