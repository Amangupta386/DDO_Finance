// routes/items.js
const express = require('express');
const router = express.Router();
// const projectController = require('../controllers/project');
const wttCustomerController = require('../controllers/database2/wttCustomerController');


router.route('/')
    // Create a project
    .post(wttCustomerController.createWTTCustomer)
    // Update a project
    .get(wttCustomerController.getAllWTTCustomers);

router.route('/:id')
    // Read one project by ID    
    .get(wttCustomerController.getWTTCustomerById)
    // Update a project by ID
    .put(wttCustomerController.updateWTTCustomerById);
    // Delete a project by ID
    // .delete(wttCustomerController.deleteWTTCustomerById);

module.exports = router;
