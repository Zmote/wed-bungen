/**
 * Created by Zmote on 23.05.2015.
 */
var http = require('http');

http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type' : "text/plain"});
    res.send("Hello World");
}).listen(3000);

console.log('Listening on port 3000');