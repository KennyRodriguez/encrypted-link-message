$(function() {
  let jsEncrypt = new JSEncrypt();

  var senderId = location.pathname.substr(1);
  var socket = io.connect("http://localhost:1000");

  socket.on('connect', function() {
    socket.on('relay', function(sourceId, message) {
      console.log('we got a message from', sourceId, message);
      if (message.action == 'result') {
        let decryptedMessage = message.message;
        // do something
        console.log('decrypted message is', decryptedMessage);
        window.onload = function() {
          $('#message').html(""+decryptedMessage);
        }
      }
    });

    jsEncrypt.getKey();

    let pubKey = jsEncrypt.getPublicKeyB64();
    socket.emit('relay', senderId, { action: 'send', key: pubKey });
  });

});

