var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('copy:html', function(){
  return gulp.src([
		'views/*.html'
	])
  .pipe(gulp.dest('public'));
});

gulp.task('copy:img', function(){
  return gulp.src([
		'images/*.png',
		'images/favicon.ico'
	])
  .pipe(gulp.dest('public/img'));
});

gulp.task('copy:js', function(){
  return gulp.src([
    'build/*.js'
	])
  .pipe(gulp.dest('public/js'));
});


gulp.task('copy', function() {
  runSequence('clean:public', ['copy:img', 'copy:js']);
});