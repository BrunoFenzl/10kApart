var gulp          = require('gulp');

// css related
var sourcemaps    = require('gulp-sourcemaps');
var autoprefixer  = require('gulp-autoprefixer');
var minifyCSS     = require('gulp-minify-css');
var compass       = require('gulp-compass');
var path          = require('path');
var uglifycss     = require('gulp-uglifycss');

var input   = 'assets/styles/main.scss';
var output  = 'dist/styles';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

var autoprefixerOptions = {
  browsers: [ 'last 2 versions' ]
};

gulp.task('_sass', function () {
  return gulp
    .src(input)
    .pipe(compass({
      css: 'tmp',
      sass: 'assets/styles',
      sourcemap: false,
      time: true,
      style: 'compressed'
    }))
});

gulp.task('_prefixer', ['_sass'], function(){
  return gulp
    .src('tmp/*.css')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(output))
});

gulp.task('watch', function() {
  return gulp
    .watch(input, ['_prefixer'])
});

gulp.task('default', ['_prefixer']);