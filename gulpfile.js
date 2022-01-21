var gulp  = require('gulp'),
  sass = require('gulp-sass')(require('sass'));
  sourcemaps = require('gulp-sourcemaps'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  postcss      = require('gulp-postcss'),
  autoprefixer = require('autoprefixer');

function buildLightCss() {
    return gulp.src(['scss/light/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer({ browsers: [
                'Chrome >= 35',
                'Firefox >= 38',
                'Edge >= 12',
                'Explorer >= 10',
                'iOS >= 8',
                'Safari >= 8',
                'Android 2.3',
                'Android >= 4',
                'Opera >= 12']})]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css/light'))
        .pipe(cleanCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('css/'))
}


function buildDarkCss() {
  return gulp.src(['scss/dark/*.scss'])
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss([ autoprefixer({ browsers: [
              'Chrome >= 35',
              'Firefox >= 38',
              'Edge >= 12',
              'Explorer >= 10',
              'iOS >= 8',
              'Safari >= 8',
              'Android 2.3',
              'Android >= 4',
              'Opera >= 12']})]))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('build/css/dark'))
      .pipe(cleanCss({level: {1: {specialComments: false}}}))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('css/'))
}
function watcher() {
    gulp.watch(['scss/*.scss'], gulp.parallel(buildLightCss, buildDarkCss));
}

exports.watch = gulp.series(gulp.parallel(buildLightCss, buildDarkCss), watcher);
exports.default = gulp.parallel(buildLightCss, buildDarkCss);
