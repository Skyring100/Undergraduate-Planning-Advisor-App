const express = require('express');
const router = express.Router();
const userStorage = require('../db_manager/userStorage');
const {authenticate} = require('../firebaseTokenHandler');
const {formatResponseObject} = require('../server');

const getCurrentUser = async (req, res) => {
  const {student_id} = req.params;


  const user = await userStorage.getUserByStudentID(student_id);


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

const setCurrentUserDegree = async (req, res) => {
  const {student_id, degree_id} = req.body;


  const updateRes = userStorage.setCurrentUserDegree(student_id, degree_id);
  formatResponseObject(res, updateRes, "Changed current user degree", "Failed to create current user degree");
};

const setCurrentUserDegreePlan = async (req, res) => {
  const {student_id, degree_plan_id} = req.body;

  const updateRes = userStorage.setCurrentuserDegreePlan(student_id, degree_plan_id);
  formatResponseObject(res, updateRes, "Changed current user degree plan", "Failed to create current user degree plan");
};

router.get('/profile/:student_id', authenticate,getCurrentUser);
router.put('/courses/:student_id', authenticate, addCompletedCourses);
router.put('/set-degree', authenticate, setCurrentUserDegree);
router.put('/set-degree-plan', authenticate, setCurrentUserDegreePlan);

module.exports = router;
