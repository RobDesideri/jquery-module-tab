var sass = require('gulp-sass')
var gulp = require('gulp')

gulp.task('js', function () {
  gulp.src('src/js/**/*.js')
  .pipe(gulp.dest('demo/js/'))
})

gulp.task('assets', function () {
  gulp.src('src/demo-assets/**/*')
  .pipe(gulp.dest('demo/'))
})

gulp.task('html', function () {
  gulp.src('src/index.html')
  .pipe(gulp.dest('demo/'))
})

gulp.task('sass', function () {
  gulp.src('src/scss/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('demo/css/'))
})

gulp.task('default', ['js', 'assets', 'sass', 'html'])
