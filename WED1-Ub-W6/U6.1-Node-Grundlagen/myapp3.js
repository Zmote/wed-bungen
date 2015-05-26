/**
 * Created by Zmote on 23.05.2015.
 */
var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function(req,res){
    var url_parts = url.parse(req.url,true);
    var query = url_parts.query;

    if(url_parts.pathname == '/number'){
        var von = parseInt(query.von) || 0;
        var bis = parseInt(query.bis) || 50;

        var outputString = publishNumbers(von, bis);
        res.writeHead(200,{'Content-Type':'text/plain'});
        res.write(outputString,"UTF-8");
        res.end();
        return;
    }

    if(url_parts.pathname == '/file'){
        var data = new Date();
        data = data.toString();

        fs.appendFileSync('date.txt',data + '\r\n');
        res.writeHead(200,{'Content-Type': 'text/plain'});
        res.write(data);
        res.end();
        return;
    }

    if(url_parts.pathname == '/ToSendHtml.html'){
        var content;
        fs.readFile('ToSendHtml.html', 'utf-8', function(err,data){
            if(err){
                throw error;
            }
            content = data;
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(content);
            res.end();
        });
        return;
    }

    if(url_parts.pathname == '/ToSendJavaScript.js'){
        var content;
        fs.readFile('ToSendJavaScript.js', 'utf-8', function(err,data){
            if(err){
                throw error;
            }
            content = data;
            res.writeHead(200,{'Content-Type':'text/javascript'});
            res.write(content);
            res.end();
        });
        return;
    }

    if(url_parts.pathname == "/"){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Following paths are also available: \n/number\n/file\n/ToSendHtml.html\n/ToSendJavaScript.js');
        return;
    }

    if(true){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write("404\nThis page doesn't exist, try:\n/\n/number\nfile");
        res.end();
        return;
    }

}).listen(3000);

var publishNumbers = function(von, bis){
    var outputString = '';
    for(var i = von; i <= bis; i++){
        outputString += i + ' ';
    }
    return outputString;
};

console.log('Listening on port 3000');