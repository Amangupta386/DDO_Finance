// expenseCategoriesRoutes.js
const express = require('express');
const router = express.Router();
const ExpenseCategoriesController = require('../controllers/database1/expenseCategoriesController');

router.route('/')
    // Create an ExpenseCategory
    .post(ExpenseCategoriesController.createExpenseCategory)

    // Get all ExpenseCategories
    .get(ExpenseCategoriesController.getAllExpenseCategories)

router.route('/:id')
    // Get a specific ExpenseCategory by ID
    .get(ExpenseCategoriesController.getExpenseCategoryById)

    // Update an ExpenseCategory by ID
    .put(ExpenseCategoriesController.updateExpenseCategoryById)

    // Delete an ExpenseCategory by ID
    // .delete(ExpenseCategoriesController.deleteExpenseCategoryById);

module.exports = router;
