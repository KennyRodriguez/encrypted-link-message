//Dependencies.
var socket = require('socket.io');
var express = require('express');

//Clients
let clients = {};
var users = 0; //Current #

//extraClientID
// var id = socket.id;
//Express set-up for sender End

//Express set-up for sender
var app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/sender.html');
});
// let url = global.location;


app.get('/:id', (req, res) => {
  console.log('requesting page for', req.params.id);
  if (clients[req.params.id])
    res.sendFile(__dirname + '/public/receiver.html');
  else
    res.sendFile(__dirname + '/public/invalid.html');
});

var server = app.listen(1000, function(){
  console.log("Port:1000 ~ UP");
})

//Socket.io Set up
var io = socket(server);

// Connection //
io.on('connection', function(socket) {
  console.log('Connection made, ID:', socket.id)

  clients[socket.id] = socket; // give specific id per client.

  socket.on('disconnect', () => {
    console.log("Disconnection made");
    delete clients[socket.id]; //disconnect ID
    users--;
  });

  socket.on('relay', (targetId, message) => {
    console.log('socket asked to relay', targetId, message);
      if (clients[targetId]) {
        let targetClient = clients[targetId];
        targetClient.emit('relay', socket.id, message);
      }
  });
});
