var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var usernames = [];
var username;

app.use(express.static('public'));

http.listen(3000, function() {
  console.log('listening on *:3000');
});

app.get('/', function(req, res) {
  res.sendFile('/index.html');
})

io.on('connection', function(socket) {
  socket.on('username', function(name) {
    usernames.push({ username: name, id: socket.id });
    socket.broadcast.emit('chat message', name + ' has joined the room');
    socket.emit('chat message', 'Welcome to the chatroom ' + name + '!');
    for (var i = 0; i < usernames.length - 1; i++) {
      socket.emit('chat message', usernames[i]["username"] + ' is online');
    }
  });

  socket.on('chat message', function(data) {
    io.emit('chat message', data[1] + ': ' + data[0]);
  });

  socket.on('typing', function(name) {
    socket.broadcast.emit('chat message', name + ' is typing...');
  });

  socket.on('disconnect', function() {
    for (var i = 0; i < usernames.length; i++) {
      if (socket.id === usernames[i]["id"]) {
        username = usernames[i]['username'];
        usernames.splice(i, 1);
      }
    }
    socket.broadcast.emit('chat message', username + ' has left the room');
  });
});
