import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Database connection with Serverless caching
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    console.error('CRITICAL ERROR: MONGO_URI is not defined in environment variables.');
    return;
  }
  try {
    const db = await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    isConnected = db.connections[0].readyState;
    console.log('MongoDB Atlas connected successfully');
  } catch (err) {
    console.error('MongoDB connection error message:', err.message);
  }
};

// Middleware to ensure DB connection before processing any route
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

import authRoutes from './routes/auth.js';
import orderRoutes from './routes/orders.js';
import catalogRoutes from './routes/catalog.js';
import marketingRoutes from './routes/marketing.js';

// Basic route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running', mongoUriLength: process.env.MONGO_URI ? process.env.MONGO_URI.length : 0, jwtLength: process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0 });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/catalog', catalogRoutes);
app.use('/api/marketing', marketingRoutes);

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
