const express = require('express');
const router = express.Router();
const otherExpensesController = require('../controllers/database1/otherExpensesController');

router.route('/')
  // Create a new record
  .post(otherExpensesController.createOtherExpense)
  // Get all records
  .get(otherExpensesController.getOtherExpenses);

router.route('/:id')

  // Update a record by ID
  .put(otherExpensesController.updateOtherExpense)
  

module.exports = router;
