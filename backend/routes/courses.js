const express = require('express');
const router = express.Router();
const courseStorage = require('../db_manager/courseStorage');
const {authenticate} = require('../firebaseTokenHandler');

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
  console.log(req.url);
  const courses = courseStorage.getAllCourses();
  var result;
  if (!courses) {
    result = { 
      success: false, 
      message: 'Courses not found' 
    };
  } else{
    result = {
      success: true, 
      message: 'Courses found', 
      data: courses
    };
  }

  const statusCode = result.success ? 200 : 404;
  res.status(statusCode).json(result);

};

const prereqCheck = async (req, res) => {
  const { completed, target } = req.params;
  const courses = completed.split(",");
  const matches = courseStorage.checkIfPrereqsMatchCourse(courses, target);
  
  console.log(req.url);
  var result;
  if (!target) {
    result = { 
      success: false, 
      message: 'No target specified or malformed URL'
    };
  } else {
    result = {
      success: true, 
      message: 'Prereqs ' + (matches ? 'match' : 'do not match') + "the course ",
      data: matches,
    };
  }

  const statusCode = result.success ? 200 : 404;
  res.status(statusCode).json(result);

};

const prereqList = async (req, res) => {
  const { target } = req.params;
  const prereqs = courseStorage.getPrereqsOf(target);
  
  console.log(req.url);
  var result;
  if (!target) {
    result = { 
      success: false, 
      message: 'No target specified or malformed URL'
    };
  } else {
    result = {
      success: true, 
      message: "Got prereqs",
      data: prereqs,
    };
  }

  const statusCode = result.success ? 200 : 404;
  res.status(statusCode).json(result);

};

router.get('/all', authenticate, getAllCourses)
router.get('/:id', getCourseById)
router.get('/allprereqs/:target', prereqList)
router.get('/check/:completed/:target', prereqCheck)
module.exports = router;
