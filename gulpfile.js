'use strict';
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var sassLint = require('gulp-sass-lint');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyhtml = require('gulp-minify-html');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

var src = 'public/src';
var dist = 'public/dist';

var paths = {
  js: src + '/js/*.js',
  scss: src + '/scss/*.scss',
  html: src + '/**/*.html',
  notnodemodules: '!node_modules/**'
};

gulp.task('eslint', () => {
  return gulp.src([paths.js, paths.notnodemodules])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('sclint', function () {
  return gulp.src(paths.scss)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

// 웹서버를 localhost:8000 로 실행한다.
gulp.task('server', function () {
  return gulp.src(dist + '/')
    .pipe(webserver());
});

// 자바스크립트 파일을 하나로 합치고 압축한다.
gulp.task('combine-js', function () {
  return gulp.src(paths.js)
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dist + '/js'));
});

// sass 파일을 css 로 컴파일한다.
gulp.task('compile-sass', function () {
  return gulp.src(paths.scss)
    .pipe(sass())
    .pipe(gulp.dest(dist + '/css'));
});

// HTML 파일을 압축한다.
gulp.task('compress-html', function () {
  return gulp.src(paths.html)
    .pipe(minifyhtml())
    .pipe(gulp.dest(dist + '/'));
});

// 파일 변경 감지 및 브라우저 재시작
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(paths.js, ['combine-js']);
  gulp.watch(paths.scss, ['compile-sass']);
  gulp.watch(paths.html, ['compress-html']);
  gulp.watch(dist + '/**').on('change', livereload.changed);
  gulp.watch(paths.js, ['eslint']);
  gulp.watch(paths.scss, ['sclint']);
});

//기본 task 설정
gulp.task('default', ['eslint', 'sclint',
  'server', 'combine-js',
  'compile-sass', 'compress-html',
  'watch']);