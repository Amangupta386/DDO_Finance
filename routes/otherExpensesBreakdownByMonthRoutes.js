const express = require('express');
const router = express.Router();
const otherExpensesController = require('../controllers/database1/otherExpensesController');


// router.route('/')
//   // Get all expenses
//   .get(otherExpensesController.getAllExpenses)
//   // Create a new expense
//   .post(otherExpensesController.createExpense);

// router.route('/:id')
//   // Get an expense by ID
//   .get(otherExpensesController.getExpenseById)
//   // Update an expense by ID
//   .put(otherExpensesController.updateExpense)
//   // Delete an expense by ID
//   .delete(otherExpensesController.deleteExpense);

module.exports = router;
