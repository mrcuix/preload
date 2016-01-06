var gulp = require('gulp'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    watchify = require('watchify'),
    babel = require("gulp-babel");

gulp.task('connectSrc', function() {
  connect.server({
    root: './',
    port: 8080
  });
});

gulp.task('compress-es6', function() {
  return gulp.src('./src/js/preload-es6.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    // .pipe(uglify())
    .pipe(gulp.dest('./es6-demo/'));
});

gulp.task('compress', function() {
  return gulp.src('./src/js/preload.js')
    .pipe(uglify())
    .pipe(gulp.dest('./demo/'));
});

// gulp.task('babel', function() {
//   return gulp.src('./ES6/*.js')
//     .pipe(babel())
//     //.pipe(uglify())
//     .pipe(gulp.dest('./dist/ES6'));
// })

gulp.task('watch', function() {
  gulp.watch('./src/js/*.js', ['compress']);
  // gulp.watch('./ES6/*.js', ['babel']);
});

gulp.task('watch-es6', function() {
  gulp.watch('./src/js/*.js', ['compress-es6']);
  // gulp.watch('./ES6/*.js', ['babel']);
});

// gulp.task('lint', function() {
//   return gulp.src('./src/*.js')
//     .pipe(jshint())
//     .pipe(jshint.reporter('YOUR_REPORTER_HERE'));
// });

// gulp.task('scripts', function() {
//     // Single entry point to browserify 
//     gulp.src('./src/js/index.js')
//         .pipe(browserify({
//           insertGlobals : true,
//           debug : false
//         }))
//         .pipe(gulp.dest('./src/build/'))
// });

gulp.task('default', ['watch', 'connectSrc', 'compress']);
gulp.task('es6', ['watch-es6', 'connectSrc', 'compress-es6']);