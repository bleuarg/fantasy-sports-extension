const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const del = require('del');
const pkg = require('./package.json');

gulp.task('build', ['copy']);

gulp.task('copy', () => {
  return gulp.src('./common/*')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('package', () => {
  return gulp.src('./dist/**/*')
    .pipe($.zip('./fantasy-sports-extension.zip'))
    .pipe(gulp.dest('./output/'));
});

gulp.task('manifest', () => {
  return gulp.src('./common/manifest.json')
    .pipe($.template(pkg))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', () => {
  return gulp.watch('./common/**/*', ['build']);
});

gulp.task('clean', () => {
  return del([
    './dist/**/*',
    './output/**/*'
  ]);
});