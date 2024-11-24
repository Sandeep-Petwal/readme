const express = require('express');
const http = require('http');
const { Server } = require('socket.io'); // Import the Server class from Socket.IO
const cors = require("cors");
const app = express();
app.use(cors({ origin: '*' }));
 
const server = http.createServer(app); // Create an HTTP server using the Express app
const io = new Server(server, { cors: "*" }); // Create a new Socket.IO server and attach it to the HTTP server
 
// socket middleware to protect WS
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Authentication error: No token provided'));
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return next(new Error('Authentication error: Invalid token'));
        socket.user = decoded;
        next();
    })
})
 
io.on('connection', (socket) => { // Listen for new client connections
    console.log("New Connection connected !");
 
    // Listen for user connection 
    socket.on("user connection", (user_id) => {
        socket.broadcast.emit("user connection", user_id);
    })
 
    // Listening for Messages
    socket.on("message", ({ message, sender }) => {
        console.log("Message recieved :: " + message);
 
        // send to all connections
        io.emit("message", msg);
 
        // Send a response only to the sender
        socket.emit('chat response', 'You sent: ' + msg);
 
        // all clients except sender
        socket.broadcast.emit("message", { message, sender });
    })
 
    // Handling conncetion disconnection
    socket.on('disconnect', () => {
        console.log("user disconnected !");
    })
 
    // Custom connection disconnect
    socket.on('user disconnected', (user) => {
        io.emit('user disconnected', `${user}`)
    })
 
    // error connectiong
    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
});
server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});
