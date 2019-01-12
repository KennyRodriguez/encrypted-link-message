
$(function() {
  $('#sendButton').click(beginSendingProcess);
});

function beginSendingProcess() {
  showStatus('Connecting...');

  var socket = io.connect("http://localhost:1000");

  socket.on('connect', function() {
    var link = location.href + socket.id;

    showStatus('Provide the following link to the recipient:\n\n' + link);
  });

  socket.on('relay', function(sourceId, message) {
    console.log('we got a message from', sourceId, message);

    if (message.action == 'send') {
      showStatus('Encrypting...');
      let content = getEncryptedMessage(message.key);

      showStatus('Transmitting...');
      socket.emit('relay', sourceId, { action: 'result', message: content });
    }
  });
}

function showStatus(status) {
  $('#messageForm').hide();
  let $status = $('#status').show();
  $status.text(status);
  $status.html($status.html().replace(/\n/g, '<br>'));
}

function getEncryptedMessage(pubKeyB64) {
  // encrypt the message with the provided key

  let message = $('#ourMessage').val();


  return message;
}
