const express = require('express');
const router = express.Router();
const { saveUser, getUserByEmail } = require('../db_manager/userStorage');
const {authenticate} = require('../firebaseTokenHandler');



const registerUser = async (req, res) => {
  console.log(req.url);
  console.log(req.body);
  const {id, email, first_name, last_name } = req.body;


  const existingUser = getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'User with this email already exists'
    });
  }
  //console.log(req.user);
  saveUser(id, email, first_name, last_name);

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

  var user = getUserByEmail(email);

  console.log(user);
  res.status(201).json({
    success: true,
    message: 'Login successful',
    data: user
  });
};




router.post('/register', authenticate,  registerUser);

router.post('/login', authenticate,  loginUser);

module.exports = router;
