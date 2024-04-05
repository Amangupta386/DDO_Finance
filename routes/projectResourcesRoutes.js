// routes/items.js
const express = require('express');
const router = express.Router();
// const projectController = require('../controllers/project');
const wttProjectResourcesController = require('../controllers/database2/wttProjectResourcesController');


router.route('/')
    // Create a project
    .post(wttProjectResourcesController.projectResourceValidationRules, wttProjectResourcesController.createProjectResource)
    // Update a project
    .get(wttProjectResourcesController.getAllProjectResources);

router.route('/:id')
    // Read one project by ID    
    .get(wttProjectResourcesController.getProjectResourceById)
    // Update a project by ID
    .put(wttProjectResourcesController.projectResourceValidationRules, wttProjectResourcesController.updateProjectResource);
    // Delete a project by ID
    // .delete(wttProjectResourcesController.deleteProjectResource);

module.exports = router;
