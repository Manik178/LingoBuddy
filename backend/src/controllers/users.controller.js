import user from '../models/user.model.js';
import FriendRequest from '../models/friendRequest.js';
import { upsertStreamUser } from '../lib/stream.js';  

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user._id; // Assuming req.user is set by auth middleware
    const currentUser = req.user;

    const recommendedUsers = await user.find({
      $and: [
        { _id: { $ne: currentUserId } }, // Exclude current user
        { isOnboarded: true }, // Only include users who have completed onboarding
        { _id: { $nin: currentUser.friends } } // Exclude friends of the current user
      ]
    }).select('-password -friends') // Exclude sensitive fields
    res.status(200).json(recommendedUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recommended users', error });
  }
}

export async function getFriends(req,res){
  try {
    const user = await user.findById(req.user._id)
      .select('friends') // Exclude sensitive fields
      .populate('friends', '-password -friends'); // Exclude sensitive fields

    if (!use) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.friends);
  }
  catch (error) {
    res.status(500).json({ message: 'Error fetching friends', error });
  } 
}

export async function sendFriendRequest(req, res) {
  try {
    const recipientId = req.params.id;
    const senderId = req.user._id;

    if (recipientId === senderId.toString()) {
      return res.status(400).json({ message: 'You cannot send a friend request to yourself.' });
    }

    const recipient = await user.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found.' });
    }

    await upsertStreamUser(recipient);

    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: senderId, recipient: recipientId },
        { sender: recipientId, recipient: senderId }
      ]
    })
    if (existingRequest) {
      return res.status(400).json({ message: 'Friend request already exists.' });
    }
    const friendRequest = await FriendRequest.create({
      sender: senderId,
      recipient: recipientId
    });

    res.status(200).json({ message: 'Friend request sent successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending friend request', error });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const requestId = req.params.id;
    const userId = req.user._id;

    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: 'Friend request not found.' });
    }

    if (friendRequest.recipient.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'You can only accept requests sent to you.' });
    }

    friendRequest.status = 'accepted';
    await friendRequest.save();

    const sender = await user.findById(friendRequest.sender);
    const recipient = await user.findById(friendRequest.recipient);

    sender.friends.push(recipient._id);
    recipient.friends.push(sender._id);

    await sender.save();
    await recipient.save();

    res.status(200).json({ message: 'Friend request accepted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error accepting friend request', error });
  }
}

export async function getFriendRequests(req, res) {
  try {
    const userId = req.user._id;

    const incomingReqs = await FriendRequest.find({
      recipient: userId,
      status: 'pending'
    }).populate('sender', '-password -friends'); 
    const acceptReqs = await FriendRequest.find({
      sender: userId,
      status: 'pending'
    }).populate('recipient', '-password -friends'); 
    res.status(200).json(incomingReqs, acceptReqs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching friend requests', error });
  }
}

export async function getOutgoingFriendRequests(req, res) {
  try {
    const userId = req.user._id;

    const outgoingReqs = await FriendRequest.find({
      sender: userId,
      status: 'pending'
    }).populate('recipient', '-password -friends'); 

    res.status(200).json(outgoingReqs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching outgoing friend requests', error });
  }
}