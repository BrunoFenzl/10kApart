var gulp          = require('gulp');

// css related
//var sass          = require('gulp-sass');
var sourcemaps    = require('gulp-sourcemaps');
var autoprefixer  = require('gulp-autoprefixer');
var sassdoc       = require('sassdoc');
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

var sassdocOptions = {
  dest: './docs/sassdoc'
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

gulp.task( 'build:styles', ['_prefixer'] );


gulp.task('watch', function() {
  return gulp
    .watch(input, ['_prefixer'])
});


gulp.task('default', ['sass', 'scripts']);