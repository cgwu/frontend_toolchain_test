var connect = require('connect');

function logger(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
}
function hello(req, res) {
    res.setHeader('Content-Type', 'text/plain; charset=utf8');
    res.end('hello world中国');
}
//var app = connect();
//app.use(logger);
//app.use(hello);
//app.listen(3000);

connect()
.use(logger)
.use(hello)
.listen(3000);

