const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const exp = require("constants");

const app = express();
const port = 4500 || process.env.PORT; // if hosting online, selects the given port

// creating a server
const server = http.createServer(app);

// creating circuit | connection
const io = socketIO(server);

// establishing port
server.listen(port, ()=> {
    console.log(`server is working on ${port}`);
})