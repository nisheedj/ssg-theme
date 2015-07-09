var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var less = require('gulp-less');


gulp.task('styles', function(){
  gulp.src(['src/styles/ssg-theme.less'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('dist/public/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/public/'))
});

gulp.task('scripts', function(){
  return gulp.src(['src/scripts/**/*.js','!src/scripts/libs','!src/scripts/libs/**.*'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('dist/public/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/public/'))
});

gulp.task('images',function(){
  return gulp.src('src/images/**/*.*')
  .pipe(gulp.dest('dist/public/'))
});

gulp.task('icons',function(){
  return gulp.src('src/fonts/**/*.*')
  .pipe(gulp.dest('dist/public/fonts'))
});

gulp.task('scripts:lib',function(){
  return gulp.src('src/scripts/libs/**/*.*')
  .pipe(gulp.dest('dist/public/libs'))
});

gulp.task('html',function(){
  return gulp.src('src/handlebars-index.html')
  .pipe(rename({basename: 'index'}))
  .pipe(gulp.dest('dist'))
});

gulp.task('default',['styles','scripts','images','icons','scripts:lib','html'], function(){
  gulp.watch("src/styles/**/*.less", ['styles','images','icons']);
  gulp.watch("src/scripts/**/*.js", ['scripts','scripts:lib']);
  gulp.watch("src/*.html", ['html']);
});