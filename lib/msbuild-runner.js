'use strict';

var commandBuilder = require('./msbuild-command-builder');
var gutil = require('gulp-util');
var childProcess = require('child_process');

module.exports.startMsBuildTask = function (options, file, callback) {
  
  var command = commandBuilder.construct(file, options);
  var execOptions = { maxBuffer: options.maxBuffer };
  
  // var cp = childProcess.exec(command, execOptions, function (err) {
  //   if (err) {
  //     gutil.log(err);
  //     gutil.log(gutil.colors.red('Build failed!'));
  //     if (options.errorOnFail) {
  //       return callback(err);
  //     }
  //   } else {
  //     gutil.log(gutil.colors.cyan('Build complete!'));
  //   }

  //   return callback();
  // });

  // if (options.stdout && cp) {
  //   cp.stdout.pipe(process.stdout);
  // }

  // if (options.stderr && cp) {
  //   cp.stderr.pipe(process.stderr);
  // }

    var msbuild = childProcess.spawn(command, execOptions);

    msbuild.stdout.on('data', function(message) { console.log(message); });
    msbuild.stderr.on('data', function(message) { console.error(message); });

    msbuild.on('exit', callback);   
};

