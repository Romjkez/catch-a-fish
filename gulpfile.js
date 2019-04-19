const gulp = require('gulp');
const del = require('del');
const postcss = require('gulp-postcss');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const path = {
    css: {
        in: ['./css/*.css'],
        out: './build/css/'
    },
    js: {
        in: ['./js/*.js'],
        out: './build/js/'
    },
    other: {
        in: ['*.html', './img'],
        out: './build'
    }
};

/**
 * @description Remove build directory
 * @returns {Promise<string[]>}
 */
function clean() {
    return del(['./build'])
}

/**
 * @description
 * @returns {Promise<*>}
 */
async function css() {
    const plugins = [
        autoprefixer({browsers: ['last 2 versions']}),
        cssnano()
    ];
    return gulp.src(path.css.in)
        .pipe(postcss(plugins))
        .pipe(gulp.dest(path.css.out));
}

/**
 * @description Transpile to ES5 and minify
 * @returns {Promise<*>}
 */
async function js() {
    return gulp.src(path.js.in)
        .pipe(babel())
        .pipe(uglify({
            toplevel: true
        }))
        .pipe(gulp.dest(path.js.out))
}

async function moveFiles() {
    return gulp.src(path.other.in)
        .pipe(gulp.dest(path.other.out))
}

async function defaultTask() {
    clean()
        .then(() => {
            css();
            js();
            moveFiles();
        });
}

exports.css = css;
exports.js = js;
exports.moveFiles = moveFiles();
exports.default = defaultTask;
