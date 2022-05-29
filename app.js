const express = require('express');
const socket = require('socket.io');

const app = express();


const server = app.listen((process.env.PORT || 3000), function () {
  console.log('Listening on port 3000')
});

let io = socket(server);


app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/home.html')
});

app.get('/audience', function (req, res) {
  res.sendFile(__dirname + '/public/audience.html');
});

app.get('/performer', function (req, res) {
  res.sendFile(__dirname + '/public/performer.html');
});


io.on('connection', function (socket) {
  console.log('Made socket connection', socket.id);
  socket.on('midiTransport-1', function (data) {
    io.sockets.emit('midiTransport-1', data)
  });
  // socket.on('videoTransport', function (data) {
  //   io.sockets.emit('videoTransport', data)
  // });
});