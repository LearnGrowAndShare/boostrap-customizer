var gulp  = require('gulp'),
  sass = require('gulp-sass')(require('sass'));
  sourcemaps = require('gulp-sourcemaps'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  postcss      = require('gulp-postcss'),
  autoprefixer = require('autoprefixer');
  const concat = require('gulp-concat');

function buildThemeCss() {
    return gulp.src(
      [
        'scss/themes/light/*.scss',
        'scss/themes/dark/dark.scss',
        'scss/themes/demo-1/demo-1.scss',
        'scss/themes/demo-2/demo-2.scss',
        'scss/themes/demo-3/demo-3.scss',
        'scss/themes/demo-4/demo-4.scss',
        'scss/themes/demo-5/demo-5.scss'
    ]
      
      )
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
    gulp.watch(['scss/*.scss'], gulp.parallel(buildThemeCss));
}
//buildDashboardCss

exports.watch = gulp.series(gulp.parallel(buildThemeCss, buildDashboardCss, buildDemo), watcher);
exports.default = gulp.parallel(buildThemeCss, buildDemo);
