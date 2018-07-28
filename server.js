//--------------------------------------------------------------------
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//---------------------data collectors--------------------------------
var messages = [];
//--------------------------------------------------------------------
app.use(express.static('public'));
// app.use(express.static('build'));
// app.use(express.static('models'));
    //--------------------------------------------------------------------
app.get('/home', function(req, res) {
    res.sendFile(__dirname + '/public/home.html');
});
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/home.html');
});
app.get('/chat', function(req, res) {
    res.sendFile(__dirname + '/public/chat.html');
});
app.get('/vidchat', function(req, res) {
    res.sendFile(__dirname + '/public/vidchat.html');
});
//--------------------------------------------------------------------
//collects chat msgs to chat arr
// io.on('connection', () => {
//     socket.on('chat message', (msg) => {
//         this.messages.push(msg);
//     });
// });
//--------------------------------------------------------------------
//on connection print connection 
io.on('connection', function(socket) {
    console.log('a user connected');
});
//--------------------------------------------------------------------
// on user touch print touch
io.on('connection', function(socket) {
    // debugger
    socket.on('touchstart', function(socket) {
        console.log('user_touch');
    });
});
//--------------------------------------------------------------------
// on connection print ip 
io.on('connection', function(socket) {
    // debugger
    socket.on('user_ip', function(userip) {
        console.log(userip)
    });
});
//--------------------------------------------------------------------
//on disconnect 
io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});
//--------------------------------------------------------------------
//print out the chat message event:
io.on('connection', function(socket) {
    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);
    });
});
//--------------------------------------------------------------------
//send the message to everyone, including the sender.
io.on('connection', function(socket) {
    debugger
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });
});
//--------------------------------------------------------------------


//--------------------------------------------------------------------
http.listen(process.env.PORT || 8888, function() {
    console.log('listening on *:8888');
});