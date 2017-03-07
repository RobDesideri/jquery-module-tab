var sass = require('gulp-sass')
var gulp = require('gulp')
var umd = require('gulp-umd')

gulp.task('demoJs', function () {
  gulp.src('dist/JqueryModuleTab.js')
  .pipe(gulp.dest('demo/js/'))
})

gulp.task('demoAssets', function () {
  gulp.src('src/demo-assets/**/*')
  .pipe(gulp.dest('demo/'))
})

gulp.task('demoHtml', function () {
  gulp.src('src/index.html')
  .pipe(gulp.dest('demo/'))
})

gulp.task('demoCss', function () {
  gulp.src('dist/JqueryModuleTab.scss')
  .pipe(sass())
  .pipe(gulp.dest('demo/css/'))
})

gulp.task('distScss', function () {
  gulp.src('src/scss/JqueryModuleTab.scss')
  .pipe(gulp.dest('dist/'))
})

gulp.task('distJs', function () {
  gulp.src('src/js/JqueryModuleTab.js')
  .pipe(umd({
    dependencies: function (file) {
      return [
        {
          name: 'jquery',
          amd: 'jquery',
          cjs: 'jquery',
          global: 'jquery',
          param: 'jquery'
        }
      ]
    }
  }))
  .pipe(gulp.dest('dist/'))
})

gulp.task('dist', ['distJs', 'distScss'])
gulp.task('demo', ['demoJs', 'demoAssets', 'demoHtml', 'demoCss'])

