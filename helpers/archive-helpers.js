var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var fetcher = require('../workers/htmlfetcher');
var $ = require('jquery');
var request = require('request');
var fileExists = require('file-exists')
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
  var flag;
  fs.readFile(this.paths.list, 'utf8', function(err, data) {
    if (err) {
      console.log(err);
    }
    urlArray = data.split("\n");
    console.log('this is the url array', urlArray);

    for (var i = 0; i < urlArray.length; i++) {
      if (urlArray[i] === target) {
        //got into here
        console.log('got into for loop', urlArray[i]);
        flag = true;
      }
      else {
      flag = false;
    }
  }
  })
  return flag;
};

exports.addUrlToList = function(url){
  var newUrl = (url + '\n');
  fs.appendFile(this.paths.list, url, 'utf8', function(err, data) {
    if (err) {
      console.log(err);
    }
  })

};

exports.isUrlArchived = function(url, cb){
  var parsedUrl = JSON.parse(url);
  var checkUrl = this.paths.archivedSites + "/" + parsedUrl + '.html';
  return fileExists(checkUrl);
};

exports.downloadUrls = function(url){
  // for (var i = 0; i < urls.length; i++) {
    var newUrl = JSON.parse(url);
    // if (newUrl === "www.google.com") {
      var dir = path.join(__dirname, '../archives/sites', newUrl);
      console.log('this is dir ', dir);
      fetcher.htmlFetcher(newUrl, dir);
    //}
  // }
};
