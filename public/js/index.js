var socket = io();

socket.on('connect', function () {
    console.log('connected to server');
    // socket.emit('createEmail', {
    //     to: 'ram@gmail.com',
    //     text: 'ding dong kro bhai'
    // });

    socket.emit('createMessage', {
        from: 'kumar',
        text: 'who is this'
    });

});

socket.on('disconnect', function () {
    console.log('disconnected from server');
});

// socket.on('newEmail', function (email) {
//     console.log('new Email', email);
// });

socket.on('newMessage', function (msg) {
    console.log('newMessage', msg);
});
