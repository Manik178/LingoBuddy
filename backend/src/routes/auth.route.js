import express from 'express';
import { signup, login, logout, onboard } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

// Middleware to check if user is authenticated
router.post('/onboard', protectRoute, onboard);

router.get('/me', protectRoute, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user, // req.user is set by the protectRoute middleware
  });
});
export default router;