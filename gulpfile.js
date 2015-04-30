var gulp = require('gulp');
var requireDir = require('require-dir');
var runSequence = require('run-sequence');

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulpTasks', { recurse: true });

gulp.task('default', ['dev']);

// include plug-ins
var jshint = require('gulp-jshint');

// JS hint task
gulp.task('jshint', function() {
  gulp.src('./client/src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Main task sequence

gulp.task('dev', function() {
  runSequence('less', 'browserify', 'copy');
});