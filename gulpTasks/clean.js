var gulp = require('gulp');
var del = require('del');

gulp.task('clean:public', function (cb) {
	del([
		'./public/*'
	], cb);
});