const express = require('express');
const router = express.Router();
const degreeStorage = require('../db_manager/degreeStorage');
const {authenticate} = require('../firebaseTokenHandler');

const getDegreeByID = async (req, res) => {
  const { degreeID } = req.params;
  console.log(degreeID);
  const degree = await degreeStorage.getDegreeByID(degreeID);

  var result;
  if (!degree) {
    result = { 
      success: false, 
      message: 'No degree found' 
    };
  } else{
    result = {
      success: true, 
      message: 'degree found', 
      data: degree
    };
  }

  const statusCode = result.success ? 200 : 404;
  res.status(statusCode).json(result);
};

const getAllDegrees = async (req, res) => {
  console.log(req.url);
  const degrees = degreeStorage.getAllDegrees();
  var result;
  if (!degrees) {
    result = { 
      success: false, 
      message: 'Degrees not found' 
    };
  } else{
    result = {
      success: true, 
      message: 'Degrees found', 
      data: degrees
    };
  }

  const statusCode = result.success ? 200 : 404;
  res.status(statusCode).json(result);
}

const createDegree = async (req, res) => {
  const { name, is_minor, course_reqs, credit_reqs } = req.body;

  console.log(req.url);
  console.log(req.body);

  console.log(name);
  console.log(is_minor);
  console.log(course_reqs);
  console.log(is_minor);

  const creationSuccess = await degreeStorage.createDegree(name, is_minor, course_reqs, credit_reqs);

  var result;
  if (!creationSuccess) {
    result = { 
      success: false, 
      message: 'Error with creating degree in database' 
    };
  } else{
    result = {
      success: true, 
      message: 'Created degree', 
      data: creationSuccess
    };
  }

  res.status(200).json(result);
  console.log(result);
};




router.get('/all', authenticate, getAllDegrees);
router.get('/:degreeID', authenticate, getDegreeByID);
router.post('/create', authenticate, createDegree);

module.exports = router;
