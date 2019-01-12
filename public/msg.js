var socket = io.connect("http://localhost:1000");

socket.on('connect', function() {
  console.log(socket.id);
  socket.emit('relay', 'test1', 'test2');

  socket.on('relay', function(sourceId, message) {
    console.log('we got a message from', sourceId, message);
    alert(sourceId + " : "+ message);
  });
});

document.getElementById('sendButton').addEventListener('click', send);


function send() {
  let targetId = $('#targetIdInput').val();
  let message = $('#messageInput').val();

  console.log('message', message, 'delivering to', targetId);
  socket.emit('relay', targetId, message);
}
