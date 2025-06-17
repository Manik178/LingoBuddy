import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { upsertStreamUser } from '../lib/stream.js';
import { configDotenv } from 'dotenv';
configDotenv();

export async function signup(req, res) {
  const { fullName, password, email } = req.body;

  try {
    // Validate input
    if (!fullName || !password || !email) {
      return res.status(400).send('All fields are required');
    }

    if (password.length < 6) {
      return res.status(400).send('Password must be at least 6 characters long');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send('Invalid email format');
    }

    // Check if email or fullName already exist (in parallel)
    const [existingEmail, existingName] = await Promise.all([
      User.findOne({ email }),
      User.findOne({ fullName }),
    ]);

    if (existingEmail) {
      return res.status(400).send('Email already in use');
    }

    if (existingName) {
      return res.status(400).send('Full name already in use');
    }

    // Auto-generate random avatar
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomProfilePic = `https://avatar.iran.liara.run/public/${idx}.png`;

    // Create new user (password will be hashed by the schema's pre-save hook)
    const newUser = await User.create({
      fullName,
      password, // plain password; hashed in pre('save') hook
      email,
      profilePicture: randomProfilePic,
    });

    await newUser.save();


try {

  await upsertStreamUser({
    id: newUser._id.toString(),
    fullName: newUser.fullName,
    profilePicture: newUser.profilePicture || '',
  })
  console.log(`Stream user upserted successfully : ${newUser.fullName}`);
} catch (error) {
  console.error('Error upserting Stream user:', error);
  res.status(500).send('Internal server error');    
}


    // Sign JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'Strict',
    });

    // Send response
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
      },
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send('Internal server error');
  }
}


export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid email or password');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: 'Strict',
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Internal server error');
  }
}

export function logout(req, res) {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
  res.status(200).json({ success: true, message: 'Logout successful' });
}

export async function onboard(req, res) {
  const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body;

  try {
    if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
      return res.status(400).json({
        message: 'All fields are required',
        missingFields: {
          fullName: !fullName,
          bio: !bio,
          nativeLanguage: !nativeLanguage,
          learningLanguage: !learningLanguage,
          location: !location,
        },
      });
    }

    const userId = req.user._id || req.user.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullName,
        bio,
        profilePicture: req.user.profilePicture || '',
        nativeLanguage,
        learningLanguage,
        location,
        isOnboarded: true,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        fullName: updatedUser.fullName,
        bio: updatedUser.bio,
        email: updatedUser.email,
        profilePicture: updatedUser.profilePicture || '',
        nativeLanguage: updatedUser.nativeLanguage,
        learningLanguage: updatedUser.learningLanguage,
        location: updatedUser.location,
      });

      console.log(`Stream user upserted successfully: ${updatedUser.fullName}`);
    } catch (error) {
      console.error('Error upserting Stream user:', error);
      return res.status(500).send('Internal server error');
    }

    res.status(200).json({
      success: true,
      message: 'Onboarding successful',
      user: {
        id: updatedUser._id,
        fullName: updatedUser.fullName,
        bio: updatedUser.bio,
        email: updatedUser.email,
        profilePicture: updatedUser.profilePicture,
        nativeLanguage: updatedUser.nativeLanguage,
        learningLanguage: updatedUser.learningLanguage,
        location: updatedUser.location,
      },
    });
  } catch (error) {
    console.error('Error during onboarding:', error);
    res.status(500).send('Internal server error');
  }
}
