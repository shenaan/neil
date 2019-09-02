'use strict';

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create(),
  autoprefixer = require('gulp-autoprefixer'),
  rename = require('gulp-rename'),
  svgmin = require('gulp-svgmin'),
  svgstore = require('gulp-svgstore'),
  cheerio = require('gulp-cheerio'),
  webp = require('gulp-webp'),
  imagemin = require('gulp-imagemin'),
  imageminPngquant = require('imagemin-pngquant'),
  imageminMozjpeg = require('imagemin-mozjpeg'),
  cssnano = require('gulp-cssnano'),
  uglify = require('gulp-uglify'),
  babel = require('gulp-babel');

// Development Tasks
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: '.'
    },
    notify: false
  });

  gulp.watch('./scss/**/**/*.scss', gulp.parallel('sass'));
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch(
    './js/**/main.js',
    gulp.parallel('scripts')
  );
});

gulp.task('sass', function() {
  return gulp
    .src('./scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    // .pipe(gulp.dest('./css'))
    .pipe(cssnano())
    .pipe(rename('main.css'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  return gulp
    .src('./js/main.js')
    .pipe(rename('main.min.js'))
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream());
});

// Watchers
gulp.task('watch', gulp.series('sass', 'browserSync'));

// Optimization Tasks
gulp.task('webp', () =>
  gulp
    .src('./img/hero_*.{jpg,png}')
    .pipe(webp())
    .pipe(gulp.dest('./img/'))
);

gulp.task('imagemin', () =>
  gulp
    .src('img/*.{jpg,png}')
    .pipe(
      imagemin(
        [
          (imageminPngquant({
            speed: 1,
            quality: 98 //lossy settings
          }),
          imageminMozjpeg({
            quality: 90
          }))
        ],
        {
          verbose: true
        }
      )
    )
    .pipe(gulp.dest('img/'))
);

// Sprites
gulp.task('sprite', function() {
  return gulp
    .src('./img/icon-*.svg')
    .pipe(svgmin())
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(
      cheerio({
        run: function($) {
          $('[fill]').removeAttr('fill');
          $('svg').attr('style', 'display:none');
        },
        parserOptions: { xmlMode: true }
      })
    )
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('./img/'));
});
