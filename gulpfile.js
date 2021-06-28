const srcFolder = "app";
const distFolder = "dist";
const path = {
  app: {
    html: srcFolder + "/*.html",
    css: srcFolder + "/css/*.css",
    js: srcFolder + "/js/*.js",
    img: srcFolder + "/img/**/*",
    fonts: srcFolder + "/fonts/*.ttf"
  },
  dist: {
    html: distFolder + "/",
    css: distFolder + "/css/",
    js: distFolder + "/js/",
    img: distFolder + "/img/",
    fonts: distFolder + "/fonts/",
  },
  clean: "./" + distFolder + "/"
};

const { src, dest, series, parallel } = require('gulp'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify-es').default,
  imagemin = require('gulp-imagemin'),
  newer = require('gulp-newer'),
  ttf2woff = require('gulp-ttf2woff'),
  ttf2woff2 = require('gulp-ttf2woff2'),
  fonter = require('gulp-fonter'),
  del = require('del');

function html() {
  return src(path.app.html)
    .pipe(dest(path.dist.html))
};

function css() {
  return src(path.app.css)
    .pipe(dest(path.dist.css))
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(rename({
      extname: ".min.css"
    }))
    .pipe(dest(path.dist.css))
};

function js() {
  return src(path.app.js)
    .pipe(uglify())
    .pipe(dest(path.dist.js))
};

function image() {
  return src(path.app.img)
    .pipe(newer(path.dist.img))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      interlaced: true,
      optimizationLevel: 3
    }))
    .pipe(dest(path.dist.img))
};

function otf2ttf() {
  return src([srcFolder + '/fonts/*.otf'])
    .pipe(fonter({
      formats: ['ttf']
    }))
    .pipe(dest(srcFolder + '/fonts/'))
};

function fonts2woff() {
  src(path.app.fonts)
    .pipe(ttf2woff())
    .pipe(dest(srcFolder + '/fonts/'))
  return src(path.app.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(srcFolder + '/fonts/'))
};

function fontsBuild() {
  return src(srcFolder + '/fonts/*.{woff,woff2}')
    .pipe(dest(path.dist.fonts))
};

function clean() {
  return del(path.clean)
};

exports.html = html;
exports.css = css;
exports.js = js;
exports.image = image;
exports.otf2ttf = otf2ttf;
exports.fonts2woff = fonts2woff;
exports.fontsBuild = fontsBuild;
exports.clean = clean;

exports.fonts = series(otf2ttf, fonts2woff);
exports.build = series(clean, parallel(html, css, js, images, fontsBuild));