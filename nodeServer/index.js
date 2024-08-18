// Node server which will handle socket io connections

// const io = require('socket.io')(8000, {
//     cors: {
//         origin: "http://127.0.0.1:5500",  // or use "*" to allow all origins
//         methods: ["GET", "POST"]
//     }
// });
// const users = {};

// io.on('connection', socket=>{
//     socket.on('new-user-joined', name=>{
//         console.log('new-user',name);
        
//         users[socket.id] = name;
//         socket.boardcast.emit('user-joined',name)
//     })

//     socket.on('send',message=>{
//         socket.boardcast.emit('recieve',{message:message,name:users[socket.io]})
//     })

//     socket.on('disconnect',message=>{
//         socket.boardcast.emit('left',users[socket.id])
//         delete  users[socket.id]
//     })
    
// })

const io = require('socket.io')(8000, {
    cors: {
        origin: "http://127.0.0.1:5500",  // or use "*" to allow all origins
        methods: ["GET", "POST"]
    }
});

const users = {};

io.on('connection', socket => {
    // When a new user joins
    socket.on('new-user-joined', name => {
        console.log('New user joined:', name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    // When a user sends a message
    socket.on('send', message => {
        socket.broadcast.emit('recieve', { message: message, name: users[socket.id] });
    });

    // When a user disconnects
    socket.on('disconnect', () => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});
