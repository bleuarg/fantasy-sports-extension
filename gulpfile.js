const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const del = require('del');


gulp.task('build', ['copy']);

gulp.task('copy', () => {
  return gulp.src('./common/*')
    .pipe(gulp.dest('./built/'));
});

gulp.task('package', () => {
  return gulp.src('./built/**/*')
    .pipe($.zip('./fse.zip'))
    .pipe(gulp.dest('./output/'));
});

gulp.task('watch', () => {
  return gulp.watch('./common/**/*', ['build']);
});

gulp.task('clean', () => {
  return del([
    './built/**/*',
    './output/**/*'
  ]);
});