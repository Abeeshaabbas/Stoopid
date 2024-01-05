// Node Sevrer which will handle socket.io connections

const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(__dirname));
console.log(__dirname);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})
app.get('/stoopid', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})
app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log("ho");
})
const io = require("socket.io")(3000);
const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name=> {
        console.log("User Joined:",name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    })
    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
    })

    socket.on('disconnect', message => {
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    })
})
