const express = require('express');
const router = express.Router();
const userStorage = require('../db_manager/userStorage')

const getCurrentUser = async (req, res) => {
  const userId = req.user.userId;

  console.log(req.url);

  const user = await userStorage.getUserById(userId);

  var result;
  if (!user) {
    result = { 
      success: false, 
      message: 'User not found' 
    };
  } else{
    result = {
      success: true, 
      message: 'User found', 
      data: user
    };
  }

  const statusCode = result.success ? 200 : 404;
  res.status(statusCode).json(result);
};

router.get('/profile', getCurrentUser);

module.exports = router;
