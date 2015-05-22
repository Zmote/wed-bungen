var http = require('http');
var fs = require('fs');
var url = require('url');

function handleNumbers(req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    var from = parseInt(query.von) || 0;
    var to = parseInt(query.bis) || 50;

    res.writeHeader(200, {"Content-Type": "text/html"});
    (function doLoopTo(i, to) {
        i = (typeof(i) === 'undefined' ?  from : i);
        res.write(String(i++) + " ");
        i > to || doLoopTo(i,to);
    })(from, to);
    res.end();
}


function handleFile(res) {
    fs.writeFile('datum.txt', new Date().toLocaleString(), function (err) {
        if (err) {
			throw err;
		}
        console.log('It\'s saved!');
    });
    res.end();
}

function sendFile(res, fileName, contentType) {
    fs.readFile(fileName, function (err, data) {
        if (err) {
            throw err;
        }
        res.writeHeader(200, {"Content-Type": contentType});
        res.write(data);
        res.end();
    });
}

http.createServer(function(req, res) {
    if (req.url.indexOf("/numbers") === 0) {
        handleNumbers(req, res);
    }
    if (req.url === "/file") {
        handleFile(res);
    }
    else if (req.url === "/ToSendHtml.html") {
        sendFile(res, "ToSendHtml.html", "text/html");
    }
    else if (req.url === "/ToSendJavaScript.js" ) {
        sendFile(res, "ToSendJavaScript.js", "text/javascript");
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('You requested ' + req.url);
    }
}).listen(3002);

console.log('Server running at http://localhost:3002/');
