const express = require('express');
const router = express.Router();
const degreeStorage = require('../db_manager/degreeStorage');
const {authenticate} = require('../firebaseTokenHandler');

const getDegreeByID = async (req, res) => {
  const { degreeID } = req.params;

  console.log(req.url);

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
  console.log(result);
};

const createDegree = async (req, res) => {
  const { name, is_minor, course_reqs, credit_reqs } = req.body;

  console.log(req.url);
  console.log(req.body);

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
    };
  }

  res.status(200).json(result);
  console.log(result);
};





router.get('/:degree_id', authenticate, getDegreeByID);
router.post('/create', authenticate, createDegree);

module.exports = router;
