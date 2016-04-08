"use strict"

var gulp        = require('gulp'),
	browserSync = require('browser-sync').create(),
	sass        = require('gulp-sass'),
	prefixer	= require('gulp-autoprefixer'),
	imagemin	= require('gulp-imagemin'),
	pngquant	= require('imagemin-pngquant'),
    notify      = require("gulp-notify"),
    zip         = require('gulp-zip');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: {
        	baseDir: ''
        },
        stream: true
    });

    gulp.watch(['scss/*.scss', 'fonts/*.scss'], ['sass']);
    gulp.watch("index.html").on('change', browserSync.reload);
    gulp.watch("css/*.css").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['scss/*.scss', 'fonts/*.scss'])  
        .pipe(sass())
        .on("error", notify.onError({
            message: "Ошибка: <%= error.message %>",
            title: "Ошибка запуска"}))
        .pipe(prefixer({
        	browsers: ['ie 8', 'last 15 versions']
        }))
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

gulp.task('img', function() {
    return gulp.src('img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('img'));
});

gulp.task('finish', ['img'], function() {
    return gulp.src(['!node_modules/**/*','**/*', '!bower.json', '!package.json', '!gulpfile.js', '!browserconfig.xml', '!.gitgnore', '!.git', '!.bowerrc'])
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest(''));
});

gulp.task('default', ['serve']);