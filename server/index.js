const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chat-app-bice-sigma.vercel.app/", // accepting websocket communication with this URL
    methods: ["GET", "POST"],         // methods we accept
  },
})

io.on('connection', (socket) => { // listening for event with id 'connection'
  console.log(`Your socket id: ${socket.id}`);

  socket.on('join_room', (room) => {  //listening to 'join_room' event
    socket.join(room) // joining room we got from frontend
    console.log(`User with id: ${socket.id} joined ${room} room`);
  })

  socket.on('send_message', (messageData) => {
    socket.to(messageData.room).emit('recieve_message', messageData)
  })

  socket.on('disconnect', () => { // listening for event with id 'disconnect'
    console.log(`User ${socket.id} disconnected`);
  })

})
server.listen(3001, () => console.log("Server is running"));
