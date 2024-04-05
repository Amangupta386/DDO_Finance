// routes/items.js
const express = require('express');
const router = express.Router();
// const projectController = require('../controllers/project');
const wttEmployeeController = require('../controllers/database2/wttEmployeeController');


router.route('/')
    // Create a project
    .post(wttEmployeeController.employeeValidationRules, wttEmployeeController.createEmployee)
    // Update a project
    .get(wttEmployeeController.getAllEmployees);

router.route('/:id')
    // Read one project by ID    
    .get(wttEmployeeController.getEmployeeById)
    // Update a project by ID
    .put(wttEmployeeController.employeeValidationRules, wttEmployeeController.updateEmployee);
    // Delete a project by ID
    // .delete(wttEmployeeController.deleteEmployee);

module.exports = router;
