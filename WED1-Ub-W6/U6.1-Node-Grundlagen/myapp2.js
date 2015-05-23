/**
 * Created by Zmote on 23.05.2015.
 */
var http = require('http');
var url = require('url');

http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type' : "text/plain"});
    res.end("You requested: " + req.url);
}).listen(3000);

console.log('Listening on port 3000');