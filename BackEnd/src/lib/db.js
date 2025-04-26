import mongoose from 'mongoose';

export const connectDB = async () => {
        try {
                await mongoose.connect(process.env.MOGODB_URL);
                console.log(`Database connected`);
        } catch (error) {
                console.warn("Database connected", error);
        }
}