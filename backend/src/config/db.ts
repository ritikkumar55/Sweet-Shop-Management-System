import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sweetshop';

export async function connectDB() {
  await mongoose.connect(MONGODB_URI);
  console.log('MongoDB connected');
}
