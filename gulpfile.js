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
        .pipe(postcss([ autoprefixer()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('docs/css/light'))
        .pipe(cleanCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('docs/'))
}


function buildDarkCss() {
  return gulp.src(['scss/dark/*.scss'])
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss([ autoprefixer()]))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('docs/css/dark'))
      .pipe(cleanCss({level: {1: {specialComments: false}}}))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('docs/'))
}

function buildDashboardCss() {
  return gulp.src(['scss/dashboard/admin.scss'])
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss([ autoprefixer()]))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('docs/css/dashboard'))
      .pipe(cleanCss({level: {1: {specialComments: false}}}))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('docs/'))
}


function buildDemo() {
  return gulp.src(['demo/**/*']).pipe(gulp.dest('docs/'))
}

function watcher() {
    gulp.watch(['scss/*.scss'], gulp.parallel(buildLightCss, buildDarkCss));
}

exports.watch = gulp.series(gulp.parallel(buildLightCss, buildDarkCss, buildDashboardCss, buildDemo), watcher);
exports.default = gulp.parallel(buildLightCss, buildDarkCss, buildDashboardCss, buildDemo);
