var path = require('path');
var archive = require('../helpers/archive-helpers');
var http = require('../helpers/http-helpers');
var fs = require('fs');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log('Request method: ' + req.method + ' URL ' + req.url);

  var content = '';

  if (req.method === 'GET') {
    if (req.url === '/') {
      fs.readFile(archive.paths.siteAssets + '/index.html', function(err, data) {
        if (err) {
          console.log(err);
        }
        res.end(data);
      });
    }
    else if (req.url === '/www.google.com') {
      fs.readFile(archive.paths.archivedSites + req.url, function(err, data) {
        if (err) {
          console.log(err);
          res.end(err)
        }
        res.end(data);
      });  
    }
    else {
      res.writeHead(404, http.headers);
      res.end();
    }
  }

  if (req.method === 'POST') {
    var completeData = '';
    req.on('data', function(chunk) {
      completeData += chunk;
    });
    req.on('end', function() {
      var parsedData = JSON.parse(completeData);
      fs.writeFile(archive.paths.list, parsedData.url + '\n', 'utf8', function(err, data) {
        if (err) {
          console.log(err);
          res.end()
        }
        res.writeHead(302, http.headers);
        res.end();
      })
    })
  }
};
