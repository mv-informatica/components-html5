var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var paths = require('./paths.js');

gulp.task('jshint', function () {
    return gulp.src(paths.src.components)
               .pipe(jshint())
               .pipe(jshint.reporter(stylish));
});