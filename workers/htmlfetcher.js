// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var http = require('http');
var request = require('request');

exports.htmlFetcher = function(url, dest, cb) {
  var createFile = fs.open(dest + '.html', "w");
  var file = fs.createWriteStream(dest + '.html');
   var newUrl = JSON.stringify(url);
  request('http://' + url).pipe(file);
};


