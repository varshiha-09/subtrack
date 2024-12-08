const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import the User model

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
  
    try {
      // Find the user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the password matches
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
          return res.status(401).json({ error: 'Invalid credentials' });
      }
      
  
      res.json({ userId: user._id, email: user.email });
    } catch (error) {
      console.error('Error during login:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


  router.post('/register', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Create a new user
      const newUser = new User({ email, password });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
    } catch (error) {
      console.error('Error during registration:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
