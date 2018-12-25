'use strict';

let gulp = require('gulp');
let del = require('del');
let rename = require('gulp-rename');
let postcss = require('gulp-postcss');
let autoprefixer = require('autoprefixer');
let cleanCSS = require('gulp-clean-css');
let sass = require('gulp-sass');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let sourcemaps = require('gulp-sourcemaps');
let browserSync = require('browser-sync').create();

let config = {
    paths: {
        src: './src',
        target: './dist',
    }
};

// Cleans out the target directory
gulp.task('clean', function () {
    return del(config.paths.target);
});

// CSS
gulp.task('sass', function () {
    return gulp.src(config.paths.src + '/static/sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest(config.paths.target + '/static/css'))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
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
gulp.task('script1', function () {
    return gulp.src([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/popper.js/dist/umd/popper.js',
        './node_modules/bootstrap/js/dist/util.js',
        './node_modules/bootstrap/js/dist/dropdown.js',
        './node_modules/jquery-confirm/js/jquery-confirm.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.paths.target + '/static/js'))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(config.paths.target + '/static/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('script2', function () {
    return gulp.src([
        config.paths.src + '/static/js/thymeleaf.js'
    ])
        .pipe(gulp.dest(config.paths.target + '/static/js'))
});

gulp.task('script', gulp.parallel('script1', 'script2'));

gulp.task('script:watch', function (done) {
    gulp.watch(config.paths.src + '/static/js/**/*.js', gulp.series('script'));
    done();
});

// FONTS
gulp.task('font', function () {
    return gulp.src([
        config.paths.src + '/static/font/*.*'
    ])
        .pipe(gulp.dest(config.paths.target + '/static/font'))
});

gulp.task('font:watch', function (done) {
    gulp.watch(config.paths.src + '/static/font/*.*', gulp.series('font'));
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
                config.paths.src + '/templates',
                config.paths.target + '/static',
                config.paths.target + '/json'
            ]
        },
    });
});

gulp.task('watch',
    gulp.parallel('sass:watch', 'script:watch', 'font:watch', 'image:watch', 'json:watch'));

gulp.task('serve',
    gulp.series('clean', 'sass', 'script', 'font', 'image', 'json',
        gulp.parallel('watch', 'browserSync')));

gulp.task('default',
    gulp.series('clean',
        gulp.parallel('sass', 'script', 'font', 'image', 'json')));
