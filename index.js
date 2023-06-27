const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const exp = require("constants");

const app = express();
const port = 4500 || process.env.PORT; // if hosting online, selects the given port

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
        console.log(`${user} has joined`);
    })
})

// establishing port
server.listen(port, ()=> {
    console.log(`server is working on http://localhost:${port}`);
})