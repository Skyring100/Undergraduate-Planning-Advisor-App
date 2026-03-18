const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const { saveUser, getUserByEmail } = require('../db_manager/userStorage');

const registerUser = async (req, res) => {
  console.log(req.url);
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

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }
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

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }
    }
  });
};

router.post('/register', registerUser);

router.post('/login', loginUser);

module.exports = router;
