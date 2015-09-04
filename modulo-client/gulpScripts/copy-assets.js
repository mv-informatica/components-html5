var gulp = require('gulp');
var changed = require('gulp-changed');
var paths = require('./paths.js');

gulp.task('copy-assets', function() {
    return gulp.src(paths.src.assets)
    		   .pipe(changed(paths.dest.root))
               .pipe(gulp.dest(paths.dest.root));
});