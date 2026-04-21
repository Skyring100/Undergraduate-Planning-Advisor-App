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

const getAllCheckedOffBy = async (req, res) => {
  const {student_id} = req.params;
  const resp = await userStorage.getAllCheckedOffBy(student_id);
  var result;
  if (!resp) {
    result = { 
      success: false, 
      message: 'User not found' 
    };
  } else{
    result = {
      success: true, 
      message: 'User found', 
      data: resp
    };
  }
  const statusCode = result.success ? 200 : 404;
  res.status(statusCode).json(result);
};

const updateFirstName = async (req, res) => {
  console.log(req.url);
  console.log(req.params);
  console.log(req.body);

  const {formatResponseObject} = require('../server');

  const {studentID, firstName} = req.body;

  const updateRes = userStorage.updateFirstName(studentID, firstName);
  formatResponseObject(res, updateRes, "Changed user first name", "Failed to update user first name");
}

const updateLastName = async (req, res) => {
  console.log(req.url);
  console.log(req.params);
  console.log(req.body);

  const {formatResponseObject} = require('../server');

  const {studentID, lastName} = req.body;

  const updateRes = userStorage.updateLastName(studentID, lastName);
  formatResponseObject(res, updateRes, "Changed user last name", "Failed to update user last name");
}

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
  console.log(req.url);
  console.log(req.params);
  console.log(req.body);
  
  const {formatResponseObject} = require('../server');

  const {studentID, degreeID} = req.body;


  const updateRes = userStorage.setCurrentUserDegree(studentID, degreeID);
  formatResponseObject(res, updateRes, "Changed current user degree", "Failed to create current user degree");
};

const setCurrentUserDegreePlan = async (req, res) => {
  const {student_id, degree_plan_id} = req.body;

  const updateRes = userStorage.setCurrentuserDegreePlan(student_id, degree_plan_id);
  formatResponseObject(res, updateRes, "Changed current user degree plan", "Failed to create current user degree plan");
};

router.get('/profile/:student_id', authenticate,getCurrentUser);
router.put('/courses/:student_id', authenticate, addCompletedCourses);
router.put('/first-name/:student_id', authenticate, updateFirstName);
router.put('/last-name/:student_id', authenticate, updateLastName);
<<<<<<< HEAD
router.get('/checked/:student_id', authenticate, getAllCheckedOffBy);
router.put('/set-degree', authenticate, setCurrentUserDegree);
=======
router.put('/set-degree/:student_id', authenticate, setCurrentUserDegree);
>>>>>>> refs/remotes/origin/master
router.put('/set-degree-plan', authenticate, setCurrentUserDegreePlan);

module.exports = router;
