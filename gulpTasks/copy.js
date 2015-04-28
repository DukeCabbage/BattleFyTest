var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('copy:html', function(){
  return gulp.src([
		'views/*.html'
	])
  .pipe(gulp.dest('public'));
});

gulp.task('copy:js', function(){
  return gulp.src([
    'build/*.js'
	])
  .pipe(gulp.dest('public/js'));
});


gulp.task('copy', function() {
  runSequence('clean:public', ['copy:html', 'copy:js']);
});