const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
var bodyParser = require('body-parser');
const { generateMessage,generateLocationMessage,message } = require('./utils/message');
var moment = require('moment');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
 var register = require('../routes/register-controller');
 var login = require('../routes/autheticate-controller');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(publicPath));

 app.use('/register', register);
 app.use('/login',login);

app.get('/login', function (req, res) {  
    res.sendFile( __dirname + "/" + "login.html" );  
 });

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.on('loggedIn', function (params, callback) {
       // console.log(params);


        socket.emit('newMessage', generateMessage('Admin', `welcome to chat App ${params.username}`)

        );
        socket.broadcast.emit('newMessage', generateMessage('Admin', `${params.username} has joined`)
        );
    });

    socket.on('createMessage', function (msg, callback) {
        //console.log('createMessage', msg);
        message(msg.text).then(function(result){
            console.log(result);
            io.emit('newMessage', {
                
                text: result,
                createdAt: moment().valueOf()
             });


        });
        
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

module.exports = app;