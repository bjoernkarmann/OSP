var http = require('http');
var fs = require('fs');

// Loading the index file . html displayed to the client
var server = http.createServer(function(req, res) {
    // console.log(req.url);
    fs.readFile("./client/index.html", 'utf-8', function(error, content) {
        res.writeHead(200);
        res.end(content);
    });
});
// Loading socket.io
var io = require('socket.io').listen(server);

// When a client connects, we note it in the console
io.sockets.on('connection', function (socket) {
    console.log('A client is connected!');
    socket.emit('message', 'You are connected!');
    buffer = [null];
});

server.listen(8080);
