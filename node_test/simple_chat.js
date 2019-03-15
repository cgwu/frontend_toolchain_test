var events = require('events');
var net = require('net');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on('join', function(id, client){
    this.clients[id] = client;
    this.subscriptions[id] = function(senderId, message){
        if(id!=senderId) {
            this.clients[id].write(message);
        }
    }
    this.on('broadcast', this.subscriptions[id]);
});

var server = net.createServer(function(client){
    var id = client.remoteAddress+":"+client.remotePort;
    console.log('join id:', id);
    channel.emit('join',id,client);
    
    /*
    client.on('connect', function(){
        console.log('xxx id:', id);
        channel.emit('join',id,client);
    });
    */
    client.on('data', function(data){
        data = data.toString();
        console.log('data',data);
        channel.emit('broadcast',id,data);
    });
});

//server.listen(8888);
server.listen({
    host: '192.168.50.168',
    port: 8888,
    exclusive: true
});
console.log('starting server at *:8888');


