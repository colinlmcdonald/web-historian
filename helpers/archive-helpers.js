var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var fetcher = require('../workers/htmlfetcher');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb){
  var urlArray = [];
  fs.readFile(this.paths.list, 'utf8', function(err, data) {
    if (err) {
      console.log(err);
    }
    urlArray = data.split("\n");
    cb(urlArray);
   // return cb(urlArray);
  })
};

exports.isUrlInList = function(target){
  var urlArray = [];
  fs.readFile(this.paths.list, 'utf8', function(err, data) {
    if (err) {
      console.log(err);
    }
    urlArray = data.split("\n");

    for (var i = 0; i < urlArray.length; i++) {
      if (urlArray[i] === target) {
        console.log('container array ', urlArray);
        //got into here
        return true;
      }
    }
  })
};

exports.addUrlToList = function(url, cb){
  fs.writeFile(this.paths.list, url, 'utf8', function(err, data) {
    if (err) {
      console.log(err);
    }
    cb(data);
  })

};

exports.isUrlArchived = function(url, cb){
  if (this.paths.archivedSites + "/" + url) {
    return true;
  }
};

exports.downloadUrls = function(url){
  // for (var i = 0; i < urls.length; i++) {
    if (url === 'www.google.com') {
      var dir = fs.mkdir(this.paths.archivedSites + "/" + url);
      fetcher.htmlFetcher(url, dir);
    }
  // }
};
