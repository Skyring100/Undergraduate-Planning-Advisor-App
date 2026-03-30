const express = require('express');
const router = express.Router();
const { saveUser, getUserByEmail } = require('../db_manager/userStorage');
const admin = require('../firebaseAuth');



const registerUser = async (req, res) => {
  console.log(req.url);
  console.log(req.body);
  const { email, first_name, last_name } = req.body;


  const existingUser = getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'User with this email already exists'
    });
  }
  console.log(req.user);
  saveUser(req.user.uid, email, first_name, last_name);

  const newUser = getUserByEmail(email);
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: newUser
  });
};

const loginUser = async (req, res) => {
  
  console.log(req.url);
  console.log(req.body);
  const { email } = req.body;

  const user = getUserByEmail(email);

  res.json({
    success: true,
    message: 'Login successful',
    data: user
  });
};

async function authenticate(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];

  if (token=='') {
    return res.status(401).send('Unauthorized');
  }
  
  console.log(`Got token from user: ${token}`);

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded; // contains uid, email, etc.
    console.log("Token Verified");
    next();
  } catch (err) {
    console.log("Invalid token")
    return res.status(401).send('Invalid token');
  }
}



router.post('/register', authenticate, registerUser);

router.post('/login', authenticate, loginUser);

module.exports = router;