/*
 * grunt-dotnet-mspec
 * https://github.com/marcofranssen/grunt-dotnet-mspec
 *
 * Copyright (c) 2014 Marco Franssen
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path'),
  log = require('../lib/mspec.log'),
  Command = require('../lib/mspec.command'),
  name = 'mspec',
  description = 'Grunt plugin to run Machine.Specfication tests';

module.exports = function(grunt) {

  grunt.registerMultiTask(name, description, function() {

    var options = this.options({
      platform: 'anycpu',
      timeinfo: true,
      output: 'reports/mspec'
    });
    var files = this.files;
    var taskComplete = this.async();

    var command = new Command(grunt, files, options);

    var mspecProcess = grunt.util.spawn({
      cmd: command.path,
      args: command.args,
      opts: {
        stdio: 'inherit'
      }
    }, function(err, result, code) {
      if (code > 0) {
        grunt.fail.fatal('Tests failed');
      }
      String(result);
      taskComplete(code === 0);
    });

    mspecProcess.on('error', function(err) {
      grunt.fail.fatal(err.code === 'ENOENT' ? 'Unable to find the mspec executable located at "' + command.path + '".' : err.message);
    });
  });

};