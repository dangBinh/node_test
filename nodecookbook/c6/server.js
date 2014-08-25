/**
 * Created by Dang Binh on 8/22/2014.
 */
var http = require('http');
var clientHtml = require('fs').readFileSync('client.html');

var plaintHttpServer = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(clientHtml);
}).listen(8080);

var io = require('socket.io').listen(plaintHttpServer);

io.sockets.on('connection', function(socket){
    socket.on('messeage', function(mes){
        if(msg == 'Hello') {
            socket.end('socket.io!');
        }
    });
});

