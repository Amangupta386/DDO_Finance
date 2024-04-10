// routes/items.js
const express = require('express');
const router = express.Router();
// const projectController = require('../controllers/project');
const financialYearController = require('../controllers/database2/wtt_financialYear');


router.route('/')
    // Update a project
    .get(financialYearController.getAllFinacialYears);

// router.route('/:id')
//     // Read one project by ID    
//     .get(financialYearController.getFinancialYearById)
//     // Update a project by ID
//     .put(financialYearController.updateFinancialYearById);
    // Delete a project by ID
    // .delete(financialYearController.deleteFinancialYearById);

module.exports = router;
