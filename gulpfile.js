const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const del = require('del');


gulp.task('build', ['copy']);

gulp.task('copy', () => {
  gulp.src('./common/*')
    .pipe(gulp.dest('./output/unpacked'));
});

gulp.task('zip', () => {
  gulp.src('./output/unpacked/**/*')
    .pipe($.zip('extensionName.zip'));
})