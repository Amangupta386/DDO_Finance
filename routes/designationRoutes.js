// routes/items.js
const express = require('express');
const router = express.Router();
// const projectController = require('../controllers/project');
const designationController = require('../controllers/database2/designationController');


router.route('/')
    // Create a Designation
    // .post(designationController.createCity)
    // Get All Designation
    .get(designationController.getAllDesignations);

router.route('/:id')
    // Read one Designation by ID    
    .get(designationController.getDesignationById);
    // Update a Designation by ID
    // .put(designationController.updateCity);
    // Delete a Designation by ID
    //  .delete(designationController.deleteCity);

module.exports = router;
