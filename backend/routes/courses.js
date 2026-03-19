const express = require('express');
const router = express.Router();
const courseStorage = require('../db_manager/courseStorage')

const getCourseById = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting course',
      error: error.message
    });
  }
};

const getAllCourses = async (req, res) => {
  try
  {
    console.log(`[API] ${new Date().toISOString()} - GET /api/courses`);

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
  } catch (error)
  {
    res.status(500).json({
      success: false,
      message: 'Error getting all courses',
      error: error.message
    });
  }
};

router.get('/', getAllCourses)
router.get('/:id', getCourseById)
module.exports = router;