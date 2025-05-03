import http from 'http';
import express from 'express';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
});
export function getReceiverSocketId(userId) {
    return usersSocketMap[userId];
}
const usersSocketMap = {};
io.on('connection', (socket) => {
    console.log('a user connected ' + socket.id);
    const userId = socket.handshake.query.userId;
    if(userId) usersSocketMap[userId] = socket.id;
    io.emit('getOnLineUsers', Object.keys(usersSocketMap));

    socket.on('disconnect', () => {
        console.log('user disconnected ' + socket.id);
        delete usersSocketMap[userId];
        io.emit('getOnLineUsers', Object.keys(usersSocketMap));
    });
});

export { io, server, app };
