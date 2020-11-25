const { src, dest } = require("gulp");
const rename = require("gulp-rename");
const minifyJs = require("gulp-uglify");
const image = require("gulp-image");
const babel = require("gulp-babel");
const sass = require("gulp-sass");
sass.compiler = require("node-sass");

const { watch } = require("gulp");

function html() {
  return src("src/index.html").pipe(dest("public/"));
}

function optimizeImage() {
  return src("src/images/*").pipe(image()).pipe(dest("public/images"));
}

function javascript() {
  return src("src/js/script.js")
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(minifyJs())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(dest("public/js"));
}

function sassCSS() {
  return src("src/sass/style.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(dest("public/css"));
}

exports.default = function () {
  watch("src/sass/*.scss", sassCSS);
  watch("src/js/script.js", javascript);
  watch("src/images/*", optimizeImage);
  watch("src/index.html", html);
};
