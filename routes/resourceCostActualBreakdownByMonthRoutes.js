// routes/resourceCostActualBreakdownByMonthRoutes.js
const express = require('express');
const router = express.Router();

const resourceCostActualBreakdownByMonthController = require('../controllers/database1/resourceCostActualBreakdownByMonthController');
const wttEmp_resourceCostActualBreakdownController = require('../controllers/combine/wttEmp_resourceActualCostMonthlyBreakdownController');

router.route('/')
  .post(resourceCostActualBreakdownByMonthController.createRecord)
  .get(resourceCostActualBreakdownByMonthController.getAllRecords);

router.route('/:id')
  .get(resourceCostActualBreakdownByMonthController.getRecordById)
  .put(resourceCostActualBreakdownByMonthController.updateRecord)
  .delete(resourceCostActualBreakdownByMonthController.deleteRecord);

router.route('/project/:projectId')
  .get(wttEmp_resourceCostActualBreakdownController.getAllResourceCostWithNames);


module.exports = router;
