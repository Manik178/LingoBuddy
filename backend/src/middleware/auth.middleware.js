import user from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

configDotenv();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET must be set in .env file');
}

export async function protectRoute(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send('Unauthorized: No token provided');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); 
    req.user = await user.findById(decoded.id).select('-password');
    
    if (!req.user) {
      return res.status(401).send('Unauthorized: User not found');
    }

    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).send('Unauthorized: Invalid token');
  }
}
