const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { generateMessage,generateLocationMessage } = require('./utils/message');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);



app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('new user connected');

    socket.on('loggedIn', function (params, callback) {
        console.log(params);


        socket.emit('newMessage', generateMessage('Admin', `welcome to chat App ${params.username}`)

        );
        socket.broadcast.emit('newMessage', generateMessage('Admin', `${params.username} has joined`)
        );
    });

    socket.on('createMessage', function (msg, callback) {
        console.log('createMessage', msg);
        io.emit('newMessage', generateMessage(msg.from, msg.text));
        callback('this is from the server.');
    });


    socket.on('createLocationMessage', function (locmsg) {
        console.log('createLocationMessage', locmsg);
        io.emit('newLocationMessage',generateLocationMessage('Admin',locmsg.latitude,locmsg.longitude));
    });
             
        
    


    socket.on('disconnect', () => {
        console.log('User was disconnected');

    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

