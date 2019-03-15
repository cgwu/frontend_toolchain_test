var https = require('https');
var fs = require('fs');

var options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./key-cert.pem')
};

https.createServer(options, function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf8'});
    res.end('Hello中国https.\n');
}).listen(3000);

