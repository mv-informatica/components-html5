var gulp = require('gulp');
var changed = require('gulp-changed');
var cssMinify = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('./paths.js');

gulp.task('optimize-and-copy-css', function() {
    return gulp.src(paths.src.css.files)
    		   .pipe(changed(paths.dest.css))
    		   .pipe(sourcemaps.init())
    		   .pipe(cssMinify({root : paths.src.css.root}))
    		   .pipe(sourcemaps.write())
    		   .pipe(gulp.dest(paths.dest.css));
});