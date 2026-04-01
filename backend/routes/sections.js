const express = require('express');
const router = express.Router();
const sectionStorage = require('../db_manager/sectionStorage');
const {authenticate} = require('../firebaseTokenHandler');

const getSectionsForCourse = async (req, res) => {
  const { courseID } = req.params;

  console.log(req.url);

  const sections = sectionStorage.getSectionsForCourse(courseID);

  var result;
  if (!sections) {
    result = {
      success: false,
      message: 'No sections found'
    };
  } else {
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
  const { crn } = req.params;
  console.log(req.url);

  const section = sectionStorage.getSectionByCRN(crn);

  var result;
  if (!section) {
    result = {
      success: false,
      message: 'No section found'
    };
  } else {
    result = {
      success: true,
      message: 'Section found',
      data: section
    };
  }

  const statusCode = result.success ? 200 : 404;
  res.status(statusCode).json(result);
};

const getSectionsOnDayOfWeek = async (req, res) => {
  const { dow } = req.params;
  console.log(req.url);

  const sections = sectionStorage.getSectionsOnDayOfWeek(dow);

  var result;
  if (!sections) {
    result = {
      success: false,
      message: 'No section found'
    };
  } else {
    result = {
      success: true,
      message: 'Section found',
      data: sections
    };
  }

  const statusCode = result.success ? 200 : 404;
  res.status(statusCode).json(result);
}

const addSection = async (req, res) => {
  const { c_id, dow, start_time, end_time, start_date, end_date, building, room_n, instructor } = req.params;
  console.log(req.url);

  const section = sectionStorage.setSection(c_id, dow, start_time, end_time, start_date, end_date, building, room_n, instructor);
  console.log("section is "+  section  );

  var result;
  if (!section) {
    result = {
      success: false,
      message: 'No section found'
    };
  }
  else {
      result = {
      success: true,
      message: 'Section created',
      data: section
    };
  }
}


router.get('/course/:courseID', authenticate, getSectionsForCourse);
router.get('/:crn', authenticate, getSectionByCRN);
router.get('/dow/:dow', authenticate, getSectionsOnDayOfWeek);
router.post('/course', authenticate, addSection);

module.exports = router;
