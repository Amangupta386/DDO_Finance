const express = require('express');
const router = express.Router();
const resourceCostForecastBreakdownByMonth = require('../controllers/database1/resourceCostForecastBreakdownByMonth');

router.route('/')
  // Create a new record
  .post(resourceCostForecastBreakdownByMonth.createRecord)
  // Get all records
  .get(resourceCostForecastBreakdownByMonth.getAllRecords);

router.route('/:id')
  // Get a single record by ID
  .get(resourceCostForecastBreakdownByMonth.getRecordById)
  // Update a record by ID
  .put(resourceCostForecastBreakdownByMonth.updateRecord)
  // Delete a record by ID
  .delete(resourceCostForecastBreakdownByMonth.deleteRecord);

module.exports = router;
