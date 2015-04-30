var gulp 			= require('gulp');
var less 			= require('gulp-less');
// var sourcemaps 		= require('gulp-sourcemaps');
var handleErrors 	= require('./util/handleErrors.js');

gulp.task('less', function () {
  return gulp.src(['client/styles/main.less'])
  // .pipe(sourcemaps.init())
    .pipe(less())
  //  .pipe(sourcemaps.write('./maps')) // can specify directory in write fn for sourcemaps
    .on('error', handleErrors)
    .pipe(gulp.dest('./build'));
});
