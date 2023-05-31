const io = require('socket.io-client');
let socket = null;

function connect() {
  socket = io('http://localhost:8000', { query: { userId, token } });

  socket.on('connect', () => {
    console.log('Connected to the server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from the server');
  });

  socket.on('msgToClient', (message) => {
    console.log('New Message: ', message);
  });
}

function sendMessage(message) {
  if (!socket) {
    console.log('Not connected to the server');
    return;
  }

  socket.emit('msgToServer', { text: message });
}

connect();

module.exports = { sendMessage };