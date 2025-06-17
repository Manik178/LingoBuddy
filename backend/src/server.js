import express from 'express';
import { configDotenv } from 'dotenv';
import connectDB from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/users.route.js';
import chatRoutes from './routes/chat.route.js';
import cookieParser from 'cookie-parser';
configDotenv();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  
  try {
    await connectDB();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to DB or dropping index:', error);
  }
});
