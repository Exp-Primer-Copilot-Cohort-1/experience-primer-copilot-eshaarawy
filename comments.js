// Create web server
// Node.js
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var comments = require('./comments.js');

var server = http.createServer(function(request, response){
  var urlParsed = url.parse(request.url);
  var pathname = urlParsed.pathname;
  var filename = pathname.substring(1);
  var ext = path.extname(filename);
  var type = 'text/html';
  switch(ext){
    case '.js':
      type = 'text/javascript';
      break;
    case '.css':
      type = 'text/css';
      break;
    case '.jpg':
      type = 'image/jpeg';
      break;
  }
  fs.readFile(filename, function(err, data){
    if(err){
      response.writeHead(404);
      response.end('Page not found');
    } else {
      response.writeHead(200, {'Content-Type': type});
      response.end(data);
    }
  });
});

server.listen(3000, function(){
  console.log('Server is listening on port 3000');
}