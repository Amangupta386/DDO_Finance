// routes/items.js
const express = require('express');
const router = express.Router();
// const projectController = require('../controllers/project');
const projectController = require('../controllers/database2/WTTProjectController');
const projectWithNameController = require('../controllers/combine/wttproject_projectCost_controller');


router.route('/')
    // Create a project
    .post(projectController.createProject)
    // Get all Project
    // .get(projectController.getAllProjects);
    // Get all projects with name
    .get(projectWithNameController.getAllProjectsWithCorrespondingNameList);
    

router.route('/:id')
    // Read one project by ID    
    .get(projectController.getProjectById)
    // Update a project by ID
    .put(projectController.updateProjectById);
    // Delete a project by ID
    // .delete(projectController.deleteProjectById);

module.exports = router;
