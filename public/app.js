//loads socket.io-client, exposes an io global and connects
//by not specifying a url to connect to, it defaults to the host that serves the page
$(document).ready(function() {
  var socket = io();

  $('form').submit(function() {
    //send the chat message - note it hasn't been written as json - it formats that itself?
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg) {
    $('#messages').append($('<li>').text(msg));
  });
});
