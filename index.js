//initializes app to be a function handler
var express = require('express');
var app = express()

//pass app to HTTP server
var http = require('http').Server(app);

//initialize a new instance of socket.io, passing it the HTTP server
//there is also a client library socket.io-client which loads on the browser side
var io = require('socket.io')(http);

//set public as static files directory
app.use(express.static('public'));

//tell server to listen on port 3000
http.listen(3000, function() {
  console.log('listening on *:3000');
});

app.get('/', function(req, res) {
  res.sendFile('/index.html');
})

io.on('connection', function(socket) {
  console.log('a user is connected');
});

