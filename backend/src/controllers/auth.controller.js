import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function signup(req, res) {
  const { fullName, password, email } = req.body;

  try {
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

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already in use');
    }

    const existingFullName = await User.findOne({ fullName });
    if (existingFullName) {
      return res.status(400).send('Full name already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const idx = Math.floor(Math.random() * 100) + 1;
    const randomProfilePic = `https://avatar.iran.liara.run/public/${idx}.png`;

    const newUser = new User({
      fullName,
      password: hashedPassword,
      email,
      profilePicture: randomProfilePic,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: 'Strict',
    });

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
export function login(req, res) {
  // Handle user login logic here
  res.send('User logged in successfully');
}
export function logout(req, res) {
  // Handle user logout logic here
  res.send('User logged out successfully');
}