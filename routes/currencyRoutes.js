// routes/items.js
const express = require('express');
const router = express.Router();
// const projectController = require('../controllers/project');
const currencyController = require('../controllers/database2/currencyController');


router.route('/')
    // Create a project
    .post(currencyController.createCurrency)
    // Update a project
    .get(currencyController.getAllCurrencies);

router.route('/:id')
    // Read one project by ID    
    .get(currencyController.getCurrencyById)
    // Update a project by ID
    .put(currencyController.updateCurrency);
    // Delete a project by ID
    // .delete(currencyController.deleteCurrency);

module.exports = router;
