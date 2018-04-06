const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const del = require('del');
const pkg = require('./package.json');
const argv = require('yargs').argv;

if (argv.versionOverride) {
  pkg.version = argv.versionOverride;
}

console.log(`Version in manifest will be ${pkg.version}`);

gulp.task('build', ['copy', 'manifest']);

gulp.task('copy', () => {
  return gulp.src('./common/**/!(manifest.json)')
    .pipe(gulp.dest('./output/'));
});

gulp.task('package', () => {
  return gulp.src('./output/**/*')
    .pipe($.zip('./chrome.zip'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('manifest', () => {
  return gulp.src('./common/manifest.json')
    .pipe($.template(pkg))
    .pipe(gulp.dest('./output'));
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