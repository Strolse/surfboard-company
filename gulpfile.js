const {src, dest, task, series, watch, parallel} = require("gulp");
const clean = require('gulp-clean');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const {DIST_PATH, SRC_PATH, STYLES_LIBS, JS_LIBS} = require('./src/gulp.config');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

task('copy:html', () => {
  return src(`${SRC_PATH}/*.html`).pipe(dest(DIST_PATH))
  .pipe(reload({stream: true }));
});

task('clean', () => {
  return src(`${DIST_PATH}/**/*`, {read: false})
      .pipe(clean());
});

task('styles', () => {
  return src([
    // ...STYLES_LIBS,
    `${SRC_PATH}/css/main.scss`
  ])
  .pipe(gulpif(env == "dev", sourcemaps.init()))
  .pipe(concat('main.min.scss'))
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  // .pipe(px2rem())
  .pipe(gulpif(env == "dev", autoprefixer({
    cascade: false
  }))
  )
  .pipe(gulpif(env == "prod", gcmq()))
  .pipe(gulpif(env == "prod", cleanCSS()))
  .pipe(gulpif(env == "dev", sourcemaps.write()))
  .pipe(dest(DIST_PATH))
  .pipe(reload({stream: true }));
});

task('scripts', () => {
  return src([
    // ...JS_LIBS, 
    `${SRC_PATH}/scripts/*.js`
  ])
  .pipe(gulpif(env == "dev", sourcemaps.init()))
  .pipe(concat('main.min.js'), {newLine: ";"})
  .pipe(gulpif(env == "prod", babel({
    presets: ['@babel/env']
})))
  .pipe(gulpif(env == "prod", uglify()))
  .pipe(gulpif(env == "dev", sourcemaps.write()))
  .pipe(dest(`${DIST_PATH}`))
  .pipe(reload({stream: true }));

});

task('icons', () => {
  return src(`${SRC_PATH}/img/icons/*.svg`)
  .pipe(svgo({
    plugins: [
      {
        removeAttrs: {
          attrs: "(fill|stroke|style|width|height|data.*)"
        }
      }
    ]
  }))
  .pipe(svgSprite({
    mode: {
      symbol: {
        sprite: "../sprite.svg"
      }
    }
  }))
  .pipe(dest(`${DIST_PATH}/img/icons`))
});

task('copy:images', () =>{
  return src(`${SRC_PATH}/img/**/*.*`)
  .pipe(dest(`${DIST_PATH}/img/`))
})

task('copy:video', () =>{
  return src(`${SRC_PATH}/video/**/*.*`)
  .pipe(dest(`${DIST_PATH}/video/`))
})

task('server', () => {
  browserSync.init({
      server: {
          baseDir: `./${DIST_PATH}`
      }
  });
});

task('watch', () => {
  watch(`./${SRC_PATH}/css/**/*`, series('styles'))
  watch(`./${SRC_PATH}/*.html`, series('copy:html'))
  watch(`./${SRC_PATH}/*.js`, series('scripts'))
  watch(`./${SRC_PATH}/img/**/*.*`, series('copy:images')) 
  watch(`./${SRC_PATH}/video/**/*.*`, series('copy:video')) 
  watch(`./${SRC_PATH}/img/icons/*.svg`, series('icons'))  
})

task('default',
 series('clean', 
 parallel('copy:html', 'styles', 'copy:images', 'copy:video', 'scripts', 'icons'), 
 parallel('watch', 'server')));

 task('build',
 series('clean', 
 parallel('copy:html', 'styles', 'copy:images', 'copy:video', 'scripts', 'icons') 
 ));
