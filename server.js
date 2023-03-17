// import express from 'express';
// import http from 'http'
// import socket_io from 'socket.io'

// const app = express()
// const server = http.createServer(app)

const app = require('express')();
const server = require('http').Server(app);

const io = require('socket.io')(server, {
  cors: {
    origins: ['http://localhost:8080']
  }
});

app.get('/', (req, res) => {
  // res.send('<h1>Hey Socket.io</h1>');
  res.sendFile(__dirname + '/public/index.html')
});

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    
    socket.on('chat-message', (data) => {
      this.messages.push({
          message: data.message,
          type: 1,
          user: data.user,
      });
  });
});

server.listen(3000, () => {
  console.log('backend on --- listening');
});