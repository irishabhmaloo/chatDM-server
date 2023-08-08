const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const exp = require("constants");

const app = express();
const port = process.env.PORT || 4500; // if hosting online, selects the given port

// user object
const users = {};

// cors: used for intercommunication between URLs
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello, it's working!");
});

// creating a server
const server = http.createServer(app);

// creating circuit | connection
const io = socketIO(server);

// when connection is established
io.on("connection", (socket) => {
  console.log("New Connection");

  socket.on('joined', ({ user }) => {
    users[socket.id] = user;
    console.log(`${user} has joined`);

    // on join message
    socket.emit('welcome', { user: "Admin", message: "Welcome to the chat!" });

    // to all except joined user
    socket.broadcast.emit('userJoined', { user: "Admin", message: `${users[socket.id]} has joined` });
  });

  // chat
  socket.on('message', ({ message, id }) => {
    //sending to whole circuit
    io.emit('sendMessage', { user: users[socket.id], message, id });
  });

  socket.on('disconnect', () => {
    if (users[socket.id]) {
      console.log(`${users[socket.id]} left`);
      socket.broadcast.emit('userLeft', { user: "Admin", message: `${users[socket.id]} left` });
      delete users[socket.id];
    }
  });
});

// establishing port
server.listen(port, () => {
  console.log(`server is working on http://localhost:${port}`);
});