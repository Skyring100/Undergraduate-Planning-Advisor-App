const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { saveUser, getUserByEmail } = require('../db_manager/userStorage');

const registerUser = async (req, res) => {
  console.log(`[API] ${new Date().toISOString()} - POST /api/auth/register - Email: ${req.body.email}`);
  const { email, password, firstName, lastName } = req.body;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'User with this email already exists'
    });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = {
    email,
    firstName,
    lastName,
    password: hashedPassword,
    createdAt: new Date().toISOString()
  };

  await saveUser(user);

  const token = jwt.sign(
    {email: user.email },
    process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    { expiresIn: '7d' }
  );

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token
    }
  });
};

const loginUser = async (req, res) => {
  console.log(`[API] ${new Date().toISOString()} - POST /api/auth/login - Email: ${req.body.email}`);
  const { email, password } = req.body;

  const user = await getUserByEmail(email);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    { expiresIn: '7d' }
  );

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token
    }
  });
};

router.post('/register', registerUser);

router.post('/login', loginUser);

// Export router so server.js can use it
module.exports = router;
