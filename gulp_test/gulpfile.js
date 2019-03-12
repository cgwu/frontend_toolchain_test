var gulp = require('gulp');
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var del = require('del')

// 注册任务
// gulp.task('task_name', function(){
// })

gulp.task('clean', () => {
    return del([
      'dist/**/*.js'
    ]);
  });

gulp.task('js',function(){
    return gulp.src('src/js/**/*.js')
    .pipe(concat('bundle.js'))  //临时合并文件
    .pipe(gulp.dest('dist/js/'))    // 临时输出
    .pipe(uglify())     //压缩
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/')); //输出
})

// 注册默认任务
gulp.task('default', gulp.series('clean', gulp.parallel('js')))
