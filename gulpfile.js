var gulp = require('gulp');
var gutil = require('gulp-util');

var fs = require('fs');
var pkg = require('./package.json');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var bump = require('gulp-bump');
var template = require('gulp-template');
var header = require('gulp-header');
var git = require('gulp-git');
var gitinfo = require('gulp-gitinfo')
var es   = require('event-stream')
var xray = require('gulp-xray-runner')
var argv = require('yargs').argv;

var ml;
try {
  ml = require('./ml.json')
} catch (e) {
  ml = argv.ml;
}
var version = pkg.version;
var lastCommit;

gulp.task('update-xqy', ['last-git-commit'], function (/*cb*/) {
  return gulp.src(['src/main/**/*.xqy'])
    .pipe(header(fs.readFileSync('header.txt', 'utf8')))
    .pipe(template({version: version, lastcommit: lastCommit}))
    .pipe(gulp.dest('./dist'));
  // cb();
});

gulp.task('last-git-commit', function() {
  return gitinfo()
    .pipe(es.map(function(data, cb) {
      lastCommit = data['\'local.branch.current.SHA,\' '];
      cb();
    }))
})

gulp.task('coverage', function () {
});

gulp.task('lint', function () {
});

gulp.task('xray', function (cb) {
  var options = {
    /* https://github.com/mikeal/request#http-authentication */
    auth: {
      username: ml.user,
      password: ml.password,
      sendImmediately: false
    },
    url: 'http://' + ml.host + ':' + ml.port + '/main/_framework/lib/xray',
    testDir: 'test',
    files: ['test/**/*.xqy']
  };
  xray(options, cb);
});

gulp.task('clean', function () {
  return gulp.src('./dist', { read: false })
    .pipe(clean());
});

gulp.task('tag', ['build'], function (/*cb*/) {
  var options = {
    args: '-v'
  };
  var pkg = require('./package.json');
  var v = 'v' + pkg.version;
  var message = 'Release ' + v;

  return gulp.src(['./*', '!node_modules/'])
    .pipe(git.commit(message, options))
    .pipe(git.tag(v, message, 
      git.push('origin', 'master', {args: '--tags'})
      .end()
    ));
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

gulp.task('test', ['coverage', 'lint', 'xray']);
gulp.task('default', ['test', 'clean', 'build']);