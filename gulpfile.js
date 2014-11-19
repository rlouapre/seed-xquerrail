var gulp = require('gulp');
var gutil = require('gulp-util');

var fs = require('fs');
var pkg = require('./package.json');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var git = require('gulp-git');
var gitinfo = require('gulp-gitinfo')
var es   = require('event-stream')
var xray = require('gulp-xray-runner')
var argv = require('yargs').argv;
var mocha = require('gulp-mocha');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');

var inject = require('gulp-inject');
var bowerFiles = require('main-bower-files')
var es = require('event-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

var TARGET_PATH = 'dist';
var SOURCE_PATH = 'src';
var MAIN_PATH = SOURCE_PATH + '/main';
var RESOURCES_PATH = MAIN_PATH + '/resources';
var APP_PATH = MAIN_PATH + '/app';
var APP_RESOURCES_PATH = APP_PATH + '/resources';
var TEMPLATES_PATH = APP_PATH + '/templates';
var path = {
  target: {
    root: TARGET_PATH,
    styles: TARGET_PATH + '/main/app/resources/css',
    javascript: TARGET_PATH + '/main/app/resources/js'
  },
  source: {
    root: SOURCE_PATH,
    xquerrail: MAIN_PATH + '/node_modules/xquerrail2.framework/dist/',
    resources: RESOURCES_PATH,
    bowerComponents: RESOURCES_PATH + '/bower_components',
    application: {
      root: APP_PATH,
      styles: APP_RESOURCES_PATH + '/css',
      fonts: APP_RESOURCES_PATH + '/fonts',
      javascript: APP_RESOURCES_PATH + '/js',
      templates: {
        head: TEMPLATES_PATH + '/head.html.xqy',
        scripts: TEMPLATES_PATH + '/scripts.html.xqy'
      }
    }
  }
};

var ml;
try {
  ml = require('./ml.json')
} catch (e) {
  ml = argv.ml;
}
var version = pkg.version;
var lastCommit;

module.exports.ml = ml;

gulp.task('copy', function (cb) {
  var xquerrailStream = gulp.src(path.source.xquerrail + '**/*.xqy', {base: path.source.root});
  xquerrailStream
    .pipe(gulp.dest(path.target.root))
    .on('end', cb);

  var appStrem = gulp.src(['./src/base.xqy', MAIN_PATH + '/_config/**/*.xml', MAIN_PATH + '/_extensions/**/*.xqy', path.source.application.root + '/**/*.xqy', path.source.application.root + '/**/*.xml'], {base: path.source.root})
  appStrem
    .pipe(gulp.dest(path.target.root));
});

gulp.task('clean', function () {
  return gulp.src(path.target.root, { read: false })
    .pipe(clean());
});

gulp.task('fonts', function () {
  var target = gulp.src(path.source.application.fonts + '/*.*', {base: path.source.root});
  return target
    .pipe(gulp.dest(path.target.root));
});

gulp.task('styles', function () {
  var bowerOptions = {
    filter: '**/*.css',
    paths: {
      bowerDirectory: path.source.bowerComponents,
      bowerJson: path.source.resources + '/bower.json'
    }
  };

  var transform = function (filepath) {
    return '<link rel="stylesheet" href="'+filepath+'"/>';
  };

  var target = gulp.src(path.source.application.templates.head, {base: path.source.root});

  // Concatenate vendor styles
  var vendorStream = gulp.src(bowerFiles(bowerOptions))
    .pipe(concat('vendors.css'))
    .pipe(gulp.dest(path.target.styles));

  var appStream = gulp.src(path.source.application.styles + '/**/*.css')
    .pipe(concat('app.css'))
    .pipe(gulp.dest(path.target.styles));

  var bootstrapMapStream = gulp.src(path.source.bowerComponents + '/bootstrap/dist/css/bootstrap.css.map')
    .pipe(gulp.dest(path.target.styles));

  return target
    .pipe(inject(es.merge(vendorStream), {name: 'bower', ignorePath: path.target.root, transform: transform}))
    .pipe(inject(es.merge(appStream), {name: 'app', ignorePath: path.target.root, transform: transform}))
    .pipe(gulp.dest(path.target.root));
});

gulp.task('javascript', function () {
  var bowerOptions = {
    filter: '**/*.js',
    paths: {
      bowerDirectory: path.source.bowerComponents,
      bowerJson: path.source.resources + '/bower.json'
    }
  };

  var target = gulp.src(path.source.application.templates.scripts, {base: path.source.root});

  // Concatenate xquerrail scripts
  var xquerrailStream = gulp.src(path.source.resources + '/js/**/*.js')
    .pipe(concat('xquerrail.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest(path.target.javascript));

  // Concatenate application scripts
  var appStream = gulp.src(path.source.application.javascript + '/**/*.js')
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest(path.target.javascript));

  // Concatenate vendor scripts
  var vendorStream = gulp.src(bowerFiles(bowerOptions))
    .pipe(concat('vendors.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.target.javascript));

  return target
    .pipe(inject(es.merge(vendorStream), {name: 'bower', ignorePath: path.target.root}))
    .pipe(inject(es.merge(xquerrailStream), {name: 'xquerrail', ignorePath: path.target.root}))
    .pipe(inject(es.merge(appStream), {name: 'app', ignorePath: path.target.root}))
    .pipe(gulp.dest(path.target.root));
});

gulp.task('build', ['clean'], function () {
  runSequence('copy', 'fonts', 'styles', 'javascript', function() {
    console.log('Build completed.');
  });
});

gulp.task('release', ['build'], function () {
  // build is complete, release the kraken!
});

gulp.task('default', ['build'], function() {
});
