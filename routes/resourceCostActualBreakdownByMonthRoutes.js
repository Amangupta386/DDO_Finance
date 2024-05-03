// routes/resourceCostActualBreakdownByMonthRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const resourceCostActualBreakdownByMonthController = require('../controllers/database1/resourceCostActualBreakdownByMonthController');
const wttEmp_resourceCostActualBreakdownController = require('../controllers/combine/wttEmp_resourceActualCostMonthlyBreakdownController');


router.route('/dashboard').get(resourceCostActualBreakdownByMonthController.getDashboardResourceCostActual);

router.route('/')
  .post(wttEmp_resourceCostActualBreakdownController.updateAllResourceCostWithProjectId)
  .get(resourceCostActualBreakdownByMonthController.getAllRecords);

router.route('/:id')
  .get(resourceCostActualBreakdownByMonthController.getRecordById)
  .put(resourceCostActualBreakdownByMonthController.updateRecord)
  .delete(resourceCostActualBreakdownByMonthController.deleteRecord);

router.route('/project/:projectId')
  .get(wttEmp_resourceCostActualBreakdownController.getAllResourceCostWithProjectId);


  router.route('/upload')
      .post(upload.single('file'),resourceCostActualBreakdownByMonthController.uploadExcelForResourceCost);  


module.exports = router;
