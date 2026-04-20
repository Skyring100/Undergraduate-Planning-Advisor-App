const express = require('express');
const router = express.Router();
const degreePlanStorage = require('../db_manager/degreePlanStorage');
const {authenticate} = require('../firebaseTokenHandler');

const getDegreePlanByID = async (req, res) => {
  const { student_id } = req.params;

  console.log(req.url);
  console.log(req.params);

  const degreePlan = degreePlanStorage.getDegreePlanByID(student_id);

  var result;
  if (!degreePlan) {
    result = { 
      success: false, 
      message: 'No degree plan found' 
    };
  } else{
    result = {
      success: true, 
      message: 'degree plan found', 
      data: degreePlan
    };
  }

  const statusCode = result.success ? 200 : 404;
  res.status(statusCode).json(result);
  console.log(result);
};

const createDegreePlan = async (req, res) => {
  const { degree_plan_name, student_id } = req.body;

  console.log(req.url);
  console.log(req.body);

  const creationSuccess = await degreePlanStorage.createDegreePlan(degree_plan_name, student_id);

  var result;
  if (!creationSuccess) {
    result = { 
      success: false, 
      message: 'Error with creating degree plan in database' 
    };
  } else{
    result = {
      success: true, 
      message: 'Created degree plan', 
    };
  }

  res.status(200).json(result);
  console.log(result);
};


const addCourseToDegreePlan = async (req, res) => {
  const { degree_plan_id, year, semester_id, course_id } = req.body;

  console.log(req.url);
  console.log(req.body);

  const creationSuccess = await degreePlanStorage.addCourseToDegreePlan(degree_plan_id, year, semester_id, course_id);

  var result;
  if (!creationSuccess) {
    result = { 
      success: false, 
      message: 'Error with adding course to degree plan in database' 
    };
  } else{
    result = {
      success: true, 
      message: 'Added course to degree plan', 
    };
  }

  res.status(200).json(result);
  console.log(result);
};




router.get('/:student_id', authenticate, getDegreePlanByID);
router.post('/create', authenticate, createDegreePlan);
router.post('/addCourse', authenticate, addCourseToDegreePlan);

module.exports = router;
