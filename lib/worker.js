'use strict';

var uglifyJS = require('uglify-js'),
  mkdirp = require('mkdirp'),
  path = require('path'),
  fs = require('fs');

module.exports = function(dirIn, dirOut, file, next){
  var outPath = path.resolve(dirOut, file);
  mkdirp(path.dirname(outPath), function(err){
    if(err){
      return void next(err);
    }
    try {
      var output = uglifyJS.minify(path.resolve(dirIn, file)).code;
      fs.writeFile(outPath, output, next);
    }catch(e){
      next(e);
    }
  });
};