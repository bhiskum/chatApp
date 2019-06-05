 const path = require('path');
 const express = require('express');
 const http = require('http');
 const socketIO = require('socket.io');

 const publicPath = path.join(__dirname,'../public');
 const port = process.env.PORT || 3000;
 var app = express();
 var server = http.createServer(app);
 var io = socketIO(server);

 app.use(express.static(publicPath));


 io.on('connection',(socket)=>{
     console.log('new user connected');
    //  socket.emit('newEmail',{
    //      from:'abhi/@gmail.com',
    //      text: 'hey whats up..!',
    //      createdAt: 123
    //  });

     socket.emit('newMessage',{
         from:'mohit',
         text:'hi',
         createAt:121
     });

    //  socket.on('createEmail',(email)=>{
    //      console.log('create email',email);
    //  });

     socket.on('createMessage',function(msg){
         console.log('createMessage',msg);

     });

     socket.on('disconnect',()=>{
        console.log('User was disconnected');
        
    });
 });
 
 server.listen(port,() => {
     console.log(`Server is up on port ${port}`);
 });



