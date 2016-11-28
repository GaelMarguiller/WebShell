var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var child_process = require('child_process').exec;
var path = require('path');

server.listen(80);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var parentDir = path.resolve(process.cwd(), '..');

io.on('connection', function(socket){
    socket.on('input', function(data){
        child_process(data, {cwd: parentDir}, function(error, stdout, stderr){
            socket.emit('output', {'out': stdout, 'directory':parentDir});
            socket.emit('output', {'out': stderr, 'directory':parentDir});
        });
    });
});
