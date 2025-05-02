import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { connectDB } from './lib/db.js';
import { app, server } from './lib/socket.js';
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.use((error, req, res, next) => {
    console.error('Error:', error.message);
    return res.status(error.status || 500).json({
        success: error.isSuccess || false,
        status: error.status || 500,
        statusText: error.statusText || 'Internal Server Error',
        message: error.message || 'Something went wrong',
    });
});
const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log('Server is running on port :' + PORT);
    connectDB();
}); 