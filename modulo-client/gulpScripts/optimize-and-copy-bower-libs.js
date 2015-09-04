var gulp = require('gulp');
var changed = require('gulp-changed');
var mainBowerFiles = require('main-bower-files');
var paths = require('./paths.js');

gulp.task('optimize-and-copy-bower-libs', function() {
    return gulp.src(mainBowerFiles(), { base: paths.src.bowerLibs })
    		   .pipe(changed(paths.dest.lib))
	           .pipe(gulp.dest(paths.dest.lib));
});