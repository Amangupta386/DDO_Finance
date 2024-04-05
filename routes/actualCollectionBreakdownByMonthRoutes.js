const express = require('express');
const router = express.Router();
const actualCollectionBreakdownByMonthController = require('../controllers/database1/actualCollectionBreakdownByMonthController');
router.route('/')
  .post(actualCollectionBreakdownByMonthController.createRecord)
  .get(actualCollectionBreakdownByMonthController.getAllRecords);

router.route('/:id')
  .get(actualCollectionBreakdownByMonthController.getRecordById)
  .put(actualCollectionBreakdownByMonthController.updateRecord)
  .delete(actualCollectionBreakdownByMonthController.deleteRecord);

module.exports = router;
