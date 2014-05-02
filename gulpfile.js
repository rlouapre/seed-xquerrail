var gulp = require('gulp');
var gutil = require('gulp-util');

var fs = require('fs');
var pkg = require('./package.json');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var bump = require('gulp-bump');
// var replace = require('gulp-replace');
var template = require('gulp-template');
var header = require('gulp-header');
var git = require('gulp-git');
var gitinfo = require('gulp-gitinfo')
var es   = require('event-stream')

var xray = require('gulp-xray-runner')
var argv = require('yargs').argv;

var ml = argv.ml;
var version = pkg.version;
var lastCommit;

gulp.task('update-xqy', ['last-git-commit'], function (cb) {
  gulp.src(['src/_framework/*.xqy'])
    .pipe(header(fs.readFileSync('header.txt', 'utf8')))
    .pipe(template({version: version, lastcommit: lastCommit}))
    .pipe(gulp.dest('./dist/src/_framework'));
  cb();
});

gulp.task('last-git-commit', function() {
  return gitinfo()
    .pipe(es.map(function(data, cb) {
      lastCommit = data['\'local.branch.current.SHA,\' '];
      cb();
    }))
})

gulp.task('lint', function () {
});

gulp.task('xray', function (cb) {
  var options = {
  /* https://github.com/mikeal/request#http-authentication */
    auth: {
      username: ml.username,
      password: ml.password,
      sendImmediately: false
    },
    url: 'http://' + ml.host + ':' + ml.port + '/_framework/lib/xray',
    testDir: '_framework/test',
    files: ['_framework/test/**/*.xqy']
  };
  xray(options, cb);
});

gulp.task('clean', function () {
  return gulp.src('./dist', { read: false })
    .pipe(clean());
});

gulp.task('my', function (cb) {
  var pkg = require('./package.json');
  var v = 'v' + pkg.version;
  var message = 'Release ' + v;

  /*return*/ gulp.src(['./*', '!node_modules/'])
  // .pipe(gutil.log())
    .pipe(git.commit(message, {args: '-v'}))
    .pipe(git.tag(v, message, {}, cb))
    .pipe(git.push('origin', 'master', '--tags'))
    .pipe(gulp.dest('./'));

  cb();
});

gulp.task('tag', ['build'], function (cb) {
  var pkg = require('./package.json');
  var v = 'v' + pkg.version;
  var message = 'Release ' + v;

  /*return*/ gulp.src(['./*', '!node_modules/'])
    .pipe(git.commit(message))
    .pipe(git.tag(v, message, {}, cb))
    .pipe(git.push('origin', 'master', '--tags'))
    .pipe(gulp.dest('./'));
  cb();
});

gulp.task('bump', function () {
  return gulp.src(['./package.json'])
    .pipe(bump())
    .pipe(gulp.dest('./'));
});

// gulp.task('npm', function (done) {
//   require('child_process').spawn('npm', ['publish'], { stdio: 'inherit' })
//     .on('close', done);
// });

gulp.task('build', ['test', 'clean', 'update-xqy'], function (cb) {
  cb();
  // return gulp.src('./src/contra.js')
  //   .pipe(gulp.dest('./dist'))
  //   .pipe(rename('contra.min.js'))
  //   .pipe(uglify())
  //   // .pipe(size())
  //   .pipe(gulp.dest('./dist'));
});

gulp.task('release', ['build'], function () {
  // build is complete, release the kraken!
});

gulp.task('test', ['lint', 'xray']);
gulp.task('default', ['clean', 'test', 'build']);