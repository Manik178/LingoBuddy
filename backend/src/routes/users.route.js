import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getRecommendedUsers, getFriends, sendFriendRequest, acceptFriendRequest, getFriendRequests, getOutgoingFriendRequests } from '../controllers/users.controller.js';

const router = express.Router();

router.use(protectRoute); 

router.get('/recommended', getRecommendedUsers);
router.get('/friends', getFriends); 

router.post('/friend-requests/:id', sendFriendRequest);
router.put('/friend-requests/:id/accept', acceptFriendRequest);
router.post('/friend-requests/:id', sendFriendRequest);
router.get('/friend-requests', getFriendRequests);
router.get('/outgoing-friend-requests', getOutgoingFriendRequests);

export default router;