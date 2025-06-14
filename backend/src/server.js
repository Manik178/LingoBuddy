import express from 'express';
import { configDotenv } from 'dotenv';
import connectDB from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';


configDotenv();
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);


app.listen(PORT, () => {  
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});