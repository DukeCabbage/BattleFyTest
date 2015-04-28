var gulp = require('gulp');
var runSequence = require('run-sequence');

var htmlFiles = [
	'views/*.html'
];

gulp.task('copy:html', function(){
  return gulp.src(htmlFiles)
  .pipe(gulp.dest('public'));
});

gulp.task('copy', function() {
  runSequence('clean:public', ['copy:html']);
});