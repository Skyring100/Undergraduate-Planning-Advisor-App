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

const addCompletedCourses = async (req, res) => {
  console.log(req.url);
  console.log(req.params);
  console.log(req.body);
  const {student_id} = req.params;
  const courses = req.body.courses;

  const insertRes = await userStorage.addCompletedCourses(student_id, courses);

  var result;
  if (!insertRes) {
    result = { 
      success: false, 
      message: 'Failed to add courses to user' 
    };
  } else{
    result = {
      success: true, 
      message: 'Added courses to user', 
      data: insertRes
    };
  }
  const statusCode = result.success ? 200 : 404;
  res.status(statusCode).json(result);
};

router.get('/profile', getCurrentUser);
router.put('/courses/:student_id', addCompletedCourses);

module.exports = router;
