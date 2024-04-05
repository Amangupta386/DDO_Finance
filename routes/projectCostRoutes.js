
const express = require('express');
const router = express.Router();
const projectCostController = require('../controllers/database1/projectCostController');
const wttprojectProjectCostController = require('../controllers/combine/wttproject_projectCost_controller');


router.route('/')
    // Create a projectCost
    .post(projectCostController.createProjectCost)
    // Get all projectCost 
    // .get(projectCostController.getAllProjectCosts);
    // Get all projectCost combined with project name and client name
    .get(wttprojectProjectCostController.getAllProjectsCostWithCorrespondingNames);

router.route('/:id')
    // Read one project by ID    
    .get(projectCostController.getProjectCostById)
    // Update a project by ID
    .put(projectCostController.updateProjectCostById);
    // Delete a project by ID
    // .delete(projectCostController.deleteProjectCostById);

module.exports = router;
