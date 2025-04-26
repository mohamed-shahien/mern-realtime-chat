import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import { connectDB } from './lib/db.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

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
app.listen(PORT, () => {
    console.log('Server is running on port :' + PORT);
    connectDB();
}); 