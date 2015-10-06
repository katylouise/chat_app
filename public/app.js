$(document).ready(function() {
  var socket = io();
  var username;

  $('.start').click(function(event) {
    event.preventDefault();
    $('.welcome').hide();
    $('.chatbox').show();
    username = $('.name').val();
    socket.emit('username', $('.name').val());
  });

  $('.chat').submit(function() {
    socket.emit('chat message', [$('#m').val(), username]);
    $('#m').val('');
    return false;
  });

  $('#m').one('keypress',function() {
    socket.emit('typing', username);
  });

  socket.on('chat message', function(msg) {
    $('#messages').append($('<li>').text(msg));
  });
});
