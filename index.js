// Node Server which will handle socket.io connections
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use(express.static(__dirname));
console.log(__dirname);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/stoopid', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

server.listen(process.env.PORT, "0.0.0.0", () => {
    console.log("Server running on port "+process.env.PORT);
});

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        console.log("User Joined:", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    });
});
