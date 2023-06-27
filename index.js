const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const exp = require("constants");

const app = express();
const port = 4500 || process.env.PORT; // if hosting online, selects the given port

// user array
const users = [{}];

// cors : used for inter communication btw URL
app.use(cors());
app.get("/" , (req,res)=> {
    res.send("Hello, its working!");
})

// creating a server
const server = http.createServer(app);

// creating circuit | connection
const io = socketIO(server);

// when connection is established
io.on("connection" , (socket)=>{
    console.log("New Connnection");

    socket.on('joined', ({user}) => {
        users[socket.id] = user;
        console.log(`${user} has joined`);

        // on join message
        socket.emit('welcome' , {user:"Admin", message:"Welcome to the chat!"});

        // to all except joined user
        socket.broadcast.emit('userJoined',  {user:"Admin", message: `${users[socket.id]} has joined`});
    });

    socket.on('userDisconnect', () => {
        console.log(`${users[socket.io]} left`);
        socket.broadcast.emit('userLeft',  {user:"Admin", message: `${users[socket.id]} left`});
    });
})

// establishing port
server.listen(port, ()=> {
    console.log(`server is working on http://localhost:${port}`);
})