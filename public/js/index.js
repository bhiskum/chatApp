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

socket.on('newLocationMessage',function(locmsg){
    console.log(locmsg);
    let li =jQuery('<li></li>');
    let a = jQuery('<a target="_blank">my current location</a>');
    li.text(`${locmsg.from}: `);
    a.attr('href',locmsg.url);
    li.append(a);
    jQuery('#messages').append(li);
})



jQuery('#message-form').on('submit',function(e){ 
 e.preventDefault();

 socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
 },function(){

 });

});

var locationButton = jQuery('#geo-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by the browser');
    }
    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
         });

    }, function () {
        alert('unable to fetch the location');
    });
});