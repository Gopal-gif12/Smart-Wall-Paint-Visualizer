const express = require('express');
const bcrypt = require('bcryptjs');
const { UserRepository } = require('../models/User');
const { generateToken, requireAuth } = require('../middleware/auth');

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existing = await UserRepository.findByEmail(email);
    if (existing) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const user = await UserRepository.create({
      name,
      email,
      password,
      role: role === 'admin' ? 'admin' : 'user'
    });

    const token = generateToken(user);
    res.status(201).json({
      message: 'Account registered successfully',
      token,
      user: {
        id: user._id || user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        favoriteColors: user.favoriteColors || []
      }
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await UserRepository.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user);
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id || user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        favoriteColors: user.favoriteColors || []
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Get current user profile
router.get('/me', requireAuth, async (req, res) => {
  try {
    const user = await UserRepository.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      id: user._id || user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      favoriteColors: user.favoriteColors || [],
      createdAt: user.createdAt
    });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving user profile' });
  }
});

// Toggle favorite color
router.post('/favorite', requireAuth, async (req, res) => {
  try {
    const { colorCode } = req.body;
    if (!colorCode) {
      return res.status(400).json({ message: 'Color code required' });
    }
    const favorites = await UserRepository.toggleFavorite(req.user.id, colorCode);
    res.json({ favorites });
  } catch (err) {
    res.status(500).json({ message: 'Error updating favorite colors' });
  }
});

module.exports = router;
