const express = require('express');
const router = express.Router();
const degreeStorage = require('../db_manager/degreeStorage')

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
  const { degree } = req.params;

  console.log(req.url);

  const creationSuccess = await degreeStorage.createDegree(degree);

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





router.get('/:degree_id', getDegreeByID);
router.put('/create', createDegree);

module.exports = router;
