const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET;

// Register Controller
exports.registerUser = async (req, res) => {
  console.log('Registering user:', req.body);
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Generate JWT token
    const token = newUser.generateAuthToken();

    res.status(201).json({ token, userId: newUser._id });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login Controller
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try{
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = user.generateAuthToken();

        res.status(200).json({ token, userId: user._id });
    } catch(error){
        console.log('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};