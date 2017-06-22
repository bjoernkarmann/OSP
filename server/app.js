var express = require('express');
var app = express();
var server = app.listen(3000);

app.use(express.static('./public'));

console.log('Socket server is running');

var io = require('socket.io').listen(server);

// When a client connects, we note it in the console
io.on('connection', function (socket) {
    console.log('A client is connected!');
    socket.emit('message', 'You are connected!');
    socket.on('osp', function (data) {
      console.log(data);
    });
});
