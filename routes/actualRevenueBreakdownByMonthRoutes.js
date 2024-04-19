const express = require('express');
const router = express.Router();
const actualRevenueBreakdownByMonthController = require('../controllers/database1/actualRevenueBreakdownByMonthController');

router.route('/dashboard').get(actualRevenueBreakdownByMonthController.getDashboardActualRevenue);
router.route('/')
  .post(actualRevenueBreakdownByMonthController.createRecord)
  .get(actualRevenueBreakdownByMonthController.getAllRecords);

router.route('/:id')
  .get(actualRevenueBreakdownByMonthController.getRecordById)
  .put(actualRevenueBreakdownByMonthController.updateRecord)
  .delete(actualRevenueBreakdownByMonthController.deleteRecord);

module.exports = router;
