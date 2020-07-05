const gulp = require("gulp");
const sass = require ("gulp-sass");
const plumber = require("gulp-plumber");
const postcss = require ("gulp-postcss");
const autoprefixer = require("autoprefixer");
const server = require ("browser-sync").create();
const imagemin = require('gulp-imagemin');
const svgstore = require("gulp-svgstore");
const cheerio = require("gulp-cheerio");
const rename = require('gulp-rename');
const replace = require("gulp-replace");
const webp = require('gulp-webp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

gulp.task("minify", function () {
    return gulp.src("source/js/**/*.src.js")
        .pipe(plumber())
        .pipe(babel({
            presets: ['@babel/env']
          }))
          .pipe(rename(function (path) {
              let amountSimbolFileName = path.basename.lastIndexOf('.');
              let fileName = path.basename.slice(0, amountSimbolFileName);
            path.basename = fileName,
            path.extname = '.js';
            }))
        .pipe(gulp.dest("build/js/"))
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.basename += ".min";
        }))
        .pipe(gulp.dest("build/js/"));
});


gulp.task('webp', () =>
    gulp.src('source/img/**/*.{jpg,png}')
        .pipe(webp())
        .pipe(gulp.dest('build/img/webp/'))
);

gulp.task("svg-sprite", function () {
    return gulp.src("source/img/svg/*.svg")
    .pipe(svgstore({
    inlineSvg: true
    }))
    .pipe(cheerio({
    run: function ($) {
    $('[fill]').removeAttr('fill');
    $('[stroke]').removeAttr('stroke');
    $('[style]').removeAttr('style');
    },
    parserOptions: {
    xmlMode: true
    }
    }))
    
    .pipe(replace('&gt;', '>'))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img/"));
    });


gulp.task("style", function () {
    return gulp.src('source/scss/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss(
            [autoprefixer({
                grid: "autoplace",
                overrideBrowserslist: ['last 2 versions', 'Firefox > 20']
            })]
        ))
        .pipe(gulp.dest('build/css'))
        .pipe(server.stream());
});

gulp.task("copyhtml", function () {
    return gulp.src("source/*.html")
        .pipe(gulp.dest("build/"));
});

gulp.task("copyjs", function () {
    return gulp.src("source/js/assets/*.js")
        .pipe(gulp.dest("build/js/assets/"));
});

gulp.task("copyfonts", function () {
    return gulp.src(["source/fonts/*.{woff,woff2}"])
        .pipe(gulp.dest("build/fonts"));
});

gulp.task("img", function () {
    return gulp.src(["source/img/**/*.{jpg,png}"])
        .pipe(imagemin([
            imagemin.mozjpeg(),
            imagemin.optipng()
        ]))
        .pipe(gulp.dest("build/img"))
        .pipe(server.stream());
});


gulp.task("build", gulp.series (
    "style",
    "copyhtml",
    "copyfonts",
    "img",
    "svg-sprite",
    "webp",
    "minify",
    "copyjs"
));

gulp.task("serve", function () {
    server.init({
        server:"build/",
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    gulp.watch(["source/scss/**/*.scss"], gulp.parallel(["style"]));
    gulp.watch(["source/*.html"], gulp.parallel(["copyhtml"]));
    gulp.watch(["source/fonts/*.{woff,woff2}"], gulp.parallel(["copyfonts"]));
    gulp.watch(["source/img/**/*.{jpg,png,svg}"], gulp.parallel(["img"]));
    gulp.watch("source/*.html").on("change", server.reload);
    gulp.watch('source/js/**/*.src.js', gulp.parallel(['minify']));
});


