const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const courseStorage = require('../db_manager/courseStorage')

const getCourseById = async (req, res) => {
  const { id } = req.params;
  console.log(`[API] ${new Date().toISOString()} - GET /api/courses/${id}`);

  const course = courseStorage.getCourseById(id);
  
  var result;
  if (!course) {
    result = { 
      success: false, 
      message: 'Course not found' 
    };
  } else{
    result = {
      success: true, 
      message: 'Course found', 
      data: course
    };
  }
  
  const statusCode = result.success ? 200 : 404;
  res.status(statusCode).json(result);

};

const getAllCourses = async (req, res) => {
  const courses = courseStorage.getAllCourses();
  console.log(req.url);
  var result;
  if (!courses) {
    result = { 
      success: false, 
      message: 'Courses not found' 
=======
const degreePlanStorage = require('../db_manager/degreePlanStorage')

const getDegreePlanByID = async (req, res) => {
  const { studentID } = req.params;

  console.log(req.url);

  const degreePlan = await degreePlanStorage.getDegreePlanByID(studentID);

  var result;
  if (!degreePlan) {
    result = { 
      success: false, 
      message: 'No degree plan found' 
>>>>>>> 789787a83c3f9a058436c419a3910b09ed5b562f
    };
  } else{
    result = {
      success: true, 
<<<<<<< HEAD
      message: 'Courses found', 
      data: courses
=======
      message: 'degree plan found', 
      data: degreePlan
>>>>>>> 789787a83c3f9a058436c419a3910b09ed5b562f
    };
  }

  const statusCode = result.success ? 200 : 404;
  res.status(statusCode).json(result);
<<<<<<< HEAD

};

router.get('/all', getAllCourses)
module.exports = router;
=======
  console.log(result);
};

const createDegreePlan = async (req, res) => {
  const { DegreePlanName, studentID } = req.body;

  console.log(req.url);
  console.log(req.body);

  const creationSuccess = await degreePlanStorage.createDegree(DegreePlanName, studentID);

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





router.get('/:student_id', getDegreePlanByID);
router.post('/create', createDegreePlan);

module.exports = router;
>>>>>>> 789787a83c3f9a058436c419a3910b09ed5b562f
