/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   If the watch task is running, this uses watchify instead
   of browserify for faster bundling using caching.
*/

var browserify   = require('browserify');
var watchify     = require('watchify');
var gulp         = require('gulp');
var handleErrors = require('./util/handleErrors');
var source       = require('vinyl-source-stream');

// process.env.BROWSERIFYSHIM_DIAGNOSTICS=1;

var createBrowserifyTask = function(entryPoints, destFile) {
    return (function() {
        var bundler = browserify({
            // Required watchify args
            cache: {}, packageCache: {}, fullPaths: true,
            // Specify the entry point of your app
            entries: entryPoints,
            // Add file extentions to make optional in your requires
            // extensions: ['.coffee', '.hbs'],
            // Enable source maps:
            debug: true
        });

        var bundle = function() {
            var bundleLogger = require('../util/bundleLogger');
            // Log when bundling starts
            bundleLogger.start();

            return bundler
              .bundle()
              // Report compile errors
              .on('error', handleErrors)
              // Use vinyl-source-stream to make the
              // stream gulp compatible. Specifiy the
              // desired output filename here.
              .pipe(source(destFile))
              // Specify the output destination
              .pipe(gulp.dest('build/'))
              // Log when bundling completes!
              .on('end', bundleLogger.end);
        };

        if(global.isWatching) {
            bundler = watchify(bundler);
            // Rebundle with watchify on changes.
            bundler.on('update', bundle);
        }

        return bundle();
    });
}

gulp.task('browserify_basicInfo',
        createBrowserifyTask('./client/basicInfo/main.js', 'bundle_basicInfo.js'));
gulp.task('browserify', [browserify_basicInfo]);