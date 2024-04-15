// routes/items.js
const express = require('express');
const { getAllFinacialYears } = require('../controllers/database2/wtt_financialYear');
const router = express.Router();



router.route('/')
    // Update a project
    .get(getAllFinacialYears);

// router.route('/:id')
//     // Read one project by ID    
//     .get(financialYearController.getFinancialYearById)
//     // Update a project by ID
//     .put(financialYearController.updateFinancialYearById);
    // Delete a project by ID
    // .delete(financialYearController.deleteFinancialYearById);

module.exports = router;
