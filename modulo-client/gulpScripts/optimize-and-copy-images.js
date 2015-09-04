var gulp = require('gulp');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var paths = require('./paths.js');

gulp.task('optimize-and-copy-images', function() {
    return gulp.src(paths.src.images)
    	       .pipe(changed(paths.dest.images))
	           .pipe(imagemin({
	               progressive: false,
	               optimizationLevel: 4,
	               svgoPlugins: [{removeViewBox: false}]
	           }))
	           .pipe(gulp.dest(paths.dest.root));
});