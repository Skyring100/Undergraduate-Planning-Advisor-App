const express = require('express');
const router = express.Router();
const sectionStorage = require('../db_manager/sectionStorage')

const getSectionsForCourse = async (req, res) => {
  const { courseID } = req.params;

  console.log(req.url);

  const sections = await sectionStorage.getSectionsForCourse(courseID);

  var result;
  if (!sections) {
    result = { 
      success: false, 
      message: 'No sections found' 
    };
  } else{
    result = {
      success: true, 
      message: 'Sections found', 
      data: sections
    };
  }

  const statusCode = result.success ? 200 : 404;
  res.status(statusCode).json(result);
  console.log(result);
};


const getSectionByCRN = async (req, res) => {
  const crn = req.user.crn;
  console.log('/:crn');

  const section = await sectionStorage.getSectionByCRN(crn);

  var result;
  if (!section) {
    result = { 
      success: false, 
      message: 'No section found' 
    };
  } else{
    result = {
      success: true, 
      message: 'Section found', 
      data: section
    };
  }

  const statusCode = result.success ? 200 : 404;
  res.status(statusCode).json(result);
};

router.get('/:courseID', getSectionsForCourse);
router.get('/:crn', getSectionByCRN);

module.exports = router;
