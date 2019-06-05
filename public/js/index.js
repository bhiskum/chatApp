var socket = io();

socket.on('connect', function () {
    console.log('connected to server');
    

    // socket.emit('createMessage', {
    //     from: 'kumar',
    //     text: 'who is this'
    // });

});

socket.on('disconnect', function () {
    console.log('disconnected from server');
});



socket.on('newMessage', function (msg) {
    console.log('newMessage', msg);
});
