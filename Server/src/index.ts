import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

let port = 8000;
let app = express();
let server = http.createServer(app);
let io = new Server(server, {
    cors: {
        origin: '*'
    }
});

app.use(cors)

io.on('connection', (socket) => {
    console.log('New client is connected to the socket server.');

    socket.on('disconnect', () => {
        console.log('Client disconnected.');
    });
});

server.listen(port, () => {
    console.log(`Server in listning on port ${port}`)
});