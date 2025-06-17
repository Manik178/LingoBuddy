import express from 'express';
import { signup, login, logout, onboard } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

// Middleware to check if user is authenticated
router.post('/onboard', protectRoute, onboard);
export default router;