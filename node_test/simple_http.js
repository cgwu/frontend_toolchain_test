var http = require('http');
var server = http.createServer();
server.on('request',function(req, res){
	res.writeHead(200,{'Content-Type': 'text/plain; charset=utf8'});
	res.end('Hello中国.\n');
});
server.listen(3000);
console.log('Server running at http://localhost:3000/');

