'use strict';

var readDir = require('readdir'),
  async = require('async');

var workerFarm = require('worker-farm'),
  worker = workerFarm(require.resolve('./worker'));

module.exports = function(dirIn, dirOut){
  console.time("uglifydir");
  var files = readDir.readSync(dirIn, ['**.js']);
  async.each(files, function(file, next){
    worker(dirIn, dirOut, file, next);
  }, function(err){
    if(err){
      throw err;
    }
    console.timeEnd("uglifydir");
    workerFarm.end(worker);
  });
};