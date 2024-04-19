const express = require('express');
const router = express.Router();
const forecastedRevenueBreakdownByMonthController = require('../controllers/database1/forecastedRevenueBreakdownByMonthController');


router.route('/dashboard').get(forecastedRevenueBreakdownByMonthController.getDashboardForecastedRevenue);
router.route('/')
  // Create a new record
  .post(forecastedRevenueBreakdownByMonthController.createRecord)
  // Get all records
  .get(forecastedRevenueBreakdownByMonthController.getAllRecords);

router.route('/:id')
  // Get a single record by ID
  .get(forecastedRevenueBreakdownByMonthController.getRecordById)
  // Update a record by ID
  .put(forecastedRevenueBreakdownByMonthController.updateRecord)
  // Delete a record by ID
  .delete(forecastedRevenueBreakdownByMonthController.deleteRecord);

module.exports = router;
