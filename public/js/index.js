var socket = io();

socket.on('connect', function () {
    console.log('connected to server');
    
});

socket.on('disconnect', function () {
    console.log('disconnected from server');
});



socket.on('newMessage', function (msg) {
    console.log('newMessage', msg);
    let li = jQuery('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);

    jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'kumar',
//     text: 'who is this'
// },function(msg){
//     console.log('got it',msg);
// });

jQuery('#message-form').on('submit',function(e){ 
 e.preventDefault();

 socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
 },function(){

 });

});