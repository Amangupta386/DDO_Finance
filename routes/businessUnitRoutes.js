// routes/items.js
const express = require('express');
const router = express.Router();
// const projectController = require('../controllers/project');
const wttBusinessUnitController = require('../controllers/database2/wttBusinessUnitController');


router.route('/')
    // Create a project
    .post(wttBusinessUnitController.createWTTBusinessUnit)
    // Update a project
    .get(wttBusinessUnitController.getAllWTTBusinessUnits);

router.route('/:id')
    // Read one project by ID    
    .get(wttBusinessUnitController.getWTTBusinessUnitById)
    // Update a project by ID
    .put(wttBusinessUnitController.updateWTTBusinessUnitById);
    // Delete a project by ID
    // .delete(wttBusinessUnitController.deleteWTTBusinessUnitById);

module.exports = router;
