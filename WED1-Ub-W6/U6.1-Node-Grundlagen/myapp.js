/**
 * Created by Zmote on 23.05.2015.
 */
var http = require('http');

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World\n');
}).listen(8124);

console.log('Server running at http://localhost:8124');