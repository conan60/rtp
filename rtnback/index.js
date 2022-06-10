const http = require('http')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
var path = require('path')
var fs = require('fs')
const { Server } = require("socket.io")



const app = express()
const server = http.createServer(app)
//log stream file : morgan.log
const logStream = fs.createWriteStream(path.join(__dirname, 'morgan.log'), { flags: 'a' })
const io = new Server(server,{cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
}})



// Middleware
app.use(morgan('tiny',{stream : logStream}))
app.use(helmet())
app.use(cors())
app.use(express.json())


//Client connexion to websocket
io.on('connection', (socket) => {
    console.log('User Connect')
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
});



server.listen(3030,()=>{
    console.log("Server running on port 3030!!")
})