const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const del = require('del');


gulp.task('build', ['copy']);

gulp.task('copy', () => {
  return gulp.src('./common/*')
    .pipe(gulp.dest('./built/'));
});

gulp.task('zip', () => {
  return gulp.src('./output/**/*')
    .pipe($.zip('extensionName.zip'));
});

gulp.task('watch', () => {
  gulp.watch('./common/**/*', ['build']);
});