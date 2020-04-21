"use strict";

const gulp = require("gulp");

const sass = require("gulp-sass");
const cleanCSS = require("gulp-cleancss");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const rename = require("gulp-rename");

const sourcemaps = require("gulp-sourcemaps");
const mergeStream = require("merge-stream");

const config = require("./gulpconfig");

const paths = {
  src: "./",
  build: "./"
};

function mergeSources(arr) {
  var srcArr = [];
  for (var i = 0; i < arr.length; i++) {
    srcArr = srcArr.concat(arr[i].src);
  }
  return srcArr;
}

function styles() {
  var streams = mergeStream();
  var cssPlugins = [
    autoprefixer({overrideBrowserslist: "last 2 versions", cascade: false}),
    cssnano()
  ];
  var scss = [config.scss.theme];
  scss.forEach(function (pack) {
    var stream = gulp
        .src(pack.src)
        // .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass(pack.sassOptions).on("error", sass.logError))
        .pipe(postcss(cssPlugins))
        .pipe(cleanCSS())
        .pipe(rename({suffix: ".min"}))
        .pipe(sourcemaps.write(pack.maps))
        .pipe(gulp.dest(pack.dest));
    streams.add(stream);
  });

  return streams.isEmpty() ? null : streams;
}

function watch() {
  gulp.watch(paths.src + "scss/**/*.scss", styles);
}

exports.styles = styles;
exports.watch = watch;

gulp.task("css-build", gulp.series(
    styles
));

gulp.task("build", gulp.series(
    gulp.parallel(styles)
));

gulp.task("build-watch", gulp.series(
    gulp.parallel(styles),
    gulp.parallel(watch)
));

gulp.task("default", gulp.series(
    gulp.parallel(styles),
));
