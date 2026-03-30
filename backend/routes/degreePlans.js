const express = require('express');
const router = express.Router();
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
