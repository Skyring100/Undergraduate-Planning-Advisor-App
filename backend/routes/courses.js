const express = require('express');
const router = express.Router();
const courseStorage = require('../db_manager/courseStorage');
const {authenticate} = require('../firebaseTokenHandler');

const getCourseById = async (req, res) => {
  const { id } = req.params;

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
};

const getCoursesByDepartment = async (req, res) => {
  const {department} = req.params;
  const courses = courseStorage.getCoursesByDepartment(department);
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

const getDepartmentCodes = async (req, res) => {
  const codes = courseStorage.getDepartmentCodes();
  var result;
  if (!courses) {
    result = { 
      success: false, 
      message: 'Could not get department codes' 
    };
  } else{
    result = {
      success: true, 
      message: 'Department codes successful', 
      data: codes
    };
  }
  const statusCode = result.success ? 200 : 404;
  res.status(statusCode).json(result);
};

const prereqCheck = async (req, res) => {
  const { completed, target } = req.params;
  const courses = completed.split(",");
  const matches = courseStorage.checkIfPrereqsMatchCourse(courses, target);
  
  var result;
  if (!target) {
    result = { 
      success: false, 
      message: 'No target specified or malformed URL'
    };
  } else {
    result = {
      success: true, 
      message: 'Prereqs ' + (matches ? 'match' : 'do not match') + " the course",
      data: matches,
    };
  }

  const statusCode = result.success ? 200 : 404;
  res.status(statusCode).json(result);

};

const prereqList = async (req, res) => {
  const { target } = req.params;
  const prereqs = courseStorage.getPrereqsOf(target);
  
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
    console.log("Route worked");

  const statusCode = result.success ? 200 : 404;
  res.status(statusCode).json(result);

};

const prereqString = async (req, res) => {
  console.log("route has been called");
  const { completed, target } = req.params;
  const courses = completed.split(",");
  const matches = courseStorage.makeNestedPrereqString(courses, target);
  console.log("finished getting prereqs from db");
  
  var result;
  if (!target) {
    result = { 
      success: false, 
      message: 'No target specified or malformed URL'
    };
  } else {
    result = {
      success: true, 
      message: 'Prereqs object obtained for the course',
      data: matches,
    };
  }

  const statusCode = result.success ? 200 : 404;
  res.status(statusCode).json(result);

};

router.get('/all', authenticate, getAllCourses);
router.get('/:id', authenticate, getCourseById);
router.get('/allprereqs/:target', authenticate, prereqList);
router.get('/check/:completed/:target', authenticate, prereqCheck);
router.get('/string/:completed/:target', authenticate, prereqString);
router.get('department/:department', authenticate, getCoursesByDepartment);
router.get('department/codes', authenticate, getDepartmentCodes);
module.exports = router;
