import { StreamChat } from 'stream-chat';
import { configDotenv } from 'dotenv';
configDotenv();

const apikey = process.env.STREAM_API_KEY;
const secret = process.env.STREAM_API_SECRET;
if(!apikey || !secret) {
  throw new Error('STREAM_API_KEY and STREAM_API_SECRET must be set in .env file');
}
const serverClient = StreamChat.getInstance(apikey, secret);
export const upsertStreamUser = async (user) => {
  try {
    const { id, fullName, profilePicture } = user;

    // Upsert user in Stream
    const streamUser = await serverClient.upsertUser({
      id,
      name: fullName,
      image: profilePicture,
    });

    return streamUser;
  } catch (error) {
    console.error('Error upserting Stream user:', error);
    throw error;
  }
} 

export const generateStreamToken = (userId) => {
  try {
    const userIdStr = userId.toString();
    const token = serverClient.createToken(userIdStr);
    return token;
  } catch (error) {
    console.error('Error generating Stream token:', error);
    throw error;
  }
}