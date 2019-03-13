var gulp = require('gulp')

// 自动加载插件
// var $ = require('gulp-load-plugins')

var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var del = require('del')
var less = require('gulp-less')
var cleanCSS = require('gulp-clean-css')
var htmlMin = require('gulp-htmlmin')
var livereload = require('gulp-livereload')
var connect = require('gulp-connect')

// 注册任务
// gulp.task('task_name', function(){
// })

gulp.task('clean', () => {
    return del([
      'dist/**/*'
    ]);
  });

gulp.task('js',function(){
    return gulp.src('src/js/**/*.js')
      .pipe(concat('bundle.js'))  //临时合并文件
      .pipe(gulp.dest('dist/js/'))    // 临时输出
      .pipe(uglify())     //压缩
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('dist/')) //输出
      .pipe(livereload())
      .pipe(connect.reload())
});

gulp.task('less', function(){
    return gulp.src('src/less/*.less')
      .pipe(less()) //编译less文件到css文件
      .pipe(gulp.dest('src/css/'))
      .pipe(livereload())
      .pipe(connect.reload())
});

// 压缩css
//gulp.task('css',  ['less'], function() {  // gulp 3
gulp.task('css', gulp.series('less', function() {
    return gulp.src('src/css/*.css')
      .pipe(concat('bundle.css'))
      .pipe(rename({suffix: '.min'}))
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('dist/css/'))
      .pipe(livereload())
      .pipe(connect.reload())
}));

gulp.task('html', function(){
    return gulp.src('index.html')
      .pipe(htmlMin({collapseWhitespace:true}))
      .pipe(gulp.dest('dist/'))
      .pipe(livereload())
      .pipe(connect.reload())
});

gulp.task('delTmpFiles', function(){
  return del([
    'src/css/test3.css'
  ]);
});


// 注册默认任务
gulp.task('default', gulp.series('clean',  gulp.parallel('js', 'css', 'html'), 'delTmpFiles'));


//注册监视任务
gulp.task('watch', gulp.series('default', function(){
  livereload.listen();
  gulp.watch('src/js/*.js', gulp.series('js'));
  gulp.watch(['src/css/*.css', 'src/less/*.less'], gulp.series('css'));
  gulp.watch('src/*.html', gulp.series('html'));
}));

//注册监视任务(全自动)
gulp.task('server', gulp.series('default', function(){
  connect.server({
    root: '/',
    livereload: true,
    port: 5000
  });
  gulp.watch('src/js/*.js', gulp.series('js'));
  gulp.watch(['src/css/*.css', 'src/less/*.less'], gulp.series('css'));
  gulp.watch('src/*.html', gulp.series('html'));
}));
