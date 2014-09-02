var assert = require('assert'),
    grunt = require('grunt'),
    mspec = require('../tasks/mspec.js');

    var options = {};
    var oneSpecFile = { src: 'Spec.dll' };

describe('MSpec parameter handling', function(){
  describe('If ONE *.dll is passed to grunt-dotnet-mspec', function(){
    it('should grep this ONE', function(){
      var command = mspec.buildCommand(grunt, oneSpecFile, options);
      assert.equal(command.args[0], 'Spec.dll');
    });
  });

  describe('If TWO *.dlls are passed to grunt-dotnet-mspec', function(){
    it('should grep these TWO', function(){

    });
  });
});
