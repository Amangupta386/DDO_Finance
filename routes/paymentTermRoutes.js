// routes/items.js
const express = require('express');
const router = express.Router();
// const projectController = require('../controllers/project');
const paymentTermController = require('../controllers/database2/paymentTermController');


router.route('/')
    // Create a project
    .post(paymentTermController.createPaymentTerm)
    // Update a project
    .get(paymentTermController.getAllPaymentTerms);

router.route('/:id')
    // Read one project by ID    
    .get(paymentTermController.getPaymentTermById)
    // Update a project by ID
    .put(paymentTermController.updatePaymentTerm);
    // Delete a project by ID
    // .delete(paymentTermController.deletePaymentTerm);

module.exports = router;
