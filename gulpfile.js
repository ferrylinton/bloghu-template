'use strict';

let gulp            = require('gulp');
let del             = require('del');
let rename          = require('gulp-rename');
let postcss         = require('gulp-postcss');
let autoprefixer    = require('autoprefixer');
let cleanCSS        = require('gulp-clean-css');
let sass            = require('gulp-sass');
let htmlmin 		= require('gulp-htmlmin');
let concat          = require('gulp-concat');
let sourcemaps      = require('gulp-sourcemaps');
let browserSync     = require('browser-sync').create();

let config = {
    paths: {
        src     : './src',
        target  : './dist',
    }
};

// Cleans out the target directory
gulp.task('clean', function () {
    return del([config.paths.target + '/static', config.paths.target + '/templates']);
});

// CSS
gulp.task('sass', function () {
    return gulp.src(config.paths.src + '/static/sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        // Required for Bootstrap CSS
        .pipe(postcss([ autoprefixer() ]))
        .pipe(gulp.dest(config.paths.target + '/static/css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(config.paths.target + '/static/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('sass:watch', function (done) {
    gulp.watch(config.paths.src + '/static/sass/**/*.scss', gulp.series('sass'));
    done();
});

// Javascript
gulp.task('script', function () {
    return gulp.src([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/popper.js/dist/umd/popper.js',
        './node_modules/bootstrap/js/dist/util.js',
        './node_modules/bootstrap/js/dist/dropdown.js',
        './node_modules/jquery-confirm/js/jquery-confirm.js',
        config.paths.src + '/static/js/fragment.js',
        config.paths.src + '/static/js/main.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.paths.target + '/static/js'))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(config.paths.target + '/static/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('script:watch', function (done) {
    gulp.watch(config.paths.src + '/static/js/**/*.js', gulp.series('script'));
    done();
});

// FONTS
gulp.task('font', function() {
    return  gulp.src([
        config.paths.src + '/static/font/*.*'
    ])
      .pipe(gulp.dest(config.paths.target + '/static/font'))
  });

gulp.task('font:watch', function (done) {
    gulp.watch(config.paths.src + '/static/font/*.*', gulp.series('font'));
    done();
});

// HTML
gulp.task('html', function () {
    return gulp.src(config.paths.src + '/templates/**/*.html')
    	.pipe(htmlmin({ 
    		collapseWhitespace: true,
    		removeComments: true
    		}))
        .pipe(gulp.dest(config.paths.target+ '/templates'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('html:watch', function (done) {
    gulp.watch(config.paths.src + '/templates/**/*.html', gulp.series('html'));
    done();
});

//IMAGE
gulp.task('image', function () {
    return gulp.src(config.paths.src + '/static/image/*.*')
        .pipe(gulp.dest(config.paths.target + '/static/image'));
});

gulp.task('image:watch', function (done) {
    gulp.watch(config.paths.src + '/static/image/*.*', gulp.series('image'));
    done();
});

//IMAGE
gulp.task('json', function () {
    return gulp.src(config.paths.src + '/json/*.*')
        .pipe(gulp.dest(config.paths.target + '/json'));
});

gulp.task('json:watch', function (done) {
    gulp.watch(config.paths.src + '/json/*.*', gulp.series('json'));
    done();
});

// Live-reload
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: [
                config.paths.target + '/templates', 
                config.paths.target + '/static', 
                config.paths.target + '/json'
            ]
        },
    });
});

gulp.task('watch',
            gulp.parallel('sass:watch', 'script:watch', 'font:watch', 'image:watch', 'json:watch', 'html:watch'));

gulp.task('serve',
            gulp.series('clean', 'sass', 'script', 'font', 'image', 'json', 'html',
            gulp.parallel('watch', 'browserSync')));

gulp.task('default',
            gulp.series('clean',
            gulp.parallel('sass', 'script', 'font', 'image', 'json', 'html')));
