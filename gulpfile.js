const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const del = require('del');
const pkg = require('./package.json');

// Simple tasks mainly to copy the extentions specific files and replace keys in
// the manifest with data from the package.json

gulp.task('build', ['copy', 'manifest']);

gulp.task('copy', () => {
  return gulp.src('./common/**/!(manifest.json)')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('package', () => {
  return gulp.src('./dist/**/*')
    .pipe($.zip('./chrome.zip'))
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