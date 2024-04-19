// routes/forecastedCollectionBreakdownByMonthRoutes.js
const express = require('express');
const router = express.Router();
const forecastedCollectionBreakdownByMonthController = require('../controllers/database1/forecastedCollectionBreakdownByMonthController');

router.route('/dashboard').get(forecastedCollectionBreakdownByMonthController.getDashboardForecastedCollection);
router.route('/')
  .post(forecastedCollectionBreakdownByMonthController.createRecord)
  .get(forecastedCollectionBreakdownByMonthController.getAllRecords);

router.route('/:id')
  .get(forecastedCollectionBreakdownByMonthController.getRecordById)
  .put(forecastedCollectionBreakdownByMonthController.updateRecord)
  .delete(forecastedCollectionBreakdownByMonthController.deleteRecord);

module.exports = router;
